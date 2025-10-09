
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ArticleActions from "./article-actions/ArticleActions";
import ArticleHeaderActions from "./article-actions/ArticleHeaderActions";
import TranslateDialog from "./article-dialogs/TranslateDialog";
import SummaryDialog from "./article-dialogs/SummaryDialog";

interface ArticleCardProps {
  title: string;
  description: string;
  index: number;
  showSmartTools?: boolean;
  platformIcon?: string;
}

const ArticleCard = ({ 
  title, 
  description, 
  index, 
  showSmartTools = false,
  platformIcon = "🅕" 
}: ArticleCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTranslateModalOpen, setIsTranslateModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  
  const handleTranslateClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsTranslateModalOpen(true);
  };

  const handleSummaryClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsSummaryModalOpen(true);
  };

  return (
    <>
      <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
        <div className="flex items-center">
          <div className="bg-blue-100 rounded-full p-1 mr-2">
            <span role="img" aria-label="platform" className="text-xs">{platformIcon}</span>
          </div>
          <h3 className="font-medium flex-grow">{title} #{index + 1}</h3>
          
          <ArticleHeaderActions />
        </div>
        
        {showSmartTools && (
          <ArticleActions 
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            onTranslateClick={handleTranslateClick}
            onSummaryClick={handleSummaryClick}
          />
        )}
        
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <div className="flex justify-between items-center mt-2">
          <Button variant="link" className="p-0">קרא עוד</Button>
          <span className="text-xs text-gray-500">12/05/25 • פורסם</span>
        </div>
      </div>
      
      {/* Dialogs */}
      <TranslateDialog 
        isOpen={isTranslateModalOpen} 
        setIsOpen={setIsTranslateModalOpen}
        title={title}
        index={index}
      />

      <SummaryDialog 
        isOpen={isSummaryModalOpen} 
        setIsOpen={setIsSummaryModalOpen}
        title={title}
        index={index}
      />
    </>
  );
};

export default ArticleCard;
