import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import type { Publication } from '@/types/database';
import { adminFetchPublications, crud } from '@/lib/dataService';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Toggle } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  AdminPageHeader, AdminSearchBar, DataTable, TableRowActions, StatusBadge, ConfirmDelete,
} from '@/components/admin/AdminUI';
import { LoadingSpinner, EmptyState } from '@/components/ui/States';
import { cn } from '@/lib/utils';

const TABLE = 'publications';
const empty: Partial<Publication> = {
  title: '', authors: '', journal: '', publication_date: '', publication_year: new Date().getFullYear(),
  doi: '', publication_url: '', abstract: '', category: '', publication_image: '', publication_file: '',
  is_featured: false, display_order: 0, is_published: true,
};

export function AdminPublicationsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Publication> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () => { adminFetchPublications().then((d) => { setItems(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const filtered = items.filter((i) => {
    const matchSearch = i.title.toLowerCase().includes(search.toLowerCase()) || (i.journal || '').toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'featured' && i.is_featured) || (filter === 'published' && i.is_published) || (filter === 'draft' && !i.is_published);
    return matchSearch && matchFilter;
  });

  const openAdd = () => { setEditing({ ...empty }); setModalOpen(true); };
  const openEdit = (item: Publication) => { setEditing({ ...item }); setModalOpen(true); };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) await crud.update<Publication>(TABLE, editing.id, editing);
      else await crud.insert<Publication>(TABLE, editing);
      toast('Publication saved successfully', 'success');
      setModalOpen(false); load();
    } catch { toast('Failed to save', 'error'); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try { await crud.delete(TABLE, deleteId); toast('Deleted', 'success'); load(); }
    catch { toast('Failed to delete', 'error'); } finally { setDeleteId(null); }
  };

  const toggleFeatured = async (item: Publication) => {
    try { await crud.update<Publication>(TABLE, item.id, { is_featured: !item.is_featured }); load(); }
    catch { toast('Failed to update', 'error'); }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div>
      <AdminPageHeader title="Publications" description="Manage peer-reviewed publications." onAdd={openAdd} addLabel="Add Publication" />
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <AdminSearchBar value={search} onChange={setSearch} placeholder="Search publications..." />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100 h-fit">
          <option value="all">All</option>
          <option value="featured">Featured</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>
      {filtered.length === 0 ? <EmptyState message="No publications found." hint="Click 'Add Publication' to create one." /> : (
        <DataTable columns={['Title', 'Journal', 'Year', 'Status', 'Featured', 'Actions']}>
          {filtered.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-4 py-3.5 max-w-xs"><p className="text-sm font-medium text-navy-900 truncate">{item.title}</p><p className="text-xs text-slate-400">{item.category}</p></td>
              <td className="px-4 py-3.5 text-sm text-slate-600">{item.journal || '—'}</td>
              <td className="px-4 py-3.5 text-sm text-slate-500">{item.publication_year || '—'}</td>
              <td className="px-4 py-3.5"><StatusBadge published={item.is_published} /></td>
              <td className="px-4 py-3.5">
                <button onClick={() => toggleFeatured(item)} className={cn('flex h-7 w-7 items-center justify-center rounded-lg transition-colors', item.is_featured ? 'text-amber-500 hover:bg-amber-50' : 'text-slate-300 hover:bg-slate-50')} aria-label="Toggle featured">
                  <Star className={cn('h-4 w-4', item.is_featured && 'fill-current')} />
                </button>
              </td>
              <td className="px-4 py-3.5"><TableRowActions onEdit={() => openEdit(item)} onDelete={() => setDeleteId(item.id)} /></td>
            </tr>
          ))}
        </DataTable>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?.id ? 'Edit Publication' : 'Add Publication'} className="max-w-2xl">
        {editing && (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            <Input label="Title" value={editing.title || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            <Input label="Authors" value={editing.authors || ''} onChange={(e) => setEditing({ ...editing, authors: e.target.value })} placeholder="e.g. John K. Jallah et al." />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Journal" value={editing.journal || ''} onChange={(e) => setEditing({ ...editing, journal: e.target.value })} />
              <Input label="Category" value={editing.category || ''} onChange={(e) => setEditing({ ...editing, category: e.target.value })} placeholder="e.g. Cancer Research" />
              <Input label="Publication Year" type="number" value={String(editing.publication_year || '')} onChange={(e) => setEditing({ ...editing, publication_year: Number(e.target.value) })} />
              <Input label="Publication Date" value={editing.publication_date || ''} onChange={(e) => setEditing({ ...editing, publication_date: e.target.value })} />
              <Input label="DOI" value={editing.doi || ''} onChange={(e) => setEditing({ ...editing, doi: e.target.value })} />
              <Input label="Publication URL" value={editing.publication_url || ''} onChange={(e) => setEditing({ ...editing, publication_url: e.target.value })} />
            </div>
            <Textarea label="Abstract" value={editing.abstract || ''} onChange={(e) => setEditing({ ...editing, abstract: e.target.value })} className="min-h-[120px]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Publication Image URL" value={editing.publication_image || ''} onChange={(e) => setEditing({ ...editing, publication_image: e.target.value })} />
              <Input label="Publication File URL" value={editing.publication_file || ''} onChange={(e) => setEditing({ ...editing, publication_file: e.target.value })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <Input label="Display Order" type="number" value={String(editing.display_order || 0)} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} />
              <Toggle label="Featured" checked={editing.is_featured || false} onChange={(v) => setEditing({ ...editing, is_featured: v })} />
              <Toggle label="Published" checked={editing.is_published || false} onChange={(v) => setEditing({ ...editing, is_published: v })} />
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 sticky bottom-0 bg-white">
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
