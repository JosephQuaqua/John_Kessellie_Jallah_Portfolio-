import { useEffect, useState } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

import { Reveal } from '@/components/ui/Reveal';
import { LoadingSpinner } from '@/components/ui/States';

type GalleryItem = {
  id: string;
  title: string;
  description?: string | null;
  image_url: string;
};

export function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    // Temporary empty state.
    // We will connect this to Supabase in the next step.
    setImages([]);
    setLoading(false);
  }, []);

  const selectedImage =
    selectedIndex !== null ? images[selectedIndex] : null;

  const showPrevious = () => {
    if (selectedIndex === null || images.length === 0) return;

    setSelectedIndex(
      selectedIndex === 0
        ? images.length - 1
        : selectedIndex - 1
    );
  };

  const showNext = () => {
    if (selectedIndex === null || images.length === 0) return;

    setSelectedIndex(
      selectedIndex === images.length - 1
        ? 0
        : selectedIndex + 1
    );
  };

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
              Visual Archive
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl">
              Gallery
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
              A collection of professional, academic, research, and
              community experiences.
            </p>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-padding">
        <div className="container-page">
          {images.length === 0 ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-center shadow-soft">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
                <ImageIcon className="h-7 w-7" />
              </div>

              <h2 className="mt-5 font-display text-2xl font-extrabold text-navy-900">
                Gallery Coming Soon
              </h2>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                Gallery images will appear here once they have been
                uploaded through the administration portal.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => (
                <Reveal key={image.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className="group w-full overflow-hidden rounded-2xl border border-slate-100 bg-white text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                      <img
                        src={image.image_url}
                        alt={image.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5">
                      <h2 className="font-display text-lg font-bold text-navy-900">
                        {image.title}
                      </h2>

                      {image.description && (
                        <p className="mt-2 text-sm leading-relaxed text-slate-500">
                          {image.description}
                        </p>
                      )}
                    </div>
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-sm"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            aria-label="Close image"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrevious();
                }}
                aria-label="Previous image"
                className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-8"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
                className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="max-h-[90vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title}
              className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
            />

            <div className="mt-4 text-center">
              <h2 className="font-display text-xl font-bold text-white">
                {selectedImage.title}
              </h2>

              {selectedImage.description && (
                <p className="mx-auto mt-2 max-w-2xl text-sm text-white/60">
                  {selectedImage.description}
                </p>
              )}

              <p className="mt-2 text-xs text-white/40">
                {selectedIndex + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}