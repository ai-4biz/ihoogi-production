-- 🔍 בדיקה מקיפה ל-Production Supabase (lcazbaggfdejukjgkpeu)
-- Token: d_sxSu7bei4hNO

-- 1. בדוק אם distribution קיים
SELECT 
  'Distribution Check' as check_type,
  id,
  questionnaire_id,
  token,
  is_active,
  automation_template_ids,
  created_at
FROM distributions
WHERE token = 'd_sxSu7bei4hNO';

-- 2. בדוק אם יש distribution בכלל עם token d_
SELECT 
  'All Distributions Check' as check_type,
  COUNT(*) as total_distributions,
  COUNT(CASE WHEN token LIKE 'd_%' THEN 1 END) as distributions_with_token,
  COUNT(CASE WHEN is_active = true THEN 1 END) as active_distributions
FROM distributions;

-- 3. בדוק אם יש RPC function
SELECT 
  'RPC Function Check' as check_type,
  p.proname as function_name,
  pg_get_function_identity_arguments(p.oid) as arguments,
  CASE 
    WHEN has_function_privilege('anon', p.oid, 'EXECUTE') THEN '✅ anon'
    ELSE '❌ anon'
  END as anon_permission,
  CASE 
    WHEN has_function_privilege('authenticated', p.oid, 'EXECUTE') THEN '✅ authenticated'
    ELSE '❌ authenticated'
  END as authenticated_permission
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE p.proname = 'get_distribution_by_token'
  AND n.nspname = 'public';

-- 4. בדוק RLS policies
SELECT 
  'RLS Policy Check' as check_type,
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename IN ('distributions', 'questionnaires')
  AND schemaname = 'public';

-- 5. בדוק אם יש distributions בכלל
SELECT 
  'Distributions Table Check' as check_type,
  COUNT(*) as total_rows
FROM distributions;

