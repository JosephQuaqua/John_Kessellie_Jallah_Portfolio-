import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Download,
  ChevronDown,
  BookOpen,
  Award,
  Trophy,
  Image,
  CalendarCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

import type { Profile } from '@/types/database';
import { getProfile } from '@/lib/dataService';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/education', label: 'Education' },
  { to: '/contact', label: 'Contact' },
  
];

const moreLinks = [
  {
    to: '/publications',
    label: 'Publications',
    icon: BookOpen,
  },
  {
    to: '/certifications',
    label: 'Certifications',
    icon: Award,
  },
  {
    to: '/achievements',
    label: 'Achievements',
    icon: Trophy,
  },
  {
    to: '/gallery',
    label: 'Gallery',
    icon: Image,
  },
  {
    to: '/consultation',
    label: 'Book a Consultation',
    icon: CalendarCheck,
  },
];

const mobileExtraLinks = [
  { to: '/gallery', label: 'Gallery' },
  { to: '/publications', label: 'Publications' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/achievements', label: 'Achievements' },
  { to: '/consultation', label: 'Book a Consultation' },
];

export function Navbar() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const location = useLocation();
  const moreRef = useRef<HTMLDivElement>(null);

  /*
   * ---------------------------------------------------------
   * FETCH PROFILE
   * ---------------------------------------------------------
   */
  useEffect(() => {
    getProfile()
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error('Failed to load profile:', error);
      });
  }, []);

  /*
   * ---------------------------------------------------------
   * SCROLL DETECTION
   * ---------------------------------------------------------
   */
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

  /*
   * ---------------------------------------------------------
   * CLOSE MOBILE MENU ON PAGE CHANGE
   * ---------------------------------------------------------
   */
  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  /*
   * ---------------------------------------------------------
   * CLOSE DESKTOP DROPDOWN WHEN CLICKING OUTSIDE
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreRef.current &&
        !moreRef.current.contains(event.target as Node)
      ) {
        setMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * CLOSE DROPDOWN WITH ESCAPE
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMoreOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * DETERMINE WHETHER "MORE" SHOULD BE ACTIVE
   * ---------------------------------------------------------
   */
  const moreIsActive = moreLinks.some((link) => {
    if (link.to === '/publications') {
      return (
        location.pathname === '/publications' ||
        location.pathname.startsWith('/publications/')
      );
    }

    return location.pathname === link.to;
  });

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
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
        {/* =====================================================
            LOGO / BRAND
        ===================================================== */}
        <Link
          to="/"
          aria-label="John Kessellie Jallah - Home"
          className="group inline-flex min-w-0 shrink-0 items-center gap-3"
        >
          {/* JK */}
          <span
            className={cn(
              `
                font-serif
                text-[2.15rem]
                font-bold
                leading-none
                tracking-[-0.11em]
                transition-colors
                duration-200
                sm:text-[2rem]
                lg:text-[2.2rem]
              `,
              scrolled
                ? 'text-navy-900 group-hover:text-accent-600'
                : 'text-white group-hover:text-accent-400'
            )}
          >
            JK
          </span>

          {/* Divider */}
          <span
            className={cn(
              'h-7 w-px transition-colors duration-200',
              scrolled ? 'bg-slate-200' : 'bg-white/15'
            )}
          />

          {/* Name + title */}
          <span className="min-w-0">
            <span
              className={cn(
                `
                  block
                  whitespace-nowrap
                  font-display
                  text-[13px]
                  font-bold
                  tracking-tight
                  transition-colors
                  duration-200
                  sm:text-[14px]
                  lg:text-[15px]
                `,
                scrolled ? 'text-navy-900' : 'text-white'
              )}
            >
              John Kessellie Jallah
            </span>

            <span
              className="
                mt-0.5
                block
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.17em]
                text-accent-400
                sm:text-[8.5px]
              "
            >
              Public Health Professional
            </span>
          </span>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  `
                    relative
                    px-2.5
                    py-2
                    text-[13px]
                    font-medium
                    transition-colors
                    duration-200
                    xl:px-3
                    xl:text-sm
                  `,
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

          {/* =================================================
              MORE DROPDOWN
          ================================================= */}
          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              className={cn(
                `
                  group
                  relative
                  inline-flex
                  items-center
                  gap-1.5
                  px-2.5
                  py-2
                  text-[13px]
                  font-medium
                  transition-colors
                  duration-200
                  xl:px-3
                  xl:text-sm
                `,
                scrolled
                  ? moreIsActive
                    ? 'text-accent-600'
                    : 'text-slate-600 hover:text-navy-900'
                  : moreIsActive
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
              )}
            >
              <span>More</span>

              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-300',
                  moreOpen && 'rotate-180',
                  scrolled
                    ? 'text-slate-400 group-hover:text-accent-600'
                    : 'text-white/50 group-hover:text-white'
                )}
              />

              {/* Active underline */}
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
                  moreIsActive
                    ? 'w-5 opacity-100'
                    : 'w-0 opacity-0'
                )}
              />
            </button>

            {/* =================================================
                DROPDOWN PANEL
            ================================================= */}
            <div
              className={cn(
                `
                  absolute
                  right-0
                  top-[calc(100%+14px)]
                  w-[245px]
                  origin-top-right
                  rounded-xl
                  border
                  shadow-[0_20px_50px_rgba(0,0,0,0.18)]
                  transition-all
                  duration-200
                `,
                scrolled
                  ? 'border-slate-200 bg-white'
                  : 'border-white/10 bg-[#07111f]/98 backdrop-blur-xl',
                moreOpen
                  ? 'visible translate-y-0 scale-100 opacity-100'
                  : 'invisible -translate-y-2 scale-95 opacity-0'
              )}
              role="menu"
            >
              {/* Small top pointer */}
              <span
                className={cn(
                  `
                    absolute
                    -top-2
                    right-[62px]
                    h-4
                    w-4
                    rotate-45
                    border-l
                    border-t
                  `,
                  scrolled
                    ? 'border-slate-200 bg-white'
                    : 'border-white/10 bg-[#07111f]'
                )}
              />

              <div className="relative p-2">
                {moreLinks.map((link, index) => {
                  const Icon = link.icon;

                  return (
                    <div key={link.to}>
                      {/* Separator before the secondary pages */}
                      {index === 3 && (
                        <div
                          className={cn(
                            'my-2 border-t',
                            scrolled
                              ? 'border-slate-100'
                              : 'border-white/10'
                          )}
                        />
                      )}

                      <NavLink
                        to={link.to}
                        end={link.to !== '/publications'}
                        role="menuitem"
                        onClick={() => setMoreOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            `
                              group
                              flex
                              items-center
                              gap-3
                              rounded-lg
                              px-3
                              py-2.5
                              text-[13px]
                              font-medium
                              transition-all
                              duration-200
                            `,
                            scrolled
                              ? isActive
                                ? 'bg-accent-50 text-accent-600'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-navy-900'
                              : isActive
                                ? 'bg-accent-500/10 text-accent-300'
                                : 'text-white/75 hover:bg-white/5 hover:text-white'
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className={cn(
                                `
                                  flex
                                  h-8
                                  w-8
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-lg
                                  transition-all
                                  duration-200
                                `,
                                scrolled
                                  ? isActive
                                    ? 'bg-accent-100 text-accent-600'
                                    : 'bg-slate-100 text-slate-500 group-hover:bg-accent-50 group-hover:text-accent-600'
                                  : isActive
                                    ? 'bg-accent-500/15 text-accent-300'
                                    : 'bg-white/5 text-white/50 group-hover:bg-accent-500/10 group-hover:text-accent-300'
                              )}
                            >
                              <Icon className="h-4 w-4" />
                            </span>

                            <span>{link.label}</span>
                          </>
                        )}
                      </NavLink>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            DESKTOP DOWNLOAD CV
        ===================================================== */}
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

        {/* =====================================================
            MOBILE MENU BUTTON
        ===================================================== */}
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

      {/* =======================================================
          MOBILE MENU
      ======================================================= */}
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

            {/* Mobile secondary pages */}
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

            {/* Mobile Download CV */}
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