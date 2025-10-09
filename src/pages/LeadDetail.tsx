
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, MessageCircle, Edit, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data as specified in the YAML
const leadsMockData = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/36?img=3",
    name: "ישראל ישראלי",
    postType: "פוסט",
    leadStatus: "חדש",
    leadStatusColor: "blue",
    email: "israel@example.com",
    phone: "050-1234567",
    autoReply: "אימייל",
    notes: "",
    date: "2023-04-16",
    thumbnail: "https://placehold.co/200"
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/36?img=6",
    name: "שרה כהן",
    postType: "טופס",
    leadStatus: "פתוח",
    leadStatusColor: "green",
    email: "sarah@example.com",
    phone: "052-7654321",
    autoReply: "SMS",
    notes: "הוסר מתגובה",
    date: "2023-04-15",
    thumbnail: "https://placehold.co/200"
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/36?img=8",
    name: "דוד לוי",
    postType: "סרט",
    leadStatus: "קמפיין",
    leadStatusColor: "purple",
    email: "david@example.com",
    phone: "054-1112233",
    autoReply: "בחר אוטומציה",
    notes: "",
    date: "2023-04-14",
    thumbnail: "https://placehold.co/200"
  }
];

const getLead = (id: string) => {
  const numId = parseInt(id, 10);
  return leadsMockData.find(l => l.id === numId) || leadsMockData[0];
};

// Placeholder component for charts and placeholders
const Placeholder = ({ height, label }: { height: number, label: string }) => {
  return (
    <div 
      className="border border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50"
      style={{ height: `${height}px` }}
    >
      <span className="text-gray-500">{label}</span>
    </div>
  );
};

// Chart component for visualizing data
const PerformanceChart = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <h3 className="text-lg font-medium mb-3">ביצועי ליד</h3>
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <div>לידים</div>
        <div>תגובות</div>
        <div>צפיות</div>
      </div>
      <div className="h-32 flex items-end gap-4">
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-indigo-500 w-full" style={{ height: "10%" }}></div>
          <div className="mt-2 text-xs font-medium">2</div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-indigo-500 w-full" style={{ height: "30%" }}></div>
          <div className="mt-2 text-xs font-medium">36</div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-indigo-500 w-full" style={{ height: "100%" }}></div>
          <div className="mt-2 text-xs font-medium">647</div>
        </div>
      </div>
    </div>
  );
};

// Reply generator component
const ReplyGenerator = () => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <h3 className="text-lg font-medium mb-3">תגובה אוטומטית</h3>
      <div className="space-y-4">
        <div>
          <div className="text-sm mb-1">סוג תגובה:</div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-primary text-white">בניה אוטומטית</Button>
            <Button variant="outline">ידנית</Button>
          </div>
        </div>
        <div>
          <div className="text-sm mb-1">סטטוס:</div>
          <div className="flex items-center">
            <Badge variant="outline" className="border-red-500 text-red-500">לא פעיל</Badge>
          </div>
        </div>
        <div>
          <div className="text-sm mb-1">סוג תגובה בניה אוטומטית:</div>
          <div className="flex items-center border rounded-md p-2">
            <span>בחר תגובה בניה אוטומטית</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LeadDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get("id") || "1";
  const [currentTab, setCurrentTab] = useState("overview");
  
  const lead = getLead(leadId);

  return (
    <div className="container mx-auto p-4">
      <Button 
        variant="link" 
        onClick={() => navigate("/leads-table")}
        className="mb-4 p-0 h-auto flex items-center gap-1"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>חזרה לרשימה</span>
      </Button>
      
      <h1 className="text-xl font-bold mb-6 text-right">פרטי ליד – {lead.name}</h1>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
          <TabsTrigger value="history">היסטוריה</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
          <div className="flex gap-6 flex-col md:flex-row">
            {/* --- Pane L (260px) --- */}
            <div className="w-full md:w-[260px] shrink-0 space-y-4">
              <div className="w-full overflow-hidden rounded-md bg-gray-100 flex items-center justify-center" style={{ height: "200px" }}>
                <img 
                  src={lead.thumbnail} 
                  alt={lead.name} 
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/200";
                  }}
                />
              </div>
              
              <div className="flex gap-2">
                <Badge variant="outline">מקור: {lead.postType}</Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="text-lg font-bold text-blue-600">2</div>
                  <div className="text-xs text-gray-500">לידים</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="text-lg font-bold text-blue-600">36</div>
                  <div className="text-xs text-gray-500">תגובות</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-md">
                  <div className="text-lg font-bold text-blue-600">647</div>
                  <div className="text-xs text-gray-500">צפיות</div>
                </div>
              </div>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">פרטי ליד</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-2">
                  <div><strong>שם:</strong> {lead.name}</div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span>{lead.phone}</span>
                  </div>
                  <div><strong>סטטוס:</strong> <Badge>{lead.leadStatus}</Badge></div>
                </CardContent>
              </Card>
            </div>
            
            {/* --- Pane C (flex) --- */}
            <div className="flex-1 space-y-6">
              <PerformanceChart />
              <ReplyGenerator />
            </div>
            
            {/* --- Pane R (300px) --- */}
            <div className="w-full md:w-[300px] shrink-0 space-y-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm flex justify-between items-center">
                    <span>פוסט מקורי</span>
                    <Badge variant="outline">פוסט</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">תוכן הפוסט המקורי יופיע כאן...</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm flex justify-between items-center">
                    <span>תגובת משתמש</span>
                    <Badge variant="outline">תגובה</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">תוכן התגובה של המשתמש יופיע כאן...</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="p-8 text-center text-gray-500">
            תוכן טאב היסטוריה יופיע כאן
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadDetail;
