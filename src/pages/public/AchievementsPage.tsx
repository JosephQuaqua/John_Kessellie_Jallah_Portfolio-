import { useEffect, useState } from 'react';
import {
  Award as AwardIcon,
  Trophy,
  Users,
  Star,
  Sparkles,
  ArrowUpRight,
  Medal,
  CalendarDays,
} from 'lucide-react';

import type {
  Award,
  LeadershipExperience,
} from '@/types/database';

import {
  fetchAwards,
  fetchLeadership,
} from '@/lib/dataService';

import { Reveal } from '@/components/ui/Reveal';

import {
  LoadingSpinner,
  ErrorState,
  EmptyState,
} from '@/components/ui/States';

export function AchievementsPage() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [leadership, setLeadership] = useState<LeadershipExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetchAwards(),
      fetchLeadership(),
    ])
      .then(([awardsData, leadershipData]) => {
        setAwards(awardsData);
        setLeadership(leadershipData);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
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
        <ErrorState message="Failed to load achievements." />
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

                <Trophy className="h-5 w-5" />

              </span>

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400">

                Achievements & Leadership

              </span>

            </div>


            <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">

              Recognition Through
              <span className="text-accent-400">
                {' '}Excellence & Impact.
              </span>

            </h1>


            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">

              A journey shaped by academic achievement, professional
              dedication, leadership, and a continued commitment to
              creating meaningful impact within communities.

            </p>


            {/* Statistics */}

            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">

                <p className="text-2xl font-bold text-white sm:text-3xl">

                  {awards.length}

                </p>

                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">

                  Awards & Recognition

                </p>

              </div>


              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">

                <p className="text-2xl font-bold text-white sm:text-3xl">

                  {leadership.length}

                </p>

                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">

                  Leadership Roles

                </p>

              </div>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          AWARDS SECTION
      ===================================================== */}

      <section className="relative section-padding">

        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/40 to-white" />

        <div className="container-page relative">


          {/* Section Header */}

          <Reveal>

            <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

              <div className="max-w-2xl">

                <div className="flex items-center gap-3">

                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600">

                    <Medal className="h-5 w-5" />

                  </span>

                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">

                    Recognition

                  </span>

                </div>


                <h2 className="mt-5 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">

                  Awards & Recognition

                </h2>


                <p className="mt-4 text-base leading-relaxed text-slate-500">

                  Recognition of academic excellence, professional
                  contributions, and dedication to making a positive
                  difference.

                </p>

              </div>


              <div className="hidden h-px flex-1 bg-slate-200 sm:block" />

            </div>

          </Reveal>


          {awards.length === 0 ? (

            <EmptyState message="No awards yet." />

          ) : (

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

              {awards.map((award, index) => (

                <Reveal
                  key={award.id}
                  delay={index * 0.08}
                >

                  <article
                    className="
                      group
                      relative
                      h-full
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-100
                      bg-white
                      p-7
                      shadow-soft
                      transition-all
                      duration-300
                      hover:-translate-y-1.5
                      hover:border-accent-200
                      hover:shadow-card
                    "
                  >

                    {/* Decorative background */}

                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />


                    <div className="relative flex items-start justify-between gap-4">

                      <span
                        className="
                          flex
                          h-13
                          w-13
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          bg-gradient-to-br
                          from-accent-500
                          to-iris-500
                          text-white
                          shadow-lg
                          transition-transform
                          duration-300
                          group-hover:scale-110
                          group-hover:rotate-3
                        "
                      >

                        <AwardIcon className="h-6 w-6" />

                      </span>


                      {award.award_date && (

                        <span className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-400">

                          <CalendarDays className="h-3.5 w-3.5" />

                          {award.award_date}

                        </span>

                      )}

                    </div>


                    <div className="relative mt-7">

                      <h3 className="font-display text-lg font-bold leading-snug text-navy-900 transition-colors duration-300 group-hover:text-accent-600">

                        {award.title}

                      </h3>


                      {award.organization && (

                        <p className="mt-2 text-sm font-medium text-accent-600">

                          {award.organization}

                        </p>

                      )}


                      {award.description && (

                        <p className="mt-4 text-sm leading-relaxed text-slate-500">

                          {award.description}

                        </p>

                      )}

                    </div>


                    <div className="relative mt-6 flex items-center gap-2 border-t border-slate-100 pt-5 text-xs font-semibold uppercase tracking-wider text-slate-400">

                      <Sparkles className="h-3.5 w-3.5 text-accent-500" />

                      Achievement

                    </div>

                  </article>

                </Reveal>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          LEADERSHIP SECTION
      ===================================================== */}

      <section className="relative overflow-hidden border-y border-slate-100 bg-slate-50 section-padding">

        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-accent-100/40 blur-[140px]" />

        <div className="container-page relative">


          {/* Section Header */}

          <Reveal>

            <div className="mx-auto mb-14 max-w-3xl text-center">

              <div className="flex justify-center">

                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-accent-600 shadow-soft">

                  <Users className="h-6 w-6" />

                </span>

              </div>


              <span className="mt-5 block text-xs font-bold uppercase tracking-[0.18em] text-accent-600">

                Leadership & Service

              </span>


              <h2 className="mt-3 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">

                Leadership Experience

              </h2>


              <p className="mt-4 text-base leading-relaxed text-slate-500">

                Experiences built around leadership, collaboration,
                service, and contributing to the growth and success
                of organizations and communities.

              </p>

            </div>

          </Reveal>


          {leadership.length === 0 ? (

            <EmptyState message="No leadership records yet." />

          ) : (

            <div className="mx-auto max-w-4xl">

              <div className="relative">


                {/* Timeline line */}

                <div className="absolute bottom-0 left-5 top-0 hidden w-px bg-slate-200 sm:block" />


                <div className="space-y-6">

                  {leadership.map((lead, index) => (

                    <Reveal
                      key={lead.id}
                      delay={index * 0.1}
                    >

                      <article className="relative sm:pl-20">


                        {/* Timeline icon */}

                        <span
                          className="
                            absolute
                            left-0
                            top-7
                            hidden
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            border-4
                            border-slate-50
                            bg-accent-500
                            text-white
                            shadow-md
                            sm:flex
                          "
                        >

                          <Star className="h-4 w-4" />

                        </span>


                        <div
                          className="
                            group
                            rounded-2xl
                            border
                            border-slate-100
                            bg-white
                            p-6
                            shadow-soft
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-accent-200
                            hover:shadow-card
                            sm:p-7
                          "
                        >

                          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">


                            {/* Mobile icon */}

                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600 sm:hidden">

                              <Star className="h-5 w-5" />

                            </span>


                            <div className="flex-1">

                              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                                <div>

                                  <h3 className="font-display text-lg font-bold text-navy-900">

                                    {lead.position}

                                  </h3>


                                  {lead.organization && (

                                    <p className="mt-1 text-sm font-medium text-accent-600">

                                      {lead.organization}

                                    </p>

                                  )}

                                </div>


                                <span className="inline-flex w-fit shrink-0 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-400">

                                  {lead.start_date}

                                  {lead.end_date
                                    ? ` — ${lead.end_date}`
                                    : ' — Present'}

                                </span>

                              </div>


                              {lead.description && (

                                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-600">

                                  {lead.description}

                                </p>

                              )}

                            </div>


                            <ArrowUpRight
                              className="
                                hidden
                                h-5
                                w-5
                                shrink-0
                                text-slate-300
                                transition-all
                                duration-300
                                group-hover:-translate-y-1
                                group-hover:translate-x-1
                                group-hover:text-accent-500
                                sm:block
                              "
                            />

                          </div>

                        </div>

                      </article>

                    </Reveal>

                  ))}

                </div>

              </div>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          BOTTOM IMPACT SECTION
      ===================================================== */}

      

    </div>
  );
}