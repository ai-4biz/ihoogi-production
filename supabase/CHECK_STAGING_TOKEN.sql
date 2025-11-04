-- 🔍 בדיקה ב-Staging Supabase (beokpwiubwfaaazyyukp)
-- Token: d_BPpcan8aVwr3

-- ============================================
-- 1. בדוק אם distribution קיים
-- ============================================
SELECT 
  'Distribution Exists?' as check_type,
  CASE WHEN COUNT(*) > 0 THEN '✅ YES' ELSE '❌ NO' END as result,
  COUNT(*) as count
FROM distributions
WHERE token = 'd_BPpcan8aVwr3';

-- ============================================
-- 2. פרטי distribution (אם קיים)
-- ============================================
SELECT 
  'Distribution Details' as check_type,
  id,
  questionnaire_id,
  token,
  is_active,
  automation_template_ids,
  created_at
FROM distributions
WHERE token = 'd_BPpcan8aVwr3';

-- ============================================
-- 3. בדוק אם questionnaire קיים ופעיל
-- ============================================
-- בדיקה ראשונה: האם questionnaire קיים?
SELECT 
  'Questionnaire Exists?' as check_type,
  CASE WHEN COUNT(*) > 0 THEN '✅ YES' ELSE '❌ NO' END as result,
  COUNT(*) as count
FROM distributions d
INNER JOIN questionnaires q ON q.id = d.questionnaire_id
WHERE d.token = 'd_BPpcan8aVwr3';

-- בדיקה שנייה: פרטי questionnaire (אם קיים)
SELECT 
  'Questionnaire Details' as check_type,
  q.id,
  q.title,
  q.token as questionnaire_token,
  q.is_active as questionnaire_active,
  d.token as distribution_token,
  d.is_active as distribution_active
FROM distributions d
INNER JOIN questionnaires q ON q.id = d.questionnaire_id
WHERE d.token = 'd_BPpcan8aVwr3';

-- ============================================
-- 4. בדוק אם יש questions
-- ============================================
SELECT 
  'Questions Check' as check_type,
  COUNT(*) as questions_count,
  CASE WHEN COUNT(*) > 0 THEN '✅ יש שאלות' ELSE '❌ אין שאלות' END as result
FROM questions
WHERE questionnaire_id IN (
  SELECT questionnaire_id FROM distributions WHERE token = 'd_BPpcan8aVwr3'
);

-- ============================================
-- 5. בדוק RPC function
-- ============================================
SELECT 
  'RPC Function Exists?' as check_type,
  CASE WHEN COUNT(*) > 0 THEN '✅ YES' ELSE '❌ NO' END as result,
  p.proname as function_name
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE p.proname = 'get_distribution_by_token'
  AND n.nspname = 'public';

-- ============================================
-- 6. בדוק RLS policies
-- ============================================
SELECT 
  'RLS Policies' as check_type,
  tablename,
  policyname,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'distributions'
  AND schemaname = 'public';

-- ============================================
-- 7. נסה RPC function ישירות
-- ============================================
SELECT * FROM get_distribution_by_token('d_BPpcan8aVwr3');

