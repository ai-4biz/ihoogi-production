# 🤖 מדריך להטמעה עם Cursor AI

## 📋 איך להשתמש במדריך זה עם Cursor

Cursor יכול לקרוא את המדריכים ולעזור לך, אבל הוא לא יבצע הכל אוטומטית. תצטרך לבקש ממנו לעשות דברים ספציפיים.

---

## 🎯 גישה מומלצת

### שלב 1: בקש מ-Cursor לקרוא את המדריך

**פרומפט ל-Cursor:**
```
קרא את הקובץ partners-export/IMPLEMENTATION-STEPS.md
והסבר לי מה אני צריך לעשות בשלב 1
```

### שלב 2: בקש מ-Cursor לבצע שלב ספציפי

**פרומפט ל-Cursor:**
```
עקוב אחר המדריך partners-export/IMPLEMENTATION-STEPS.md
ובצע את שלב 1: יצירת הקומפוננטה הראשית

צור את הקומפוננטה partners-management עם:
- TypeScript עם interfaces מ-shared/interfaces
- HTML עם tabs navigation
- שמור על העיצוב מ-DESIGN-GUIDE.md
```

### שלב 3: בקש מ-Cursor לבדוק

**פרומפט ל-Cursor:**
```
בדוק את הקומפוננטה שיצרת לפי המדריך
ודא שהכל תואם ל-DESIGN-GUIDE.md
```

---

## 📝 פרומפטים מוכנים לשימוש

### פרומפט 1: יצירת קומפוננטה ראשית

```
אני רוצה ליצור קומפוננטת Angular בשם partners-management.

עקוב אחר המדריך partners-export/IMPLEMENTATION-STEPS.md שלב 3.

דרישות:
1. צור את הקומפוננטה עם ng generate
2. העתק את ה-interfaces מ-shared/interfaces/partner.interface.ts
3. צור את ה-HTML עם tabs navigation (4 טאבים)
4. השתמש ב-classes מ-DESIGN-GUIDE.md
5. שמור על RTL (dir="rtl")
6. שמור על העיצוב המקורי

אל תמחק שום קוד קיים!
```

### פרומפט 2: יצירת רכיב Partners List

```
אני רוצה ליצור רכיב Angular בשם partners-list.

עקוב אחר המדריך partners-export/IMPLEMENTATION-STEPS.md שלב 4.

דרישות:
1. צור את הקומפוננטה
2. העתק את ה-logic מ-PartnersManagement.tsx שורות 420-607
3. העתק את ה-HTML מ-PartnersManagement.tsx שורות 897-1253
4. התאם ל-Angular syntax (*ngFor, *ngIf, [class])
5. השתמש ב-classes מ-DESIGN-GUIDE.md
6. שמור על RTL

הקוד המקורי נמצא ב: src/pages/PartnersManagement.tsx
```

### פרומפט 3: יצירת רכיב Add Partner Form

```
אני רוצה ליצור רכיב Angular בשם add-partner-form.

עקוב אחר המדריך partners-export/IMPLEMENTATION-STEPS.md שלב 5.

דרישות:
1. צור את הקומפוננטה
2. העתק את ה-formData מ-PartnersManagement.tsx שורות 2204-2372
3. העתק את ה-HTML מ-PartnersManagement.tsx שורות 795-1620
4. התאם ל-Angular Forms (Reactive Forms מומלץ)
5. השתמש ב-classes מ-DESIGN-GUIDE.md
6. שמור על כל 5 הסעיפים של הטופס

הקוד המקורי נמצא ב: src/pages/PartnersManagement.tsx
```

### פרומפט 4: יצירת רכיב Send Form

```
אני רוצה ליצור רכיב Angular בשם send-form.

עקוב אחר המדריך partners-export/IMPLEMENTATION-STEPS.md שלב 6.

דרישות:
1. צור את הקומפוננטה
2. העתק את ה-HTML מ-PartnersManagement.tsx שורות 1624-2200
3. התאם ל-Angular syntax
4. השתמש ב-classes מ-DESIGN-GUIDE.md
5. שמור על RTL

הקוד המקורי נמצא ב: src/pages/PartnersManagement.tsx
```

### פרומפט 5: יצירת Interfaces

```
אני רוצה ליצור interfaces ל-Partners Management.

עקוב אחר המדריך partners-export/IMPLEMENTATION-STEPS.md שלב 2.

דרישות:
1. צור תיקייה shared/interfaces
2. צור קובץ partner.interface.ts
3. העתק את כל ה-interfaces מ-PartnersManagement.tsx שורות 59-132
4. התאם ל-Angular syntax
5. הוסף exports נכונים

הקוד המקורי נמצא ב: src/pages/PartnersManagement.tsx
```

