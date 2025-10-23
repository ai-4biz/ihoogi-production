
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
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "מרכז במקום אחד",
      description: "כל הלידים, התשובות והשיחות מרוכזים במקום אחד – בלי לפספס אף פנייה. האתר, המיילים, הוואטסאפ והרשתות החברתיות – כולם מתכנסים לדף ניהול נוח אחד."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "כלי מכירה חכם",
      description: "כל שאלון הופך לכלי מכירה מעוצב וחכם – שמותאם אישית לכל עסק, מקצועי ומוכן לשיתוף בכל פלטפורמה."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "אוטומציה שעובדת בשבילך",
      description: "חוסכים זמן ומקדמים סגירות עם אוטומציה חכמה. המערכת שולחת מענה אוטומטי, מתזכרת לקוחות ומייצרת קשר חם – באופן אישי ומדויק."
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "לידים חיים ומניעים",
      description: "הלידים שלך לא נעלמים – הם מקבלים מענה חכם שממשיך את השיח ומוביל אותם לשלב הבא בתהליך המכירה."
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
            ברוכים הבאים ל-<span className="text-primary">Hoogi</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            מערכת חכמה שממירה שאלונים ללידים חמים, מרכזת את כל הפניות במקום אחד ומקדמת אותך לסגירת עסקה בקליק.
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
