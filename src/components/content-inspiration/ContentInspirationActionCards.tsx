
import { useIsMobile } from "@/hooks/use-mobile";
import { FileText, User, Layers, Search } from "lucide-react";

interface ContentInspirationActionCardsProps {
  onCardHover?: (cardId: string | null) => void;
  onCardClick?: (contentType: string) => void;
  activeCard?: string;
}

const ContentInspirationActionCards = ({ 
  onCardHover, 
  onCardClick, 
  activeCard = "articles" 
}: ContentInspirationActionCardsProps) => {
  const isMobile = useIsMobile();
  
  // Define the cards data
  const cards = [
    {
      id: "myContent",
      title: "התוכן שאני יצרתי",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      tooltip: "המאמרים שיצרתי",
      color: "blue",
      onClick: () => {
        if (onCardClick) onCardClick("myContent");
      }
    },
    {
      id: "marketingArticles",
      title: "מאמרי מערכת בנושא שיווק",
      icon: <FileText className="h-6 w-6 text-green-500" />,
      tooltip: "מאמרי מערכת בנושא שיווק",
      color: "green",
      onClick: () => {
        if (onCardClick) onCardClick("marketingArticles");
      }
    },
    {
      id: "myCategory",
      title: "הקטגוריה שלי",
      icon: <User className="h-6 w-6 text-purple-500" />,
      tooltip: "מאמרים בקטגוריה שלי",
      color: "purple",
      onClick: () => {
        if (onCardClick) onCardClick("myCategory");
      }
    },
    {
      id: "otherCategories",
      title: "קטגוריות אחרות",
      icon: <Layers className="h-6 w-6 text-orange-500" />,
      tooltip: "מאמרים בקטגוריות אחרות (לפי סוג מנוי)",
      color: "orange",
      onClick: () => {
        if (onCardClick) onCardClick("otherCategories");
      }
    }
  ];

  // Handle card hover event
  const handleCardHover = (cardId: string | null) => {
    if (onCardHover) {
      onCardHover(cardId);
    }
  };
  
  // Create a grid with 2 cards in the top row and 2 in the bottom row
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {/* Top row - 2 cards */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {cards.slice(0, 2).map((card) => (
          <div key={card.id} className="relative w-full">
            <div 
              className={`aspect-square bg-white rounded-xl p-3 md:p-4 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 ${activeCard === card.id ? `ring-2 ring-${card.color}-500` : ''}`} 
              onMouseEnter={() => handleCardHover(card.id)} 
              onMouseLeave={() => handleCardHover(null)} 
              onClick={card.onClick}
            >
              <div className={`bg-${card.color}-100 p-2 md:p-3 rounded-full mb-2 md:mb-3`}>
                {card.icon}
              </div>
              <h3 className="text-sm md:text-base font-medium text-center">{card.title}</h3>
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom row - 2 cards */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {cards.slice(2, 4).map((card) => (
          <div key={card.id} className="relative w-full">
            <div 
              className={`aspect-square bg-white rounded-xl p-3 md:p-4 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 ${activeCard === card.id ? `ring-2 ring-${card.color}-500` : ''}`} 
              onMouseEnter={() => handleCardHover(card.id)} 
              onMouseLeave={() => handleCardHover(null)} 
              onClick={card.onClick}
            >
              <div className={`bg-${card.color}-100 p-2 md:p-3 rounded-full mb-2 md:mb-3`}>
                {card.icon}
              </div>
              <h3 className="text-sm md:text-base font-medium text-center">{card.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentInspirationActionCards;
