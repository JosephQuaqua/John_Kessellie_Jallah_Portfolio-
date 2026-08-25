import { useEffect, useState } from 'react';
import type { ResearchInterest } from '@/types/database';
import { adminFetchResearchInterests, crud } from '@/lib/dataService';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Toggle } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  AdminPageHeader, AdminSearchBar, DataTable, TableRowActions, StatusBadge, ConfirmDelete,
} from '@/components/admin/AdminUI';
import { LoadingSpinner, EmptyState } from '@/components/ui/States';

const TABLE = 'research_interests';
const empty: Partial<ResearchInterest> = { title: '', description: '', icon: '', display_order: 0, is_published: true };

export function AdminResearchInterestsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<ResearchInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<ResearchInterest> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () => { adminFetchResearchInterests().then((d) => { setItems(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditing({ ...empty }); setModalOpen(true); };
  const openEdit = (item: ResearchInterest) => { setEditing({ ...item }); setModalOpen(true); };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) await crud.update<ResearchInterest>(TABLE, editing.id, editing);
      else await crud.insert<ResearchInterest>(TABLE, editing);
      toast('Research interest saved', 'success'); setModalOpen(false); load();
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
      <AdminPageHeader title="Research Interests" description="Manage research focus areas displayed on the homepage." onAdd={openAdd} addLabel="Add Interest" />
      <AdminSearchBar value={search} onChange={setSearch} placeholder="Search research interests..." />
      {filtered.length === 0 ? <EmptyState message="No research interests found." /> : (
        <DataTable columns={['Title', 'Description', 'Status', 'Actions']}>
          {filtered.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-4 py-3.5 text-sm font-medium text-navy-900">{item.title}</td>
              <td className="px-4 py-3.5 text-sm text-slate-500 max-w-xs truncate">{item.description || '—'}</td>
              <td className="px-4 py-3.5"><StatusBadge published={item.is_published} /></td>
              <td className="px-4 py-3.5"><TableRowActions onEdit={() => openEdit(item)} onDelete={() => setDeleteId(item.id)} /></td>
            </tr>
          ))}
        </DataTable>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?.id ? 'Edit Research Interest' : 'Add Research Interest'}>
        {editing && (
          <div className="space-y-4">
            <Input label="Title" value={editing.title || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            <Textarea label="Description" value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            <Input label="Icon Name (lucide-react)" value={editing.icon || ''} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} placeholder="e.g. Activity, Microscope" />
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
