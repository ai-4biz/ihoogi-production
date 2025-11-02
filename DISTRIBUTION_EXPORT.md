# מדריך העברת דף הפצה לפרויקט שלך

## 📦 1. קבצים נדרשים

### A. קובץ הקומפוננטה הראשית: `Distribution.tsx`

```typescript
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout"; // או Layout שלך
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

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  const getLink = (type: "form" | "chat" | "qr") => {
    if (!selectedSurveyId) return "";
    return `${baseUrl}/${type}/${selectedSurveyId}`;
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
    navigate(`/create-questionnaire?id=${selectedSurveyId}`); // שנה לנתיב שלך
  };

  const handleDelete = () => {
    if (!selectedSurveyId) {
      toast.error("בחר שאלון תחילה");
      return;
    }
    if (confirm("האם אתה בטוח שברצונך למחוק את השאלון הזה?")) {
      // כאן תהיה קריאה ל-API למחיקה
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

### B. פונקציות נדרשות מ-`automationTemplates.ts`

צריך ליצור קובץ `lib/automationTemplates.ts` עם הפונקציות הבאות:

```typescript
// automationTemplates.ts

export interface Template {
  id: string;
  name: string;
  triggerType: "lead" | "comment";
  channel: "email" | "whatsapp";
  subject?: string;
  body: string;
  isDefault: boolean;
  htmlBody?: string;
  logoUrl?: string;
  profileImageUrl?: string;
  businessName?: string;
}

export function getUserBranding() {
  try {
    const branding = localStorage.getItem('businessBranding');
    if (branding) {
      return JSON.parse(branding);
    }
  } catch (e) {
    console.error('Failed to load branding', e);
  }
  return {
    logoUrl: "",
    profileImageUrl: "",
    businessName: "העסק שלי"
  };
}

