import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth';
import { ToastProvider } from '@/components/ui/Toast';
import { PublicLayout } from '@/components/public/PublicLayout';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { AdminLayout } from '@/components/admin/AdminLayout';

// Public pages
import { HomePage } from '@/pages/public/HomePage';
import { AboutPage } from '@/pages/public/AboutPage';
import { ExperiencePage } from '@/pages/public/ExperiencePage';
import { EducationPage } from '@/pages/public/EducationPage';
import { PublicationsPage } from '@/pages/public/PublicationsPage';
import { PublicationDetailPage } from '@/pages/public/PublicationDetailPage';
import { CertificationsPage } from '@/pages/public/CertificationsPage';
import { AchievementsPage } from '@/pages/public/AchievementsPage';
import { ContactPage } from '@/pages/public/ContactPage';
import { GalleryPage } from '@/pages/public/GalleryPage';
import { ConsultationPage } from '@/pages/public/ConsultationPage';


// Admin pages
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminProfilePage } from '@/pages/admin/AdminProfilePage';
import { AdminExperiencePage } from '@/pages/admin/AdminExperiencePage';
import { AdminEducationPage } from '@/pages/admin/AdminEducationPage';
import { AdminPublicationsPage } from '@/pages/admin/AdminPublicationsPage';
import { AdminCertificationsPage } from '@/pages/admin/AdminCertificationsPage';
import { AdminLeadershipPage } from '@/pages/admin/AdminLeadershipPage';
import { AdminAwardsPage } from '@/pages/admin/AdminAwardsPage';
import { AdminSkillsPage } from '@/pages/admin/AdminSkillsPage';
import { AdminResearchInterestsPage } from '@/pages/admin/AdminResearchInterestsPage';
import { AdminMediaPage } from '@/pages/admin/AdminMediaPage';
import { AdminMessagesPage } from '@/pages/admin/AdminMessagesPage';
import { AdminSettingsPage } from '@/pages/admin/AdminSettingsPage';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-navy-950 text-white">
      <p className="font-display text-6xl font-extrabold text-accent-500">404</p>
      <p className="mt-4 text-white/60">Page not found</p>
      <a href="/" className="mt-6 text-accent-400 hover:text-accent-300 transition-colors">Return home</a>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/publications" element={<PublicationsPage />} />
              <Route path="/publications/:id" element={<PublicationDetailPage />} />
              <Route path="/certifications" element={<CertificationsPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/consultation" element={<ConsultationPage />} />
            </Route>

            {/* Admin login */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Admin protected routes */}
            <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminDashboardPage />} />

  <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="profile" element={<AdminProfilePage />} />
              <Route path="experience" element={<AdminExperiencePage />} />
              <Route path="education" element={<AdminEducationPage />} />
              <Route path="publications" element={<AdminPublicationsPage />} />
              <Route path="certifications" element={<AdminCertificationsPage />} />
              <Route path="leadership" element={<AdminLeadershipPage />} />
              <Route path="awards" element={<AdminAwardsPage />} />
              <Route path="skills" element={<AdminSkillsPage />} />
              <Route path="research-interests" element={<AdminResearchInterestsPage />} />
              <Route path="media" element={<AdminMediaPage />} />
              <Route path="messages" element={<AdminMessagesPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
