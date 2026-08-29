import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

import type { Profile } from '@/types/database';
import { getProfile } from '@/lib/dataService';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/education', label: 'Education' },
  { to: '/publications', label: 'Publications' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/contact', label: 'Contact' },
];

const mobileExtraLinks = [
  { to: '/gallery', label: 'Gallery' },
  { to: '/consultation', label: 'Book a Consultation' },
];

export function Navbar() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();

  // Fetch profile from Supabase
  useEffect(() => {
    getProfile()
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error('Failed to load profile:', error);
      });
  }, []);

  // Detect scroll position
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    onScroll();

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Close mobile menu when changing page
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl'
          : 'bg-transparent'
      )}
    >
      <nav
        className="
          container-page
flex
h-[76px]
items-center
justify-between
px-4
sm:px-6
lg:h-[92px]
lg:px-6
        "
      >
        {/* LOGO */}
<Link
  to="/"
  className="flex min-w-0 shrink-0 items-center gap-2"
>
  {/* JK */}
  <span
    className={cn(
      `
        font-serif
        text-[1.75rem]
        font-bold
        leading-none
        tracking-[-0.1em]
        transition-colors
        sm:text-[2rem]
        lg:text-[2.2rem]
      `,
      scrolled ? 'text-navy-900' : 'text-white'
    )}
  >
    JK
  </span>

  {/* NAME */}
  <span
    className={cn(
      `
        block
        max-w-[170px]
        truncate
        whitespace-nowrap
        font-display
        text-[0.8rem]
        font-semibold
        tracking-[-0.03em]
        transition-colors
        sm:max-w-none
        sm:text-[0.9rem]
        lg:text-[0.95rem]
      `,
      scrolled ? 'text-navy-900' : 'text-white'
    )}
  >
    John Kessellie Jallah
  </span>
</Link>
        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'relative px-2.5 py-2 text-[13px] font-medium transition-colors xl:px-3 xl:text-sm',
                  scrolled
                    ? isActive
                      ? 'text-accent-600'
                      : 'text-slate-600 hover:text-navy-900'
                    : isActive
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                )
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}

                  <span
                    className={cn(
                      `
                        absolute
                        bottom-0
                        left-1/2
                        h-[2px]
                        -translate-x-1/2
                        rounded-full
                        bg-accent-400
                        transition-all
                        duration-300
                      `,
                      isActive
                        ? 'w-5 opacity-100'
                        : 'w-0 opacity-0'
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* DESKTOP DOWNLOAD CV */}
        {profile?.cv_url ? (
          <a
            href={profile.cv_url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              `
                group
                hidden
                shrink-0
                items-center
                gap-2.5
                rounded-xl
                border
                px-4
                py-2.5
                text-[13px]
                font-semibold
                transition-all
                duration-300
                lg:inline-flex
                xl:px-5
              `,
              scrolled
                ? `
                  border-navy-900
                  bg-navy-900
                  text-white
                  shadow-[0_8px_20px_rgba(15,23,42,0.18)]
                  hover:-translate-y-0.5
                  hover:bg-accent-600
                  hover:shadow-[0_12px_28px_rgba(59,130,246,0.28)]
                `
                : `
                  border-white/20
                  bg-white/[0.08]
                  text-white
                  backdrop-blur-md
                  shadow-[0_8px_24px_rgba(0,0,0,0.12)]
                  hover:-translate-y-0.5
                  hover:border-accent-400/60
                  hover:bg-accent-500
                `
            )}
          >
            <span
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                bg-white/10
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <Download className="h-3.5 w-3.5" />
            </span>

            <span>Download CV</span>
          </a>
        ) : (
          <span
            className={cn(
              `
                hidden
                shrink-0
                items-center
                gap-2.5
                rounded-xl
                px-4
                py-2.5
                text-[13px]
                font-semibold
                opacity-60
                lg:inline-flex
                xl:px-5
              `,
              scrolled ? 'text-slate-400' : 'text-white/60'
            )}
          >
            <Download className="h-4 w-4" />
            CV Loading...
          </span>
        )}

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-lg
            transition-colors
            lg:hidden
          "
        >
          {mobileOpen ? (
            <X
              className={cn(
                'h-7 w-7',
                scrolled ? 'text-navy-900' : 'text-white'
              )}
            />
          ) : (
            <Menu
              className={cn(
                'h-8 w-8',
                scrolled ? 'text-navy-900' : 'text-white'
              )}
            />
          )}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div
          className={cn(
            `
              border-t
              shadow-xl
              lg:hidden
            `,
            scrolled
              ? 'border-slate-100 bg-white'
              : 'border-white/10 bg-[#07111f]/98 backdrop-blur-xl'
          )}
        >
          <div
            className="
              container-page
              flex
              flex-col
              gap-1
              px-5
              py-5
            "
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    `
                      rounded-lg
                      px-4
                      py-3
                      text-sm
                      font-medium
                      transition-colors
                    `,
                    scrolled
                      ? isActive
                        ? 'bg-accent-50 text-accent-600'
                        : 'text-slate-600 hover:bg-slate-100'
                      : isActive
                        ? 'bg-accent-500/15 text-accent-300'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}

            {mobileExtraLinks.map((link) => (
  <NavLink
    key={link.to}
    to={link.to}
    className={({ isActive }) =>
      cn(
        `
          rounded-lg
          px-4
          py-3
          text-sm
          font-medium
          transition-colors
        `,
        scrolled
          ? isActive
            ? 'bg-accent-50 text-accent-600'
            : 'text-slate-600 hover:bg-slate-100'
          : isActive
            ? 'bg-accent-500/15 text-accent-300'
            : 'text-white/70 hover:bg-white/5 hover:text-white'
      )
    }
  >
    {link.label}
  </NavLink>
))}

            {/* MOBILE DOWNLOAD CV */}
            {profile?.cv_url && (
              <a
                href={profile.cv_url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  `
                    mt-3
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    hover:opacity-90
                  `,
                  scrolled
                    ? 'bg-navy-900 text-white'
                    : 'bg-accent-500 text-white'
                )}
              >
                <Download className="h-4 w-4" />

                Download CV
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}