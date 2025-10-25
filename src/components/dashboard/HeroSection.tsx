
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Target, Zap, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onGetStarted: () => void;
}

interface FormData {
  username: string;
  email: string;
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
  language: string;
  termsAccepted: boolean;
  marketingAccepted: boolean;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    emailConfirm: "",
    password: "",
    passwordConfirm: "",
    language: "he",
    termsAccepted: false,
    marketingAccepted: false,
  });

  const benefits = [
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "כלי מכירה חכם",
      description: "כל שאלון הופך לשיחה אמיתית שמושכת לקוחות חדשים. iHoogi מדברת בשפה שלך, מציגה אותך בצורה מקצועית ועוזרת ללקוחות להבין בדיוק מה אתה מציע."
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "הכול במקום אחד",
      description: "כל הפניות, ההודעות והתשובות מרוכזות במערכת אחת נוחה. לא משנה מאיפה הן הגיעו – מהאתר, הוואטסאפ או הרשתות – הכול מסודר ומוכן להמשך טיפול."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "אוטומציה שעובדת בשבילך",
      description: "המענה ללקוחות שלך נשלח אוטומטית, בזמן הנכון ובסגנון שלך. iHoogi מתזכרת, עוקבת, ומוודאת שאף לקוח לא נשכח בדרך."
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "שותפים שצומחים איתך",
      description: "עם תוכנית השותפים של iHoogi, כל מי שממליץ עליך או מביא לקוחות חדשים – מרוויח איתך. דרך חכמה להגדיל את החשיפה, לחזק שיתופי פעולה ולהגדיל הכנסות, בלי מאמץ."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add validation
    onGetStarted();
  };

  return (
    <div className="w-full bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <img 
              src="/hoogi-new-avatar.png" 
              alt="Hoogi Avatar" 
              className="h-32 object-contain animate-float"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ברוכים הבאים ל-<span className="text-primary">iHoogi</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            מערכת חכמה ששואלת, אוספת ומרכזת את כל הפניות שמגיעות אליך – ומקדמת אותך לסגירת עסקה, בקלות ובחיוך.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                  {benefit.icon}
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 py-3 text-lg"
              onClick={() => navigate('/signup')}
            >
              הירשם
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-lg"
              onClick={() => navigate('/login')}
            >
              התחבר
            </Button>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="text-center mt-12 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            iHoogi™ היא מערכת בבעלות ובניהול AI-4Biz. כל הזכויות שמורות. השימוש במערכת כפוף ל<a href="/terms-of-service" className="text-primary hover:underline">תנאי השימוש</a> ולמדיניות הפרטיות של החברה.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
