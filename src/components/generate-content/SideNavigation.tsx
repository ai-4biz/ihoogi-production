
import { useNavigate } from "react-router-dom";
import { Home, FileText, BookOpen, MessageSquare, MessageCircle, User, Handshake } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/use-user";

interface SideNavigationProps {
  activeRoute: string;
}

const SideNavigation = ({ activeRoute }: SideNavigationProps) => {
  const navigate = useNavigate();
  const { user } = useUser();
  
  // Basic menu items
  const baseMenuItems = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "דף הבית",
      path: "/",
      active: activeRoute === "/"
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "יצירת תוכן",
      path: "/generate-content",
      active: activeRoute === "/generate-content"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "מאמרי מערכת",
      path: "/content-inspiration",
      active: activeRoute === "/content-inspiration"
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "לידים",
      path: "/leads-responses",
      active: activeRoute === "/leads-responses"
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: "תגובות",
      path: "/comments",
      active: activeRoute === "/comments"
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "הפרופיל שלי",
      path: "/profile",
      active: activeRoute === "/profile"
    }
  ];
  
  // Add affiliate program menu item only if user has access
  const menuItems = user.subscription.hasAffiliateAccess 
    ? [
        ...baseMenuItems,
        {
          icon: <Handshake className="h-5 w-5" />,
          label: "תוכנית שותפים",
          path: "/affiliate-program",
          active: activeRoute === "/affiliate-program"
        }
      ]
    : baseMenuItems;

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-xl font-bold mb-8 text-center">הוגי</div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button 
                onClick={() => navigateTo(item.path)}
                className={cn(
                  "w-full flex items-center p-3 rounded-lg transition-colors",
                  item.active 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideNavigation;
