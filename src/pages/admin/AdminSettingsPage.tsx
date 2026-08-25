import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import type { SiteSettings } from '@/types/database';
import { getSiteSettings, updateSiteSettings } from '@/lib/dataService';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { AdminPageHeader } from '@/components/admin/AdminUI';
import { LoadingSpinner } from '@/components/ui/States';

export function AdminSettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [form, setForm] = useState<Partial<SiteSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getSiteSettings()
      .then((s) => { setSettings(s); setForm(s || {}); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      await updateSiteSettings(settings.id, form);
      toast('Settings updated successfully', 'success');
    } catch {
      toast('Failed to update settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div>
      <AdminPageHeader title="Settings" description="Manage site-wide configuration." />
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft space-y-5 max-w-2xl">
        <Input label="Site Title" value={form.site_title || ''} onChange={(e) => setForm({ ...form, site_title: e.target.value })} />
        <Textarea label="Site Description" value={form.site_description || ''} onChange={(e) => setForm({ ...form, site_description: e.target.value })} />
        <Textarea label="Footer Text" value={form.footer_text || ''} onChange={(e) => setForm({ ...form, footer_text: e.target.value })} placeholder="© {year} John Kessellie Jallah. All rights reserved." />
        <Input label="Analytics ID (optional)" value={form.analytics_id || ''} onChange={(e) => setForm({ ...form, analytics_id: e.target.value })} placeholder="e.g. G-XXXXXXXXXX" />
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Saving...</> : <><Save className="h-4 w-4" /> Save Settings</>}
          </Button>
        </div>
      </div>
    </div>
  );
}
