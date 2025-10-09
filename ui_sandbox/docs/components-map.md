# מפת רכיבים - Hoogi UI Sandbox

## סקירה כללית

מסמך זה מספק מפה מלאה של כל הרכיבים הזמינים ב-UI Sandbox, כולל מיקום הקבצים, וריאציות זמינות וסינטקס בסיסי.

## רשימת רכיבים

### 1. כפתורים (Buttons)
**קובץ**: `components/button.html`  
**תיאור**: רכיב כפתורים עם וריאציות שונות ומצבים

#### וריאציות זמינות:
- `default` - כפתור ראשי (primary)
- `secondary` - כפתור משני
- `outline` - כפתור עם מסגרת
- `ghost` - כפתור שקוף
- `destructive` - כפתור הרסני (מחיקה)
- `link` - כפתור קישור

#### גדלים:
- `sm` - קטן (h-8)
- `default` - רגיל (h-10)
- `lg` - גדול (h-12)
- `icon` - אייקון בלבד (h-10 w-10)

#### מצבים:
- `normal` - מצב רגיל
- `hover` - מצב מרחף
- `active` - מצב לחוץ
- `focus` - מצב מוקד
- `disabled` - מצב מבוטל
- `loading` - מצב טעינה

#### סינטקס בסיסי:
```html
<button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-white hover:bg-primary-hover">
  כפתור ראשי
</button>
```

---

### 2. שדות קלט (Input)
**קובץ**: `components/input.html`  
**תיאור**: רכיבי קלט עם תמיכה באייקונים ומצבי שגיאה

#### סוגי שדות:
- `text` - שדה טקסט רגיל
- `email` - שדה אימייל
- `password` - שדה סיסמה
- `number` - שדה מספר
- `tel` - שדה טלפון
- `url` - שדה כתובת אתר
- `date` - שדה תאריך
- `time` - שדה שעה
- `file` - שדה קובץ
- `textarea` - שדה טקסט ארוך

#### גדלים:
- `sm` - קטן (h-8)
- `default` - רגיל (h-10)
- `lg` - גדול (h-12)

#### מצבים:
- `normal` - מצב רגיל
- `focus` - מצב מוקד
- `error` - מצב שגיאה
- `success` - מצב הצלחה
- `disabled` - מצב מבוטל
- `loading` - מצב טעינה

#### תכונות מיוחדות:
- תמיכה באייקונים
- הודעות שגיאה והצלחה
- ספירת תווים (textarea)
- חיפוש עם כפתור

#### סינטקס בסיסי:
```html
<div class="space-y-2">
  <label for="basic-input" class="text-sm font-medium text-text-primary">שם מלא</label>
  <input 
    type="text" 
    id="basic-input" 
    placeholder="הכנס את השם המלא שלך"
    class="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  />
</div>
```

---

### 3. בחירה (Select)
**קובץ**: `components/select.html`  
**תיאור**: רכיבי בחירה עם תמיכה בקבוצות ובחירה מרובה

#### סוגי בחירה:
- `basic` - בחירה בסיסית
- `with-icon` - בחירה עם אייקון
- `multiple` - בחירה מרובה
- `with-groups` - בחירה עם קבוצות
- `custom-dropdown` - בחירה מותאמת אישית

#### גדלים:
- `sm` - קטן (h-8)
- `default` - רגיל (h-10)
- `lg` - גדול (h-12)

#### מצבים:
- `normal` - מצב רגיל
- `focus` - מצב מוקד
- `error` - מצב שגיאה
- `success` - מצב הצלחה
- `disabled` - מצב מבוטל
- `loading` - מצב טעינה

#### תכונות מיוחדות:
- בחירה מרובה עם תגיות
- קבוצות אפשרויות
- בחירה מותאמת אישית

