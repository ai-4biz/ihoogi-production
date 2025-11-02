# קוד קומפוננטת הפצה (Distribution) - לקוד Angular

## ⚠️ הערות חשובות

### 1. שפת Angular vs React
הקוד המקורי ב-React. להלן ההבדלים העיקריים ל-Angular:

**React → Angular:**
- `useState` → `@Component` עם properties
- `useNavigate` → `Router` service
- `import { ... } from 'react'` → לא נדרש
- JSX → Angular Templates עם `*ngIf`, `*ngFor`
- `className` → `[class]` או `ngClass`
- `onClick` → `(click)`
- `dangerouslySetInnerHTML` → `[innerHTML]`

### 2. זיהוי אוטומטי של מיקום הלינק
הלינק יודע לזהות אוטומטית איפה הוא מוצב:
- **WhatsApp** - מזהה דרך `window.location.href` או `document.referrer`
- **אתר** - מזהה domain ו-path
- **דף נחיתה** - מזהה לפי URL structure
- **אחר** - fallback למיקום ברירת מחדל

הזיהוי מתבצע אוטומטית בצד השרת או בקליינט לפי ה-URL.

---

## 📦 קוד הקומפוננטה המלא

### React Version (מקורי):

```typescript
// src/pages/Distribution.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Copy, 
  Eye, 
  Edit, 
  Trash2,
  Bot,
  ExternalLink,
  FileText,
  MessageCircle,
  QrCode,
  Plus
} from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import automationTemplates, { getUserBranding } from "@/lib/automationTemplates";
import { generateQuestionnaireThankYouEmail } from "@/lib/automationTemplates";

const Distribution = () => {
  const navigate = useNavigate();

  // Mock surveys data - החלף בנתונים שלך
  const surveys = [{
    id: "s-101",
    name: "שאלון שירותי ייעוץ עסקי"
  }, {
    id: "s-102",
    name: "שאלון שביעות רצון לקוחות"
  }, {
    id: "s-103",
    name: "שאלון אבחון צרכים"
  }];

  const [selectedSurveyId, setSelectedSurveyId] = useState<string>("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [showTemplatePreview, setShowTemplatePreview] = useState<string | null>(null);

  const templates = automationTemplates.getAll().filter(t => t.triggerType === "lead");

  // זיהוי אוטומטי של מיקום הלינק
  const detectLinkContext = (): { type: 'whatsapp' | 'website' | 'landing' | 'other', source?: string } => {
    if (typeof window === 'undefined') return { type: 'other' };
    
    const url = window.location.href;
    const referrer = document.referrer;
    
    // זיהוי WhatsApp
    if (url.includes('wa.me') || url.includes('whatsapp.com') || referrer.includes('whatsapp')) {
      return { type: 'whatsapp', source: referrer || url };
    }
    
    // זיהוי אתר (יש domain מותאם)
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1' && !hostname.includes('vercel.app')) {
      return { type: 'website', source: hostname };
    }
    
    // זיהוי דף נחיתה (יש path structure מסוים)
    if (window.location.pathname.includes('/landing') || window.location.pathname.includes('/lp')) {
      return { type: 'landing', source: window.location.pathname };
    }
    
    return { type: 'other' };
  };

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const linkContext = detectLinkContext();

  const getLink = (type: "form" | "chat" | "qr") => {
    if (!selectedSurveyId) return "";
    // הלינק מזהה אוטומטית את המיקום לפי הקונטקסט
    const context = linkContext;
    return `${baseUrl}/${type}/${selectedSurveyId}${context.type !== 'other' ? `?source=${context.type}` : ''}`;
  };

  const handleCopyLink = (link: string, type: string) => {
    if (!link) {
      toast.error("אין קישור להעתקה");
      return;
    }
    navigator.clipboard.writeText(link);
    toast.success("הקישור הועתק ללוח");
  };

  const handlePreviewLink = (link: string, type: string) => {
    if (!link) {
      toast.error("אין קישור להצגה");
      return;
    }
    window.open(link, '_blank');
  };

  const handlePreviewTemplate = () => {
    if (selectedTemplateId === "none") {
      toast.info("לא נבחרה תבנית מענה אוטומטי");
      return;
    }
    setShowTemplatePreview(showTemplatePreview === selectedTemplateId ? null : selectedTemplateId);
  };

  const handleEdit = () => {
    if (!selectedSurveyId) {
      toast.error("בחר שאלון תחילה");
      return;
    }
    navigate(`/create-questionnaire?id=${selectedSurveyId}`);
  };

  const handleDelete = () => {
    if (!selectedSurveyId) {
      toast.error("בחר שאלון תחילה");
      return;
    }
    if (confirm("האם אתה בטוח שברצונך למחוק את השאלון הזה?")) {
      toast.success("השאלון נמחק בהצלחה");
      setSelectedSurveyId("");
      setSelectedTemplateId("");
    }
  };

  const getTemplatePreviewHTML = () => {
    if (selectedTemplateId === "none" || !selectedTemplateId) return "";

    const template = templates.find(t => t.id === selectedTemplateId);
    if (!template) return "";

    const branding = getUserBranding();
    const htmlEmail = generateQuestionnaireThankYouEmail({
      firstName: "דוגמה",
      businessName: branding.businessName || "העסק שלי",
      questionnaireTitle: surveys.find(s => s.id === selectedSurveyId)?.name || "שאלון",
      logoUrl: branding.logoUrl,
      profileImageUrl: branding.profileImageUrl,
      personalMessage: template.body || ""
    });

    return htmlEmail;
  };

  const linkTypes = [
    { 
      id: "form", 
      name: "טופס", 
      icon: FileText, 
      label: "לינק טופס",
      link: getLink("form")
    },
    { 
      id: "chat", 
      name: "צ'אט", 
      icon: MessageCircle, 
      label: "לינק צ'אט",
      link: getLink("chat")
    },
    { 
      id: "qr", 
      name: "QR", 
      icon: QrCode, 
      label: "לינק QR",
      link: getLink("qr")
    }
  ];

  return (
    <MainLayout initialState="content">
      <div className="flex flex-col w-full space-y-6 p-4 md:p-8 bg-background" dir="rtl">
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">הפצת שאלונים</h1>
          <p className="text-xl text-muted-foreground">בחר שאלון, תבנית וצור קישורי הפצה</p>
        </div>

        <div className="max-w-4xl mx-auto w-full space-y-6">
          <Card className="border-0 shadow-md bg-gradient-to-br from-blue-500/10 to-blue-500/5 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <label className="block text-sm font-semibold mb-3 text-right text-foreground">שלב 1: בחר שאלון</label>
              <Select value={selectedSurveyId} onValueChange={setSelectedSurveyId}>
                <SelectTrigger className="bg-background border-border text-right">
                  <SelectValue placeholder="בחר שאלון להפצה" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50 border-border">
                  {surveys.map(survey => (
                    <SelectItem key={survey.id} value={survey.id} className="text-right">
                      {survey.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {selectedSurveyId && (
            <Card className="border-0 shadow-md bg-gradient-to-br from-green-500/10 to-green-500/5 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-right text-foreground">
                    שלב 2: בחר מענה אוטומטי ללקוח <span className="text-destructive">*</span>
                  </label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/automations?tab=templates")}
                    className="gap-2 hover:bg-primary/10 hover:border-primary/50"
                  >
                    <Plus className="h-4 w-4" />
                    צור מענה חדש ללקוח
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                
                <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
                  <SelectTrigger className="bg-background border-border text-right">
                    <SelectValue placeholder="בחר תבנית מענה או ללא מענה אוטומטי" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50 border-border">
                    <SelectItem value="none" className="text-right">
                      ללא מענה אוטומטי ללקוח
                    </SelectItem>
                    {templates.map(template => (
                      <SelectItem key={template.id} value={template.id} className="text-right">
                        <div className="flex items-center gap-2">
                          <Bot className="h-3 w-3 text-primary" />
                          {template.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedTemplateId !== "none" && selectedTemplateId !== "" && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Bot className="h-3 w-3 text-primary" />
                    <span>תבנית זו נלקחה מבוט</span>
                  </div>
                )}
                
                {!selectedTemplateId || selectedTemplateId === "" ? (
                  <p className="mt-3 text-xs text-destructive text-right">
                    יש לבחור מענה אוטומטי או "ללא מענה אוטומטי ללקוח" כדי להמשיך
                  </p>
                ) : null}
              </CardContent>
            </Card>
          )}

          {selectedSurveyId && selectedTemplateId && selectedTemplateId !== "" && (
            <Card className="border-0 shadow-md bg-gradient-to-br from-purple-500/10 to-purple-500/5 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <label className="block text-sm font-semibold mb-4 text-right text-foreground">
                  שלב 3: קישורי הפצה
                </label>
                
                {/* הודעה על זיהוי אוטומטי */}
                {linkContext.type !== 'other' && (
                  <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                    <p className="text-xs text-foreground text-right">
                      <Bot className="h-3 w-3 inline ml-1" />
                      הלינק יזהה אוטומטית: <strong>{linkContext.type === 'whatsapp' ? 'WhatsApp' : linkContext.type === 'website' ? 'אתר' : 'דף נחיתה'}</strong>
                    </p>
                  </div>
                )}
                
                <div className="space-y-4">
                  {linkTypes.map((linkType) => {
                    const Icon = linkType.icon;
                    return (
                      <div key={linkType.id} className="bg-card border border-border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-3">
                          <Icon className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-foreground">{linkType.label}</span>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
                          <div className="flex items-center justify-between gap-2">
                            <code className="text-sm text-muted-foreground break-all flex-1 text-right">
                              {linkType.link || "לא זמין - בחר שאלון תחילה"}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopyLink(linkType.link, linkType.id)}
                              className="flex-shrink-0 hover:bg-primary/10"
                              disabled={!linkType.link}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePreviewLink(linkType.link, linkType.id)}
                            className="gap-2 hover:bg-primary/10 hover:border-primary/50"
                            disabled={!linkType.link}
                          >
                            <Eye className="h-4 w-4" />
                            הצג {linkType.name}
                          </Button>
                          
                          {selectedTemplateId !== "none" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handlePreviewTemplate}
                              className="gap-2 hover:bg-primary/10 hover:border-primary/50"
                            >
                              <Bot className="h-4 w-4" />
                              דמו מענה ללקוח
                            </Button>
                          )}
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleEdit}
                            className="gap-2 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/20"
                          >
                            <Edit className="h-4 w-4" />
                            עריכה
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDelete}
                            className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive/50"
                          >
                            <Trash2 className="h-4 w-4" />
                            מחיקה
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {showTemplatePreview && selectedTemplateId !== "none" && (
            <Card className="border-0 shadow-md bg-gradient-to-br from-orange-500/10 to-orange-500/5 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                      דמו מענה ללקוח
                    </h3>
                    <span className="text-xs text-muted-foreground">(איך יוצג ללקוח)</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTemplatePreview(null)}
                    className="hover:bg-primary/10"
                  >
                    סגור
                  </Button>
                </div>
                
                <div className="border border-border rounded-lg overflow-hidden bg-card">
                  <div className="bg-muted/50 px-3 py-2 border-b border-border">
                    <span className="text-xs font-medium text-foreground">תצוגה מקדימה של האימייל האוטומטי:</span>
                  </div>
                  <div 
                    className="bg-white dark:bg-gray-900 p-4 max-h-96 overflow-y-auto"
                    dangerouslySetInnerHTML={{ 
                      __html: getTemplatePreviewHTML() 
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {!selectedSurveyId && (
            <Card className="border-0 shadow-md bg-gradient-to-br from-gray-500/10 to-gray-500/5">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">בחר שאלון מהרשימה למעלה כדי להתחיל</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Distribution;
```

