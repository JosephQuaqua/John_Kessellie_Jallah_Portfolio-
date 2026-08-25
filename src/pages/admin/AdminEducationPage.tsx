import { useEffect, useState } from 'react';
import type { Education } from '@/types/database';
import { adminFetchEducation, crud } from '@/lib/dataService';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Toggle } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  AdminPageHeader, AdminSearchBar, DataTable, TableRowActions, StatusBadge, ConfirmDelete,
} from '@/components/admin/AdminUI';
import { LoadingSpinner, EmptyState } from '@/components/ui/States';

const TABLE = 'education';
const empty: Partial<Education> = {
  institution: '', degree: '', field_of_study: '', location: '', start_date: '',
  end_date: '', cgpa: '', thesis: '', relevant_courses: '', description: '',
  institution_logo: '', display_order: 0, is_published: true,
};

export function AdminEducationPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Education> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () => { adminFetchEducation().then((d) => { setItems(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const filtered = items.filter((i) =>
    i.institution.toLowerCase().includes(search.toLowerCase()) ||
    i.degree.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setEditing({ ...empty }); setModalOpen(true); };
  const openEdit = (item: Education) => { setEditing({ ...item }); setModalOpen(true); };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) await crud.update<Education>(TABLE, editing.id, editing);
      else await crud.insert<Education>(TABLE, editing);
      toast('Education saved successfully', 'success');
      setModalOpen(false); load();
    } catch { toast('Failed to save', 'error'); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try { await crud.delete(TABLE, deleteId); toast('Deleted', 'success'); load(); }
    catch { toast('Failed to delete', 'error'); } finally { setDeleteId(null); }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div>
      <AdminPageHeader title="Education" description="Manage academic history." onAdd={openAdd} addLabel="Add Education" />
      <AdminSearchBar value={search} onChange={setSearch} placeholder="Search education..." />
      {filtered.length === 0 ? <EmptyState message="No education records." hint="Click 'Add Education' to create one." /> : (
        <DataTable columns={['Degree', 'Institution', 'Period', 'Status', 'Actions']}>
          {filtered.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-4 py-3.5"><p className="text-sm font-medium text-navy-900">{item.degree}</p><p className="text-xs text-slate-400">{item.field_of_study}</p></td>
              <td className="px-4 py-3.5 text-sm text-slate-600">{item.institution}</td>
              <td className="px-4 py-3.5 text-sm text-slate-500">{item.start_date}{item.end_date ? ` — ${item.end_date}` : ''}</td>
              <td className="px-4 py-3.5"><StatusBadge published={item.is_published} /></td>
              <td className="px-4 py-3.5"><TableRowActions onEdit={() => openEdit(item)} onDelete={() => setDeleteId(item.id)} /></td>
            </tr>
          ))}
        </DataTable>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?.id ? 'Edit Education' : 'Add Education'} className="max-w-2xl">
        {editing && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Degree" value={editing.degree || ''} onChange={(e) => setEditing({ ...editing, degree: e.target.value })} />
              <Input label="Field of Study" value={editing.field_of_study || ''} onChange={(e) => setEditing({ ...editing, field_of_study: e.target.value })} />
              <Input label="Institution" value={editing.institution || ''} onChange={(e) => setEditing({ ...editing, institution: e.target.value })} />
              <Input label="Location" value={editing.location || ''} onChange={(e) => setEditing({ ...editing, location: e.target.value })} />
              <Input label="Start Date" value={editing.start_date || ''} onChange={(e) => setEditing({ ...editing, start_date: e.target.value })} />
              <Input label="End Date" value={editing.end_date || ''} onChange={(e) => setEditing({ ...editing, end_date: e.target.value })} />
              <Input label="CGPA" value={editing.cgpa || ''} onChange={(e) => setEditing({ ...editing, cgpa: e.target.value })} />
              <Input label="Institution Logo URL" value={editing.institution_logo || ''} onChange={(e) => setEditing({ ...editing, institution_logo: e.target.value })} />
            </div>
            <Textarea label="Thesis" value={editing.thesis || ''} onChange={(e) => setEditing({ ...editing, thesis: e.target.value })} />
            <Textarea label="Description" value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            <Input label="Relevant Courses" value={editing.relevant_courses || ''} onChange={(e) => setEditing({ ...editing, relevant_courses: e.target.value })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <Input label="Display Order" type="number" value={String(editing.display_order || 0)} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} />
              <Toggle label="Published" checked={editing.is_published || false} onChange={(v) => setEditing({ ...editing, is_published: v })} />
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
            </div>
          </div>
        )}
      </Modal>
      <ConfirmDelete open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} />
    </div>
  );
}
