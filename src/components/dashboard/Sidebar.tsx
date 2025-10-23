
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  FileText,
  MessageSquare,
  MessageCircle,
  User,
  Home,
  Settings,
  Handshake,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/use-user";

interface SidebarProps {
  activeItem: string;
}

const Sidebar = ({ activeItem }: SidebarProps) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useUser();

  // List of menu items for the sidebar
  const baseMenuItems = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "דף הבית",
      path: "/terms-of-service",
      active: activeItem === "terms-of-service"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "יצירת תוכן",
      path: "/generate-content",
      active: activeItem === "generate-content"
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: "מאמרי מערכת",
      path: "/content-inspiration",
      active: activeItem === "content-inspiration"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: "לידים",
      path: "/leads-responses",
      active: activeItem === "leads-responses"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "תגובות",
      path: "/comments",
      active: activeItem === "comments"
    },
    {
      icon: <User className="w-5 h-5" />,
      label: "הפרופיל שלי",
      path: "/profile",
      active: activeItem === "profile"
    }
  ];
  
  // Add affiliate program menu item only if user has access
  const menuItems = user.subscription.hasAffiliateAccess 
    ? [
        ...baseMenuItems,
        {
          icon: <Handshake className="w-5 h-5" />,
          label: "תוכנית שותפים",
          path: "/affiliate-program",
          active: activeItem === "affiliate-program"
        }
      ]
    : baseMenuItems;

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <aside 
      className={cn(
        "bg-white shadow-sm z-10 h-full transition-all duration-300 flex flex-col",
        collapsed ? "w-[60px]" : "w-[200px]"
      )}
    >
      {/* Logo and Toggle */}
      <div className="p-3 border-b flex items-center justify-between">
        {!collapsed && <div className="text-lg font-bold">הוגי</div>}
        <button 
          onClick={toggleSidebar}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
      
      {/* Navigation Items */}
      <div className="flex-1 py-3 overflow-y-auto">
        {menuItems.map((item) => (
          <button 
            key={item.path}
            onClick={() => navigateTo(item.path)}
            className={cn(
              "w-full flex items-center px-3 py-2.5 mb-1 mx-1.5 rounded-md transition-colors",
              item.active 
                ? "bg-primary/10 text-primary" 
                : "hover:bg-gray-100 text-gray-700"
            )}
          >
            <span className="flex items-center justify-center">{item.icon}</span>
            {!collapsed && <span className="mr-2.5 text-sm">{item.label}</span>}
          </button>
        ))}
      </div>
      
      {/* Settings */}
      <div className="p-3 border-t">
        <button 
          className="w-full flex items-center px-3 py-2.5 rounded-md hover:bg-gray-100 text-gray-700"
          onClick={() => navigateTo('/settings')}
        >
          <Settings className="w-5 h-5" />
          {!collapsed && <span className="mr-2.5 text-sm">הגדרות</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