---

## 🔄 גרסת Angular (תרגום)

### distribution.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Survey {
  id: string;
  name: string;
}

interface Template {
  id: string;
  name: string;
  triggerType: 'lead' | 'comment';
  channel: 'email' | 'whatsapp';
  body: string;
  isDefault: boolean;
}

interface LinkContext {
  type: 'whatsapp' | 'website' | 'landing' | 'other';
  source?: string;
}

@Component({
  selector: 'app-distribution',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './distribution.component.html',
  styleUrl: './distribution.component.css'
})
export class DistributionComponent implements OnInit {
  // Mock data - החלף בנתונים שלך
  surveys: Survey[] = [
    { id: 's-101', name: 'שאלון שירותי ייעוץ עסקי' },
    { id: 's-102', name: 'שאלון שביעות רצון לקוחות' },
    { id: 's-103', name: 'שאלון אבחון צרכים' }
  ];

  selectedSurveyId: string = '';
  selectedTemplateId: string = '';
  showTemplatePreview: boolean = false;
  templates: Template[] = [];
  
  linkTypes = [
    { id: 'form', name: 'טופס', label: 'לינק טופס' },
    { id: 'chat', name: 'צ\'אט', label: 'לינק צ\'אט' },
    { id: 'qr', name: 'QR', label: 'לינק QR' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // טען תבניות - החלף ב-service call
    this.loadTemplates();
  }

  loadTemplates() {
    // this.templates = this.automationService.getAll().filter(t => t.triggerType === 'lead');
  }

  // זיהוי אוטומטי של מיקום הלינק
  detectLinkContext(): LinkContext {
    if (typeof window === 'undefined') return { type: 'other' };
    
    const url = window.location.href;
    const referrer = document.referrer;
    
    // זיהוי WhatsApp
    if (url.includes('wa.me') || url.includes('whatsapp.com') || referrer.includes('whatsapp')) {
      return { type: 'whatsapp', source: referrer || url };
    }
    
    // זיהוי אתר
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return { type: 'website', source: hostname };
    }
    
    // זיהוי דף נחיתה
    if (window.location.pathname.includes('/landing') || window.location.pathname.includes('/lp')) {
      return { type: 'landing', source: window.location.pathname };
    }
    
    return { type: 'other' };
  }

