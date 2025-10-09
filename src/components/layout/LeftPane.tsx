
import { BookOpen, FileText, MessageSquare, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

// Update ViewState type to match MainLayout.tsx
type ViewState = "root" | "content" | "articles" | "leads" | "profile" | "automations" | "affiliate" | "contact" | "organizations";

interface LeftPaneProps {
  currentState: ViewState;
  onStateChange: (state: ViewState) => void;
}

const LeftPane = ({ currentState, onStateChange }: LeftPaneProps) => {
  const menuItems = [
    {
      id: "articles",
      title: "📚 מאמרי המערכת",
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      onClick: () => onStateChange("articles"),
      state: "articles" as ViewState,
      color: "blue"
    },
    {
      id: "content",
      title: "✍️ יצירת תוכן",
      icon: <FileText className="h-6 w-6 text-green-500" />,
      onClick: () => onStateChange("content"),
      state: "content" as ViewState,
      color: "green"
    },
    {
      id: "leads",
      title: "💬 לידים ותגובות",
      icon: <MessageSquare className="h-6 w-6 text-purple-500" />,
      onClick: () => onStateChange("leads"),
      state: "leads" as ViewState,
      color: "purple"
    },
    {
      id: "profile",
      title: "👤 הפרופיל שלי",
      icon: <User className="h-6 w-6 text-orange-500" />,
      onClick: () => onStateChange("profile"),
      state: "profile" as ViewState,
      color: "orange"
    }
  ];

  return (
    <div className="flex flex-col items-center p-4 h-full overflow-hidden">
      {/* iHoogi avatar image */}
      <div className="flex justify-center mb-6">
        <img 
          src="/hoogi-new-avatar.png" 
          alt="iHoogi Avatar" 
          className="w-[160px] h-[160px] object-contain" 
        />
      </div>
      
      {/* 2x2 grid of buttons */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {menuItems.map((item) => (
          <Card 
            key={item.id} 
            className={cn(
              "bg-white transition-all duration-300 cursor-pointer border-l-4",
              currentState === item.state 
                ? `border-${item.color}-500 shadow-md` 
                : `border-transparent hover:border-${item.color}-300 hover:shadow-sm`
            )}
            onClick={item.onClick}
          >
            <div className="p-4 flex flex-col items-center justify-center h-full">
              <AspectRatio ratio={1/1} className="flex items-center justify-center">
                <div className={`bg-${item.color}-100 p-3 rounded-full mb-3`}>
                  {item.icon}
                </div>
                <p className="text-center font-medium text-xs md:text-sm">{item.title}</p>
              </AspectRatio>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LeftPane;
