import { Link } from 'react-router-dom';
import { HeartPulse, Mail, Linkedin, MapPin } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-page py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-iris-500 text-white">
                <HeartPulse className="h-5 w-5" />
              </span>
              <span className="font-display font-extrabold text-xl">
                John Kessellie <span className="text-accent-400">Jallah</span>
              </span>
            </div>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed">
              Public Health Professional • Health Researcher • Data-Driven Healthcare Advocate
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="mailto:johnkjallah29@gmail.com"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 hover:bg-accent-500 border border-white/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/john-kessellie-jallah"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 hover:bg-accent-500 border border-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/experience', label: 'Experience' },
                { to: '/education', label: 'Education' },
                { to: '/publications', label: 'Publications' },
                { to: '/certifications', label: 'Certifications' },
                { to: '/achievements', label: 'Achievements' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-accent-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">Get in Touch</h4>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent-400 shrink-0" />
                <span>johnkjallah29@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-accent-400 shrink-0" />
                <span>Liberia / India</span>
              </div>
            </div>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2.5 text-sm font-medium transition-colors"
            >
              Contact Me
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">© {year} John Kessellie Jallah. All rights reserved.</p>
          <Link to="/admin" className="text-xs text-white/30 hover:text-white/60 transition-colors">
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
