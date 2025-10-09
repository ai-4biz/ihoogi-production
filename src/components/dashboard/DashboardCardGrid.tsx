
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import ContentCard from "./cards/ContentCard";
import ArticlesCard from "./cards/ArticlesCard";
import LeadsCard from "./cards/LeadsCard";
import CommentsCard from "./cards/CommentsCard";

interface DashboardCardGridProps {
  onCardHover?: (cardId: string | null) => void;
  singleColumn?: boolean;
}

const DashboardCardGrid = ({ onCardHover, singleColumn = false }: DashboardCardGridProps) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Sample data - in a real app, this would come from props or context
  const [lastArticle] = useState("שיווק לעסקים קטנים באינסטגרם");
  const [newArticles] = useState(3);
  const [recentLeads] = useState([
    { name: "גליה לוי", message: "מעוניינת בפגישת ייעוץ", time: "לפני שעה" },
    { name: "שירה כהן", message: "רוצה מידע נוסף על השירותים", time: "לפני 3 שעות" }
  ]);
  const [recentComments] = useState([
    { name: "רוני", text: "תודה על המאמר המעולה!", time: "לפני 30 דקות" },
    { name: "דניאל", text: "מעניין מאוד, אשמח לדעת עוד", time: "לפני שעתיים" }
  ]);

  // Handle click navigation
  const handleCardClick = (path: string, cardId: string) => {
    setActiveCard(cardId);
    if (onCardHover) {
      onCardHover(cardId);
    }
    // Navigate on single click
    navigate(path);
  };
  
  // Handle card hover events
  const handleCardHover = (cardId: string | null) => {
    setActiveCard(cardId);
    if (onCardHover) {
      onCardHover(cardId);
    }
  };

  // Define grid classes based on singleColumn prop
  const gridClasses = singleColumn 
    ? "grid grid-cols-1 gap-3 md:gap-4" 
    : "grid grid-cols-2 gap-3 md:gap-4";

  return (
    <div className={gridClasses}>
      <ContentCard 
        lastArticle={lastArticle} 
        isActive={activeCard === "content"}
        onMouseEnter={() => handleCardHover("content")} 
        onMouseLeave={() => handleCardHover(null)}
        onClick={() => handleCardClick("/generate-content", "content")}
      />
      
      <ArticlesCard 
        newArticlesCount={newArticles} 
        isActive={activeCard === "articles"}
        onMouseEnter={() => handleCardHover("articles")} 
        onMouseLeave={() => handleCardHover(null)}
        onClick={() => handleCardClick("/content-inspiration", "articles")}
      />
      
      <LeadsCard 
        recentLeads={recentLeads} 
        isActive={activeCard === "leads"}
        onMouseEnter={() => handleCardHover("leads")} 
        onMouseLeave={() => handleCardHover(null)}
        onClick={() => handleCardClick("/leads-responses?tab=leads", "leads")}
      />
      
      <CommentsCard 
        recentComments={recentComments} 
        isActive={activeCard === "comments"}
        onMouseEnter={() => handleCardHover("comments")} 
        onMouseLeave={() => handleCardHover(null)}
        onClick={() => handleCardClick("/leads-responses?tab=comments", "comments")}
      />
    </div>
  );
};

export default DashboardCardGrid;
