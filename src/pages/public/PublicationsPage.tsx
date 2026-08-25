import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ExternalLink, FileText, ArrowRight, Calendar, Tag } from 'lucide-react';
import type { Publication } from '@/types/database';
import { fetchPublications } from '@/lib/dataService';
import { Reveal } from '@/components/ui/Reveal';
import { LoadingSpinner, ErrorState, EmptyState } from '@/components/ui/States';
import { Input } from '@/components/ui/Input';

const PAGE_SIZE = 6;

export function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [year, setYear] = useState('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    fetchPublications()
      .then((data) => {
        setPublications(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    const set = new Set(publications.map((p) => p.category).filter(Boolean));
    return ['all', ...Array.from(set)] as string[];
  }, [publications]);

  const years = useMemo(() => {
    const set = new Set(publications.map((p) => p.publication_year).filter(Boolean));
    return ['all', ...Array.from(set).sort((a, b) => Number(b) - Number(a))].map(String);
  }, [publications]);

  const filtered = useMemo(() => {
    return publications.filter((p) => {
      const matchesSearch = !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.abstract || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.authors || '').toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'all' || p.category === category;
      const matchesYear = year === 'all' || String(p.publication_year) === year;
      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [publications, search, category, year]);

  if (loading) return <div className="pt-20"><LoadingSpinner size="lg" /></div>;
  if (error) return <div className="pt-20"><ErrorState message="Failed to load publications." /></div>;

  return (
    <div className="pt-20">
      <section className="bg-navy-950 relative overflow-hidden py-20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[100px]" />
        <div className="container-page relative">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-400">Publications</span>
            <h1 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl text-white">Research Library</h1>
            <p className="mt-4 text-white/50 max-w-xl">Peer-reviewed publications spanning healthcare innovation, cancer research, maternal health, and emerging technologies.</p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          {/* Filters */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search publications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y === 'all' ? 'All Years' : y}</option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <EmptyState message="No publications found." hint="Try adjusting your search or filters." />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.slice(0, visibleCount).map((pub, i) => (
                  <Reveal key={pub.id} delay={i * 0.06}>
                    <Link to={`/publications/${pub.id}`} className="group block h-full">
                      <article className="h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-soft hover:shadow-card hover:border-accent-200 transition-all">
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-50 to-iris-50 text-accent-600">
                            <FileText className="h-6 w-6" />
                          </span>
                          <div className="flex flex-wrap items-center gap-2 justify-end">
                            {pub.is_featured && (
                              <span className="text-xs font-medium rounded-full bg-iris-50 text-iris-700 px-2.5 py-1">Featured</span>
                            )}
                            <span className="text-xs font-medium rounded-full bg-accent-50 text-accent-700 px-2.5 py-1">{pub.category || 'Research'}</span>
                          </div>
                        </div>
                        <h3 className="font-bold text-navy-900 text-base leading-snug group-hover:text-accent-600 transition-colors">
                          {pub.title}
                        </h3>
                        {pub.authors && <p className="mt-2 text-xs text-slate-500">{pub.authors}</p>}
                        {pub.journal && <p className="mt-1 text-xs text-slate-400 italic">{pub.journal}</p>}
                        <p className="mt-3 text-sm text-slate-500 line-clamp-2">{pub.abstract}</p>
                        <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-50">
                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            {pub.publication_year && (
                              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {pub.publication_year}</span>
                            )}
                            {pub.doi && (
                              <span className="flex items-center gap-1 truncate max-w-[120px]"><Tag className="h-3.5 w-3.5" /> {pub.doi}</span>
                            )}
                          </div>
                          <span className="flex items-center gap-1 text-sm text-accent-600 font-medium">
                            Read <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </article>
                    </Link>
                  </Reveal>
                ))}
              </div>

              {visibleCount < filtered.length && (
                <div className="mt-10 text-center">
                  <button
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:border-accent-400 hover:text-accent-600 transition-colors"
                  >
                    Load More <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
