# 🧪 Testing Guide for Distribution Link

## הלינק לבדיקה:
```
https://ihoogi.com/q/d_I2Q6CAr4OQIW?src=form
```

## שלבי בדיקה:

### 1. בדיקת Console Logs (Browser DevTools)
פתח את Browser DevTools (F12) → Console tab

**הלוגים שצריכים להופיע:**
```
🔍 [QuestionnaireLive] Loading questionnaire: {tokenOrId: "d_I2Q6CAr4OQIW", ...}
🔍 [QuestionnaireService] fetchQuestionnaireByToken called with token: d_I2Q6CAr4OQIW
🔍 [QuestionnaireService] Detected distribution token
⚠️ RPC returned error or empty result: ...
🔄 Trying direct query methods...
✅ Distribution found via join query
✅ Questionnaire loaded successfully
```

### 2. בדיקת Network Tab
פתח Browser DevTools → Network tab

**בדוק את הבקשות:**
- `/rest/v1/distributions` - צריך להחזיר distribution
- `/rest/v1/questionnaires` - צריך להחזיר questionnaire
- `/rest/v1/questions` - צריך להחזיר questions
- `/rest/v1/question_options` - צריך להחזיר options

**אם יש שגיאות:**
- 401 Unauthorized → בעיית RLS
- 422 Unprocessable Entity → בעיית validation
- 404 Not Found → Distribution לא קיים

### 3. בדיקת DB (Supabase SQL Editor)
הרץ את הקובץ: `supabase/CHECK_DISTRIBUTION_TOKEN.sql`

**תוצאות צפויות:**
1. Distribution צריך להיות קיים עם `is_active = true`
2. Questionnaire צריך להיות קיים עם `is_active = true`
3. RPC function צריך להחזיר תוצאות
4. Questions צריך להיות קיים

### 4. בעיות נפוצות ופתרונות:

#### בעיה: דף ריק / "Questionnaire not found"
**פתרון:**
1. בדוק ב-DB אם distribution קיים
2. בדוק אם `is_active = true`
3. בדוק RLS policies
4. הרץ את RPC function ידנית

#### בעיה: 401 Unauthorized
**פתרון:**
1. וודא שיש RLS policy ל-anonymous users
2. הרץ `supabase/fix_distributions_rls.sql`
3. וודא שהפונקציה `get_distribution_by_token` קיימת

#### בעיה: 422 Unprocessable Entity
**פתרון:**
1. הקוד כבר מטפל בזה עם fallbacks
2. בדוק את הלוגים ב-console
3. הבעיה אמורה להיפתר אוטומטית

### 5. תיקונים שבוצעו:

✅ הוספתי לוגים מפורטים לכל שלב
✅ שיפרתי fallback mechanisms
✅ הוספתי טיפול בשגיאות 422
✅ יצרתי SQL script לבדיקת DB

### 6. צעדים הבאים:

1. פתח את הלינק בדפדפן
2. פתח DevTools → Console
3. העתק את כל הלוגים
4. אם יש שגיאות, שלח אותן
5. הרץ את SQL script ב-Supabase
6. שלח את התוצאות