### פרומפט 6: בדיקת עיצוב

```
בדוק את הקומפוננטה שיצרתי והשווה ל-DESIGN-GUIDE.md.

ודא ש:
1. כל ה-colors תואמים
2. כל ה-spacing תואם
3. כל ה-borders תואמים
4. RTL עובד (dir="rtl")
5. Responsive עובד

תקן כל חריגה מהעיצוב המקורי.
```

---

## 🎯 סדר עבודה מומלץ עם Cursor

### יום 1: הכנה ו-Interfaces

1. **בקש מ-Cursor:**
   ```
   קרא את partners-export/IMPLEMENTATION-STEPS.md שלב 2
   וצור את כל ה-interfaces
   ```

2. **בדוק:**
   - [ ] כל ה-interfaces נוצרו
   - [ ] אין שגיאות TypeScript

### יום 2: קומפוננטה ראשית

1. **בקש מ-Cursor:**
   ```
   קרא את partners-export/IMPLEMENTATION-STEPS.md שלב 3
   וצור את הקומפוננטה הראשית partners-management
   ```

2. **בדוק:**
   - [ ] הקומפוננטה נוצרה
   - [ ] Tabs navigation עובד
   - [ ] אין שגיאות

### יום 3: רכיב Partners List

1. **בקש מ-Cursor:**
   ```
   קרא את partners-export/IMPLEMENTATION-STEPS.md שלב 4
   וצור את רכיב partners-list
   ```

2. **בדוק:**
   - [ ] הטבלה נראית
   - [ ] חיפוש עובד
   - [ ] סינון עובד

### יום 4: רכיב Add Partner Form

1. **בקש מ-Cursor:**
   ```
   קרא את partners-export/IMPLEMENTATION-STEPS.md שלב 5
   וצור את רכיב add-partner-form
   ```

2. **בדוק:**
   - [ ] כל 5 הסעיפים נראים
   - [ ] הטופס עובד
   - [ ] העלאת קבצים עובדת

### יום 5: רכיב Send Form + בדיקות

1. **בקש מ-Cursor:**
   ```
   קרא את partners-export/IMPLEMENTATION-STEPS.md שלב 6
   וצור את רכיב send-form
   ```

2. **בדוק הכל:**
   - [ ] כל הרכיבים עובדים
   - [ ] כל הבדיקות מ-שלב 9 עוברות

---

## 💡 טיפים לשימוש עם Cursor

### 1. תן הקשר

**לא טוב:**
```
צור קומפוננטה
```

**טוב:**
```
קרא את המדריך partners-export/IMPLEMENTATION-STEPS.md שלב 3
וצור את הקומפוננטה partners-management לפי המדריך
```

### 2. ציין את הקוד המקורי

**טוב:**
```
העתק את ה-HTML מ-PartnersManagement.tsx שורות 897-1253
```

### 3. ציין את העיצוב

**טוב:**
```
השתמש ב-classes מ-DESIGN-GUIDE.md
ושמור על העיצוב המקורי
```

### 4. בקש בדיקות

**טוב:**
```
בדוק את הקומפוננטה שיצרת
ודא שהכל תואם ל-DESIGN-GUIDE.md
```

---

## ⚠️ מה Cursor לא יכול לעשות אוטומטית

1. **לא יבצע הכל בבת אחת** - תצטרך לבקש שלב אחר שלב
2. **לא יודע מה הקוד המקורי** - תצטרך להפנות אותו לקוד המקורי
3. **לא יודע מה העיצוב** - תצטרך להפנות אותו ל-DESIGN-GUIDE.md
4. **לא יבדוק הכל** - תצטרך לבקש בדיקות ספציפיות

---

## ✅ סיכום

**איך לעבוד עם Cursor:**

1. ✅ פתח את המדריך ב-Cursor
2. ✅ בקש מ-Cursor לקרוא את המדריך
3. ✅ בקש מ-Cursor לבצע שלב ספציפי
4. ✅ בדוק את התוצאה
5. ✅ המשך לשלב הבא

**פרומפט מומלץ להתחלה:**
```
קרא את partners-export/IMPLEMENTATION-STEPS.md
והסבר לי מה אני צריך לעשות בשלב 1
ואז עזור לי לבצע אותו
```

---

**בהצלחה! 🎉**

