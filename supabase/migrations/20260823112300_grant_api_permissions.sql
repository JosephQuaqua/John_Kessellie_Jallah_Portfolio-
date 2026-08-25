/*
  Grant PostgreSQL privileges to Supabase API roles.

  RLS policies control which rows can be accessed.
  These GRANT statements allow the anon and authenticated
  roles to access the tables through the Supabase REST API.
*/

-- Public portfolio content
GRANT SELECT ON TABLE public.profiles TO anon, authenticated;
GRANT SELECT ON TABLE public.experiences TO anon, authenticated;
GRANT SELECT ON TABLE public.education TO anon, authenticated;
GRANT SELECT ON TABLE public.publications TO anon, authenticated;
GRANT SELECT ON TABLE public.certifications TO anon, authenticated;
GRANT SELECT ON TABLE public.leadership_experiences TO anon, authenticated;
GRANT SELECT ON TABLE public.awards TO anon, authenticated;
GRANT SELECT ON TABLE public.skills TO anon, authenticated;
GRANT SELECT ON TABLE public.research_interests TO anon, authenticated;
GRANT SELECT ON TABLE public.site_settings TO anon, authenticated;

-- Contact form
GRANT INSERT ON TABLE public.contact_messages TO anon, authenticated;

-- Authenticated users need access to CMS tables.
-- Row Level Security policies determine what they can actually do.
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE
  public.profiles,
  public.experiences,
  public.education,
  public.publications,
  public.certifications,
  public.leadership_experiences,
  public.awards,
  public.skills,
  public.research_interests,
  public.contact_messages,
  public.media_library,
  public.site_settings
TO authenticated;

-- Admin authorization table:
-- access remains controlled through RLS and security policies.
GRANT SELECT ON TABLE public.admin_users TO authenticated;