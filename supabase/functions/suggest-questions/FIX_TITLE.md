# תיקון ה-title בפונקציה suggest-questions

## הבעיה שתוקנה
השדה `title` חסר בתשובה של הפונקציה למרות שהקוד ניסה להחזיר אותו.

## התיקון שבוצע

### 1. שיפור יצירת ה-questionnaire (שורות 187-207)
- הוספת משתנה `questionnaireTitle` עם fallback מפורש
- שינוי `.select()` ל-`.select('id, title, created_at')` כדי לוודא שה-title חוזר
- הוספת logging לניפוי באגים

### 2. תיקון החזרת ה-title בתשובה (שורות 265-266)
- הוספת fallback chain: `questionnaire?.title || questionnaireTitle || businessName || topic || 'New Questionnaire'`
- עכשיו ה-title **תמיד** יחזור בתשובה

## קבצים ששונו
- `supabase/functions/suggest-questions/index.ts`

## איך לעדכן ב-Supabase

### אפשרות 1: דרך Supabase CLI
```bash
cd supabase
supabase functions deploy suggest-questions
```

### אפשרות 2: דרך Supabase Dashboard
1. לך ל-Supabase Dashboard → Edge Functions
2. פתח את `suggest-questions`
3. העתק את הקוד המעודכן מ-`supabase/functions/suggest-questions/index.ts`
4. שמור ופרסום

## בדיקה לאחר העדכון

לאחר העדכון, תוכל להריץ:
```bash
cd ng
powershell -ExecutionPolicy Bypass -File check-title-issue.ps1
```

התשובה אמורה להכיל:
```json
{
  "success": true,
  "questionnaire_id": "...",
  "title": "...",  // ✅ עכשיו זה אמור להופיע!
  "questions": [...]
}
```

## מה שונה בקוד

### לפני:
```typescript
title: questionnaire.title,  // יכול להיות undefined
```

### אחרי:
```typescript
const finalTitle = questionnaire?.title || questionnaireTitle || businessName || topic || 'New Questionnaire';
title: finalTitle,  // תמיד יהיה ערך
```

## תאריך התיקון
2025-10-30
