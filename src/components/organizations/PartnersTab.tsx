
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock data for affiliate program metrics
const referralData = [
  { month: "ינו", clicks: 120, leads: 45, conversions: 15 },
  { month: "פבר", clicks: 168, leads: 78, conversions: 22 },
  { month: "מרץ", clicks: 144, leads: 65, conversions: 18 },
  { month: "אפר", clicks: 190, leads: 87, conversions: 27 },
  { month: "מאי", clicks: 210, leads: 102, conversions: 34 },
  { month: "יונ", clicks: 178, leads: 92, conversions: 29 },
];

const referralsByPartner = [
  { name: "ישראל ישראלי", leads: 45, conversions: 15, revenue: 7500 },
  { name: "חנה כהן", leads: 38, conversions: 12, revenue: 6200 },
  { name: "יוסף לוי", leads: 52, conversions: 18, revenue: 9100 },
  { name: "שרה גולדברג", leads: 29, conversions: 8, revenue: 4200 },
  { name: "דוד מזרחי", leads: 41, conversions: 14, revenue: 7300 },
];

const PartnersTab = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>סה״כ לחיצות</CardDescription>
            <CardTitle className="text-3xl">1,010</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-sm text-green-500">+12% מהחודש הקודם</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>לידים שהתקבלו</CardDescription>
            <CardTitle className="text-3xl">469</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-sm text-green-500">+8% מהחודש הקודם</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>המרות</CardDescription>
            <CardTitle className="text-3xl">135</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-sm text-green-500">+15% מהחודש הקודם</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>הכנסות (₪)</CardDescription>
            <CardTitle className="text-3xl">34,300</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-sm text-green-500">+10% מהחודש הקודם</span>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
          <TabsTrigger value="partners">שותפים</TabsTrigger>
          <TabsTrigger value="settings">הגדרות</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="bg-white rounded-md border p-4 mb-6">
            <h3 className="font-semibold mb-4">ביצועים לאורך זמן</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={referralData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#8884d8" 
                    name="לחיצות"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="leads" 
                    stroke="#82ca9d" 
                    name="לידים"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversions" 
                    stroke="#ff7300" 
                    name="המרות"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>קישורי הפניה</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <Input value="https://hoogi.ai/ref/organization123" readOnly />
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button
                      className="w-full"
                      onClick={() => {
                        navigator.clipboard.writeText("https://hoogi.ai/ref/organization123");
                        toast.success("הקישור הועתק ללוח");
                      }}
                    >
                      העתק קישור
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => toast.info("הקישור נשלח בהצלחה")}
                    >
                      שלח בדוא״ל
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>קמפיין שותפים אחרון</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium">קמפיין קיץ 2023</div>
                    <div className="text-sm text-muted-foreground">
                      10 שותפים פעילים • 203 לחיצות • 24 המרות
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                      <div className="h-2 rounded-full bg-[#2D66F2]" style={{ width: "75%" }} />
                    </div>
                    <div className="mt-1 text-xs text-right">75% מהיעד</div>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      variant="link"
                      onClick={() => toast.info("מעבר לדף הקמפיין")}
                    >
                      צפה בפרטי הקמפיין
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="partners">
          <div className="bg-white rounded-md border mb-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>שם השותף</TableHead>
                  <TableHead>לידים</TableHead>
                  <TableHead>המרות</TableHead>
                  <TableHead>הכנסות (₪)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referralsByPartner.map((partner) => (
                  <TableRow key={partner.name}>
                    <TableCell className="font-medium">{partner.name}</TableCell>
                    <TableCell>{partner.leads}</TableCell>
                    <TableCell>{partner.conversions}</TableCell>
                    <TableCell>{partner.revenue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="bg-white rounded-md border p-4">
            <h3 className="font-semibold mb-4">ביצועי שותפים</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={referralsByPartner}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leads" name="לידים" fill="#8884d8" />
                  <Bar dataKey="conversions" name="המרות" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>הגדרות תוכנית השותפים</CardTitle>
              <CardDescription>
                הגדר את פרטי תוכנית השותפים של הארגון
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="commission">אחוז עמלה</Label>
                  <div className="flex items-center gap-2">
                    <Input id="commission" defaultValue="15" />
                    <span>%</span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="payment_threshold">סף תשלום מינימלי</Label>
                  <div className="flex items-center gap-2">
                    <Input id="payment_threshold" defaultValue="500" />
                    <span>₪</span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cookie_duration">משך תוקף עוגיה</Label>
                  <div className="flex items-center gap-2">
                    <Input id="cookie_duration" defaultValue="30" />
                    <span>ימים</span>
                  </div>
                </div>
                <Button 
                  className="bg-[#2D66F2] hover:bg-blue-700 mt-4"
                  onClick={() => toast.success("ההגדרות נשמרו בהצלחה")}
                >
                  שמור הגדרות
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Add missing Input and Label components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default PartnersTab;
