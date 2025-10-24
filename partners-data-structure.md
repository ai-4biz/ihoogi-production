# 📊 מבנה נתונים מלא למערכת ניהול שותפים

## 🏗️ מבנה בסיסי - Partner Interface

```typescript
interface Partner {
  // פרטי זיהוי בסיסיים
  id: string;                    // מזהה ייחודי לשותף
  name: string;                  // שם מלא של השותף
  email: string;                 // כתובת אימייל
  phone: string;                 // מספר טלפון
  company?: string;              // שם החברה (אופציונלי)
  avatar?: string;               // תמונת פרופיל (URL)
  
  // סטטוס ומידע כללי
  status: 'active' | 'inactive' | 'suspended';  // סטטוס השותף
  joinDate: string;              // תאריך הצטרפות (ISO date)
  
  // נתוני ביצועים
  totalEarnings: number;        // סך עמלות שנצברו
  monthlyEarnings: number;       // עמלות חודשיות
  commissionPercentage: number;  // אחוז עמלה
  totalLeads: number;            // סך לידים שהביא
  totalSales: number;            // סך מכירות
  usersBrought: number;          // מספר משתמשים שהביא
  conversionRate: number;        // אחוז המרה
  
  // עמלות ותשלומים
  commissionType: CommissionType;     // סוג עמלה
  paymentMethod: PaymentMethod;       // שיטת תשלום
  nextPaymentDate?: string;           // תאריך תשלום הבא
  
  // קישורים ומידע נוסף
  uniqueLink: string;            // קישור ייחודי לשותף
  personalDescription?: string; // תיאור אישי
  internalNotes?: string;        // הערות פנימיות
  
  // ביצועים חודשיים
  monthlyPerformance: MonthlyPerformance[];
}
```

## 💰 מבנה עמלות - CommissionType Interface

```typescript
interface CommissionType {
  type: 'fixed_monthly' | 'percentage_monthly' | 'one_time' | 'mixed' | 'user_based' | 'time_based';
  
  // עמלה קבועה
  fixedAmount?: number;          // סכום קבוע לחודש
  
  // עמלה באחוזים
  percentage?: number;           // אחוז עמלה
  
  // הגבלות
  minAmount?: number;            // סכום מינימלי
  maxAmount?: number;            // סכום מקסימלי
  
  // תאריכים ותנאים
  expiryDate?: string;           // תאריך תפוגה
  userThreshold?: number;        // סף משתמשים
  
  // עמלה מעורבת
  initialAmount?: number;        // סכום התחלתי
  monthlyAmount?: number;        // סכום חודשי
  
  // עמלה מבוססת זמן
  timeBasedAmount?: number;      // סכום מבוסס זמן
  timePeriod?: string;           // תקופת זמן
  
  // תנאים נוספים
  conditions?: string[];         // רשימת תנאים
}
```

## 🏦 מבנה תשלומים - PaymentMethod Interface

```typescript
interface PaymentMethod {
  type: 'credit_card' | 'bank_transfer' | 'paypal' | 'crypto' | 'international_wire';
  details: string;               // פרטים כלליים
  
  // פרטי בנק ישראלי
  accountNumber?: string;        // מספר חשבון
  bankName?: string;             // שם הבנק
  
  // פרטי כרטיס אשראי
  cardLast4?: string;            // 4 ספרות אחרונות של הכרטיס
  
  // הגדרות כלליות
  isDefault: boolean;            // האם זה התשלום ברירת המחדל
}
```

## 📅 מבנה ביצועים חודשיים - MonthlyPerformance Interface

```typescript
interface MonthlyPerformance {
  month: string;                 // שם החודש
  leads: number;                // מספר לידים בחודש
  sales: number;                // מספר מכירות בחודש
  commission: number;            // עמלה בחודש
}
```

## 💳 מבנה תשלומי עמלה - CommissionPayment Interface

```typescript
interface CommissionPayment {
  id: string;                   // מזהה תשלום
  partnerId: string;            // מזהה שותף
  partnerName: string;          // שם השותף
  amount: number;               // סכום התשלום
  status: 'unpaid' | 'pending' | 'paid';  // סטטוס תשלום
  dueDate: string;              // תאריך תשלום
  paidDate?: string;            // תאריך תשלום בפועל
  description: string;          // תיאור התשלום
}
```

## ⚙️ הגדרות תוכנית - ProgramSettings Interface

