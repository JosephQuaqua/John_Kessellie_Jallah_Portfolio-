import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';

import type { GalleryItem } from '@/types/database';
import { fetchGallery } from '@/lib/dataService';

import { Reveal } from '@/components/ui/Reveal';
import { LoadingSpinner } from '@/components/ui/States';

export function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        const data = await fetchGallery();
        setGallery(data);
      } catch (error) {
        console.error('Failed to load gallery:', error);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, []);

  const selectedImage =
    selectedIndex !== null ? gallery[selectedIndex] : null;

  const showPrevious = () => {
    if (selectedIndex === null || gallery.length === 0) return;

    setSelectedIndex(
      selectedIndex === 0
        ? gallery.length - 1
        : selectedIndex - 1
    );
  };

  const showNext = () => {
    if (selectedIndex === null || gallery.length === 0) return;

    setSelectedIndex(
      selectedIndex === gallery.length - 1
        ? 0
        : selectedIndex + 1
    );
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      }

      if (event.key === 'ArrowLeft') {
        showPrevious();
      }

      if (event.key === 'ArrowRight') {
        showNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, gallery.length]);

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <div>
      {/* HERO */}
      <section className="bg-navy-950 pb-20 pt-36">
        <div className="container-page">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-400">
              Professional Gallery
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl">
              Gallery
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
              A collection of professional, academic, research,
              leadership, and community engagement moments.
            </p>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-padding">
        <div className="container-page">
          {gallery.length === 0 ? (
            <Reveal>
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-center shadow-soft">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
                  <Images className="h-8 w-8" />
                </span>

                <h2 className="mt-5 font-display text-2xl font-extrabold text-navy-900">
                  Gallery Coming Soon
                </h2>

                <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                  Gallery images will appear here once they have
                  been added.
                </p>
              </div>
            </Reveal>
          ) : (
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {gallery.map((item, index) => (
                <Reveal key={item.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className="group mb-6 block w-full overflow-hidden rounded-2xl border border-slate-100 bg-white text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={item.file_url}
                        alt={item.title}
                        loading="lazy"
                        className="block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    {(item.title || item.description) && (
                      <div className="p-5">
                        <h2 className="font-display text-lg font-bold text-navy-900">
                          {item.title}
                        </h2>

                        {item.description && (
                          <p className="mt-2 text-sm leading-relaxed text-slate-500">
                            {item.description}
                          </p>
                        )}
                      </div>
                    )}
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedImage && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close */}
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous */}
          {gallery.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Next */}
          {gallery.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Image */}
          <div
            className="flex max-h-full max-w-6xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedImage.file_url}
              alt={selectedImage.title}
              className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
            />

            <div className="mt-5 max-w-2xl text-center">
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
                {selectedImage.title}
              </h2>

              {selectedImage.description && (
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {selectedImage.description}
                </p>
              )}

              {gallery.length > 1 && (
                <p className="mt-3 text-xs font-medium uppercase tracking-widest text-accent-300">
                  {selectedIndex + 1} / {gallery.length}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}