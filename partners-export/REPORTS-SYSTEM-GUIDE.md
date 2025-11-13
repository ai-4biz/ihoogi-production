# 📊 מדריך מערכת הדוחות - Partners Management

## 📋 סקירה כללית

מערכת הדוחות במערכת ניהול השותפים היא מערכת מורכבת מאוד עם שני רכיבים עיקריים:

1. **SmartReportsSystem** - מערכת דוחות חכמה עם תבניות מוכנות
2. **AdvancedReportGenerator** - מחולל דוחות מתקדם עם סינון, מיון, בחירת עמודות

---

## 🎯 SmartReportsSystem

### מה זה?

מערכת דוחות חכמה עם 10+ סוגי דוחות מוכנים לשימוש מיידי.

### סוגי דוחות זמינים:

#### 1. 💰 דוח תשלומים שבוצעו
- **קטגוריה:** כספי
- **תיאור:** ניהול ומעקב אחר תשלומים לשותפים
- **עמודות:**
  - מזהה תשלום
  - שם שותף
  - מזהה שותף
  - סכום לתשלום
  - מטבע
  - תאריך זכאות
  - תאריך תשלום בפועל
  - סטטוס תשלום
  - הערת מנהל
  - קובץ אסמכתא

#### 2. 🏦 דוח יצוא לבנק ישראלי
- **קטגוריה:** כספי
- **תיאור:** הפקת קובץ להעברת תשלומים לבנקים בישראל
- **עמודות:**
  - שם בעל חשבון
  - קוד בנק
  - מספר סניף
  - מספר חשבון
  - סכום להעברה
  - מטבע
  - תאריך תשלום מתוכנן
  - תיאור תשלום
  - מזהה תשלום
  - מזהה שותף
  - סטטוס ייצוא
  - תאריך יצוא

#### 3. 🌍 דוח יצוא לבנק בינלאומי
- **קטגוריה:** כספי
- **תיאור:** הפקת קובץ להעברת תשלומים לבנקים בינלאומיים
- **עמודות:**
  - שם בעל חשבון (אנגלית)
  - כתובת מלאה
  - שם הבנק (אנגלית)
  - כתובת הבנק
  - מספר IBAN
  - קוד SWIFT/BIC
  - סכום להעברה
  - מטבע
  - תאריך תשלום מתוכנן
  - מטרת התשלום
  - בנק תיווך (אם נדרש)
  - מזהה תשלום

#### 4. 📅 דוח סיכום חודשי
- **קטגוריה:** כספי
- **תיאור:** סיכום חודשי של כל הפעילות
- **עמודות:**
  - חודש
  - מספר שותפים פעילים
  - סה"כ לידים
  - סה"כ מכירות
  - סה"כ עמלות
  - סה"כ תשלומים
  - יתרה

#### 5. 👥 דוח לידים לפי שותף
- **קטגוריה:** ביצועים
- **תיאור:** מעקב לידים לפי שותף
- **עמודות:**
  - שם שותף
  - מספר לידים
  - לידים חדשים
  - לידים פעילים
  - לידים שהומרו
  - שיעור המרה

#### 6. 📈 דוח המרות
- **קטגוריה:** ביצועים
- **תיאור:** שיעורי המרה לפי שותף
- **עמודות:**
  - שם שותף
  - מספר לידים
  - מספר המרות
  - שיעור המרה
  - הכנסות מהמרות

#### 7. 🔗 דוח קישורי מעקב
- **קטגוריה:** ביצועים
- **תיאור:** מעקב קישורים לפי שותף
- **עמודות:**
  - שם שותף
  - קישור מעקב
  - מספר קליקים
  - מספר המרות
  - שיעור המרה

#### 8. 🏆 דוח לוח מובילים
- **קטגוריה:** ביצועים
- **תיאור:** שותפים מובילים לפי ביצועים
- **עמודות:**
  - מיקום
  - שם שותף
  - מספר לידים
  - מספר מכירות
  - סה"כ עמלות
  - דירוג

### שימוש ב-Angular:

```typescript
// partners-management.component.ts
import { SmartReportsSystem } from '@/components/reports/SmartReportsSystem';

export class PartnersManagementComponent {
  partners: Partner[] = [];
  
  onExportReport(data: any[], reportType: string) {
    console.log('Exporting report:', reportType, data);
    // כאן תוסיף לוגיקה לייצוא
  }
}
```

