import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Eye, MessageSquare, Mail, Smartphone, Info, AlertTriangle, CheckCircle, Clock, Users, Star, Heart } from "lucide-react";
import { toast } from "sonner";
import MainLayout from "@/components/layout/MainLayout";

interface MessageTemplate {
  id: string;
  type: string;
  title: string;
  description: string;
  content: string;
  category: string;
  icon: any;
  color: string;
  bgColor: string;
  usage: string;
  variables: string[];
}

const Messages = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);

  // סוגי הודעות שונים
  const messageTemplates: MessageTemplate[] = [
    // הודעות אינפורמציה
    {
      id: "info-welcome",
      type: "information",
      title: "הודעת ברוכים הבאים",
      description: "הודעה חמה ומזמינה ללקוח חדש",
      content: `שלום {{firstName}}! 

ברוכים הבאים ל-{{businessName}} 🎉

אנחנו שמחים לראות אותך כאן ונרגשים לעזור לך עם {{mainService}}.

האם תרצה לקבוע שיחת התייעצות חינם? זה יאפשר לנו להבין בדיוק מה אתה מחפש ולהציע לך את הפתרון המתאים ביותר.

ניתן לפנות אלינו:
📞 {{phone}}
📧 {{email}}
💬 {{whatsapp}}

בברכה,
צוות {{businessName}}`,
      category: "information",
      icon: Info,
      color: "text-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      usage: "שליחה אוטומטית ללקוח חדש",
      variables: ["firstName", "businessName", "mainService", "phone", "email", "whatsapp"]
    },
    {
      id: "info-service",
      type: "information",
      title: "מידע על השירותים",
      description: "הודעה מפורטת על השירותים שהעסק מציע",
      content: `שלום {{firstName}},

תודה על התעניינותך בשירותים שלנו! 

ב-{{businessName}} אנו מתמחים ב:
• {{service1}}
• {{service2}} 
• {{service3}}

כל שירות מותאם אישית לצרכים שלך ומבוצע על ידי מומחים מנוסים.

האם תרצה לשמוע יותר על אחד מהשירותים שלנו?

ניתן לפנות אלינו:
📞 {{phone}}
📧 {{email}}

בברכה,
{{businessName}}`,
      category: "information",
      icon: Info,
      color: "text-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      usage: "מענה על שאלות על שירותים",
      variables: ["firstName", "businessName", "service1", "service2", "service3", "phone", "email"]
    },

    // הודעות השלמת מידע
    {
      id: "missing-info",
      type: "missing-info",
      title: "בקשה להשלמת פרטים",
      description: "הודעה עדינה לבקשת מידע נוסף מהלקוח",
      content: `שלום {{firstName}},

תודה על הפנייה שלך! 

כדי שנוכל לעזור לך בצורה הטובה ביותר, נשמח לקבל ממך כמה פרטים נוספים:

• {{missingInfo1}}
• {{missingInfo2}}
• {{missingInfo3}}

זה יעזור לנו להכין עבורך הצעה מותאמת אישית.

ניתן לשלוח את הפרטים:
📧 {{email}}
💬 {{whatsapp}}

תודה על הסבלנות,
{{businessName}}`,
      category: "missing-info",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      usage: "כאשר חסרים פרטים מהלקוח",
      variables: ["firstName", "missingInfo1", "missingInfo2", "missingInfo3", "email", "whatsapp", "businessName"]
    },
    {
      id: "follow-up",
      type: "missing-info",
      title: "מעקב אחר פנייה",
      description: "הודעה לבקשת עדכון או מעקב",
      content: `שלום {{firstName}},

אני רוצה לעדכן אותך על הסטטוס של הפנייה שלך מ-{{date}}.

האם תוכל לעדכן אותנו:
• איך התקדמת עם {{topic}}?
• האם יש שאלות נוספות?
• האם תרצה לקבוע פגישה?

אנחנו כאן לעזור בכל שלב!

ניתן לפנות אלינו:
📞 {{phone}}
📧 {{email}}

בברכה,
{{businessName}}`,
      category: "missing-info",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      usage: "מעקב אחר לקוחות קיימים",
      variables: ["firstName", "date", "topic", "phone", "email", "businessName"]
    },

    // הודעות תודה
    {
      id: "thank-you",
      type: "thank-you",
      title: "הודעת תודה",
      description: "הודעה חמה של תודה ללקוח",
      content: `שלום {{firstName}},

תודה רבה על האמון שלך ב-{{businessName}}! 🙏

אנחנו מעריכים את הבחירה שלך בנו ומתחייבים לתת לך את השירות הטוב ביותר.

אם יש לך שאלות או צרכים נוספים, אנחנו כאן בשבילך.

ניתן לפנות אלינו בכל עת:
📞 {{phone}}
📧 {{email}}
💬 {{whatsapp}}

תודה שוב,
צוות {{businessName}}`,
      category: "thank-you",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "from-pink-50 to-pink-100",
      usage: "אחרי רכישה או קבלת שירות",
      variables: ["firstName", "businessName", "phone", "email", "whatsapp"]
    },
    {
      id: "feedback",
      type: "thank-you",
      title: "בקשת משוב",
      description: "הודעה לבקשת חוות דעת מהלקוח",
      content: `שלום {{firstName}},

אנחנו מקווים שנהנית מהשירות שלנו! 

המשוב שלך חשוב לנו מאוד ומעזור לנו להשתפר ולהציע שירות טוב יותר.

האם תוכל לקחת דקה ולשתף אותנו בחוויה שלך?

⭐ דרג אותנו: {{ratingLink}}
📝 כתוב ביקורת: {{reviewLink}}

תודה על הזמן שלך,
{{businessName}}`,
      category: "thank-you",
      icon: Star,
      color: "text-pink-600",
      bgColor: "from-pink-50 to-pink-100",
      usage: "בקשה לחוות דעת או דירוג",
      variables: ["firstName", "ratingLink", "reviewLink", "businessName"]
    },

    // הודעות סטטוס
    {
      id: "status-update",
      type: "status",
      title: "עדכון סטטוס",
      description: "הודעה לעדכון הלקוח על התקדמות",
      content: `שלום {{firstName}},

אני רוצה לעדכן אותך על ההתקדמות ב-{{projectName}}.

✅ מה הושלם:
{{completedTasks}}

🔄 מה בתהליך:
{{inProgressTasks}}

📅 הצעדים הבאים:
{{nextSteps}}

אם יש שאלות או הערות, אנחנו כאן!

ניתן לפנות אלינו:
📞 {{phone}}
📧 {{email}}

בברכה,
{{businessName}}`,
      category: "status",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "from-green-50 to-green-100",
      usage: "עדכון תקופתי על התקדמות פרויקט",
      variables: ["firstName", "projectName", "completedTasks", "inProgressTasks", "nextSteps", "phone", "email", "businessName"]
    },
    {
      id: "appointment",
      type: "status",
      title: "אישור פגישה",
      description: "הודעה לאישור פגישה או שיחה",
      content: `שלום {{firstName}},

פגישה שלנו נקבעה בהצלחה! 📅

📅 תאריך: {{date}}
🕐 שעה: {{time}}
📍 מקום: {{location}}
💬 נושא: {{subject}}

אם יש צורך לשנות או לבטל, אנא הודע לנו מראש.

מחכים לראות אותך!

ניתן לפנות אלינו:
📞 {{phone}}
📧 {{email}}

בברכה,
{{businessName}}`,
      category: "status",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "from-green-50 to-green-100",
      usage: "אישור פגישות או שיחות",
      variables: ["firstName", "date", "time", "location", "subject", "phone", "email", "businessName"]
    },

    // הודעות שיווקיות
    {
      id: "offer",
      type: "marketing",
      title: "הצעת מחיר מיוחדת",
      description: "הודעה שיווקית עם הצעה אטרקטיבית",
      content: `שלום {{firstName}},

יש לנו הצעה מיוחדת בשבילך! 🎉

{{offerDescription}}

💰 המחיר הרגיל: {{regularPrice}}
🔥 המחיר שלך: {{specialPrice}}
⏰ תקף עד: {{expiryDate}}

זהו הצעה מוגבלת - רק ללקוחות נבחרים!

להזמנה או למידע נוסף:
📞 {{phone}}
📧 {{email}}
💬 {{whatsapp}}

בברכה,
{{businessName}}`,
      category: "marketing",
      icon: Users,
      color: "text-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      usage: "הצעות שיווקיות וקידומים",
      variables: ["firstName", "offerDescription", "regularPrice", "specialPrice", "expiryDate", "phone", "email", "whatsapp", "businessName"]
    }
  ];

  const categories = [
    { id: "all", label: "כל ההודעות", icon: MessageSquare },
    { id: "information", label: "אינפורמציה", icon: Info, color: "text-blue-600" },
    { id: "missing-info", label: "השלמת מידע", icon: AlertTriangle, color: "text-orange-600" },
    { id: "thank-you", label: "תודה", icon: Heart, color: "text-pink-600" },
    { id: "status", label: "סטטוס", icon: CheckCircle, color: "text-green-600" },
    { id: "marketing", label: "שיווק", icon: Users, color: "text-purple-600" }
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTemplates = selectedCategory === "all" 
    ? messageTemplates 
    : messageTemplates.filter(template => template.category === selectedCategory);

  const handleCopyTemplate = (template: MessageTemplate) => {
    navigator.clipboard.writeText(template.content);
    toast.success("ההודעה הועתקה ללוח", {
      description: `"${template.title}" הועתק בהצלחה`
    });
  };

  const handlePreviewTemplate = (template: MessageTemplate) => {
    setSelectedTemplate(template);
  };

  const renderTemplateCard = (template: MessageTemplate) => {
    const IconComponent = template.icon;
    
    return (
      <Card key={template.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${template.bgColor}`}>
                <IconComponent className={`h-5 w-5 ${template.color}`} />
              </div>
              <div>
                <CardTitle className="text-lg">{template.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {template.usage}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="bg-muted/50 rounded-lg p-3 mb-4">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-3">
              {template.content.substring(0, 150)}...
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {template.variables.slice(0, 3).map((variable, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {`{{${variable}}}`}
                </Badge>
              ))}
              {template.variables.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{template.variables.length - 3} עוד
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePreviewTemplate(template)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyTemplate(template)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4 md:p-8" dir="rtl">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
              💬 ספריית הודעות
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              אוסף של תבניות הודעות מוכנות לשימוש - הודעות אינפורמציה, השלמת מידע, תודה, סטטוס ועוד
            </p>
          </div>

          {/* Categories */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map(renderTemplateCard)}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${selectedTemplate.bgColor}`}>
                    <selectedTemplate.icon className={`h-5 w-5 ${selectedTemplate.color}`} />
                  </div>
                  <div>
                    <CardTitle>{selectedTemplate.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTemplate(null)}
                >
                  ✕
                </Button>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                    {selectedTemplate.content}
                  </pre>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.variables.map((variable, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {`{{${variable}}}`}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleCopyTemplate(selectedTemplate)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    העתק הודעה
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Messages;
