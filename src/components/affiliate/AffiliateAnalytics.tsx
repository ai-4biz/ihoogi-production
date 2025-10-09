
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { he } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data for leads by month
const leadsByMonth = [
  { name: "ינו", leads: 65, conversions: 12 },
  { name: "פבר", leads: 59, conversions: 15 },
  { name: "מרץ", leads: 80, conversions: 18 },
  { name: "אפר", leads: 81, conversions: 20 },
  { name: "מאי", leads: 56, conversions: 10 },
  { name: "יונ", leads: 55, conversions: 12 },
  { name: "יול", leads: 40, conversions: 8 },
  { name: "אוג", leads: 45, conversions: 9 },
  { name: "ספט", leads: 60, conversions: 14 },
  { name: "אוק", leads: 70, conversions: 17 },
  { name: "נוב", leads: 75, conversions: 19 },
  { name: "דצמ", leads: 85, conversions: 22 },
];

// Mock data for conversions by tier
const conversionsByTier = [
  { name: "Bronze", value: 35, color: "#CD7F32" },
  { name: "Silver", value: 45, color: "#C0C0C0" },
  { name: "Gold", value: 80, color: "#FFD700" },
];

// Mock data for top partners
const topPartners = [
  { id: "P004", name: "רונית שרון", tier: "gold", leads: 45, conversions: 18, revenue: 6700 },
  { id: "P001", name: "דן כהן", tier: "gold", leads: 34, conversions: 12, revenue: 4500 },
  { id: "P002", name: "מיכל לוי", tier: "silver", leads: 19, conversions: 5, revenue: 1850 },
  { id: "P007", name: "יוסי לוין", tier: "silver", leads: 15, conversions: 4, revenue: 1600 },
  { id: "P003", name: "אבי ישראלי", tier: "bronze", leads: 8, conversions: 2, revenue: 750 },
];

const AffiliateAnalytics = () => {
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 0, 1), // January 1, 2024
    to: new Date(),
  });

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case "gold": return "bg-yellow-100 text-yellow-800";
      case "silver": return "bg-gray-100 text-gray-800";
      case "bronze": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTierName = (tier: string) => {
    return tier.charAt(0).toUpperCase() + tier.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>טווח תאריכים</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="grid gap-2 flex-1">
              <div className="flex items-center">
                <label className="text-sm font-medium mr-2">מתאריך:</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        format(dateRange.from, "PPP", { locale: he })
                      ) : (
                        <span>בחר תאריך</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => setDateRange(prev => ({ ...prev, from: date as Date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="grid gap-2 flex-1">
              <div className="flex items-center">
                <label className="text-sm font-medium mr-2">עד תאריך:</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange.to && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? (
                        format(dateRange.to, "PPP", { locale: he })
                      ) : (
                        <span>בחר תאריך</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => setDateRange(prev => ({ ...prev, to: date as Date }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center">
                <span>לידים והמרות לפי חודש</span>
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-2 text-muted-foreground">ℹ️</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>הגרף מציג את מספר הלידים וההמרות בכל חודש</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadsByMonth}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [value, name === "leads" ? "לידים" : "המרות"]}
                    labelFormatter={(value) => `חודש: ${value}`}
                  />
                  <Bar dataKey="leads" fill="#8884d8" name="לידים" />
                  <Bar dataKey="conversions" fill="#82ca9d" name="המרות" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center">
                <span>המרות לפי דרגה</span>
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <span className="ml-2 text-muted-foreground">ℹ️</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>הגרף מציג את התפלגות ההמרות לפי דרגת השותפים</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={conversionsByTier}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={(entry) => entry.name}
                  >
                    {conversionsByTier.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`המרות: ${value}`]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Top Partners Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center">
              <span>חמשת השותפים המובילים</span>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <span className="ml-2 text-muted-foreground">ℹ️</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>הטבלה מציגה את חמשת השותפים המובילים לפי הכנסה</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>דירוג</TableHead>
                  <TableHead>שם שותף</TableHead>
                  <TableHead>דרגה</TableHead>
                  <TableHead className="text-center">לידים</TableHead>
                  <TableHead className="text-center">המרות</TableHead>
                  <TableHead className="text-center">הכנסה (₪)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPartners.map((partner, index) => (
                  <TableRow key={partner.id}>
                    <TableCell className="font-bold">{index + 1}</TableCell>
                    <TableCell>
                      {partner.name}
                      <div className="text-xs text-muted-foreground">{partner.id}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTierBadgeColor(partner.tier)}>
                        {formatTierName(partner.tier)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{partner.leads}</TableCell>
                    <TableCell className="text-center">{partner.conversions}</TableCell>
                    <TableCell className="text-center font-medium">{partner.revenue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliateAnalytics;
