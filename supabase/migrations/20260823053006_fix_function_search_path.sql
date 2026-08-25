/*
# Fix search_path on update_updated_at_column function

Sets an explicit search_path on the trigger function to resolve the
function_search_path_mutable security warning.
*/

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = pg_catalog, public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
