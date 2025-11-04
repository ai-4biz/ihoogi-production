# 🔍 Debug Distribution Link - d_I2Q6CAr4OQIW

## הלינק הבעייתי:
```
https://ihoogi.com/q/d_I2Q6CAr4OQIW?src=form
```

## בדיקות לביצוע:

### 1. בדיקת Distribution Token ב-DB
```sql
SELECT 
  id,
  questionnaire_id,
  token,
  is_active,
  automation_template_ids,
  created_at
FROM distributions
WHERE token = 'd_I2Q6CAr4OQIW';
```

### 2. בדיקת Questionnaire
```sql
SELECT 
  q.id,
  q.title,
  q.token as questionnaire_token,
  q.is_active as questionnaire_active,
  q.owner_id
FROM questionnaires q
INNER JOIN distributions d ON d.questionnaire_id = q.id
WHERE d.token = 'd_I2Q6CAr4OQIW';
```

### 3. בדיקת RPC Function
```sql
SELECT * FROM get_distribution_by_token('d_I2Q6CAr4OQIW');
```

### 4. בדיקת RLS Policies
```sql
-- Check distributions RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'distributions';

-- Check questionnaires RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'questionnaires';
```

### 5. בדיקת Questions ו-Options
```sql
-- After getting questionnaire_id from step 2
SELECT 
  id,
  questionnaire_id,
  question_text,
  question_type,
  is_required,
  order_index
FROM questions
WHERE questionnaire_id = '<questionnaire_id>'
ORDER BY order_index;

SELECT 
  id,
  question_id,
  option_text,
  order_index
FROM question_options
WHERE question_id IN (
  SELECT id FROM questions WHERE questionnaire_id = '<questionnaire_id>'
)
ORDER BY question_id, order_index;
```

## בעיות אפשריות:

1. **Distribution לא קיים** - Token לא נמצא ב-DB
2. **Distribution לא פעיל** - `is_active = false`
3. **Questionnaire לא פעיל** - `is_active = false`
4. **RLS חוסם גישה** - Policies לא מאפשרות גישה ל-anonymous users
5. **RPC Function לא עובד** - Function לא קיים או לא נגיש
6. **שגיאה בקוד Frontend** - הקוד לא מטען את השאלון נכון

## תיקונים נדרשים:

1. ✅ שפרתי את `fetchQuestionnaireByToken` עם fallbacks מרובים
2. ✅ הוספתי לוגים מפורטים
3. ⚠️ צריך לבדוק ב-DB אם ה-distribution קיים
4. ⚠️ צריך לבדוק RLS policies

