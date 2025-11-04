-- 🔍 בדיקה בלבד - Distribution Token שעובד: d_AWWTKYoRHAPB
-- הרץ ב-Staging Supabase (beokpwiubwfaaazyyukp) - זה שעובד

-- 1. בדוק distribution
SELECT 
  'Working Distribution' as check_type,
  id,
  questionnaire_id,
  token,
  is_active,
  automation_template_ids,
  created_at
FROM distributions
WHERE token = 'd_AWWTKYoRHAPB';

-- 2. בדוק questionnaire
SELECT 
  'Working Questionnaire' as check_type,
  q.id,
  q.title,
  q.token as questionnaire_token,
  q.is_active,
  d.token as distribution_token,
  d.is_active as distribution_active
FROM distributions d
INNER JOIN questionnaires q ON q.id = d.questionnaire_id
WHERE d.token = 'd_AWWTKYoRHAPB';

-- 3. השווה RLS policies
SELECT 
  'RLS Comparison' as check_type,
  tablename,
  policyname,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'distributions'
  AND schemaname = 'public';

-- 4. בדוק RPC function
SELECT 
  'RPC Function' as check_type,
  p.proname as function_name,
  CASE 
    WHEN has_function_privilege('anon', p.oid, 'EXECUTE') THEN '✅ anon'
    ELSE '❌ anon'
  END as anon_permission
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE p.proname = 'get_distribution_by_token'
  AND n.nspname = 'public';

