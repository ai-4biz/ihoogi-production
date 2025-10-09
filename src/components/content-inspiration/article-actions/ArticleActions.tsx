
import { Star, Globe, FileText, Lightbulb } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ArticleActionsProps {
  isFavorite: boolean;
  setIsFavorite: (value: boolean) => void;
  onTranslateClick: (event: React.MouseEvent) => void;
  onSummaryClick: (event: React.MouseEvent) => void;
}

const ArticleActions = ({ 
  isFavorite, 
  setIsFavorite, 
  onTranslateClick, 
  onSummaryClick 
}: ArticleActionsProps) => {
  
  const handleFavoriteToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "הוסר מהמועדפים" : "נוסף למועדפים",
    });
  };

  const handleKeyIdeasClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toast({
      title: "מדגיש רעיונות מרכזיים...",
      description: "הרעיונות המרכזיים יודגשו בקרוב",
    });
  };

  return (
    <div className="flex items-center mt-2 gap-2 border-t pt-2">
      <button 
        className="icon-btn flex items-center justify-center cursor-pointer"
        onClick={handleFavoriteToggle}
        title="שמור"
      >
        <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
      </button>
      
      <button 
        className="icon-btn flex items-center justify-center cursor-pointer"
        onClick={onTranslateClick}
        title="תרגם"
      >
        <Globe className="w-4 h-4" />
      </button>
      
      <button 
        className="icon-btn flex items-center justify-center cursor-pointer"
        onClick={onSummaryClick}
        title="סיכום"
      >
        <FileText className="w-4 h-4" />
      </button>
      
      <button 
        className="icon-btn flex items-center justify-center cursor-pointer"
        onClick={handleKeyIdeasClick}
        title="רעיונות מרכזיים"
      >
        <Lightbulb className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ArticleActions;
