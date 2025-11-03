# 🚀 מדריך הגדרת Netlify - Auto Deploy מ-main

## 📋 הגדרות Build ב-Netlify Dashboard

### 1. Build Settings (Build & deploy → Build settings)

**Base directory:** `ng`

**Build command:**
```bash
npm install && npm run build
```

**Publish directory:**
```
ng/dist/ng/browser
```
*או אם לא browser:*
```
ng/dist/ng
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

**אם יש צורך בערכים נוספים:**
```
NODE_ENV=production
```

---

### 4. Deploy Settings

**Auto-publish:** ✅ **ON** (מופעל)

**Branch deploys:**
- `main` → **Production**
- `dev` → Branch deploy (אם רוצים)

**Deploy notifications:** לפי העדפה

---

## 🔧 קובץ netlify.toml (מומלץ)

צור קובץ `netlify.toml` בשורש הפרויקט:

```toml
[build]
  base = "ng"
  command = "npm install && npm run build"
  publish = "ng/dist/ng/browser"

[build.environment]
  NODE_VERSION = "20"
  NODE_ENV = "production"

[[plugins]]
  package = "@netlify/plugin-nextjs"

# Production branch settings
[context.production]
  command = "npm install && npm run build"
  
# Branch deploys
[context.branch-deploy]
  command = "npm install && npm run build"

# Deploy previews
[context.deploy-preview]
  command = "npm install && npm run build"

# Headers for security
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

# Redirect rules (if needed)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 📝 שלבים לביצוע ב-Netlify Dashboard

### שלב 1: הגדר Build Settings

1. לך ל: **Site settings** → **Build & deploy** → **Build settings**
2. לחץ על **Edit settings**
3. הזן:
   - **Base directory:** `ng`
   - **Build command:** `npm install && npm run build`
   - **Publish directory:** `ng/dist/ng/browser` (או `ng/dist/ng`)

### שלב 2: הגדר Branch Deploys

1. לך ל: **Site settings** → **Build & deploy** → **Continuous Deployment**
2. **Production branch:** בחר `main`
3. **Branch deploys:** ✅ הפעל
4. **Deploy contexts:**
   - **Production:** `main`
   - **Deploy previews:** כל branches

### שלב 3: הגדר Environment Variables

1. לך ל: **Site settings** → **Build & deploy** → **Environment**
2. לחץ **Add variable**
3. הוסף:
   - **Key:** `NODE_VERSION`
   - **Value:** `20`
   - **Scopes:** Production, Deploy previews, Branch deploys

### שלב 4: הפעל Auto Publishing

1. לך ל: **Deploys** (בסיידבר השמאלי)
2. בדוק ש- **"Auto publishing"** מופעל
3. וודא ש-`main` מסומן כ-Production branch

---

## 🔍 בדיקה - איך לוודא שהכל עובד

### בדיקה 1: Manual Deploy

1. ב-Netlify Dashboard → **Deploys**
2. לחץ **Trigger deploy** → **Deploy site**
3. בחר branch: `main`
4. בדוק שהבנייה מצליחה

### בדיקה 2: Test Commit

1. צור commit קטן ב-`main`
2. Push ל-GitHub
3. בדוק ב-Netlify Dashboard שה-deploy התחיל אוטומטית
4. המתן לסיום ה-build
5. בדוק שה-deploy הושלם בהצלחה

### בדיקה 3: בדוק את האתר

1. אחרי deploy מוצלח, לך לכתובת: `https://ihoogi.com`
2. ודא שהשינויים הופיעו

---

## ⚠️ פתרון בעיות נפוצות

### שגיאה: "Build script returned non-zero exit code: 2"

**פתרון:**
1. בדוק שה-`Base directory` הוא `ng`
2. בדוק שה-`Build command` הוא `npm install && npm run build`
3. בדוק שה-`Publish directory` נכון (`ng/dist/ng/browser`)

### שגיאה: "Module not found"

**פתרון:**
1. ודא ש-`package.json` קיים בתיקייה `ng/`
2. ודא שה-`Build command` כולל `npm install`
3. בדוק שגרסת Node מתאימה

### שגיאה: "Publish directory not found"

**פתרון:**
1. בדוק את ה-`angular.json` - מה ה-`outputPath`?
2. בדוק אחרי build מקומי איפה נוצר התיקייה `dist`
3. עדכן את ה-`Publish directory` בהתאם

---

## 📊 הגדרות מומלצות נוספות

### 1. Custom Headers (אם צריך)

ב-`netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
```

### 2. Redirects (לשיפור SEO)

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. Build Hooks (אם צריך)

אם רוצים להפעיל deploy ידנית:
- Site settings → Build & deploy → Build hooks
- צור build hook חדש

---

## ✅ Checklist - לפני שאתה שולח ל-Production

- [ ] Base directory = `ng`
- [ ] Build command = `npm install && npm run build`
- [ ] Publish directory = `ng/dist/ng/browser` (או לפי ה-output בפועל)
- [ ] Production branch = `main`
- [ ] Auto publishing = ✅ ON
- [ ] Node version = 20
- [ ] קובץ `netlify.toml` נוצר (אופציונלי אבל מומלץ)
- [ ] Build מקומי עובד (`npm run build` בתיקייה `ng/`)
- [ ] Deploy ראשון בוצע בהצלחה

---

## 🎯 סיכום

**ההגדרות הבסיסיות הנדרשות:**

```
Base directory: ng
Build command: npm install && npm run build
Publish directory: ng/dist/ng/browser
Production branch: main
Node version: 20
Auto publishing: ON
```

**קובץ netlify.toml (מומלץ):**
צור קובץ `netlify.toml` בשורש הפרויקט עם התוכן למעלה.

---

**עדכון אחרון:** 2025-11-03

