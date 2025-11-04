# ✅ הגדרות Netlify הנכונות - Production

## 🔧 הגדרות Build ב-Netlify Dashboard

### 1. Build Settings (Build & deploy → Build settings)

**Base directory:** `ng`

**Build command:**
```bash
npm install && npx ng build --configuration=production
```

**Publish directory:**
```
dist/ng/browser
```

---

### 2. Production Branch

**Branch to deploy:** `main`

**Production branch:** `main`

---

### 3. Environment Variables (Build & deploy → Environment)

**Node.js version:**
```
NODE_VERSION=20
```

**Production environment:**
```
NODE_ENV=production
```

---

### 4. Deploy Settings

**Auto-publish:** ✅ **ON** (מופעל)

**Branch deploys:**
- `main` → **Production deploy**

---

## 📝 הסבר

**למה ההגדרות האלה:**

1. **Base directory = `ng`:**
   - הפרויקט Angular נמצא בתיקייה `ng/`
   - Netlify צריך לדעת להתחיל מהתיקייה הזו

2. **Build command = `npm install && npx ng build --configuration=production`:**
   - `npm install` - מתקין את כל ה-dependencies
   - `npx ng build --configuration=production` - בונה את האפליקציה עם קונפיגורציית production
   - משתמש ב-`environment.prod.ts`

3. **Publish directory = `dist/ng/browser`:**
   - אחרי הבנייה, Angular 20 יוצר את הקבצים ב-`dist/ng/browser/`
   - זה התיקייה שהכילה את `index.html` ותיקיית `assets/`

---

## ✅ בדיקה מקומית

הבנייה המקומית הצליחה:
```
Output location: C:\dev\production\ihoogi-production-main\ng\dist\ng
```

זה אומר שהבנייה עובדת, והתיקייה הנכונה היא `dist/ng/browser` (או `dist/ng` אם אין `browser`).

---

## 🔍 איך לבדוק מה התיקייה הנכונה?

1. **בנה מקומית:**
   ```bash
   cd ng
   npm install
   npx ng build --configuration=production
   ```

2. **בדוק את התיקייה:**
   ```bash
   # Windows
   dir ng\dist\ng\browser
   # או
   dir ng\dist\ng
   
   # Linux/Mac
   ls -la ng/dist/ng/browser
   # או
   ls -la ng/dist/ng
   ```

3. **אם יש `index.html` ב-`ng/dist/ng/browser/` → השתמש ב-`dist/ng/browser`**
4. **אם יש `index.html` ב-`ng/dist/ng/` → השתמש ב-`dist/ng`**

---

## 🚀 מה לעשות עכשיו?

1. **לך ל-Netlify Dashboard:**
   - Site settings → Build & deploy → Build settings

2. **עדכן את ההגדרות:**
   - Base directory: `ng`
   - Build command: `npm install && npx ng build --configuration=production`
   - Publish directory: `dist/ng/browser` (או `dist/ng` אם אין `browser`)

3. **שמור והפעל Deploy:**
   - לחץ **Save**
   - לך ל-Deploys → **Trigger deploy** → **Deploy site**

4. **חכה שהבנייה תסתיים**

5. **בדוק את הלינק:**
   - הלינק יהיה: `https://[your-site].netlify.app/`
   - או: `https://ihoogi.com/` (אם יש custom domain)

---

## ⚠️ אם עדיין לא עובד

1. **בדוק את ה-Deploy Logs:**
   - לך ל-Deploys → לחץ על ה-deploy האחרון
   - גלול למטה ל-"Deploy log"
   - חפש שגיאות

2. **בדוק את תיקיית הפלט:**
   - אם יש שגיאה "Publish directory not found"
   - בדוק מה התיקייה בפועל אחרי הבנייה
   - עדכן את ה-Publish directory בהתאם

3. **נקה Cache:**
   - Deploy settings → Clear build cache
   - Trigger deploy מחדש

---

## 📋 סיכום - מה צריך לעבוד

✅ **הבנייה המקומית עובדת** - זה אומר שהקוד תקין
✅ **ההגדרות צריכות להיות:**
   - Base: `ng`
   - Build: `npm install && npx ng build --configuration=production`
   - Publish: `dist/ng/browser` (או `dist/ng`)

**אם ההגדרות נכונות ב-Netlify, זה אמור לעבוד ברשת!**

הבעיות בלוקאל הן בדרך כלל בגלל:
- סביבת פיתוח (development)
- Cache מקומי
- Dependencies שלא מעודכנים

ב-Netlify עם ההגדרות הנכונות, זה אמור לעבוד כי:
- ✅ הבנייה עובדת מקומית
- ✅ Netlify יתקין dependencies מחדש
- ✅ Netlify יבנה עם production configuration
- ✅ Netlify ישתמש ב-`environment.prod.ts`

---

**הלינק יהיה זמין אחרי שהבנייה ב-Netlify תסתיים בהצלחה!**

