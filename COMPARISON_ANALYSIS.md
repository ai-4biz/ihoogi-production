# 🔍 ניתוח השוואה - לינק עובד vs לא עובד

## הלינק שעובד:
```
https://ai-4biz.netlify.app/q/d_AWWTKYoRHAPB?src=instagram
```

**מאפיינים:**
- ✅ Domain: `ai-4biz.netlify.app` (Staging)
- ✅ Supabase: `beokpwiubwfaaazyyukp.supabase.co`
- ✅ Token: `d_AWWTKYoRHAPB`
- ✅ Parameter: `src=instagram`
- ✅ עובד!

## הלינק שלא עובד:
```
https://ihoogi.com/q/d_sxSu7bei4hNO?src=form
```

**מאפיינים:**
- ❌ Domain: `ihoogi.com` (Production)
- ❌ Supabase: `lcazbaggfdejukjgkpeu.supabase.co`
- ❌ Token: `d_sxSu7bei4hNO`
- ❌ Parameter: `src=form`
- ❌ לא עובד - "Not Found"

## הבעיה האמיתית:

**שני Supabase Projects שונים:**
1. **Staging**: `beokpwiubwfaaazyyukp` - יש distribution ✅
2. **Production**: `lcazbaggfdejukjgkpeu` - אין distribution ❌

## זיהוי אוטומטי של מקור:

המערכת כבר מזהה את המקור אוטומטית דרך `ReferralTrackingService`:

1. **בדיקת `src` parameter** - `?src=instagram` → `instagram`
2. **בדיקת `utm_source` parameter** - `?utm_source=facebook` → `facebook`
3. **בדיקת `document.referrer`** - אם הגיע מ-Instagram → `instagram`

**השירות כבר קיים ופועל!** הוא מזהה:
- Facebook, Instagram, LinkedIn, Twitter, YouTube, TikTok, WhatsApp, Telegram
- Google, Bing, Yahoo (חיפוש)
- Direct (ללא referrer)
- Referral (אתרים אחרים)

## מה צריך לעשות:

### 1. בדוק ב-Production Supabase:
הרץ את `supabase/CHECK_DISTRIBUTION_ONLY.sql` ב-Production DB

### 2. אם Distribution לא קיים:
צריך ליצור אותו ב-Production או להעתיק מ-Staging

### 3. השווה בין Staging ל-Production:
הרץ את `supabase/CHECK_WORKING_TOKEN.sql` ב-Staging ו-`CHECK_DISTRIBUTION_ONLY.sql` ב-Production

