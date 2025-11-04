# 🧪 בדיקות פנימיות - מערכת ההפצה

## ✅ בדיקה 1: שמירה וטעינה אוטומטית

### Test Case 1.1: שמירה אוטומטית
```typescript
// Test Steps:
1. בחר שאלון
2. בחר תבנית → נשמר ב-localStorage?
3. בחר ערוצים → נשמר ב-localStorage?
4. הקלד טקסט → נשמר אחרי 1 שנייה?
5. בדוק localStorage: `hoogi-distribution-data-{questionnaireId}`

// Expected:
✅ כל הנתונים נשמרים ב-localStorage
✅ המבנה: { templateId, channels, linkTexts, savedTexts, timestamp }
```

### Test Case 1.2: טעינה אוטומטית
```typescript
// Test Steps:
1. בחר שאלון
2. בחר תבנית "X"
3. בחר ערוצים: email, whatsapp
4. הקלד טקסט: "טקסט לטסט"
5. סגור דפדפן
6. פתח מחדש → בחר אותו שאלון

// Expected:
✅ התבנית נטענת: selectedTemplateId = "X"
✅ הערוצים נטענים: selectedChannels = ['email', 'whatsapp']
✅ הטקסט נטען: linkTexts['form'] = "טקסט לטסט"
```

---

## ✅ בדיקה 2: מעקב אחר מקור (Referral Tracking)

### Test Case 2.1: פרמטר src בלינקים
```typescript
// Test Steps:
1. בחר שאלון
2. בחר תבנית
3. צור לינקים

// Expected:
✅ formLink = "https://site.com/q/token?src=form"
✅ chatLink = "https://site.com/q/token/chat?src=chat"
✅ qrLink = "https://site.com/q/token/qr?src=qr"
```

### Test Case 2.2: זיהוי channel ב-ReferralTrackingService
```typescript
// Test Steps:
1. פתח לינק: /q/token?src=form
2. בדוק: referralTracking.detectChannel()

// Expected:
✅ detectedChannel = "form"

// Test Steps:
1. פתח לינק: /q/token/chat?src=chat
2. בדוק: referralTracking.detectChannel()

// Expected:
✅ detectedChannel = "chat"

// Test Steps:
1. פתח לינק: /q/token/qr?src=qr
2. בדוק: referralTracking.detectChannel()

// Expected:
✅ detectedChannel = "qr"
```

### Test Case 2.3: שמירת channel ב-leads
```typescript
// Test Steps:
1. פתח לינק עם ?src=form
2. מלא שאלון
3. שלח תשובה
4. בדוק ב-leads table

// Expected:
✅ lead.channel = "form"
✅ lead.distribution_token = "d_xxxxx" (אם יש)
```

---

## ✅ בדיקה 3: אוטומציה - שליחת הודעות

### Test Case 3.1: שמירת distribution ב-DB
```typescript
// Test Steps:
1. בחר שאלון
2. בחר תבנית "X"
3. בחר ערוצים: email, whatsapp
4. לחץ "הצג לינקים" (handleShowLinks)

// Expected:
✅ saveDistribution() נקרא
✅ distribution נוצר/עודכן ב-distributions table
✅ automation_template_ids = [{ template_id: "X", channels: ["email", "whatsapp"] }]
✅ token = "d_xxxxx"
```

### Test Case 3.2: אוטומציה נשלחת כשנוצר lead
```typescript
// Test Steps:
1. יש distribution פעיל עם תבנית "X" וערוצים: email, whatsapp
2. מלא שאלון דרך לינק הפצה
3. שלח תשובה → lead נוצר

// Expected:
✅ on-new-lead Edge Function נקרא
✅ בודק את distribution לפי questionnaire_id או token
✅ טוען את התבנית "X"
✅ שולח email לפי התבנית
✅ שולח whatsapp לפי התבנית
```

### Test Case 3.3: החלפת משתנים בתבנית
```typescript
// Test Steps:
1. תבנית עם: "שלום {{firstName}}, תודה על תשובתך"
2. lead עם שם: "יוסי כהן"

// Expected:
✅ הודעה: "שלום יוסי, תודה על תשובתך"
✅ משתנים נוספים: {{fullName}}, {{email}}, {{phone}}, {{businessName}}
```

---

## ✅ בדיקה 4: שמירה ב-Database vs localStorage

### Test Case 4.1: עדיפות ל-DB
```typescript
// Test Steps:
1. יש distribution ב-DB עם תבנית "A"
2. יש שמירה ב-localStorage עם תבנית "B"
3. טען שאלון

// Expected:
✅ נטען מ-DB: selectedTemplateId = "A"
✅ localStorage מתעדכן עם "A"
✅ DB הוא source of truth
```

### Test Case 4.2: שמירה אוטומטית ל-DB
```typescript
// Test Steps:
1. בחר שאלון
2. בחר תבנית
3. בחר ערוצים
4. לחץ "הצג לינקים"

// Expected:
✅ saveDistribution() נקרא
✅ distribution נוצר/עודכן ב-DB
✅ הנתונים נשמרים גם ב-localStorage
```

---

## ⚠️ בעיות שזוהו

### בעיה 1: אין שמירה אוטומטית ל-DB
**בעיה:** הנתונים נשמרים רק ב-localStorage, לא ב-DB.
**השפעה:** אם המשתמש מחליף מחשב - הנתונים אבדו.
**פתרון:** להוסיף שמירה אוטומטית ל-DB בכל שינוי.

### בעיה 2: אין אינדיקטור שמירה
**בעיה:** המשתמש לא יודע שהנתונים נשמרו.
**פתרון:** להוסיף Toast או אינדיקטור ויזואלי.

### בעיה 3: אין בדיקת תקינות
**בעיה:** לינקים נוצרים גם בלי תבנית/ערוצים.
**פתרון:** לוודא שיש תבנית וערוצים לפני יצירת לינקים.

---

## 💡 שיפורים מוצעים

### 1. שמירה אוטומטית ל-DB
```typescript
// להוסיף ב-saveDistributionData():
async saveDistributionData(questionnaireId: string): Promise<void> {
  // שמירה ל-localStorage (כמו עכשיו)
  // + שמירה ל-DB אם יש תבנית וערוצים
  if (this.selectedTemplateId && this.selectedChannels.length > 0) {
    await this.saveDistribution(); // שמירה ל-DB
  }
}
```

### 2. אינדיקטור שמירה
```html
<!-- להוסיף ב-HTML -->
<div *ngIf="isSaving" class="saving-indicator">
  💾 שומר...
</div>
<div *ngIf="lastSaved" class="saved-indicator">
  ✓ נשמר {{lastSaved | date:'HH:mm:ss'}}
</div>
```

### 3. ולידציה לפני יצירת לינקים
```typescript
generateLinks(): void {
  if (!this.selectedQuestionnaire) return;
  if (!this.selectedTemplateId || this.selectedTemplateId === 'none') {
    console.warn('No template selected - links will be created but no automation');
  }
  // ... rest of code
}
```

---

## 📊 סיכום

### ✅ מה עובד טוב:
1. שמירה וטעינה אוטומטית ב-localStorage
2. מעקב אחר מקור (src parameter)
3. אוטומציה נשלחת לפי התבנית והערוצים
4. החלפת משתנים בתבנית

### ⚠️ מה צריך שיפור:
1. שמירה אוטומטית ל-DB
2. אינדיקטור שמירה
3. ולידציה לפני יצירת לינקים
4. תצוגת מצב distribution

---

**תאריך:** 2025-11-03
**סטטוס:** ✅ מערכת עובדת, יש מקום לשיפורים

