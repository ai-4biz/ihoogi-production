# 🔧 תיקון שגיאת Build ב-Netlify

## 🚨 הבעיה
Build נכשל בשלב "Building" - צריך לראות את הלוגים המדויקים.

## 📋 שלבים לתיקון

### שלב 1: צפה בלוגים המדויקים

**ב-Netlify Dashboard:**
1. לחץ על ה-deploy שנכשל (`main@d02bd45`)
2. גלול למטה ל-**"Deploy log"**
3. חפש את השגיאה (לרוב בסוף הלוגים)
4. העתק את השגיאה המדויקת

**או:**
- לחץ על הכפתור **"Why did it fail?"** (כפתור אדום עם אייקון AI)
- זה יעזור לזהות את הבעיה

---

## 🔍 בעיות נפוצות ופתרונות

### בעיה 1: "Module not found" או "Cannot find module"

**פתרון:**
- ודא ש-`npm install` רץ לפני `npm run build`
- Build command צריך להיות: `cd ng && npm install && npm run build`

### בעיה 2: "Publish directory not found"

**פתרון:**
- בדוק שה-**Publish directory** הוא: `ng/dist/ng/browser`
- או: `dist/ng/browser` (אם Base directory הוא `ng`)

### בעיה 3: "Build script returned non-zero exit code: 2"

**פתרון:**
- זה אומר שה-build command נכשל
- בדוק את הלוגים - מה השגיאה המדויקת?
- יכול להיות שגיאת SASS, TypeScript, או dependency

### בעיה 4: "Command not found: ng"

**פתרון:**
- ודא ש-`npm install` רץ לפני `ng build`
- או השתמש: `npx ng build` במקום `ng build`

---

## ✅ הגדרות נכונות (וודא שהן מוגדרות כך)

**Site settings → Build & deploy → Build settings:**

```
Base directory: /
Build command: cd ng && npm install && npm run build
Publish directory: ng/dist/ng/browser
```

**או:**

```
Base directory: ng
Build command: npm install && npm run build
Publish directory: dist/ng/browser
```

---

## 🔧 תיקון מהיר

אם אתה לא רוצה לראות את הלוגים, נסה:

1. **Deploy settings → Clear build cache**
2. **Trigger deploy** → **"Clear cache and deploy site"**
3. נסה שוב

---

## 📝 מה צריך מהלוגים

**שלח לי:**
1. השגיאה המדויקת מהלוגים (השורות האחרונות)
2. מה ה-Build command שמוגדר?
3. מה ה-Publish directory שמוגדר?

אז אוכל לתקן את הבעיה המדויקת!

---

**או נסה:**
לחץ על הכפתור **"Why did it fail?"** ב-Netlify - הוא יכול לזהות את הבעיה אוטומטית.


