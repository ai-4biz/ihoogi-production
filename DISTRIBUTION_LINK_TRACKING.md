# מערכת מעקב לינקים - Distribution Hub

## ✅ איך המערכת עובדת

### 1. **יצירת לינקים בסיסיים**
כאשר בוחרים שאלון ותבנית, המערכת יוצרת 3 לינקים:
- `formLink`: `/q/{token}?src=form` - לינק לטופס
- `chatLink`: `/q/{token}/chat?src=chat` - לינק לצ'אט
- `qrLink`: `/q/{token}/qr?src=qr` - לינק ל-QR

### 2. **שיתוף ברשתות חברתיות**
כאשר משתפים לינק ברשת חברתית (WhatsApp, Facebook, וכו'), המערכת מוסיפה:
- `src=form/chat/qr` - סוג הלינק (נשמר מהלינק המקורי)
- `utm_source={network}` - הרשת בה שיתפו (facebook, whatsapp, instagram, וכו')

**דוגמא:**
- לינק מקורי: `https://ihoogi.com/q/d_ABC123?src=form`
- אחרי שיתוף ב-Facebook: `https://ihoogi.com/q/d_ABC123?src=form&utm_source=facebook`

### 3. **זיהוי המקור ב-QuestionnaireLive**
כאשר משתמש נכנס ללינק, `ReferralTrackingService` מזהה את המקור:
1. בודק `src` parameter
2. בודק `utm_source` parameter
3. בודק `document.referrer` (הדף שממנו הגיע)

### 4. **שמירת המקור ב-Leads**
כאשר משתמש ממלא שאלון, המערכת שומרת:
- `distribution_token` - ה-token של ההפצה
- `channel` - המקור (facebook, whatsapp, instagram, direct, וכו')

זה מאפשר:
- לראות מאיפה הגיע כל ליד
- לנתח איזה רשתות הכי יעילות
- לבדוק כמה לידים הגיעו מכל רשת

## 📊 רשתות נתמכות

המערכת מזהה ומעקבת אחרי:
- **WhatsApp** - `whatsapp`
- **Facebook** - `facebook`
- **Instagram** - `instagram`
- **LinkedIn** - `linkedin`
- **Telegram** - `telegram`
- **YouTube** - `youtube`
- **Email** - `email`
- **SMS** - `sms`
- **Website** - `website`
- **Direct** - `direct` (לינק ישיר ללא מקור)

## 🔍 איך לבדוק

1. **צור לינק** - בחר שאלון ותבנית
2. **שתף ברשת** - לחץ על כפתור שיתוף (WhatsApp, Facebook, וכו')
3. **העתק את הלינק** - הלינק יכלול `utm_source={network}`
4. **פתח את הלינק** - המערכת תזהה את המקור
5. **מלא שאלון** - המקור יישמר ב-leads table

## ✅ סיכום

הלינקים כוללים מעקב מלא:
- ✅ `src` - סוג הלינק (form/chat/qr)
- ✅ `utm_source` - הרשת בה שיתפו
- ✅ שמירה ב-DB - כל ליד נשמר עם channel
- ✅ ניתוח - אפשר לראות מאיפה הגיע כל ליד

