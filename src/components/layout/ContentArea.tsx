
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lock, LogIn, MessageSquare, Target, Zap, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

// Update ViewState type to match MainLayout.tsx
type ViewState = "root" | "content" | "articles" | "leads" | "profile" | "automations" | "affiliate" | "contact" | "organizations";

interface ContentAreaProps {
  currentState: ViewState;
  handleStateChange: (newState: ViewState) => void;
  isMobile: boolean;
  children: React.ReactNode;
}

const ContentArea = ({ currentState, handleStateChange, isMobile, children }: ContentAreaProps) => {
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div 
      className={cn(
        "flex-1 overflow-auto",
        isMobile ? "w-full" : "",
        // Hebrew (RTL) - margin right, English (LTR) - margin left
        "rtl:mr-[220px] ltr:ml-[220px]"
      )}
    >
      {currentState === "root" ? (
        <div className="h-full flex items-center justify-center p-4">
          {/* Language Selection */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.info("שפה שונתה לעברית")}
            >
              עברית
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast.info("Language changed to English")}
            >
              English
            </Button>
          </div>

          {/* Hero Section */}
          <div className="text-center p-6 max-w-5xl">
            <img 
              src="/hoogi-new-avatar.png" 
              alt="לוגו iHoogi" 
              className="w-32 h-32 mx-auto mb-6 animate-fade-in"
            />
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              ברוכים הבאים ל-<span className="text-primary">iHoogi</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              i-Hoogi – אוספת, מנהלת ומתזכרת לידים, ועונה במקומך כדי שכל שיחה תסתיים במכירה
            </p>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12 text-right max-w-4xl mx-auto">
              <div className="bg-card/50 border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💬</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">כלי מכירה חכם</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      הופכים שאלונים לכלי מכירה – מעוצבים, מקצועיים ומותאמים אישית לכל פלטפורמה.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-card/50 border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎯</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">מרכז במקום אחד</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      כל התשובות והלידים מרוכזים במקום אחד – לא משנה איפה: פייסבוק, ווטסאפ, אתר או דף נחיתה.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-card/50 border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎯</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">לידים חיים וממוקדים</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      לידים שמגיעים מוכנים לשיחה – מקצרים את התהליך ומגדילים משמעותית את סיכויי הסגירה.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-card/50 border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">⚡</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">אוטומציה שעובדת בשבילך</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      חוסכים זמן ומקדמים סגירה עם אוטומציה חכמה שעונה ללקוח ומסננת את המידע החשוב.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="max-w-md mx-auto space-y-3">
              <Button
                onClick={() => navigateTo('/signup')}
                className="w-full h-14 text-lg font-semibold"
                size="lg"
              >
                הירשם
              </Button>

              <Button 
                variant="outline"
                onClick={() => navigateTo('/login')} 
                className="w-full h-14 text-lg font-semibold"
                size="lg"
              >
                התחבר
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex flex-col">
          <div className="p-2 border-b">
            <Button 
              variant="link" 
              onClick={() => handleStateChange("root")}
              className="text-sm"
            >
              ⬅️ חזרה
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentArea;
