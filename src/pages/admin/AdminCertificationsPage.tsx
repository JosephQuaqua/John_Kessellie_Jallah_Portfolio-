import { useEffect, useState } from 'react';
import type { Certification } from '@/types/database';
import { adminFetchCertifications, crud } from '@/lib/dataService';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Toggle } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  AdminPageHeader, AdminSearchBar, DataTable, TableRowActions, StatusBadge, ConfirmDelete,
} from '@/components/admin/AdminUI';
import { LoadingSpinner, EmptyState } from '@/components/ui/States';

const TABLE = 'certifications';
const empty: Partial<Certification> = {
  title: '', issuer: '', completion_date: '', credential_id: '', credential_url: '',
  certificate_image: '', certificate_file: '', description: '', display_order: 0, is_published: true,
};

export function AdminCertificationsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Certification> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () => { adminFetchCertifications().then((d) => { setItems(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()) || (i.issuer || '').toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditing({ ...empty }); setModalOpen(true); };
  const openEdit = (item: Certification) => { setEditing({ ...item }); setModalOpen(true); };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) await crud.update<Certification>(TABLE, editing.id, editing);
      else await crud.insert<Certification>(TABLE, editing);
      toast('Certification saved', 'success'); setModalOpen(false); load();
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
      <AdminPageHeader title="Certifications" description="Manage certifications and workshops." onAdd={openAdd} addLabel="Add Certification" />
      <AdminSearchBar value={search} onChange={setSearch} placeholder="Search certifications..." />
      {filtered.length === 0 ? <EmptyState message="No certifications found." /> : (
        <DataTable columns={['Title', 'Issuer', 'Date', 'Status', 'Actions']}>
          {filtered.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-4 py-3.5 text-sm font-medium text-navy-900">{item.title}</td>
              <td className="px-4 py-3.5 text-sm text-slate-600">{item.issuer || '—'}</td>
              <td className="px-4 py-3.5 text-sm text-slate-500">{item.completion_date || '—'}</td>
              <td className="px-4 py-3.5"><StatusBadge published={item.is_published} /></td>
              <td className="px-4 py-3.5"><TableRowActions onEdit={() => openEdit(item)} onDelete={() => setDeleteId(item.id)} /></td>
            </tr>
          ))}
        </DataTable>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?.id ? 'Edit Certification' : 'Add Certification'} className="max-w-2xl">
        {editing && (
          <div className="space-y-4">
            <Input label="Title" value={editing.title || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Issuing Organization" value={editing.issuer || ''} onChange={(e) => setEditing({ ...editing, issuer: e.target.value })} />
              <Input label="Completion Date" value={editing.completion_date || ''} onChange={(e) => setEditing({ ...editing, completion_date: e.target.value })} />
              <Input label="Credential ID" value={editing.credential_id || ''} onChange={(e) => setEditing({ ...editing, credential_id: e.target.value })} />
              <Input label="Credential URL" value={editing.credential_url || ''} onChange={(e) => setEditing({ ...editing, credential_url: e.target.value })} />
              <Input label="Certificate Image URL" value={editing.certificate_image || ''} onChange={(e) => setEditing({ ...editing, certificate_image: e.target.value })} />
              <Input label="Certificate File URL" value={editing.certificate_file || ''} onChange={(e) => setEditing({ ...editing, certificate_file: e.target.value })} />
            </div>
            <Textarea label="Description" value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
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
