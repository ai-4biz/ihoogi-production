# 🔍 דוח בדיקה ממוקדת לכפילויות SMS באנגולר

**תאריך:** 2025-10-30  
**סוג בדיקה:** בדיקה בלבד - ללא שינוי קוד

---

## 📋 סיכום הבדיקה

בדקתי את כל המקומות באפליקציה שיכולים לשלוח SMS:
- ✅ **Frontend (Angular):** לא נמצאו קריאות ישירות ל-send-sms Edge Function
- ⚠️ **Backend (Supabase Edge Functions):** נמצא מנגנון למניעת כפילות, אבל יש פוטנציאל לכפילות במקרים מסוימים

---

## 🔎 1️⃣ קריאות ל-send-sms (Edge Function)

### ✅ תוצאות:
**לא נמצאו קריאות ישירות** מהפרונט (Angular) ל-`send-sms` Edge Function.

**מסקנה:** כל השליחות של SMS מתבצעות דרך השרת (Supabase Edge Functions), לא ישירות מהפרונט.

---

## 🔎 2️⃣ הודעות טקסט קבועות ('תודה שפניתם')

### ✅ תוצאות:
**לא נמצאו** הודעות עם הטקסט 'תודה שפניתם' בקבצי Angular.

**ממצאים נוספים:**
- נמצא הודעה דומה ב-`questionnaire-chat.ts` (שורה 934):
  ```typescript
  'תודה רבה! התשובות שלך נשלחו בהצלחה'
  ```
  אבל זו הודעה הצגה בלבד, לא שליחה בפועל.

---

## 🔎 3️⃣ קריאות fetch הקשורות ל-SMS

### ✅ תוצאות:
**לא נמצאו** קריאות `fetch()` הקשורות לשליחת SMS בפרונט.

**ממצאים:**
- `distribution-hub.component.ts` משתמש ב-`sms:` protocol link בלבד (פתיחת אפליקציית SMS)
- אין קריאות HTTP לשליחת SMS מהפרונט

---

## 🔎 4️⃣ קריאות sendSms עם subscribe

### ✅ תוצאות:
**לא נמצאו** קריאות `sendSms()` עם `subscribe()` בפרונט.

---

## 🔎 5️⃣ הודעות AI עם message

### ⚠️ **ממצא מרכזי - פוטנציאל לכפילות בשרת:**

**מיקום:** `supabase/functions/on-new-lead/index.ts`

**תיאור הבעיה:**

הפונקציה `handleAutomation` עוברת על כל התבניות (templates) הפעילות ויכולה לשלוח SMS:

1. **תבנית מסוג 'personal'** (שורות 203-269):
   - אם תבנית זו מוגדרת עם ערוץ SMS → שולחת SMS (שורה 263-264)
   - הודעת SMS = `template.body` עם החלפת משתנים

2. **תבנית מסוג 'ai'** (שורות 270-432):
   - אם AI מצליח → שולחת SMS עם הודעת AI (שורה 422-423)
   - אם AI נכשל → שולחת SMS עם הודעת fallback (שורה 371-372)

**המנגנון הנוכחי למניעת כפילות:**
```typescript
const sentChannels = new Set<string>();

// Inside loop:
if (sentChannels.has(channel)) {
  console.log("⏭️ [AUTOMATION] Skipping", channel, "- already sent in previous template");
  continue;
}

// After sending:
sentChannels.add('sms');
```

**✅ המנגנון עובד:** אם תבנית אחת כבר שלחה SMS, תבנית שנייה תדלג.

---

## ⚠️ **פוטנציאל לכפילות - תרחישים אפשריים:**

### תרחיש 1: מספר תבניות עם אותו ערוץ SMS
**לא צריך להיות בעיה** - ה-`sentChannels` Set מונע זאת.

### תרחיש 2: כפילות בקריאה לפונקציה
אם `on-new-lead` נקראת פעמיים (למשל בגלל database trigger כפול), תיווצר כפילות.

