import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
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
  Edit
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
  const [profileFile, setProfileFile] = useState<string>("");
  const [documentFile, setDocumentFile] = useState<string>("");
  
  // Include logo/profile checkboxes
  const [includeLogo, setIncludeLogo] = useState(true);
  const [includeProfile, setIncludeProfile] = useState(true);
  
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
      toast.error("נא להזין נושא למייל");
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
          {/* Main form section */}
          <div className="space-y-4 md:space-y-6 mb-6">

            {/* פרטים בסיסיים */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 md:p-6 shadow-sm border border-primary/20 hover:shadow-md transition-shadow">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">פרטים בסיסיים</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="template-name" className="text-sm font-medium mb-2 block">שם התבנית</Label>
                  <Input
                    id="template-name"
                    placeholder="הקלד שם לתבנית..."
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="text-base"
                  />
                </div>

                  <div>
                    <Label htmlFor="template-type" className="text-sm font-medium mb-2 block">סוג התבנית</Label>
                    <Select value={templateType} onValueChange={(value: any) => setTemplateType(value)}>
                      <SelectTrigger className="text-right">
                        <SelectValue placeholder="בחר סוג תבנית" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-gray-500" />
                            <span>סטנדרט</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="ai">
                          <div className="flex items-center gap-2">
                            <Wand2 className="h-4 w-4 text-blue-500" />
                            <span>AI</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="personal">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-green-500" />
                            <span>משוב אישי</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="combined">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-purple-500" />
                            <span>AI משולב אישי</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="reminder" disabled>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-orange-500" />
                            <span>תזכורת (לעתיד)</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      אפשרות תזכורת תלויה בסוג המנוי - לפיתוח עתידי
                    </p>
                  </div>

                  {/* בחירת סוג המענה - תמיד מוצג */}
                  <div>
                    <Label className="text-sm font-medium mb-2 block">סוג המענה <span className="text-red-500">*</span></Label>
                    <div className="flex gap-3">
                      <Button 
                        variant={responseType === "new_customer" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setResponseType("new_customer")}
                      >
                        מענה ללקוח חדש
                      </Button>
                      <Button 
                        variant={responseType === "reminder" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setResponseType("reminder")}
                      >
                        תזכורת
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
                    <Star className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">תבנית סטנדרטית</h3>
                  </div>
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm font-medium">
                    תבנית סטנדרט
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">נושא ההודעה</Label>
                      <Input 
                        value="קיבלנו את השאלון שלך - {{businessName}}"
                        className="text-right bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">ערוץ שליחה</Label>
                      <div className="flex gap-2">
                        <Button variant="default" size="sm" className="flex-1">מייל</Button>
                        <Button variant="outline" size="sm" className="flex-1 opacity-50 cursor-not-allowed">וואטסאפ</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">תוכן ההודעה (עד 2 שורות)</Label>
                    <Textarea 
                      value="שלום {{firstName}},\nתודה שמילאת את השאלון שלנו. פנייתך התקבלה ואנו נחזור אליך בהקדם."
                      className="min-h-[60px] max-h-[60px] resize-none text-right bg-gray-50"
                      rows={2}
                      readOnly
                    />
                    <p className="text-xs text-muted-foreground">מוגבל ל-2 שורות בלבד</p>
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
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-foreground">הגדרות תזכורת</h3>
                
                <div className="space-y-4">
                  {/* סטטוס ותת סטטוס באותה שורה */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="lead-status" className="text-sm font-medium mb-2 block">סטטוס ליד <span className="text-red-500">*</span></Label>
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
                      <Label htmlFor="lead-sub-status" className="text-sm font-medium mb-2 block">תת סטטוס ליד</Label>
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
                    <Label htmlFor="timing-type" className="text-sm font-medium mb-2 block">תזמון שליחה</Label>
                    <Select value={reminderDelay} onValueChange={setReminderDelay}>
                      <SelectTrigger className="text-right">
                        <SelectValue placeholder="בחר תזמון" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">מיידי</SelectItem>
                        <SelectItem value="custom">תזמן זמן מותאם</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* מספר ימים ושעת שליחה - רק אם בחרו "תזמן זמן מותאם" */}
                  {reminderDelay === "custom" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="reminder-days" className="text-sm font-medium mb-2 block">מספר ימים</Label>
                        <Input
                          id="reminder-days"
                          type="number"
                          placeholder="1"
                          value={reminderDays}
                          onChange={(e) => setReminderDays(parseInt(e.target.value) || 0)}
                          className="text-base"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reminder-time" className="text-sm font-medium mb-2 block">שעת שליחה</Label>
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

            {/* התאמת התבנית לערוצים - לכל סוגי המענה פרט לסטנדרט */}
            {templateType !== "standard" && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 md:p-6 shadow-sm border border-blue-200 hover:shadow-md transition-shadow">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-foreground">התאמת התבנית לערוצים</h3>
                
                {/* AI - בחירה מרובה */}
                {templateType === "ai" ? (
                  <div className="flex gap-3">
                    <Button 
                      variant={selectedChannels.includes("message") ? "default" : "outline"}
                      className={`flex-1 ${selectedChannels.includes("message") ? "bg-purple-600 hover:bg-purple-700 border-purple-600" : "border-purple-300 text-purple-700 hover:bg-purple-50"}`}
                      onClick={() => handleChannelToggle("message")}
                    >
                      <MessageCircle className="h-4 w-4 ml-2" />
                      הודעה כללי
                    </Button>
                    <Button 
                      variant={selectedChannels.includes("whatsapp") ? "default" : "outline"}
                      className={`flex-1 ${selectedChannels.includes("whatsapp") ? "bg-green-600 hover:bg-green-700 border-green-600" : "border-green-300 text-green-700 hover:bg-green-50"}`}
                      onClick={() => handleChannelToggle("whatsapp")}
                    >
                      <MessageCircle className="h-4 w-4 ml-2" />
                      וואטסאפ
                    </Button>
                    <Button 
                      variant={selectedChannels.includes("email") ? "default" : "outline"}
                      className={`flex-1 ${selectedChannels.includes("email") ? "bg-blue-600 hover:bg-blue-700 border-blue-600" : "border-blue-300 text-blue-700 hover:bg-blue-50"}`}
                      onClick={() => handleChannelToggle("email")}
                    >
                      <Mail className="h-4 w-4 ml-2" />
                      מייל
                    </Button>
                  </div>
                ) : (
                  /* Personal / Combined - בחירה יחידה */
                  <div className="flex gap-3">
                    <Button 
                      variant={singleChannel === "whatsapp" ? "default" : "outline"}
                      className={`flex-1 ${singleChannel === "whatsapp" ? "bg-green-600 hover:bg-green-700 border-green-600" : "border-green-300 text-green-700 hover:bg-green-50"}`}
                      onClick={() => setSingleChannel("whatsapp")}
                    >
                      <MessageCircle className="h-4 w-4 ml-2" />
                      וואטסאפ
                    </Button>
                    <Button 
                      variant={singleChannel === "email" ? "default" : "outline"}
                      className={`flex-1 ${singleChannel === "email" ? "bg-blue-600 hover:bg-blue-700 border-blue-600" : "border-blue-300 text-blue-700 hover:bg-blue-50"}`}
                      onClick={() => setSingleChannel("email")}
                    >
                      <Mail className="h-4 w-4 ml-2" />
                      מייל
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* תוכן ההודעה - לא סטנדרט */}
            {templateType !== "standard" && (
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 md:p-6 shadow-sm border border-green-200 hover:shadow-md transition-shadow">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-foreground">תוכן ההודעה</h3>
                
                <div className="space-y-4">
                  {/* נושא - תמיד מוצג למייל */}
                  {(singleChannel === "email" || selectedChannels.includes("email")) && (
                    <div>
                      <Label htmlFor="email-subject" className="text-sm font-medium mb-2 block">נושא</Label>
                      <Input
                        id="email-subject"
                        placeholder="הקלד נושא למייל..."
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        className="text-base"
                      />
                    </div>
                  )}

                  {/* הנחיות AI - רק ל-AI */}
                  {templateType === "ai" && (
                    <div>
                      <Label htmlFor="ai-instructions" className="text-sm font-medium mb-2 block">הנחיות AI</Label>
                      <Textarea
                        id="ai-instructions"
                        placeholder="תן הנחיות ל-AI איך לכתוב את ההודעה...\n\nלדוגמה:\n- כתוב בצורה חמה ומזמינה\n- הדגש את היתרונות שלנו\n- סיים בקריאה לפעולה"
                        value={customAiMessage}
                        onChange={(e) => setCustomAiMessage(e.target.value)}
                        className="min-h-[120px] text-base resize-none"
                      />
                    </div>
                  )}

                  {/* גוף ההודעה - רק ל-personal (לא AI) */}
                  {templateType === "personal" && (
                    <div>
                      <Label htmlFor="message-body" className="text-sm font-medium mb-2 block">גוף ההודעה</Label>
                      <Textarea
                        id="message-body"
                        placeholder="הקלד את תוכן ההודעה...\n\nניתן להשתמש במשתנים:\n{{firstName}} - שם פרטי\n{{lastName}} - שם משפחה\n{{businessName}} - שם העסק\n{{date}} - תאריך"
                        value={messageBody}
                        onChange={(e) => setMessageBody(e.target.value)}
                        className="min-h-[120px] text-base resize-none"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* הוספת קישור / תמונה - לא סטנדרט */}
            {templateType !== "standard" && (
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 md:p-6 shadow-sm border border-purple-200 hover:shadow-md transition-shadow">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-foreground">הוספת קישור / תמונה</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="link-url" className="text-sm font-medium mb-2 block">קישור</Label>
                    <Input
                      id="link-url"
                      placeholder="https://example.com"
                      value={templateDesign.linkUrl}
                      onChange={(e) => setTemplateDesign(prev => ({ ...prev, linkUrl: e.target.value }))}
                      className="text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="document-file" className="text-sm font-medium mb-2 block">העלאת קובץ</Label>
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

            {/* הגדרות AI משולב - רק למשולב */}
            {templateType === "combined" && (
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 md:p-6 shadow-sm border border-indigo-200 hover:shadow-md transition-shadow">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-foreground">הגדרות AI משולב</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ai-position" className="text-sm font-medium mb-2 block">מיקום תגובת AI</Label>
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
                    <Label htmlFor="ai-instructions-combined" className="text-sm font-medium mb-2 block">הוראות ל-AI</Label>
                    <Textarea
                      id="ai-instructions-combined"
                      placeholder="תן הנחיות ל-AI איך לכתוב את החלק שלו בהודעה...\n\nלדוגמה:\n- כתוב בצורה חמה ומזמינה\n- הדגש את היתרונות שלנו\n- סיים בקריאה לפעולה"
                      value={customAiMessage}
                      onChange={(e) => setCustomAiMessage(e.target.value)}
                      className="min-h-[100px] text-base resize-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor="personal-text-combined" className="text-sm font-medium mb-2 block">התוספת מלל אישי</Label>
                    <Textarea
                      id="personal-text-combined"
                      placeholder="הקלד את החלק האישי שלך בהודעה...\n\nניתן להשתמש במשתנים:\n{{firstName}} - שם פרטי\n{{lastName}} - שם משפחה\n{{businessName}} - שם העסק\n{{date}} - תאריך"
                      value={messageBody}
                      onChange={(e) => setMessageBody(e.target.value)}
                      className="min-h-[100px] text-base resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* עיצוב התבנית - רק למשולב */}
            {templateType === "combined" && (
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 md:p-6 shadow-sm border border-pink-200 hover:shadow-md transition-shadow">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-foreground">עיצוב התבנית</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="primary-color" className="text-sm font-medium mb-2 block">צבע ראשי</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primary-color"
                          type="color"
                          value={templateDesign.primaryColor}
                          onChange={(e) => setTemplateDesign(prev => ({ ...prev, primaryColor: e.target.value }))}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={templateDesign.primaryColor}
                          onChange={(e) => setTemplateDesign(prev => ({ ...prev, primaryColor: e.target.value }))}
                          className="flex-1 text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="secondary-color" className="text-sm font-medium mb-2 block">צבע משני</Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondary-color"
                          type="color"
                          value={templateDesign.secondaryColor}
                          onChange={(e) => setTemplateDesign(prev => ({ ...prev, secondaryColor: e.target.value }))}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={templateDesign.secondaryColor}
                          onChange={(e) => setTemplateDesign(prev => ({ ...prev, secondaryColor: e.target.value }))}
                          className="flex-1 text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="background-color" className="text-sm font-medium mb-2 block">צבע רקע</Label>
                      <div className="flex gap-2">
                        <Input
                          id="background-color"
                          type="color"
                          value={templateDesign.backgroundColor}
                          onChange={(e) => setTemplateDesign(prev => ({ ...prev, backgroundColor: e.target.value }))}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          value={templateDesign.backgroundColor}
                          onChange={(e) => setTemplateDesign(prev => ({ ...prev, backgroundColor: e.target.value }))}
                          className="flex-1 text-base"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="logo-url" className="text-sm font-medium mb-2 block">קישור ללוגו</Label>
                      <Input
                        id="logo-url"
                        placeholder="https://example.com/logo.png"
                        value={templateDesign.logoUrl}
                        onChange={(e) => setTemplateDesign(prev => ({ ...prev, logoUrl: e.target.value }))}
                        className="text-base"
                      />
                    </div>

                    <div>
                      <Label htmlFor="profile-url" className="text-sm font-medium mb-2 block">קישור לתמונת פרופיל</Label>
                      <Input
                        id="profile-url"
                        placeholder="https://example.com/profile.png"
                        value={templateDesign.profileImageUrl}
                        onChange={(e) => setTemplateDesign(prev => ({ ...prev, profileImageUrl: e.target.value }))}
                        className="text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Logo, Profile and Brand Colors section */}
          <div className="mb-6">
            <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
              <h3 className="text-base md:text-lg font-semibold mb-4 text-foreground">עיצוב התבנית</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Logo section */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      checked={includeLogo} 
                      onCheckedChange={setIncludeLogo}
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium text-foreground">הוספת לוגו לתבנית</span>
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
                    <Checkbox 
                      checked={includeProfile} 
                      onCheckedChange={setIncludeProfile}
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium text-foreground">הוספת תמונת פרופיל</span>
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
                    <Palette className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">הוספת צבעי מותג</span>
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

          {/* Action buttons */}
          <div className="flex justify-center gap-4 mt-8 mb-4">
            <Button 
              onClick={handleSaveTemplate}
              className="bg-primary hover:bg-primary/90 text-white shadow-lg px-12 py-6 text-lg font-semibold rounded-xl"
              size="lg"
            >
              שמירה
            </Button>
            <Button 
              onClick={() => navigate("/automations")}
              className="bg-secondary hover:bg-secondary/90 text-white shadow-lg px-12 py-6 text-lg font-semibold rounded-xl"
              size="lg"
            >
              לאוטומציות
            </Button>
          </div>

          {/* Example template button */}
          <div className="flex justify-center mt-4">
            <Button 
              variant="outline"
              onClick={createExampleTemplate}
              className="border-dashed border-2 border-muted-foreground/25 hover:border-muted-foreground/50 text-muted-foreground hover:text-foreground"
            >
              <FileText className="h-4 w-4 ml-2" />
              צור תבנית לדוגמה
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateTemplate;
