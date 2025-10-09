
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HoogiAvatarProps {
  message?: string;
  subMessage?: string;
}

const HoogiAvatar = ({ 
  message = "היי! אני Hoogi, החבר הדיגיטלי שלך 🤖", 
  subMessage = "ברוכה הבאה ל-AI-4Biz – כאן התוכן השיווקי שלך נכתב, מתפרסם ומנוהל בידי AI חכם." 
}: HoogiAvatarProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ right: '30px', bottom: '30px' });

  // Check if user has dismissed the avatar before
  useEffect(() => {
    const avatarState = localStorage.getItem('hoogiAvatarVisible');
    if (avatarState !== null) {
      setIsVisible(avatarState === 'true');
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('hoogiAvatarVisible', 'false');
  };

  const handleRestore = () => {
    setIsVisible(true);
    localStorage.setItem('hoogiAvatarVisible', 'true');
  };

  if (!isVisible) {
    return (
      <Button 
        onClick={handleRestore}
        className="fixed bottom-4 right-4 rounded-full w-10 h-10 p-0 z-50 bg-primary text-white shadow-lg hover:bg-primary/90"
        aria-label="Show Hoogi Assistant"
      >
        🦉
      </Button>
    );
  }

  return (
    <div className="fixed z-50" style={{ right: position.right, bottom: position.bottom }}>
      <div className="relative">
        {/* Floating Avatar */}
        <div className="bg-white rounded-xl shadow-lg p-4 flex items-start gap-4 max-w-[320px] md:max-w-[400px] animate-float">
          <div className="flex-shrink-0">
            <Popover>
              <PopoverTrigger>
                <Avatar className="h-14 w-14 md:h-16 md:w-16 cursor-pointer transition-all duration-300 hover:scale-105">
                  <AvatarImage src="/hoogi-new-avatar.png" alt="iHoogi Avatar" />
                  <AvatarFallback className="bg-primary text-white text-2xl">🦉</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="center">
                <div className="space-y-2">
                  <h4 className="font-semibold">הוגי - העוזרת האישית שלך</h4>
                  <p className="text-sm">אני כאן כדי לעזור לך ליצור תוכן מעולה, לענות על שאלות ולהנחות אותך בכל שלב.</p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex-1">
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute top-1 right-1 h-6 w-6 text-gray-400 hover:text-gray-600"
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
            </Button>
            <p className="font-semibold text-sm md:text-base">{message}</p>
            <p className="text-xs md:text-sm text-gray-600 mt-1">{subMessage}</p>
          </div>
        </div>
        
        {/* ChatBubble arrow */}
        <div className="absolute bottom-[-8px] right-[30px] w-4 h-4 bg-white transform rotate-45 shadow-lg"></div>
      </div>
    </div>
  );
};

export default HoogiAvatar;
