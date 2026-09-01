import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  FileText,
  ArrowRight,
  Calendar,
  Tag,
  BookOpen,
  Filter,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

import type { Publication } from '@/types/database';
import { fetchPublications } from '@/lib/dataService';
import { Reveal } from '@/components/ui/Reveal';
import {
  LoadingSpinner,
  ErrorState,
  EmptyState,
} from '@/components/ui/States';
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
    const set = new Set(
      publications
        .map((p) => p.category)
        .filter(Boolean)
    );

    return ['all', ...Array.from(set)] as string[];
  }, [publications]);

  const years = useMemo(() => {
    const set = new Set(
      publications
        .map((p) => p.publication_year)
        .filter(Boolean)
    );

    return [
      'all',
      ...Array.from(set)
        .sort((a, b) => Number(b) - Number(a)),
    ].map(String);
  }, [publications]);

  const filtered = useMemo(() => {
    return publications.filter((p) => {
      const query = search.toLowerCase();

      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(query) ||
        (p.abstract || '')
          .toLowerCase()
          .includes(query) ||
        (p.authors || '')
          .toLowerCase()
          .includes(query) ||
        (p.journal || '')
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        category === 'all' ||
        p.category === category;

      const matchesYear =
        year === 'all' ||
        String(p.publication_year) === year;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesYear
      );
    });
  }, [
    publications,
    search,
    category,
    year,
  ]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [
    search,
    category,
    year,
  ]);

  if (loading) {
    return (
      <div className="pt-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20">
        <ErrorState message="Failed to load publications." />
      </div>
    );
  }

  return (
    <div className="bg-slate-50">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

     <section className="relative overflow-hidden bg-navy-950 pt-28 pb-10 sm:pt-32 sm:pb-12">

        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-accent-500/10 blur-[120px]" />

        <div className="absolute bottom-[-200px] left-[-150px] h-[400px] w-[400px] rounded-full bg-iris-500/10 blur-[120px]" />

        <div className="container-page relative">

          <Reveal>

            <div className="max-w-3xl">

              <div className="flex items-center gap-3">

                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent-400">

                  <BookOpen className="h-5 w-5" />

                </span>

                <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent-400">

                  Research & Publications

                </span>

              </div>


              <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">

                Research

                {' '}

                <span className="text-accent-400">

                  Library

                </span>

              </h1>


              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">

                Exploring research, evidence, innovation, and knowledge
                across public health, healthcare, community development,
                and emerging areas of scientific interest.

              </p>


              <div className="mt-7 flex flex-wrap items-center gap-4">

                <div className="flex items-center gap-2 text-sm text-white/50">

                  <FileText className="h-4 w-4 text-accent-400" />

                  <span>

                    {publications.length}{' '}

                    {publications.length === 1
                      ? 'Publication'
                      : 'Publications'}

                  </span>

                </div>


                <span className="hidden h-4 w-px bg-white/15 sm:block" />


                <div className="flex items-center gap-2 text-sm text-white/50">

                  <Sparkles className="h-4 w-4 text-accent-400" />

                  Research & Innovation

                </div>

              </div>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          PUBLICATIONS SECTION
      ===================================================== */}

      <section className="relative py-20 sm:py-24 lg:py-28">

        <div className="container-page">


          {/* SECTION HEADER */}

          <Reveal>

            <div className="mx-auto mb-12 max-w-3xl text-center">

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-600">

                Explore Research

              </span>


              <h2 className="mt-3 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">

                Publications & Academic Work

              </h2>


              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">

                Browse publications, research papers, articles, and
                academic contributions across different areas of study.

              </p>

            </div>

          </Reveal>


          {/* =====================================================
              FILTER PANEL
          ===================================================== */}

          <Reveal delay={0.05}>

            <div className="mb-12 rounded-3xl border border-slate-200/70 bg-white p-5 shadow-soft sm:p-6">

              <div className="mb-5 flex items-center gap-2">

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-50 text-accent-600">

                  <Filter className="h-4 w-4" />

                </span>


                <div>

                  <h3 className="text-sm font-bold text-navy-900">

                    Search Publications

                  </h3>

                  <p className="text-xs text-slate-400">

                    Find research by topic, category, author, or year.

                  </p>

                </div>

              </div>


              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">


                {/* SEARCH */}

                <div className="relative lg:col-span-2">

                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    placeholder="Search by title, author, journal..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="pl-10"
                  />

                </div>


                {/* CATEGORY */}

                <div className="relative">

                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    className="
                      w-full
                      appearance-none
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-2.5
                      pr-10
                      text-sm
                      text-slate-700
                      outline-none
                      transition-colors
                      focus:border-accent-400
                      focus:ring-2
                      focus:ring-accent-100
                    "
                  >

                    {categories.map((item) => (

                      <option
                        key={item}
                        value={item}
                      >

                        {item === 'all'
                          ? 'All Categories'
                          : item}

                      </option>

                    ))}

                  </select>


                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                </div>


                {/* YEAR */}

                <div className="relative">

                  <select
                    value={year}
                    onChange={(e) =>
                      setYear(e.target.value)
                    }
                    className="
                      w-full
                      appearance-none
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-2.5
                      pr-10
                      text-sm
                      text-slate-700
                      outline-none
                      transition-colors
                      focus:border-accent-400
                      focus:ring-2
                      focus:ring-accent-100
                    "
                  >

                    {years.map((item) => (

                      <option
                        key={item}
                        value={item}
                      >

                        {item === 'all'
                          ? 'All Years'
                          : item}

                      </option>

                    ))}

                  </select>


                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                </div>

              </div>


              {/* RESULTS */}

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                <p className="text-xs text-slate-400">

                  Showing{' '}

                  <span className="font-semibold text-navy-900">

                    {Math.min(
                      visibleCount,
                      filtered.length
                    )}

                  </span>

                  {' '}of{' '}

                  <span className="font-semibold text-navy-900">

                    {filtered.length}

                  </span>

                  {' '}results

                </p>


                {(search ||
                  category !== 'all' ||
                  year !== 'all') && (

                  <button
                    onClick={() => {
                      setSearch('');
                      setCategory('all');
                      setYear('all');
                    }}
                    className="text-xs font-semibold text-accent-600 transition-colors hover:text-accent-700"
                  >

                    Clear filters

                  </button>

                )}

              </div>

            </div>

          </Reveal>


          {/* =====================================================
              PUBLICATION GRID
          ===================================================== */}

          {filtered.length === 0 ? (

            <EmptyState
              message="No publications found."
              hint="Try adjusting your search or filters."
            />

          ) : (

            <>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                {filtered
                  .slice(0, visibleCount)
                  .map((pub, index) => (

                    <Reveal
                      key={pub.id}
                      delay={index * 0.06}
                    >

                      <Link
                        to={`/publications/${pub.id}`}
                        className="group block h-full"
                      >

                        <article className="
                          relative
                          flex
                          h-full
                          flex-col
                          overflow-hidden
                          rounded-3xl
                          border
                          border-slate-200/70
                          bg-white
                          p-6
                          shadow-soft
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:border-accent-200
                          hover:shadow-card
                        ">


                          {/* TOP ACCENT */}

                          <div className="
                            absolute
                            left-0
                            top-0
                            h-1
                            w-full
                            bg-gradient-to-r
                            from-accent-500
                            via-iris-500
                            to-transparent
                            opacity-0
                            transition-opacity
                            duration-300
                            group-hover:opacity-100
                          " />


                          {/* HEADER */}

                          <div className="flex items-start justify-between gap-4">


                            <span className="
                              flex
                              h-12
                              w-12
                              shrink-0
                              items-center
                              justify-center
                              rounded-2xl
                              bg-gradient-to-br
                              from-accent-50
                              to-iris-50
                              text-accent-600
                              transition-transform
                              duration-300
                              group-hover:scale-105
                            ">

                              <FileText className="h-6 w-6" />

                            </span>


                            <div className="flex flex-wrap justify-end gap-2">

                              {pub.is_featured && (

                                <span className="
                                  inline-flex
                                  items-center
                                  gap-1
                                  rounded-full
                                  bg-iris-50
                                  px-2.5
                                  py-1
                                  text-[11px]
                                  font-semibold
                                  text-iris-700
                                ">

                                  <Sparkles className="h-3 w-3" />

                                  Featured

                                </span>

                              )}


                              <span className="
                                rounded-full
                                bg-accent-50
                                px-2.5
                                py-1
                                text-[11px]
                                font-semibold
                                text-accent-700
                              ">

                                {pub.category || 'Research'}

                              </span>

                            </div>

                          </div>


                          {/* CONTENT */}

                          <div className="mt-6 flex-1">


                            <h3 className="
                              font-display
                              text-lg
                              font-bold
                              leading-snug
                              text-navy-900
                              transition-colors
                              duration-300
                              group-hover:text-accent-600
                            ">

                              {pub.title}

                            </h3>


                            {pub.authors && (

                              <p className="mt-3 text-xs leading-relaxed text-slate-500">

                                {pub.authors}

                              </p>

                            )}


                            {pub.journal && (

                              <p className="mt-2 text-xs font-medium italic text-slate-400">

                                {pub.journal}

                              </p>

                            )}


                            {pub.abstract && (

                              <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">

                                {pub.abstract}

                              </p>

                            )}

                          </div>


                          {/* FOOTER */}

                          <div className="mt-6 border-t border-slate-100 pt-5">


                            <div className="flex items-center justify-between gap-3">


                              <div className="flex min-w-0 items-center gap-3 text-xs text-slate-400">


                                {pub.publication_year && (

                                  <span className="flex shrink-0 items-center gap-1">

                                    <Calendar className="h-3.5 w-3.5 text-accent-500" />

                                    {pub.publication_year}

                                  </span>

                                )}


                                {pub.doi && (

                                  <span className="
                                    flex
                                    min-w-0
                                    items-center
                                    gap-1
                                    truncate
                                    text-slate-400
                                  ">

                                    <Tag className="h-3.5 w-3.5 shrink-0" />

                                    <span className="max-w-[110px] truncate">

                                      DOI

                                    </span>

                                  </span>

                                )}

                              </div>


                              <span className="
                                flex
                                shrink-0
                                items-center
                                gap-1.5
                                text-sm
                                font-semibold
                                text-accent-600
                              ">

                                Read

                                <ArrowRight className="
                                  h-4
                                  w-4
                                  transition-transform
                                  duration-300
                                  group-hover:translate-x-1
                                " />

                              </span>

                            </div>

                          </div>

                        </article>

                      </Link>

                    </Reveal>

                  ))}

              </div>


              {/* =====================================================
                  LOAD MORE
              ===================================================== */}

              {visibleCount < filtered.length && (

                <div className="mt-12 text-center">

                  <button
                    onClick={() =>
                      setVisibleCount(
                        (count) =>
                          count + PAGE_SIZE
                      )
                    }
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-300
                      bg-white
                      px-6
                      py-3
                      text-sm
                      font-semibold
                      text-slate-700
                      shadow-sm
                      transition-all
                      hover:-translate-y-0.5
                      hover:border-accent-400
                      hover:text-accent-600
                      hover:shadow-soft
                    "
                  >

                    Load More Publications

                    <ArrowRight className="
                      h-4
                      w-4
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    " />

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