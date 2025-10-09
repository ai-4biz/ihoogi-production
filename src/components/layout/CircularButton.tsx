
import { cn } from "@/lib/utils";

// Update ViewState type to match MainLayout.tsx
type ViewState = "root" | "content" | "articles" | "leads" | "profile" | "automations" | "affiliate" | "contact" | "organizations";

interface CircularButtonProps {
  id: string;
  emoji: string;
  label: string;
  state: ViewState;
  active: boolean;
  color: string;
  onClick?: ((state: ViewState) => void) | (() => void);
}

const CircularButton = ({
  id,
  emoji,
  label,
  state,
  active,
  color,
  onClick
}: CircularButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      // If onClick expects a state parameter
      if (onClick.length > 0) {
        (onClick as (state: ViewState) => void)(state);
      } else {
        // If onClick is a simple callback
        (onClick as () => void)();
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleClick}
        className={cn(
          "w-[72px] h-[72px] rounded-full flex flex-col items-center justify-center transition-all",
          active 
            ? `bg-${color}-100 ring-2 ring-${color}-500` 
            : "bg-white hover:bg-gray-50"
        )}
      >
        <span className="text-2xl mb-1">{emoji}</span>
        <span className="text-xs font-medium">{label}</span>
      </button>
    </div>
  );
};

export default CircularButton;
