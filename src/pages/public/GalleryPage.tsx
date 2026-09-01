import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function GalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setItems(data || []);
      } catch (error) {
        console.error('Failed to load gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        Loading gallery...
      </div>
    );
  }

  return (
    <div className="pb-12">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="font-display text-4xl font-bold text-navy-900">
          Gallery
        </h1>

        <p className="mt-3 text-slate-500">
          A collection of images and moments.
        </p>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-slate-500">
              No gallery images are currently available.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.file_url}
                   alt={`${item.title} — John Kessellie Jallah`}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h2 className="font-semibold text-navy-900">
                    {item.title}
                  </h2>

                  {item.description && (
                    <p className="mt-2 text-sm text-slate-500">
                      {item.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}