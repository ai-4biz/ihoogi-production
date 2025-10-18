import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Eye, Mail, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EmailDesign {
  id: string;
  name: string;
  category: string;
  color: string;
  gradient: string;
  description: string;
  preview: string;
  htmlCode: string;
  features: string[];
  emoji: string;
}

const EmailDesigns = () => {
  const [selectedDesign, setSelectedDesign] = useState<EmailDesign | null>(null);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");

  // Colors from app theme: primary: hsl(221.2, 83.2%, 53.3%), secondary: hsl(210, 40%, 96.1%)
const emailDesigns: EmailDesign[] = [
    {
      id: "registration",
      name: "אישור הרשמה",
      category: "onboarding",
      color: "blue",
      gradient: "from-blue-600 to-blue-700",
      emoji: "🎉",
      description: "תבנית מעוצבת לקבלת פנים חמה למשתמשים חדשים",
      features: [
        "רקע גרדיאנט כחול-סגול",
        "לוגו הוגי עם תגית 👋",
        "קופסת פרטי משתמש מעוצבת",
        "כפתור CTA בולט",
        "טיפ מהוגי בקופסה צהובה"
      ],
      preview: "/email-preview-registration.png",
      htmlCode: `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, hsl(221.2, 83.2%, 53.3%) 0%, hsl(217.2, 91.2%, 59.8%) 100%);">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: white; border-radius: 20px; padding: 0; box-shadow: 0 20px 60px rgba(0,0,0,0.2); overflow: hidden;">
      
      <!-- Header with Hoogi Avatar -->
      <div style="background: linear-gradient(135deg, hsl(221.2, 83.2%, 53.3%) 0%, hsl(217.2, 91.2%, 59.8%) 100%); padding: 40px 30px; text-align: center;">
        <div style="display: inline-block; position: relative;">
          <img src="/hoogi-new-avatar.png" alt="Hoogi" style="width: 100px; height: 100px; border-radius: 50%; border: 5px solid white; box-shadow: 0 8px 20px rgba(0,0,0,0.2);">
          <div style="position: absolute; bottom: -5px; right: -5px; background: hsl(221.2, 83.2%, 53.3%); width: 30px; height: 30px; border-radius: 50%; border: 3px solid white;">
            <span style="font-size: 16px;">👋</span>
          </div>
        </div>
        <h1 style="color: white; font-size: 32px; margin: 20px 0 0 0; font-weight: 700;">ברוכים הבאים ל-Hoogi!</h1>
      </div>
      
      <!-- Content -->
      <div style="padding: 40px 30px; direction: rtl; text-align: right;">
        <p style="font-size: 20px; color: #1f2937; font-weight: 600;">היי {{userName}},</p>
        <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">תודה רבה שהצטרפת אלינו! 🎉</p>
        
        <!-- Info Box -->
        <div style="background: linear-gradient(135deg, hsl(210, 40%, 96.1%) 0%, hsl(210, 40%, 98%) 100%); border-right: 5px solid hsl(221.2, 83.2%, 53.3%); padding: 25px; border-radius: 15px; margin: 30px 0;">
          <h3 style="color: hsl(221.2, 83.2%, 53.3%); font-size: 20px;">👤 פרטי החשבון שלך</h3>
          <div style="background: white; padding: 15px; border-radius: 10px; margin-top: 15px;">
            <p style="margin: 8px 0; color: hsl(222.2, 84%, 4.9%);"><strong style="color: hsl(221.2, 83.2%, 53.3%);">📧 אימייל:</strong> {{userEmail}}</p>
            <p style="margin: 8px 0; color: hsl(222.2, 84%, 4.9%);"><strong style="color: hsl(221.2, 83.2%, 53.3%);">📅 תאריך הרשמה:</strong> {{registrationDate}}</p>
          </div>
        </div>
        
        <!-- CTA Button -->
        <div style="text-align: center; margin: 40px 0;">
          <a href="{{loginLink}}" style="background: linear-gradient(135deg, hsl(221.2, 83.2%, 53.3%) 0%, hsl(217.2, 91.2%, 59.8%) 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 30px; font-weight: 700; font-size: 18px; display: inline-block; box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);">
            🚀 התחל ליצור שאלונים עכשיו
          </a>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background: linear-gradient(135deg, hsl(210, 40%, 98%) 0%, hsl(210, 40%, 96.1%) 100%); border-top: 2px solid hsl(214.3, 31.8%, 91.4%); padding: 30px; text-align: center;">
        <p style="color: hsl(215.4, 16.3%, 46.9%); font-size: 13px;">© 2024 Hoogi. כל הזכויות שמורות.</p>
        <p style="color: hsl(215, 20.2%, 65.1%); font-size: 12px; margin: 5px 0 0 0;">נוצר עם ❤️ על ידי צוות Hoogi</p>
      </div>
      
    </div>
  </div>
</body>
</html>`
    },
    {
      id: "password-reset",
      name: "איפוס סיסמה",
      category: "security",
      color: "red",
      gradient: "from-red-500 to-rose-600",
      emoji: "🔐",
      description: "תבנית אבטחה מעוצבת לאיפוס סיסמה",
      features: [
        "רקע גרדיאנט אדום-ורוד",
        "לוגו הוגי עם תגית 🔐",
        "אזהרת אבטחה בצהוב",
        "כפתור איפוס בולט",
        "קופסת קישור מקווקו",
        "טיפ אבטחה מהוגי"
      ],
      preview: "/email-preview-password.png",
      htmlCode: `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, hsl(221.2, 83.2%, 53.3%) 0%, hsl(217.2, 91.2%, 59.8%) 100%);">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: white; border-radius: 20px; padding: 0; box-shadow: 0 20px 60px rgba(0,0,0,0.2); overflow: hidden;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, hsl(221.2, 83.2%, 53.3%) 0%, hsl(217.2, 91.2%, 59.8%) 100%); padding: 40px 30px; text-align: center;">
        <div style="display: inline-block; position: relative;">
          <img src="/hoogi-new-avatar.png" alt="Hoogi" style="width: 100px; height: 100px; border-radius: 50%; border: 5px solid white; box-shadow: 0 8px 20px rgba(0,0,0,0.2);">
          <div style="position: absolute; bottom: -5px; right: -5px; background: hsl(221.2, 83.2%, 53.3%); width: 30px; height: 30px; border-radius: 50%; border: 3px solid white;">
            <span style="font-size: 16px;">🔐</span>
          </div>
        </div>
        <h1 style="color: white; font-size: 32px; margin: 20px 0 0 0; font-weight: 700;">איפוס סיסמה</h1>
        <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin: 10px 0 0 0;">בקשת איפוס סיסמה לחשבון שלך 🔒</p>
      </div>
      
      <!-- Content -->
      <div style="padding: 40px 30px; direction: rtl; text-align: right;">
        <p style="font-size: 20px; color: #1f2937; font-weight: 600;">היי {{userName}},</p>
        
        <p style="font-size: 16px; margin-bottom: 25px; color: #4b5563; line-height: 1.6;">קיבלתי את הבקשה שלך לאיפוס סיסמה. אל דאגה, אני כאן לעזור! 🤝</p>
        
        <!-- Warning Box -->
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-right: 5px solid #f59e0b; padding: 25px; border-radius: 15px; margin: 30px 0;">
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <span style="font-size: 32px; margin-left: 15px;">⚠️</span>
            <h3 style="color: #92400e; margin: 0; font-size: 20px; font-weight: 700;">חשוב לדעת!</h3>
          </div>
          <div style="background: white; padding: 15px; border-radius: 10px;">
            <p style="margin: 8px 0; color: #92400e; font-size: 15px; line-height: 1.6;">
              <strong>🕐 הקישור תקף ל-{{expiryHours}} שעות בלבד</strong><br>
              אם לא ביקשת איפוס סיסמה, אתה יכול להתעלם מהמייל הזה והסיסמה שלך תישאר ללא שינוי.
            </p>
          </div>
        </div>
        
        <!-- CTA Button -->
        <div style="text-align: center; margin: 40px 0;">
          <a href="{{resetLink}}" style="background: linear-gradient(135deg, hsl(221.2, 83.2%, 53.3%) 0%, hsl(217.2, 91.2%, 59.8%) 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 30px; font-weight: 700; font-size: 18px; display: inline-block; box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);">
            🔐 אפס את הסיסמה שלך
          </a>
        </div>
      </div>
      
    </div>
  </div>
</body>
</html>`
    },
    {
      id: "support-response",
      name: "תשובה לתמיכה",
      category: "support",
      color: "green",
      gradient: "from-green-500 to-emerald-600",
      emoji: "💬",
      description: "תבנית ירוקה לתשובות תמיכה",
      features: [
        "רקע גרדיאנט ירוק",
        "לוגו הוגי עם תגית 💬",
        "פרטי פנייה בירוק בהיר",
        "תשובת תמיכה בכחול",
        "קופסת עזרה נוספת"
      ],
      preview: "/email-preview-support.png",
      htmlCode: `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: white; border-radius: 20px; padding: 0; box-shadow: 0 20px 60px rgba(0,0,0,0.2); overflow: hidden;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
        <div style="display: inline-block; position: relative;">
          <img src="/hoogi-new-avatar.png" alt="Hoogi" style="width: 100px; height: 100px; border-radius: 50%; border: 5px solid white; box-shadow: 0 8px 20px rgba(0,0,0,0.2);">
          <div style="position: absolute; bottom: -5px; right: -5px; background: #2D66F2; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white;">
            <span style="font-size: 16px;">💬</span>
          </div>
        </div>
        <h1 style="color: white; font-size: 32px; margin: 20px 0 0 0;">קיבלת תשובה!</h1>
      </div>
      
      <!-- Content -->
      <div style="padding: 40px 30px; direction: rtl; text-align: right;">
        <p style="font-size: 20px; color: #1f2937; font-weight: 600;">היי {{userName}},</p>
        
        <!-- Ticket Info -->
        <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border-right: 5px solid #10b981; padding: 25px; border-radius: 15px; margin: 30px 0;">
          <h3 style="color: #065f46;">📋 פרטי הפנייה</h3>
          <div style="background: white; padding: 15px; border-radius: 10px;">
            <p><strong>🔢 מספר:</strong> {{ticketNumber}}</p>
            <p><strong>📝 נושא:</strong> {{ticketSubject}}</p>
          </div>
        </div>
        
        <!-- Response Box -->
        <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-right: 5px solid #2D66F2; padding: 25px; border-radius: 15px; margin: 30px 0;">
          <h3 style="color: #1e40af;">💬 התשובה שלי</h3>
          <div style="background: white; padding: 20px; border-radius: 10px;">{{supportResponse}}</div>
        </div>
      </div>
      
    </div>
  </div>
</body>
</html>`
    },
    {
      id: "partner-invitation",
      name: "הזמנת שותף",
      category: "marketing",
      color: "orange",
      gradient: "from-orange-500 to-amber-600",
      emoji: "🤝",
      description: "תבנית כתומה להזמנות שותפים",
      features: [
        "רקע גרדיאנט כתום-זהב",
        "לוגו הוגי עם תגית 🤝",
        "יתרונות בקופסאות צהובות",
        "כפתור הצטרפות ירוק",
        "קופסת דחיפות אדומה",
        "מידע נוסף בכחול"
      ],
      preview: "/email-preview-partner.png",
      htmlCode: `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: white; border-radius: 20px; padding: 0; box-shadow: 0 20px 60px rgba(0,0,0,0.2); overflow: hidden;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 30px; text-align: center;">
        <div style="display: inline-block; position: relative;">
          <img src="/hoogi-new-avatar.png" alt="Hoogi" style="width: 100px; height: 100px; border-radius: 50%; border: 5px solid white; box-shadow: 0 8px 20px rgba(0,0,0,0.2);">
          <div style="position: absolute; bottom: -5px; right: -5px; background: #10b981; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white;">
            <span style="font-size: 16px;">🤝</span>
          </div>
        </div>
        <h1 style="color: white; font-size: 32px; margin: 20px 0 0 0;">הזמנה מיוחדת!</h1>
      </div>
      
      <!-- Content -->
      <div style="padding: 40px 30px; direction: rtl; text-align: right;">
        <p style="font-size: 20px; color: #1f2937; font-weight: 600;">היי {{partnerName}},</p>
        
        <!-- Benefits Box -->
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-right: 5px solid #f59e0b; padding: 25px; border-radius: 15px; margin: 30px 0;">
          <h3 style="color: #92400e;">💰 למה כדאי להצטרף?</h3>
          <div style="background: white; padding: 20px; border-radius: 10px;">
            <p><strong>💸 עמלה של {{commissionRate}}%</strong></p>
            <p><strong>🎨 חומרי שיווק מקצועיים</strong></p>
            <p><strong>🛠️ תמיכה טכנית מלאה</strong></p>
          </div>
        </div>
        
        <!-- CTA Button -->
        <div style="text-align: center; margin: 40px 0;">
          <a href="{{invitationLink}}" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 30px; font-weight: 700; font-size: 18px; display: inline-block;">
            🤝 אני רוצה להצטרף!
          </a>
        </div>
      </div>
      
    </div>
  </div>
</body>
</html>`
    }
  ];

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "📋 הועתק ללוח!",
      description: "קוד ה-HTML הועתק בהצלחה",
    });
  };

  const categories = [
    { id: "all", label: "הכל", emoji: "📧" },
    { id: "onboarding", label: "הצטרפות", emoji: "🎉" },
    { id: "security", label: "אבטחה", emoji: "🔐" },
    { id: "support", label: "תמיכה", emoji: "💬" },
    { id: "marketing", label: "שיווק", emoji: "🤝" }
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredDesigns = selectedCategory === "all" 
    ? emailDesigns 
    : emailDesigns.filter(d => d.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🎨 גלריית עיצובי מייל</h1>
        <p className="text-gray-600">כל תבניות המייל המעוצבות שבניתי - מוכנות לשימוש!</p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat.id)}
            className="gap-2"
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
            {cat.id === "all" && (
              <Badge variant="secondary" className="mr-2">
                {emailDesigns.length}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Designs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {filteredDesigns.map((design) => (
          <Card 
            key={design.id} 
            className={`hover:shadow-lg transition-all cursor-pointer border border-border/50 ${
              selectedDesign?.id === design.id ? 'ring-2 ring-primary shadow-primary/20' : ''
            }`}
            onClick={() => setSelectedDesign(design)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`text-4xl`}>{design.emoji}</div>
                  <div>
                    <CardTitle className="text-xl">{design.name}</CardTitle>
                    <p className="text-sm text-gray-600">{design.description}</p>
                  </div>
                </div>
                <Badge className={`bg-gradient-to-r ${design.gradient} text-white`}>
                  {design.color}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Preview Box */}
              <div className={`bg-gradient-to-br ${design.gradient} p-6 rounded-lg mb-4 h-40 flex items-center justify-center`}>
                <div className="text-white text-center">
                  <div className="text-5xl mb-2">{design.emoji}</div>
                  <p className="font-semibold">{design.name}</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-4">
                {design.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDesign(design);
                    setViewMode("preview");
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  תצוגה מקדימה
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(design.htmlCode);
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Design Detail */}
      {selectedDesign && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedDesign.emoji}</span>
                <div>
                  <CardTitle className="text-2xl">{selectedDesign.name}</CardTitle>
                  <p className="text-gray-600">{selectedDesign.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === "preview" ? "code" : "preview")}
                >
                  {viewMode === "preview" ? "קוד" : "תצוגה מקדימה"}
                </Button>
                <Button
                  size="sm"
                  onClick={() => copyToClipboard(selectedDesign.htmlCode)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  העתק קוד
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="preview">תצוגה מקדימה</TabsTrigger>
                <TabsTrigger value="code">קוד HTML</TabsTrigger>
              </TabsList>

              <TabsContent value="preview">
                <div className="space-y-4">
                  {/* Features List */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span>✨</span>
                      <span>תכונות העיצוב</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedDesign.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Live Preview */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Eye className="w-5 h-5" />
                        תצוגה חיה
                      </h3>
                      <Badge>HTML Live</Badge>
                    </div>
                    <div 
                      className="bg-white rounded-lg overflow-auto max-h-[600px]"
                      dangerouslySetInnerHTML={{ __html: selectedDesign.htmlCode }}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="code">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <span className="font-semibold">קוד HTML מלא</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(selectedDesign.htmlCode)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      העתק הכל
                    </Button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-auto max-h-[600px] text-sm font-mono">
                    <code>{selectedDesign.htmlCode}</code>
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Quick Tips */}
      <Card className="mt-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>💡</span>
            <span>טיפים לשימוש</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Copy className="w-4 h-4 text-primary" />
                העתק קוד
              </h4>
              <p className="text-sm text-gray-600">
                לחץ על "העתק קוד" והדבק ישירות במערכת המיילים שלך
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                התאם אישית
              </h4>
              <p className="text-sm text-gray-600">
                החלף את המשתנים {"{{userName}}"} בפרטים האמיתיים
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-purple-600" />
                בדוק בדפדפן
              </h4>
              <p className="text-sm text-gray-600">
                שמור את הקוד כקובץ .html ופתח בדפדפן לבדיקה
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailDesigns;

