import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Briefcase, Award as AwardIcon, Mail,
  Plus, ArrowRight, TrendingUp, Users, BookOpen,
} from 'lucide-react';
import {
  adminFetchPublications, adminFetchExperiences, adminFetchCertifications,
  adminFetchAwards, adminFetchMessages,
} from '@/lib/dataService';
import { useAuth } from '@/lib/auth';
import { timeAgo } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { ContactMessage } from '@/types/database';

export function AdminDashboardPage() {
  const { session } = useAuth();
  const [stats, setStats] = useState({ pubs: 0, exps: 0, certs: 0, awards: 0, messages: 0, unread: 0 });
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminFetchPublications(),
      adminFetchExperiences(),
      adminFetchCertifications(),
      adminFetchAwards(),
      adminFetchMessages(),
    ])
      .then(([pubs, exps, certs, awards, msgs]) => {
        setStats({
          pubs: pubs.length,
          exps: exps.length,
          certs: certs.length,
          awards: awards.length,
          messages: msgs.length,
          unread: msgs.filter((m) => m.status === 'unread').length,
        });
        setRecentMessages(msgs.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Publications', value: stats.pubs, icon: FileText, color: 'bg-accent-50 text-accent-600', link: '/admin/publications' },
    { label: 'Experiences', value: stats.exps, icon: Briefcase, color: 'bg-iris-50 text-iris-600', link: '/admin/experience' },
    { label: 'Certifications', value: stats.certs, icon: AwardIcon, color: 'bg-emerald-50 text-emerald-600', link: '/admin/certifications' },
    { label: 'Awards', value: stats.awards, icon: AwardIcon, color: 'bg-amber-50 text-amber-600', link: '/admin/awards' },
  ];

  const quickActions = [
    { label: 'Add Publication', link: '/admin/publications', icon: FileText },
    { label: 'Add Experience', link: '/admin/experience', icon: Briefcase },
    { label: 'Add Certification', link: '/admin/certifications', icon: AwardIcon },
    { label: 'Add Award', link: '/admin/awards', icon: AwardIcon },
    { label: 'View Messages', link: '/admin/messages', icon: Mail },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-navy-900">
          Welcome back, John!
        </h1>
        <p className="text-sm text-slate-500 mt-1">Here's an overview of your portfolio.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              to={stat.link}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-soft hover:shadow-card transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={cn('flex h-10 w-10 items-center justify-center rounded-xl', stat.color)}>
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-accent-500 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="font-display text-2xl font-extrabold text-navy-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Messages + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent messages */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-accent-500" />
              <h2 className="font-bold text-navy-900">Recent Messages</h2>
              {stats.unread > 0 && (
                <span className="text-xs font-medium rounded-full bg-red-100 text-red-600 px-2 py-0.5">
                  {stats.unread} unread
                </span>
              )}
            </div>
            <Link to="/admin/messages" className="text-sm text-accent-600 hover:text-accent-700 font-medium">
              View All
            </Link>
          </div>
          {recentMessages.length === 0 ? (
            <p className="text-sm text-slate-400 py-8 text-center">No messages yet.</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <Link
                  key={msg.id}
                  to="/admin/messages"
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 hover:border-accent-200 hover:bg-accent-50/30 transition-colors"
                >
                  <span className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold',
                    msg.status === 'unread' ? 'bg-accent-500 text-white' : 'bg-slate-100 text-slate-500'
                  )}>
                    {msg.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-navy-900 truncate">{msg.name}</p>
                    <p className="text-xs text-slate-500 truncate">{msg.subject || msg.message}</p>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{timeAgo(msg.created_at)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="font-bold text-navy-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  to={action.link}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 hover:border-accent-200 hover:bg-accent-50/30 transition-colors group"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500 group-hover:bg-accent-50 group-hover:text-accent-600 transition-colors">
                    <Plus className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-accent-600 transition-colors">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Activity overview placeholder */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-accent-500" />
          <h2 className="font-bold text-navy-900">Site Overview</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl bg-slate-50 p-4 text-center">
            <Users className="h-5 w-5 text-slate-400 mx-auto mb-2" />
            <p className="font-display text-xl font-bold text-navy-900">{stats.messages}</p>
            <p className="text-xs text-slate-500">Total Messages</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 text-center">
            <FileText className="h-5 w-5 text-slate-400 mx-auto mb-2" />
            <p className="font-display text-xl font-bold text-navy-900">{stats.pubs}</p>
            <p className="text-xs text-slate-500">Publications</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 text-center">
            <Briefcase className="h-5 w-5 text-slate-400 mx-auto mb-2" />
            <p className="font-display text-xl font-bold text-navy-900">{stats.exps}</p>
            <p className="text-xs text-slate-500">Experiences</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 text-center">
            <BookOpen className="h-5 w-5 text-slate-400 mx-auto mb-2" />
            <p className="font-display text-xl font-bold text-navy-900">{stats.certs + stats.awards}</p>
            <p className="text-xs text-slate-500">Certifications + Awards</p>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-400 text-center">
          Analytics integration can be connected here when configured.
        </p>
      </div>
    </div>
  );
}
