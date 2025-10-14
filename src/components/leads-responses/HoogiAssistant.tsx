
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface HoogiAssistantProps {
  activeTab: string;
  newLeadsCount: number;
  newCommentsCount: number;
}

const HoogiAssistant = ({ activeTab, newLeadsCount, newCommentsCount }: HoogiAssistantProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md mb-8">
      <div className="flex items-center">
        <Avatar className="h-16 w-16 mr-4 animate-float">
          <AvatarImage src="/placeholder.svg" alt="iHoogi Avatar" />
          <AvatarFallback className="bg-primary text-2xl text-white">🦉</AvatarFallback>
        </Avatar>
        <div>
          <div className="bg-blue-50 rounded-2xl p-4 mb-2 relative shadow-sm">
            <p className="text-lg font-medium">
              {activeTab.includes('analytics') 
                ? 'הנה ניתוח נתונים שיעזור לך לקבל החלטות טובות יותר!' 
                : `יש לך ${newLeadsCount} לידים חדשים ו-${newCommentsCount} תגובות חדשות!`
              }
            </p>
            <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-50 rotate-45"></div>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            {activeTab.includes('analytics') 
              ? 'המידע מתעדכן בזמן אמת לפי הפעילות באתר שלך' 
              : 'מענה מהיר יגדיל את הסיכוי להמרה'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default HoogiAssistant;
