# הוראות מימוש - לשונית הפצה (Distribution Tab)
## מותאם לאנגולר (Angular)

---

## 📐 חלק 1: הוראות עיצוב (Design Instructions)

### 1.1 מבנה כללי
- **קומפוננטה ראשית:** `distribution.component.html` + `distribution.component.ts` + `distribution.component.scss`
- **כיוון טקסט:** RTL (direction: rtl)
- **סגנון:** Tailwind CSS (או CSS רגיל) - שמור על עקביות עם עיצוב האפליקציה

### 1.2 שלב 1: בחירת שאלון
```html
<!-- Card עם gradient ירוק -->
<div class="card gradient-green">
  <label>שלב 1: בחר שאלון</label>
  <select [ngModel]="selectedSurveyId" (ngModelChange)="onSurveyChange($event)">
    <option value="">בחר שאלון...</option>
    <!-- אפשרויות שאלונים -->
  </select>
</div>
```

**עיצוב:**
- Card עם: `background: gradient from-green-500/10 to-green-500/5`
- Shadow: `shadow-md`
- Hover: `hover:shadow-lg transition-shadow`
- Border: `border-0`
- Padding: `p-6`

### 1.3 שלב 2: בחירת מענה אוטומטי ללקוח (חובה)
```html
<!-- Card עם gradient ירוק -->
<div class="card gradient-green" *ngIf="selectedSurveyId">
  <div class="flex justify-between">
    <label>שלב 2: בחר מענה אוטומטי ללקוח <span class="text-red-500">*</span></label>
    <button (click)="navigateToAutomations()">
      <plus-icon /> צור מענה חדש ללקוח <external-link-icon />
    </button>
  </div>
  
  <select [ngModel]="selectedTemplateId" (ngModelChange)="onTemplateChange($event)">
    <option value="">בחר תבנית...</option>
    <option value="none">ללא מענה אוטומטי ללקוח</option>
    <!-- אפשרויות תבניות -->
  </select>
  
  <!-- הודעת שגיאה אם לא נבחר -->
  <p class="text-red-500 text-xs" *ngIf="!selectedTemplateId">
    יש לבחור מענה אוטומטי או "ללא מענה אוטומטי ללקוח" כדי להמשיך
  </p>
</div>
```

**עיצוב:**
- אותו עיצוב כמו שלב 1
- כפתור "צור מענה חדש":
  - `variant="outline"`
  - `size="sm"`
  - `hover:bg-primary/10`
- הודעת שגיאה: `text-destructive text-xs text-right`

### 1.4 שלב 3: קישורי הפצה (רק אחרי בחירת תבנית)
```html
<!-- Card עם gradient סגול -->
<div class="card gradient-purple" *ngIf="selectedSurveyId && selectedTemplateId">
  <label>שלב 3: קישורי הפצה</label>
  
  <!-- הודעה על זיהוי אוטומטי -->
  <div class="info-box bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4">
    <bot-icon class="text-primary" />
    <span>הלינק יזהה אוטומטית את המיקום (WhatsApp, אתר, דף נחיתה) כשמישהו לוחץ עליו</span>
  </div>
  
  <!-- 3 שורות: טופס, צ'אט, QR -->
  <div class="space-y-4">
    <!-- שורה 1: טופס -->
    <div class="link-row bg-card border rounded-lg p-4">
      <div class="flex items-center gap-2 mb-3">
        <file-text-icon class="text-primary" />
        <span class="font-semibold">טופס</span>
      </div>
      
      <!-- הקישור -->
      <div class="link-box bg-muted/50 rounded-lg p-3 border">
        <code class="text-sm text-muted break-all text-right">{{ formLink || 'לא זמין' }}</code>
        <button (click)="copyLink(formLink, 'form')">
          <copy-icon />
        </button>
      </div>
      
      <!-- תיבת טקסט מותאם אישית -->
      <div class="custom-text-section space-y-2 mt-3">
        <label class="text-xs text-muted text-right block">
          טקסט מותאם אישית (אופציונלי) - הלינק יופיע כמלל זה בעת העתקה
        </label>
        <textarea
          [(ngModel)]="linkTexts['form']"
          placeholder="הכנס כאן את המלל שבו תרצה שהלינק יופיע..."
          class="bg-background border text-right min-h-[80px] resize-none"
          dir="rtl"
        ></textarea>
        <p class="text-xs text-muted text-right" *ngIf="linkTexts['form']?.trim()">
          <span class="font-semibold">תצוגה מקדימה:</span> {{ linkTexts['form'] }}
        </p>
      </div>
      
      <!-- כפתורי פעולה -->
      <div class="action-buttons flex gap-2 flex-wrap pt-2">
        <button (click)="previewLink(formLink, 'form')">הצג טופס</button>
        <button (click)="previewTemplate()" *ngIf="selectedTemplateId !== 'none'">דמו מענה ללקוח</button>
        <button (click)="editQuestionnaire()">עריכה</button>
        <button (click)="deleteQuestionnaire()" class="text-red-500">מחיקה</button>
      </div>
    </div>
    
    <!-- שורה 2: צ'אט - אותה מבנה -->
    <!-- שורה 3: QR - אותה מבנה -->
  </div>
</div>
```

