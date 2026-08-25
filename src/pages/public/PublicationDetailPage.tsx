import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, FileText, Calendar, Tag, Users, BookMarked } from 'lucide-react';
import type { Publication } from '@/types/database';
import { fetchPublicationById, fetchPublications } from '@/lib/dataService';
import { Reveal } from '@/components/ui/Reveal';
import { LoadingSpinner, ErrorState, EmptyState } from '@/components/ui/States';
import { Button } from '@/components/ui/Button';

export function PublicationDetailPage() {
  const { id } = useParams();
  const [publication, setPublication] = useState<Publication | null>(null);
  const [related, setRelated] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([fetchPublicationById(id), fetchPublications()])
      .then(([pub, allPubs]) => {
        setPublication(pub);
        if (pub) {
          setRelated(allPubs.filter((p) => p.id !== pub.id && p.category === pub.category).slice(0, 3));
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="pt-20"><LoadingSpinner size="lg" /></div>;
  if (error) return <div className="pt-20"><ErrorState message="Failed to load publication." /></div>;
  if (!publication) return <div className="pt-20"><EmptyState message="Publication not found." /></div>;

  return (
    <div className="pt-20">
      <section className="bg-navy-950 relative overflow-hidden py-16">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[100px]" />
        <div className="container-page relative">
          <Link to="/publications" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Publications
          </Link>
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-400">{publication.category || 'Research'}</span>
            <h1 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight max-w-4xl">
              {publication.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Reveal>
                <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-soft">
                  {publication.abstract && (
                    <>
                      <h2 className="font-bold text-navy-900 text-lg mb-3">Abstract</h2>
                      <p className="text-slate-600 leading-relaxed">{publication.abstract}</p>
                    </>
                  )}
                </div>
              </Reveal>

              {publication.publication_url && (
                <Reveal delay={0.1}>
                  <a href={publication.publication_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" size="lg">
                      View Publication <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </Reveal>
              )}
            </div>

            <div className="space-y-4">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft space-y-4">
                  <h3 className="font-bold text-navy-900">Details</h3>
                  {publication.authors && (
                    <div className="flex items-start gap-2.5 text-sm">
                      <Users className="h-4 w-4 text-accent-500 shrink-0 mt-0.5" />
                      <div><p className="text-slate-400 text-xs">Authors</p><p className="text-slate-700">{publication.authors}</p></div>
                    </div>
                  )}
                  {publication.journal && (
                    <div className="flex items-start gap-2.5 text-sm">
                      <BookMarked className="h-4 w-4 text-accent-500 shrink-0 mt-0.5" />
                      <div><p className="text-slate-400 text-xs">Journal</p><p className="text-slate-700">{publication.journal}</p></div>
                    </div>
                  )}
                  {publication.publication_year && (
                    <div className="flex items-start gap-2.5 text-sm">
                      <Calendar className="h-4 w-4 text-accent-500 shrink-0 mt-0.5" />
                      <div><p className="text-slate-400 text-xs">Year</p><p className="text-slate-700">{publication.publication_year}</p></div>
                    </div>
                  )}
                  {publication.doi && (
                    <div className="flex items-start gap-2.5 text-sm">
                      <Tag className="h-4 w-4 text-accent-500 shrink-0 mt-0.5" />
                      <div><p className="text-slate-400 text-xs">DOI</p><p className="text-slate-700 break-all">{publication.doi}</p></div>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <Reveal>
                <h2 className="font-display font-extrabold text-2xl text-navy-900 mb-6">Related Publications</h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((pub, i) => (
                  <Reveal key={pub.id} delay={i * 0.1}>
                    <Link to={`/publications/${pub.id}`} className="group block h-full">
                      <article className="h-full rounded-2xl border border-slate-100 bg-white p-5 shadow-soft hover:shadow-card transition-all">
                        <FileText className="h-8 w-8 text-accent-400" />
                        <h3 className="mt-3 font-bold text-navy-900 text-sm leading-snug group-hover:text-accent-600 transition-colors line-clamp-3">
                          {pub.title}
                        </h3>
                        <p className="mt-2 text-xs text-slate-400">{pub.publication_year}</p>
                      </article>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
