
import React from "react";
import { MessageSquare } from "lucide-react";
import DashboardCard from "./DashboardCard";

interface LeadType {
  name: string;
  message: string;
  time: string;
}

interface LeadsCardProps {
  recentLeads: LeadType[];
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick?: () => void;
}

const LeadsCard = ({ recentLeads, isActive, onMouseEnter, onMouseLeave, onClick }: LeadsCardProps) => {
  const tooltipText = recentLeads.map(lead => `${lead.name}: ${lead.message}`).join('\n');
  
  return (
    <DashboardCard
      id="leads"
      title="לידים"
      path="/leads-responses"
      color="purple"
      icon={<MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />}
      tooltip={tooltipText}
      isActive={isActive}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    />
  );
};

export default LeadsCard;
