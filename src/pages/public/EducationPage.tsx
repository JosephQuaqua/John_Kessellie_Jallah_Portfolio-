import { useEffect, useState } from 'react';
import {
  GraduationCap,
  MapPin,
  Award,
  CalendarDays,
  Building2,
  BookOpen,
  FileText,
} from 'lucide-react';

import type { Education } from '@/types/database';
import { fetchEducation } from '@/lib/dataService';
import { Reveal } from '@/components/ui/Reveal';

import {
  LoadingSpinner,
  ErrorState,
  EmptyState,
} from '@/components/ui/States';

export function EducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchEducation()
      .then((data) => {
        setEducation(data);
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
        <ErrorState message="Failed to load education records." />
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

            <div className="max-w-3xl">

              <div className="flex items-center gap-3">

                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent-400 backdrop-blur-sm">

                  <GraduationCap className="h-5 w-5" />

                </span>

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400">

                  Academic Background

                </span>

              </div>


              <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">

                Education &
                <span className="text-accent-400">
                  {' '}Academic Growth.
                </span>

              </h1>


              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">

                A foundation shaped through formal education,
                academic development, research, and a continued
                commitment to learning and professional growth.

              </p>


              <div className="mt-10 flex items-center gap-3 text-sm text-slate-400">

                <GraduationCap className="h-4 w-4 text-accent-400" />

                <span>

                  Academic qualifications, research and continuous learning

                </span>

              </div>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          EDUCATION SECTION
      ===================================================== */}

      <section className="relative section-padding">

        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/40 to-white" />

        <div className="container-page relative max-w-5xl">


          {/* SECTION HEADER */}

          <Reveal>

            <div className="mb-14 max-w-2xl">

              <div className="flex items-center gap-3">

                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600">

                  <Building2 className="h-5 w-5" />

                </span>

                <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent-600">

                  Academic Journey

                </span>

              </div>


              <h2 className="mt-5 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">

                Education & Qualifications

              </h2>


              <p className="mt-4 text-base leading-relaxed text-slate-500">

                Academic experiences, qualifications, research interests,
                and areas of study that have contributed to professional
                and personal development.

              </p>

            </div>

          </Reveal>


          {/* =====================================================
              EDUCATION RECORDS
          ===================================================== */}

          {education.length === 0 ? (

            <EmptyState message="No education records have been added yet." />

          ) : (

            <div className="space-y-8">

              {education.map((edu, index) => (

                <Reveal
                  key={edu.id}
                  delay={index * 0.08}
                >

                  <article
                    className="
                      group
                      overflow-hidden
                      rounded-3xl
                      border
                      border-slate-200/70
                      bg-white
                      shadow-soft
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-accent-200
                      hover:shadow-card
                    "
                  >


                    <div className="p-6 sm:p-8">


                      {/* =====================
                          HEADER
                      ===================== */}

                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">


                        {/* Institution */}

                        <div className="flex items-start gap-4 sm:gap-5">


                          {/* Logo */}

                          <div
                            className="
                              flex
                              h-16
                              w-16
                              shrink-0
                              items-center
                              justify-center
                              overflow-hidden
                              rounded-2xl
                              border
                              border-slate-100
                              bg-slate-50
                              shadow-sm
                            "
                          >

                            {edu.institution_logo ? (

                              <img
                                src={edu.institution_logo}
                                alt={`${edu.institution} logo`}
                                className="h-full w-full object-contain p-2"
                              />

                            ) : (

                              <GraduationCap className="h-7 w-7 text-accent-500" />

                            )}

                          </div>


                          {/* Degree */}

                          <div>

                            <h3 className="font-display text-xl font-bold leading-snug text-navy-900 sm:text-2xl">

                              {edu.degree}

                            </h3>


                            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-accent-600">

                              <Building2 className="h-4 w-4 shrink-0" />

                              <span>

                                {edu.institution}

                              </span>

                            </div>


                            {edu.field_of_study && (

                              <p className="mt-2 text-sm text-slate-500">

                                {edu.field_of_study}

                              </p>

                            )}

                          </div>

                        </div>


                        {/* Date */}

                        {(edu.start_date || edu.end_date) && (

                          <div
                            className="
                              inline-flex
                              w-fit
                              shrink-0
                              items-center
                              gap-2
                              rounded-xl
                              border
                              border-slate-100
                              bg-slate-50
                              px-4
                              py-2.5
                              text-xs
                              font-semibold
                              text-slate-500
                            "
                          >

                            <CalendarDays className="h-4 w-4 text-accent-500" />

                            <span>

                              {edu.start_date || ''}

                              {edu.end_date
                                ? ` — ${edu.end_date}`
                                : ''
                              }

                            </span>

                          </div>

                        )}

                      </div>


                      {/* =====================
                          METADATA
                      ===================== */}

                      {(edu.location || edu.cgpa) && (

                        <div className="mt-6 flex flex-wrap items-center gap-3">


                          {edu.location && (

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-slate-50
                                px-3.5
                                py-2
                                text-sm
                                text-slate-500
                              "
                            >

                              <MapPin className="h-4 w-4 text-accent-500" />

                              {edu.location}

                            </span>

                          )}


                          {edu.cgpa && (

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-accent-100
                                bg-accent-50
                                px-3.5
                                py-2
                                text-sm
                                font-semibold
                                text-accent-700
                              "
                            >

                              <Award className="h-4 w-4" />

                              CGPA: {edu.cgpa}

                            </span>

                          )}

                        </div>

                      )}


                      {/* =====================
                          DESCRIPTION
                      ===================== */}

                      {edu.description && (

                        <div className="mt-7 border-t border-slate-100 pt-6">

                          <p className="max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">

                            {edu.description}

                          </p>

                        </div>

                      )}


                      {/* =====================
                          THESIS
                      ===================== */}

                      {edu.thesis && (

                        <div
                          className="
                            mt-7
                            rounded-2xl
                            border
                            border-iris-100
                            bg-iris-50/40
                            p-5
                            sm:p-6
                          "
                        >

                          <div className="flex items-start gap-4">

                            <span
                              className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-white
                                text-iris-600
                                shadow-sm
                              "
                            >

                              <FileText className="h-5 w-5" />

                            </span>


                            <div>

                              <p className="text-xs font-bold uppercase tracking-[0.16em] text-iris-700">

                                Research / Thesis

                              </p>


                              <p className="mt-3 text-sm leading-relaxed text-slate-600">

                                {edu.thesis}

                              </p>

                            </div>

                          </div>

                        </div>

                      )}


                      {/* =====================
                          COURSEWORK
                      ===================== */}

                      {edu.relevant_courses && (

                        <div
                          className="
                            mt-6
                            rounded-2xl
                            border
                            border-slate-100
                            bg-slate-50/70
                            p-5
                            sm:p-6
                          "
                        >

                          <div className="flex items-start gap-4">

                            <span
                              className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-white
                                text-accent-600
                                shadow-sm
                              "
                            >

                              <BookOpen className="h-5 w-5" />

                            </span>


                            <div>

                              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">

                                Relevant Coursework

                              </p>


                              <p className="mt-3 text-sm leading-relaxed text-slate-600">

                                {edu.relevant_courses}

                              </p>

                            </div>

                          </div>

                        </div>

                      )}


                      {/* =====================
                          FOOTER
                      ===================== */}

                      <div className="mt-8 flex items-center gap-3 border-t border-slate-100 pt-5">

                        <GraduationCap className="h-4 w-4 text-accent-500" />

                        <span className="text-xs font-medium text-slate-400">

                          Academic Qualification

                        </span>

                      </div>

                    </div>

                  </article>

                </Reveal>

              ))}

            </div>

          )}

        </div>

      </section>

    </div>
  );
}