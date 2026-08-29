import { Reveal } from '@/components/ui/Reveal';

export function ConsultationPage() {
  return (
    <div>
      <section className="bg-navy-950 pb-20 pt-36">
        <div className="container-page">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-400">
              Professional Consultation
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl">
              Book a Consultation
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
              Schedule a professional consultation for academic,
              research, career, and publication guidance.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-card">
            <h2 className="font-display text-2xl font-extrabold text-navy-900">
              Consultation Booking
            </h2>

            <p className="mt-3 text-slate-500">
              The consultation booking form will be added here.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}