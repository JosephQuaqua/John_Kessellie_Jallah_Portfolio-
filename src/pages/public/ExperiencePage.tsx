import { useEffect, useState } from 'react';
import {
  Briefcase,
  MapPin,
  CalendarDays,
  Images,
  ArrowUpRight,
  Image as ImageIcon,
} from 'lucide-react';

import type { Experience } from '@/types/database';
import { fetchExperiences } from '@/lib/dataService';

import { Reveal } from '@/components/ui/Reveal';

import {
  LoadingSpinner,
  ErrorState,
  EmptyState,
} from '@/components/ui/States';

export function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchExperiences()
      .then((data) => {
        setExperiences(data);
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

              A professional journey shaped by research, leadership,
              education, community engagement, and meaningful
              contributions across different environments.

            </p>


            <div className="mt-10 flex flex-wrap items-center gap-4">

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm">

                <Briefcase className="h-4 w-4 text-accent-400" />

                <span>

                  {experiences.length}{' '}
                  {experiences.length === 1
                    ? 'Professional Experience'
                    : 'Professional Experiences'}

                </span>

              </div>


              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm">

                <Images className="h-4 w-4 text-accent-400" />

                <span>

                  Professional Work & Field Experiences

                </span>

              </div>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          EXPERIENCE TIMELINE
      ===================================================== */}

      <section className="relative overflow-hidden section-padding">

        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />

        <div className="container-page relative max-w-6xl">

          {/* Section Heading */}

          <Reveal>

            <div className="mb-14 max-w-2xl">

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">

                Career Journey

              </span>


              <h2 className="mt-4 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">

                Professional Experience

              </h2>


              <p className="mt-4 text-base leading-relaxed text-slate-500">

                A collection of professional roles, responsibilities,
                collaborations, and experiences that have contributed
                to personal and professional growth.

              </p>

            </div>

          </Reveal>


          {experiences.length === 0 ? (

            <EmptyState message="No professional experiences yet." />

          ) : (

            <div className="relative">

              {/* Timeline Line */}

              <div className="absolute bottom-0 left-5 top-0 hidden w-px bg-slate-200 lg:block" />


              <div className="space-y-12">

                {experiences.map((exp, index) => {

                  const imageCount = exp.image_urls?.length || 0;

                  return (

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


                        {/* Experience Card */}

                        <div
                          className="
                            group
                            overflow-hidden
                            rounded-3xl
                            border
                            border-slate-100
                            bg-white
                            shadow-soft
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-accent-100
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


                                {/* Title */}

                                <div className="flex items-start gap-4">

                                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-50 text-accent-600 lg:hidden">

                                    <Briefcase className="h-5 w-5" />

                                  </span>


                                  <div>

                                    <h2 className="font-display text-xl font-bold leading-snug text-navy-900 sm:text-2xl">

                                      {exp.position}

                                    </h2>


                                    <p className="mt-1 text-sm font-semibold text-accent-600 sm:text-base">

                                      {exp.organization}

                                    </p>

                                  </div>

                                </div>


                                {/* Metadata */}

                                <div className="mt-6 flex flex-wrap gap-3 text-xs">

                                  {(exp.start_date ||
                                    exp.end_date ||
                                    exp.is_current) && (

                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 font-medium text-slate-500">

                                      <CalendarDays className="h-3.5 w-3.5 text-accent-500" />

                                      {exp.start_date || 'Start'}

                                      {exp.end_date
                                        ? ` — ${exp.end_date}`
                                        : exp.is_current
                                          ? ' — Present'
                                          : ''
                                      }

                                    </span>

                                  )}


                                  {exp.location && (

                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 font-medium text-slate-500">

                                      <MapPin className="h-3.5 w-3.5 text-accent-500" />

                                      {exp.location}

                                    </span>

                                  )}


                                  {imageCount > 0 && (

                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1.5 font-medium text-accent-600">

                                      <Images className="h-3.5 w-3.5" />

                                      {imageCount}{' '}

                                      {imageCount === 1
                                        ? 'Photo'
                                        : 'Photos'}

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

                                  <div className="mt-7 border-l-2 border-accent-400 pl-5">

                                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">

                                      Key Responsibilities

                                    </p>


                                    <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">

                                      {exp.responsibilities}

                                    </p>

                                  </div>

                                )}

                              </div>


                              {/* Decorative Icon */}

                              <div className="hidden shrink-0 lg:block">

                                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-300 transition-all duration-300 group-hover:bg-accent-50 group-hover:text-accent-500">

                                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />

                                </span>

                              </div>

                            </div>

                          </div>


                          {/* =====================
                              PHOTO GALLERY
                          ===================== */}

                          {imageCount > 0 && (

                            <div className="border-t border-slate-100 bg-slate-50/70 p-4 sm:p-6">


                              {/* Gallery Header */}

                              <div className="mb-5 flex items-center justify-between gap-4">

                                <div className="flex items-center gap-2">

                                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-accent-600 shadow-sm">

                                    <ImageIcon className="h-4 w-4" />

                                  </span>


                                  <div>

                                    <p className="text-sm font-semibold text-navy-900">

                                      Experience Gallery

                                    </p>


                                    <p className="text-xs text-slate-400">

                                      Moments and highlights from this experience

                                    </p>

                                  </div>

                                </div>


                                <span className="hidden rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-400 sm:inline-flex">

                                  {imageCount}{' '}

                                  {imageCount === 1
                                    ? 'Photo'
                                    : 'Photos'}

                                </span>

                              </div>


                              {/* Images */}

                              <div
                                className={
                                  imageCount === 1
                                    ? 'grid grid-cols-1 gap-4'
                                    : imageCount === 2
                                      ? 'grid grid-cols-1 gap-4 sm:grid-cols-2'
                                      : 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
                                }
                              >

                                {exp.image_urls?.map(
                                  (image, imageIndex) => (

                                    <div
                                      key={`${image}-${imageIndex}`}
                                      className="
                                        group/image
                                        relative
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-slate-200/70
                                        bg-slate-200
                                        shadow-sm
                                      "
                                    >

                                      <img
                                        src={image}
                                        alt={`${exp.position} at ${exp.organization} — photo ${imageIndex + 1}`}
                                        loading="lazy"
                                        className="
                                          h-64
                                          w-full
                                          object-cover
                                          transition-transform
                                          duration-700
                                          ease-out
                                          group-hover/image:scale-105
                                          sm:h-72
                                        "
                                      />


                                      {/* Image Overlay */}

                                      <div
                                        className="
                                          absolute
                                          inset-0
                                          bg-gradient-to-t
                                          from-navy-950/50
                                          via-transparent
                                          to-transparent
                                          opacity-0
                                          transition-opacity
                                          duration-300
                                          group-hover/image:opacity-100
                                        "
                                      />


                                      {/* Photo Number */}

                                      <span
                                        className="
                                          absolute
                                          bottom-3
                                          left-3
                                          rounded-full
                                          border
                                          border-white/20
                                          bg-navy-950/50
                                          px-3
                                          py-1
                                          text-[10px]
                                          font-semibold
                                          uppercase
                                          tracking-wider
                                          text-white
                                          opacity-0
                                          backdrop-blur-sm
                                          transition-opacity
                                          duration-300
                                          group-hover/image:opacity-100
                                        "
                                      >

                                        Photo {imageIndex + 1}

                                      </span>

                                    </div>

                                  )
                                )}

                              </div>

                            </div>

                          )}

                        </div>

                      </article>

                    </Reveal>

                  );

                })}

              </div>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          BOTTOM SECTION
      ===================================================== */}

      {experiences.some(
        (experience) =>
          experience.image_urls &&
          experience.image_urls.length > 0
      ) && (

        <section className="relative overflow-hidden border-t border-slate-100 bg-slate-50 section-padding">

          <div className="absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-accent-100/40 blur-[120px]" />

          <div className="container-page relative">

            <Reveal>

              <div className="mx-auto max-w-3xl text-center">

                <span className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-accent-600">

                  <Images className="h-3.5 w-3.5" />

                  Work In Action

                </span>


                <h2 className="mt-6 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">

                  Experience Beyond The Role

                </h2>


                <p className="mt-5 text-base leading-relaxed text-slate-500">

                  Beyond job titles and responsibilities, these moments
                  reflect collaboration, community engagement, leadership,
                  learning, and the people and environments that have
                  shaped the professional journey.

                </p>

              </div>

            </Reveal>

          </div>

        </section>

      )}

    </div>
  );
}