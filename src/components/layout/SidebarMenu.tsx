
import { cn } from "@/lib/utils";
import NavigationButtons from "./NavigationButtons";
import { User } from "@/hooks/use-user";

// Update ViewState type to match MainLayout.tsx
type ViewState = "root" | "content" | "articles" | "leads" | "profile" | "automations" | "affiliate" | "contact" | "organizations";

interface SidebarMenuProps {
  currentState: ViewState;
  handleStateChange: (newState: ViewState) => void;
  isMobile: boolean;
  user: User;
}

const SidebarMenu = ({ currentState, handleStateChange, isMobile, user }: SidebarMenuProps) => {
  return (
    <div
      className={cn(
        "bg-white shadow-md",
        isMobile ? "hidden" : "w-[220px] min-h-screen fixed",
        // Hebrew (RTL) - right side, English (LTR) - left side
        "rtl:right-0 ltr:left-0"
      )}
    >
      <div className="p-4 flex flex-col items-center h-full">
        {/* iHoogi Image */}
        <img
          src="/hoogi-new-avatar.png"
          alt="iHoogi Avatar"
          className="hoogi-img max-h-[120px] w-auto mb-4"
        />
        {/* Circular Buttons */}
        <NavigationButtons 
          currentState={currentState} 
          handleStateChange={handleStateChange}
          user={user}
        />
      </div>
    </div>
  );
};

export default SidebarMenu;
