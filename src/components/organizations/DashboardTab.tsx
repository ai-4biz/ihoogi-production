
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Mock data for dashboard
const leadsData = [
  { month: "ינו", leads: 65, conversions: 25 },
  { month: "פבר", leads: 78, conversions: 32 },
  { month: "מרץ", leads: 92, conversions: 41 },
  { month: "אפר", leads: 105, conversions: 49 },
  { month: "מאי", leads: 132, conversions: 58 },
  { month: "יונ", leads: 120, conversions: 52 },
];

const categoryData = [
  { name: "שיווק", count: 45 },
  { name: "מכירות", count: 32 },
  { name: "דיגיטל", count: 27 },
  { name: "תוכן", count: 18 },
  { name: "אחר", count: 8 },
];

const userActivityData = [
  { name: "ישראל ישראלי", articles: 12, engagement: 85 },
  { name: "חנה כהן", articles: 8, engagement: 72 },
  { name: "יוסף לוי", articles: 15, engagement: 93 },
  { name: "שרה גולדברג", articles: 6, engagement: 68 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const DashboardTab = () => {
  const downloadReport = () => {
    toast.success("דוח תפוקות הורד בהצלחה");
  };

  const totalLeads = leadsData.reduce((sum, item) => sum + item.leads, 0);
  const totalConversions = leadsData.reduce((sum, item) => sum + item.conversions, 0);
  const conversionRate = ((totalConversions / totalLeads) * 100).toFixed(1);
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-bold">דשבורד ארגוני</h2>
        <Button onClick={downloadReport}>
          הורד דוח מלא
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardDescription>סה״כ לידים</CardDescription>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>סה״כ פניות שהתקבלו</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardTitle className="text-3xl">{totalLeads}</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-sm text-green-500">+12% מהחודש הקודם</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardDescription>המרות</CardDescription>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>לידים שהפכו ללקוחות</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardTitle className="text-3xl">{totalConversions}</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-sm text-green-500">+8% מהחודש הקודם</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardDescription>יחס המרה</CardDescription>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>אחוז הלידים שהפכו ללקוחות</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardTitle className="text-3xl">{conversionRate}%</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-sm text-green-500">+2.5% מהחודש הקודם</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardDescription>משתמשים פעילים</CardDescription>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>משתמשים שנכנסו ב-30 ימים אחרונים</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardTitle className="text-3xl">18</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-sm text-green-500">+3 משתמשים חדשים</span>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>לידים והמרות לאורך זמן</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={leadsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="leads" 
                    stroke="#2D66F2" 
                    name="לידים"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversions" 
                    stroke="#10B981" 
                    name="המרות"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>תוכן לפי קטגוריה</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>פעילות משתמשים</CardTitle>
          <CardDescription>ביצועי המשתמשים המובילים בארגון</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={userActivityData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar 
                  dataKey="articles" 
                  name="מאמרים שנוצרו" 
                  fill="#2D66F2"
                />
                <Bar 
                  dataKey="engagement" 
                  name="מדד מעורבות (%)" 
                  fill="#10B981"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardTab;
