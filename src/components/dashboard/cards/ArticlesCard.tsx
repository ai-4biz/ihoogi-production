
import React from "react";
import { BookOpen } from "lucide-react";
import DashboardCard from "./DashboardCard";

interface ArticlesCardProps {
  newArticlesCount: number;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick?: () => void;
}

const ArticlesCard = ({ 
  newArticlesCount, 
  isActive, 
  onMouseEnter, 
  onMouseLeave,
  onClick
}: ArticlesCardProps) => {
  return (
    <DashboardCard
      id="articles"
      title="מאמרי מערכת"
      path="/content-inspiration"
      color="green"
      icon={<BookOpen className="h-5 w-5 md:h-6 md:w-6 text-green-600" />}
      tooltip={`${newArticlesCount} מאמרים חדשים נוספו`}
      isActive={isActive}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    />
  );
};

export default ArticlesCard;
