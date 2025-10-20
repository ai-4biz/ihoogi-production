import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Check, Zap, MessageSquare, Mail, Users, Star } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const SubscriptionPlans = () => {
  const plans = [
    {
      id: "basic",
      name: "בסיסי",
      price: "₪39",
      period: "חודשי",
      description: "מתאים ליחידים או חברות קטנות שרק מתחילים",
      features: [
        "עד 100 לידים בחודש",
        "עד 5 שאלונים פעילים",
        "200 הודעות מייל",
        "מענה סטנדרטי",
        "תמיכה בדוא\"ל בלבד"
      ],
      color: "from-blue-500/20 to-blue-500/5",
      borderColor: "border-blue-500",
      icon: <Users className="h-8 w-8 text-blue-500" />
    },
    {
      id: "pro",
      name: "מקצועי",
      price: "₪99",
      period: "חודשי",
      description: "לעסקים צומחים שצריכים פתרון מקיף יותר",
      popular: true,
      features: [
        "עד 300 לידים בחודש",
        "עד 15 שאלונים פעילים",
        "500 הודעות מייל",
        "100 הודעות WhatsApp",
        "AI מענה חכם",
        "תמיכה בצ'אט ודוא\"ל"
      ],
      color: "from-primary/20 to-primary/5",
      borderColor: "border-primary",
      icon: <Star className="h-8 w-8 text-primary" />
    },
    {
      id: "premium",
      name: "פרימיום",
      price: "₪199",
      period: "חודשי",
      description: "לארגונים גדולים עם צרכים מורכבים",
      features: [
        "עד 1000 לידים בחודש",
        "עד 50 שאלונים פעילים",
        "1500 הודעות מייל",
        "500 הודעות WhatsApp",
        "AI מענה חכם מתקדם",
        "תמיכה VIP",
        "אינטגרציות מתקדמות"
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
            תוכניות מנויים - iHoogi
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            בחר את התוכנית המתאימה לך והתחל לנהל את העסק שלך בצורה חכמה יותר
          </p>
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

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto w-full bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">מתלבט באיזה תוכנית לבחור?</h3>
            <p className="text-muted-foreground mb-6">
              כל התוכניות מגיעות עם 14 יום ניסיון חינם. תוכל לשדרג או להוריד דרגה בכל עת.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">14 יום ניסיון חינם</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">שינויים בכל עת</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm">תמיכה 24/7</span>
              </div>
            </div>
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

export default SubscriptionPlans;
