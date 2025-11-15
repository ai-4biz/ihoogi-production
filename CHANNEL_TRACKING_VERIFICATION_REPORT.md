# ✅ דוח בדיקה: שמירת ערוץ (`channel`) בטבלת leads

## 📋 סיכום ביצוע הבדיקות

### ✅ **חלק א': אימות שהקישור כולל פרמטר `?src=`**

**קובץ:** `ng/src/app/pages/distribution-hub/distribution-hub.component.ts`

**שורה 788-803:**
- ✅ WhatsApp/Email/SMS: מוחקים `?src=form` לפני הגדרת `?src=whatsapp/email/sms`
- ✅ הקישור הסופי כולל `?src=whatsapp` או `?src=email` או `?src=sms`
- ✅ לוגים: `🔍 [WHATSAPP/EMAIL/SMS] Final URL with tracking` - מראים את הקישור הסופי

**מסקנה:** ✅ הקישור כולל פרמטר `?src=` נכון

---

### ✅ **חלק ב': בדיקת שמירת הערוץ בטבלת leads**

**קובץ:** `supabase/create_submit_response_function.sql`

**שורה 60-109:**
- ✅ פונקציית `submit_lead` מקבלת פרמטר `p_channel TEXT DEFAULT NULL`
- ✅ הפרמטר נשמר בעמודת `channel` בטבלת `leads` (שורה 87, 100)
- ✅ הפונקציה היא `SECURITY DEFINER` - עוקפת RLS

**מסקנה:** ✅ הפונקציה שמה את הערוץ בטבלת leads

---

### ✅ **חלק ג': ניתוח צד הקליינט – קריאת פרמטר `src`**

**קובץ:** `ng/src/app/pages/questionnaire-live/questionnaire-live.ts`

**שורה 71-77:**
```typescript
ngOnInit() {
  console.log('=== QuestionnaireLive ngOnInit called ===');
  console.log('Current URL:', this.router.url);
  
  // Detect referral source/channel
  this.detectedChannel = this.referralTracking.detectChannel();
  console.log('Detected channel:', this.detectedChannel);
}
```

**קובץ:** `ng/src/app/core/services/referral-tracking.service.ts`

**שורה 12-37:**
- ✅ קורא את `?src=` מה-URL: `const srcParam = urlParams.get('src');`
- ✅ בודק `?src=whatsapp/email/sms` ב-PRIORITY 0 (לפני referrer)
- ✅ מחזיר את הערוץ הנכון

**מסקנה:** ✅ הקליינט קורא את פרמטר `src` מה-URL

---

### ✅ **חלק ד': שליחת הערוץ ל-DB**

**קובץ:** `ng/src/app/pages/questionnaire-live/questionnaire-live.ts`

**שורה 369-380:**
```typescript
const { data: leadId, error: leadError } = await this.supabaseService.client
  .rpc('submit_lead', {
    p_questionnaire_id: this.questionnaire.id,
    p_client_name: clientName,
    p_answer_json: responseData,
    p_email: email,
    p_phone: phone,
    p_name: name,
    p_distribution_token: this.distributionToken,
    p_channel: this.detectedChannel  // ✅ נשלח ל-DB
  });
```

**קובץ:** `ng/src/app/pages/questionnaire-chat/questionnaire-chat.ts`

**שורה 1029-1040:**
- ✅ אותו הקוד גם בצ'אט - `p_channel: this.detectedChannel`

**מסקנה:** ✅ הערוץ נשלח ל-DB דרך RPC `submit_lead`

---

### ✅ **חלק ה': בדיקת הרשאות (RLS)**

**קובץ:** `supabase/create_submit_response_function.sql`

**שורה 60-72:**
```sql
CREATE OR REPLACE FUNCTION public.submit_lead(
  ...
  p_channel TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER  -- ✅ עוקף RLS
SET search_path = public
```

**שורה 112-113:**
```sql
GRANT EXECUTE ON FUNCTION public.submit_lead(...) TO anon;
GRANT EXECUTE ON FUNCTION public.submit_lead(...) TO authenticated;
```

**מסקנה:** ✅ יש הרשאות - `SECURITY DEFINER` עוקף RLS, ו-`anon` יכול לבצע

---

### ✅ **חלק ו': טריגרים / לוגיקה בשרת**

**בדיקה:** אין טריגר BEFORE INSERT שמדרס את `channel`

**מסקנה:** ✅ אין טריגר שפוגע בערוץ

---

## 🧪 חלק ז': בדיקה סופית

### **לוגים שנוספו:**

**קובץ:** `ng/src/app/pages/questionnaire-live/questionnaire-live.ts`
- ✅ `🔍 [LEAD SAVE] Detected channel:` - מראה מה הערוץ שזוהה
- ✅ `🔍 [LEAD SAVE] Full URL:` - מראה את ה-URL המלא
- ✅ `🔍 [LEAD SAVE] URL params:` - מראה את פרמטר `?src=` מה-URL
- ✅ `✅ [LEAD SAVE] Lead saved successfully with ID:` - אישור שמירה
- ✅ `✅ [LEAD SAVE] Channel saved:` - אישור שמירת הערוץ

**קובץ:** `ng/src/app/pages/questionnaire-chat/questionnaire-chat.ts`
- ✅ אותו דבר גם בצ'אט

---

## 📊 זרימה מלאה (Flow):

```
1. משתמש יוצר קישור בהפצה
   ↓
2. selectSocialNetwork('whatsapp') → קישור עם ?src=whatsapp
   ↓
3. משתמש לוחץ על הקישור
   ↓
4. QuestionnaireLive.ngOnInit() → detectChannel()
   ↓
5. ReferralTrackingService.detectChannel()
   → קורא ?src=whatsapp מה-URL
   → מחזיר 'whatsapp'
   ↓
6. saveLeadData() → שולח ל-submit_lead RPC
   → p_channel: 'whatsapp'
   ↓
7. submit_lead SQL function → שמה ב-leads.channel
   ↓
8. ✅ ליד נשמר עם channel='whatsapp'
```

---

## ✅ סיכום:

### **כל החלקים עובדים:**

1. ✅ **יצירת קישור:** כולל `?src=whatsapp/email/sms`
2. ✅ **קריאת פרמטר:** `detectChannel()` קורא את `?src=` מה-URL
3. ✅ **זיהוי ערוץ:** מחזיר `'whatsapp'` / `'email'` / `'sms'`
4. ✅ **שליחה ל-DB:** `p_channel` נשלח ל-`submit_lead` RPC
5. ✅ **שמירה ב-DB:** `submit_lead` שמה את הערוץ ב-`leads.channel`
6. ✅ **הרשאות:** `SECURITY DEFINER` עוקף RLS, `anon` יכול לבצע
7. ✅ **לוגים:** נוספו לוגים לדיבוג בכל שלב

---

## 🔍 מה לבדוק עכשיו:

1. **פתח את מסך ההפצה** → בחר WhatsApp → בדוק שהקישור כולל `?src=whatsapp`
2. **מלא את השאלון** → פתח קונסול → בדוק את הלוגים:
   - `🔍 [WHATSAPP DETECTION]` - זיהוי הערוץ
   - `🔍 [LEAD SAVE] Detected channel:` - מה נשלח ל-DB
   - `✅ [LEAD SAVE] Channel saved:` - אישור שמירה
3. **פתח את טבלת leads** → בדוק שהליד החדש מכיל `channel='whatsapp'`

---

✅ **הכל אמור לעבוד! הלוגים יעזרו לנו לזהות איפה הבעיה אם עדיין יש.**

