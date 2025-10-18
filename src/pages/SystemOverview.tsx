import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Mail, 
  Settings, 
  FileText, 
  BarChart3, 
  Globe, 
  Shield, 
  Database,
  Code,
  Palette,
  MessageSquare,
  CreditCard,
  UserPlus,
  Key
} from "lucide-react";

interface SystemOverview {
  totalUsers: number;
  totalEmails: number;
  activeTemplates: number;
  routingRules: number;
  countries: string[];
  lastUpdate: string;
}

const SystemOverview = () => {
  const [overview, setOverview] = useState<SystemOverview>({
    totalUsers: 1247,
    totalEmails: 8934,
    activeTemplates: 4,
    routingRules: 12,
    countries: ["ישראל", "USA", "UK", "קנדה", "אוסטרליה"],
    lastUpdate: new Date().toLocaleDateString('he-IL')
  });

  const adminTools = [
    {
      id: "email-templates",
      title: "תבניות מייל",
      description: "ניהול תבניות מייל מקצועיות עם עיצוב מותאם",
      icon: Mail,
      path: "/admin/email-templates",
      color: "blue",
      features: ["4 תבניות מוכנות", "עיצוב מקצועי", "משתנים דינמיים", "תצוגה מקדימה"]
    },
    {
      id: "contact-routing",
      title: "הגדרות ניתוב",
      description: "ניהול ניתוב פניות לפי מדינה ונושא",
      icon: Settings,
      path: "/admin/contact-routing",
      color: "gray",
      features: ["ניתוב לפי מדינה", "8 נושאים", "מיילים מותאמים", "סינון מתקדם"]
    },
    {
      id: "contact-form",
      title: "טופס יצירת קשר",
      description: "טופס יצירת קשר עם העלאת קבצים ותצוגה מקדימה",
      icon: MessageSquare,
      path: "/contact",
      color: "green",
      features: ["העלאת תמונות/סרטונים", "תצוגה מקדימה", "בחירת מדינה", "ולידציה מלאה"]
    },
    {
      id: "user-management",
      title: "ניהול משתמשים",
      description: "מערכת ניהול משתמשים והרשאות",
      icon: Users,
      path: "/admin/users",
      color: "purple",
      features: ["הרשאות אדמין", "ניהול פרופילים", "סטטיסטיקות", "דוחות"]
    },
    {
      id: "analytics",
      title: "אנליטיקס",
      description: "דשבורד סטטיסטיקות ומעקב ביצועים",
      icon: BarChart3,
      path: "/admin/analytics",
      color: "orange",
      features: ["סטטיסטיקות מיילים", "מעקב פניות", "דוחות מדינה", "גרפים"]
    },
    {
      id: "system-config",
      title: "הגדרות מערכת",
      description: "הגדרות כלליות של המערכת",
      icon: Database,
      path: "/admin/system",
      color: "red",
      features: ["הגדרות כלליות", "גיבויים", "לוגים", "תחזוקה"]
    }
  ];

  const emailTemplates = [
    {
      name: "אישור הרשמה",
      type: "registration",
      status: "active",
      usage: 234,
      lastUsed: "2024-01-15"
    },
    {
      name: "איפוס סיסמה",
      type: "password-reset",
      status: "active",
      usage: 89,
      lastUsed: "2024-01-14"
    },
    {
      name: "תשובה לתמיכה",
      type: "support-response",
      status: "active",
      usage: 156,
      lastUsed: "2024-01-15"
    },
    {
      name: "הזמנת שותף",
      type: "partner-invitation",
      status: "active",
      usage: 45,
      lastUsed: "2024-01-13"
    }
  ];

  const routingRules = [
    { country: "ישראל", subjects: 8, emails: 8 },
    { country: "USA", subjects: 4, emails: 4 },
    { country: "UK", subjects: 0, emails: 0 },
    { country: "קנדה", subjects: 0, emails: 0 },
    { country: "אוסטרליה", subjects: 0, emails: 0 }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">סקירה כללית של המערכת</h1>
        <p className="text-gray-600">כלי העבודה שלך מול המתכנת - כל המידע במקום אחד</p>
        <Badge variant="outline" className="mt-2">
          עדכון אחרון: {overview.lastUpdate}
        </Badge>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">סה"כ משתמשים</p>
                <p className="text-2xl font-bold text-gray-900">{overview.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">מיילים נשלחו</p>
                <p className="text-2xl font-bold text-gray-900">{overview.totalEmails.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">תבניות פעילות</p>
                <p className="text-2xl font-bold text-gray-900">{overview.activeTemplates}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">כללי ניתוב</p>
                <p className="text-2xl font-bold text-gray-900">{overview.routingRules}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="tools" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tools">כלי עבודה</TabsTrigger>
          <TabsTrigger value="templates">תבניות מייל</TabsTrigger>
          <TabsTrigger value="routing">ניתוב פניות</TabsTrigger>
          <TabsTrigger value="system">מערכת</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${tool.color}-100`}>
                      <tool.icon className={`h-6 w-6 text-${tool.color}-600`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tool.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => window.open(tool.path, '_blank')}
                  >
                    פתח כלי
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                תבניות מייל פעילות
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailTemplates.map((template, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{template.name}</h4>
                      <p className="text-sm text-gray-600">סוג: {template.type}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                        {template.status === 'active' ? 'פעיל' : 'לא פעיל'}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm font-medium">{template.usage} שימושים</p>
                        <p className="text-xs text-gray-500">אחרון: {template.lastUsed}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                ניתוב פניות לפי מדינה
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routingRules.map((rule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Globe className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{rule.country}</h4>
                        <p className="text-sm text-gray-600">
                          {rule.subjects} נושאים • {rule.emails} מיילים
                        </p>
                      </div>
                    </div>
                    <Badge variant={rule.subjects > 0 ? 'default' : 'secondary'}>
                      {rule.subjects > 0 ? 'מוגדר' : 'לא מוגדר'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  מידע טכני
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">גרסת המערכת:</span>
                    <span className="text-sm font-medium">v2.1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">עדכון אחרון:</span>
                    <span className="text-sm font-medium">{overview.lastUpdate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">סטטוס:</span>
                    <Badge variant="default">פעיל</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">משתמשים מקוונים:</span>
                    <span className="text-sm font-medium">47</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  אבטחה והרשאות
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">הרשאות אדמין:</span>
                    <Badge variant="default">פעיל</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">גישה לכלים:</span>
                    <Badge variant="default">מלא</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">גיבוי אחרון:</span>
                    <span className="text-sm font-medium">2024-01-15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">לוגים:</span>
                    <Badge variant="outline">פעיל</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemOverview;
