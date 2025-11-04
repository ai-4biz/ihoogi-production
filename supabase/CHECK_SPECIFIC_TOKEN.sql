-- 🔍 בדיקה ספציפית - Token: d_sxSu7bei4hNO
-- הרץ ב-Production Supabase (lcazbaggfdejukjgkpeu)

-- ============================================
-- 1. בדוק אם ה-token הספציפי קיים
-- ============================================
SELECT 
  'Specific Token Check' as check_name,
  CASE WHEN COUNT(*) > 0 THEN '✅ קיים' ELSE '❌ לא קיים' END as result,
  COUNT(*) as count
FROM distributions
WHERE token = 'd_sxSu7bei4hNO';

-- ============================================
-- 2. פרטי distribution (אם קיים)
-- ============================================
SELECT 
  'Token Details' as check_name,
  id,
  questionnaire_id,
  token,
  is_active,
  automation_template_ids,
  created_at
FROM distributions
WHERE token = 'd_sxSu7bei4hNO';

-- ============================================
-- 3. כל ה-distributions עם token שמתחיל ב-d_
-- ============================================
SELECT 
  'All Distribution Tokens' as check_name,
  d.id,
  d.token,
  d.is_active,
  q.title as questionnaire_title,
  q.is_active as questionnaire_active,
  (SELECT COUNT(*) FROM questions WHERE questionnaire_id = q.id) as questions_count
FROM distributions d
LEFT JOIN questionnaires q ON q.id = d.questionnaire_id
WHERE d.token LIKE 'd_%'
ORDER BY d.created_at DESC
LIMIT 10;

-- ============================================
-- 4. בדוק את ה-token שעובד (d_BPpcan8aVwr3)
-- ============================================
SELECT 
  'Working Token Details' as check_name,
  d.id,
  d.token,
  d.is_active,
  q.id as questionnaire_id,
  q.title,
  q.is_active as questionnaire_active,
  (SELECT COUNT(*) FROM questions WHERE questionnaire_id = q.id) as questions_count
FROM distributions d
INNER JOIN questionnaires q ON q.id = d.questionnaire_id
WHERE d.token = 'd_BPpcan8aVwr3';

