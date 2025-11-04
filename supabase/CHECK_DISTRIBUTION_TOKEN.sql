-- 🔍 Comprehensive Check for Distribution Token: d_I2Q6CAr4OQIW
-- Run this in Supabase SQL Editor to diagnose the issue

-- 1. Check if distribution exists
SELECT 
  'Distribution Check' as check_type,
  id,
  questionnaire_id,
  token,
  is_active,
  automation_template_ids,
  created_at
FROM distributions
WHERE token = 'd_I2Q6CAr4OQIW';

-- 2. Check questionnaire linked to distribution
SELECT 
  'Questionnaire Check' as check_type,
  q.id,
  q.title,
  q.token as questionnaire_token,
  q.is_active as questionnaire_active,
  q.owner_id,
  d.id as distribution_id,
  d.token as distribution_token,
  d.is_active as distribution_active
FROM distributions d
INNER JOIN questionnaires q ON q.id = d.questionnaire_id
WHERE d.token = 'd_I2Q6CAr4OQIW';

-- 3. Test RPC function
SELECT 
  'RPC Function Test' as check_type,
  *
FROM get_distribution_by_token('d_I2Q6CAr4OQIW');

-- 4. Check if questionnaire has questions
SELECT 
  'Questions Check' as check_type,
  COUNT(*) as questions_count
FROM questions
WHERE questionnaire_id IN (
  SELECT questionnaire_id FROM distributions WHERE token = 'd_I2Q6CAr4OQIW'
);

-- 5. Check RLS policies on distributions
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
WHERE tablename = 'distributions'
  AND schemaname = 'public';

-- 6. Check RLS policies on questionnaires
SELECT 
  'Questionnaire RLS Policy Check' as check_type,
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'questionnaires'
  AND schemaname = 'public';

-- 7. Check if function exists and has permissions
SELECT 
  'Function Check' as check_type,
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