#### סינטקס בסיסי:
```html
<div class="space-y-2">
  <label for="basic-select" class="text-sm font-medium text-text-primary">בחר אפשרות</label>
  <select 
    id="basic-select" 
    class="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <option value="">בחר אפשרות...</option>
    <option value="option1">אפשרות 1</option>
    <option value="option2">אפשרות 2</option>
  </select>
</div>
```

---

### 4. תגיות (Badges)
**קובץ**: `components/badge.html`  
**תיאור**: רכיב תגיות עם וריאציות צבע וגדלים שונים

#### וריאציות:
- `default` - תגית ברירת מחדל (primary)
- `secondary` - תגית משנית
- `outline` - תגית עם מסגרת
- `destructive` - תגית הרסנית
- `success` - תגית הצלחה
- `warning` - תגית אזהרה
- `info` - תגית מידע

#### גדלים:
- `xs` - קטן מאוד (text-[10px])
- `sm` - קטן (text-xs)
- `default` - רגיל (text-xs)
- `lg` - גדול (text-sm)

#### תכונות מיוחדות:
- תגיות עם אייקונים
- תגיות עם כפתור סגירה
- תגיות סטטוס עם נקודות
- תגיות טעינה

#### סינטקס בסיסי:
```html
<span class="inline-flex items-center rounded-md border border-transparent bg-primary px-2.5 py-0.5 text-xs font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
  ברירת מחדל
</span>
```

---

### 5. כרטיסים (Cards)
**קובץ**: `components/card.html`  
**תיאור**: רכיב כרטיסים עם וריאציות שונות ותכונות מתקדמות

#### וריאציות:
- `basic` - כרטיס בסיסי
- `with-footer` - כרטיס עם כותרת תחתונה
- `elevated` - כרטיס מוגבה
- `outlined` - כרטיס עם מסגרת
- `filled` - כרטיס מלא
- `interactive` - כרטיס אינטראקטיבי

#### גדלים:
- `sm` - קטן (max-w-sm)
- `default` - רגיל (max-w-md)
- `lg` - גדול (max-w-lg)

#### תכונות מיוחדות:
- כרטיסים עם תמונות
- כרטיסי סטטיסטיקה
- כרטיסי תכונות
- כרטיסים אינטראקטיביים

#### סינטקס בסיסי:
```html
<div class="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
  <div class="flex flex-col space-y-1.5 p-6">
    <h3 class="text-2xl font-semibold leading-none tracking-tight text-text-primary">
      כותרת הכרטיס
    </h3>
    <p class="text-sm text-text-muted">
      תיאור קצר של הכרטיס
    </p>
  </div>
  <div class="p-6 pt-0">
    <p class="text-sm text-text-secondary">
      תוכן הכרטיס
    </p>
  </div>
</div>
```

---

### 6. טבלאות נתונים (DataTable)
**קובץ**: `components/datatable.html`  
**תיאור**: רכיב טבלאות נתונים עם תכונות מתקדמות

### 7. תצוגה מקדימה ליד (Lead Preview)
**קובץ**: `components/lead-preview.html`  
**תיאור**: רכיב תצוגה מקדימה ללידים עם מידע מפורט

#### וריאציות:
- `basic` - תצוגה מקדימה בסיסית
- `compact` - תצוגה מקדימה קומפקטית
- `loading` - מצב טעינה
- `error` - מצב שגיאה

#### תכונות:
- תצוגת מידע מפורט על הליד
- סטטוס עם אינדיקטור ויזואלי
- תגיות קטגוריות
- כפתורי פעולה (צפייה, עריכה, מחיקה)
- תמיכה במובייל ורספונסיביות

#### סינטקס בסיסי:
```html
<div class="rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
  <div class="flex items-start gap-4">
    <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
      <span class="text-white text-lg font-medium">י</span>
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between mb-2">
        <div>
          <h3 class="font-semibold text-text-primary text-lg">יוסי כהן</h3>
          <p class="text-sm text-text-muted">מנהל פרויקטים</p>
        </div>
        <span class="inline-flex items-center gap-1 rounded-md border border-transparent bg-success px-2.5 py-0.5 text-xs font-semibold text-white">
          <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
          איכותי
        </span>
      </div>
      <!-- תוכן נוסף -->
    </div>
  </div>
</div>
```

