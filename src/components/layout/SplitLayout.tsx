
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LeftPane from "./LeftPane";
import { useIsMobile } from "@/hooks/use-mobile";

type ViewState = "root" | "content" | "articles" | "leads" | "profile";

interface SplitLayoutProps {
  children: React.ReactNode;
  initialState?: ViewState;
}

export const SplitLayout = ({ children, initialState = "root" }: SplitLayoutProps) => {
  const [currentState, setCurrentState] = useState<ViewState>(initialState);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Function to handle navigation based on the state
  const handleStateChange = (newState: ViewState) => {
    setCurrentState(newState);
    setMobileMenuOpen(false);

    // Handle navigation based on state
    switch (newState) {
      case "content":
        navigate("/generate-content");
        break;
      case "articles":
        navigate("/content-inspiration");
        break;
      case "leads":
        navigate("/leads-responses");
        break;
      case "profile":
        navigate("/profile");
        break;
      case "root":
        navigate("/");
        break;
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile hamburger menu button */}
      {isMobile && (
        <div className="sticky top-0 z-30 bg-white shadow-sm w-full p-2 flex items-center">
          <Button 
            variant="ghost" 
            className="p-1.5" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex-1 text-center font-medium">הוגי</div>
        </div>
      )}

      {/* Left Pane (Pane A) */}
      <div 
        className={cn(
          "bg-white md:w-1/3 shadow-md z-20 transition-all duration-300",
          isMobile 
            ? `fixed inset-x-0 top-[40px] ${mobileMenuOpen ? 'h-[33vh] opacity-100' : 'h-0 opacity-0 pointer-events-none'}`
            : "w-1/3 min-h-screen"
        )}
      >
        <LeftPane 
          currentState={currentState} 
          onStateChange={handleStateChange} 
        />
      </div>

      {/* Right Pane (Pane B) */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        isMobile ? "pt-[40px]" : ""
      )}>
        {currentState === "root" ? (
          <div className="h-full flex items-center justify-center p-4">
            <p className="text-lg text-center text-gray-500">
              בחרי פעולה מצד שמאל ↖️
            </p>
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
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplitLayout;