**עיצוב כללי:**
- Card gradient-purple: `bg-gradient-to-br from-purple-500/10 to-purple-500/5`
- Link Row: `bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow`
- Link Box: `bg-muted/50 rounded-lg p-3 border border-border/50`
- Textarea: `bg-background border-border text-right min-h-[80px] resize-none`
- Buttons: `variant="outline" size="sm"` עם hover effects

### 1.5 אייקונים
- `FileText` - טופס
- `MessageCircle` - צ'אט
- `QrCode` - QR
- `Copy` - העתקה
- `Eye` - תצוגה
- `Bot` - בוט/אוטומציה
- `Edit` - עריכה
- `Trash2` - מחיקה
- `Plus` - הוספה
- `ExternalLink` - קישור חיצוני

### 1.6 צבעים וטיפוגרפיה
- Primary: `#10b981` (ירוק)
- Purple: `#a855f7`
- Orange: `#f97316`
- Destructive: `#ef4444`
- Muted: `#6b7280`
- Background gradients: `/10` עד `/5` (transparency)
- Font sizes: `text-xs`, `text-sm`, `text-base`
- Font weights: `font-semibold`, `font-bold`

---

## ⚙️ חלק 2: הוראות לוגיקה (Logic Instructions)

### 2.1 State Management

**משתני State (TypeScript):**
```typescript
export class DistributionComponent implements OnInit {
  // שאלונים זמינים
  surveys: Survey[] = [];
  
  // תבניות זמינות
  templates: Template[] = [];
  
  // State נוכחי
  selectedSurveyId: string = "";
  selectedTemplateId: string = ""; // "" = לא נבחר, "none" = ללא מענה, או ID תבנית
  linkTexts: { [key: string]: string } = {}; // שמירת טקסטים מותאמים אישית
  
  // לינקים שנוצרו
  formLink: string = "";
  chatLink: string = "";
  qrLink: string = "";
  
  // מצב תצוגה
  showTemplatePreview: boolean = false;
  templatePreviewHtml: string = "";
}
```

### 2.2 אירועים ומתודות

**1. בחירת שאלון:**
```typescript
onSurveyChange(surveyId: string): void {
  this.selectedSurveyId = surveyId;
  if (surveyId) {
    this.generateLinks();
  } else {
    this.resetLinks();
  }
}
```

**2. בחירת תבנית:**
```typescript
onTemplateChange(templateId: string): void {
  this.selectedTemplateId = templateId;
  // אם יש תבנית, אפשר להציג את שלב 3
}
```

**3. יצירת לינקים:**
```typescript
generateLinks(): void {
  if (!this.selectedSurveyId) {
    return;
  }
  
  const baseUrl = window.location.origin;
  
  // לינקים אוניברסליים - יזהה אוטומטית את המיקום
  this.formLink = `${baseUrl}/form/${this.selectedSurveyId}`;
  this.chatLink = `${baseUrl}/chat/${this.selectedSurveyId}`;
  this.qrLink = `${baseUrl}/qr/${this.selectedSurveyId}`;
}
```

**4. העתקת לינק/טקסט:**
```typescript
copyLink(link: string, type: string): void {
  if (!link) {
    this.showToast("אין קישור להעתקה", "error");
    return;
  }
  
  // אם יש טקסט מותאם, העתק אותו. אחרת, העתק את הלינק
  const customText = this.linkTexts[type];
  const textToCopy = (customText && customText.trim()) ? customText : link;
  
  navigator.clipboard.writeText(textToCopy).then(() => {
    const message = (customText && customText.trim()) 
      ? "המלל הועתק ללוח" 
      : "הקישור הועתק ללוח";
    this.showToast(message, "success");
  });
}
```

**5. תצוגת תבנית:**
```typescript
previewTemplate(): void {
  if (!this.selectedTemplateId || this.selectedTemplateId === "none") {
    return;
  }
  
  const template = this.templates.find(t => t.id === this.selectedTemplateId);
  if (!template) {
    return;
  }
  
  // קבלת HTML התבנית (מהשירות/לוגיקה)
  this.templatePreviewHtml = this.automationService.generateEmailHtml(template);
  this.showTemplatePreview = true;
}
```

