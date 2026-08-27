import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import type { Experience } from '@/types/database';
import { adminFetchExperiences, crud } from '@/lib/dataService';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Toggle } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
  AdminPageHeader, AdminSearchBar, DataTable, TableRowActions, StatusBadge, ConfirmDelete,
} from '@/components/admin/AdminUI';
import { LoadingSpinner, EmptyState } from '@/components/ui/States';

const TABLE = 'experiences';
const empty: Partial<Experience> = {
  organization: '',
  position: '',
  location: '',
  start_date: '',
  end_date: '',
  is_current: false,
  description: '',
  responsibilities: '',
  organization_logo: '',

  image_urls: [],

  display_order: 0,
  is_published: true,
};
export function AdminExperiencePage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Experience> | null>(null);
  const [saving, setSaving] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const [uploading, setUploading] = useState(false);

  const load = () => {
    adminFetchExperiences().then((d) => { setItems(d); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(load, []);

  const filtered = items.filter((i) =>
    i.organization.toLowerCase().includes(search.toLowerCase()) ||
    i.position.toLowerCase().includes(search.toLowerCase())
  );

 const openAdd = () => {
  setEditing({ ...empty });
  setModalOpen(true);
};

const openEdit = (item: Experience) => {
  setEditing({ ...item });
  setModalOpen(true);
};

const handleImageUpload = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const files = Array.from(event.target.files || []);

  if (files.length === 0 || !editing) return;

  setUploading(true);

  try {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const fileExt = file.name.split('.').pop();

      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;

      const filePath = `experiences/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('experience-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('experience-images')
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    setEditing({
      ...editing,
      image_urls: [
        ...(editing.image_urls || []),
        ...uploadedUrls,
      ],
    });

    toast('Photos uploaded successfully', 'success');
  } catch (error) {
    console.error(error);
    toast('Failed to upload photos', 'error');
  } finally {
    setUploading(false);

    // Allows selecting the same file again if needed
    event.target.value = '';
  }
};

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      if (editing.id) {
        await crud.update<Experience>(TABLE, editing.id, editing);
      } else {
        await crud.insert<Experience>(TABLE, editing);
      }
      toast('Experience saved successfully', 'success');
      setModalOpen(false);
      load();
    } catch {
      toast('Failed to save experience', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await crud.delete(TABLE, deleteId);
      toast('Experience deleted', 'success');
      load();
    } catch {
      toast('Failed to delete', 'error');
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div>
      <AdminPageHeader title="Experience" description="Manage professional work history." onAdd={openAdd} addLabel="Add Experience" />
      <AdminSearchBar value={search} onChange={setSearch} placeholder="Search experiences..." />
      {filtered.length === 0 ? (
        <EmptyState message="No experiences found." hint="Click 'Add Experience' to create one." />
      ) : (
        <DataTable columns={['Position', 'Organization', 'Period', 'Status', 'Actions']}>
          {filtered.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-4 py-3.5">
                <p className="text-sm font-medium text-navy-900">{item.position}</p>
                <p className="text-xs text-slate-400">{item.location}</p>
              </td>
              <td className="px-4 py-3.5 text-sm text-slate-600">{item.organization}</td>
              <td className="px-4 py-3.5 text-sm text-slate-500">
                {item.start_date}{item.end_date ? ` — ${item.end_date}` : item.is_current ? ' — Present' : ''}
              </td>
              <td className="px-4 py-3.5"><StatusBadge published={item.is_published} /></td>
              <td className="px-4 py-3.5">
                <TableRowActions onEdit={() => openEdit(item)} onDelete={() => setDeleteId(item.id)} />
              </td>
            </tr>
          ))}
        </DataTable>
      )}

      <Modal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  title={editing?.id ? 'Edit Experience' : 'Add Experience'}
  className="max-w-2xl max-h-[90vh] overflow-y-auto"
>
        {editing && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Position" value={editing.position || ''} onChange={(e) => setEditing({ ...editing, position: e.target.value })} />
              <Input label="Organization" value={editing.organization || ''} onChange={(e) => setEditing({ ...editing, organization: e.target.value })} />
              <Input label="Location" value={editing.location || ''} onChange={(e) => setEditing({ ...editing, location: e.target.value })} />
              <Input label="Organization Logo URL" value={editing.organization_logo || ''} onChange={(e) => setEditing({ ...editing, organization_logo: e.target.value })} />
              <Input label="Start Date" value={editing.start_date || ''} onChange={(e) => setEditing({ ...editing, start_date: e.target.value })} placeholder="e.g. Jan 2024" />
              <Input label="End Date" value={editing.end_date || ''} onChange={(e) => setEditing({ ...editing, end_date: e.target.value })} placeholder="e.g. Dec 2024" />
            </div>
            <Textarea label="Description" value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            <Textarea label="Key Responsibilities" value={editing.responsibilities || ''} onChange={(e) => setEditing({ ...editing, responsibilities: e.target.value })} />
            <div>
  <div className="mb-3 flex items-center justify-between">
    <div>
      <label className="block text-sm font-semibold text-slate-700">
        Experience Photos
      </label>

      <p className="mt-1 text-xs text-slate-400">
        Upload photos related to this experience.
      </p>
    </div>

    {editing.image_urls && editing.image_urls.length > 0 && (
      <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-600">
        {editing.image_urls.length} photo
        {editing.image_urls.length !== 1 ? 's' : ''}
      </span>
    )}
  </div>

  <label
    className={`
      flex cursor-pointer flex-col items-center justify-center
      rounded-2xl border-2 border-dashed p-8
      transition-all duration-300
      ${
        uploading
          ? 'cursor-wait border-slate-200 bg-slate-50'
          : 'border-slate-200 bg-slate-50/50 hover:border-accent-400 hover:bg-accent-50/40'
      }
    `}
  >
    <input
      type="file"
      accept="image/*"
      multiple
      className="hidden"
      onChange={handleImageUpload}
      disabled={uploading}
    />

    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-soft">
      📷
    </div>

    <p className="mt-4 text-sm font-semibold text-navy-900">
      {uploading ? 'Uploading photos...' : 'Click to choose photos'}
    </p>

    <p className="mt-1 text-center text-xs text-slate-400">
      You can select multiple images at once
    </p>
  </label>

  {editing.image_urls && editing.image_urls.length > 0 && (
    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {editing.image_urls.map((url, index) => (
        <div
          key={`${url}-${index}`}
          className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
        >
          <img
            src={url}
            alt={`Experience ${index + 1}`}
            className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 pt-8">
            <span className="text-xs font-medium text-white">
              Photo {index + 1}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditing({
                ...editing,
                image_urls: editing.image_urls?.filter(
                  (_, i) => i !== index
                ),
              });
            }}
            className="
              absolute right-2 top-2
              rounded-lg bg-red-500 px-2.5 py-1.5
              text-xs font-medium text-white
              opacity-0 shadow-sm transition-all
              group-hover:opacity-100
            "
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )}
</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <Input label="Display Order" type="number" value={String(editing.display_order || 0)} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} />
              <Toggle label="Currently Working" checked={editing.is_current || false} onChange={(v) => setEditing({ ...editing, is_current: v })} />
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
