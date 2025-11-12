import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Check, Zap, MessageSquare, Mail, Users, Star, TrendingUp, DollarSign, Handshake } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Subscriptions = () => {
  const plans = [
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
      color: "from-green-500/20 to-green-500/5",
      borderColor: "border-green-500",
      icon: <MessageSquare className="h-8 w-8 text-green-500" />,
      popular: true
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
      color: "from-primary/20 to-primary/5",
      borderColor: "border-primary",
      icon: <Star className="h-8 w-8 text-primary" />
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
      color: "from-purple-500/20 to-purple-500/5",
      borderColor: "border-purple-500",
      icon: <Zap className="h-8 w-8 text-purple-500" />
    }
  ];

  const handleSelectPlan = (planId: string) => {
    toast.success(`התוכנית ${plans.find(p => p.id === planId)?.name} נבחרה בהצלחה!`);
  };

  // תוספות מהירות (Add-ons)
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

  const handleAddOn = (addonName: string) => {
    toast.success(`${addonName} נוסף בהצלחה!`);
  };

  // Mock data - נתונים לדוגמה (בעתיד יגיעו מה-API)
  const stats = {
    totalUsers: 284, // סהכ משתמשים
    newUsers: 24, // משתמשים חדשים
    revenueFromPartners: 35800, // הכנסות ממשתמשים דרך שותפים
    totalCommissions: 5890, // סהכ עמלות
    activePartners: 8 // מספר שותפים פעילים
  };

  return (
    <MainLayout initialState="root">
      <div className="flex flex-col w-full space-y-8 p-4 md:p-8 bg-background" dir="rtl">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            המנויים שלי
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            כל התוכניות כוללות גישה מלאה לכל התכונות הבסיסיות של iHoogi
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto w-full">
          {/* סהכ משתמשים / משתמשים חדשים */}
          <Card className="border-0 shadow-md bg-gradient-to-br from-blue-500/10 to-blue-500/5 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 !pt-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <div className="text-right">
                  <div className="text-3xl font-bold text-foreground">{stats.totalUsers}</div>
                  <div className="text-sm text-muted-foreground">סה"כ משתמשים</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">משתמשים חדשים</span>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">+{stats.newUsers}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* הכנסות ממשתמשים דרך שותפים */}
          <Card className="border-0 shadow-md bg-gradient-to-br from-green-500/10 to-green-500/5 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 !pt-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                <div className="text-right">
                  <div className="text-3xl font-bold text-foreground">
                    ₪{stats.revenueFromPartners.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">הכנסות ממשתמשים דרך שותפים</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* סהכ עמלות */}
          <Card className="border-0 shadow-md bg-gradient-to-br from-purple-500/10 to-purple-500/5 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 !pt-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <div className="text-right flex-1">
                  <div className="text-3xl font-bold text-foreground">
                    ₪{stats.totalCommissions.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">סה"כ עמלות</div>
                </div>
              </div>
              {/* תאריך - חודש מימין, יום משמאל */}
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div className="text-left">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {new Date().getDate().toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {new Date().toLocaleDateString('he-IL', { month: 'long' })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* מספר שותפים פעילים - בעיגול קטן */}
          <Card className="border-0 shadow-md bg-gradient-to-br from-orange-500/10 to-orange-500/5 hover:shadow-lg transition-shadow relative">
            <CardContent className="p-6 !pt-6">
              <div className="flex items-center justify-between mb-2">
                <Handshake className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-2">שותפים פעילים</div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-foreground">{stats.activePartners}</span>
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </CardContent>
            {/* עיגול קטן בפינה */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xs font-bold text-white">{stats.activePartners}</span>
            </div>
          </Card>
        </div>

        {/* Additional Info - Moved to Top */}
        <div className="max-w-4xl mx-auto w-full bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-2xl p-8 border-2 border-green-500/30 shadow-lg">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              🎁 התחל בחינם עוד היום!
            </h3>
            <p className="text-lg text-foreground mb-6 font-medium">
              התנסה בכל יכולות המערכת עם <span className="text-green-600 dark:text-green-400 font-bold">10 לידים חינם</span> - ללא צורך בכרטיס אשראי
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3 bg-white/60 dark:bg-gray-800/60 rounded-lg p-3">
                <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium">10 לידים חינם</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white/60 dark:bg-gray-800/60 rounded-lg p-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium">ללא כרטיס אשראי</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white/60 dark:bg-gray-800/60 rounded-lg p-3">
                <div className="w-4 h-4 bg-purple-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm font-medium">שדרוג בכל עת</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon - Partners Program Banner */}
        <div className="max-w-4xl mx-auto w-full bg-gradient-to-r from-orange-50 via-yellow-50 to-amber-50 dark:from-orange-950/20 dark:via-yellow-950/20 dark:to-amber-950/20 rounded-2xl p-8 border-2 border-orange-400/40 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          <div className="text-center relative z-10">
            <div className="inline-block mb-4">
              <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 text-lg font-bold shadow-lg animate-bounce">
                🚀 חדש בקרוב
              </Badge>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              🤝 תוכנית שותפים - שתי דרכים להצלחה!
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {/* Option 1 - Build Your Own */}
              <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 border-2 border-orange-300/50 hover:border-orange-400 transition-all hover:shadow-xl">
                <div className="text-4xl mb-3">🏗️</div>
                <h4 className="text-xl font-bold mb-3 text-orange-600 dark:text-orange-400">
                  בנה את רשת השותפים שלך
                </h4>
                <p className="text-sm text-foreground font-medium mb-2">
                  רוצה לבנות מערך של שותפים שיעזרו לך בבניית העסק?
                </p>
                <p className="text-xs text-muted-foreground">
                  פתח <span className="text-orange-600 dark:text-orange-400 font-bold">תוכנית שותפים משלך</span> והרחב את הפעילות בקלות
                </p>
              </div>

              {/* Option 2 - Join iHoogi Partners */}
              <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 border-2 border-green-300/50 hover:border-green-400 transition-all hover:shadow-xl">
                <div className="text-4xl mb-3">💰</div>
                <h4 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">
                  הצטרף לשותפים של iHoogi
                </h4>
                <p className="text-sm text-foreground font-medium mb-2">
                  הפוך כל המלצה להכנסה פסיבית!
                </p>
                <p className="text-xs text-muted-foreground">
                  קבל <span className="text-green-600 dark:text-green-400 font-bold">עמלה חודשית</span> עבור כל משתמש שהצטרף דרכך - <span className="font-bold">כל עוד המנוי פעיל</span>
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground italic">
              💡 שתי האפשרויות יהיו זמינות בקרוב - הירשם עכשיו ותהיה הראשון לדעת!
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative border-2 ${plan.borderColor} rounded-2xl p-8 bg-gradient-to-br ${plan.color} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-6 py-2 text-base font-bold shadow-lg">
                    הכי פופולרי
                  </Badge>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  {plan.icon}
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-3">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-lg text-muted-foreground">
                    /{plan.period}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mt-1 flex-shrink-0">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-foreground text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                    : plan.id === 'premium'
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                בחר תוכנית {plan.name}
              </Button>
            </div>
          ))}
        </div>

        {/* תוספות מהירות */}
        <div className="max-w-7xl mx-auto w-full space-y-6 mt-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              תוספות מהירות
            </h2>
            <p className="text-muted-foreground">
              הרחב את המנוי שלך עם תוספות לפי הצורך
            </p>
          </div>
          
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
                        <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400">
                          {addon.note}
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">{addon.price}</div>
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleAddOn(addon.name)}
                  >
                    הוסף
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto w-full mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            שאלות נפוצות
          </h2>
          <div className="space-y-4">
            <div className="border border-border rounded-lg p-4 bg-card">
              <h3 className="font-bold text-foreground mb-2">
                האם אפשר לשנות תוכנית בכל זמן?
              </h3>
              <p className="text-muted-foreground">
                כן, ניתן לשדרג או להוריד דרגה בכל עת. השינויים ייכנסו לתוקף מיד.
              </p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <h3 className="font-bold text-foreground mb-2">
                מה קורה אם אני עובר את מכסת התגובות?
              </h3>
              <p className="text-muted-foreground">
                נודיע לך כשאתה מתקרב למכסה. ניתן לשדרג בכל זמן או לחכות לחודש הבא.
              </p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <h3 className="font-bold text-foreground mb-2">
                האם יש תקופת ניסיון?
              </h3>
              <p className="text-muted-foreground">
                כן, כל התוכניות מגיעות עם 14 יום ניסיון חינם ללא צורך בכרטיס אשראי.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Subscriptions;
