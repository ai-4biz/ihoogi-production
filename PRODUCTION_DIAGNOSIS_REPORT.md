# 🔍 דוח בדיקה מקיפה - טופס עובד בלוקאל ולא בפרודקשן

**תאריך:** $(date)
**קישור בעייתי:** `https://ihoogi.com/q/d_n4x0Oq8kuQGN?src=form`

---

## ✅ מה שתוקן עד כה:

### 1. ✅ Netlify Redirects - **תוקן**
- **קובץ:** `ng/public/_redirects`
- **תוכן:** `/*    /index.html   200`
- **סטטוס:** ✅ קיים ומתוקן
- **בדיקה:** קובץ קיים ב-`dist/ng/browser/_redirects` גם כן

### 2. ✅ Double Slash - **תוקן**
- **קובץ:** `ng/src/environments/environment.prod.ts`
- **תוכן:** `baseUrl: 'https://ihoogi.com'` (ללא `/` בסוף)
- **סטטוס:** ✅ אין trailing slash
- **בדיקה:** לא נמצאו מקומות עם `//q` או `//` בקוד

### 3. ✅ Angular Routing - **תקין**
- **קובץ:** `ng/src/app/app.routes.ts`
- **Routes קיימים:**
  - `q/:token` → `QuestionnaireLive`
  - `q/:token/chat` → `QuestionnaireChat`
  - `q/:token/qr` → `QuestionnaireQrComponent`
- **סטטוס:** ✅ כל ה-routes מוגדרים נכון

### 4. ✅ URL Construction - **תקין**
- **מקומות שבנו URL:**
  - `questionnaires.component.ts` - משתמש ב-`environment.siteUrl`
  - `distribution-hub.component.ts` - משתמש ב-`environment.siteUrl || window.location.origin`
  - `questionnaire-qr.component.ts` - משתמש ב-`environment.siteUrl`
- **סטטוס:** ✅ כל המקומות משתמשים ב-`environment.siteUrl` בצורה נכונה

---

## ⚠️ בעיות אפשריות שצריך לבדוק ב-Production:

### 1. 🔴 **RLS Policies ב-Supabase Production**
**הבעיה האפשרית:**
- Anonymous users לא יכולים לגשת ל-`distributions` table
- ה-RLS policy `"Allow anonymous users to view active distributions"` לא קיים או לא מופעל

**איך לבדוק:**
```sql
-- ב-Supabase Dashboard → SQL Editor
SELECT 
  schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'distributions';
```

**מה צריך להיות:**
```sql
CREATE POLICY "Allow anonymous users to view active distributions"
ON public.distributions
FOR SELECT
TO anon
USING (is_active = true);
```

### 2. 🔴 **RPC Function לא קיים ב-Production**
**הבעיה האפשרית:**
- הפונקציה `get_distribution_by_token` לא קיימת ב-Supabase Production

**איך לבדוק:**
```sql
-- ב-Supabase Dashboard → SQL Editor
SELECT 
  proname, proargtypes, prosecdef
FROM pg_proc 
WHERE proname = 'get_distribution_by_token';
```

**מה צריך להיות:**
```sql
CREATE OR REPLACE FUNCTION public.get_distribution_by_token(p_token TEXT)
RETURNS TABLE (...)
LANGUAGE plpgsql
SECURITY DEFINER
...
GRANT EXECUTE ON FUNCTION public.get_distribution_by_token(TEXT) TO anon;
```

### 3. 🟡 **Join Query לא עובד עם RLS**
**הבעיה האפשרית:**
- הקוד ב-`questionnaire.service.ts` משתמש ב-join:
  ```typescript
  .select('questionnaire_id, questionnaires(*)')
  ```
- אם ה-RLS על `questionnaires` לא מאפשר anonymous access, ה-join יכשל

**איך לבדוק:**
- פתח Network tab ב-browser
- גש ל-`https://ihoogi.com/q/d_n4x0Oq8kuQGN?src=form`
- בדוק מה ה-response מה-Supabase

### 4. 🟡 **Build לא מעודכן ב-Netlify**
**הבעיה האפשרית:**
- Netlify לא עשה rebuild אחרי השינויים האחרונים
- ה-`_redirects` לא נכנס ל-build

**איך לבדוק:**
- ב-Netlify Dashboard → Deploys
- בדוק שהדיפלוי האחרון כולל את השינויים

### 5. 🟡 **Environment Variables לא נכונים ב-Netlify**
**הבעיה האפשרית:**
- `VITE_SUPABASE_URL` או `VITE_SUPABASE_ANON_KEY` לא מוגדרים ב-Netlify
- או שהם מצביעים ל-Development Supabase במקום Production

**איך לבדוק:**
- ב-Netlify Dashboard → Site settings → Environment variables
- בדוק שהערכים תואמים ל-`environment.prod.ts`

### 6. 🟡 **Token לא קיים ב-Production DB**
**הבעיה האפשרית:**
- הטופס עם token `d_n4x0Oq8kuQGN` נוצר ב-Development DB
- ב-Production DB אין את ה-record הזה

**איך לבדוק:**
```sql
-- ב-Supabase Production Dashboard
SELECT * FROM distributions WHERE token = 'd_n4x0Oq8kuQGN';
```

---

## 🎯 סיכום והמלצות:

### ✅ מה שפועל:
1. Netlify redirects תקין
2. Angular routing תקין
3. אין double slash
4. URL construction תקין

### ⚠️ מה צריך לבדוק ב-Production:

**עדיפות גבוהה:**
1. **RLS Policies** - וודא שיש policy ל-anonymous access ל-`distributions`
2. **RPC Function** - וודא ש-`get_distribution_by_token` קיים ומופעל
3. **Supabase Environment** - וודא שהקוד מצביע ל-Production Supabase (לא Dev)

**עדיפות בינונית:**
4. **Netlify Build** - וודא שה-build כולל את כל השינויים
5. **Network Logs** - בדוק מה ה-response מה-Supabase כשמנסים לגשת לטופס

---

## 📋 צעדים לביצוע:

1. ✅ **בדוק RLS Policies ב-Supabase Production:**
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'distributions';
   ```

2. ✅ **בדוק RPC Function:**
   ```sql
   SELECT * FROM pg_proc WHERE proname = 'get_distribution_by_token';
   ```

3. ✅ **בדוק שהטופס קיים ב-Production DB:**
   ```sql
   SELECT * FROM distributions WHERE token = 'd_n4x0Oq8kuQGN';
   ```

4. ✅ **בדוק Network Logs:**
   - פתח Chrome DevTools → Network
   - גש ל-`https://ihoogi.com/q/d_n4x0Oq8kuQGN?src=form`
   - בדוק את ה-responses מה-Supabase

5. ✅ **בדוק Netlify Build:**
   - Netlify Dashboard → Deploys → בדוק שהדיפלוי האחרון כולל את השינויים

---

## 🔧 אם הכל תקין והבעיה עדיין קיימת:

ייתכן שהבעיה היא ב-**CORS** או ב-**Cache**:
- בדוק ש-Netlify משרת את הקבצים עם headers נכונים
- נסה לגשת ל-`https://ihoogi.com/q/d_n4x0Oq8kuQGN?src=form` ב-Incognito mode
- נסה לנקות cache של Netlify

---

**הערה:** כל הבדיקות הללו דורשות גישה ל-Supabase Production Dashboard ול-Netlify Dashboard.

