import { useEffect, useState } from 'react';
import type { Award } from '@/types/database';
import { adminFetchAwards, crud } from '@/lib/dataService';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Toggle } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  AdminPageHeader, AdminSearchBar, DataTable, TableRowActions, StatusBadge, ConfirmDelete,
} from '@/components/admin/AdminUI';
import { LoadingSpinner, EmptyState } from '@/components/ui/States';

const TABLE = 'awards';
const empty: Partial<Award> = {
  title: '', organization: '', award_date: '', description: '', media_url: '', display_order: 0, is_published: true,
};

export function AdminAwardsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Award> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () => { adminFetchAwards().then((d) => { setItems(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()) || (i.organization || '').toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditing({ ...empty }); setModalOpen(true); };
  const openEdit = (item: Award) => { setEditing({ ...item }); setModalOpen(true); };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) await crud.update<Award>(TABLE, editing.id, editing);
      else await crud.insert<Award>(TABLE, editing);
      toast('Award saved', 'success'); setModalOpen(false); load();
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
      <AdminPageHeader title="Awards" description="Manage awards and recognitions." onAdd={openAdd} addLabel="Add Award" />
      <AdminSearchBar value={search} onChange={setSearch} placeholder="Search awards..." />
      {filtered.length === 0 ? <EmptyState message="No awards found." /> : (
        <DataTable columns={['Title', 'Organization', 'Date', 'Status', 'Actions']}>
          {filtered.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-4 py-3.5 text-sm font-medium text-navy-900">{item.title}</td>
              <td className="px-4 py-3.5 text-sm text-slate-600">{item.organization || '—'}</td>
              <td className="px-4 py-3.5 text-sm text-slate-500">{item.award_date || '—'}</td>
              <td className="px-4 py-3.5"><StatusBadge published={item.is_published} /></td>
              <td className="px-4 py-3.5"><TableRowActions onEdit={() => openEdit(item)} onDelete={() => setDeleteId(item.id)} /></td>
            </tr>
          ))}
        </DataTable>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?.id ? 'Edit Award' : 'Add Award'} className="max-w-2xl">
        {editing && (
          <div className="space-y-4">
            <Input label="Award Title" value={editing.title || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Organization" value={editing.organization || ''} onChange={(e) => setEditing({ ...editing, organization: e.target.value })} />
              <Input label="Date" value={editing.award_date || ''} onChange={(e) => setEditing({ ...editing, award_date: e.target.value })} />
            </div>
            <Textarea label="Description" value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            <Input label="Media/Certificate URL" value={editing.media_url || ''} onChange={(e) => setEditing({ ...editing, media_url: e.target.value })} />
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
