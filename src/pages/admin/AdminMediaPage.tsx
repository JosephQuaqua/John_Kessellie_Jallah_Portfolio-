import { useEffect, useState, useRef, type ChangeEvent } from 'react';
import { Upload, Copy, Trash2, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import type { MediaItem } from '@/types/database';
import { adminFetchMedia, crud } from '@/lib/dataService';
import { supabase, STORAGE_BUCKET } from '@/lib/supabase';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { AdminPageHeader } from '@/components/admin/AdminUI';
import { LoadingSpinner, EmptyState } from '@/components/ui/States';
import { formatFileSize, cn } from '@/lib/utils';

export function AdminMediaPage() {
  const { toast } = useToast();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = () => { adminFetchMedia().then((d) => { setMedia(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const path = `uploads/${fileName}`;
        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(path, file, { upsert: false });
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
        await crud.insert<MediaItem>('media_library', {
          file_name: file.name,
          file_url: urlData.publicUrl,
          file_type: file.type,
          file_size: file.size,
          storage_path: path,
        });
      }
      toast(`${files.length} file(s) uploaded`, 'success');
      load();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Upload failed', 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (item: MediaItem) => {
    try {
      if (item.storage_path) {
        await supabase.storage.from(STORAGE_BUCKET).remove([item.storage_path]);
      }
      await crud.delete('media_library', item.id);
      toast('File deleted', 'success');
      load();
    } catch {
      toast('Failed to delete file', 'error');
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast('URL copied to clipboard', 'success');
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div>
      <AdminPageHeader title="Media Library" description="Upload and manage images and files." />
      <div className="mb-6">
        <input ref={fileInputRef} type="file" multiple onChange={handleUpload} className="hidden" accept="image/*,application/pdf" />
        <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
          {uploading ? <><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</> : <><Upload className="h-4 w-4" /> Upload Files</>}
        </Button>
      </div>

      {media.length === 0 ? <EmptyState message="No media uploaded yet." hint="Click 'Upload Files' to add images or PDFs." /> : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item) => {
            const isImage = item.file_type?.startsWith('image/');
            return (
              <div key={item.id} className="group rounded-2xl border border-slate-200 bg-white p-3 shadow-soft hover:shadow-card transition-shadow">
                <div className="aspect-square rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center mb-3">
                  {isImage ? (
                    <img src={item.file_url} alt={item.file_name} className="w-full h-full object-cover" />
                  ) : (
                    <FileText className="h-10 w-10 text-slate-300" />
                  )}
                </div>
                <p className="text-xs font-medium text-navy-900 truncate">{item.file_name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.file_size ? formatFileSize(item.file_size) : '—'}</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <button onClick={() => copyUrl(item.file_url)} className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-slate-50 hover:bg-accent-50 text-slate-500 hover:text-accent-600 py-1.5 text-xs font-medium transition-colors">
                    <Copy className="h-3 w-3" /> Copy URL
                  </button>
                  <button onClick={() => handleDelete(item)} className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors" aria-label="Delete">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
