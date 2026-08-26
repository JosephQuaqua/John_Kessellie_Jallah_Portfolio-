import { useEffect, useState } from 'react';
import {
  GraduationCap,
  MapPin,
  Award,
  CalendarDays,
  Building2,
  BookOpen,
  FileText,
  ArrowUpRight,
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
        <ErrorState message="Failed to load education records." />
      </div>
    );
  }

  return (
    <div className="bg-slate-50">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative overflow-hidden bg-navy-950 pt-28 pb-20 sm:pt-32 sm:pb-24">

        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-accent-500/10 blur-[120px]" />

        <div className="absolute bottom-[-200px] left-[-150px] h-[400px] w-[400px] rounded-full bg-iris-500/10 blur-[120px]" />

        <div className="container-page relative">

          <Reveal>

            <div className="max-w-3xl">

              <div className="flex items-center gap-3">

                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent-400">

                  <GraduationCap className="h-5 w-5" />

                </span>

                <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent-400">

                  Academic Background

                </span>

              </div>


              <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">

                Education &{" "}

                <span className="text-accent-400">

                  Learning

                </span>

              </h1>


              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">

                An academic journey focused on health sciences, public health,
                research, and the continuous pursuit of knowledge and
                professional development.

              </p>


              <div className="mt-8 flex items-center gap-3">

                <span className="h-px w-12 bg-accent-400" />

                <p className="text-sm text-white/40">

                  Building knowledge through education, research, and lifelong learning.

                </p>

              </div>

            </div>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          EDUCATION SECTION
      ===================================================== */}

      <section className="relative py-20 sm:py-24 lg:py-28">

        <div className="container-page max-w-5xl">


          {/* SECTION HEADER */}

          <Reveal>

            <div className="mb-14 text-center">

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-600">

                Academic Journey

              </span>


              <h2 className="mt-3 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">

                Education & Qualifications

              </h2>


              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">

                A foundation built through formal education, specialized
                training, research, and continuous academic development.

              </p>

            </div>

          </Reveal>


          {/* =====================================================
              EDUCATION RECORDS
          ===================================================== */}

          {education.length === 0 ? (

            <EmptyState message="No education records have been added yet." />

          ) : (

            <div className="space-y-8 sm:space-y-10">

              {education.map((edu, index) => (

                <Reveal
                  key={edu.id}
                  delay={index * 0.08}
                >

                  <article className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">


                    {/* TOP ACCENT */}

                    <div className="h-1 w-full bg-gradient-to-r from-accent-500 via-iris-500 to-transparent opacity-80" />


                    <div className="p-6 sm:p-8">


                      {/* =====================================================
                          HEADER
                      ===================================================== */}

                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">


                        {/* INSTITUTION + LOGO */}

                        <div className="flex items-start gap-4">


                          {/* INSTITUTION LOGO */}

                          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-sm">

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


                          {/* DEGREE INFORMATION */}

                          <div>

                            <h3 className="font-display text-xl font-bold text-navy-900 sm:text-2xl">

                              {edu.degree}

                            </h3>


                            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-accent-600">

                              <Building2 className="h-4 w-4" />

                              {edu.institution}

                            </div>


                            {edu.field_of_study && (

                              <p className="mt-2 text-sm text-slate-500">

                                {edu.field_of_study}

                              </p>

                            )}

                          </div>

                        </div>


                        {/* DATE */}

                        <div className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-500">

                          <CalendarDays className="h-4 w-4 text-accent-500" />

                          <span>

                            {edu.start_date}

                            {edu.end_date
                              ? ` — ${edu.end_date}`
                              : ''}

                          </span>

                        </div>

                      </div>


                      {/* =====================================================
                          LOCATION + CGPA
                      ===================================================== */}

                      {(edu.location || edu.cgpa) && (

                        <div className="mt-6 flex flex-wrap items-center gap-3">


                          {edu.location && (

                            <div className="flex items-center gap-2 text-sm text-slate-500">

                              <MapPin className="h-4 w-4 text-accent-500" />

                              {edu.location}

                            </div>

                          )}


                          {edu.cgpa && (

                            <div className="inline-flex items-center gap-2 rounded-xl border border-accent-100 bg-accent-50 px-3.5 py-2 text-sm font-bold text-accent-700">

                              <Award className="h-4 w-4" />

                              CGPA: {edu.cgpa}

                            </div>

                          )}

                        </div>

                      )}


                      {/* =====================================================
                          DESCRIPTION
                      ===================================================== */}

                      {edu.description && (

                        <div className="mt-6 border-t border-slate-100 pt-6">

                          <p className="text-sm leading-7 text-slate-600 sm:text-[15px]">

                            {edu.description}

                          </p>

                        </div>

                      )}


                      {/* =====================================================
                          THESIS
                      ===================================================== */}

                      {edu.thesis && (

                        <div className="mt-6 rounded-2xl border border-iris-100 bg-gradient-to-br from-iris-50/70 to-white p-5 sm:p-6">

                          <div className="mb-3 flex items-center gap-2">

                            <FileText className="h-4 w-4 text-iris-600" />

                            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-iris-700">

                              Research / Thesis

                            </h4>

                          </div>


                          <p className="text-sm italic leading-7 text-slate-600">

                            “{edu.thesis}”

                          </p>

                        </div>

                      )}


                      {/* =====================================================
                          RELEVANT COURSES
                      ===================================================== */}

                      {edu.relevant_courses && (

                        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 sm:p-6">

                          <div className="mb-3 flex items-center gap-2">

                            <BookOpen className="h-4 w-4 text-accent-600" />

                            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">

                              Relevant Coursework

                            </h4>

                          </div>


                          <p className="text-sm leading-7 text-slate-600">

                            {edu.relevant_courses}

                          </p>

                        </div>

                      )}


                      {/* =====================================================
                          FOOTER
                      ===================================================== */}

                      <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">

                        <span className="text-xs font-medium text-slate-400">

                          Academic Qualification

                        </span>


                        <span className="flex items-center gap-1 text-xs font-semibold text-accent-600 transition-transform duration-300 group-hover:translate-x-1">

                          Education {String(index + 1).padStart(2, '0')}

                          <ArrowUpRight className="h-3.5 w-3.5" />

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