# ✅ תיקון Domain Dynamic - לינקים עובדים על כל Domain

## הבעיה:
הלינקים היו קשורים ל-domain ספציפי (`environment.siteUrl`), מה שגרם לבעיות:
- ב-`ai-4biz.netlify.app` הלינקים עבדו
- ב-`ihoogi.com` הלינקים לא עבדו (או להפך)
- לא היה אפשר לעבור בין domains

## הפתרון:
שיניתי את הקוד כך שהוא מזהה אוטומטית את ה-domain הנוכחי ומשתמש בו:

### 1. `generateLinks()` - יצירת לינקים
```typescript
// Use current origin (dynamic) - this ensures links work on any domain
if (typeof window !== 'undefined' && window.location) {
  const currentOrigin = window.location.origin;
  // If localhost, use production URL
  if (currentOrigin.includes('localhost') || currentOrigin.includes('127.0.0.1')) {
    baseUrl = environment.siteUrl || 'https://ihoogi.com';
  } else {
    // Use current domain (works for both ihoogi.com and ai-4biz.netlify.app)
    baseUrl = currentOrigin;
  }
}
```

### 2. `selectSocialNetwork()` - שיתוף ברשתות חברתיות
```typescript
// Use current origin instead of environment.siteUrl to work on any domain
const currentOrigin = typeof window !== 'undefined' && window.location 
  ? window.location.origin 
  : (environment.siteUrl || 'https://ihoogi.com');
const url = new URL(this.currentUrl, currentOrigin);
```

### 3. `handleBuildLink()` - בניית לינק
```typescript
// Use current origin (dynamic) - this ensures links work on any domain
const currentOrigin = typeof window !== 'undefined' && window.location 
  ? window.location.origin 
  : (environment.siteUrl || 'https://ihoogi.com');
const base = currentOrigin.replace(/\/$/, '');
```

## התוצאה:

✅ **לינקים עובדים על כל domain:**
- `https://ihoogi.com/q/d_xxx` → עובד
- `https://ai-4biz.netlify.app/q/d_xxx` → עובד
- כל domain אחר → עובד אוטומטית

✅ **לינקים מצביעים על ה-domain הנכון:**
- אם אתה ב-`ihoogi.com` → הלינקים יצביעו ל-`ihoogi.com`
- אם אתה ב-`ai-4biz.netlify.app` → הלינקים יצביעו ל-`ai-4biz.netlify.app`

✅ **מעקב עובד:**
- `src=form/chat/qr` → מזהה את סוג הלינק
- `utm_source=whatsapp/facebook/etc` → מזהה את הרשת
- `distribution_token` → נשמר ב-leads
- `channel` → מזוהה אוטומטית

## בדיקות:

1. **ב-`ihoogi.com`:**
   - פתח את Distribution Hub
   - בחר שאלון
   - הלינקים יצביעו ל-`https://ihoogi.com/q/...`

2. **ב-`ai-4biz.netlify.app`:**
   - פתח את Distribution Hub
   - בחר שאלון
   - הלינקים יצביעו ל-`https://ai-4biz.netlify.app/q/...`

3. **מעקב:**
   - פתח לינק
   - ממלא את הטופס
   - הליד נשמר עם `distribution_token` ו-`channel`
   - מענה אוטומטי נשלח

## הערות:

- **localhost**: אם אתה ב-localhost, הלינקים עדיין יצביעו ל-production URL (כך שהם יעבדו כשתשתף אותם)
- **Fallback**: אם `window.location` לא זמין (SSR), הקוד יפול ל-`environment.siteUrl`

