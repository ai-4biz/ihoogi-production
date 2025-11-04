# 🔧 אפשרויות Build Command ל-Netlify

## אפשרות 1: עם cd (אם Base directory = `/`)

```
cd ng && npm install && npm run build
```

## אפשרות 2: עם npx (אם ng לא נמצא)

```
cd ng && npm install && npx ng build --configuration=production
```

## אפשרות 3: עם Node version explicit

```
cd ng && npm install && NODE_ENV=production npm run build
```

## אפשרות 4: Full path (אם יש בעיות)

```
cd ng && npm ci && npm run build
```
*`npm ci` יותר מהיר וטוב ל-production*

---

## ✅ מומלץ - Build Command

**להשתמש באפשרות 1:**

```
cd ng && npm install && npm run build
```

**או אם זה לא עובד, נסה:**

```
cd ng && npm ci && npm run build
```

---

## 🔍 איך לדעת איזו אפשרות להשתמש?

1. **נסה את אפשרות 1** קודם
2. אם נכשל - קרא את הלוגים
3. אם השגיאה היא "ng not found" → השתמש באפשרות 2
4. אם השגיאה היא dependency → נסה `npm ci`

---

**עדכון:** 2025-11-03


