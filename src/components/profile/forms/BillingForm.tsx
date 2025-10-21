
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import HoogiTip from "@/components/HoogiTip";
import { 
  CheckIcon, 
  Calendar, 
  CreditCard, 
  Download, 
  AlertCircle, 
  Zap, 
  Mail, 
  MessageSquare, 
  Clock, 
  Users, 
  Star,
  Handshake,
  Settings,
  Eye,
  EyeOff
} from "lucide-react";

const BillingForm = () => {
  const [billingInfo, setBillingInfo] = useState({
    plan: "pro",
    paymentMethod: "credit-card"
  });
  const [showCancelModal, setShowCancelModal] = useState(false);
  
  // Mock data - פרטי המנוי הנוכחי
  const currentPlan = {
    name: "Pro",
    price: "₪290",
    period: "חודשי",
    startDate: "15 במאי 2025",
    nextBilling: "15 ביוני 2025",
    leadsUsed: 87,
    leadsTotal: 300,
    whatsappRemaining: 245,
    emailRemaining: 198,
    remindersSent: 12,
    aiResponseType: "מענה אישי מעוצב + AI",
    questionnaires: 3
  };

  // Mock data - תשלומים אחרונים
  const recentPayments = [
    {
      date: "15 במאי 2025",
      type: "מנוי חודשי Pro",
      amount: "₪290",
      status: "שולם",
      invoice: "INV-2025-001"
    },
    {
      date: "20 במאי 2025",
      type: "+100 לידים",
      amount: "₪49",
      status: "שולם",
      invoice: "INV-2025-002"
    },
    {
      date: "15 באפריל 2025",
      type: "מנוי חודשי Pro",
      amount: "₪290",
      status: "שולם",
      invoice: "INV-2025-003"
    }
  ];

  const handlePlanChange = (value: string) => {
    setBillingInfo({
      ...billingInfo,
      plan: value
    });
  };

  const handlePaymentMethodChange = (value: string) => {
    setBillingInfo({
      ...billingInfo,
      paymentMethod: value
    });
  };

  const handleUpgrade = () => {
    toast.success(`שדרגת בהצלחה לתכנית ${billingInfo.plan}`);
  };

  const plans = [
    {
      id: "basic",
      name: "חינמי",
      price: "₪0",
      period: "חודשי",
      description: "לטעום את כל יכולות המערכת – חד פעמי",
      features: [
        "10 לידים בחודש",
        "1 שאלון פעיל",
        "מענה חכם (AI) מלא להתנסות",
        "עד 30 מייל",
        "עד 30 וואטסאפ",
        "תזכורות + עיצוב ממותג"
      ],
      isCurrent: false
    },
    {
      id: "basic-paid",
      name: "Basic",
      price: "₪179",
      period: "חודשי",
      description: "עצמאים קטנים שרוצים לנהל לידים פשוט",
      features: [
        "100 לידים בחודש",
        "1 שאלון פעיל",
        "מענה סטנדרטי / אישי (ללא AI)",
        "300 מייל (כולל 2 תזכורות)",
        "תזכורות מייל בלבד",
        "עיצוב ממותג"
      ],
      isCurrent: false
    },
    {
      id: "pro",
      name: "Pro",
      price: "₪290",
      period: "חודשי",
      description: "בעלי עסקים פעילים שרוצים אוטומציה מלאה",
      features: [
        "300 לידים בחודש",
        "3 שאלונים פעילים",
        "מענה אישי מעוצב + AI",
        "900 מייל",
        "300 וואטסאפ",
        "תזכורות מייל + וואטסאפ",
        "עיצוב ממותג"
      ],
      isCurrent: true
    },
    {
      id: "premium",
      name: "Premium",
      price: "₪480",
      period: "חודשי", 
      description: "משרדים וקהילות עם נפח לקוחות גבוה",
      features: [
        "600 לידים בחודש",
        "6 שאלונים פעילים",
        "מענה חכם + AI משולב (כולל למידת סגנון)",
        "1800 מייל",
        "600 וואטסאפ",
        "תזכורות חכם (עד 3 תזכורות)",
        "עיצוב ממותג"
      ],
      isCurrent: false
    }
  ];

  const addOns = [
    {
      id: "leads-100",
      name: "+100 לידים",
      price: "₪49",
      description: "הרחבת מכסת לידים (כולל 300 הודעות מייל)",
      icon: "🧲",
      note: "חד־פעמית; לא משנה את המנוי — הרווח גדל"
    },
    {
      id: "leads-300",
      name: "+300 לידים",
      price: "₪99",
      description: "הרחבה לעסקים פעילים (כולל 900 הודעות מייל)",
      icon: "🧲",
      note: "משתלם למנויי Basic/Pro"
    },
    {
      id: "leads-600",
      name: "+600 לידים",
      price: "₪149",
      description: "הרחבה גדולה (כולל 1800 הודעות מייל)",
      icon: "🧲",
      note: "למשרדים"
    },
    {
      id: "email-500",
      name: "+500 הודעות מייל",
      price: "₪29",
      description: "הודעות נוספות למענה או תזכורות",
      icon: "📧",
      note: "למי שעובר את המכסה"
    },
    {
      id: "whatsapp-500",
      name: "+500 הודעות וואטסאפ",
      price: "₪59",
      description: "תוספת הודעות וואטסאפ",
      icon: "💬",
      note: "מענה/תזכורות נוספות"
    },
    {
      id: "whatsapp-1000",
      name: "+1000 הודעות וואטסאפ",
      price: "₪99",
      description: "מיועד לקמפיינים ומשרדים גדולים",
      icon: "💬",
      note: "נרכש לפי הצורך בלבד"
    }
  ];

  // נתוני המנויים החדשים
  const subscriptionPlans = [
    {
      level: "חינמי",
      monthlyPrice: "₪0",
      monthlyLeads: "10",
      activeQuestionnaires: "1",
      customerResponse: "מענה חכם (AI) מלא להתנסות",
      emailMessages: "עד 30 מייל",
      whatsappMessages: "עד 30 וואטסאפ",
      reminders: "✅",
      brandedDesign: "✅",
      targetAudience: "לטעום את כל יכולות המערכת – חד פעמי"
    },
    {
      level: "Basic",
      monthlyPrice: "₪179",
      monthlyLeads: "100",
      activeQuestionnaires: "1",
      customerResponse: "מענה סטנדרטי / אישי (ללא AI)",
      emailMessages: "300 מייל (כולל 2 תזכורות)",
      whatsappMessages: "❌",
      reminders: "מייל בלבד",
      brandedDesign: "✅",
      targetAudience: "עצמאים קטנים שרוצים לנהל לידים פשוט"
    },
    {
      level: "Pro",
      monthlyPrice: "₪290",
      monthlyLeads: "300",
      activeQuestionnaires: "3",
      customerResponse: "מענה אישי מעוצב + AI",
      emailMessages: "900 מייל",
      whatsappMessages: "300 וואטסאפ",
      reminders: "מייל + וואטסאפ",
      brandedDesign: "✅",
      targetAudience: "בעלי עסקים פעילים שרוצים אוטומציה מלאה"
    },
    {
      level: "Premium",
      monthlyPrice: "₪480",
      monthlyLeads: "600",
      activeQuestionnaires: "6",
      customerResponse: "מענה חכם + AI משולב (כולל למידת סגנון)",
      emailMessages: "1800 מייל",
      whatsappMessages: "600 וואטסאפ",
      reminders: "חכם (עד 3 תזכורות)",
      brandedDesign: "✅",
      targetAudience: "משרדים וקהילות עם נפח לקוחות גבוה"
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto" dir="rtl">
      {/* כותרת עליונה */}
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-right">ניהול המנוי שלך</h1>
            <p className="text-muted-foreground text-right mt-2">
              כאן תוכל לראות את מצב המנוי שלך, לשדרג חבילה, לרכוש לידים או תוספות ולנהל תשלומים.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => toast.success("הצטרפות לתוכנית שותפים!")}
          >
            <Handshake className="h-4 w-4" />
            הצטרפות לתוכנית שותפים
          </Button>
        </div>
      </div>

      {/* פרטי המנוי הנוכחי */}
      <Card className="border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                {currentPlan.name}
                <Badge variant="secondary" className="mr-2">נוכחית</Badge>
              </CardTitle>
              <CardDescription className="text-right">
                {currentPlan.price}/{currentPlan.period}
              </CardDescription>
            </div>
            <Button variant="outline" onClick={() => toast.info("נפתח תפריט ניהול המנוי")}>
              <Settings className="h-4 w-4 ml-2" />
              נהל את המנוי שלי
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* תאריכים */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">תאריך התחלה</span>
              </div>
              <p className="text-sm text-muted-foreground">{currentPlan.startDate}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">חידוש הבא</span>
              </div>
              <p className="text-sm text-muted-foreground">{currentPlan.nextBilling}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">סוג המענה</span>
              </div>
              <p className="text-sm text-muted-foreground">{currentPlan.aiResponseType}</p>
            </div>
          </div>

          {/* סטטיסטיקות שימוש */}
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* לידים */}
              <div className="bg-white rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center gap-2">
                    🧲 לידים
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {currentPlan.leadsUsed}/{currentPlan.leadsTotal}
                  </span>
                </div>
                <Progress 
                  value={(currentPlan.leadsUsed / currentPlan.leadsTotal) * 100} 
                  className="h-2"
                />
              </div>

              {/* WhatsApp */}
              <div className="bg-white rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center gap-2">
                    💬 WhatsApp
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {currentPlan.whatsappRemaining}
                  </span>
                </div>
                <div className="h-2 bg-green-100 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{width: '80%'}}></div>
                </div>
              </div>

              {/* מייל */}
              <div className="bg-white rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center gap-2">
                    📧 מייל
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {currentPlan.emailRemaining}
                  </span>
                </div>
                <div className="h-2 bg-blue-100 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{width: '60%'}}></div>
                </div>
              </div>

              {/* תזכורות */}
              <div className="bg-white rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center gap-2">
                    ⏰ תזכורות
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {currentPlan.remindersSent}
                  </span>
                </div>
                <div className="h-2 bg-orange-100 rounded-full">
                  <div className="h-2 bg-orange-500 rounded-full" style={{width: '40%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* חבילות נוספות */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">חבילות נוספות</h2>
          <HoogiTip tip="לחץ על החבילה המתאימה כדי לשדרג את המנוי שלך" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative transition-all hover:shadow-lg ${
                plan.isCurrent 
                  ? 'border-2 border-primary bg-primary/5' 
                  : 'border hover:border-primary/50'
              }`}
            >
              {plan.isCurrent && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">נוכחית</Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <CardDescription className="text-center">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckIcon className="h-4 w-4 text-green-500 ml-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.isCurrent ? "outline" : "default"}
                  disabled={plan.isCurrent}
                  onClick={() => !plan.isCurrent && handleUpgrade()}
                >
                  {plan.isCurrent ? "תוכנית נוכחית" : "שדרג לחבילה זו"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* תוספות */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold">תוספות מהירות</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {addOns.map((addon) => (
            <Card key={addon.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{addon.icon}</span>
                      <h3 className="font-semibold">{addon.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{addon.description}</p>
                    {addon.note && (
                      <p className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {addon.note}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">{addon.price}</div>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => {
                    if (addon.id === 'ai-tokens') {
                      toast.success("טוקנים AI נוספו בהצלחה! 🤖");
                    } else {
                      toast.success(`${addon.name} נוסף בהצלחה!`);
                    }
                  }}
                >
                  {addon.id === 'ai-tokens' ? 'רכוש טוקנים' : 'הוסף'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* תשלומים וחשבוניות */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold">תשלומים וחשבוניות</h2>
        <Card>
          <CardHeader>
            <CardTitle>היסטוריית תשלומים</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{payment.type}</p>
                      <p className="text-sm text-muted-foreground">{payment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold">{payment.amount}</p>
                      <Badge variant={payment.status === "שולם" ? "default" : "secondary"}>
                        {payment.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 ml-2" />
                      חשבונית
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* אמצעי תשלום */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              אמצעי תשלום
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">כרטיס אשראי</p>
                    <p className="text-sm text-muted-foreground">Visa •••• 4242</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.info("עדכון פרטי כרטיס יהיה זמין בקרוב")}>
                  עדכון
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* תוכנית שותפים */}
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Handshake className="h-5 w-5 text-purple-600" />
              תוכנית שותפים
            </CardTitle>
            <CardDescription>
              הצטרף לתוכנית השותפים של iHoogi – הרווח עמלות על כל לקוח שנרשם דרכך!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* מבנה עמלות */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-semibold text-lg mb-2">עמלה לפי תוכנית</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Basic (₪179)</span>
                      <span className="font-medium">₪36</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pro (₪290)</span>
                      <span className="font-medium">₪58</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Premium (₪480)</span>
                      <span className="font-medium">₪96</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">20% עמלה חודשית חוזרת</p>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-semibold text-lg mb-2">עמלה על תוספות</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>+100 לידים (₪49)</span>
                      <span className="font-medium">₪10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>+300 לידים (₪99)</span>
                      <span className="font-medium">₪20</span>
                    </div>
                    <div className="flex justify-between">
                      <span>+500 מייל (₪29)</span>
                      <span className="font-medium">₪6</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">עמלה חד פעמית</p>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-semibold text-lg mb-2">תגמולים נוספים</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>50+ לקוחות</span>
                      <span className="font-medium">+5% בונוס</span>
                    </div>
                    <div className="flex justify-between">
                      <span>100+ לקוחות</span>
                      <span className="font-medium">+10% בונוס</span>
                    </div>
                    <div className="flex justify-between">
                      <span>הפניה שנתית</span>
                      <span className="font-medium">+2% בונוס</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">תגמולים הדרגתיים</p>
                </div>
              </div>

              {/* יתרונות התוכנית */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold">יתרונות התוכנית:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                      <span className="text-sm">עמלה חודשית חוזרת ללא הגבלת זמן</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                      <span className="text-sm">פאנל ניהול מתקדם עם דוחות מפורטים</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                      <span className="text-sm">חומרי שיווק מקצועיים וקודי הטמעה</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                      <span className="text-sm">תמיכה ייעודית לשותפים</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                      <span className="text-sm">תשלום מהיר - כל 30 יום</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">20%–35%</div>
                    <p className="text-sm text-muted-foreground">עמלה כולל בונוסים</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-sm">
                    <h5 className="font-medium mb-2">דוגמה לחישוב:</h5>
                    <p>לקוח Pro (₪290) × 20% = ₪58 עמלה חודשית</p>
                    <p className="text-muted-foreground">עם 100+ לקוחות: +10% בונוס</p>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => toast.success("בקשתך התקבלה! ניצור איתך קשר בקרוב")}
                  >
                    הצטרף עכשיו
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ביטול או השהייה */}
      <div className="space-y-6">
        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">ניהול מנוי</p>
                  <p className="text-sm text-muted-foreground">ניתן לבטל או להשהות בכל עת</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="border-orange-300 text-orange-700 hover:bg-orange-100"
                onClick={() => setShowCancelModal(true)}
              >
                בטל או השהה מנוי
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* מידע משפטי */}
      <div className="text-xs text-muted-foreground text-center space-y-1 pt-4 border-t">
        <p>• ניתן לבטל בכל עת בהתאם לתקנון • המחירים כוללים מע״מ</p>
        <p>• חשבוניות נשלחות אוטומטית • התמיכה מתבצעת במייל בלבד</p>
      </div>

      {/* מודל ביטול */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>ביטול מנוי</CardTitle>
              <CardDescription>
                ניתן לבטל בכל עת. השימוש יישאר פעיל עד סוף תקופת החיוב.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                האם אתה בטוח שברצונך לבטל את המנוי? תקבל החזר חלקי על בסיס הזמן שנותר.
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowCancelModal(false)}
                >
                  חזור
                </Button>
                <Button 
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    toast.success("המנוי בוטל בהצלחה");
                    setShowCancelModal(false);
                  }}
                >
                  אשר ביטול
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BillingForm;
