# 🔍 ניתוח שגיאה - Staging

## השגיאה:

**"Distribution not found or inactive. Please check the URL"**

## מה זה אומר:

1. ✅ **הלינק עובד** - הדף נטען (לא "Not Found")
2. ✅ **Routing תקין** - Angular מגיע ל-component הנכון
3. ❌ **Distribution לא נמצא** - ה-token `d_BPpcan8aVwr3` לא קיים ב-Staging Supabase
4. או **Distribution לא פעיל** - ה-token קיים אבל `is_active = false`

## מה לבדוק:

### שלב 1: הרץ את `supabase/CHECK_STAGING_TOKEN.sql`
הרץ את זה ב-**Staging Supabase** (`beokpwiubwfaaazyyukp`)

זה יראה:
- האם ה-distribution קיים
- האם הוא פעיל
- האם יש questionnaire מקושר
- האם יש questions

### שלב 2: אם Distribution לא קיים
צריך ליצור אותו ב-Staging:
1. מצא את ה-questionnaire_id של השאלון "בדיקה"
2. צור distribution חדש עם token `d_BPpcan8aVwr3`

### שלב 3: אם Distribution לא פעיל
עדכן את ה-`is_active` ל-`true`:
```sql
UPDATE distributions 
SET is_active = true 
WHERE token = 'd_BPpcan8aVwr3';
```

### שלב 4: בדוק RPC function
אם ה-RPC function לא קיים או אין הרשאות, צריך ליצור אותו:
- הרץ את `supabase/fix_distributions_rls.sql` ב-Staging

## סיכום:

**הלינק עובד!** הבעיה היא רק שה-distribution token לא קיים ב-Staging Supabase.

צריך:
1. לבדוק אם ה-token קיים ב-Staging
2. אם לא, ליצור אותו
3. אם כן, לוודא שהוא פעיל

