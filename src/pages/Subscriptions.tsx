import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Check, Zap, MessageSquare, Mail, Users, Star } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

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

  return (
    <MainLayout initialState="root">
      <div className="flex flex-col w-full space-y-8 p-4 md:p-8 bg-background" dir="rtl">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            בחר את התוכנית המתאימה לך
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            כל התוכניות כוללות גישה מלאה לכל התכונות הבסיסיות של iHoogi
          </p>
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
