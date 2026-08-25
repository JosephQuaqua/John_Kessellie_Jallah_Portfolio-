import { useEffect, useState } from 'react';
import { Mail, Linkedin, MapPin, Phone, Globe2, Microscope, HeartPulse, BarChart3, BookOpen } from 'lucide-react';
import type { Profile, Skill, ResearchInterest } from '@/types/database';
import { getProfile, fetchSkills, fetchResearchInterests } from '@/lib/dataService';
import { Reveal } from '@/components/ui/Reveal';
import { LoadingSpinner, ErrorState } from '@/components/ui/States';

const PROFILE_IMG = 'https://images.pexels.com/photos/33048698/pexels-photo-33048698.jpeg?auto=compress&cs=tinysrgb&h=900&w=700';

export function AboutPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [interests, setInterests] = useState<ResearchInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([getProfile(), fetchSkills(), fetchResearchInterests()])
      .then(([p, s, i]) => {
        setProfile(p);
        setSkills(s);
        setInterests(i);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner size="lg" />;
  if (error) return <ErrorState message="Failed to load profile." />;

  const skillsByCategory = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    (acc[skill.category] ||= []).push(skill);
    return acc;
  }, {});

  const values = [
    { icon: Microscope, title: 'Research & Evidence', desc: 'Rigorous, data-driven inquiry grounded in scientific methodology.' },
    { icon: HeartPulse, title: 'Community Impact', desc: 'Working to improve health equity for underserved populations.' },
    { icon: BarChart3, title: 'Data-Driven Decisions', desc: 'Leveraging analytics and evidence to guide better health outcomes.' },
    { icon: Globe2, title: 'Global Perspective', desc: 'Cross-cultural experience spanning Liberia and India.' },
  ];

  return (
    <div className="pt-20">
      <section className="bg-navy-950 relative overflow-hidden py-20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[100px]" />
        <div className="container-page relative">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-400">About Me</span>
            <h1 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl text-white">
              Committed to Better Health Outcomes for All
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <Reveal className="lg:col-span-2">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent-100 to-iris-100 opacity-50" />
              <img src={PROFILE_IMG} alt="John Kessellie Jallah" className="relative rounded-2xl shadow-card object-cover w-full" />
            </div>
            <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft space-y-3">
              <h3 className="font-bold text-navy-900">Contact Information</h3>
              <div className="space-y-2.5 text-sm">
                {profile?.email && (
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <Mail className="h-4 w-4 text-accent-500" /> {profile.email}
                  </div>
                )}
                {profile?.phone && (
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <Phone className="h-4 w-4 text-accent-500" /> {profile.phone}
                  </div>
                )}
                {profile?.location && (
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <MapPin className="h-4 w-4 text-accent-500" /> {profile.location}
                  </div>
                )}
                {profile?.linkedin_url && (
                  <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-slate-600 hover:text-accent-600 transition-colors">
                    <Linkedin className="h-4 w-4 text-accent-500" /> LinkedIn Profile
                  </a>
                )}
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-3 space-y-6">
            <Reveal>
              <h2 className="font-display font-extrabold text-2xl text-navy-900">Professional Biography</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-slate-600 leading-relaxed">{profile?.full_bio}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {values.map((val) => {
                  const Icon = val.icon;
                  return (
                    <div key={val.title} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-soft">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-navy-900">{val.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{val.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-white section-padding border-y border-slate-100">
        <div className="container-page">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-600">Skills & Competencies</span>
              <h2 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl text-navy-900">Technical & Professional Skills</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skillsByCategory).map(([category, items], i) => (
              <Reveal key={category} delay={i * 0.1}>
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
                  <div className="flex items-center gap-2.5 mb-4">
                    <BookOpen className="h-5 w-5 text-accent-500" />
                    <h3 className="font-bold text-navy-900">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span key={skill.id} className="text-xs font-medium rounded-lg bg-slate-50 text-slate-700 px-3 py-1.5 border border-slate-100">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Research interests */}
      <section className="section-padding">
        <div className="container-page">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-600">Research Interests</span>
              <h2 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl text-navy-900">Areas of Focus</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {interests.map((interest, i) => (
              <Reveal key={interest.id} delay={i * 0.06}>
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft hover:shadow-card transition-shadow">
                  <h3 className="font-bold text-navy-900 text-sm">{interest.title}</h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">{interest.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
