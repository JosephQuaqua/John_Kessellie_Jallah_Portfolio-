import { useEffect, useState } from 'react';
import {
  Briefcase,
  MapPin,
  CalendarDays,
  Images,
  ArrowUpRight,
} from 'lucide-react';

import type { Experience } from '@/types/database';
import { fetchExperiences } from '@/lib/dataService';

import { Reveal } from '@/components/ui/Reveal';

import {
  LoadingSpinner,
  ErrorState,
  EmptyState,
} from '@/components/ui/States';

type ExperienceWithImages = Experience & {
  image_urls?: string[];
};

export function ExperiencePage() {
  const [experiences, setExperiences] = useState<ExperienceWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchExperiences()
      .then((data) => {
        setExperiences(data as ExperienceWithImages[]);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

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
        <ErrorState message="Failed to load professional experience." />
      </div>
    );
  }

  return (
    <div>

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative overflow-hidden bg-navy-950 pt-28 pb-20 sm:pt-32 sm:pb-24">

        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-accent-500/10 blur-[120px]" />

        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-iris-500/10 blur-[120px]" />

        <div className="container-page relative">

          <Reveal>

            <div className="flex items-center gap-3">

              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent-400 backdrop-blur-sm">

                <Briefcase className="h-5 w-5" />

              </span>

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400">

                Professional Experience

              </span>

            </div>


            <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">

              Experience That Creates
              <span className="text-accent-400">
                {' '}Meaningful Impact.
              </span>

            </h1>


            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">

              A professional journey shaped by public health,
              research, education, community engagement, and
              a commitment to improving the lives of others.

            </p>


            <div className="mt-10 flex items-center gap-3 text-sm text-slate-400">

              <Images className="h-4 w-4 text-accent-400" />

              <span>
                Professional work, community engagement & field experiences
              </span>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          EXPERIENCE TIMELINE
      ===================================================== */}

      <section className="relative section-padding">

        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/40 to-white" />

        <div className="container-page relative max-w-6xl">

          {experiences.length === 0 ? (

            <EmptyState message="No professional experiences yet." />

          ) : (

            <div className="relative">

              {/* Timeline line */}

              <div className="absolute left-5 top-0 bottom-0 hidden w-px bg-slate-200 lg:block" />


              <div className="space-y-12">

                {experiences.map((exp, index) => (

                  <Reveal
                    key={exp.id}
                    delay={index * 0.08}
                  >

                    <article className="relative lg:pl-20">


                      {/* Timeline Icon */}

                      <span
                        className="
                          absolute
                          left-0
                          top-8
                          hidden
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          border-4
                          border-white
                          bg-gradient-to-br
                          from-accent-500
                          to-iris-500
                          text-white
                          shadow-lg
                          lg:flex
                        "
                      >

                        <Briefcase className="h-4 w-4" />

                      </span>


                      <div
                        className="
                          overflow-hidden
                          rounded-3xl
                          border
                          border-slate-100
                          bg-white
                          shadow-soft
                          transition-all
                          duration-300
                          hover:shadow-card
                        "
                      >


                        {/* =====================
                            EXPERIENCE CONTENT
                        ===================== */}

                        <div className="p-6 sm:p-8">


                          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">


                            {/* Main Information */}

                            <div className="flex-1">

                              <div className="flex flex-wrap items-center gap-3">

                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600 lg:hidden">

                                  <Briefcase className="h-5 w-5" />

                                </span>


                                <div>

                                  <h2 className="font-display text-xl font-bold text-navy-900 sm:text-2xl">

                                    {exp.position}

                                  </h2>


                                  <p className="mt-1 font-medium text-accent-600">

                                    {exp.organization}

                                  </p>

                                </div>

                              </div>


                              {/* Metadata */}

                              <div className="mt-5 flex flex-wrap gap-3 text-xs">

                                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 font-medium text-slate-500">

                                  <CalendarDays className="h-3.5 w-3.5 text-accent-500" />

                                  {exp.start_date}

                                  {exp.end_date
                                    ? ` — ${exp.end_date}`
                                    : exp.is_current
                                      ? ' — Present'
                                      : ''
                                  }

                                </span>


                                {exp.location && (

                                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 font-medium text-slate-500">

                                    <MapPin className="h-3.5 w-3.5 text-accent-500" />

                                    {exp.location}

                                  </span>

                                )}

                              </div>


                              {/* Description */}

                              {exp.description && (

                                <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">

                                  {exp.description}

                                </p>

                              )}


                              {/* Responsibilities */}

                              {exp.responsibilities && (

                                <div className="mt-6 border-l-2 border-accent-400 pl-5">

                                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">

                                    Key Responsibilities

                                  </p>


                                  <p className="mt-2 text-sm leading-relaxed text-slate-600">

                                    {exp.responsibilities}

                                  </p>

                                </div>

                              )}

                            </div>


                            <ArrowUpRight
                              className="
                                hidden
                                h-6
                                w-6
                                shrink-0
                                text-slate-300
                                lg:block
                              "
                            />

                          </div>

                        </div>


                        {/* =====================
                            PHOTO GALLERY
                        ===================== */}

                        {exp.image_urls && exp.image_urls.length > 0 && (

                          <div className="border-t border-slate-100 bg-slate-50/70 p-4 sm:p-6">

                            <div className="mb-4 flex items-center gap-2">

                              <Images className="h-4 w-4 text-accent-500" />

                              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">

                                Experience Gallery

                              </p>

                            </div>


                            <div
                              className={`
                                grid
                                gap-4
                                ${
                                  exp.image_urls.length === 1
                                    ? 'grid-cols-1'
                                    : exp.image_urls.length === 2
                                      ? 'grid-cols-1 sm:grid-cols-2'
                                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                }
                              `}
                            >

                              {exp.image_urls.map((image, imageIndex) => (

                                <div
                                  key={imageIndex}
                                  className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-2xl
                                    bg-slate-200
                                  "
                                >

                                  <img
                                    src={image}
                                    alt={`${exp.position} experience ${imageIndex + 1}`}
                                    className="
                                      h-64
                                      w-full
                                      object-cover
                                      transition-transform
                                      duration-700
                                      group-hover:scale-105
                                      sm:h-72
                                    "
                                  />


                                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                </div>

                              ))}

                            </div>

                          </div>

                        )}

                      </div>

                    </article>

                  </Reveal>

                ))}

              </div>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          EXPERIENCE HIGHLIGHT
      ===================================================== */}

      {experiences.some(
        (experience) =>
          experience.image_urls &&
          experience.image_urls.length > 0
      ) && (

        <section className="border-t border-slate-100 bg-slate-50 section-padding">

          <div className="container-page">

            <Reveal>

              <div className="mx-auto max-w-3xl text-center">

                <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">

                  Work In Action

                </span>


                <h2 className="mt-4 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">

                  Experience Beyond The Role

                </h2>


                <p className="mt-5 text-base leading-relaxed text-slate-500">

                  A visual reflection of professional engagement,
                  community interaction, education, and the people
                  and environments that have shaped the journey.

                </p>

              </div>

            </Reveal>

          </div>

        </section>

      )}

    </div>
  );
}