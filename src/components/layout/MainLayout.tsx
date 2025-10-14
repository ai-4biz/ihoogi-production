import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUser } from "@/hooks/use-user";
import HoogiAvatar from "@/components/dashboard/HoogiAvatar";
import SidebarMenu from "./SidebarMenu";
import NavigationDrawer from "./NavigationDrawer";
import ContentArea from "./ContentArea";
import ContactForm from "@/components/contact/ContactForm";
import OrganizationsView from "@/components/organizations/OrganizationsView";

// Update the ViewState type to include "organizations"
export type ViewState = "root" | "content" | "articles" | "leads" | "profile" | "automations" | "affiliate" | "contact" | "organizations";
interface MainLayoutProps {
  children: React.ReactNode;
  initialState?: ViewState;
}
const MainLayout = ({
  children,
  initialState = "root"
}: MainLayoutProps) => {
  const [currentState, setCurrentState] = useState<ViewState>(initialState);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const {
    user
  } = useUser();

  // Function to handle navigation based on the state
  const handleStateChange = (newState: ViewState) => {
    setCurrentState(newState);
    setMobileDrawerOpen(false);

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
      case "automations":
        navigate("/automations");
        break;
      case "affiliate":
        navigate("/affiliate-program");
        break;
      case "contact":
        // We'll handle contact form in the current layout instead of navigating
        break;
      case "organizations":
        navigate("/organizations");
        break;
      case "root":
        navigate("/main-dashboard");
        break;
    }
  };
  return <div className="min-h-screen flex flex-col md:flex-row bg-[#F3F7FC]">
      {/* Mobile header with hamburger menu */}
      {isMobile && <div className="sticky top-0 z-30 bg-white shadow-sm w-full p-2 flex items-center">
          <NavigationDrawer open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen} currentState={currentState} handleStateChange={handleStateChange} user={user} />
          <div className="flex-1 text-center font-medium">iHoogi</div>
        </div>}

      {/* Pane A - Left Drawer (Desktop) */}
      <SidebarMenu currentState={currentState} handleStateChange={handleStateChange} isMobile={isMobile} user={user} />

      {/* Pane B - Main Content Area */}
      <ContentArea currentState={currentState} handleStateChange={handleStateChange} isMobile={isMobile}>
        {currentState === "contact" ? <ContactForm onBack={() => handleStateChange("root")} /> : currentState === "organizations" ? <OrganizationsView /> : children}
      </ContentArea>

      {/* Floating Hoogi Helper */}
      <HoogiAvatar message="היי! אני כאן לעזור לך" subMessage="בחרי באחת האפשרויות כדי להמשיך" />
    </div>;
};
export default MainLayout;