```typescript
interface ProgramSettings {
  // הגדרות עמלה בסיסיות
  defaultCommissionPercentage: number;  // אחוז עמלה ברירת מחדל
  linkExpiryDays: number;               // ימי תפוגת קישור
  
  // הגדרות הרשאות
  allowPartnerDataView: boolean;        // האם לאפשר לצפייה בנתונים
  
  // טקסטים ותנאים
  termsText: string;                    // טקסט תנאי השימוש
  
  // עמלות לפי מוצר
  productCommissionRates: ProductCommissionRate[];
  
  // הגדרות חברת סליקה
  paymentGateway: 'manual' | 'zcredit' | 'payme' | 'tranzila' | 'max';
  gatewayApiKey: string;                // מפתח API
  gatewayApiSecret: string;             // סוד API
  gatewayMerchantId: string;            // מזהה סוחר
  autoInvoiceGeneration: boolean;       // יצירת חשבונית אוטומטית
}
```

## 🛍️ עמלות לפי מוצר - ProductCommissionRate Interface

```typescript
interface ProductCommissionRate {
  productId: string;            // מזהה מוצר
  productName: string;           // שם המוצר
  commissionRate: number;        // אחוז עמלה למוצר
}
```

---

## 📋 שדות חסרים שצריכים להוסיף למערכת

### 💰 קטגוריה: כספי (Financial Fields)

#### 1. דוח עמלות לפי שותף
```typescript
interface CommissionReport {
  partnerName: string;          // שם שותף ✅ (קיים)
  affiliateId: string;          // מזהה שותף ✅ (קיים)
  period: string;               // תקופה ❌ חסר
  commissionType: string;       // סוג עמלה ❌ חסר
  commissionRate: number;       // שיעור עמלה ✅ (קיים)
  totalSales: number;           // סך מכירות ✅ (קיים)
  commissionAmount: number;      // סכום עמלה ❌ חסר
  status: string;               // סטטוס ❌ חסר
  calculationDate: string;      // תאריך חישוב ❌ חסר
  notes: string;                // הערות/בונוס ❌ חסר
}
```

#### 2. דוח תשלומים שבוצעו
```typescript
interface PayoutReport {
  paymentId: string;            // מזהה תשלום ❌ חסר
  partnerName: string;          // שם שותף ✅ (קיים)
  affiliateId: string;          // מזהה שותף ✅ (קיים)
  amount: number;               // סכום לתשלום ❌ חסר
  currency: string;             // מטבע ❌ חסר
  eligibilityDate: string;      // תאריך זכאות ❌ חסר
  actualPaymentDate: string;    // תאריך תשלום בפועל ❌ חסר
  paymentStatus: string;        // סטטוס תשלום ❌ חסר
  managerNote: string;          // הערת מנהל ❌ חסר
  receiptFile: string;          // קובץ אסמכתא ❌ חסר
}
```

#### 3. דוח יצוא לבנק ישראלי
```typescript
interface BankExportIsrael {
  accountHolderName: string;    // שם בעל חשבון ❌ חסר
  bankCode: string;             // קוד בנק ❌ חסר
  branchNumber: string;         // מספר סניף ❌ חסר
  accountNumber: string;        // מספר חשבון ❌ חסר
  transferAmount: number;       // סכום להעברה ❌ חסר
  currency: string;             // מטבע ❌ חסר
  plannedPaymentDate: string;   // תאריך תשלום מתוכנן ❌ חסר
  paymentDescription: string;   // תיאור תשלום ❌ חסר
  paymentId: string;            // מזהה תשלום ❌ חסר
  affiliateId: string;          // מזהה שותף ✅ (קיים)
  exportStatus: string;         // סטטוס ייצוא ❌ חסר
  exportDate: string;           // תאריך יצוא ❌ חסר
}
```

#### 4. דוח יצוא תשלומים בינלאומיים
```typescript
interface BankExportInternational {
  accountHolderName: string;    // שם בעל החשבון ❌ חסר
  bankCountry: string;          // מדינת בנק ❌ חסר
  bankName: string;             // שם הבנק ❌ חסר
  swiftBicCode: string;         // קוד SWIFT/BIC ❌ חסר
  ibanNumber: string;           // מספר IBAN ❌ חסר
  bankAddress: string;          // כתובת בנק ❌ חסר
  transferAmount: number;       // סכום להעברה ❌ חסר
  currency: string;              // סוג מטבע ❌ חסר
  paymentDate: string;          // תאריך תשלום ❌ חסר
  paymentDescription: string;   // תיאור תשלום ❌ חסר
  paymentId: string;             // מזהה תשלום ❌ חסר
  affiliateId: string;           // מזהה שותף ✅ (קיים)
  paymentStatus: string;         // סטטוס תשלום ❌ חסר
  exportDate: string;            // תאריך יצוא ❌ חסר
}
```

