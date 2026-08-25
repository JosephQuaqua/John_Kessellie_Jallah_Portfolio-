import { useEffect, useState } from 'react';
import { Save, User } from 'lucide-react';
import type { Profile } from '@/types/database';
import { getProfile, updateProfile } from '@/lib/dataService';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { AdminPageHeader } from '@/components/admin/AdminUI';
import { LoadingSpinner } from '@/components/ui/States';

export function AdminProfilePage() {
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProfile()
      .then((p) => {
        setProfile(p);
        setForm(p || {});
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      await updateProfile(profile.id, form);
      toast('Profile updated successfully', 'success');
    } catch {
      toast('Failed to update profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div>
      <AdminPageHeader title="Profile" description="Manage your public profile information." />
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft space-y-5 max-w-3xl">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
            <User className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-bold text-navy-900">Personal Information</h3>
            <p className="text-xs text-slate-500">This appears on your homepage hero and about page.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input label="Full Name" value={form.full_name || ''} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
          <Input label="Professional Title" value={form.professional_title || ''} onChange={(e) => setForm({ ...form, professional_title: e.target.value })} />
        </div>
        <Input label="Hero Tagline" value={form.hero_tagline || ''} onChange={(e) => setForm({ ...form, hero_tagline: e.target.value })} />
        <Textarea label="Short Bio" value={form.short_bio || ''} onChange={(e) => setForm({ ...form, short_bio: e.target.value })} />
        <Textarea label="Full Biography" value={form.full_bio || ''} onChange={(e) => setForm({ ...form, full_bio: e.target.value })} className="min-h-[160px]" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input label="Email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="Phone" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Input label="Location" value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <Input label="LinkedIn URL" value={form.linkedin_url || ''} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} />
        </div>
        <Input label="Profile Image URL" value={form.profile_image_url || ''} onChange={(e) => setForm({ ...form, profile_image_url: e.target.value })} />
        <Input label="CV/Resume URL" value={form.cv_url || ''} onChange={(e) => setForm({ ...form, cv_url: e.target.value })} />

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Saving...</> : <><Save className="h-4 w-4" /> Save Changes</>}
          </Button>
        </div>
      </div>
    </div>
  );
}
