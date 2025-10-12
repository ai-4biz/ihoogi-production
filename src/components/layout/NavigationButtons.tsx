
import CircularButton from "./CircularButton";
import { User } from "@/hooks/use-user";
import { ViewState } from "./MainLayout";
import { useNavigate } from "react-router-dom";

interface NavigationButtonsProps {
  currentState: ViewState;
  handleStateChange: (newState: ViewState) => void;
  user: User;
}

const NavigationButtons = ({ 
  currentState, 
  handleStateChange,
  user 
}: NavigationButtonsProps) => {
  const navigate = useNavigate();
  
  const buttons = [
    {
      id: "my-hoogi",
      emoji: "📝",
      label: "ihoogi שלי",
      state: "root" as ViewState,
      active: window.location.pathname === "/my-hoogi",
      color: "blue",
      onClick: () => navigate("/my-hoogi")
    },
    {
      id: "articles",
      emoji: "📚",
      label: "השאלונים שלי",
      state: "root" as ViewState,
      active: window.location.pathname === "/surveys",
      color: "indigo",
      onClick: () => navigate("/surveys")
    },
    {
      id: "distribution",
      emoji: "📤",
      label: "הפצה",
      state: "root" as ViewState,
      active: window.location.pathname === "/distribution",
      color: "teal",
      onClick: () => navigate("/distribution")
    },
    {
      id: "leads",
      emoji: "💬",
      label: "לידים ותשובות",
      state: "leads" as ViewState,
      active: currentState === "leads",
      color: "purple"
    },
    {
      id: "create-questionnaire",
      emoji: "📝",
      label: "שאלון חדש",
      state: "root" as ViewState,
      active: window.location.pathname === "/create-questionnaire",
      color: "green",
      onClick: () => navigate("/create-questionnaire")
    },
    {
      id: "profile",
      emoji: "👤",
      label: "הפרופיל שלי",
      state: "profile" as ViewState,
      active: currentState === "profile",
      color: "orange"
    },
    {
      id: "automations",
      emoji: "🎧",
      label: "אוטומציות",
      state: "automations" as ViewState,
      active: currentState === "automations",
      color: "red"
    },
    {
      id: "create-template",
      emoji: "🎨",
      label: "האוטומציות שלי",
      state: "root" as ViewState,
      active: window.location.pathname === "/create-template",
      color: "violet",
      onClick: () => navigate("/create-template")
    },
    {
      id: "notifications",
      emoji: "🔔",
      label: "ההתרעות שלי",
      state: "root" as ViewState,
      active: window.location.pathname === "/notifications",
      color: "orange",
      onClick: () => navigate("/notifications")
    },
    {
      id: "partners",
      emoji: "🤝",
      label: "ניהול שותפים",
      state: "root" as ViewState,
      active: window.location.pathname === "/partners",
      color: "purple",
      onClick: () => navigate("/partners")
    },
    {
      id: "contact",
      emoji: "✉️",
      label: "צור קשר",
      state: "contact" as ViewState,
      active: currentState === "contact",
      color: "pink"
    },
    {
      id: "subscriptions",
      emoji: "💳",
      label: "המנוי שלי",
      state: "root" as ViewState,
      active: window.location.pathname === "/subscriptions",
      color: "cyan",
      onClick: () => navigate("/subscriptions")
    },
    {
      id: "root",
      emoji: "🏠",
      label: "ראשי",
      state: "root" as ViewState,
      active: currentState === "root",
      color: "blue",
      onClick: () => navigate("/main-dashboard")
    }
  ];

  // Show the affiliate program button only if user has affiliate access
  if (user.subscription.hasAffiliateAccess) {
    buttons.splice(8, 0, {
      id: "affiliate",
      emoji: "🤝",
      label: "השותפים שלי",
      state: "affiliate" as ViewState,
      active: currentState === "affiliate",
      color: "indigo"
    });
  }
  
  // Show the organizations button only if user has organization access
  if (user.subscription.isOrganization) {
    buttons.splice(user.subscription.hasAffiliateAccess ? 9 : 8, 0, {
      id: "organizations",
      emoji: "🏢",
      label: "הארגון שלי",
      state: "organizations" as ViewState,
      active: currentState === "organizations",
      color: "teal"
    });
  }

  return (
    <div className="grid grid-cols-2 gap-3 mx-auto" style={{ width: '176px' }}>
      {buttons.map((button) => (
        <CircularButton
          key={button.id}
          id={button.id}
          emoji={button.emoji}
          label={button.label}
          state={button.state}
          active={button.active}
          color={button.color}
          onClick={(button as any).onClick || handleStateChange}
        />
      ))}
    </div>
  );
};

export default NavigationButtons;
