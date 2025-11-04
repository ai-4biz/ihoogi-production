-- 🔍 בדיקה בלבד - Distribution Token: d_sxSu7bei4hNO
-- הרץ ב-Production Supabase (lcazbaggfdejukjgkpeu)

-- 1. בדוק אם distribution קיים
SELECT 
  'Distribution Exists?' as check_type,
  CASE WHEN COUNT(*) > 0 THEN '✅ YES' ELSE '❌ NO' END as result,
  COUNT(*) as count
FROM distributions
WHERE token = 'd_sxSu7bei4hNO';

-- 2. פרטי distribution (אם קיים)
SELECT 
  'Distribution Details' as check_type,
  id,
  questionnaire_id,
  token,
  is_active,
  automation_template_ids,
  created_at
FROM distributions
WHERE token = 'd_sxSu7bei4hNO';

-- 3. בדוק אם questionnaire קיים
-- בדיקה ראשונה: האם קיים?
SELECT 
  'Questionnaire Exists?' as check_type,
  CASE WHEN COUNT(*) > 0 THEN '✅ YES' ELSE '❌ NO' END as result,
  COUNT(*) as count
FROM distributions d
INNER JOIN questionnaires q ON q.id = d.questionnaire_id
WHERE d.token = 'd_sxSu7bei4hNO';

-- בדיקה שנייה: פרטי questionnaire (אם קיים)
SELECT 
  'Questionnaire Details' as check_type,
  q.id,
  q.title,
  q.is_active as questionnaire_active,
  d.token as distribution_token,
  d.is_active as distribution_active
FROM distributions d
INNER JOIN questionnaires q ON q.id = d.questionnaire_id
WHERE d.token = 'd_sxSu7bei4hNO';

-- 4. בדוק RPC function
SELECT 
  'RPC Function Exists?' as check_type,
  CASE WHEN COUNT(*) > 0 THEN '✅ YES' ELSE '❌ NO' END as result,
  p.proname as function_name
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE p.proname = 'get_distribution_by_token'
  AND n.nspname = 'public';

-- 5. בדוק RLS policies
SELECT 
  'RLS Policies' as check_type,
  tablename,
  policyname,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'distributions'
  AND schemaname = 'public';

-- 6. בדוק אם יש questions ל-questionnaire
SELECT 
  'Questions Exist?' as check_type,
  CASE WHEN COUNT(*) > 0 THEN '✅ YES' ELSE '❌ NO' END as result,
  COUNT(*) as questions_count
FROM questions
WHERE questionnaire_id IN (
  SELECT questionnaire_id FROM distributions WHERE token = 'd_sxSu7bei4hNO'
);

-- 7. בדוק RPC function permissions
SELECT 
  'RPC Permissions' as check_type,
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