### תרחיש 3: AI + Personal במקביל
אם יש תבנית 'personal' ותבנית 'ai' ושתיהן מוגדרות לשלוח SMS:
- ✅ התבנית הראשונה תשלח
- ✅ התבנית השנייה תדלג (בגלל `sentChannels.has('sms')`)

**זה תקין!**

---

## 🔍 **בדיקות נוספות שנדרשות:**

### 1. בדיקת Database Triggers
בדוק אם יש trigger כפול ב-Supabase שיכול לקרוא ל-`on-new-lead` פעמיים:

```sql
-- בדוק triggers בטבלת leads
SELECT * FROM pg_trigger WHERE tgname LIKE '%lead%';
```

### 2. בדיקת Logs בזמן אמת
הוסף לוג בתחילת `sendAutomationSMS`:
```typescript
console.log('🔥 SEND_SMS called at:', new Date().toISOString(), 'for:', recipient);
```

ואז בדוק בלוגים של Supabase - אם תראה אותו לוג פעמיים עם אותו recipient, יש כפילות.

### 3. בדיקת Network Tab בדפדפן
פתח DevTools → Network בזמן הגשת שאלון:
- אם רואים 2 בקשות ל-`on-new-lead` → יש כפילות בקריאה
- אם רואים בקשה אחת → הכפילות בפנים (אם בכלל)

---

## 📊 **קבצים שנבדקו:**

### Frontend (Angular):
1. ✅ `ng/src/app/pages/distribution-hub/distribution-hub.component.ts` - רק `sms:` links
2. ✅ `ng/src/app/pages/contact/contact.component.ts` - אין SMS
3. ✅ `ng/src/app/pages/questionnaire-live/questionnaire-live.ts` - אין SMS
4. ✅ `ng/src/app/pages/questionnaire-chat/questionnaire-chat.ts` - אין SMS
5. ✅ `ng/src/app/core/services/automation.service.ts` - SMS לא מיושם בפרונט

### Backend (Supabase):
1. ⚠️ `supabase/functions/on-new-lead/index.ts` - **המקום היחיד ששולח SMS**
   - יש מנגנון למניעת כפילות (`sentChannels` Set)
   - אבל אם הפונקציה נקראת פעמיים → תיווצר כפילות

2. ✅ `supabase/functions/send-sms/index.ts` - פונקציית השליחה עצמה

---

## 💡 **המלצות:**

### אם עדיין יש כפילויות SMS:

1. **בדוק Database Triggers:**
   - וודא שאין trigger כפול על טבלת `leads`

2. **בדוק לוגים של Supabase:**
   - חפש בקונסול של Supabase Edge Functions:
     - `🔥 SEND_SMS called at:` - אם מופיע פעמיים, יש כפילות
     - `⏭️ [AUTOMATION] Skipping sms - already sent` - אם לא מופיע, יש בעיה

3. **הוסף Idempotency Key:**
   - אפשר להוסיף מפתח ייחודי לכל שליחת SMS כדי למנוע כפילויות ברמת השרת:
     ```typescript
     // Generate unique key based on lead.id + timestamp
     const idempotencyKey = `${lead.id}-${Date.now()}`;
     ```

4. **בדוק את ספק ה-SMS:**
   - יכול להיות שהכפילות במישור הספק, לא בקוד שלך

---

## ✅ **סיכום:**

### Frontend (Angular):
✅ **אין בעיית כפילות** - לא נמצאו קריאות SMS מהפרונט

### Backend (Supabase):
⚠️ **יש מנגנון למניעת כפילות** (`sentChannels` Set)  
⚠️ **פוטנציאל לכפילות** אם `on-new-lead` נקראת פעמיים

**המלצה:** בדוק את Database Triggers ואת הלוגים של Supabase כדי לוודא שהפונקציה נקראת פעם אחת בלבד.
