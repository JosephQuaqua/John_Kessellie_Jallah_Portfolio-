import { useEffect, useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Send,
  Loader2,
} from 'lucide-react';

import type { Profile } from '@/types/database';

import {
  getProfile,
  submitContactMessage,
} from '@/lib/dataService';

import { Reveal } from '@/components/ui/Reveal';
import { LoadingSpinner } from '@/components/ui/States';
import { Button } from '@/components/ui/Button';

export function ContactPage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSending(true);
    setError('');
    setSuccess(false);

    try {
      await submitContactMessage(formData);

      setSuccess(true);

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      console.error(err);

      setError(
        'Failed to send your message. Please try again.'
      );
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" />;
  }

  return (
    <div>

      {/* =========================
          HERO
      ========================= */}

      <section className="bg-navy-950 pb-20 pt-36">

        <div className="container-page">

          <Reveal>

            <span className="text-xs font-bold uppercase tracking-widest text-accent-400">
              Get In Touch
            </span>

          </Reveal>

          <Reveal delay={0.1}>

            <h1 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl">

              Let's Connect

            </h1>

          </Reveal>

          <Reveal delay={0.2}>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">

              Interested in research collaboration, public health,
              data-driven healthcare, or professional opportunities?
              Feel free to get in touch.

            </p>

          </Reveal>

        </div>

      </section>


      {/* =========================
          CONTACT SECTION
      ========================= */}

      <section className="section-padding">

        <div className="container-page grid gap-12 lg:grid-cols-2">


          {/* =====================
              CONTACT INFORMATION
          ===================== */}

          <Reveal>

            <div>

              <span className="text-xs font-bold uppercase tracking-widest text-accent-600">

                Contact Information

              </span>

              <h2 className="mt-3 font-display text-3xl font-extrabold text-navy-900">

                Get in Touch

              </h2>

              <p className="mt-4 max-w-lg leading-relaxed text-slate-600">

                I welcome opportunities for collaboration, research,
                professional engagement, and discussions related to
                public health and healthcare research.

              </p>


              {/* Email */}

              {profile?.email && (

                <a
                  href={`mailto:${profile.email}`}
                  className="mt-8 flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-soft transition-all hover:shadow-card"
                >

                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-50 text-accent-600">

                    <Mail className="h-5 w-5" />

                  </span>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">

                      Email

                    </p>

                    <p className="mt-1 font-medium text-navy-900">

                      {profile.email}

                    </p>

                  </div>

                </a>

              )}


              {/* Phone */}

              {profile?.phone && (

                <a
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  className="mt-4 flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-soft transition-all hover:shadow-card"
                >

                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-50 text-accent-600">

                    <Phone className="h-5 w-5" />

                  </span>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">

                      Phone

                    </p>

                    <p className="mt-1 font-medium text-navy-900">

                      {profile.phone}

                    </p>

                  </div>

                </a>

              )}


              {/* Location */}

              {profile?.location && (

                <div className="mt-4 flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-soft">

                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-50 text-accent-600">

                    <MapPin className="h-5 w-5" />

                  </span>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">

                      Location

                    </p>

                    <p className="mt-1 font-medium text-navy-900">

                      {profile.location}

                    </p>

                  </div>

                </div>

              )}


              {/* LinkedIn */}

              {profile?.linkedin_url && (

                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-soft transition-all hover:shadow-card"
                >

                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-50 text-accent-600">

                    <Linkedin className="h-5 w-5" />

                  </span>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">

                      LinkedIn

                    </p>

                    <p className="mt-1 font-medium text-navy-900">

                      Connect with me

                    </p>

                  </div>

                </a>

              )}

                            {/* Digital Contact Card */}

<div className="mt-8">

  <p className="text-xs font-bold uppercase tracking-widest text-accent-600">
    Digital Contact Card
  </p>

  <div
    className="
      mt-3
      overflow-hidden
      rounded-2xl
      border
      border-slate-200
      bg-gradient-to-br
      from-navy-950
      via-[#0b1b33]
      to-[#10294a]
      p-6
      shadow-card
      sm:p-7
    "
  >

    <div className="flex items-start gap-4">

      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-accent-400/20
          bg-accent-500/10
          text-accent-300
        "
      >
        <Phone className="h-5 w-5" />
      </div>

      <div className="min-w-0">

        <h3 className="font-display text-lg font-extrabold text-white">
          John Kessellie Jallah
        </h3>

        <p className="mt-1 text-sm text-slate-300">
          Public Health Professional
        </p>

      </div>

    </div>

    <p className="mt-5 text-sm leading-relaxed text-slate-300">
      Save my professional contact card for quick access to my
      contact information and professional profiles.
    </p>

    <a
      href="/images/john-kessellie-jallah-call-card.png"
      download
      className="
        mt-5
        inline-flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-accent-500
        px-5
        py-3
        text-sm
        font-semibold
        text-white
        shadow-lg
        transition-all
        hover:-translate-y-0.5
        hover:bg-accent-400
        hover:shadow-xl
        sm:w-auto
      "
    >
      <Send className="h-4 w-4" />
      Download Contact Card
    </a>

  </div>

</div>
            </div>

          </Reveal>


          {/* =====================
              CONTACT FORM
          ===================== */}

          <Reveal delay={0.2}>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card sm:p-8"
            >

              <h2 className="font-display text-2xl font-extrabold text-navy-900">

                Send a Message

              </h2>

              <p className="mt-2 text-sm text-slate-500">

                Fill out the form below and your message will be sent
                directly through the portfolio system.

              </p>


              {/* Name */}

              <div className="mt-6">

                <label className="text-sm font-semibold text-navy-900">

                  Name

                </label>

                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-500"
                />

              </div>


              {/* Email */}

              <div className="mt-5">

                <label className="text-sm font-semibold text-navy-900">

                  Email

                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-500"
                />

              </div>


              {/* Subject */}

              <div className="mt-5">

                <label className="text-sm font-semibold text-navy-900">

                  Subject

                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What would you like to discuss?"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-500"
                />

              </div>


              {/* Message */}

              <div className="mt-5">

                <label className="text-sm font-semibold text-navy-900">

                  Message

                </label>

                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-500"
                />

              </div>


              {/* Success */}

              {success && (

                <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">

                  Your message has been sent successfully.

                </div>

              )}


              {/* Error */}

              {error && (

                <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">

                  {error}

                </div>

              )}


              {/* Submit */}

              <Button
                type="submit"
                size="lg"
                disabled={sending}
                className="mt-6 w-full justify-center"
              >

                {sending ? (

                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>

                ) : (

                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>

                )}

              </Button>

            </form>

          </Reveal>

        </div>

      </section>

    </div>
  );
}