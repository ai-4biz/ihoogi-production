# ✅ זיהוי אוטומטי של מקור - כבר קיים ועובד!

## המערכת כבר מזהה את המקור אוטומטית!

הלינק **לא צריך** להכיל `?src=instagram` - המערכת מזהה את זה אוטומטית דרך:

### 1. **URL Parameters** (אם יש)
- `?src=instagram` → מזהה כ-`instagram`
- `?utm_source=facebook` → מזהה כ-`facebook`

### 2. **HTTP Referrer** (אוטומטי - בלי הגדרה!)
- אם הגיע מ-Instagram → מזהה כ-`instagram`
- אם הגיע מ-Facebook → מזהה כ-`facebook`
- אם הגיע מ-WhatsApp → מזהה כ-`whatsapp`
- אם הגיע מ-Google → מזהה כ-`google`
- אם הגיע ישירות → מזהה כ-`direct`

### 3. **השירות שכבר קיים:**
```typescript
ReferralTrackingService.detectChannel()
```

**מזהה אוטומטית:**
- ✅ Facebook, Instagram, LinkedIn, Twitter/X
- ✅ YouTube, TikTok, Pinterest, Reddit
- ✅ WhatsApp, Telegram
- ✅ Google, Bing, Yahoo (חיפוש)
- ✅ Direct (ללא referrer)
- ✅ Referral (אתרים אחרים)

### 4. **איך זה נשמר:**
כשמשתמש ממלא טופס, ה-channel נשמר אוטומטית ב-`leads` table:
```typescript
// questionnaire-live.ts - שורה 78
this.detectedChannel = this.referralTracking.detectChannel();

// שורה 415 / 434
channel: this.detectedChannel
```

## דוגמאות:

### דוגמה 1: לינק בלי פרמטרים
```
https://ihoogi.com/q/d_sxSu7bei4hNO
```
- אם הגיע מ-Instagram → `channel = 'instagram'` ✅
- אם הגיע מ-Facebook → `channel = 'facebook'` ✅
- אם הגיע ישירות → `channel = 'direct'` ✅

### דוגמה 2: לינק עם פרמטר
```
https://ihoogi.com/q/d_sxSu7bei4hNO?src=whatsapp
```
- `channel = 'whatsapp'` ✅ (לוקח מה-`src` parameter)

### דוגמה 3: לינק עם utm_source
```
https://ihoogi.com/q/d_sxSu7bei4hNO?utm_source=instagram
```
- `channel = 'instagram'` ✅ (לוקח מה-`utm_source`)

## סדר עדיפויות:

1. **`src` parameter** (עדיפות ראשונה)
2. **`utm_source` parameter** (עדיפות שנייה)
3. **`document.referrer`** (עדיפות שלישית - אוטומטי!)

## הבעיה האמיתית:

**הזיהוי האוטומטי כבר עובד!** הבעיה היא רק שה-distribution token לא קיים ב-Production Supabase.

**הרץ את `supabase/CHECK_ONLY.sql` כדי לבדוק.**

