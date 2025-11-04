# 🔧 תיקון Netlify Build - פתרון מלא

## הבעיה:

Netlify מנסה להריץ `npx ng build --configuration=production` מהשורש של הפרויקט, אבל:
- אין `package.json` ב-root
- אין `@angular/cli` ב-root
- האפליקציה Angular נמצאת ב-`ng/`

## הפתרון:

יצרתי 2 קבצים:

### 1. `netlify.toml` (ב-root)
```toml
[build]
  base = "ng"
  command = "npm install && npm run build -- --configuration=production"
  publish = "dist/ng/browser"

[build.environment]
  NODE_VERSION = "20"
  NODE_ENV = "production"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**מה זה עושה:**
- `base = "ng"` - אומר ל-Netlify שהפרויקט נמצא ב-`ng/`
- `command` - מתקין dependencies ואז מריץ build
- `publish` - מפרסם את התיקייה הנכונה
- `redirects` - מבטיח SPA routing עובד

### 2. `package.json` (ב-root)
```json
{
  "name": "ihoogi-production",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "cd ng && npm install && npm run build -- --configuration=production",
    "build:staging": "cd ng && npm install && npm run build -- --configuration=staging"
  },
  "description": "ihoogi production application"
}
```

**אופציה נוספת** - אם Netlify לא קורא את ה-`netlify.toml`:
- השתמש ב-Netlify Dashboard → Site Settings → Build & deploy:
  - **Base directory:** `ng`
  - **Build command:** `npm install && npm run build -- --configuration=production`
  - **Publish directory:** `dist/ng/browser`

## מה לעשות עכשיו:

1. **Push ל-GitHub:**
   ```bash
   git add netlify.toml package.json
   git commit -m "fix: Add Netlify configuration for Angular subdirectory"
   git push origin main
   ```

2. **Netlify יבנה מחדש אוטומטית**

3. **אם זה עדיין לא עובד:**
   - פתח Netlify Dashboard
   - Site Settings → Build & deploy
   - ודא שההגדרות תואמות ל-`netlify.toml`

## בדיקה מקומית:

אפשר לבדוק שהבנייה עובדת:
```bash
cd ng
npm install
npm run build -- --configuration=production
```

הקוד נבנה בהצלחה ✅

