# 🔧 תיקון Netlify - הלינק לא עובד ב-ihoogi.com

## הבעיה:

הלינק `https://ihoogi.com/q/d_BPpcan8aVwr3?src=form` מחזיר "Not Found"

אבל אותו לינק אמור לעבוד ב-`ai-4biz.netlify.app` (staging).

## הסיבה:

**Netlify לא מוגדר נכון ל-SPA routing** - Angular צריך `redirects` כדי שכל הנתיבים יחזרו ל-`index.html`.

## הפתרון:

### שלב 1: וודא שה-`netlify.toml` קיים ב-root של הפרויקט

הקובץ צריך להיות ב-`ng/netlify.toml` (כבר קיים ✅)

### שלב 2: וודא שההגדרות ב-Netlify Dashboard נכונות

**ב-Netlify Dashboard → Site Settings → Build & deploy:**

1. **Base directory:** `ng`
2. **Build command:** `npm install && npx ng build --configuration=production`
3. **Publish directory:** `dist/ng/browser`

### שלב 3: וודא שיש redirects

ה-`netlify.toml` כבר מכיל:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

זה אמור לעבוד! אבל אם לא, נסה:

### שלב 4: בדוק אם יש קובץ `_redirects` ב-`public/`

אם יש, צריך להוסיף:
```
/* /index.html 200
```

### שלב 5: בדוק את ה-Deployment

1. פתח Netlify Dashboard
2. בדוק את ה-Deploy logs
3. בדוק אם ה-build הצליח
4. בדוק אם ה-`netlify.toml` נקרא

## בדיקה:

### בדוק ב-Staging:
```
https://ai-4biz.netlify.app/q/d_BPpcan8aVwr3?src=form
```

אם זה עובד ב-staging אבל לא ב-production, הבעיה היא:
- הגדרות Netlify שונות בין staging ל-production
- או שה-domain לא מחובר נכון

## פתרון מיידי:

### אופציה 1: העתק את ה-`netlify.toml` ל-root
אם Netlify לא קורא את ה-`netlify.toml` מתוך `ng/`, צריך להעתיק אותו ל-root של הפרויקט.

### אופציה 2: הוסף `_redirects` ב-`public/`
צור קובץ `ng/public/_redirects`:
```
/* /index.html 200
```

### אופציה 3: הגדר ב-Netlify Dashboard
1. פתח Netlify Dashboard
2. Site Settings → Build & deploy → Post processing
3. הוסף redirect rule:
   - Source: `/*`
   - Destination: `/index.html`
   - Status: `200`

