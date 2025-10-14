import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, User, FileText, MessageSquare, Share2, Zap, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      number: 1,
      icon: User,
      title: "מלאי את הפרופיל שלך",
      description: "ספרי לנו בקצרה מי את ומה העסק שלך – ככה Hoogi תדע לבנות שאלונים שמתאימים בדיוק לשפה ולסגנון שלך.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      action: () => navigate("/profile")
    },
    {
      number: 2,
      icon: FileText,
      title: "צרי את השאלון הראשון שלך",
      description: "תוך דקות, תבני שאלון חכם שמדבר במקומך וממיר מתעניינים ללידים חמים.",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      action: () => navigate("/my-hoogi")
    },
    {
      number: 3,
      icon: MessageSquare,
      title: "הגדירי תבנית מענה ללקוח",
      description: "הגדירי איך Hoogi תענה בשם העסק שלך – אוטומטית, מדויקת, ותמיד בזמן.",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      action: () => navigate("/create-template")
    },
    {
      number: 4,
      icon: Share2,
      title: "גשי למסך ההפצה",
      description: "בלחיצה אחת תקבלי לינק אישי לשאלון שלך.",
      color: "from-green-500 to-teal-500",
      bgColor: "from-green-50 to-teal-50",
      action: () => navigate("/distribution")
    },
    {
      number: 5,
      icon: Zap,
      title: "שתפי בכל מקום",
      description: "וואטסאפ, פייסבוק, אינסטגרם, אתר או דף נחיתה – שימי את הלינק שם וראי את הקסם קורה 🚀",
      color: "from-indigo-500 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50",
      action: () => navigate("/distribution")
    }
  ];

  const handleStepClick = (stepNumber: number, action: () => void) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
    action();
  };

  const handleSkip = () => {
    // Mark onboarding as completed in localStorage
    localStorage.setItem("onboarding_completed", "true");
    navigate("/");
  };

  const handleStart = () => {
    // Mark onboarding as completed and go to profile
    localStorage.setItem("onboarding_completed", "true");
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50" dir="rtl">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header with Hoogi mascot */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">
            ✨ הצעד הראשון שלך עם Hoogi
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            בואי נתחיל את המסע שלך! בחמישה צעדים פשוטים את תהיי מוכנה לייצר לידים חמים
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 mb-8">
          {steps.map((step) => {
            const StepIcon = step.icon;
            const isCompleted = completedSteps.includes(step.number);
            
            return (
              <Card 
                key={step.number}
                className={`border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-gradient-to-l ${step.bgColor} ${isCompleted ? 'border-green-500' : 'border-transparent hover:border-purple-200'}`}
                onClick={() => handleStepClick(step.number, step.action)}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4 md:gap-6">
                    {/* Number Badge */}
                    <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg relative`}>
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 md:h-7 md:w-7 text-white" />
                      ) : (
                        <span className="text-white font-bold text-xl md:text-2xl">{step.number}</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <StepIcon className={`h-5 w-5 md:h-6 md:w-6 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} />
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow or Check */}
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                      ) : (
                        <div className="text-2xl text-gray-400">←</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Section - "From here it's on us" */}
        <Card className="max-w-4xl mx-auto border-2 border-purple-200 shadow-xl bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
          <CardContent className="p-6 md:p-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageSquare className="h-8 w-8 text-purple-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                💬 מכאן זה כבר שלנו
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg max-w-3xl mx-auto">
              אנחנו נאסוף את כל הלידים שלך, נרכז אותם במקום אחד,
              נענה להם בשמך, נתזכר את הלקוחות שלך ברגע הנכון,
              ונדאג שלא תפספסי אף הזדמנות. 🎯
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={handleStart}
            size="lg"
            className="w-full sm:w-auto px-8 py-6 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all"
          >
            בואי נתחיל! 🚀
          </Button>
          <Button
            onClick={handleSkip}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-8 py-6 text-lg"
          >
            דלג לעכשיו
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

