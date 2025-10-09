
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { User as UserType } from "@/hooks/use-user";
import { ViewState } from "./MainLayout";
import NavigationButtons from "./NavigationButtons";

interface NavigationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentState: ViewState;
  handleStateChange: (state: ViewState) => void;
  user: UserType;
}

const NavigationDrawer = ({
  open,
  onOpenChange,
  currentState,
  handleStateChange,
  user
}: NavigationDrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pt-10">
        <SheetHeader className="text-right mb-6">
          <img
            src="/hoogi-new-avatar.png"
            alt="iHoogi Avatar"
            className="hoogi-img max-h-[120px] w-auto mx-auto mb-4"
          />
          <h2 className="text-xl font-bold">הוגי - תפריט</h2>
        </SheetHeader>

        <div className="mt-8 flex justify-center">
          <NavigationButtons 
            currentState={currentState} 
            handleStateChange={handleStateChange}
            user={user}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavigationDrawer;
