import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  display_order: number;
  created_at: string;
}

export function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
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
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-accent-500" />
          <p className="mt-4 text-sm text-slate-500">
            Loading gallery...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <section className="pt-24 pb-12 sm:pt-28 sm:pb-14 lg:pt-32">
          <div className="max-w-3xl">

            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-accent-500" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-600">
                Fieldwork • Research • Community
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
              Gallery
            </h1>

            {/* Intro */}
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              A visual record of research, community engagement, academic
              activities, and experiences that have shaped my journey in
              public health.
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Explore moments from the field, research activities,
              collaborations, and initiatives focused on improving health
              and strengthening communities.
            </p>
          </div>
        </section>

        {/* Gallery */}
        {items.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-slate-500">
              No gallery images are currently available.
            </p>
          </div>
        ) : (
          <section aria-label="Gallery images">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={item.file_url}
                      alt={`${item.title} — John Kessellie Jallah`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="font-display text-lg font-bold text-navy-900">
                      {item.title}
                    </h2>

                    {item.description && (
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {item.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}