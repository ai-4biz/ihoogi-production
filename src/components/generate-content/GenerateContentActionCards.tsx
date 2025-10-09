
import { useNavigate } from "react-router-dom";
import { FileText, Upload, HelpCircle, User } from "lucide-react";

interface GenerateContentActionCardsProps {
  onCardHover?: (cardId: string | null) => void;
  onCardClick?: (contentType: string) => void;
  activeCard?: string | null;
}

const GenerateContentActionCards = ({ 
  onCardHover, 
  onCardClick, 
  activeCard = null 
}: GenerateContentActionCardsProps) => {
  const navigate = useNavigate();
  
  // Define the cards data
  const cards = [
    {
      id: "form",
      title: "יצירת פוסט",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      tooltip: "יצירת פוסט חדש",
      color: "blue",
      onClick: () => {
        if (onCardClick) onCardClick("form");
      }
    },
    {
      id: "articles",
      title: "מאמרי המערכת",
      icon: <FileText className="h-6 w-6 text-green-500" />,
      tooltip: "מאמרי מערכת ותבניות לפוסטים",
      color: "green",
      onClick: () => {
        navigate("/content-inspiration");
      }
    },
    {
      id: "media",
      title: "העלאת מדיה",
      icon: <Upload className="h-6 w-6 text-purple-500" />,
      tooltip: "העלאת תמונות וסרטונים",
      color: "purple",
      onClick: () => {
        if (onCardClick) onCardClick("media");
      }
    },
    {
      id: "questionnaire",
      title: "שאלון",
      icon: <HelpCircle className="h-6 w-6 text-orange-500" />,
      tooltip: "מילוי שאלון להתאמת תוכן",
      color: "orange",
      onClick: () => {
        navigate("/article-questionnaire");
      }
    }
  ];

  // Handle card hover event
  const handleCardHover = (cardId: string | null) => {
    if (onCardHover) {
      onCardHover(cardId);
    }
  };
  
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      {cards.map((card) => (
        <div key={card.id} className="relative w-full">
          <div 
            className={`aspect-square bg-white rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 ${activeCard === card.id ? `ring-2 ring-${card.color}-500` : ''}`} 
            onMouseEnter={() => handleCardHover(card.id)} 
            onMouseLeave={() => handleCardHover(null)} 
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

export default GenerateContentActionCards;