```html
<!-- partners-management.component.html -->
<app-smart-reports-system
  [partners]="partners"
  (onExport)="onExportReport($event, $event.reportType)">
</app-smart-reports-system>
```

---

## 🔧 AdvancedReportGenerator

### מה זה?

מחולל דוחות מתקדם עם יכולות:
- **סינון מתקדם** - לפי תאריכים, סטטוס, מדינה, וכו'
- **מיון** - לפי כל עמודה
- **בחירת עמודות** - בחר אילו עמודות להציג
- **ייצוא** - ל-Excel, CSV, PDF
- **שמירת הגדרות** - שמור הגדרות לשימוש חוזר

### תכונות:

#### 1. חיפוש
- חיפוש בכל השדות
- חיפוש מתקדם עם אופרטורים

#### 2. סינון
- סינון לפי תאריכים (טווח תאריכים)
- סינון לפי סטטוס
- סינון לפי מדינה
- סינון לפי חברה
- סינון מותאם אישית

#### 3. מיון
- מיון לפי כל עמודה
- מיון עולה/יורד
- מיון מרובה עמודות

#### 4. בחירת עמודות
- בחר אילו עמודות להציג
- שמור בחירת עמודות
- הגדרות ברירת מחדל

#### 5. ייצוא
- ייצוא ל-Excel (.xlsx)
- ייצוא ל-CSV
- ייצוא ל-PDF (אם מותקן)

### שימוש ב-Angular:

```typescript
// partners-management.component.ts
import { AdvancedReportGenerator } from '@/components/reports/AdvancedReportGenerator';

export class PartnersManagementComponent {
  partners: Partner[] = [];
  reportColumns = [
    { key: 'name', label: 'שם', type: 'text', visible: true, sortable: true, filterable: true },
    { key: 'email', label: 'אימייל', type: 'text', visible: true, sortable: true, filterable: true },
    { key: 'status', label: 'סטטוס', type: 'status', visible: true, sortable: true, filterable: true },
    // ... עוד עמודות
  ];
  
  onExportReport(filteredData: any[], config: any) {
    console.log('Exporting report:', filteredData, config);
    // כאן תוסיף לוגיקה לייצוא
  }
}
```

```html
<!-- partners-management.component.html -->
<app-advanced-report-generator
  [data]="partners"
  [columns]="reportColumns"
  title="דוח שותפים מפורט"
  (onExport)="onExportReport($event.filteredData, $event.config)">
</app-advanced-report-generator>
```

---

## 📝 Interfaces

### ReportColumn

```typescript
interface ReportColumn {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'currency' | 'status' | 'boolean';
  visible: boolean;
  sortable: boolean;
  filterable: boolean;
}
```

### FilterConfig

```typescript
interface FilterConfig {
  column: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between' | 'in' | 'not_in';
  value: any;
  label: string;
}
```

### SortConfig

```typescript
interface SortConfig {
  column: string;
  direction: 'asc' | 'desc';
}
```

---

## 🔍 פתרון בעיות

### בעיה 1: דוחות לא מופיעים

**פתרון:**
1. ודא ש-`SmartReportsSystem` component קיים
2. ודא ש-`AdvancedReportGenerator` component קיים
3. בדוק את ה-imports ב-TypeScript
4. ודא שה-data מועבר נכון

### בעיה 2: ייצוא לא עובד

**פתרון:**
1. ודא שיש ספריית ייצוא מותקנת (למשל: `xlsx` ל-Excel)
2. בדוק את ה-`onExport` handler
3. בדוק את הקונסול לשגיאות

### בעיה 3: סינון לא עובד

**פתרון:**
1. ודא שה-`filterable` מוגדר ל-`true` בעמודות
2. בדוק את ה-`FilterConfig`
3. בדוק את הקונסול לשגיאות

---

## ✅ בדיקות

### בדיקות SmartReportsSystem
- [ ] כל 10+ הדוחות מופיעים
- [ ] לחיצה על דוח מציגה את הפרטים
- [ ] ייצוא עובד
- [ ] כל האייקונים נראים

### בדיקות AdvancedReportGenerator
- [ ] חיפוש עובד
- [ ] סינון עובד
- [ ] מיון עובד
- [ ] בחירת עמודות עובדת
- [ ] ייצוא עובד

---

**בהצלחה! 🎉**