**6. עריכה/מחיקה:**
```typescript
editQuestionnaire(): void {
  if (!this.selectedSurveyId) {
    return;
  }
  this.router.navigate(['/create-questionnaire'], {
    queryParams: { id: this.selectedSurveyId }
  });
}

deleteQuestionnaire(): void {
  // הודעת אישור
  if (confirm("האם אתה בטוח שברצונך למחוק את השאלון?")) {
    // קריאה ל-API למחיקה
    this.questionnaireService.delete(this.selectedSurveyId).subscribe(() => {
      this.showToast("השאלון נמחק בהצלחה", "success");
      this.resetForm();
    });
  }
}
```

**7. ניהול טקסט מותאם:**
```typescript
// הטקסט נשמר אוטומטית ב-linkTexts דרך ngModel
// אין צורך במתודה נוספת
```

**8. בדיקת תקינות (Validation):**
```typescript
canShowStep3(): boolean {
  return !!(this.selectedSurveyId && this.selectedTemplateId && this.selectedTemplateId !== "");
}

isStep2Valid(): boolean {
  return !!(this.selectedTemplateId && this.selectedTemplateId !== "");
}
```

### 2.3 זיהוי אוטומטי של מקור הלינק

**הסבר:** הלינק הוא אוניברסלי (`/form/{id}`, `/chat/{id}`, `/qr/{id}`) ואינו מכיל פרמטרים של מקור.

**הזיהוי מתבצע בצד הלקוח/שרת כשהלינק נטען:**

```typescript
// בדף הנחיתה של הלינק (form/chat/qr component)
detectLinkSource(): string {
  const url = window.location.href;
  const referrer = document.referrer;
  
  // בדיקת UTM parameters
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  if (utmSource) {
    return utmSource; // "whatsapp", "website", "landing-page"
  }
  
  // בדיקת referrer
  if (referrer) {
    if (referrer.includes('wa.me') || referrer.includes('whatsapp.com')) {
      return 'whatsapp';
    }
    if (referrer.includes(window.location.hostname)) {
      return 'website';
    }
    return 'external';
  }
  
  // בדיקה לפי user agent (למקרה של WhatsApp Web)
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('whatsapp')) {
    return 'whatsapp';
  }
  
  // ברירת מחדל
  return 'direct'; // גישה ישירה או דף נחיתה
}
```

**שימוש:**
- ניתן להוסיף את הלוגיקה הזו בקומפוננטה שקוראת את הלינק
- או בצד השרת (API route) שמטפל בלינק

### 2.4 טעינת נתונים

**בקומפוננטה:**
```typescript
ngOnInit(): void {
  this.loadSurveys();
  this.loadTemplates();
}

loadSurveys(): void {
  this.questionnaireService.getAll().subscribe({
    next: (surveys) => {
      this.surveys = surveys;
    },
    error: (err) => {
      console.error("Error loading surveys:", err);
      this.showToast("שגיאה בטעינת השאלונים", "error");
    }
  });
}

loadTemplates(): void {
  this.automationService.getTemplatesByTrigger('lead').subscribe({
    next: (templates) => {
      this.templates = templates;
    },
    error: (err) => {
      console.error("Error loading templates:", err);
    }
  });
}
```

### 2.5 שירותים נדרשים (Services)

```typescript
// questionnaire.service.ts
- getAll(): Observable<Survey[]>
- delete(id: string): Observable<void>

// automation.service.ts
- getTemplatesByTrigger(trigger: string): Observable<Template[]>
- generateEmailHtml(template: Template): string

// toast.service.ts (או ngx-toastr)
- showToast(message: string, type: 'success' | 'error' | 'info'): void
```

---

## 📋 סיכום - סדר עבודה לאנגולר

1. **יצירת קומפוננטה:**
   - `ng generate component pages/distribution`

2. **הוספת Routes:**
   - `{ path: 'distribution', component: DistributionComponent }`

3. **עיצוב (HTML + SCSS):**
   - עקוב אחר חלק 1 (הוראות עיצוב)
   - שמור על עקביות עם עיצוב האפליקציה

4. **לוגיקה (TypeScript):**
   - עקוב אחר חלק 2 (הוראות לוגיקה)
   - צור Services נדרשים

5. **זיהוי אוטומטי:**
   - הוסף את `detectLinkSource()` בקומפוננטות שקוראות את הלינק

6. **בדיקות:**
   - בדוק שהלינקים נוצרים נכון
   - בדוק שהטקסט המותאם מועתק במקום הלינק
   - בדוק שהתצוגה המקדימה עובדת
   - בדוק ניתוב (routing)

---

## 🔗 קישורים לקבצים רלוונטיים

- **קוד React מקורי:** `src/pages/Distribution.tsx`
- **תבניות אוטומציה:** `src/lib/automationTemplates.ts`

---

**הערות:**
- שמור על עקביות עם עיצוב האפליקציה הקיימת
- הלינקים הם אוניברסליים ואינם מכילים פרמטרים של מקור
- הזיהוי האוטומטי מתבצע כשהלינק נטען, לא כשהוא נוצר
- הטקסט המותאם מועתק במקום הלינק אם קיים

