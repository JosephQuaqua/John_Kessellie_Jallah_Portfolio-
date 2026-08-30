import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';

import {
  Upload,
  Image as ImageIcon,
  Pencil,
  Trash2,
  X,
  Loader2,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
} from 'lucide-react';

import type { GalleryItem } from '@/types/database';

import {
  adminFetchGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '@/lib/dataService';

import {
  supabase,
  GALLERY_STORAGE_BUCKET,
} from '@/lib/supabase';

import { useToast } from '@/components/ui/Toast';

import {
  AdminPageHeader,
  StatusBadge,
  ConfirmDelete,
} from '@/components/admin/AdminUI';

import {
  LoadingSpinner,
  EmptyState,
} from '@/components/ui/States';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function AdminGalleryPage() {
  const { toast } = useToast();

  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] =
    useState<GalleryItem | null>(null);

  const [deleteItem, setDeleteItem] =
    useState<GalleryItem | null>(null);

  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [displayOrder, setDisplayOrder] = useState('0');
  const [isPublished, setIsPublished] = useState(true);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    try {
      setLoading(true);

      const data = await adminFetchGallery();

      setGallery(data);
    } catch (error) {
      console.error(error);

      toast(
        'Failed to load gallery images.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setTitle('');
    setDescription('');
    setDisplayOrder('0');
    setIsPublished(true);

    setSelectedFile(null);
    setPreviewUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function openCreateModal() {
    setEditingItem(null);
    resetForm();
    setModalOpen(true);
  }

  function openEditModal(item: GalleryItem) {
    setEditingItem(item);

    setTitle(item.title);
    setDescription(item.description || '');
    setDisplayOrder(String(item.display_order ?? 0));
    setIsPublished(item.is_published);

    setSelectedFile(null);
    setPreviewUrl(item.file_url);

    setModalOpen(true);
  }

  function closeModal() {
    if (saving) return;

    setModalOpen(false);
    setEditingItem(null);
    resetForm();
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast(
        'Please select a valid image file.',
        'error'
      );

      event.target.value = '';
      return;
    }

    setSelectedFile(file);

    const objectUrl = URL.createObjectURL(file);

    setPreviewUrl(objectUrl);
  }

  async function uploadFile(
    file: File
  ): Promise<{
    fileUrl: string;
    storagePath: string;
  }> {
    const extension =
      file.name.split('.').pop()?.toLowerCase() || 'jpg';

    const uniqueName =
      `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 10)}.${extension}`;

    const storagePath =
      `gallery/${uniqueName}`;

    const { error } = await supabase.storage
      .from(GALLERY_STORAGE_BUCKET)
      .upload(
        storagePath,
        file,
        {
          upsert: false,
          contentType: file.type,
        }
      );

    if (error) throw error;

    const { data } =
      supabase.storage
        .from(GALLERY_STORAGE_BUCKET)
        .getPublicUrl(storagePath);

    return {
      fileUrl: data.publicUrl,
      storagePath,
    };
  }

  async function handleSave() {
    if (!title.trim()) {
      toast(
        'Please enter a title.',
        'error'
      );

      return;
    }

    if (!editingItem && !selectedFile) {
      toast(
        'Please select an image.',
        'error'
      );

      return;
    }

    setSaving(true);

    let uploadedStoragePath: string | null = null;

    try {
      // ============================
      // CREATE
      // ============================

      if (!editingItem) {
        if (!selectedFile) return;

        const uploaded =
          await uploadFile(selectedFile);

        uploadedStoragePath =
          uploaded.storagePath;

        await createGalleryItem({
          title: title.trim(),
          description:
            description.trim() || null,

          file_name: selectedFile.name,

          file_url:
            uploaded.fileUrl,

          storage_path:
            uploaded.storagePath,

          file_type:
            selectedFile.type,

          file_size:
            selectedFile.size,

          display_order:
            Number(displayOrder) || 0,

          is_published:
            isPublished,
        });

        toast(
          'Gallery image uploaded successfully.',
          'success'
        );
      }

      // ============================
      // EDIT
      // ============================

      else {
        let updates: Partial<GalleryItem> = {
          title: title.trim(),

          description:
            description.trim() || null,

          display_order:
            Number(displayOrder) || 0,

          is_published:
            isPublished,
        };

        // Replace existing image
        if (selectedFile) {
          const uploaded =
            await uploadFile(selectedFile);

          uploadedStoragePath =
            uploaded.storagePath;

          updates = {
            ...updates,

            file_name:
              selectedFile.name,

            file_url:
              uploaded.fileUrl,

            storage_path:
              uploaded.storagePath,

            file_type:
              selectedFile.type,

            file_size:
              selectedFile.size,
          };
        }

        await updateGalleryItem(
          editingItem.id,
          updates
        );

        // Remove old storage file only
        // after database update succeeds.
        if (
          selectedFile &&
          editingItem.storage_path
        ) {
          await supabase.storage
            .from(GALLERY_STORAGE_BUCKET)
            .remove([
              editingItem.storage_path,
            ]);
        }

        toast(
          selectedFile
            ? 'Gallery image replaced successfully.'
            : 'Gallery image updated successfully.',
          'success'
        );
      }

      closeModal();
      await loadGallery();
    } catch (error) {
      console.error(error);

      // If upload succeeded but database
      // operation failed, clean up the
      // newly uploaded file.
      if (uploadedStoragePath) {
        await supabase.storage
          .from(GALLERY_STORAGE_BUCKET)
          .remove([
            uploadedStoragePath,
          ]);
      }

      toast(
        error instanceof Error
          ? error.message
          : 'Failed to save gallery image.',
        'error'
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteItem) return;

    try {
      if (deleteItem.storage_path) {
        await supabase.storage
          .from(GALLERY_STORAGE_BUCKET)
          .remove([
            deleteItem.storage_path,
          ]);
      }

      await deleteGalleryItem(
        deleteItem.id
      );

      toast(
        'Gallery image deleted.',
        'success'
      );

      setDeleteItem(null);

      await loadGallery();
    } catch (error) {
      console.error(error);

      toast(
        'Failed to delete gallery image.',
        'error'
      );
    }
  }

  async function togglePublished(
    item: GalleryItem
  ) {
    try {
      await updateGalleryItem(
        item.id,
        {
          is_published:
            !item.is_published,
        }
      );

      toast(
        item.is_published
          ? 'Image moved to draft.'
          : 'Image published.',
        'success'
      );

      await loadGallery();
    } catch {
      toast(
        'Failed to update image status.',
        'error'
      );
    }
  }

  if (loading) {
    return (
      <LoadingSpinner size="lg" />
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Gallery"
        description="Upload and manage professional gallery images."
        onAdd={openCreateModal}
        addLabel="Add Image"
      />

      {/* Storage notice */}
      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-accent-100 bg-accent-50/60 p-4">
        <ImageIcon className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />

        <div>
          <p className="text-sm font-semibold text-navy-900">
            Gallery Storage
          </p>

          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Images uploaded here are stored in the
            dedicated Gallery storage bucket and are
            separate from the Media Library.
          </p>
        </div>
      </div>

      {gallery.length === 0 ? (
        <EmptyState
          message="No gallery images yet."
          hint="Click 'Add Image' to upload your first gallery image."
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {gallery.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft transition-shadow hover:shadow-card"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.file_url}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />

                <div className="absolute left-3 top-3">
                  <StatusBadge
                    published={
                      item.is_published
                    }
                  />
                </div>

                <div className="absolute right-3 top-3">
                  <span className="rounded-lg bg-navy-950/75 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    #{item.display_order}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate font-display text-lg font-bold text-navy-900">
                      {item.title}
                    </h2>

                    {item.description && (
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-500">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mt-3 truncate text-xs text-slate-400">
                  {item.file_name}
                </p>

                {/* Actions */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      openEditModal(item)
                    }
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-50 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-accent-50 hover:text-accent-600"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      togglePublished(item)
                    }
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-50 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-accent-50 hover:text-accent-600"
                  >
                    {item.is_published ? (
                      <>
                        <EyeOff className="h-3.5 w-3.5" />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5" />
                        Publish
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setDeleteItem(item)
                    }
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-red-50 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ============================
          CREATE / EDIT MODAL
      ============================ */}

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
              <div>
                <h2 className="font-display text-xl font-extrabold text-navy-900">
                  {editingItem
                    ? 'Edit Gallery Image'
                    : 'Add Gallery Image'}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {editingItem
                    ? 'Update the image information or replace the image file.'
                    : 'Upload an image to the dedicated gallery storage.'}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              {/* File */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-navy-900">
                  {editingItem
                    ? 'Image File'
                    : 'Image File *'}
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={
                    handleFileChange
                  }
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="w-full rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 text-left transition-colors hover:border-accent-300 hover:bg-accent-50/30"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-accent-600 shadow-sm">
                      <Upload className="h-5 w-5" />
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-navy-900">
                        {selectedFile
                          ? selectedFile.name
                          : editingItem
                            ? 'Choose a new image to replace the current one'
                            : 'Choose an image file'}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        JPG, PNG, WEBP, GIF and other image formats
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Preview */}
              {previewUrl && (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-72 w-full object-contain"
                  />
                </div>
              )}

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-navy-900">
                  Title *
                </label>

                <Input
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="e.g. Public Health Conference"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-navy-900">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  rows={4}
                  placeholder="Add a short description..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-navy-900 outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                />
              </div>

              {/* Order + Published */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-navy-900">
                    Display Order
                  </label>

                  <Input
                    type="number"
                    value={displayOrder}
                    onChange={(e) =>
                      setDisplayOrder(
                        e.target.value
                      )
                    }
                    min="0"
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    Lower numbers appear first.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-navy-900">
                    Visibility
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      setIsPublished(
                        !isPublished
                      )
                    }
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                      isPublished
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-slate-50 text-slate-500'
                    }`}
                  >
                    {isPublished ? (
                      <>
                        <Eye className="h-4 w-4" />
                        Published
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-4 w-4" />
                        Draft
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      {editingItem
                        ? 'Save Changes'
                        : 'Upload Image'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================
          DELETE CONFIRMATION
      ============================ */}

      <ConfirmDelete
        open={!!deleteItem}
        onClose={() =>
          setDeleteItem(null)
        }
        onConfirm={handleDelete}
        title="Delete Gallery Image"
        message="This will permanently delete the gallery record and its stored image file. This action cannot be undone."
      />
    </div>
  );
}