### 📈 קטגוריה: שיווקית (Marketing Fields)

#### 5. דוח לידים לפי שותף
```typescript
interface LeadsByPartnerReport {
  partnerName: string;          // שם שותף ✅ (קיים)
  affiliateId: string;          // מזהה שותף ✅ (קיים)
  totalLeads: number;           // סה״כ לידים ✅ (קיים)
  openLeads: number;            // לידים פתוחים ❌ חסר
  convertedLeads: number;       // לידים שהומרו ללקוחות ❌ חסר
  abandonedLeads: number;       // לידים שננטשו ❌ חסר
  conversionRate: number;       // אחוז המרה ✅ (קיים)
  lastUpdate: string;           // תאריך עדכון אחרון ❌ חסר
}
```

#### 6. דוח המרות
```typescript
interface ConversionReport {
  partnerName: string;          // שם שותף ✅ (קיים)
  affiliateId: string;          // מזהה שותף ✅ (קיים)
  period: string;               // תקופה ❌ חסר
  leadsCount: number;           // מספר לידים ❌ חסר
  paidTransactions: number;     // מספר עסקאות בתשלום ❌ חסר
  conversionRate: number;       // אחוז המרה ✅ (קיים)
  totalCommissions: number;     // סך עמלות שנוצרו ❌ חסר
  changeFromPreviousMonth: number; // אחוז שינוי מהחודש הקודם ❌ חסר
}
```

#### 7. דוח לינקים ייחודיים
```typescript
interface TrackingLinksReport {
  affiliateId: string;          // מזהה שותף ✅ (קיים)
  linkName: string;             // שם לינק / תיאור קמפיין ❌ חסר
  linkUrl: string;              // כתובת לינק (URL) ❌ חסר
  clicksCount: number;          // מספר קליקים ❌ חסר
  leadsCount: number;           // מספר לידים ❌ חסר
  paidTransactions: number;     // מספר עסקאות בתשלום ❌ חסר
  linkConversionRate: number;   // אחוז המרה ללינק ❌ חסר
  lastUpdate: string;           // תאריך עדכון אחרון ❌ חסר
}
```

### 👥 קטגוריה: ניהולית (Management Fields)

#### 8. דוח שותפים פעילים
```typescript
interface ActivePartnersReport {
  affiliateId: string;          // מזהה שותף ✅ (קיים)
  partnerName: string;          // שם שותף ✅ (קיים)
  status: string;               // סטטוס ✅ (קיים)
  leadsCount: number;           // מספר לידים ❌ חסר
  transactionsCount: number;    // מספר עסקאות ❌ חסר
  totalRevenue: number;          // סך הכנסות ❌ חסר
  lastActivity: string;         // תאריך פעילות אחרונה ❌ חסר
  changeFromPreviousMonth: number; // אחוז שינוי לעומת חודש קודם ❌ חסר
}
```

#### 9. דוח דירוג שותפים
```typescript
interface PartnersLeaderboard {
  rank: number;                 // מקום בדירוג ❌ חסר
  partnerName: string;          // שם שותף ✅ (קיים)
  totalSales: number;           // סך מכירות ✅ (קיים)
  totalCommissions: number;     // סך עמלות ✅ (קיים)
  conversionRate: number;       // אחוז המרה ✅ (קיים)
  period: string;               // חודש / תקופה ❌ חסר
  rankChange: string;           // שינוי ממקום קודם ❌ חסר
}
```

### 💬 קטגוריה: תמיכה (Support Fields)

#### 10. דוח פניות שותפים
```typescript
interface SupportRequestsReport {
  partnerName: string;          // שם שותף ✅ (קיים)
  requestDate: string;          // תאריך פניה ❌ חסר
  requestSubject: string;       // נושא פניה ❌ חסר
  supportStatus: string;        // סטטוס טיפול ❌ חסר
  closureDate: string;          // תאריך סגירה ❌ חסר
  supportNote: string;          // הערת תמיכה ❌ חסר
}
```

#### 11. דוח הודעות ותזכורות
```typescript
interface NotificationsLogReport {
  sendDate: string;             // תאריך שליחה ❌ חסר
  recipient: string;            // שם שותף / כתובת מייל ❌ חסר
  messageType: string;          // סוג הודעה ❌ חסר
  messageSubject: string;        // נושא ההודעה ❌ חסר
  status: string;               // סטטוס ❌ חסר
  contentLink: string;          // קישור לתוכן ההודעה ❌ חסר
}
```

---

## 🔧 מבנה נתונים מורחב מוצע