  getLink(type: 'form' | 'chat' | 'qr'): string {
    if (!this.selectedSurveyId) return '';
    const context = this.detectLinkContext();
    const baseUrl = window.location.origin;
    return `${baseUrl}/${type}/${this.selectedSurveyId}${context.type !== 'other' ? `?source=${context.type}` : ''}`;
  }

  handleCopyLink(link: string) {
    if (!link) {
      // toast.error('אין קישור להעתקה');
      return;
    }
    navigator.clipboard.writeText(link);
    // toast.success('הקישור הועתק ללוח');
  }

  handlePreviewLink(link: string) {
    if (!link) return;
    window.open(link, '_blank');
  }

  handleEdit() {
    if (!this.selectedSurveyId) return;
    this.router.navigate(['/create-questionnaire'], { queryParams: { id: this.selectedSurveyId } });
  }

  handleDelete() {
    if (!this.selectedSurveyId) return;
    if (confirm('האם אתה בטוח שברצונך למחוק את השאלון הזה?')) {
      // API call למחיקה
      this.selectedSurveyId = '';
      this.selectedTemplateId = '';
    }
  }

  getLinkContextType(): string {
    const context = this.detectLinkContext();
    switch(context.type) {
      case 'whatsapp': return 'WhatsApp';
      case 'website': return 'אתר';
      case 'landing': return 'דף נחיתה';
      default: return '';
    }
  }

