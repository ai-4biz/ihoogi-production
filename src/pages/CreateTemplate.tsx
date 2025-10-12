import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Plus, 
  Sparkles, 
  Mail, 
  MessageCircle, 
  FileText, 
  Upload, 
  ArrowRight, 
  Wand2,
  Palette,
  Link as LinkIcon,
  Image,
  Star,
  Clock,
  Users,
  Edit,
  Eye,
  Bell
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface TemplateDesign {
  logoUrl: string;
  profileImageUrl: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  linkUrl: string;
  documentUrl: string;
}

const CreateTemplate = () => {
  const navigate = useNavigate();
  
  // Basic template info
  const [templateName, setTemplateName] = useState("");
  const [templateType, setTemplateType] = useState<"standard" | "ai" | "personal" | "combined">("standard");
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [singleChannel, setSingleChannel] = useState<"email" | "whatsapp">("email");
  
  // Message content
  const [emailSubject, setEmailSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");
  
  // Standard template specific
  const [responseType, setResponseType] = useState<"new_customer" | "reminder">("new_customer");
  const [reminderDays, setReminderDays] = useState<number>(7);
  const [reminderTime, setReminderTime] = useState<string>("09:00");
  const [leadStatus, setLeadStatus] = useState<string>("");
  const [leadSubStatus, setLeadSubStatus] = useState<string>("");
  const [reminderDelay, setReminderDelay] = useState<string>("");
  const [reminderYear, setReminderYear] = useState<string>("");
  
  // AI template specific
  const [aiPosition, setAiPosition] = useState<"start" | "middle" | "end">("start");
  const [customAiMessage, setCustomAiMessage] = useState("");
  
  // Combined template design
  const [templateDesign, setTemplateDesign] = useState<TemplateDesign>({
    logoUrl: "",
    profileImageUrl: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#8B5CF6",
    backgroundColor: "#F3F7FC",
    linkUrl: "",
    documentUrl: ""
  });
  
  // File uploads
  const [logoFile, setLogoFile] = useState<string>("");
  
  // Demo modal
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedChannelForDemo, setSelectedChannelForDemo] = useState<string>("");
  const [profileFile, setProfileFile] = useState<string>("");
  
  // Tab state
  const [activeTab, setActiveTab] = useState<"templates" | "notifications">("templates");
  
  // Notification timing state
  const [notificationTiming, setNotificationTiming] = useState({
    frequency: "daily", // hourly, daily, every3days, weekly, monthly
    time: "09:00",
    enabled: true
  });
  const [documentFile, setDocumentFile] = useState<string>("");
  
  // Include logo/profile checkboxes
  const [includeLogo, setIncludeLogo] = useState(true);
  const [includeProfile, setIncludeProfile] = useState(true);
  
  // AI decision buttons
  const [aiDecideForAI, setAiDecideForAI] = useState(true);
  const [aiDecideForCombined, setAiDecideForCombined] = useState(true);
  
  // AI decision checkbox - controls both title and AI instructions
  const [aiDecideForTitle, setAiDecideForTitle] = useState(true);
  
  // Mock data from user profile
  const businessName = "gil.arbisman";
  const subCategory = "יעוץ עסקי";
  const logoUrl = "/hoogi-new-avatar.png";

  const handleChannelToggle = (channel: string) => {
    setSelectedChannels(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  const handleShowDemo = (channel: string) => {
    setSelectedChannelForDemo(channel);
    setShowDemoModal(true);
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      toast.error("נא להזין שם לתבנית");
      return;
    }

    // בדיקת שדות חובה לתזכורת
    if (responseType === "reminder" && !leadStatus) {
      toast.error("נא לבחור סטטוס ליד לתזכורת");
      return;
    }

    if (templateType !== "standard" && !emailSubject.trim()) {
      toast.error("נא להזין כותרת למייל");
      return;
    }

    if (templateType !== "standard" && !messageBody.trim()) {
      toast.error("נא להזין גוף הודעה");
      return;
    }

    if (templateType === "ai" && selectedChannels.length === 0) {
      toast.error("נא לבחור לפחות ערוץ אחד");
      return;
    }

    if (templateType !== "ai" && templateType !== "standard" && !singleChannel) {
      toast.error("נא לבחור ערוץ שליחה");
      return;
    }

    // Save template logic here
    toast.success("התבנית נשמרה בהצלחה!");
    navigate("/automations");
  };

  const createExampleTemplate = () => {
    setTemplateName("תבנית דוגמה");
    setEmailSubject("תודה על מילוי השאלון - {{businessName}}");
    setMessageBody("שלום {{firstName}},\n\nתודה שמילאת את השאלון שלנו.\nפנייתך התקבלה ואנו נחזור אליך בהקדם.\n\nבברכה,\n{{businessName}}");
    setCustomAiMessage("הודעה מותאמת אישית שתופיע לפני תגובת ה-AI");
    setTemplateDesign(prev => ({
      ...prev,
      linkUrl: "https://example.com",
      primaryColor: "#10B981",
      secondaryColor: "#F59E0B"
    }));
    toast.success("נוצרה דוגמה לתבנית!");
  };

  return (
    <MainLayout initialState="content">
      <div className="flex flex-col w-full min-h-screen bg-background p-4 md:p-8" dir="rtl">
        {/* Back Button */}
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.history.back()}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            חזור
          </Button>
        </div>

        {/* Header with business name */}
        <div className="mb-6">
          <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
            <div className="text-center">
              <h1 className="text-xl md:text-2xl font-bold text-foreground">
                {businessName} - {subCategory}
              </h1>
            </div>
          </div>
        </div>


        <div className="max-w-4xl mx-auto w-full">
          {/* Tabs */}
          <Tabs 
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "templates" | "notifications")}
            className="w-full mb-6"
          >
            <TabsList className="grid grid-cols-2 gap-1 md:gap-2 mb-6 w-full">
              <TabsTrigger 
                value="notifications" 
                className="flex items-center justify-start gap-1 md:gap-2 text-xs md:text-sm text-right"
              >
                <Bell className="h-3 w-3 md:h-4 md:w-4" />
                <span>ההתראות שלי</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="templates" 
                className="flex items-center justify-end gap-1 md:gap-2 text-xs md:text-sm text-right"
              >
                <span>מענה ללקוחות</span>
                <Edit className="h-3 w-3 md:h-4 md:w-4" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="mt-2">
              {/* Main form section */}
              <div className="space-y-4 md:space-y-6 mb-6">

              {/* פרטים בסיסיים */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 md:p-6 shadow-sm border border-primary/20 hover:shadow-md transition-shadow">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 text-right">פרטים בסיסיים</h3>
              
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template-name" className="text-sm font-medium mb-2 block text-right">שם התבנית</Label>
                    <Input
                      id="template-name"
                      placeholder="הקלד שם לתבנית..."
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      className="text-base text-right"
                    />
                  </div>

                  <div>
                    <Label htmlFor="template-type" className="text-sm font-medium mb-2 block text-right">סוג התבנית</Label>
                    <Select value={templateType} onValueChange={(value: any) => setTemplateType(value)}>
                      <SelectTrigger className="text-right">
                        <SelectValue placeholder="בחר סוג תבנית" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">
                          <div className="flex items-center justify-end gap-2">
                            <span>סטנדרט</span>
                            <Star className="h-4 w-4 text-gray-500" />
                          </div>
                        </SelectItem>
                        <SelectItem value="ai">
                          <div className="flex items-center justify-end gap-2">
                            <span>AI</span>
                            <Wand2 className="h-4 w-4 text-blue-500" />
                          </div>
                        </SelectItem>
                        <SelectItem value="personal">
                          <div className="flex items-center justify-end gap-2">
                            <span>משוב אישי</span>
                            <Users className="h-4 w-4 text-green-500" />
                          </div>
                        </SelectItem>
                        <SelectItem value="combined">
                          <div className="flex items-center justify-end gap-2">
                            <span>AI משולב אישי</span>
                            <Sparkles className="h-4 w-4 text-purple-500" />
                          </div>
                        </SelectItem>
                        <SelectItem value="reminder" disabled>
                          <div className="flex items-center justify-end gap-2">
                            <span>תזכורת (לעתיד)</span>
                            <Clock className="h-4 w-4 text-orange-500" />
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      אפשרות תזכורת תלויה בסוג המנוי - לפיתוח עתידי
                    </p>
                  </div>

                  {/* בחירת סוג המענה - תמיד מוצג */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block text-right">סוג המענה <span className="text-red-500">*</span></Label>
                    <div className="flex gap-3">
                      <Button 
                        variant={responseType === "reminder" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setResponseType("reminder")}
                      >
                        תזכורת
                      </Button>
                      <Button 
                        variant={responseType === "new_customer" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setResponseType("new_customer")}
                      >
                        מענה ללקוח חדש
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* תבנית סטנדרטית - רק לסטנדרט */}
              {templateType === "standard" && (
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 md:p-6 shadow-sm border border-primary/20 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-right">תבנית סטנדרטית</h3>
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm font-medium">
                      תבנית סטנדרט
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-right">כותרת ההודעה</Label>
                        <Input 
                          value="קיבלנו את השאלון שלך - {{businessName}}"
                          className="text-right bg-gray-50"
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-right">ערוץ שליחה</Label>
                        <div className="flex gap-2">
                          <Button variant="default" size="sm" className="flex-1">מייל</Button>
                          <Button variant="outline" size="sm" className="flex-1 opacity-50 cursor-not-allowed">וואטסאפ</Button>
                        </div>
                      </div>
                    </div>
                  
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-right">תוכן ההודעה (עד 2 שורות)</Label>
                      <Textarea 
                        value="שלום {{firstName}},\nתודה שמילאת את השאלון שלנו. פנייתך התקבלה ואנו נחזור אליך בהקדם."
                        className="min-h-[60px] max-h-[60px] resize-none text-right bg-gray-50"
                        rows={2}
                        readOnly
                      />
                      <p className="text-xs text-muted-foreground text-right">מוגבל ל-2 שורות בלבד</p>
                    </div>
                  
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 ml-2" />
                        ערוך תשובה
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* הגדרות תזכורת - רק לתזכורת */}
              {responseType === "reminder" && (
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 md:p-6 shadow-sm border border-orange-200 hover:shadow-md transition-shadow">
                  <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-foreground text-right">הגדרות תזכורת</h3>
                  
                  <div className="space-y-4">
                    {/* סטטוס ותת סטטוס באותה שורה */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="lead-status" className="text-sm font-medium mb-2 block text-right">סטטוס ליד <span className="text-red-500">*</span></Label>
                        <Select value={leadStatus} onValueChange={setLeadStatus}>
                          <SelectTrigger className="text-right">
                            <SelectValue placeholder="בחר סטטוס ליד" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">חדש</SelectItem>
                            <SelectItem value="contacted">יצר קשר</SelectItem>
                            <SelectItem value="qualified">מוסמך</SelectItem>
                            <SelectItem value="proposal">הצעה</SelectItem>
                            <SelectItem value="negotiation">משא ומתן</SelectItem>
                            <SelectItem value="closed-won">סגור - זכייה</SelectItem>
                            <SelectItem value="closed-lost">סגור - הפסד</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="lead-sub-status" className="text-sm font-medium mb-2 block text-right">תת סטטוס ליד</Label>
                        <Select value={leadSubStatus} onValueChange={setLeadSubStatus}>
                          <SelectTrigger className="text-right">
                            <SelectValue placeholder="בחר תת סטטוס" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hot">חם</SelectItem>
                            <SelectItem value="warm">פושר</SelectItem>
                            <SelectItem value="cold">קר</SelectItem>
                            <SelectItem value="not-interested">לא מעוניין</SelectItem>
                            <SelectItem value="callback">להתקשר שוב</SelectItem>
                            <SelectItem value="meeting-scheduled">פגישה נקבעה</SelectItem>
                            <SelectItem value="proposal-sent">הצעה נשלחה</SelectItem>
                            <SelectItem value="negotiating">במשא ומתן</SelectItem>
                            <SelectItem value="won">זכייה</SelectItem>
                            <SelectItem value="lost">הפסד</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* תזמון שליחה */}
                    <div>
                      <Label htmlFor="timing-type" className="text-sm font-medium mb-2 block text-right">תזמון שליחה לאחר שינוי סטטוס</Label>
                      <Select value={reminderDelay} onValueChange={setReminderDelay}>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="בחר תזמון" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">מיידי (לאחר שעה)</SelectItem>
                          <SelectItem value="custom">תזמן זמן מותאם</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* מספר ימים ושעת שליחה - רק אם בחרו "תזמן זמן מותאם" */}
                    {reminderDelay === "custom" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="reminder-days" className="text-sm font-medium mb-2 block text-right">מספר ימים</Label>
                          <Input
                            id="reminder-days"
                            type="number"
                            placeholder="1"
                            value={reminderDays}
                            onChange={(e) => setReminderDays(parseInt(e.target.value) || 0)}
                            className="text-base text-right"
                          />
                        </div>
                        <div>
                          <Label htmlFor="reminder-time" className="text-sm font-medium mb-2 block text-right">שעת שליחה</Label>
                          <div className="relative">
                            <Input
                              id="reminder-time"
                              type="time"
                              value={reminderTime}
                              onChange={(e) => setReminderTime(e.target.value)}
                              className="text-base pr-10"
                            />
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}


              {/* תוכן ההודעה - לא סטנדרט ולא משולב */}
              {templateType !== "standard" && templateType !== "combined" && (
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 md:p-6 shadow-sm border border-green-200 hover:shadow-md transition-shadow">
                  <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-foreground text-right">תוכן ההודעה</h3>
                
                  <div className="space-y-4">
                    {/* כותרת - תמיד מוצג למייל */}
                    {(singleChannel === "email" || selectedChannels.includes("email")) && (
                      <div>
                        <div className="flex items-center justify-end gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 text-right">תן ל-i hoogi להחליט בשבילך</span>
                            <Checkbox 
                              checked={aiDecideForTitle} 
                              onCheckedChange={setAiDecideForTitle}
                              className="w-4 h-4"
                            />
                          </div>
                        </div>
                        {!aiDecideForTitle && (
                          <Input
                            id="email-subject"
                            placeholder="הקלד כותרת..."
                            value={emailSubject}
                            onChange={(e) => setEmailSubject(e.target.value)}
                            className="text-base text-right"
                          />
                        )}
                      </div>
                    )}

                    {/* הנחיות AI - רק ל-AI */}
                    {templateType === "ai" && (
                      <div>
                        <Label htmlFor="ai-instructions" className="text-sm font-medium mb-2 block text-right">הנחיות AI</Label>
                        {!aiDecideForTitle && (
                          <Textarea
                            id="ai-instructions"
                            placeholder="תן הנחיות ל-AI איך לכתוב את ההודעה...\n\nלדוגמה:\n- כתוב בצורה חמה ומזמינה\n- הדגש את היתרונות שלנו\n- סיים בקריאה לפעולה"
                            value={customAiMessage}
                            onChange={(e) => setCustomAiMessage(e.target.value)}
                            className="min-h-[120px] text-base resize-none text-right"
                          />
                        )}
                      </div>
                    )}

                    {/* כותרת וגוף ההודעה - רק ל-personal (לא AI) */}
                    {templateType === "personal" && (
                      <>
                        <div>
                          <Label htmlFor="personal-subject" className="text-sm font-medium mb-2 block text-right">כותרת</Label>
                          <Input
                            id="personal-subject"
                            placeholder="הקלד כותרת..."
                            value={emailSubject}
                            onChange={(e) => setEmailSubject(e.target.value)}
                            className="text-base text-right"
                          />
                        </div>
                        <div>
                          <Label htmlFor="message-body" className="text-sm font-medium mb-2 block text-right">גוף ההודעה</Label>
                          <Textarea
                            id="message-body"
                            placeholder="הקלד את תוכן ההודעה...\n\nניתן להשתמש במשתנים:\n{{firstName}} - שם פרטי\n{{lastName}} - שם משפחה\n{{businessName}} - שם העסק\n{{date}} - תאריך"
                            value={messageBody}
                            onChange={(e) => setMessageBody(e.target.value)}
                            className="min-h-[120px] text-base resize-none text-right"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}


              {/* הגדרות AI משולב - רק למשולב */}
              {templateType === "combined" && (
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 md:p-6 shadow-sm border border-indigo-200 hover:shadow-md transition-shadow">
                  <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-foreground text-right">הגדרות AI משולב</h3>
                
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-end gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 text-right">תן ל-i hoogi להחליט בשבילך</span>
                          <Checkbox 
                            checked={aiDecideForCombined} 
                            onCheckedChange={setAiDecideForCombined}
                            className="w-4 h-4"
                          />
                        </div>
                      </div>
                      {!aiDecideForCombined && (
                        <Input
                          id="email-subject-combined"
                          placeholder="הקלד כותרת..."
                          value={emailSubject}
                          onChange={(e) => setEmailSubject(e.target.value)}
                          className="text-base text-right"
                        />
                      )}
                    </div>

                    <div>
                      <Label htmlFor="ai-position" className="text-sm font-medium mb-2 block text-right">מיקום תגובת AI</Label>
                      <Select value={aiPosition} onValueChange={(value: any) => setAiPosition(value)}>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="בחר מיקום" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="start">בתחילת התשובה</SelectItem>
                          <SelectItem value="middle">באמצע התשובה</SelectItem>
                          <SelectItem value="end">בסוף התשובה</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="ai-instructions-combined" className="text-sm font-medium mb-2 block text-right">הוראות ל-AI</Label>
                      {!aiDecideForCombined && (
                        <Textarea
                          id="ai-instructions-combined"
                          placeholder="תן הנחיות ל-AI איך לכתוב את החלק שלו בהודעה...\n\nלדוגמה:\n- כתוב בצורה חמה ומזמינה\n- הדגש את היתרונות שלנו\n- סיים בקריאה לפעולה"
                          value={customAiMessage}
                          onChange={(e) => setCustomAiMessage(e.target.value)}
                          className="min-h-[100px] text-base resize-none text-right"
                        />
                      )}
                    </div>

                    <div>
                      <Label htmlFor="personal-text-combined" className="text-sm font-medium mb-2 block text-right">התוספת מלל אישי</Label>
                      <Textarea
                        id="personal-text-combined"
                        placeholder="הקלד את החלק האישי שלך בהודעה...\n\nניתן להשתמש במשתנים:\n{{firstName}} - שם פרטי\n{{lastName}} - שם משפחה\n{{businessName}} - שם העסק\n{{date}} - תאריך"
                        value={messageBody}
                        onChange={(e) => setMessageBody(e.target.value)}
                        className="min-h-[100px] text-base resize-none text-right"
                      />
                    </div>
                  </div>
                </div>
              )}

              </div>

              {/* Logo, Profile and Brand Colors section */}
              <div className="mb-6">
                <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
                  <h3 className="text-base md:text-lg font-semibold mb-4 text-foreground text-right">עיצוב התבנית</h3>
                
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Logo section */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground text-right">הוספת לוגו לתבנית</span>
                        <Checkbox 
                          checked={includeLogo} 
                          onCheckedChange={setIncludeLogo}
                          className="w-5 h-5"
                        />
                      </div>
                      <img
                        src={logoUrl}
                        alt="Logo"
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-primary/20"
                      />
                    </div>

                    {/* Profile Picture section */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground text-right">הוספת תמונת פרופיל</span>
                        <Checkbox 
                          checked={includeProfile} 
                          onCheckedChange={setIncludeProfile}
                          className="w-5 h-5"
                        />
                      </div>
                      <img
                        src={profileFile || logoUrl}
                        alt="Profile"
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-primary/20"
                      />
                    </div>

                    {/* Brand Colors section */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground text-right">הוספת צבעי מותג</span>
                        <Palette className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex gap-2">
                        <div 
                          className="w-8 h-8 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: templateDesign.primaryColor }}
                          title="צבע ראשי"
                        />
                        <div 
                          className="w-8 h-8 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: templateDesign.secondaryColor }}
                          title="צבע משני"
                        />
                        <div 
                          className="w-8 h-8 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: templateDesign.backgroundColor }}
                          title="צבע רקע"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* הוספת קישור / תמונה - לא סטנדרט */}
              {templateType !== "standard" && (
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 md:p-6 shadow-sm border border-purple-200 hover:shadow-md transition-shadow">
                  <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-foreground text-right">הוספת קישור / תמונה</h3>
                
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="link-url" className="text-sm font-medium mb-2 block text-right">קישור</Label>
                      <Input
                        id="link-url"
                        placeholder="https://example.com"
                        value={templateDesign.linkUrl}
                        onChange={(e) => setTemplateDesign(prev => ({ ...prev, linkUrl: e.target.value }))}
                        className="text-base text-right"
                      />
                    </div>

                    <div>
                      <Label htmlFor="document-file" className="text-sm font-medium mb-2 block text-right">העלאת קובץ</Label>
                      <Input
                        id="document-file"
                        type="file"
                        accept="image/*,.pdf,.doc,.docx"
                        className="cursor-pointer"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setDocumentFile(file.name);
                            setTemplateDesign(prev => ({ ...prev, documentUrl: file.name }));
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* התאמת התבנית לערוצים + דוגמא */}
              <div className="mb-6">
                {/* התאמת התבנית לערוצים */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 md:p-6 shadow-sm border border-blue-200 hover:shadow-md transition-shadow mb-6">
                  <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-foreground text-right">התאמת התבנית לערוצים</h3>
                
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button 
                      variant={selectedChannels.includes("general") ? "default" : "outline"}
                      className={`${selectedChannels.includes("general") ? "bg-gray-600 hover:bg-gray-700 border-gray-600" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                      onClick={() => handleChannelToggle("general")}
                    >
                      <FileText className="h-4 w-4 ml-2" />
                      כללי
                    </Button>
                    
                    <Button 
                      variant={selectedChannels.includes("message") ? "default" : "outline"}
                      className={`${selectedChannels.includes("message") ? "bg-purple-600 hover:bg-purple-700 border-purple-600" : "border-purple-300 text-purple-700 hover:bg-purple-50"}`}
                      onClick={() => handleChannelToggle("message")}
                    >
                      <MessageCircle className="h-4 w-4 ml-2" />
                      הודעה
                    </Button>
                    
                    <Button 
                      variant={selectedChannels.includes("whatsapp") ? "default" : "outline"}
                      className={`${selectedChannels.includes("whatsapp") ? "bg-green-600 hover:bg-green-700 border-green-600" : "border-green-300 text-green-700 hover:bg-green-50"}`}
                      onClick={() => handleChannelToggle("whatsapp")}
                    >
                      <MessageCircle className="h-4 w-4 ml-2" />
                      וואטסאפ
                    </Button>
                    
                    <Button 
                      variant={selectedChannels.includes("email") ? "default" : "outline"}
                      className={`${selectedChannels.includes("email") ? "bg-blue-600 hover:bg-blue-700 border-blue-600" : "border-blue-300 text-blue-700 hover:bg-blue-50"}`}
                      onClick={() => handleChannelToggle("email")}
                    >
                      <Mail className="h-4 w-4 ml-2" />
                      מייל
                    </Button>
                  </div>
                </div>

                {/* דוגמא למענה לפי הערוצים שנבחרו */}
                {selectedChannels.length > 0 && (
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 md:p-6 shadow-sm border border-purple-200 hover:shadow-md transition-shadow">
                    <h3 className="text-base md:text-lg font-semibold mb-4 text-foreground text-right">דוגמא למענה לפי הערוצים שנבחרו</h3>
                
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedChannels.map((channel) => (
                        <div key={channel} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-semibold">
                              {channel === "general" && "כללי"}
                              {channel === "message" && "הודעה"}
                              {channel === "whatsapp" && "וואטסאפ"}
                              {channel === "email" && "מייל"}
                            </span>
                            {channel === "general" && <FileText className="h-5 w-5 text-gray-600" />}
                            {channel === "message" && <MessageCircle className="h-5 w-5 text-purple-600" />}
                            {channel === "whatsapp" && <MessageCircle className="h-5 w-5 text-green-600" />}
                            {channel === "email" && <Mail className="h-5 w-5 text-blue-600" />}
                          </div>
                          
                          <div className="text-xs text-gray-500 mb-3 text-right">
                            {templateType === "standard" && "תבנית סטנדרטית"}
                            {templateType === "ai" && "תבנית AI"}
                            {templateType === "personal" && "משוב אישי"}
                            {templateType === "combined" && "AI משולב אישי"}
                          </div>
                          
                          {/* Preview content based on template type */}
                          <div className="text-sm text-gray-700 mb-3 text-right">
                            {templateType === "standard" && (
                              <div>
                                <div className="font-medium mb-1">תודה על מילוי השאלון!</div>
                                <div className="text-gray-500">התשובות שלך התקבלו בהצלחה</div>
                              </div>
                            )}
                            {templateType === "ai" && (
                              <div>
                                <div className="font-medium mb-1">תגובת AI מותאמת אישית</div>
                                <div className="text-gray-500">על בסיס התשובות שלך</div>
                              </div>
                            )}
                            {templateType === "personal" && (
                              <div>
                                <div className="font-medium mb-1">משוב אישי</div>
                                <div className="text-gray-500">הודעה מותאמת אישית</div>
                              </div>
                            )}
                            {templateType === "combined" && (
                              <div>
                                <div className="font-medium mb-1">AI + משוב אישי</div>
                                <div className="text-gray-500">שילוב של בינה מלאכותית ומשוב אישי</div>
                              </div>
                            )}
                          </div>
                          
                          {/* Show demo button */}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleShowDemo(channel)}
                            className="w-full flex items-center justify-center gap-2 text-xs"
                          >
                            הצג דוגמא
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>


            </TabsContent>

            <TabsContent value="notifications" className="mt-2">
              {/* Notifications content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Bell className="h-8 w-8 text-blue-500" />
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">ההתראות שלי</h1>
                  </div>
                  <p className="text-gray-500 text-lg">ניהול התראות והגדרות תזמון</p>
                </div>

                {/* Timing Settings */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-sm border border-blue-200 mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold">הגדרות תזמון</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-base font-medium">תדירות התראות</Label>
                      <Select 
                        value={notificationTiming.frequency} 
                        onValueChange={(value) => setNotificationTiming(prev => ({ ...prev, frequency: value }))}
                      >
                        <SelectTrigger className="text-right">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">שעתי</SelectItem>
                          <SelectItem value="daily">יומי</SelectItem>
                          <SelectItem value="every3days">כל 3 ימים</SelectItem>
                          <SelectItem value="weekly">שבועי</SelectItem>
                          <SelectItem value="monthly">חודשי</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-base font-medium">שעת שליחה</Label>
                      <Input 
                        type="time"
                        value={notificationTiming.time}
                        onChange={(e) => setNotificationTiming(prev => ({ ...prev, time: e.target.value }))}
                        className="text-base p-3 text-right"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-base font-medium">הפעל התראות</Label>
                      <div className="flex items-center justify-end gap-3 p-3 bg-white rounded-lg border">
                        <Switch 
                          checked={notificationTiming.enabled}
                          onCheckedChange={(checked) => setNotificationTiming(prev => ({ ...prev, enabled: checked }))}
                          className="scale-110"
                        />
                        <span className="text-sm font-medium">
                          {notificationTiming.enabled ? "מופעל" : "מבוטל"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification Channels */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-sm border border-blue-200 mb-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-right">ערוצי התראה</h2>
                    <p className="text-gray-500 text-right">בחר איך לקבל התראות</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-blue-600" />
                        <span className="text-base font-medium">התראות באפליקציה</span>
                      </div>
                      <Switch defaultChecked className="scale-110" />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-green-600" />
                        <span className="text-base font-medium">התראות בדואר אלקטרוני</span>
                      </div>
                      <Switch defaultChecked className="scale-110" />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="flex items-center gap-3">
                        <MessageCircle className="h-5 w-5 text-green-600" />
                        <span className="text-base font-medium">התראות בוואטסאפ</span>
                      </div>
                      <Switch className="scale-110" />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm border border-border mb-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-right">פרטי התקשרות</h2>
                    <p className="text-gray-500 text-right">כתובות לקבלת התראות</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-address" className="text-base font-medium">כתובת דואר אלקטרוני</Label>
                      <Input 
                        id="email-address"
                        type="email"
                        defaultValue="user@example.com"
                        placeholder="user@example.com"
                        className="text-base p-3 border-2 focus:border-blue-500"
                        dir="ltr"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp-number" className="text-base font-medium">מספר וואטסאפ</Label>
                      <Input 
                        id="whatsapp-number"
                        type="tel"
                        defaultValue="+972501234567"
                        placeholder="+972501234567"
                        className="text-base p-3 border-2 focus:border-green-500"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-center">
                  <Button 
                    onClick={() => {
                      toast.success("התרעות נשמרו", {
                        description: `תזמון: ${notificationTiming.frequency} בשעה ${notificationTiming.time}`
                      });
                    }}
                    className="px-12 py-3 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                  >
                    <Bell className="ml-2 h-5 w-5" />
                    שמירת הגדרות התראות
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Demo Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-right">
              דמו - {selectedChannelForDemo === "general" && "כללי"}
              {selectedChannelForDemo === "message" && "הודעה"}
              {selectedChannelForDemo === "whatsapp" && "וואטסאפ"}
              {selectedChannelForDemo === "email" && "מייל"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Channel header */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              {selectedChannelForDemo === "general" && <FileText className="h-5 w-5 text-gray-600" />}
              {selectedChannelForDemo === "message" && <MessageCircle className="h-5 w-5 text-purple-600" />}
              {selectedChannelForDemo === "whatsapp" && <MessageCircle className="h-5 w-5 text-green-600" />}
              {selectedChannelForDemo === "email" && <Mail className="h-5 w-5 text-blue-600" />}
              <span className="font-medium">
                {selectedChannelForDemo === "general" && "כללי"}
                {selectedChannelForDemo === "message" && "הודעה"}
                {selectedChannelForDemo === "whatsapp" && "וואטסאפ"}
                {selectedChannelForDemo === "email" && "מייל"}
              </span>
            </div>

            {/* Template type */}
            <div className="text-sm text-gray-500">
              {templateType === "standard" && "תבנית סטנדרטית"}
              {templateType === "ai" && "תבנית AI"}
              {templateType === "personal" && "משוב אישי"}
              {templateType === "combined" && "AI משולב אישי"}
            </div>

            {/* Demo content based on template type */}
            <div className="border rounded-lg p-4 bg-white">
              {templateType === "standard" && (
                <div className="space-y-3">
                  <div className="font-medium text-lg">תודה על מילוי השאלון!</div>
                  <div className="text-gray-600">התשובות שלך התקבלו בהצלחה ונבדקות על ידי הצוות שלנו.</div>
                  <div className="text-gray-600">נחזור אליך בהקדם האפשרי.</div>
                </div>
              )}
              
              {templateType === "ai" && (
                <div className="space-y-3">
                  {emailSubject && <div className="font-medium text-lg">{emailSubject}</div>}
                  <div className="text-gray-600">תגובת AI מותאמת אישית על בסיס התשובות שלך:</div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-blue-800">
                      "תבסס על התשובות שלך, אני רואה שיש לך עניין בתחום... 
                      אני ממליץ לך להתמקד ב... וניתן לך מידע נוסף על..."
                    </div>
                  </div>
                </div>
              )}
              
              {templateType === "personal" && (
                <div className="space-y-3">
                  {emailSubject && <div className="font-medium text-lg">{emailSubject}</div>}
                  <div className="text-gray-600">משוב אישי מותאם:</div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-sm text-green-800">
                      {messageBody || "הודעה אישית מותאמת לפי התשובות שלך..."}
                    </div>
                  </div>
                </div>
              )}
              
              {templateType === "combined" && (
                <div className="space-y-3">
                  {emailSubject && <div className="font-medium text-lg">{emailSubject}</div>}
                  <div className="text-gray-600">שילוב של AI ומשוב אישי:</div>
                  
                  {aiPosition === "start" && (
                    <div className="space-y-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-sm text-blue-800 font-medium">חלק AI:</div>
                        <div className="text-sm text-blue-700">
                          {customAiMessage || "תגובת AI מותאמת אישית..."}
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm text-green-800 font-medium">חלק אישי:</div>
                        <div className="text-sm text-green-700">
                          {messageBody || "הודעה אישית..."}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {aiPosition === "middle" && (
                    <div className="space-y-3">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm text-green-800 font-medium">חלק אישי:</div>
                        <div className="text-sm text-green-700">
                          {messageBody || "הודעה אישית..."}
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-sm text-blue-800 font-medium">חלק AI:</div>
                        <div className="text-sm text-blue-700">
                          {customAiMessage || "תגובת AI מותאמת אישית..."}
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm text-green-800 font-medium">חלק אישי:</div>
                        <div className="text-sm text-green-700">
                          {messageBody || "הודעה אישית..."}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {aiPosition === "end" && (
                    <div className="space-y-3">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm text-green-800 font-medium">חלק אישי:</div>
                        <div className="text-sm text-green-700">
                          {messageBody || "הודעה אישית..."}
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-sm text-blue-800 font-medium">חלק AI:</div>
                        <div className="text-sm text-blue-700">
                          {customAiMessage || "תגובת AI מותאמת אישית..."}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Channel-specific formatting */}
            {selectedChannelForDemo === "email" && (
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                📧 פורמט מייל - כולל כותרת, תוכן מובנה ותחתית
              </div>
            )}
            
            {selectedChannelForDemo === "whatsapp" && (
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                💬 פורמט וואטסאפ - הודעה קצרה וידידותית
              </div>
            )}
            
            {selectedChannelForDemo === "message" && (
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                📱 פורמט הודעה - תצוגה מותאמת למכשיר נייד
              </div>
            )}
            
            {selectedChannelForDemo === "general" && (
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                📄 פורמט כללי - תצוגה אוניברסלית
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Save/Cancel buttons */}
      <div className="mt-8 flex flex-col md:flex-row gap-3 md:gap-4 justify-center">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="px-8 py-3 text-base font-medium"
        >
          ביטול
        </Button>
        <Button 
          onClick={() => {
            toast.success("תבנית נשמרה בהצלחה!", {
              description: `תבנית "${templateName}" נשמרה וזמינה לשימוש`
            });
          }}
          className="px-8 py-3 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
        >
          שמור תבנית
        </Button>
      </div>
    </MainLayout>
  );
};

export default CreateTemplate;