export function generateQuestionnaireThankYouEmail(params: {
  firstName: string;
  businessName: string;
  questionnaireTitle: string;
  logoUrl?: string;
  profileImageUrl?: string;
  businessImageUrl?: string;
  linkUrl?: string;
  linkText?: string;
  personalMessage?: string;
}): string {
  const branding = getUserBranding();
  const logoUrl = params.logoUrl || branding.logoUrl || "";
  const profileImageUrl = params.profileImageUrl || branding.profileImageUrl || "";
  const businessName = params.businessName || branding.businessName || "";
  return `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: white; border-radius: 20px; padding: 0; box-shadow: 0 20px 60px rgba(0,0,0,0.2); overflow: hidden;">
      <div style="background: linear-gradient(to left, #10b98120 0%, #10b98110 100%); padding: 30px; text-align: center; border-bottom: 2px solid #10b98140;">
        ${(logoUrl || profileImageUrl) ? `
          <div style="margin-bottom: 15px; display: flex; align-items: center; justify-content: center; gap: 12px;">
            ${logoUrl ? `<img src="${logoUrl}" alt="Logo" style="width: 64px; height: 64px; object-fit: contain;">` : ''}
            ${profileImageUrl ? `<img src="${profileImageUrl}" alt="Profile" style="width: 64px; height: 64px; object-fit: cover; border-radius: 8px;">` : ''}
          </div>
        ` : ''}
        ${businessName ? `<h2 style="font-size: 24px; color: #10b981; font-weight: bold; margin: 0 0 10px 0;">${businessName}</h2>` : ''}
        <p style="font-size: 16px; color: #059669; font-weight: 600; margin: 0;">פנייתך התקבלה – הצוות שלנו כבר מטפל בה.</p>
      </div>
      ${params.businessImageUrl ? `
      <div style="padding: 20px 30px; border-bottom: 1px solid #e5e7eb;">
        <img src="${params.businessImageUrl}" alt="Business Image" style="width: 100%; height: auto; border-radius: 12px; object-fit: cover;">
      </div>
      ` : ''}
      ${params.linkUrl ? `
      <div style="padding: 20px 30px; text-align: center; border-bottom: 1px solid #e5e7eb;">
        <a href="${params.linkUrl}" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
          ${params.linkText || "לצפייה"}
        </a>
      </div>
      ` : ''}
      <div style="padding: 30px; direction: rtl; text-align: right;">
        <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">תודה רבה על המענה ושהקדשת את הזמן! 👍</p>
      </div>
      <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-top: 2px solid #e5e7eb; padding: 30px; display: flex; align-items: center; justify-content: space-between; direction: rtl;">
        ${logoUrl ? `<img src="${logoUrl}" alt="Logo" style="width: 48px; height: 48px; object-contain;">` : '<div style="width: 48px; height: 48px;"></div>'}
        <div style="text-align: center; direction: rtl;">
          ${businessName ? `<p style="color: #1f2937; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">${businessName}</p>` : ''}
          <p style="color: #059669; font-size: 15px; font-weight: 600; margin: 0;">בברכה</p>
        </div>
      </div>
      <div style="background: #e5e7eb; border-top: 1px solid #d1d5db; padding: 20px; text-align: center; direction: rtl;">
        <p style="font-size: 11px; color: #6b7280; line-height: 1.6; margin: 0;">
          נשלח באופן אוטומטי באמצעות <a href="https://www.ai-4biz.com" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">iHoogi</a> – מערכת שאלונים חכמה המחברת עסקים ללקוחותיהם, מבית <a href="https://www.ai-4biz.com" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">AI-4Biz</a>, בשם העסק שמולו פנית.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// Template storage - החלף בנתונים שלך
let templates: Template[] = [
  {
    id: "1",
    name: "תבנית פנייה חדשה 1",
    triggerType: "lead",
    channel: "email",
    subject: "קיבלנו את פנייתך - {{businessName}}",
    body: "שלום {{firstName}},\n\nתודה שיצרת קשר עם {{businessName}}.\nפנייתך התקבלה ואנו נחזור אליך בהקדם.\n\nבברכה,\n{{businessName}}",
    isDefault: true
  },
  {
    id: "2",
    name: "תבנית פנייה קצרה",
    triggerType: "lead",
    channel: "whatsapp",
    body: "שלום {{firstName}}, תודה שיצרת קשר עם {{businessName}}. פנייתך התקבלה ואנו נחזור אליך בהקדם.",
    isDefault: true
  }
];

const automationTemplates = {
  getAll: (): Template[] => {
    return [...templates];
  },
  get: (triggerType: TriggerType, channel: ChannelType): Template[] => {
    return templates.filter(
      template => template.triggerType === triggerType && template.channel === channel
    );
  },
  getById: (id: string): Template | undefined => {
    return templates.find(template => template.id === id);
  }
};

export default automationTemplates;
```

## 📋 2. Dependencies נדרשים

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-router-dom": "^6.0.0",
    "lucide-react": "^0.263.0",
    "sonner": "^1.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
```

## 🎨 3. UI Components נדרשים (shadcn/ui)

צריך את הקומפוננטות הבאות:
- `Button` - `@/components/ui/button`
- `Card`, `CardContent` - `@/components/ui/card`
- `Select` - `@/components/ui/select`

## ⚡ 4. התקנה מהירה

```bash
# 1. התקן dependencies
npm install react-router-dom lucide-react sonner

# 2. הוסף UI components (אם משתמש ב-shadcn/ui)
npx shadcn-ui@latest add button card select

# 3. העתק את הקובץ Distribution.tsx לפרויקט שלך

# 4. צור את automationTemplates.ts עם הפונקציות

# 5. עדכן את ה-routes שלך:
# <Route path="/distribution" element={<Distribution />} />
```

## 🔧 5. התאמות נדרשות

1. **MainLayout** - שנה ל-Layout שלך או הסר
2. **surveys data** - החלף בנתונים שלך (API/State)
3. **templates** - החלף במנגנון התבניות שלך
4. **navigate paths** - עדכן לנתיבים שלך:
   - `/automations?tab=templates`
   - `/create-questionnaire?id=...`
5. **baseUrl** - עדכן אם יש לך base URL אחר

## ✅ 6. בדיקה מהירה

1. בדוק שהקומפוננטה נטענת
2. בדוק בחירת שאלון
3. בדוק בחירת תבנית
4. בדוק יצירת קישורים
5. בדוק תצוגה מקדימה

---

**💡 טיפ:** אם אתה צריך את כל הקוד של `generateQuestionnaireThankYouEmail`, אני יכול לשלוח גם אותו. זה קובץ של ~336 שורות עם HTML template מלא.

