
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HoogiTipProps {
  tip: string;
}

const HoogiTip = ({ tip }: HoogiTipProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative animate-float mb-6">
      <div className="flex items-start space-x-4 rtl:space-x-reverse">
        <div className="w-16 h-16 flex-shrink-0 relative">
          <img
            src="/hoogi-new-avatar.png"
            alt="iHoogi Avatar"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="bg-blue-50 p-4 rounded-lg rounded-tl-none border border-blue-100 shadow-sm relative">
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 text-gray-400 hover:text-gray-600"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <p className="text-blue-800 pr-6">{tip}</p>
        </div>
      </div>
    </div>
  );
};

export default HoogiTip;
