# בדיקת suggest-questions Function

## סיכום תוצאות הבדיקה

### ✅ שדות שנמצאים בתשובה
1. **success**: ✅ `true` - נמצא ומוגדר נכון
2. **questionnaire_id**: ✅ נמצא (UUID תקין)
3. **questions**: ✅ מערך עם 3 שאלות

### ⚠️ שדות שחסרים/בעייתיים
1. **title**: ❌ **חסר** - לפי הקוד ב-`supabase/functions/suggest-questions/index.ts` (שורה 257) הפונקציה **אמורה** להחזיר `title: questionnaire.title`, אבל בתשובה בפועל הוא חסר.

### ✅ מבנה כל שאלה תקין
כל שאלה מכילה את כל השדות הנדרשים:
- ✅ `id`: string (מזהה ייחודי)
- ✅ `text`: string (טקסט השאלה)
- ✅ `type`: string (סוג השאלה - "single_choice")
- ✅ `isRequired`: boolean (true/false)
- ✅ `options`: array (4 אופציות עבור single_choice)

## השוואה לקוד המקור

### מה הקוד אומר (index.ts:254-258):
```typescript
return new Response(JSON.stringify({
  success: true,
  questionnaire_id: questionnaire.id,
  title: questionnaire.title,  // <-- אמור להיות כאן!
  questions: formattedQuestions
}))
```

### מה התשובה בפועל:
```json
{
  "success": true,
  "questionnaire_id": "38681d82-cd81-426c-8b4c-b1d48197e48e",
  // "title": חסר! ❌
  "questions": [...]
}
```

## הבעיה

**השדה `title` חסר בתשובה למרות שהקוד מגדיר אותו.**

### סיבות אפשריות:
1. `questionnaire.title` הוא `null` או `undefined` בשורה 190-194
2. ה-JSON.stringify אולי מסיר את השדה אם הוא null
3. יש שגיאה שקטה ביצירת ה-questionnaire

### בדיקה נדרשת:
בשורה 189-194, ה-questionnaire נוצר עם:
```typescript
const { data: questionnaire, error: questionnaireError } = await supabase
  .from("questionnaires")
  .insert({
    title: businessName || topic,  // <-- title מוגדר כאן
    created_at: new Date().toISOString()
  })
```

**הסיבה**: יכול להיות שה-`insert` מחזיר את ה-questionnaire אבל ה-`title` לא נשמר נכון או לא חוזר ב-select.

## השימוש ב-Frontend

בקוד Angular (`question-suggestion.service.ts`), ה-Frontend:
- ✅ לוקח רק את `data.questions` (שורה 115)
- ✅ **לא משתמש** ב-`title` או `questionnaire_id` מהתשובה
- ✅ לא נשפע מחסר `title` - **אין בעיה בפועל**

## המלצות

### בעיה קטנה (לא קריטית):
1. **title חסר** - לא משפיע על ה-Frontend כרגע, אבל יכול להיות שימושי בעתיד
2. הפונקציה עובדת תקין בכל שאר ההיבטים

### תיקון אפשרי:
```typescript
// בשורה 257, לוודא ש-title תמיד קיים:
title: questionnaire.title || businessName || topic
```

או לבדוק למה `questionnaire.title` לא חוזר מה-insert:
```typescript
// בדוק את התשובה מה-insert
console.log('Inserted questionnaire:', questionnaire);
```

## סיכום

✅ **הפונקציה עובדת תקין** - כל השדות החיוניים קיימים  
⚠️ **בעיה קטנה**: `title` חסר למרות שהקוד מגדיר אותו  
✅ **אין בעיה ב-Frontend** - לא משתמש ב-title מהתשובה  
💡 **שיפור מוצע**: לתקן את ה-`title` או לוודא שהוא תמיד חוזר
