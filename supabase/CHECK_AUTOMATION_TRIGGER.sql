-- ========================================
-- 🔍 בדיקת האוטומציה - מה חסר?
-- ========================================

-- 1. בדוק אם יש triggers על טבלת leads
SELECT 
  '⚙️ Triggers על leads:' as info,
  trigger_name,
  event_manipulation,
  action_timing,
  action_statement
FROM information_schema.triggers
WHERE event_object_table = 'leads'
ORDER BY trigger_name;

-- 2. בדוק אם יש webhook מוגדר
-- ⚠️ Webhooks מוגדרים ב-Supabase Dashboard, לא בטבלה
-- לך ל-Database → Webhooks כדי לבדוק אם יש webhook ל-leads table
SELECT 
  '🔗 Webhooks:' as info,
  '⚠️ בדוק ב-Supabase Dashboard → Database → Webhooks' as note,
  'חפש webhook ל-tables: leads, events: INSERT' as instructions;

-- 3. בדוק כמה leads יש ב-2 ימים האחרונים
SELECT 
  '📊 Leads אחרונים:' as info,
  COUNT(*) as total_leads,
  MAX(created_at) as last_lead_date,
  COUNT(CASE WHEN created_at > NOW() - INTERVAL '2 days' THEN 1 END) as leads_last_2_days
FROM public.leads;

-- 4. בדוק אם יש leads עם email או phone (כדי לשלוח אליהם)
SELECT 
  '📧 Leads עם פרטי קשר:' as info,
  COUNT(*) as total,
  COUNT(email) as with_email,
  COUNT(phone) as with_phone,
  COUNT(CASE WHEN email IS NOT NULL OR phone IS NOT NULL THEN 1 END) as with_contact_info
FROM public.leads
WHERE created_at > NOW() - INTERVAL '7 days';

-- 5. בדוק אם יש distributions פעילות
SELECT 
  '📋 Distributions פעילות:' as info,
  COUNT(*) as total_active,
  COUNT(DISTINCT questionnaire_id) as unique_questionnaires
FROM public.distributions
WHERE is_active = true;

-- 6. בדוק אם יש automation templates
SELECT 
  '🤖 Automation Templates:' as info,
  COUNT(*) as total_templates,
  COUNT(DISTINCT user_id) as unique_users_with_templates
FROM public.automation_templates;

-- 7. בדוק אם יש distributions עם automation_template_ids
SELECT 
  '🔗 Distributions עם Templates:' as info,
  COUNT(*) as total,
  COUNT(CASE WHEN automation_template_ids IS NOT NULL AND jsonb_array_length(automation_template_ids) > 0 THEN 1 END) as with_templates
FROM public.distributions
WHERE is_active = true;

