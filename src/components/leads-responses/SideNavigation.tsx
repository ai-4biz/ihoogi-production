
import { useNavigate } from "react-router-dom";
import { Handshake } from "lucide-react";
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
      icon: "🏠",
      label: "דף הבית",
      path: "/"
    },
    {
      icon: "✍️",
      label: "יצירת תוכן",
      path: "/generate-content"
    },
    {
      icon: "📚",
      label: "השראה ממאמרים",
      path: "/content-inspiration"
    },
    {
      icon: "💬",
      label: "לידים ותגובות",
      path: "/leads-responses",
      active: activeRoute === "/leads-responses"
    },
    {
      icon: "👤",
      label: "הפרופיל שלי",
      path: "/profile"
    }
  ];
  
  // Add affiliate program menu item only if user has access
  const menuItems = user.subscription.hasAffiliateAccess 
    ? [
        ...baseMenuItems,
        {
          icon: "🤝",
          label: "תוכנית שותפים",
          path: "/affiliate-program"
        }
      ]
    : baseMenuItems;

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-20 md:w-64 bg-white shadow-lg flex-shrink-0">
      <div className="p-4 flex flex-col items-center md:items-start">
        <div className="font-bold text-xl mb-6 hidden md:block">
          הוגי
        </div>
        
        <nav className="w-full">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button 
                  onClick={() => navigateTo(item.path)}
                  className={`w-full flex items-center p-3 md:px-4 md:py-3 rounded-lg transition-colors ${
                    item.active 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <span className="text-xl md:text-2xl mr-0 md:mr-3">{item.icon}</span>
                  <span className="hidden md:block">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideNavigation;
