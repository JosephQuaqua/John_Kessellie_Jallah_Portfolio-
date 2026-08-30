import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';

import {
  Upload,
  Trash2,
  Loader2,
  Image as ImageIcon,
  Eye,
  EyeOff,
  GripVertical,
  Save,
  X,
  Plus,
} from 'lucide-react';

import type { GalleryItem } from '@/types/database';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import {
  AdminPageHeader,
} from '@/components/admin/AdminUI';
import {
  LoadingSpinner,
  EmptyState,
} from '@/components/ui/States';
import { formatFileSize } from '@/lib/utils';

/*
|--------------------------------------------------------------------------
| Supabase Storage bucket
|--------------------------------------------------------------------------
|
| Change "gallery" here ONLY if your Supabase Storage bucket has
| a different name.
|
*/
const GALLERY_BUCKET = 'gallery';

export function AdminGalleryPage() {
  const { toast } = useToast();

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [selectedItem, setSelectedItem] =
    useState<GalleryItem | null>(null);

  const [editing, setEditing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /*
  |--------------------------------------------------------------------------
  | Load gallery
  |--------------------------------------------------------------------------
  */

  const loadGallery = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setItems((data || []) as GalleryItem[]);
    } catch (error) {
      console.error('Failed to load gallery:', error);

      toast(
        'Failed to load gallery items.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Upload images
  |--------------------------------------------------------------------------
  */

  const handleUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    setUploading(true);

    let uploadedCount = 0;

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          continue;
        }

        const extension =
          file.name.split('.').pop()?.toLowerCase() || 'jpg';

        const safeName = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[^a-zA-Z0-9-_]/g, '-')
          .toLowerCase();

        const uniqueName = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}-${safeName}.${extension}`;

        const storagePath = `gallery/${uniqueName}`;

        /*
        |--------------------------------------------------------------------------
        | Upload to Supabase Storage
        |--------------------------------------------------------------------------
        */

        const { error: uploadError } =
          await supabase.storage
            .from(GALLERY_BUCKET)
            .upload(storagePath, file, {
              upsert: false,
              cacheControl: '3600',
              contentType: file.type,
            });

        if (uploadError) {
          throw uploadError;
        }

        /*
        |--------------------------------------------------------------------------
        | Get public URL
        |--------------------------------------------------------------------------
        */

        const { data: publicUrlData } =
          supabase.storage
            .from(GALLERY_BUCKET)
            .getPublicUrl(storagePath);

        /*
        |--------------------------------------------------------------------------
        | Determine next display order
        |--------------------------------------------------------------------------
        */

        const nextOrder =
          items.length > 0
            ? Math.max(
                ...items.map((item) => item.display_order || 0)
              ) + uploadedCount + 1
            : uploadedCount;

        /*
        |--------------------------------------------------------------------------
        | Create database record
        |--------------------------------------------------------------------------
        */

        const { error: insertError } =
          await supabase.from('gallery').insert({
            title: file.name.replace(/\.[^/.]+$/, ''),
            description: null,
            file_name: file.name,
            file_url: publicUrlData.publicUrl,
            storage_path: storagePath,
            file_type: file.type,
            file_size: file.size,
            display_order: nextOrder,
            is_published: true,
          });

        if (insertError) {
          /*
          | If database insertion fails, remove the uploaded file
          | so we don't leave an orphaned Storage object.
          */
          await supabase.storage
            .from(GALLERY_BUCKET)
            .remove([storagePath]);

          throw insertError;
        }

        uploadedCount++;
      }

      if (uploadedCount === 0) {
        toast(
          'Please select valid image files.',
          'error'
        );
      } else {
        toast(
          `${uploadedCount} image${
            uploadedCount > 1 ? 's' : ''
          } uploaded successfully.`,
          'success'
        );
      }

      await loadGallery();
    } catch (error) {
      console.error('Gallery upload failed:', error);

      toast(
        error instanceof Error
          ? error.message
          : 'Gallery upload failed.',
        'error'
      );
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete gallery item
  |--------------------------------------------------------------------------
  */

  const handleDelete = async (item: GalleryItem) => {
    const confirmed = window.confirm(
      `Delete "${item.title}" from the gallery?`
    );

    if (!confirmed) {
      return;
    }

    try {
      /*
      | Delete Storage file first
      */
      if (item.storage_path) {
        const { error: storageError } =
          await supabase.storage
            .from(GALLERY_BUCKET)
            .remove([item.storage_path]);

        if (storageError) {
          console.warn(
            'Storage deletion warning:',
            storageError
          );
        }
      }

      /*
      | Delete database record
      */
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', item.id);

      if (error) {
        throw error;
      }

      toast(
        'Gallery image deleted.',
        'success'
      );

      await loadGallery();
    } catch (error) {
      console.error(
        'Failed to delete gallery item:',
        error
      );

      toast(
        'Failed to delete gallery image.',
        'error'
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Toggle published status
  |--------------------------------------------------------------------------
  */

  const togglePublished = async (
    item: GalleryItem
  ) => {
    try {
      const { error } = await supabase
        .from('gallery')
        .update({
          is_published: !item.is_published,
          updated_at: new Date().toISOString(),
        })
        .eq('id', item.id);

      if (error) {
        throw error;
      }

      toast(
        item.is_published
          ? 'Image hidden from public gallery.'
          : 'Image published to gallery.',
        'success'
      );

      await loadGallery();
    } catch (error) {
      console.error(
        'Failed to update gallery status:',
        error
      );

      toast(
        'Failed to update image status.',
        'error'
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Save metadata
  |--------------------------------------------------------------------------
  */

  const saveItem = async () => {
    if (!selectedItem) {
      return;
    }

    try {
      const { error } = await supabase
        .from('gallery')
        .update({
          title: selectedItem.title,
          description: selectedItem.description,
          display_order: selectedItem.display_order,
          updated_at: new Date().toISOString(),
        })
        .eq('id', selectedItem.id);

      if (error) {
        throw error;
      }

      toast(
        'Gallery item updated.',
        'success'
      );

      setEditing(false);
      setSelectedItem(null);

      await loadGallery();
    } catch (error) {
      console.error(
        'Failed to update gallery item:',
        error
      );

      toast(
        'Failed to update gallery item.',
        'error'
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Page
  |--------------------------------------------------------------------------
  */

  return (
    <div className="pb-12">

      <AdminPageHeader
        title="Gallery"
        description="Manage the images displayed on your public portfolio gallery."
      />

      {/* =====================================================
          UPLOAD AREA
      ===================================================== */}

      <div className="mb-8">

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />

        <button
          type="button"
          onClick={() =>
            fileInputRef.current?.click()
          }
          disabled={uploading}
          className="
            group
            flex
            min-h-[170px]
            w-full
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-slate-300
            bg-white
            px-6
            py-10
            text-center
            transition-all
            duration-200
            hover:border-accent-400
            hover:bg-accent-50/40
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >

          <span
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-accent-50
              text-accent-600
              transition-transform
              duration-200
              group-hover:scale-105
            "
          >
            {uploading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <Upload className="h-6 w-6" />
            )}
          </span>

          <p className="mt-4 text-sm font-semibold text-navy-900">
            {uploading
              ? 'Uploading images...'
              : 'Upload gallery images'}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Select one or multiple JPG, PNG, WEBP or other image files.
          </p>

        </button>

      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Total Images
          </p>

          <p className="mt-1 text-2xl font-bold text-navy-900">
            {items.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Published
          </p>

          <p className="mt-1 text-2xl font-bold text-emerald-600">
            {items.filter(
              (item) => item.is_published
            ).length}
          </p>
        </div>

        <div className="hidden rounded-2xl border border-slate-200 bg-white p-4 sm:block">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Hidden
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-500">
            {items.filter(
              (item) => !item.is_published
            ).length}
          </p>
        </div>

      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {items.length === 0 ? (

        <EmptyState
          message="Your gallery is empty."
          hint="Upload your first images using the upload area above."
        />

      ) : (

        /* ===================================================
           GALLERY GRID
        =================================================== */

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            xl:grid-cols-3
          "
        >

          {items.map((item) => (

            <article
              key={item.id}
              className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-slate-300
                hover:shadow-lg
              "
            >

              {/* IMAGE */}

              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">

                <img
                  src={item.file_url}
                  alt={item.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-[1.03]
                  "
                />

                {/* Overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/60
                    via-transparent
                    to-transparent
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />

                {/* Status */}

                <div className="absolute left-3 top-3">

                  <span
                    className={`
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      backdrop-blur-md
                      ${
                        item.is_published
                          ? 'bg-emerald-500/90 text-white'
                          : 'bg-slate-900/80 text-white'
                      }
                    `}
                  >
                    {item.is_published ? (
                      <>
                        <Eye className="h-3 w-3" />
                        Published
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3 w-3" />
                        Hidden
                      </>
                    )}
                  </span>

                </div>

                {/* View button */}

                <button
                  type="button"
                  onClick={() => {
                    setSelectedItem(item);
                    setEditing(false);
                  }}
                  className="
                    absolute
                    bottom-3
                    right-3
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-white
                    text-navy-900
                    opacity-0
                    shadow-lg
                    transition-all
                    duration-300
                    hover:bg-accent-500
                    hover:text-white
                    group-hover:opacity-100
                  "
                  aria-label="View image"
                >
                  <Eye className="h-4 w-4" />
                </button>

              </div>

              {/* CONTENT */}

              <div className="p-4">

                <div className="flex items-start gap-3">

                  <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />

                  <div className="min-w-0 flex-1">

                    <h3 className="truncate text-sm font-semibold text-navy-900">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Order {item.display_order}
                      {' • '}
                      {item.file_size
                        ? formatFileSize(item.file_size)
                        : 'Unknown size'}
                    </p>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="mt-4 flex items-center gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      togglePublished(item)
                    }
                    className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      gap-1.5
                      rounded-lg
                      border
                      border-slate-200
                      px-3
                      py-2
                      text-xs
                      font-semibold
                      text-slate-600
                      transition-colors
                      hover:border-accent-200
                      hover:bg-accent-50
                      hover:text-accent-600
                    "
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
                    onClick={() => {
                      setSelectedItem(item);
                      setEditing(true);
                    }}
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-slate-200
                      text-slate-500
                      transition-colors
                      hover:bg-slate-50
                      hover:text-navy-900
                    "
                    aria-label="Edit"
                  >
                    <Save className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(item)
                    }
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-slate-200
                      text-slate-400
                      transition-colors
                      hover:border-red-200
                      hover:bg-red-50
                      hover:text-red-600
                    "
                    aria-label="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

      )}

      {/* =====================================================
          IMAGE / EDIT MODAL
      ===================================================== */}

      {selectedItem && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-slate-950/70
            p-4
            backdrop-blur-sm
          "
          onClick={() => {
            setSelectedItem(null);
            setEditing(false);
          }}
        >

          <div
            className="
              relative
              max-h-[92vh]
              w-full
              max-w-3xl
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              type="button"
              onClick={() => {
                setSelectedItem(null);
                setEditing(false);
              }}
              className="
                absolute
                right-3
                top-3
                z-10
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-black/60
                text-white
                backdrop-blur-md
                transition-colors
                hover:bg-black/80
              "
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* IMAGE */}

            <div className="max-h-[55vh] bg-slate-100">

              <img
                src={selectedItem.file_url}
                alt={selectedItem.title}
                className="
                  mx-auto
                  max-h-[55vh]
                  w-full
                  object-contain
                "
              />

            </div>

            {/* DETAILS */}

            <div className="p-5 sm:p-6">

              {editing ? (

                <div className="space-y-5">

                  <div>

                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Title
                    </label>

                    <input
                      type="text"
                      value={selectedItem.title}
                      onChange={(event) =>
                        setSelectedItem({
                          ...selectedItem,
                          title: event.target.value,
                        })
                      }
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-3
                        text-sm
                        text-navy-900
                        outline-none
                        transition
                        focus:border-accent-400
                        focus:ring-4
                        focus:ring-accent-500/10
                      "
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Description
                    </label>

                    <textarea
                      value={
                        selectedItem.description || ''
                      }
                      onChange={(event) =>
                        setSelectedItem({
                          ...selectedItem,
                          description:
                            event.target.value || null,
                        })
                      }
                      rows={4}
                      className="
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-3
                        text-sm
                        text-navy-900
                        outline-none
                        transition
                        focus:border-accent-400
                        focus:ring-4
                        focus:ring-accent-500/10
                      "
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Display Order
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={
                        selectedItem.display_order
                      }
                      onChange={(event) =>
                        setSelectedItem({
                          ...selectedItem,
                          display_order:
                            Number(event.target.value),
                        })
                      }
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-3
                        text-sm
                        text-navy-900
                        outline-none
                        transition
                        focus:border-accent-400
                        focus:ring-4
                        focus:ring-accent-500/10
                      "
                    />

                  </div>

                  <div className="flex justify-end gap-2">

                    <Button
                      variant="secondary"
                      onClick={() =>
                        setEditing(false)
                      }
                    >
                      Cancel
                    </Button>

                    <Button
                      onClick={saveItem}
                    >
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>

                  </div>

                </div>

              ) : (

                <div>

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h2 className="font-display text-xl font-bold text-navy-900">
                        {selectedItem.title}
                      </h2>

                      {selectedItem.description && (
                        <p className="mt-2 text-sm leading-relaxed text-slate-500">
                          {selectedItem.description}
                        </p>
                      )}

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setEditing(true)
                      }
                      className="
                        shrink-0
                        rounded-lg
                        border
                        border-slate-200
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        text-slate-600
                        hover:bg-slate-50
                      "
                    >
                      Edit
                    </button>

                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">

                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-500">
                      {selectedItem.file_name}
                    </span>

                    <span className="rounded-full bg-accent-50 px-3 py-1.5 text-xs font-medium text-accent-600">
                      Order {selectedItem.display_order}
                    </span>

                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}