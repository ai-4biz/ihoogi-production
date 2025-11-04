# 🔧 תיקון Production Distribution Links

## הבעיה האמיתית:

**יש שני Supabase Projects:**
1. **Production (ihoogi.com)**: `lcazbaggfdejukjgkpeu.supabase.co`
2. **Staging (ai-4biz.netlify.app)**: `beokpwiubwfaaazyyukp.supabase.co`

**הבעיה:**
- Distribution token `d_sxSu7bei4hNO` נוצר ב-**Staging DB**
- אבל ב-**Production DB** הוא לא קיים
- לכן הלינק לא עובד ב-`ihoogi.com`

## פתרון:

### שלב 1: בדוק ב-Production Supabase
1. התחבר ל-Production Supabase Dashboard: `lcazbaggfdejukjgkpeu.supabase.co`
2. פתח SQL Editor
3. הרץ את `PRODUCTION_DB_CHECK.sql`
4. בדוק אם יש distribution עם token `d_sxSu7bei4hNO`

### שלב 2: אם Distribution לא קיים
צריך ליצור אותו ב-production:

```sql
-- מצא את ה-questionnaire_id של השאלון ב-production
-- ואז צור distribution חדש
INSERT INTO distributions (questionnaire_id, token, is_active, automation_template_ids)
VALUES (
  '<questionnaire_id>',  -- החלף ב-ID של השאלון ב-production
  'd_sxSu7bei4hNO',      -- או צור token חדש
  true,
  '[]'::jsonb
);
```

### שלב 3: וודא RLS Policies
הרץ את `supabase/fix_distributions_rls.sql` ב-**Production Supabase**

### שלב 4: וודא RPC Function
הרץ את `supabase/update_distribution_function.sql` ב-**Production Supabase**

### שלב 5: בדוק את הלינק
פתח: `https://ihoogi.com/q/d_sxSu7bei4hNO?src=form`

## הערה חשובה:

הלינקים שנוצרים עכשיו **תמיד מצביעים ל-`https://ihoogi.com`**, גם אם אתה ב-localhost או staging.

אבל ה-distributions צריכים להיות קיימים ב-**Production Supabase** כדי שהלינקים יעבדו.

