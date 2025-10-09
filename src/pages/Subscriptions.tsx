import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Subscriptions = () => {
  const plans = [
    {
      name: "תוכנית בסיס",
      price: "₪99",
      period: "לחודש",
      features: [
        "עד 3 שאלונים",
        "100 תגובות בחודש",
        "תמיכה בסיסית",
        "אחסון 1GB"
      ],
      color: "from-primary/20 to-primary/5",
      borderColor: "border-primary"
    },
    {
      name: "תוכנית מתקדמת",
      price: "₪199",
      period: "לחודש",
      popular: true,
      features: [
        "עד 10 שאלונים",
        "500 תגובות בחודש",
        "תמיכה מועדפת",
        "אחסון 5GB",
        "אנליטיקס מתקדם"
      ],
      color: "from-accent/20 to-accent/5",
      borderColor: "border-accent"
    },
    {
      name: "תוכנית עסקית",
      price: "₪399",
      period: "לחודש",
      features: [
        "שאלונים ללא הגבלה",
        "תגובות ללא הגבלה",
        "תמיכה 24/7",
        "אחסון 20GB",
        "אנליטיקס מתקדם",
        "API גישה"
      ],
      color: "from-secondary/20 to-secondary/5",
      borderColor: "border-secondary"
    }
  ];

  return (
    <MainLayout initialState="root">
      <div className="flex flex-col w-full space-y-8 p-4 md:p-8 bg-background">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            בחר את התוכנית המתאימה לך
          </h1>
          <p className="text-lg text-muted-foreground">
            כל התוכניות כוללות גישה מלאה לכל התכונות הבסיסיות
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative border-2 ${plan.borderColor} rounded-2xl p-6 bg-gradient-to-b ${plan.color} shadow-lg hover:shadow-xl transition-all`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                    הכי פופולרי
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="bg-primary/20 rounded-full p-1 mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground flex-1">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full ${plan.popular ? 'bg-accent hover:bg-accent/90' : 'bg-primary hover:bg-primary/90'} text-white font-bold py-6 text-lg shadow-md`}
              >
                בחר תוכנית
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
