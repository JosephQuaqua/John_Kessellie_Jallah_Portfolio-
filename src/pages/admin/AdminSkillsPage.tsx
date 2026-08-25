import { useEffect, useState } from 'react';
import type { Skill } from '@/types/database';
import { adminFetchSkills, crud } from '@/lib/dataService';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Input, Toggle } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  AdminPageHeader, AdminSearchBar, DataTable, TableRowActions, StatusBadge, ConfirmDelete,
} from '@/components/admin/AdminUI';
import { LoadingSpinner, EmptyState } from '@/components/ui/States';

const TABLE = 'skills';
const CATEGORIES = ['Research & Data', 'Computer', 'Clinical', 'Language', 'Other'];
const empty: Partial<Skill> = { name: '', category: 'Research & Data', icon: '', display_order: 0, is_published: true };

export function AdminSkillsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Skill> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () => { adminFetchSkills().then((d) => { setItems(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditing({ ...empty }); setModalOpen(true); };
  const openEdit = (item: Skill) => { setEditing({ ...item }); setModalOpen(true); };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) await crud.update<Skill>(TABLE, editing.id, editing);
      else await crud.insert<Skill>(TABLE, editing);
      toast('Skill saved', 'success'); setModalOpen(false); load();
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
      <AdminPageHeader title="Skills" description="Manage categorized skills and competencies." onAdd={openAdd} addLabel="Add Skill" />
      <AdminSearchBar value={search} onChange={setSearch} placeholder="Search skills..." />
      {filtered.length === 0 ? <EmptyState message="No skills found." /> : (
        <DataTable columns={['Skill Name', 'Category', 'Status', 'Actions']}>
          {filtered.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-4 py-3.5 text-sm font-medium text-navy-900">{item.name}</td>
              <td className="px-4 py-3.5 text-sm text-slate-600">{item.category}</td>
              <td className="px-4 py-3.5"><StatusBadge published={item.is_published} /></td>
              <td className="px-4 py-3.5"><TableRowActions onEdit={() => openEdit(item)} onDelete={() => setDeleteId(item.id)} /></td>
            </tr>
          ))}
        </DataTable>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?.id ? 'Edit Skill' : 'Add Skill'}>
        {editing && (
          <div className="space-y-4">
            <Input label="Skill Name" value={editing.name || ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Category</label>
              <select value={editing.category || 'Research & Data'} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <Input label="Icon Name (lucide-react)" value={editing.icon || ''} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} placeholder="e.g. BarChart3" />
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
