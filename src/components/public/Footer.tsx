import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Mail,
  Linkedin,
  GraduationCap,
  BookOpen,
  Contact,
  CalendarCheck,
  MapPin,
} from 'lucide-react';

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/education', label: 'Education' },
  { to: '/publications', label: 'Publications' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/consultation', label: 'Book a Consultation' },
  { to: '/contact', label: 'Contact' },
];

const professionalLinks = [
  {
    href: 'https://www.linkedin.com/in/john-kessellie-jallah-9b33a0238',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'mailto:johnkjallah29@gmail.com',
    label: 'Email',
    icon: Mail,
  },
  {
    href: 'https://scholar.google.com/citations?user=HKebfMsAAAAJ&hl=en',
    label: 'Google Scholar',
    icon: GraduationCap,
  },
  {
    href: 'https://orcid.org/0009-0000-2503-1637',
    label: 'ORCID',
    icon: Contact,
  },
  {
    href: 'https://www.researchgate.net/profile/John-Kessellie-Jallah-2',
    label: 'ResearchGate',
    icon: BookOpen,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      {/* Subtle background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-72 w-72 rounded-full bg-accent-500/8 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 h-72 w-72 rounded-full bg-iris-500/8 blur-[100px]" />
      </div>

      <div className="relative">
        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}
        <div className="container-page py-8 sm:py-9 lg:py-10">
          <div
            className="
              grid
              grid-cols-1
              gap-8
              sm:grid-cols-2
              lg:grid-cols-[1.35fr_0.95fr_0.95fr]
              lg:gap-10
            "
          >
            {/* =================================================
                BRAND
            ================================================= */}
            <div>
              <Link
                to="/"
                aria-label="John Kessellie Jallah - Home"
                className="group inline-flex items-center gap-3"
              >
                {/* JK */}
                <span
                  className="
                    font-serif
                    text-[2.15rem]
                    font-bold
                    leading-none
                    tracking-[-0.11em]
                    text-white
                    transition-colors
                    duration-200
                    group-hover:text-accent-400
                  "
                >
                  JK
                </span>

                {/* Divider */}
                <span className="h-7 w-px bg-white/15" />

                {/* Name + Title */}
                <span>
                  <span className="block font-display text-[15px] font-bold tracking-tight text-white">
                    John Kessellie Jallah
                  </span>

                  <span className="mt-0.5 block text-[8px] font-semibold uppercase tracking-[0.17em] text-accent-400">
                    Public Health Professional
                  </span>
                </span>
              </Link>

              <p className="mt-4 max-w-md text-[13px] leading-5.5 text-slate-400">
                Public Health Professional, health researcher, and
                data-driven healthcare advocate committed to advancing
                research and meaningful public health outcomes.
              </p>

              {/* Location */}
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-accent-400" />
                <span>Liberia / India</span>
              </div>

              {/* Professional social links */}
              <div className="mt-4 flex items-center gap-2">
                {professionalLinks.map((item) => {
                  const Icon = item.icon;
                  const isEmail = item.href.startsWith('mailto:');

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={isEmail ? undefined : '_blank'}
                      rel={isEmail ? undefined : 'noopener noreferrer'}
                      aria-label={item.label}
                      title={item.label}
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-white/10
                        bg-white/[0.035]
                        text-slate-400
                        transition-all
                        duration-200
                        hover:-translate-y-0.5
                        hover:border-accent-400/40
                        hover:bg-accent-500
                        hover:text-white
                      "
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* =================================================
                NAVIGATION
            ================================================= */}
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent-400">
                Explore
              </p>

              <h3 className="mt-1 font-display text-[15px] font-bold text-white">
                Navigation
              </h3>

              <nav className="mt-3">
                <ul className="grid grid-cols-2 gap-x-5 gap-y-1.5">
                  {navigation.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="
                          group
                          inline-flex
                          items-center
                          gap-1
                          text-[12px]
                          text-slate-400
                          transition-colors
                          duration-200
                          hover:text-white
                        "
                      >
                        {link.label}

                        <ArrowUpRight
                          className="
                            h-2.5
                            w-2.5
                            text-accent-400
                            opacity-0
                            transition-all
                            duration-200
                            group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5
                            group-hover:opacity-100
                          "
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* =================================================
                CONNECT
            ================================================= */}
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent-400">
                Connect
              </p>

              <h3 className="mt-1 font-display text-[15px] font-bold text-white">
                Let&apos;s Connect
              </h3>

              {/* Email */}
              <a
                href="mailto:johnkjallah29@gmail.com"
                className="
                  mt-3
                  inline-flex
                  items-center
                  gap-2
                  text-[12px]
                  text-slate-400
                  transition-colors
                  hover:text-white
                "
              >
                <Mail className="h-3.5 w-3.5 text-accent-400" />

                <span>johnkjallah29@gmail.com</span>
              </a>

              <p className="mt-2 max-w-xs text-[11px] leading-4.5 text-slate-500">
                Available for professional collaboration, research,
                public health initiatives, and consultation.
              </p>

              {/* Consultation CTA */}
              <Link
                to="/consultation"
                className="
                  group
                  mt-3
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-white/10
                  bg-white/[0.05]
                  px-3.5
                  py-2
                  text-[11px]
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:border-accent-400/40
                  hover:bg-accent-500
                "
              >
                <CalendarCheck
                  className="
                    h-3.5
                    w-3.5
                    text-accent-400
                    transition-colors
                    group-hover:text-white
                  "
                />

                <span>Book a Consultation</span>

                <ArrowUpRight
                  className="
                    h-3
                    w-3
                    transition-transform
                    duration-200
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>
            </div>
          </div>

          {/* =====================================================
              DIVIDER
          ===================================================== */}
          <div className="mt-7 border-t border-white/[0.08]" />

          {/* =====================================================
              BOTTOM BAR
          ===================================================== */}
          <div className="pt-4">
            <p className="text-center text-[10px] text-slate-500 sm:text-left">
              © {year} John Kessellie Jallah. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}