
import React, { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export interface DashboardCardProps {
  id: string;
  title: string;
  path: string;
  icon: ReactNode;
  tooltip: string;
  color: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick?: () => void;
}

const DashboardCard = ({
  id,
  title,
  path,
  icon,
  tooltip,
  color,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick
}: DashboardCardProps) => {
  const isMobile = useIsMobile();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="relative w-full">
      {/* Card */}
      <div 
        className={`aspect-square bg-white rounded-xl p-3 md:p-4 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 ${isActive ? `ring-2 ring-${color}-500` : ''}`} 
        onMouseEnter={onMouseEnter} 
        onMouseLeave={onMouseLeave} 
        onClick={handleCardClick}
      >
        <div className={`bg-${color}-100 p-2 md:p-3 rounded-full mb-2 md:mb-3`}>
          {icon}
        </div>
        <h3 className="text-sm md:text-base font-medium text-center">{title}</h3>
      </div>
    </div>
  );
};

export default DashboardCard;
