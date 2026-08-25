import { useEffect, useState } from 'react';
import { Mail, MailOpen, Trash2, Search } from 'lucide-react';
import type { ContactMessage } from '@/types/database';
import { adminFetchMessages, crud } from '@/lib/dataService';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { AdminPageHeader } from '@/components/admin/AdminUI';
import { LoadingSpinner, EmptyState } from '@/components/ui/States';
import { timeAgo, cn } from '@/lib/utils';

const TABLE = 'contact_messages';

export function AdminMessagesPage() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () => { adminFetchMessages().then((d) => { setMessages(d); setLoading(false); }).catch(() => setLoading(false)); };
  useEffect(load, []);

  const filtered = messages.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    (m.subject || '').toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = async (id: string, status: string) => {
    try { await crud.update<ContactMessage>(TABLE, id, { status }); load(); } catch { toast('Failed to update', 'error'); }
  };

  const openMessage = (msg: ContactMessage) => {
    setSelected(msg);
    if (msg.status === 'unread') updateStatus(msg.id, 'read');
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try { await crud.delete(TABLE, deleteId); toast('Message deleted', 'success'); load(); }
    catch { toast('Failed to delete', 'error'); } finally { setDeleteId(null); }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div>
      <AdminPageHeader title="Messages" description="View and manage contact form submissions." />
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
        />
      </div>

      {filtered.length === 0 ? <EmptyState message="No messages found." /> : (
        <div className="space-y-2">
          {filtered.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex items-center gap-3 rounded-xl border bg-white p-4 shadow-soft transition-colors cursor-pointer hover:border-accent-200',
                msg.status === 'unread' ? 'border-accent-200 bg-accent-50/30' : 'border-slate-200'
              )}
              onClick={() => openMessage(msg)}
            >
              <span className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold',
                msg.status === 'unread' ? 'bg-accent-500 text-white' : 'bg-slate-100 text-slate-500'
              )}>
                {msg.name.charAt(0).toUpperCase()}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-navy-900 truncate">{msg.name}</p>
                  {msg.status === 'unread' && <span className="h-2 w-2 rounded-full bg-accent-500 shrink-0" />}
                </div>
                <p className="text-xs text-slate-500 truncate">{msg.subject || '(no subject)'}</p>
              </div>
              <span className="text-xs text-slate-400 shrink-0 hidden sm:block">{timeAgo(msg.created_at)}</span>
              <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => updateStatus(msg.id, msg.status === 'unread' ? 'read' : 'unread')}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-accent-600 hover:bg-accent-50 transition-colors"
                  aria-label="Toggle read"
                >
                  {msg.status === 'unread' ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setDeleteId(msg.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Message Details" className="max-w-lg">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div><p className="text-xs text-slate-400">From</p><p className="font-medium text-navy-900">{selected.name}</p></div>
              <div><p className="text-xs text-slate-400">Email</p><p className="font-medium text-navy-900 break-all">{selected.email}</p></div>
              <div><p className="text-xs text-slate-400">Subject</p><p className="font-medium text-navy-900">{selected.subject || '(no subject)'}</p></div>
              <div><p className="text-xs text-slate-400">Date</p><p className="font-medium text-navy-900">{new Date(selected.created_at).toLocaleString()}</p></div>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <a href={`mailto:${selected.email}`}>
                <Button variant="outline" size="sm">Reply via Email</Button>
              </a>
              <Button variant="danger" size="sm" onClick={() => { setDeleteId(selected.id); setSelected(null); }}>
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {deleteId && (
        <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Delete">
          <p className="text-sm text-slate-600">Delete this message permanently?</p>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
