import { useState } from 'react';
import {
  BookOpen,
  Briefcase,
  Calendar,
  FileText,
  Microscope,
  Send,
  Loader2,
} from 'lucide-react';

import { supabase } from '@/lib/supabase';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

const consultationAreas = [
  {
    icon: BookOpen,
    title: 'Academic Guidance',
    description:
      'Support for academic development, educational planning, and research direction.',
  },
  {
    icon: Microscope,
    title: 'Research Consultation',
    description:
      'Guidance on research planning, methodology, and evidence-based work.',
  },
  {
    icon: Briefcase,
    title: 'Professional Development',
    description:
      'Career guidance and professional development support for future opportunities.',
  },
  {
    icon: FileText,
    title: 'Publication Guidance',
    description:
      'Support and guidance throughout the research and academic publication process.',
  },
];

export function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    consultation_area: '',
    message: '',
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSending(true);
    setSuccess(false);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('consultation_requests')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          consultation_area: formData.consultation_area,
          message: formData.message.trim(),
        });

      if (submitError) {
        throw submitError;
      }

      setSuccess(true);

      setFormData({
        name: '',
        email: '',
        consultation_area: '',
        message: '',
      });
    } catch (err) {
      console.error(
        'Failed to submit consultation request:',
        err
      );

      setError(
        'Unable to submit your consultation request. Please try again.'
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {/* ================= HERO ================= */}

      <section className="bg-navy-950 pb-20 pt-36">
        <div className="container-page">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-400">
              Professional Consultation
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold text-white sm:text-5xl">
              Let&apos;s Discuss Your Goals.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
              Request professional guidance and explore the next steps in your
              academic, research, or professional journey.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= MAIN CONSULTATION ================= */}

      <section className="section-padding">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">

          {/* ================= LEFT CONTENT ================= */}

          <Reveal>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent-600">
                Consultation
              </span>

              <h2 className="mt-3 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
                Focused guidance for meaningful decisions.
              </h2>

              <p className="mt-5 leading-relaxed text-slate-600">
                Whether you are navigating an academic decision, developing a
                research idea, exploring professional opportunities, or seeking
                guidance on publication-related work, a consultation provides an
                opportunity to discuss your goals and receive focused
                professional insight.
              </p>

              {/* ================= BENEFITS ================= */}

              <div className="mt-8 space-y-6">

                {/* Flexible Scheduling */}

                <div className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                    <Calendar className="h-5 w-5" />
                  </span>

                  <div>
                    <h3 className="font-semibold text-navy-900">
                      Flexible Scheduling
                    </h3>

                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      Consultation requests are reviewed and scheduled based on
                      availability.
                    </p>
                  </div>
                </div>

                {/* Professional Guidance */}

                <div className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                    <Microscope className="h-5 w-5" />
                  </span>

                  <div>
                    <h3 className="font-semibold text-navy-900">
                      Focused Professional Guidance
                    </h3>

                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      Each consultation is approached based on your specific
                      goals, questions, and professional needs.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </Reveal>

          {/* ================= REQUEST FORM ================= */}

          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">

              <div>
                <h2 className="font-display text-2xl font-extrabold text-navy-900">
                  Request a Consultation
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Complete the form below with a brief overview of what you
                  would like to discuss.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-5"
              >

                {/* Full Name */}

                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-navy-900"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/10"
                  />
                </div>

                {/* Email */}

                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-navy-900"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/10"
                  />
                </div>

                {/* Consultation Area */}

                <div>
                  <label
                    htmlFor="consultation_area"
                    className="text-sm font-semibold text-navy-900"
                  >
                    Consultation Area
                  </label>

                  <select
                    id="consultation_area"
                    name="consultation_area"
                    required
                    value={formData.consultation_area}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/10"
                  >
                    <option value="" disabled>
                      Select a consultation area
                    </option>

                    <option value="Academic Guidance">
                      Academic Guidance
                    </option>

                    <option value="Research Consultation">
                      Research Consultation
                    </option>

                    <option value="Professional Development">
                      Professional Development
                    </option>

                    <option value="Publication Guidance">
                      Publication Guidance
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                {/* Message */}

                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-navy-900"
                  >
                    What would you like to discuss?
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your goals or what you would like guidance with..."
                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/10"
                  />
                </div>

                {/* Success Message */}

                {success && (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-relaxed text-green-700">
                    Your consultation request has been submitted successfully.
                    It will be reviewed and you will be contacted through the
                    email address you provided.
                  </div>
                )}

                {/* Error Message */}

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-700">
                    {error}
                  </div>
                )}

                {/* Submit */}

                <Button
                  type="submit"
                  size="lg"
                  disabled={sending}
                  className="w-full justify-center"
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Consultation Request
                    </>
                  )}
                </Button>

              </form>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= AREAS OF CONSULTATION ================= */}

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-page section-padding">

          <Reveal>
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-600">
                Areas of Consultation
              </span>

              <h2 className="mt-3 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
                Areas where guidance may be available.
              </h2>

              <p className="mt-4 leading-relaxed text-slate-600">
                Professional guidance may be available across several academic,
                research, and professional areas depending on the nature of
                your request.
              </p>
            </div>
          </Reveal>

          {/* Consultation Areas */}

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {consultationAreas.map((area, index) => {
              const Icon = area.icon;

              return (
                <Reveal
                  key={area.title}
                  delay={index * 0.08}
                >
                  <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-200 hover:shadow-card">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 font-display text-base font-bold text-navy-900">
                      {area.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {area.description}
                    </p>

                  </div>
                </Reveal>
              );
            })}

          </div>

        </div>
      </section>
    </div>
  );
}