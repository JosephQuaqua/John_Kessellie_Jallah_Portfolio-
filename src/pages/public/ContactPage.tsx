import { useEffect, useState, type FormEvent } from 'react';
import {
  Mail, MapPin, Linkedin, Send, Phone, Link as LinkIcon,
  Download, User, MessageSquare, ArrowRight, Clock, Globe2,
} from 'lucide-react';
import type { Profile } from '@/types/database';
import { getProfile, submitMessage } from '@/lib/dataService';
import { useToast } from '@/components/ui/Toast';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';

const PROFILE_IMG = '/images/john-jallah.png';

const FALLBACK_PROFILE: Profile = {
  id: 'fallback',
  full_name: 'John Kessellie Jallah',
  professional_title: 'Public Health Professional',
  hero_tagline: 'Health Researcher • Data-Driven • Community Impact',
  short_bio: '',
  full_bio: '',
  profile_image_url: null,
  email: 'johnessellie.j@gmail.com',
  phone: null,
  location: 'Liberia / India',
  linkedin_url: 'https://www.linkedin.com/in/john-kessellie-jallah',
  other_links: [],
  cv_url: null,
  updated_at: '',
};

function buildVCard(p: Profile): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${p.full_name}`,
    `N:${p.full_name};;;;`,
    `TITLE:${p.professional_title}`,
  ];
  if (p.email) lines.push(`EMAIL;TYPE=WORK:${p.email}`);
  if (p.phone) lines.push(`TEL;TYPE=CELL:${p.phone}`);
  if (p.location) lines.push(`ADR;TYPE=WORK:;;${p.location};;;;`);
  if (p.linkedin_url) lines.push(`URL:${p.linkedin_url}`);
  lines.push('END:VCARD');
  return lines.join('\n');
}

export function ContactPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    getProfile()
      .then((p) => setProfile(p || FALLBACK_PROFILE))
      .catch((err) => {
        console.error('Failed to load profile:', err);
        setProfile(FALLBACK_PROFILE);
      });
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await submitMessage(form);
      toast('Message sent successfully! I\'ll get back to you soon.', 'success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast('Failed to send message. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadVCard = () => {
    if (!profile) return;
    const vcard = buildVCard(profile);
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.full_name.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast('Call card downloaded to your contacts.', 'success');
  };

  const contactItems = [
    profile?.email && { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    profile?.phone && { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
    profile?.location && { icon: MapPin, label: 'Location', value: profile.location, href: null },
    profile?.linkedin_url && { icon: Linkedin, label: 'LinkedIn', value: 'View Profile', href: profile.linkedin_url },
    ...(profile?.other_links?.map((link) => ({
      icon: LinkIcon,
      label: link.label,
      value: link.url.replace(/^https?:\/\//, ''),
      href: link.url,
    })) || []),
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href: string | null }[];

  return (
    <div className="pt-16">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[#020916] py-16 md:py-24">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(31,69,135,0.22),transparent_40%),radial-gradient(circle_at_25%_80%,rgba(20,43,83,0.18),transparent_35%)]" />
        <div className="absolute inset-0 grid-pattern opacity-[0.07]" />
        <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-accent-500/8 blur-[120px]" />

        <div className="container-page relative">
          <Reveal>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">Get in Touch</span>
              </div>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                Let's Connect and<br className="hidden sm:block" />
                <span className="gradient-text"> Create Meaningful Impact</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
                Open to research collaborations, public health initiatives, and opportunities in healthcare innovation. Whether you have a project idea or just want to network, I'd love to hear from you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ MAIN CONTENT ============ */}
      <section className="relative -mt-8 pb-16 md:pb-24">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* ====== LEFT COLUMN ====== */}
            <div className="lg:col-span-5 space-y-6">
              {/* Contact info */}
              <Reveal>
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft sm:p-7">
                  <div className="mb-5 flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
                      <MessageSquare className="h-4.5 w-4.5" />
                    </span>
                    <h3 className="font-display text-lg font-bold text-navy-900">Contact Information</h3>
                  </div>

                  <div className="space-y-1">
                    {contactItems.map((item) => {
                      const Icon = item.icon;
                      const inner = (
                        <div className="group flex items-center gap-3.5 rounded-xl px-3 py-3 transition-colors hover:bg-slate-50">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                            <Icon className="h-[18px] w-[18px]" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">{item.label}</p>
                            <p className="truncate text-sm font-medium text-slate-700 transition-colors group-hover:text-accent-600">
                              {item.value}
                            </p>
                          </div>
                          {item.href && (
                            <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-accent-500" />
                          )}
                        </div>
                      );
                      return item.href ? (
                        <a
                          key={item.label}
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div key={item.label}>{inner}</div>
                      );
                    })}
                  </div>

                  {contactItems.length === 0 && (
                    <p className="py-4 text-center text-sm text-slate-400">Contact information will appear here once available.</p>
                  )}
                </div>
              </Reveal>

              {/* Availability badge */}
              <Reveal delay={0.05}>
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-emerald-800">Available for collaborations</p>
                    <p className="text-xs text-emerald-600">Currently open to new research projects and opportunities</p>
                  </div>
                </div>
              </Reveal>

              {/* Digital call card */}
              <Reveal delay={0.1}>
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 via-navy-900 to-[#020916] p-6 shadow-soft">
                  {/* Decorative elements */}
                  <div className="network-pattern absolute -right-12 -top-12 h-48 w-48 opacity-50" />
                  <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-accent-500/8 blur-[60px]" />
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full border border-accent-500/8" />

                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-center gap-1.5 text-accent-300">
                      <User className="h-3.5 w-3.5" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Digital Call Card</span>
                    </div>

                    {/* Identity */}
                    <div className="mt-4 flex items-center gap-4">
                      <div className="relative shrink-0">
                        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-accent-400/40 to-iris-400/40 opacity-60 blur-sm" />
                        <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-white/15 bg-white/5">
                          <img
                            src={profile?.profile_image_url || PROFILE_IMG}
                            alt={profile?.full_name || 'John Kessellie Jallah'}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-lg font-bold text-white">
                          {profile?.full_name || 'John Kessellie Jallah'}
                        </p>
                        <p className="truncate text-sm text-white/55">
                          {profile?.professional_title || 'Public Health Professional'}
                        </p>
                      </div>
                    </div>

                    {/* Details grid */}
                    <div className="mt-5 grid grid-cols-1 gap-2.5 border-t border-white/10 pt-4 sm:grid-cols-2">
                      {profile?.email && (
                        <div className="flex items-center gap-2 text-xs text-white/65">
                          <Mail className="h-3.5 w-3.5 shrink-0 text-accent-400" />
                          <span className="truncate">{profile.email}</span>
                        </div>
                      )}
                      {profile?.phone && (
                        <div className="flex items-center gap-2 text-xs text-white/65">
                          <Phone className="h-3.5 w-3.5 shrink-0 text-accent-400" />
                          <span className="truncate">{profile.phone}</span>
                        </div>
                      )}
                      {profile?.location && (
                        <div className="flex items-center gap-2 text-xs text-white/65">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-accent-400" />
                          <span className="truncate">{profile.location}</span>
                        </div>
                      )}
                      {profile?.linkedin_url && (
                        <div className="flex items-center gap-2 text-xs text-white/65">
                          <Linkedin className="h-3.5 w-3.5 shrink-0 text-accent-400" />
                          <span className="truncate">LinkedIn Profile</span>
                        </div>
                      )}
                    </div>

                    {/* Download button */}
                    <button
                      onClick={handleDownloadVCard}
                      disabled={!profile}
                      className="group/btn mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl border border-accent-400/25 bg-accent-500/10 px-5 py-3.5 text-sm font-medium text-white transition-all hover:border-accent-400/50 hover:bg-accent-500/20 disabled:opacity-50"
                    >
                      <Download className="h-4 w-4 transition-transform group-hover/btn:translate-y-0.5" />
                      Save to Contacts
                      <span className="ml-1 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/60">vCard</span>
                    </button>
                    <p className="mt-2.5 text-center text-[11px] text-white/35">
                      Downloads a .vcf file — opens directly in your contacts app
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ====== RIGHT COLUMN: FORM ====== */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft sm:p-8 lg:p-10">
                  {/* Form header */}
                  <div className="mb-7 border-b border-slate-100 pb-6">
                    <h2 className="font-display text-2xl font-bold text-navy-900">Send a Message</h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Fill out the form below and I'll get back to you as soon as possible. Fields marked with <span className="text-accent-500">*</span> are required.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Input
                        label="Name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        error={errors.name}
                      />
                      <Input
                        label="Email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        error={errors.email}
                      />
                    </div>
                    <Input
                      label="Subject"
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                    <Textarea
                      label="Message"
                      placeholder="Tell me about your project, collaboration idea, or inquiry..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      error={errors.message}
                      className="min-h-[160px]"
                    />

                    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="flex items-center gap-2 text-xs text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                        Typical response time: 1–2 business days
                      </p>
                      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
                        {submitting ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message <Send className="h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