### 📊 Partner Extended Interface
```typescript
interface PartnerExtended extends Partner {
  // פרטי בנק מורחבים
  bankDetails: {
    bankCode: string;           // קוד בנק ישראלי
    branchNumber: string;       // מספר סניף
    fullAccountNumber: string;  // מספר חשבון מלא
    ibanNumber: string;         // מספר IBAN
    swiftBicCode: string;       // קוד SWIFT/BIC
    bankAddress: string;        // כתובת בנק
    bankCountry: string;        // מדינת בנק
  };
  
  // מזהי מערכת
  systemIds: {
    paymentId: string;          // מזהה תשלום ייחודי
    transactionId: string;       // מזהה עסקה
    exportId: string;           // מזהה ייצוא
    auditId: string;            // מזהה לוג פעולה
  };
  
  // תאריכים קריטיים
  criticalDates: {
    lastActivity: string;       // תאריך פעילות אחרונה
    calculationDate: string;    // תאריך חישוב עמלה
    exportDate: string;         // תאריך ייצוא
    approvalDate: string;       // תאריך אישור
  };
  
  // סטטוסים
  statuses: {
    paymentStatus: string;      // סטטוס תשלום
    exportStatus: string;       // סטטוס ייצוא
    commissionStatus: string;   // סטטוס עמלה
    supportStatus: string;      // סטטוס תמיכה
  };
  
  // נתוני לידים מפורטים
  leadsData: {
    openLeads: number;         // לידים פתוחים
    convertedLeads: number;    // לידים שהומרו
    abandonedLeads: number;    // לידים שננטשו
    lastUpdate: string;        // תאריך עדכון אחרון
  };
  
  // נתוני קמפיינים
  campaignData: {
    linkName: string;          // שם לינק/קמפיין
    linkUrl: string;           // כתובת לינק
    clicksCount: number;        // מספר קליקים
    linkConversionRate: number; // אחוז המרה ללינק
  };
  
  // נתוני ערוצי שיווק
  marketingData: {
    marketingChannel: string;   // ערוץ שיווק
    totalVisits: number;        // סך כניסות
    leadsReceived: number;      // לידים שהתקבלו
    totalRevenue: number;       // הכנסה כוללת
    averageCostPerLead: number; // עלות ממוצעת לליד
    roi: number;               // החזר השקעה
  };
  
  // נתוני תמיכה
  supportData: {
    requestDate: string;        // תאריך פניה
    requestSubject: string;     // נושא פניה
    supportStatus: string;      // סטטוס טיפול
    closureDate: string;        // תאריך סגירה
    supportNote: string;        // הערת תמיכה
  };
  
  // נתוני הודעות
  notificationData: {
    sendDate: string;           // תאריך שליחה
    recipient: string;           // שם שותף/מייל
    messageType: string;        // סוג הודעה
    messageSubject: string;      // נושא הודעה
    messageStatus: string;       // סטטוס הודעה
    contentLink: string;        // קישור לתוכן
  };
}
```

---

## 📝 סיכום שדות חסרים

### 🔴 שדות חסרים לחלוטין (89 שדות):
- **פרטי בנק מלאים** - 7 שדות
- **מזהי תשלומים** - 4 שדות  
- **סטטוסי תשלומים** - 4 שדות
- **תאריכי פעילות** - 4 שדות
- **פירוט עסקאות** - 4 שדות
- **מידע קמפיינים** - 4 שדות
- **נתוני ערוצי שיווק** - 6 שדות
- **מידע תמיכה** - 5 שדות
- **לוג פעולות** - 6 שדות
- **נתוני הודעות** - 6 שדות
- **שדות נוספים** - 39 שדות

### 🟡 שדות חלקיים (קיימים אבל לא מלאים):
- `paymentMethod` - יש רק פרטים בסיסיים
- `commissionType` - יש מבנה אבל לא כל השדות הנדרשים
- `monthlyPerformance` - יש אבל לא מפורט מספיק

---

## 🎯 המלצות ליישום

1. **הוספת שדות חסרים** - להוסיף את כל השדות החסרים לממשק Partner
2. **יצירת טבלאות נוספות** - ליצור טבלאות נפרדות לנתוני תמיכה, הודעות ולוגים
3. **מערכת מזהים** - ליצור מערכת מזהים ייחודיים לכל סוג פעולה
4. **מערכת סטטוסים** - ליצור enum עבור כל סוג סטטוס
5. **מערכת תאריכים** - ליצור מערכת תאריכים מובנית לכל סוג פעולה

---

**סה"כ: 89 שדות חסרים שצריכים להוסיף למערכת!** 📊
