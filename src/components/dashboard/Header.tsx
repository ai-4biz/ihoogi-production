
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/use-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import ContactButton from "@/components/contact/ContactButton";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const { user, logout } = useUser();
  const isMobile = useIsMobile();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className={cn("border-b bg-white", className)}>
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold mr-4">הוגי</h2>
          {!isMobile && (
            <nav className="mr-6 hidden md:block">
              <ul className="flex items-center space-x-4 space-x-reverse">
                <li>
                  <a
                    href="/"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    דף הבית
                  </a>
                </li>
                <li>
                  <a
                    href="/generate-content"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    יצירת תוכן
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Contact Button */}
          <ContactButton />
          
          <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => window.location.href = '/profile'}
              >
                הפרופיל שלי
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => window.location.href = '/settings'}
              >
                הגדרות
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>התנתק</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
