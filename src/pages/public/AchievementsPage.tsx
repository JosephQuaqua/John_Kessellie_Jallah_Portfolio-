import { useEffect, useState } from 'react';
import { Award as AwardIcon, Trophy, Users, Star } from 'lucide-react';
import type { Award, LeadershipExperience } from '@/types/database';
import { fetchAwards, fetchLeadership } from '@/lib/dataService';
import { Reveal } from '@/components/ui/Reveal';
import { LoadingSpinner, ErrorState, EmptyState } from '@/components/ui/States';

export function AchievementsPage() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [leadership, setLeadership] = useState<LeadershipExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([fetchAwards(), fetchLeadership()])
      .then(([a, l]) => {
        setAwards(a);
        setLeadership(l);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="pt-20"><LoadingSpinner size="lg" /></div>;
  if (error) return <div className="pt-20"><ErrorState message="Failed to load achievements." /></div>;

  return (
    <div>
      <section className="bg-navy-950 relative overflow-hidden py-20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[100px]" />
        <div className="container-page relative">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-400">Achievements</span>
            <h1 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl text-white">Awards & Leadership</h1>
            <p className="mt-4 text-white/50 max-w-xl">Recognition for academic excellence and commitment to community leadership.</p>
          </Reveal>
        </div>
      </section>

      {/* Awards */}
      <section className="section-padding">
        <div className="container-page">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <Trophy className="h-6 w-6 text-accent-500" />
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-navy-900">Awards & Recognition</h2>
            </div>
          </Reveal>
          {awards.length === 0 ? (
            <EmptyState message="No awards yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {awards.map((award, i) => (
                <Reveal key={award.id} delay={i * 0.1}>
                  <div className="h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-soft hover:shadow-card transition-shadow">
                    <div className="flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-iris-500 text-white shadow-md">
                        <AwardIcon className="h-6 w-6" />
                      </span>
                      {award.award_date && <span className="text-xs text-slate-400 font-medium">{award.award_date}</span>}
                    </div>
                    <h3 className="mt-4 font-bold text-navy-900 text-base leading-snug">{award.title}</h3>
                    {award.organization && <p className="mt-1 text-sm text-accent-600">{award.organization}</p>}
                    {award.description && <p className="mt-3 text-sm text-slate-500 leading-relaxed">{award.description}</p>}
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-white section-padding border-y border-slate-100">
        <div className="container-page">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <Users className="h-6 w-6 text-accent-500" />
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-navy-900">Leadership & Volunteer Experience</h2>
            </div>
          </Reveal>
          {leadership.length === 0 ? (
            <EmptyState message="No leadership records yet." />
          ) : (
            <div className="space-y-4 max-w-3xl">
              {leadership.map((lead, i) => (
                <Reveal key={lead.id} delay={i * 0.1}>
                  <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft hover:shadow-card transition-shadow">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                      <Star className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                        <div>
                          <h3 className="font-bold text-navy-900 text-base">{lead.position}</h3>
                          <p className="text-sm text-accent-600 mt-0.5">{lead.organization}</p>
                        </div>
                        <span className="text-xs text-slate-400 font-medium shrink-0">
                          {lead.start_date}{lead.end_date ? ` — ${lead.end_date}` : ''}
                        </span>
                      </div>
                      {lead.description && <p className="mt-3 text-sm text-slate-600 leading-relaxed">{lead.description}</p>}
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
