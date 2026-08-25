import { useEffect, useState } from 'react';
import { GraduationCap, MapPin, Award } from 'lucide-react';
import type { Education } from '@/types/database';
import { fetchEducation } from '@/lib/dataService';
import { Reveal } from '@/components/ui/Reveal';
import { LoadingSpinner, ErrorState, EmptyState } from '@/components/ui/States';

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

  if (loading) return <div className="pt-20"><LoadingSpinner size="lg" /></div>;
  if (error) return <div className="pt-20"><ErrorState message="Failed to load education." /></div>;

  return (
    <div className="pt-20">
      <section className="bg-navy-950 relative overflow-hidden py-20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[100px]" />
        <div className="container-page relative">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-400">Education</span>
            <h1 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl text-white">Academic Background</h1>
            <p className="mt-4 text-white/50 max-w-xl">A strong academic foundation in health sciences and public health.</p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page max-w-4xl">
          {education.length === 0 ? (
            <EmptyState message="No education records yet." />
          ) : (
            <div className="space-y-8">
              {education.map((edu, i) => (
                <Reveal key={edu.id} delay={i * 0.1}>
                  <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-soft hover:shadow-card transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-50 to-iris-50 text-accent-600">
                        <GraduationCap className="h-7 w-7" />
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-bold text-navy-900 text-xl">{edu.degree}</h3>
                            <p className="text-accent-600 font-medium text-sm mt-0.5">{edu.institution}</p>
                          </div>
                          <span className="text-xs text-slate-400 font-medium shrink-0">
                            {edu.start_date}{edu.end_date ? ` — ${edu.end_date}` : ''}
                          </span>
                        </div>
                        {edu.location && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                            <MapPin className="h-3.5 w-3.5" /> {edu.location}
                          </div>
                        )}
                        {edu.field_of_study && <p className="text-sm text-slate-600">Field: {edu.field_of_study}</p>}
                        {edu.cgpa && (
                          <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-accent-50 text-accent-700 px-3 py-1.5 text-sm font-semibold">
                            <Award className="h-4 w-4" /> CGPA: {edu.cgpa}
                          </div>
                        )}
                        {edu.description && <p className="mt-4 text-sm text-slate-600 leading-relaxed">{edu.description}</p>}
                        {edu.thesis && (
                          <div className="mt-4 rounded-xl bg-slate-50 border border-slate-100 p-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Thesis</p>
                            <p className="text-sm text-slate-700 italic">"{edu.thesis}"</p>
                          </div>
                        )}
                        {edu.relevant_courses && (
                          <div className="mt-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Relevant Courses</p>
                            <p className="text-sm text-slate-600">{edu.relevant_courses}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
