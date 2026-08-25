/*
  Secure media storage bucket

  Public users can view media.
  Only authorized administrators can upload,
  update, or delete files.
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;


-- ============================================
-- PUBLIC READ ACCESS
-- ============================================

DROP POLICY IF EXISTS "public_read_media_bucket" ON storage.objects;

CREATE POLICY "public_read_media_bucket"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'media');


-- ============================================
-- ADMIN UPLOAD
-- ============================================

DROP POLICY IF EXISTS "auth_upload_media_bucket" ON storage.objects;

CREATE POLICY "admins_upload_media_bucket"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'media'
  AND public.is_admin()
);


-- ============================================
-- ADMIN UPDATE
-- ============================================

DROP POLICY IF EXISTS "auth_update_media_bucket" ON storage.objects;

CREATE POLICY "admins_update_media_bucket"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'media'
  AND public.is_admin()
)
WITH CHECK (
  bucket_id = 'media'
  AND public.is_admin()
);


-- ============================================
-- ADMIN DELETE
-- ============================================

DROP POLICY IF EXISTS "auth_delete_media_bucket" ON storage.objects;

CREATE POLICY "admins_delete_media_bucket"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'media'
  AND public.is_admin()
);