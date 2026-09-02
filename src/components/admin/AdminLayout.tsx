import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, User, Briefcase, GraduationCap, FileText,
  Award as AwardIcon, Users, Star, Wrench, Calendar, Microscope, Image,Images,
  Mail, Settings, LogOut, Menu, X, HeartPulse, ExternalLink,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/profile', label: 'Profile', icon: User },
  { to: '/admin/experience', label: 'Experience', icon: Briefcase },
  { to: '/admin/education', label: 'Education', icon: GraduationCap },
  { to: '/admin/publications', label: 'Publications', icon: FileText },
  { to: '/admin/certifications', label: 'Certifications', icon: AwardIcon },
  { to: '/admin/leadership', label: 'Leadership', icon: Users },
  { to: '/admin/awards', label: 'Awards', icon: Star },
  { to: '/admin/skills', label: 'Skills', icon: Wrench },
  { to: '/admin/research-interests', label: 'Research Interests', icon: Microscope },
  { to: '/admin/media', label: 'Media Library', icon: Image },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
  { to: '/admin/messages', label: 'Messages', icon: Mail },
  { to: '/admin/consultations', label: 'Consultations', icon: Calendar },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 bg-navy-950 z-40">
        <SidebarContent onLogout={handleLogout} />
      </aside>

      {/* Sidebar - Mobile */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-64 z-50 lg:hidden bg-navy-950 animate-slide-in">
            <SidebarContent onLogout={handleLogout} onNavigate={() => setSidebarOpen(false)} />
          </aside>
        </>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-navy-900" />
          </button>
          <div className="hidden lg:block">
            <p className="text-sm font-medium text-slate-600">Content Management System</p>
          </div>
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-accent-600 transition-colors"
          >
            View Site <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ onLogout, onNavigate }: { onLogout: () => void; onNavigate?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-iris-500 text-white">
          <HeartPulse className="h-5 w-5" />
        </span>
        <span className="font-display font-extrabold text-white text-lg">
          JK<span className="text-accent-400">J</span>
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-gradient-to-r from-accent-500 to-iris-500 text-white shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-red-500/20 transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );
}
