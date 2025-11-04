-- 🔍 אבחון מלא - מה חסר ב-Production?
-- הרץ ב-Production Supabase (lcazbaggfdejukjgkpeu)

-- ============================================
-- שלב 1: האם יש distributions בכלל?
-- ============================================
SELECT 
  'Total Distributions' as check_name,
  COUNT(*) as total,
  COUNT(CASE WHEN token LIKE 'd_%' THEN 1 END) as with_token_prefix,
  COUNT(CASE WHEN is_active = true THEN 1 END) as active_count
FROM distributions;

-- ============================================
-- שלב 2: האם יש questionnaires בכלל?
-- ============================================
SELECT 
  'Total Questionnaires' as check_name,
  COUNT(*) as total,
  COUNT(CASE WHEN is_active = true THEN 1 END) as active_count,
  COUNT(CASE WHEN token LIKE 'q_%' THEN 1 END) as with_token_prefix
FROM questionnaires;

-- ============================================
-- שלב 3: האם יש questions בכלל?
-- ============================================
SELECT 
  'Total Questions' as check_name,
  COUNT(*) as total
FROM questions;

-- ============================================
-- שלב 4: האם יש distributions עם questionnaires פעילים?
-- ============================================
SELECT 
  'Active Distributions with Questionnaires' as check_name,
  COUNT(*) as count
FROM distributions d
INNER JOIN questionnaires q ON q.id = d.questionnaire_id
WHERE d.is_active = true 
  AND q.is_active = true;

-- ============================================
-- שלב 5: דוגמה ל-distribution פעיל (אם יש)
-- ============================================
SELECT 
  'Example Active Distribution' as check_name,
  d.id,
  d.token,
  d.is_active as dist_active,
  q.id as questionnaire_id,
  q.title,
  q.is_active as q_active,
  (SELECT COUNT(*) FROM questions WHERE questionnaire_id = q.id) as questions_count
FROM distributions d
INNER JOIN questionnaires q ON q.id = d.questionnaire_id
WHERE d.is_active = true 
  AND q.is_active = true
LIMIT 1;

