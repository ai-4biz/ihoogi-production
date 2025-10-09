
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HoogiAvatar from "@/components/dashboard/HoogiAvatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BookOpen, FileText, MessageSquare, User, Mail } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import questionnairesIcon from "@/assets/questionnaires-icon-new.png";

// Define the view states
type ViewState = "intro" | "root" | "content" | "articles" | "leads" | "profile" | "contact";

const StateDrivenDashboard = () => {
  const [currentView, setCurrentView] = useState<ViewState>("root");
  const navigate = useNavigate();

  // Helper function to render the current view
  const renderView = () => {
    switch (currentView) {
      case "intro":
        return (
          <>
            <div className="flex justify-center mb-6">
              <img 
                src="/hoogi-new-avatar.png" 
                alt="iHoogi Avatar" 
                className="w-[200px] h-[200px] object-contain" 
              />
            </div>
            <div className="flex justify-center">
              <Button 
                size="lg"
                className="px-8 py-2 text-lg"
                onClick={() => setCurrentView("root")}
              >
                🚀 המשך
              </Button>
            </div>
          </>
        );
        
      case "root":
        return (
          <>
            <div className="flex justify-center mb-6">
              <img 
                src="/hoogi-new-avatar.png" 
                alt="iHoogi Avatar" 
                className="w-[180px] h-[180px] object-contain" 
              />
            </div>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {renderMainMenuCards()}
            </div>
          </>
        );
        
      case "contact":
        return (
          <ContactForm onBack={() => setCurrentView("root")} />
        );
        
      case "content":
        return (
          <>
            <div className="flex justify-center mb-4">
              <img 
                src="/hoogi-new-avatar.png" 
                alt="iHoogi Avatar" 
                className="w-[140px] h-[140px] object-contain" 
              />
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
              {renderContentCards()}
            </div>
            <div className="flex justify-center mt-4">
              <Button 
                variant="link" 
                onClick={() => setCurrentView("root")}
                className="text-sm"
              >
                ⬅️ חזרה למסך הראשי
              </Button>
            </div>
          </>
        );
        
      case "articles":
        return (
          <>
            <div className="flex justify-center mb-4">
              <img 
                src="/hoogi-new-avatar.png" 
                alt="iHoogi Avatar" 
                className="w-[140px] h-[140px] object-contain" 
              />
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
              {renderQuestionnairesCards()}
            </div>
            <div className="flex justify-center mt-4">
              <Button 
                variant="link" 
                onClick={() => setCurrentView("root")}
                className="text-sm"
              >
                ⬅️ חזרה למסך הראשי
              </Button>
            </div>
          </>
        );
        
      case "leads":
        return (
          <>
            <div className="flex justify-center mb-4">
              <img 
                src="/hoogi-new-avatar.png" 
                alt="iHoogi Avatar" 
                className="w-[140px] h-[140px] object-contain" 
              />
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
              {renderLeadsCards()}
            </div>
            <div className="flex justify-center mt-4">
              <Button 
                variant="link" 
                onClick={() => setCurrentView("root")}
                className="text-sm"
              >
                ⬅️ חזרה למסך הראשי
              </Button>
            </div>
          </>
        );
        
      case "profile":
        return (
          <>
            <div className="flex justify-center mb-4">
              <img 
                src="/hoogi-new-avatar.png" 
                alt="iHoogi Avatar" 
                className="w-[140px] h-[140px] object-contain" 
              />
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
              {renderProfileCards()}
            </div>
            <div className="flex justify-center mt-4">
              <Button 
                variant="link" 
                onClick={() => setCurrentView("root")}
                className="text-sm"
              >
                ⬅️ חזרה למסך הראשי
              </Button>
            </div>
          </>
        );
        
      default:
        return <div>דף לא נמצא</div>;
    }
  };

  // Render the main menu cards
  const renderMainMenuCards = () => {
    const cards = [
      {
        title: "מאמרים",
        icon: <BookOpen className="h-6 w-6 text-blue-500" />,
        onClick: () => navigate("/main-dashboard"),
        color: "blue"
      },
      {
        title: "השאלונים שלי",
        icon: <img src={questionnairesIcon} alt="שאלונים" className="h-12 w-12" />,
        onClick: () => setCurrentView("articles"),
        color: "indigo"
      },
      {
        title: "✍️ יצירת תוכן",
        icon: <FileText className="h-6 w-6 text-green-500" />,
        onClick: () => setCurrentView("content"),
        color: "green"
      },
      {
        title: "💬 לידים ותגובות",
        icon: <MessageSquare className="h-6 w-6 text-purple-500" />,
        onClick: () => setCurrentView("leads"),
        color: "purple"
      },
      {
        title: "✉️ צור קשר",
        icon: <Mail className="h-6 w-6 text-pink-500" />,
        onClick: () => setCurrentView("contact"),
        color: "pink"
      },
      {
        title: "👤 הפרופיל שלי",
        icon: <User className="h-6 w-6 text-orange-500" />,
        onClick: () => setCurrentView("profile"),
        color: "orange"
      }
    ];
    
    return cards.map((card, index) => (
      <Card 
        key={index} 
        className={`bg-white hover:shadow-md transition-all duration-300 cursor-pointer border-${card.color}-100 hover:border-${card.color}-300`}
        onClick={card.onClick}
      >
        <div className="p-4 flex flex-col items-center justify-center h-full">
          <AspectRatio ratio={1/1} className="flex items-center justify-center">
            <div className={`bg-${card.color}-100 p-3 rounded-full mb-3`}>
              {card.icon}
            </div>
            <p className="text-center font-medium text-sm md:text-base">{card.title}</p>
          </AspectRatio>
        </div>
      </Card>
    ));
  };

  // Render the content section cards
  const renderContentCards = () => {
    const cards = [
      {
        title: "📚 מאמרי המערכת",
        onClick: () => navigate("/content-inspiration"),
        color: "blue"
      },
      {
        title: "📝 שאלון-מאמר",
        onClick: () => navigate("/article-questionnaire"),
        color: "green"
      },
      {
        title: "📎 העלאת מדיה & קישורים",
        onClick: () => navigate("/media-upload"),
        color: "purple"
      },
      {
        title: "👤 הפרופיל שלי",
        onClick: () => setCurrentView("profile"),
        color: "orange"
      }
    ];
    
    return renderCardGrid(cards);
  };

  // Render the questionnaires section cards
  const renderQuestionnairesCards = () => {
    const cards = [
      {
        title: "📋 השאלונים שלי",
        onClick: () => navigate("/content-inspiration"),
        color: "blue"
      },
      {
        title: "➕ שאלון חדש",
        onClick: () => navigate("/content-inspiration?action=new"),
        color: "green"
      },
      {
        title: "📊 סטטיסטיקות שאלונים",
        onClick: () => navigate("/content-inspiration?tab=stats"),
        color: "purple"
      },
      {
        title: "⚙️ הגדרות שאלונים",
        onClick: () => navigate("/content-inspiration?tab=settings"),
        color: "orange"
      }
    ];
    
    return renderCardGrid(cards);
  };

  // Render the leads section cards
  const renderLeadsCards = () => {
    const cards = [
      {
        title: "📥 לידים",
        onClick: () => navigate("/leads-responses?tab=leads"),
        color: "blue"
      },
      {
        title: "💬 תגובות",
        onClick: () => navigate("/leads-responses?tab=comments"),
        color: "green"
      },
      {
        title: "📊 ניתוח לידים",
        onClick: () => navigate("/leads-responses?tab=leads-analytics"),
        color: "purple"
      },
      {
        title: "📈 ניתוח תגובות",
        onClick: () => navigate("/leads-responses?tab=comments-analytics"),
        color: "orange"
      }
    ];
    
    return renderCardGrid(cards);
  };

  // Render the profile section cards
  const renderProfileCards = () => {
    const cards = [
      {
        title: "📝 שאלון כניסה",
        onClick: () => navigate("/profile?section=questionnaire"),
        color: "blue"
      },
      {
        title: "💳 מצב חיובים",
        onClick: () => navigate("/profile?section=billing"),
        color: "green"
      },
      {
        title: "📚 המאמרים שלי",
        onClick: () => navigate("/profile?section=my-articles"),
        color: "purple"
      },
      {
        title: "🚨 התרעות",
        onClick: () => navigate("/profile?section=notifications"),
        color: "orange"
      }
    ];
    
    return renderCardGrid(cards);
  };

  // Helper function to render a grid of cards
  const renderCardGrid = (cards: { title: string; onClick: () => void; color: string }[]) => {
    return cards.map((card, index) => (
      <Card 
        key={index} 
        className={`bg-white hover:shadow-md transition-all duration-300 cursor-pointer border-${card.color}-100 hover:border-${card.color}-300`}
        onClick={card.onClick}
      >
        <div className="p-3 flex flex-col items-center justify-center h-full">
          <AspectRatio ratio={1/1} className="flex items-center justify-center">
            <p className="text-center font-medium text-xs md:text-sm">{card.title}</p>
          </AspectRatio>
        </div>
      </Card>
    ));
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="container mx-auto p-4 md:p-6 max-w-lg">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          {renderView()}
        </div>
      </div>
      
      {/* Floating Hoogi Avatar */}
      <HoogiAvatar 
        message="נגיעה בכפתור = מידע קצר" 
        subMessage="לחיצה כפולה / לחיצה-ארוכה = כניסה פנימה 🚀" 
      />
    </div>
  );
};

export default StateDrivenDashboard;
