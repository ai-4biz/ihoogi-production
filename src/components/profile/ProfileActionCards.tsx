
import { FileQuestion, CreditCard, BookOpen, Bell } from "lucide-react";

interface ProfileActionCardsProps {
  onCardClick?: (formType: string) => void;
  activeCard?: string;
}

const ProfileActionCards = ({ 
  onCardClick, 
  activeCard = "questionnaire" 
}: ProfileActionCardsProps) => {
  // Define the cards data
  const cards = [
    {
      id: "questionnaire",
      title: "שאלון כניסה",
      icon: <FileQuestion className="h-6 w-6 text-blue-500" />,
      color: "blue",
      onClick: () => {
        if (onCardClick) onCardClick("questionnaire");
      }
    },
    {
      id: "billing",
      title: "מצב חיובים",
      icon: <CreditCard className="h-6 w-6 text-red-500" />,
      color: "red",
      onClick: () => {
        if (onCardClick) onCardClick("billing");
      }
    },
    {
      id: "my-articles",
      title: "המאמרים שלי",
      icon: <BookOpen className="h-6 w-6 text-green-500" />,
      color: "green",
      onClick: () => {
        if (onCardClick) onCardClick("my-articles");
      }
    },
    {
      id: "notifications",
      title: "התראות",
      icon: <Bell className="h-6 w-6 text-yellow-500" />,
      color: "yellow",
      onClick: () => {
        if (onCardClick) onCardClick("notifications");
      }
    }
  ];
  
  // Create a grid with 2 cards in each row
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      {cards.map((card) => (
        <div key={card.id} className="relative w-full">
          <div 
            className={`aspect-square bg-white rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 ${activeCard === card.id ? `ring-2 ring-${card.color}-500` : ''}`} 
            onClick={card.onClick}
          >
            <div className={`bg-${card.color}-100 p-2 rounded-full mb-2`}>
              {card.icon}
            </div>
            <h3 className="text-sm font-medium text-center">{card.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileActionCards;
