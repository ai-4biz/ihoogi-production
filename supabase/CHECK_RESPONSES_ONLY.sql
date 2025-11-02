-- ========================================
-- 🔍 בדיקות בלבד - לא משנה כלום
-- ========================================
-- הרץ את הקובץ הזה ב-Supabase SQL Editor
-- זה רק בודק את המצב - לא משנה שום דבר
-- 
-- ⚠️ חשוב: הרץ כל חלק בנפרד או את כולם יחד
-- התוצאות יופיעו כולן יחד בסוף

-- ========================================
-- סיכום מלא - כל הבדיקות במקום אחד
-- ========================================

SELECT 
  '🔍 סיכום בדיקות - תשובות לא נשמרות' as title,
  
  -- בדיקת עמודות ב-responses
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'responses' AND column_name = 'response_data'
  ) THEN '✅' ELSE '❌' END || ' response_data' as response_data_column,
  
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'responses' AND column_name = 'submitted_at'
  ) THEN '✅' ELSE '❌' END || ' submitted_at' as submitted_at_column,
  
  -- בדיקת RLS על responses
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'responses' AND schemaname = 'public' AND rowsecurity = true
  ) THEN '✅' ELSE '❌' END || ' RLS מופעל על responses' as responses_rls,
  
  -- בדיקת INSERT policy על responses
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'responses' AND cmd = 'INSERT'
  ) THEN '✅' ELSE '❌' END || ' יש INSERT policy על responses' as responses_insert_policy,
  
  -- בדיקת RPC function submit_questionnaire_response
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'submit_questionnaire_response'
  ) THEN '✅' ELSE '❌' END || ' submit_questionnaire_response function' as submit_response_function,
  
  -- בדיקת permissions ל-submit_questionnaire_response
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.routine_privileges 
    WHERE routine_name = 'submit_questionnaire_response' AND grantee = 'anon'
  ) THEN '✅' ELSE '❌' END || ' submit_questionnaire_response permissions ל-anon' as submit_response_permissions,
  
  -- בדיקת RPC function submit_lead
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'submit_lead'
  ) THEN '✅' ELSE '❌' END || ' submit_lead function' as submit_lead_function,
  
  -- בדיקת RLS על leads
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'leads' AND schemaname = 'public' AND rowsecurity = true
  ) THEN '✅' ELSE '❌' END || ' RLS מופעל על leads' as leads_rls,
  
  -- בדיקת INSERT policy על leads
  CASE WHEN EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'leads' AND cmd = 'INSERT'
  ) THEN '✅' ELSE '❌' END || ' יש INSERT policy על leads' as leads_insert_policy;

-- ========================================
-- פרטים נוספים - מבנה טבלת responses
-- ========================================
SELECT 
  '📊 מבנה טבלת responses:' as section,
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'responses'
ORDER BY ordinal_position;

-- ========================================
-- פרטים נוספים - RLS Policies על responses
-- ========================================
SELECT 
  '📋 RLS Policies על responses:' as section,
  policyname, 
  cmd as operation,
  roles
FROM pg_policies
WHERE tablename = 'responses'
ORDER BY policyname;

-- ========================================
-- פרטים נוספים - RPC Functions
-- ========================================
SELECT 
  '⚙️ RPC Functions:' as section,
  proname as function_name,
  CASE WHEN prosecdef THEN '✅ SECURITY DEFINER' ELSE '❌ לא SECURITY DEFINER' END as security_status
FROM pg_proc
WHERE proname IN ('submit_questionnaire_response', 'submit_lead')
ORDER BY proname;

-- ========================================
-- פרטים נוספים - Permissions
-- ========================================
SELECT 
  '🔐 Permissions:' as section,
  routine_name,
  grantee,
  privilege_type
FROM information_schema.routine_privileges
WHERE routine_name IN ('submit_questionnaire_response', 'submit_lead')
ORDER BY routine_name, grantee;

