
import React from "react";
import { FileText } from "lucide-react";
import DashboardCard from "./DashboardCard";

interface ContentCardProps {
  lastArticle: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick?: () => void;
}

const ContentCard = ({ lastArticle, isActive, onMouseEnter, onMouseLeave, onClick }: ContentCardProps) => {
  return (
    <DashboardCard
      id="content"
      title="יצירת תוכן"
      path="/generate-content"
      color="blue"
      icon={<FileText className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />}
      tooltip={`המאמר האחרון: ${lastArticle}`}
      isActive={isActive}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    />
  );
};

export default ContentCard;
