import MainLayout from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Users, TrendingUp, CheckCircle2, Clock, AlertCircle, FileText, ArrowRight } from "lucide-react";
import { useEffect } from "react";

const MainDashboard = () => {
  const navigate = useNavigate();

  // Check if user has completed onboarding
  useEffect(() => {
    const onboardingCompleted = localStorage.getItem("onboarding_completed");
    if (!onboardingCompleted) {
      navigate("/onboarding");
    }
  }, [navigate]);

  // Mock data - should come from backend
  const userName = "gil.arbisman";
  const stats = {
    responses: { total: 3, new: 0, inProgress: 0, today: 0 },
    leads: { total: 0, new: 0, inProgress: 0, today: 0 },
    todayReturns: 0,
    completed: 0,
    inProgress: 0,
    new: 0
  };

  const questionnaires = [
    {
      id: 1,
      title: "שאלון ללא כותרת",
      category: "ללא קטגוריה",
      date: "3.10.2025",
      responses: 0,
      leads: 0,
      new: 0,
      status: "active"
    },
    {
      id: 2,
      title: "שאלון ללא כותרת",
      category: "ללא קטגוריה",
      date: "3.10.2025",
      responses: 0,
      leads: 0,
      new: 0,
      status: "active"
    }
  ];

  return (
    <MainLayout initialState="root">
      <div className="flex flex-col w-full space-y-6 p-4 md:p-8 bg-background" dir="rtl">
        {/* Back Button */}
        <div className="flex items-center mb-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.history.back()}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            חזור
          </Button>
        </div>

        {/* Header with greeting and new questionnaire button */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-right">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-foreground justify-end">
              <span className="text-3xl">👋</span> שלום !{userName}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1 text-right">
              הנה תמונת מצב מלאה של העסק שלך - הכל במקום אחד
            </p>
          </div>
          <Button 
            className="bg-gradient-to-l from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-600 text-white shadow-lg font-semibold"
            onClick={() => navigate("/create-questionnaire")}
          >
            <Plus className="ml-2 h-5 w-5" />
            שאלון חדש
          </Button>
        </div>

        {/* Top Stats - Responses and Hot Leads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Responses Card */}
          <div className="border-2 border-secondary/40 rounded-2xl p-5 md:p-6 bg-card shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <MessageSquare className="h-6 w-6 md:h-7 md:w-7 text-secondary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground">תגובות</h3>
              </div>
              <span className="text-3xl md:text-5xl font-bold text-secondary">{stats.responses.total}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stats.responses.new}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">חדשים</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stats.responses.inProgress}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">בטיפול</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stats.responses.today}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">היום</div>
              </div>
            </div>
          </div>

          {/* Hot Leads Card */}
          <div className="border-2 border-primary/40 rounded-2xl p-5 md:p-6 bg-card shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground">לידים חמים</h3>
              </div>
              <span className="text-3xl md:text-5xl font-bold text-primary">{stats.leads.total}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stats.leads.new}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">חדשים</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stats.leads.inProgress}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">בטיפול</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stats.leads.today}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">היום</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats - 4 smaller cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="border-r-4 border-primary rounded-lg p-4 bg-card shadow-sm">
            <div className="flex items-center gap-2 text-primary mb-2 justify-end">
              <span className="text-sm font-medium">הכנסות היום</span>
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-foreground text-right">{stats.todayReturns}</div>
          </div>

          <div className="border-r-4 border-accent rounded-lg p-4 bg-card shadow-sm">
            <div className="flex items-center gap-2 text-accent mb-2 justify-end">
              <span className="text-sm font-medium">השלמנו</span>
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-foreground text-right">{stats.inProgress}</div>
          </div>

          <div className="border-r-4 border-secondary rounded-lg p-4 bg-card shadow-sm">
            <div className="flex items-center gap-2 text-secondary mb-2 justify-end">
              <span className="text-sm font-medium">בטיפול</span>
              <Clock className="h-5 w-5" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-foreground text-right">{stats.completed}</div>
          </div>

          <div className="border-r-4 border-purple-500 rounded-lg p-4 bg-card shadow-sm">
            <div className="flex items-center gap-2 text-purple-600 mb-2 justify-end">
              <span className="text-sm font-medium">חודשים</span>
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-foreground text-right">{stats.new}</div>
          </div>
        </div>

        {/* Questionnaires List */}
        <div className="mt-4">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-foreground text-right">השאלונים שלך</h2>
          <div className="space-y-3">
            {questionnaires.map((q) => (
              <div 
                key={q.id} 
                className="border border-border rounded-xl p-4 md:p-5 bg-card hover:shadow-md transition-all cursor-pointer"
                onClick={() => navigate(`/content-inspiration`)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 text-right">
                      <h3 className="font-bold text-foreground text-base md:text-lg">{q.title}</h3>
                      <p className="text-sm text-muted-foreground">{q.category}</p>
                    </div>
                  </div>
                  
                  {/* Mobile: compact stats */}
                  <div className="flex md:hidden items-center gap-2 text-xs flex-wrap">
                    <span className="text-muted-foreground">{q.date}</span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded">לידים: {q.leads}</span>
                    <span className="bg-secondary/10 text-secondary px-2 py-1 rounded">תגובות: {q.responses}</span>
                    <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded">חדשים: {q.new}</span>
                  </div>
                  
                  {/* Desktop: full stats */}
                  <div className="hidden md:flex items-center gap-6 text-sm">
                    <span className="text-muted-foreground">{q.date}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-primary font-medium">לידים ({q.leads})</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-secondary font-medium">תגובות ({q.responses})</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-purple-600 font-medium">חדשים ({q.new})</span>
                  </div>
                  
                  <Button 
                    size="sm"
                    className="bg-primary/10 text-primary hover:bg-primary/20 font-medium"
                  >
                    פעיל
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MainDashboard;
