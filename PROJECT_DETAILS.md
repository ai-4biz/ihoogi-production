# 📋 נתוני הפרויקט - Netlify Configuration

## 1. תיקיית השורש של הפרויקט ב-GitHub

**Repository URL:**
```
https://github.com/ai-4biz/ihoogi-production.git
```

**תיקיית שורש מקומית:**
```
C:/dev/production/ihoogi-production-main
```

## 2. קובץ angular.json

**מיקום:**
```
ng/angular.json
```

**תוכן רלוונטי:**
- **Project name:** `ng`
- **Project type:** `application`
- **Builder:** `@angular/build:application`
- **Source root:** `src`
- **Output:** לא מוגדר ב-`angular.json` (שימוש בברירת מחדל של Angular)

**Angular 20 משתמש ב-builder החדש** (`@angular/build:application`) שלא מצריך `outputPath` - הוא יוצר אוטומטית:
- `dist/<project-name>/browser` - הקבצים הסטטיים
- `dist/<project-name>/server` - לשרת (אם יש)

## 3. תיקיית dist אחרי build

**מיקום מלא:**
```
ng/dist/ng/browser
```

**מבנה:**
```
ng/
└── dist/
    └── ng/
        ├── browser/          ← זה מה שצריך לפרסם ב-Netlify
        │   ├── index.html
        │   ├── main-*.js
        │   ├── styles-*.css
        │   └── ...
        ├── 3rdpartylicenses.txt
        └── prerendered-routes.json
```

**Output location (כפי שמוצג ב-build):**
```
Output location: C:\dev\production\ihoogi-production-main\ng\dist\ng
```

**תיקיית הפרסום ל-Netlify:**
```
dist/ng/browser
```

## 4. הגדרות Netlify הנכונות

**בהתבסס על הנתונים לעיל:**

### ב-Netlify Dashboard:
- **Base directory:** `ng`
- **Build command:** `npm install && npm run build -- --configuration=production`
- **Publish directory:** `dist/ng/browser`

### ב-`netlify.toml` (כבר קיים):
```toml
[build]
  base = "ng"
  command = "npm install && npm run build -- --configuration=production"
  publish = "dist/ng/browser"
```

## סיכום:

✅ **Repository:** `https://github.com/ai-4biz/ihoogi-production.git`
✅ **Angular project:** `ng/`
✅ **Build output:** `ng/dist/ng/browser`
✅ **Netlify publish:** `dist/ng/browser` (יחסית ל-base directory `ng`)

