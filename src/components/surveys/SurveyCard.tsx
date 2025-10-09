import { Calendar, Edit, Copy, BarChart3, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ActiveBadgeToggle from "./ActiveBadgeToggle";

interface SurveyCardProps {
  data: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    active: boolean;
    leadsNew: number;
    leadsTotal: number;
    repliesNew: number;
    repliesTotal: number;
  };
  onToggleActive: (id: string, active: boolean) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onStats: (id: string) => void;
  onDistribute: (id: string) => void;
}

const SurveyCard = ({
  data,
  onToggleActive,
  onEdit,
  onDuplicate,
  onStats,
  onDistribute,
}: SurveyCardProps) => {
  return (
    <div className="bg-card border-0 rounded-xl shadow-sm p-5 hover:shadow-md transition-all" dir="rtl">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1.5">{data.name}</h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{data.createdAt}</span>
          </div>
        </div>
        <ActiveBadgeToggle
          active={data.active}
          onChange={(next) => onToggleActive(data.id, next)}
        />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">לידים חדשים</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-foreground">{data.leadsNew}</span>
            <span className="text-xs text-muted-foreground">מתוך {data.leadsTotal}</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">תגובות חדשות</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-foreground">{data.repliesNew}</span>
            <span className="text-xs text-muted-foreground">מתוך {data.repliesTotal}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 pt-4 border-t border-border/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(data.id)}
          className="flex items-center gap-1.5 text-xs h-8 hover:bg-muted"
        >
          <Edit className="h-3.5 w-3.5" />
          <span>עריכה</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDuplicate(data.id)}
          className="flex items-center gap-1.5 text-xs h-8 hover:bg-muted"
        >
          <Copy className="h-3.5 w-3.5" />
          <span>שכפול</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onStats(data.id)}
          className="flex items-center gap-1.5 text-xs h-8 hover:bg-muted"
        >
          <BarChart3 className="h-3.5 w-3.5" />
          <span>נתונים</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDistribute(data.id)}
          className="flex items-center gap-1.5 text-xs h-8 hover:bg-muted"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>הפצה</span>
        </Button>
      </div>
    </div>
  );
};

export default SurveyCard;