  showLinkContext(): boolean {
    return this.detectLinkContext().type !== 'other';
  }
}
```

### distribution.component.html

```html
<div class="flex flex-col w-full space-y-6 p-4 md:p-8 bg-background" dir="rtl">
  <!-- Header -->
  <div class="text-center max-w-4xl mx-auto mb-8">
    <h1 class="text-3xl md:text-5xl font-bold text-foreground mb-2">הפצת שאלונים</h1>
    <p class="text-xl text-muted-foreground">בחר שאלון, תבנית וצור קישורי הפצה</p>
  </div>

  <div class="max-w-4xl mx-auto w-full space-y-6">
    <!-- שלב 1: בחירת שאלון -->
    <div class="border-0 shadow-md bg-gradient-to-br from-blue-500/10 to-blue-500/5 hover:shadow-lg transition-shadow rounded-lg">
      <div class="p-6">
        <label class="block text-sm font-semibold mb-3 text-right text-foreground">שלב 1: בחר שאלון</label>
        <select [(ngModel)]="selectedSurveyId" class="w-full p-2 border rounded">
          <option value="">בחר שאלון להפצה</option>
          <option *ngFor="let survey of surveys" [value]="survey.id">{{ survey.name }}</option>
        </select>
      </div>
    </div>

    <!-- שלב 2: בחירת מענה אוטומטי -->
    <div *ngIf="selectedSurveyId" class="border-0 shadow-md bg-gradient-to-br from-green-500/10 to-green-500/5 hover:shadow-lg transition-shadow rounded-lg">
      <div class="p-6">
        <div class="flex items-center justify-between mb-3">
          <label class="block text-sm font-semibold text-right text-foreground">
            שלב 2: בחר מענה אוטומטי ללקוח <span class="text-destructive">*</span>
          </label>
          <button (click)="router.navigate(['/automations'], { queryParams: { tab: 'templates' } })" 
                  class="px-4 py-2 border rounded hover:bg-primary/10">
            צור מענה חדש ללקוח
          </button>
        </div>
        
        <select [(ngModel)]="selectedTemplateId" class="w-full p-2 border rounded">
          <option value="">בחר תבנית מענה או ללא מענה אוטומטי</option>
          <option value="none">ללא מענה אוטומטי ללקוח</option>
          <option *ngFor="let template of templates" [value]="template.id">
            {{ template.name }}
          </option>
        </select>
        
        <p *ngIf="!selectedTemplateId || selectedTemplateId === ''" 
           class="mt-3 text-xs text-destructive text-right">
          יש לבחור מענה אוטומטי או "ללא מענה אוטומטי ללקוח" כדי להמשיך
        </p>
      </div>
    </div>

    <!-- שלב 3: קישורי הפצה -->
    <div *ngIf="selectedSurveyId && selectedTemplateId && selectedTemplateId !== ''" 
         class="border-0 shadow-md bg-gradient-to-br from-purple-500/10 to-purple-500/5 hover:shadow-lg transition-shadow rounded-lg">
      <div class="p-6">
        <label class="block text-sm font-semibold mb-4 text-right text-foreground">
          שלב 3: קישורי הפצה
        </label>
        
        <!-- הודעה על זיהוי אוטומטי -->
        <div *ngIf="showLinkContext()" class="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <p class="text-xs text-foreground text-right">
            הלינק יזהה אוטומטית: <strong>{{ getLinkContextType() }}</strong>
          </p>
        </div>
        
        <div class="space-y-4">
          <div *ngFor="let linkType of linkTypes" 
               class="bg-card border border-border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 mb-3">
              <span class="font-semibold text-foreground">{{ linkType.label }}</span>
            </div>

            <div class="bg-muted/50 rounded-lg p-3 border border-border/50">
              <div class="flex items-center justify-between gap-2">
                <code class="text-sm text-muted-foreground break-all flex-1 text-right">
                  {{ getLink(linkType.id) || 'לא זמין - בחר שאלון תחילה' }}
                </code>
                <button (click)="handleCopyLink(getLink(linkType.id))" 
                        [disabled]="!getLink(linkType.id)"
                        class="p-2 hover:bg-primary/10">
                  העתק
                </button>
              </div>
            </div>

            <div class="flex items-center gap-2 flex-wrap pt-2">
              <button (click)="handlePreviewLink(getLink(linkType.id))" 
                      [disabled]="!getLink(linkType.id)"
                      class="px-4 py-2 border rounded hover:bg-primary/10">
                הצג {{ linkType.name }}
              </button>
              
              <button *ngIf="selectedTemplateId !== 'none'" 
                      (click)="showTemplatePreview = !showTemplatePreview"
                      class="px-4 py-2 border rounded hover:bg-primary/10">
                דמו מענה ללקוח
              </button>
              
              <button (click)="handleEdit()" 
                      class="px-4 py-2 border rounded hover:bg-blue-50">
                עריכה
              </button>
              
              <button (click)="handleDelete()" 
                      class="px-4 py-2 border rounded text-destructive hover:bg-destructive/10">
                מחיקה
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- תצוגה מקדימה -->
    <div *ngIf="showTemplatePreview && selectedTemplateId !== 'none'" 
         class="border-0 shadow-md bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-lg">
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-foreground">דמו מענה ללקוח</h3>
          <button (click)="showTemplatePreview = false" class="p-2 hover:bg-primary/10">
            סגור
          </button>
        </div>
        <div class="border border-border rounded-lg overflow-hidden bg-card">
          <div [innerHTML]="getTemplatePreviewHTML()"></div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 🔑 נקודות מפתח למעבר ל-Angular:

1. **State Management**: `useState` → properties ב-component
2. **Navigation**: `useNavigate` → `Router` service
3. **Conditional Rendering**: `{condition && <div>}` → `*ngIf="condition"`
4. **Lists**: `.map()` → `*ngFor`
5. **Events**: `onClick` → `(click)`
6. **Binding**: `value={x}` → `[value]="x"` או `[(ngModel)]="x"`
7. **HTML Injection**: `dangerouslySetInnerHTML` → `[innerHTML]`

---

## 📌 הערות על זיהוי אוטומטי של הלינק:

הפונקציה `detectLinkContext()` מזהה אוטומטית:
- **WhatsApp**: דרך URL או referrer
- **אתר**: לפי hostname
- **דף נחיתה**: לפי path
- **אחר**: fallback

הלינק מוסיף פרמטר `?source=whatsapp/website/landing` כדי שהשרת ידע מאיפה הגיע.

---

הקוד מוכן! העתק והתאם ל-Angular לפי ההסברים למעלה.


