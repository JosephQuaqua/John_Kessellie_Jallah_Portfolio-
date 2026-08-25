import { useEffect, useState } from 'react';
import { Briefcase, MapPin } from 'lucide-react';
import type { Experience } from '@/types/database';
import { fetchExperiences } from '@/lib/dataService';
import { Reveal } from '@/components/ui/Reveal';
import { LoadingSpinner, ErrorState, EmptyState } from '@/components/ui/States';

export function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchExperiences()
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="pt-20"><LoadingSpinner size="lg" /></div>;
  if (error) return <div className="pt-20"><ErrorState message="Failed to load experience." /></div>;

  return (
    <div className="pt-20">
      <section className="bg-navy-950 relative overflow-hidden py-20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[100px]" />
        <div className="container-page relative">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-400">Professional Experience</span>
            <h1 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl text-white">Career Journey</h1>
            <p className="mt-4 text-white/50 max-w-xl">A trajectory spanning public health research, hospital administration, teaching, and community health initiatives.</p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page max-w-4xl">
          {experiences.length === 0 ? (
            <EmptyState message="No experiences yet." />
          ) : (
            <div className="relative">
              <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-slate-200" />
              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <Reveal key={exp.id} delay={i * 0.1}>
                    <div className="relative pl-14 sm:pl-20">
                      <span className="absolute left-0 sm:left-2 top-1 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-iris-500 text-white shadow-md">
                        <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft hover:shadow-card transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <div>
                            <h3 className="font-bold text-navy-900 text-lg">{exp.position}</h3>
                            <p className="text-accent-600 font-medium text-sm mt-0.5">{exp.organization}</p>
                          </div>
                          <span className="text-xs text-slate-400 font-medium shrink-0">
                            {exp.start_date}{exp.end_date ? ` — ${exp.end_date}` : exp.is_current ? ' — Present' : ''}
                          </span>
                        </div>
                        {exp.location && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                            <MapPin className="h-3.5 w-3.5" /> {exp.location}
                          </div>
                        )}
                        {exp.description && <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>}
                        {exp.responsibilities && (
                          <div className="mt-4 pt-4 border-t border-slate-50">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Responsibilities</p>
                            <p className="text-sm text-slate-600 leading-relaxed">{exp.responsibilities}</p>
                          </div>
                        )}
                      </div>
                    </div>
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
