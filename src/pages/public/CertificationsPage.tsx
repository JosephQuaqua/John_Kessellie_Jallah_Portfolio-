import { useEffect, useState } from 'react';
import { Award as AwardIcon, ExternalLink, Calendar, Building2 } from 'lucide-react';
import type { Certification } from '@/types/database';
import { fetchCertifications } from '@/lib/dataService';
import { Reveal } from '@/components/ui/Reveal';
import { LoadingSpinner, ErrorState, EmptyState } from '@/components/ui/States';

export function CertificationsPage() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCertifications()
      .then((data) => {
        setCerts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="pt-20"><LoadingSpinner size="lg" /></div>;
  if (error) return <div className="pt-20"><ErrorState message="Failed to load certifications." /></div>;

  return (
    <div className="pt-20">
      <section className="bg-navy-950 relative overflow-hidden py-20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[100px]" />
        <div className="container-page relative">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-400">Certifications & Workshops</span>
            <h1 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl text-white">Professional Development</h1>
            <p className="mt-4 text-white/50 max-w-xl">Certifications, workshops, and training programs that strengthen professional competencies.</p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          {certs.length === 0 ? (
            <EmptyState message="No certifications yet." hint="Check back soon for updates." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {certs.map((cert, i) => (
                <Reveal key={cert.id} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-soft hover:shadow-card transition-shadow">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-50 to-iris-50 text-accent-600">
                      <AwardIcon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-bold text-navy-900 text-base leading-snug">{cert.title}</h3>
                    {cert.issuer && (
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                        <Building2 className="h-3.5 w-3.5" /> {cert.issuer}
                      </p>
                    )}
                    {cert.completion_date && (
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar className="h-3.5 w-3.5" /> {cert.completion_date}
                      </p>
                    )}
                    {cert.description && <p className="mt-3 text-sm text-slate-500 leading-relaxed">{cert.description}</p>}
                    {cert.credential_url && (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent-600 font-medium hover:gap-2.5 transition-all"
                      >
                        View Credential <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {cert.credential_id && (
                      <p className="mt-3 text-xs text-slate-400">ID: {cert.credential_id}</p>
                    )}
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
