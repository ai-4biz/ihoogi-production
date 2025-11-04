-- 🔍 בדיקות בלבד - ללא תיקונים
-- הרץ ב-Production Supabase (lcazbaggfdejukjgkpeu)

-- ============================================
-- 1. בדוק אם distribution קיים
-- ============================================
-- בדיקה ראשונה: האם קיים?
SELECT 
  'Distribution Check (Exists)' as check_name,
  CASE WHEN COUNT(*) > 0 THEN '✅ קיים' ELSE '❌ לא קיים' END as result,
  COUNT(*) as count
FROM distributions
WHERE token = 'd_sxSu7bei4hNO';

-- בדיקה שנייה: פרטי distribution (אם קיים)
SELECT 
  'Distribution Details' as check_name,
  id,
  questionnaire_id,
  token,
  is_active,
  automation_template_ids,
  created_at
FROM distributions
WHERE token = 'd_sxSu7bei4hNO';

-- ============================================
-- 2. בדוק כל distributions
-- ============================================
SELECT 
  'All Distributions' as check_name,
  COUNT(*) as total,
  COUNT(CASE WHEN token LIKE 'd_%' THEN 1 END) as with_token_prefix,
  COUNT(CASE WHEN is_active = true THEN 1 END) as active_count,
  COUNT(CASE WHEN is_active = false THEN 1 END) as inactive_count
FROM distributions;

-- ============================================
-- 3. בדוק אם questionnaire קיים
-- ============================================
-- בדיקה ראשונה: האם questionnaire קיים?
SELECT 
  'Questionnaire Check (Exists)' as check_name,
  CASE WHEN COUNT(*) > 0 THEN '✅ קיים' ELSE '❌ לא קיים' END as result,
  COUNT(*) as count
FROM distributions d
INNER JOIN questionnaires q ON q.id = d.questionnaire_id
WHERE d.token = 'd_sxSu7bei4hNO';

-- בדיקה שנייה: פרטי questionnaire (אם קיים)
SELECT 
  'Questionnaire Details' as check_name,
  q.id,
  q.title,
  q.token as questionnaire_token,
  q.is_active as questionnaire_active,
  d.token as distribution_token,
  d.is_active as distribution_active
FROM distributions d
INNER JOIN questionnaires q ON q.id = d.questionnaire_id
WHERE d.token = 'd_sxSu7bei4hNO';

-- ============================================
-- 4. בדוק RPC function
-- ============================================
SELECT 
  'RPC Function' as check_name,
  p.proname as function_name,
  CASE WHEN COUNT(*) > 0 THEN '✅ קיים' ELSE '❌ לא קיים' END as exists,
  CASE 
    WHEN has_function_privilege('anon', p.oid, 'EXECUTE') THEN '✅ יש הרשאה'
    ELSE '❌ אין הרשאה'
  END as anon_permission,
  CASE 
    WHEN has_function_privilege('authenticated', p.oid, 'EXECUTE') THEN '✅ יש הרשאה'
    ELSE '❌ אין הרשאה'
  END as authenticated_permission
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE p.proname = 'get_distribution_by_token'
  AND n.nspname = 'public'
GROUP BY p.proname, p.oid;

-- ============================================
-- 5. בדוק RLS policies
-- ============================================
SELECT 
  'RLS Policies' as check_name,
  tablename,
  policyname,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'distributions'
  AND schemaname = 'public';

-- ============================================
-- 6. בדוק אם יש questions
-- ============================================
SELECT 
  'Questions Check' as check_name,
  COUNT(*) as questions_count,
  CASE WHEN COUNT(*) > 0 THEN '✅ יש שאלות' ELSE '❌ אין שאלות' END as result
FROM questions
WHERE questionnaire_id IN (
  SELECT questionnaire_id FROM distributions WHERE token = 'd_sxSu7bei4hNO'
);

-- ============================================
-- 7. השווה ל-Staging (הערה: צריך להריץ ב-Staging DB)
-- ============================================
-- הרץ את זה ב-Staging Supabase (beokpwiubwfaaazyyukp):
-- SELECT 
--   'Staging Distribution (d_AWWTKYoRHAPB)' as check_name,
--   id,
--   questionnaire_id,
--   token,
--   is_active,
--   created_at
-- FROM distributions
-- WHERE token = 'd_AWWTKYoRHAPB';

