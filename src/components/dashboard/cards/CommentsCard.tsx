
import React from "react";
import { MessageCircle } from "lucide-react";
import DashboardCard from "./DashboardCard";

interface CommentType {
  name: string;
  text: string;
  time: string;
}

interface CommentsCardProps {
  recentComments: CommentType[];
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick?: () => void;
}

const CommentsCard = ({ 
  recentComments, 
  isActive, 
  onMouseEnter, 
  onMouseLeave,
  onClick
}: CommentsCardProps) => {
  const tooltipText = recentComments.map(comment => `${comment.name}: ${comment.text}`).join('\n');
  
  return (
    <DashboardCard
      id="comments"
      title="תגובות"
      path="/comments"
      color="amber"
      icon={<MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />}
      tooltip={tooltipText}
      isActive={isActive}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    />
  );
};

export default CommentsCard;
