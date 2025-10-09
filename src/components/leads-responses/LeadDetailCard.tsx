
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, CardContent, CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, Phone, Link, Paperclip, 
  MessageCircle, LineChart 
} from "lucide-react";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { mockLeads } from "./data/mockData";

interface LeadDetailCardProps {
  leadId: number;
  onClose: () => void;
}

const LeadDetailCard = ({ leadId, onClose }: LeadDetailCardProps) => {
  const navigate = useNavigate();
  const [responseType, setResponseType] = useState<"manual" | "automated">("manual");
  const [responseStatus, setResponseStatus] = useState<"active" | "inactive" | "completed">("inactive");
  const [responseTemplate, setResponseTemplate] = useState("");
  const [replyText, setReplyText] = useState("");

  const showComingSoon = (feature: string) => {
    toast.info(`${feature} - יתווסף בקרוב`);
  };

  const lead = mockLeads.find(l => l.id === leadId) || mockLeads[0];

  const handleSendResponse = () => {
    if (!replyText.trim() && responseType === "manual") {
      toast.error("אנא הזן תשובה לפני השליחה");
      return;
    }
    
    toast.success("התשובה נשלחה בהצלחה!");
    setReplyText("");
    setTimeout(() => onClose(), 1500);
  };

  // Performance metrics mock data
  const metrics = {
    leads: 2,
    comments: 36,
    views: 647
  };

  return (
    <div className="p-4 bg-gray-50 h-[calc(100vh-70px)] overflow-y-auto">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Pane L (260px) */}
        <div className="w-full md:w-[260px] shrink-0 space-y-4">
          {/* Thumbnail */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <AspectRatio ratio={16/9}>
              <div className="h-full w-full flex items-center justify-center bg-gray-100">
                <img 
                  src="https://placehold.co/300x200/e2e8f0/a0aec0?text=Lead+Content" 
                  alt="Lead content thumbnail" 
                  className="w-full h-full object-cover"
                />
              </div>
            </AspectRatio>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={() => showComingSoon("פתיחת קישור מקורי")}
            >
              <Link className="h-4 w-4 mr-2" />
              קישור מקורי
            </Button>
            <Button 
              variant="outline"
              onClick={() => showComingSoon("אפשרויות נוספות")}
            >
              ⋯
            </Button>
          </div>
          
          {/* Metrics counters */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-3 rounded-md shadow-sm text-center">
              <div className="text-lg font-bold text-primary">{metrics.leads}</div>
              <div className="text-xs text-gray-500">לידים</div>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm text-center">
              <div className="text-lg font-bold text-primary">{metrics.comments}</div>
              <div className="text-xs text-gray-500">תגובות</div>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm text-center">
              <div className="text-lg font-bold text-primary">{metrics.views}</div>
              <div className="text-xs text-gray-500">צפיות</div>
            </div>
          </div>
          
          {/* Lead details card */}
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg">פרטי ליד</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {lead.name.substring(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{lead.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4 text-gray-500" />
                <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                  {lead.email}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4 text-gray-500" />
                <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline">
                  {lead.phone}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4 text-gray-500" />
                <a 
                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                  className="text-green-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </div>
              <div className="pt-2">
                <Badge className={
                  lead.status === "new" ? "bg-blue-500" :
                  lead.status === "contacted" ? "bg-green-500" :
                  lead.status === "open" ? "bg-amber-500" : "bg-gray-500"
                }>
                  {lead.status === "new" ? "חדש" : 
                   lead.status === "contacted" ? "נוצר קשר" : 
                   lead.status === "open" ? "פתוח" : "סגור"}
                </Badge>
                <div className="text-xs text-gray-500 mt-1">
                  מקור: {lead.source}
                </div>
                <div className="text-xs text-gray-500">
                  תאריך: {lead.date}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Pane C (Flexible) */}
        <div className="flex-1 space-y-4">
          {/* Performance Chart */}
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-md flex justify-between items-center">
                <span>ביצועי פוסט</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => showComingSoon("בחירת טווח תאריכים")}
                >
                  <LineChart className="h-4 w-4 mr-1" />
                  <span>סנן לפי תאריכים</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-40 flex items-end justify-around space-x-4">
                <div className="flex-1 flex flex-col items-center">
                  <div className="bg-blue-500 w-full" style={{ height: `${(metrics.leads / metrics.views) * 100}%` }}></div>
                  <div className="mt-2 text-xs font-medium">לידים ({metrics.leads})</div>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="bg-blue-500 w-full" style={{ height: `${(metrics.comments / metrics.views) * 100}%` }}></div>
                  <div className="mt-2 text-xs font-medium">תגובות ({metrics.comments})</div>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="bg-blue-500 w-full" style={{ height: "100%" }}></div>
                  <div className="mt-2 text-xs font-medium">צפיות ({metrics.views})</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Response Area */}
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-md">תגובה</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {/* Response Type Toggle */}
              <div className="flex gap-2">
                <Button 
                  variant={responseType === "manual" ? "default" : "outline"}
                  onClick={() => setResponseType("manual")}
                >
                  תגובה ידנית
                </Button>
                <Button 
                  variant={responseType === "automated" ? "default" : "outline"}
                  onClick={() => setResponseType("automated")}
                >
                  תגובה אוטומטית
                </Button>
              </div>
              
              {/* Status */}
              <div>
                <label className="text-sm block mb-1">סטטוס:</label>
                <select 
                  className="w-full border border-input rounded-md p-2"
                  value={responseStatus}
                  onChange={(e) => setResponseStatus(e.target.value as any)}
                >
                  <option value="active">פעיל</option>
                  <option value="inactive">לא פעיל</option>
                  <option value="completed">הושלם</option>
                </select>
              </div>
              
              {/* AI Template Selection (only for automated) */}
              {responseType === "automated" && (
                <div>
                  <label className="text-sm block mb-1">בחר תבנית תגובה:</label>
                  <select 
                    className="w-full border border-input rounded-md p-2"
                    value={responseTemplate}
                    onChange={(e) => setResponseTemplate(e.target.value)}
                  >
                    <option value="">בחר תבנית</option>
                    <option value="template1">תבנית תגובה 1</option>
                    <option value="template2">תבנית תגובה 2</option>
                    <option value="template3">תבנית תגובה 3</option>
                  </select>
                </div>
              )}
              
              {/* Response Text Area */}
              <div>
                <textarea 
                  className="w-full border border-input rounded-md p-3 min-h-[150px]"
                  placeholder={responseType === "manual" ? "כתוב תשובה ללקוח..." : "תוכן התבנית יופיע כאן..."}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  disabled={responseType === "automated" && !responseTemplate}
                ></textarea>
              </div>
              
              {/* Attachments and Send */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => showComingSoon("צירוף קובץ")}
                  >
                    <Paperclip className="h-4 w-4 mr-1" />
                    צרף קובץ
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => showComingSoon("הוספת קישור")}
                  >
                    <Link className="h-4 w-4 mr-1" />
                    הוסף קישור
                  </Button>
                </div>
                <Button onClick={handleSendResponse}>
                  שלח תשובה
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Pane R (300px) */}
        <div className="w-full md:w-[300px] shrink-0 space-y-4">
          {/* Original Post */}
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm flex justify-between items-center">
                <span>פוסט מקורי</span>
                <Badge variant="outline">{lead.source}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600">
                זהו תוכן הפוסט המקורי שממנו נוצר הליד. כאן יופיע טקסט הפוסט והתוכן שגרם ללקוח ליצור קשר.
              </p>
            </CardContent>
          </Card>
          
          {/* User Comment */}
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm flex justify-between items-center">
                <span>תגובת משתמש</span>
                <Badge variant="outline">תגובה</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="bg-gray-100 p-3 rounded-lg text-sm">
                <p>{lead.message}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* CRM Status */}
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm">סטטוס CRM</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <select className="w-full border border-input rounded-md p-2 text-sm">
                <option value="new">חדש</option>
                <option value="contacted">נוצר קשר</option>
                <option value="qualified">מתאים</option>
                <option value="proposal">הצעת מחיר</option>
                <option value="won">הושלם</option>
                <option value="lost">אבד</option>
              </select>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => showComingSoon("הוספה ל-CRM")}
              >
                הוסף ל-CRM
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailCard;
