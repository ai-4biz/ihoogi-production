
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X, ChevronDown, ChevronUp } from "lucide-react";

const HoogiAssistant = () => {
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Check if user has dismissed the assistant before
  useEffect(() => {
    const assistantState = localStorage.getItem('hoogiAssistantVisible');
    if (assistantState !== null) {
      setIsVisible(assistantState === 'true');
    }
  }, []);

  const autoSuggestIdea = () => {
    toast.success("בקרוב נייצר רעיון חדש...");
  };

  const summarizeQuestionnaire = () => {
    toast.success("בקרוב נסכם את השאלון...");
  };

  const suggestInspirationByCategory = () => {
    toast.success("בקרוב נציע השראה לפי הקטגוריה...");
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('hoogiAssistantVisible', 'false');
  };

  const handleRestore = () => {
    setIsVisible(true);
    localStorage.setItem('hoogiAssistantVisible', 'true');
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
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
    <div className="fixed z-50 bottom-4 right-4 max-w-[300px] md:max-w-[320px] animate-float">
      <div className="bg-white rounded-lg shadow-lg relative">
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 text-gray-400 hover:text-gray-600"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="flex items-start p-4">
          <Avatar className="h-12 w-12 mr-3 flex-shrink-0">
            <AvatarImage src="/hoogi-new-avatar.png" alt="iHoogi Avatar" />
            <AvatarFallback className="bg-primary text-2xl text-white">🦉</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="bg-blue-50 rounded-lg p-3 mb-2 relative shadow-sm">
              <p className="text-sm font-medium">
                היי! 👋 ברוכה הבאה למסך יצירת תוכן
              </p>
              <div className="absolute right-[-8px] top-5 transform -translate-y-1/2 w-3 h-3 bg-blue-50 rotate-45"></div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-xs text-primary gap-1 px-2 py-1 h-auto mb-2"
              onClick={toggleExpanded}
            >
              {expanded ? 'צמצם מידע' : 'הצג מידע'} 
              {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </Button>
            
            {expanded && (
              <div className="text-gray-600 text-xs mt-2 space-y-1.5 pr-2">
                <p>עקרונות עבודה:</p>
                <ol className="list-decimal list-inside space-y-1 pr-2">
                  <li>ניתוח מידע מהשאלון</li>
                  <li>שילוב רעיונות השראה אם נבחרו</li>
                  <li>התאמת תוכן אישי לקהל היעד</li>
                  <li>יצירת תוכן מוכן לפרסום 🎯</li>
                </ol>
              </div>
            )}
            
            <div className="flex flex-wrap gap-1 mt-2">
              <Button 
                onClick={autoSuggestIdea} 
                variant="outline" 
                size="sm"
                className="bg-white hover:bg-blue-50 text-xs h-7 px-2"
              >
                רעיון לפוסט
              </Button>
              <Button 
                onClick={summarizeQuestionnaire} 
                variant="outline" 
                size="sm"
                className="bg-white hover:bg-blue-50 text-xs h-7 px-2"
              >
                סיכום השאלון
              </Button>
              <Button 
                onClick={suggestInspirationByCategory} 
                variant="outline" 
                size="sm"
                className="bg-white hover:bg-blue-50 text-xs h-7 px-2"
              >
                השראה לתחום שלי
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* ChatBubble arrow */}
      <div className="absolute bottom-[-8px] right-[30px] w-4 h-4 bg-white transform rotate-45 shadow-lg"></div>
    </div>
  );
};

export default HoogiAssistant;
