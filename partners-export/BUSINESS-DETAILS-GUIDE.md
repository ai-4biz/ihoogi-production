# 📧 מדריך רכיב פרטי עסק לערוצי הפצה

## 📋 סקירה כללית

רכיב זה מאפשר למשתמש לבחור אילו פרטי עסק יופיעו במייל/הודעה/וואטסאפ אוטומטיים.

**מיקום:** אוטומציות → יצירת תבנית → מתחת ל"תזכורת"

---

## 🎯 מה הרכיב עושה?

1. **בחירת ערוצים** - מייל, וואטסאפ, SMS
2. **בחירת פרטים** - אימייל, טלפון, וואטסאפ, כתובת, אתר
3. **תצוגה מקדימה** - רואה איך זה יראה במייל/הודעה

---

## 📦 מבנה הרכיב

### State Variables:

```typescript
showBusinessDetails?: boolean;
businessDetailsChannels?: ("email" | "whatsapp" | "sms")[];
businessDetailsFields?: {
  email?: boolean;
  phone?: boolean;
  whatsapp?: boolean;
  address?: boolean;
  website?: boolean;
};
```

### Imports נדרשים:

```typescript
import { Phone, MapPin, Globe } from "lucide-react";
import { getUserBranding } from "@/lib/automationTemplates";
```

---

## 🎨 עיצוב

### Container:

```css
bg-gradient-to-br from-purple-50 to-purple-100
dark:from-purple-950/20 dark:to-purple-900/20
rounded-xl p-4 md:p-6
shadow-sm border border-purple-200/50
dark:border-purple-800/50
hover:shadow-md transition-shadow
```

### Inner Container (כאשר מופעל):

```css
pl-4 border-r-2 border-purple-200/30
dark:border-purple-800/30
bg-purple-50/50 dark:bg-purple-950/10
rounded-lg p-4 space-y-4
```

---

## 📧 תצוגה מקדימה במייל

### מיקום:
מתחת לברכה, לפני Footer

### עיצוב:

```css
bg-gradient-to-br from-blue-50 to-blue-100
border-t border-blue-200 p-6
```

### כפתורים:

- **אימייל:**
  - `bg-white rounded-lg border border-blue-200`
  - `hover:bg-blue-50 transition-colors`
  - אייקון: `Mail` בצבע `text-blue-600`

- **טלפון:**
  - `bg-white rounded-lg border border-blue-200`
  - `hover:bg-blue-50 transition-colors`
  - אייקון: `Phone` בצבע `text-blue-600`

- **וואטסאפ:**
  - `bg-white rounded-lg border border-green-200`
  - `hover:bg-green-50 transition-colors`
  - אייקון: `MessageCircle` בצבע `text-green-600`

- **כתובת:**
  - `bg-white rounded-lg border border-blue-200`
  - אייקון: `MapPin` בצבע `text-blue-600`

- **אתר:**
  - `bg-white rounded-lg border border-blue-200`
  - `hover:bg-blue-50 transition-colors`
  - אייקון: `Globe` בצבע `text-blue-600`

---

## 💬 תצוגה מקדימה בוואטסאפ

### מיקום:
מתחת להודעה

### עיצוב:

```css
mt-3 bg-green-50 p-4 rounded-lg max-w-sm mx-auto
```

### כפתורים:
אותם כפתורים אבל עם:
- `border-green-200` במקום `border-blue-200`
- `hover:bg-green-50` במקום `hover:bg-blue-50`
- אייקונים בצבע `text-green-600`

---

## 🔧 שימוש ב-Angular

### Component:

```typescript
export class BusinessDetailsComponent {
  showBusinessDetails = false;
  businessDetailsChannels: ("email" | "whatsapp" | "sms")[] = ["email", "whatsapp"];
  businessDetailsFields = {
    email: true,
    phone: true,
    whatsapp: false,
    address: false,
    website: false,
  };
  
  getUserBranding() {
    // קריאה ל-localStorage או service
    return {
      businessEmail: "...",
      businessPhone: "...",
      businessWhatsapp: "...",
      businessAddress: "...",
      businessWebsite: "..."
    };
  }
}
```

### Template:

```html
<div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 md:p-6">
  <h3 class="text-base md:text-lg font-semibold mb-3 md:mb-4 text-right">
    פרטי עסק לערוצי הפצה
  </h3>
  
  <div class="space-y-4" dir="rtl">
    <div class="flex items-center gap-3">
      <input 
        type="checkbox" 
        id="show-business-details"
        [(ngModel)]="showBusinessDetails"
      />
      <label for="show-business-details" class="text-sm font-medium text-right cursor-pointer">
        הצג פרטי עסק במייל/הודעה
      </label>
    </div>
    
    <div *ngIf="showBusinessDetails" class="pl-4 border-r-2 border-purple-200/30 bg-purple-50/50 rounded-lg p-4 space-y-4">
      <!-- בחירת ערוצים -->
      <div>
        <label class="text-sm font-medium text-right block mb-2">ערוצי הפצה</label>
        <div class="flex items-center gap-4">
          <!-- מייל, וואטסאפ, SMS -->
        </div>
      </div>
      
      <!-- בחירת פרטים -->
      <div>
        <label class="text-sm font-medium text-right block mb-2">אילו פרטים להציג</label>
        <div class="grid grid-cols-2 gap-3">
          <!-- אימייל, טלפון, וואטסאפ, כתובת, אתר -->
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## ✅ בדיקות

- [ ] הרכיב מופיע מתחת ל"תזכורת"
- [ ] צ'ק בוקס ראשי עובד
- [ ] בחירת ערוצים עובדת
- [ ] בחירת פרטים עובדת
- [ ] תצוגה מקדימה במייל עובדת
- [ ] תצוגה מקדימה בוואטסאפ עובדת
- [ ] רק הפרטים שנבחרו מופיעים
- [ ] רק הערוצים שנבחרו מופיעים

---

**בהצלחה! 🎉**

