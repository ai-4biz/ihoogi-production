-- 🔧 תיקון Production Distribution - הרץ ב-Production Supabase (lcazbaggfdejukjgkpeu)

-- שלב 1: בדוק אם distribution קיים
SELECT 
  'Step 1: Check Distribution' as step,
  id,
  questionnaire_id,
  token,
  is_active,
  automation_template_ids,
  created_at
FROM distributions
WHERE token = 'd_sxSu7bei4hNO';

-- שלב 2: בדוק אם יש distributions בכלל
SELECT 
  'Step 2: Check All Distributions' as step,
  COUNT(*) as total_distributions,
  COUNT(CASE WHEN token LIKE 'd_%' THEN 1 END) as distributions_with_token,
  COUNT(CASE WHEN is_active = true THEN 1 END) as active_distributions
FROM distributions;

-- שלב 3: צור RPC function (אם לא קיים)
CREATE OR REPLACE FUNCTION public.get_distribution_by_token(
  p_token TEXT
)
RETURNS TABLE (
  id UUID,
  questionnaire_id UUID,
  token TEXT,
  is_active BOOLEAN,
  automation_template_ids JSONB,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id,
    d.questionnaire_id,
    d.token,
    d.is_active,
    d.automation_template_ids,
    d.created_at
  FROM public.distributions d
  WHERE d.token = p_token
    AND d.is_active = true
  LIMIT 1;
END;
$$;

-- Grant execute permission to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION public.get_distribution_by_token(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.get_distribution_by_token(TEXT) TO authenticated;

-- שלב 4: וודא RLS policies
ALTER TABLE public.distributions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous users to view active distributions" ON public.distributions;
DROP POLICY IF EXISTS "Allow authenticated users to view active distributions" ON public.distributions;

-- Create policy allowing anonymous users to SELECT active distributions
CREATE POLICY "Allow anonymous users to view active distributions"
ON public.distributions
FOR SELECT
TO anon
USING (is_active = true);

-- Create policy allowing authenticated users to SELECT active distributions
CREATE POLICY "Allow authenticated users to view active distributions"
ON public.distributions
FOR SELECT
TO authenticated
USING (is_active = true);

-- שלב 5: בדוק אם יש questionnaires פעילים
SELECT 
  'Step 5: Check Active Questionnaires' as step,
  COUNT(*) as total_questionnaires,
  COUNT(CASE WHEN is_active = true THEN 1 END) as active_questionnaires
FROM questionnaires;

-- שלב 6: בדוק RLS על questionnaires
SELECT 
  'Step 6: Check Questionnaires RLS' as step,
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'questionnaires'
  AND schemaname = 'public';

-- שלב 7: אם צריך ליצור distribution חדש
-- (הערה: החלף <questionnaire_id> ב-ID של השאלון ב-production)
-- INSERT INTO distributions (questionnaire_id, token, is_active, automation_template_ids)
-- VALUES (
--   '<questionnaire_id>',  -- החלף ב-ID של השאלון
--   'd_sxSu7bei4hNO',      -- או צור token חדש
--   true,
--   '[]'::jsonb
-- );