---

### 8. טבלאות נתונים (DataTable)
**קובץ**: `components/datatable.html`  
**תיאור**: רכיב טבלאות נתונים עם תכונות מתקדמות

#### תכונות:
- `basic` - טבלה בסיסית
- `with-search` - טבלה עם חיפוש
- `with-filters` - טבלה עם סינונים
- `responsive` - טבלה רספונסיבית
- `with-pagination` - טבלה עם עימוד
- `empty-state` - מצב ריק

#### תכונות מתקדמות:
- מיון עמודות
- בחירה מרובה
- פעולות על שורות
- מצב מובייל (כרטיסים)
- עימוד נתונים

#### סינטקס בסיסי:
```html
<div class="w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm">
  <div class="overflow-x-auto">
    <table class="w-full caption-bottom text-sm">
      <thead class="[&_tr]:border-b">
        <tr class="border-b border-border bg-muted/50">
          <th class="h-12 px-4 text-right align-middle font-medium text-text-muted">
            שם
          </th>
          <th class="h-12 px-4 text-right align-middle font-medium text-text-muted">
            אימייל
          </th>
        </tr>
      </thead>
      <tbody class="[&_tr:last-child]:border-0">
        <tr class="border-b border-border transition-colors hover:bg-muted/50">
          <td class="p-4 align-middle font-medium text-text-primary">
            יוסי כהן
          </td>
          <td class="p-4 align-middle text-text-secondary">
            yossi@example.com
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## דפוסי שימוש

### שילוב רכיבים
```html
<!-- כרטיס עם כפתור ושדה קלט -->
<div class="rounded-lg border border-border bg-card p-6 shadow-sm">
  <h3 class="text-lg font-semibold text-text-primary mb-4">כותרת</h3>
  <div class="space-y-4">
    <input class="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm..." />
    <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium... bg-primary text-white">
      שמור
    </button>
  </div>
</div>
```

### טבלה עם סינונים
```html
<div class="space-y-4">
  <div class="flex gap-2">
    <input type="text" placeholder="חיפוש..." class="flex h-10 w-full rounded-lg border border-border..." />
    <select class="flex h-10 rounded-lg border border-border...">
      <option>כל הסטטוסים</option>
    </select>
  </div>
  <!-- טבלה -->
</div>
```

## כללי שימוש

### 1. שימוש בטוקנים
- השתמש רק במשתני CSS המוגדרים ב-`_tokens.css`
- אל תשתמש בצבעי hex קשיחים
- השתמש ב-Tailwind classes עם הטוקנים

### 2. רספונסיביות
- כל רכיב חייב לעבוד במובייל
- השתמש ב-Grid ו-Flexbox
- בדוק בכל הגדלים (sm, md, lg)

### 3. נגישות
- הוסף `aria-labels` מתאימים
- תמוך ב-keyboard navigation
- ודא ניגודיות צבעים נכונה

### 4. RTL
- כל הרכיבים תומכים ב-RTL
- השתמש ב-`text-right` ו-`mr-*` במקום `text-left` ו-`ml-*`
- בדוק שהעיצוב עובד בעברית

## עדכונים ותחזוקה

### הוספת רכיב חדש:
1. צור קובץ HTML חדש ב-`components/`
2. הוסף את הרכיב לרשימה זו
3. עדכן את `index.html`
4. עדכן את `usage-guide.md`

### שינוי רכיב קיים:
1. עדכן את הקובץ ב-`components/`
2. עדכן את התיעוד כאן
3. בדוק שכל המסכים עדיין עובדים

---

**עדכון אחרון**: 15 במרץ 2024  
**גרסה**: 1.0  
**מחבר**: צוות העיצוב Hoogi
