import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { toast } from "@/hooks/use-toast";
import { 
  Plus, 
  Save, 
  MessageCircle, 
  Bot, 
  User, 
  Clock, 
  ChevronDown, 
  Upload,
  Link,
  Image,
  Star
} from "lucide-react";

interface TemplateForm {
  name: string;
  messageType: "ai" | "personal" | "combined";
  personalMessageLength: "short" | "medium" | "long";
  channels: ("email" | "whatsapp")[];
  subject?: string;
  body: string;
  aiPrompt?: string;
  includeReminder: boolean;
  reminderDays?: number;
  reminderTime?: string;
  reminderStatus?: string;
  reminderSubStatus?: string;
  attachment?: File;
  logoUrl?: string;
  profileImageUrl?: string;
  linkUrl?: string;
  uploadedImage?: File;
  useProfileLogo?: boolean;
  useProfileImage?: boolean;
}

const CustomerResponseTab = () => {
  const [formData, setFormData] = useState<TemplateForm>({
    name: "",
    messageType: "combined",
    personalMessageLength: "medium",
    channels: ["email", "whatsapp"],
    subject: "",
    body: "",
    aiPrompt: "",
    includeReminder: true,
    reminderDays: 3,
    reminderTime: "",
    reminderStatus: "",
    reminderSubStatus: "",
    logoUrl: "",
    profileImageUrl: "",
    linkUrl: "",
    useProfileLogo: true,
    useProfileImage: false,
  });

  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);
  const [previewChannel, setPreviewChannel] = useState<"email" | "whatsapp">("email");

  // Update preview channel when channels change
  useEffect(() => {
    if (formData.channels.length > 0 && !formData.channels.includes(previewChannel)) {
      setPreviewChannel(formData.channels[0] as "email" | "whatsapp");
    }
  }, [formData.channels, previewChannel]);

  const handleFieldChange = (field: keyof TemplateForm, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChannelToggle = (channel: "email" | "whatsapp") => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel) 
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }));
  };

  const handleSaveTemplate = () => {
    if (!formData.name.trim()) {
      toast({
        title: "שגיאה",
        description: "נא להזין שם לתבנית",
        variant: "destructive"
      });
      return;
    }

    if (!formData.body.trim()) {
      toast({
        title: "שגיאה", 
        description: "נא להזין תוכן הודעה",
        variant: "destructive"
      });
      return;
    }

    if (formData.channels.length === 0) {
      toast({
        title: "שגיאה",
        description: "נא לבחור לפחות ערוץ אחד",
        variant: "destructive"
      });
      return;
    }

    // כאן תהיה הלוגיקה לשמירת התבנית
    toast({
      title: "תבנית נשמרה",
      description: "התבנית נוצרה בהצלחה"
    });
  };

  const getMessageLengthDescription = (length: string) => {
    switch (length) {
      case "short": return "הודעה קצרה (1-2 משפטים)";
      case "medium": return "הודעה בינונית (3-4 משפטים)";
      case "long": return "הודעה ארוכה (5+ משפטים)";
      default: return "";
    }
  };

  const getLeadStatusOptions = () => [
    { value: "new", label: "חדש" },
    { value: "in-progress", label: "בטיפול" },
    { value: "reminder", label: "תזכורת" },
    { value: "closed-success", label: "נסגר בהצלחה" },
    { value: "not-relevant", label: "לא רלוונטי" },
    { value: "no-answer", label: "לא נענה" },
    { value: "cancelled", label: "בוטל ע״י הלקוח" }
  ];

  const getSubStatusOptions = (mainStatus: string) => {
    const statusOptions: Record<string, Array<{value: string, label: string}>> = {
      "in-progress": [
        { value: "contacted", label: "נוצר קשר" },
        { value: "price-sent", label: "הצעת מחיר נשלחה" },
        { value: "waiting-response", label: "ממתין למענה" },
        { value: "call-scheduled", label: "שיחה מתוכננת" }
      ],
      "reminder": [
        { value: "week-reminder", label: "לחזור בעוד שבוע" },
        { value: "approval-waiting", label: "ממתין לאישור" },
        { value: "update-requested", label: "לקוח ביקש להתעדכן" }
      ],
      "closed-success": [
        { value: "active-client", label: "לקוח פעיל" },
        { value: "service-provided", label: "שירות סופק" },
        { value: "payment-completed", label: "תשלום הושלם" }
      ],
      "not-relevant": [
        { value: "not-interested", label: "לא מעוניין" },
        { value: "not-suitable", label: "לא מתאים" },
        { value: "duplicate-lead", label: "ליד כפול" },
        { value: "missing-info", label: "מידע חסר" }
      ],
      "no-answer": [
        { value: "failed-attempts", label: "ניסיונות כושלים" },
        { value: "invalid-number", label: "מספר לא תקין" }
      ],
      "cancelled": [
        { value: "cancelled-after-price", label: "ביטל אחרי הצעת מחיר" },
        { value: "moved-to-competitor", label: "עבר לספק אחר" }
      ]
    };
    return statusOptions[mainStatus] || [];
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <MessageCircle className="h-8 w-8 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">מענה לקוח</h1>
        </div>
        <p className="text-muted-foreground text-lg">יצירת תבניות מענה פשוטות ומתקדמות</p>
      </div>

      {/* Main Form */}
      <Card className="p-4 md:p-6 shadow-sm border border-border bg-gradient-to-br from-background to-muted/20" dir="rtl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-right">טופס יצירת תבנית</h2>
          <p className="text-muted-foreground text-right">כל מה שצריך במקום אחד</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {/* 1. שם התבנית */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl p-4 md:p-6 shadow-sm border border-blue-200/50 dark:border-blue-800/50 hover:shadow-md transition-shadow">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 text-right">שם התבנית</h3>
          
            <div dir="rtl">
              <Label htmlFor="template-name" className="text-sm font-medium mb-2 block text-right">שם התבנית</Label>
              <Input
                id="template-name"
                value={formData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                placeholder="הקלד שם לתבנית..."
                className="text-right text-base"
                dir="rtl"
              />
            </div>
          </div>

          {/* 2. תוכן ההודעה */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl p-4 md:p-6 shadow-sm border border-green-200/50 dark:border-green-800/50 hover:shadow-md transition-shadow">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 text-right">תוכן ההודעה</h3>
          
            <div className="space-y-4">
              {/* Email Subject */}
              <div dir="rtl">
                <Label htmlFor="subject" className="text-sm font-medium mb-2 block text-right">נושא המייל</Label>
                <Input
                  id="subject"
                  value={formData.subject || ''}
                  onChange={(e) => handleFieldChange('subject', e.target.value)}
                  placeholder="לדוגמה: תודה על השאלון שלך"
                  className="text-right text-base"
                  dir="rtl"
                />
              </div>

              {/* AI Settings */}
              <div dir="rtl" className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ai-integrated" className="text-sm font-medium text-right">הגדרות משולב AI</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">תן ל-iHoogi להחליט בשבילך</span>
                    <Switch
                      id="ai-integrated"
                      checked={true}
                      onCheckedChange={() => {}}
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block text-right">AI מיקום תגובת</Label>
                  <Select value="beginning" onValueChange={() => {}}>
                    <SelectTrigger className="text-right" dir="rtl">
                      <SelectValue placeholder="בחר מיקום" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginning">בתחילת התשובה</SelectItem>
                      <SelectItem value="end">בסוף התשובה</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="ai-prompt" className="text-sm font-medium mb-2 block text-right">AI הוראות ל</Label>
                  <Textarea
                    id="ai-prompt"
                    value={formData.aiPrompt || ''}
                    onChange={(e) => handleFieldChange('aiPrompt', e.target.value)}
                    placeholder="כתוב הנחיות ספציפיות ל-AI איך לכתוב את התשובה..."
                    className="min-h-[80px] text-right resize-none"
                    dir="rtl"
                    rows={3}
                  />
                </div>
              </div>

              {/* התוספת מלל אישי */}
              <div dir="rtl">
                <Label htmlFor="body" className="text-base font-semibold mb-3 block text-right">מענה אישי</Label>
                <Textarea
                  id="body"
                  value={formData.body}
                  onChange={(e) => handleFieldChange('body', e.target.value)}
                  placeholder="הקלד את החלק האישי שלך בהודעה..."
                  className="min-h-[150px] text-right resize-none text-base"
                  dir="rtl"
                  rows={8}
                />
                <div className="mt-2">
                  <Collapsible
                    open={isCollapsibleOpen}
                    onOpenChange={setIsCollapsibleOpen}
                    dir="rtl"
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center text-sm text-primary cursor-pointer justify-end">
                        <ChevronDown className={`h-4 w-4 transition-transform ${isCollapsibleOpen ? 'transform rotate-180' : ''}`} />
                        <span className="mr-1">ניתן להשתמש במשתנים</span>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 p-3 bg-muted/50 rounded-md" dir="rtl">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-white px-2 py-1 rounded text-right">{"{{firstName}}"} - שם פרטי</div>
                        <div className="bg-white px-2 py-1 rounded text-right">{"{{lastName}}"} - שם משפחה</div>
                        <div className="bg-white px-2 py-1 rounded text-right">{"{{businessName}}"} - שם העסק</div>
                        <div className="bg-white px-2 py-1 rounded text-right">{"{{date}}"} - תאריך</div>
                        <div className="bg-white px-2 py-1 rounded text-right">{"{{time}}"} - שעה</div>
                        <div className="bg-white px-2 py-1 rounded text-right">{"{{questionnaireName}}"} - שם השאלון</div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </div>
          </div>

          {/* 3. אורך הודעה אישית */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-xl p-4 md:p-6 shadow-sm border border-purple-200/50 dark:border-purple-800/50 hover:shadow-md transition-shadow">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 text-right">אורך הודעה אישית</h3>
          
            <div dir="rtl">
              <Label className="text-sm font-medium mb-2 block text-right">אורך הודעה אישית</Label>
              <Select 
                value={formData.personalMessageLength} 
                onValueChange={(value: "short" | "medium" | "long") => handleFieldChange('personalMessageLength', value)}
              >
                <SelectTrigger className="text-right" dir="rtl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">קצרה</SelectItem>
                  <SelectItem value="medium">בינונית</SelectItem>
                  <SelectItem value="long">ארוכה</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {getMessageLengthDescription(formData.personalMessageLength)}
              </p>
            </div>
          </div>


          {/* 4. תזכורות */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-xl p-4 md:p-6 shadow-sm border border-orange-200/50 dark:border-orange-800/50 hover:shadow-md transition-shadow">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 text-right">תזכורות</h3>
          
            <div className="space-y-4" dir="rtl">
              <div className="flex items-center justify-between">
                <Label htmlFor="include-reminder" className="text-sm font-medium text-right">כלול תזכורות</Label>
                <Switch
                  id="include-reminder"
                  checked={formData.includeReminder}
                  onCheckedChange={(checked) => handleFieldChange('includeReminder', checked)}
                />
              </div>

              {formData.includeReminder && (
                <div className="space-y-4 pl-4 border-r-2 border-orange-200/30 dark:border-orange-800/30 bg-orange-50/50 dark:bg-orange-950/10 rounded-lg p-4">
                  {/* שורה ראשונה - ימים ושעת שליחה */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block text-right">ימים עד התזכורת הבאה</Label>
                      <Input
                        type="number"
                        value={formData.reminderDays || 3}
                        onChange={(e) => handleFieldChange('reminderDays', parseInt(e.target.value))}
                        min="1"
                        max="30"
                        className="text-right"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reminder-time" className="text-sm font-medium mb-2 block text-right">שעת שליחה</Label>
                      <Input
                        type="time"
                        id="reminder-time"
                        value={formData.reminderTime || ''}
                        onChange={(e) => handleFieldChange('reminderTime', e.target.value)}
                        className="text-right"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  
                  {/* שורה שנייה - סטטוס ותת-סטטוס */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="reminder-status" className="text-sm font-medium mb-2 block text-right">סטטוס</Label>
                      <Select 
                        value={formData.reminderStatus || ""} 
                        onValueChange={(value) => {
                          handleFieldChange('reminderStatus', value);
                          handleFieldChange('reminderSubStatus', ''); // Reset sub-status
                        }}
                      >
                        <SelectTrigger className="text-right" dir="rtl">
                          <SelectValue placeholder="בחר סטטוס" />
                        </SelectTrigger>
                        <SelectContent>
                          {getLeadStatusOptions().map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {formData.reminderStatus && (
                      <div>
                        <Label htmlFor="reminder-sub-status" className="text-sm font-medium mb-2 block text-right">תת-סטטוס</Label>
                        <Select 
                          value={formData.reminderSubStatus || ""} 
                          onValueChange={(value) => handleFieldChange('reminderSubStatus', value)}
                        >
                          <SelectTrigger className="text-right" dir="rtl">
                            <SelectValue placeholder="בחר תת-סטטוס" />
                          </SelectTrigger>
                          <SelectContent>
                            {getSubStatusOptions(formData.reminderStatus || "").map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 5. עיצוב ותוספות */}
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/20 dark:to-indigo-900/20 rounded-xl p-4 md:p-6 shadow-sm border border-indigo-200/50 dark:border-indigo-800/50 hover:shadow-md transition-shadow">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 text-right">עיצוב ותוספות</h3>
            
            <div className="space-y-4" dir="rtl">
              {/* תיבות צ'יק ללוגו ופרופיל */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-muted/5 rounded-lg border border-muted/20">
                  <div className="flex items-center gap-3" dir="rtl">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Link className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Label htmlFor="use-profile-logo" className="text-sm font-medium text-right block">לוגו מהפרופיל</Label>
                      <p className="text-xs text-muted-foreground text-right">השתמש בלוגו של הפרופיל</p>
                    </div>
                  </div>
                  <Switch
                    id="use-profile-logo"
                    checked={formData.useProfileLogo || false}
                    onCheckedChange={(checked) => handleFieldChange('useProfileLogo', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted/5 rounded-lg border border-muted/20">
                  <div className="flex items-center gap-3" dir="rtl">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Image className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Label htmlFor="use-profile-image" className="text-sm font-medium text-right block">תמונת פרופיל</Label>
                      <p className="text-xs text-muted-foreground text-right">השתמש בתמונת הפרופיל</p>
                    </div>
                  </div>
                  <Switch
                    id="use-profile-image"
                    checked={formData.useProfileImage || false}
                    onCheckedChange={(checked) => handleFieldChange('useProfileImage', checked)}
                  />
                </div>
              </div>

              {/* כתובות מותאמות אישית */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="logo-url" className="text-sm font-medium mb-2 block text-right">כתובת לוגו (מותאם אישית)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="logo-url"
                      value={formData.logoUrl || ''}
                      onChange={(e) => handleFieldChange('logoUrl', e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="text-right flex-1"
                      dir="ltr"
                      disabled={formData.useProfileLogo}
                    />
                    <Button variant="outline" size="sm" type="button" disabled={formData.useProfileLogo}>
                      <Link className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="profile-image-url" className="text-sm font-medium mb-2 block text-right">כתובת תמונת פרופיל (מותאם אישית)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="profile-image-url"
                      value={formData.profileImageUrl || ''}
                      onChange={(e) => handleFieldChange('profileImageUrl', e.target.value)}
                      placeholder="https://example.com/profile.jpg"
                      className="text-right flex-1"
                      dir="ltr"
                      disabled={formData.useProfileImage}
                    />
                    <Button variant="outline" size="sm" type="button" disabled={formData.useProfileImage}>
                      <Image className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="link-url" className="text-sm font-medium mb-2 block text-right">קישור (אופציונלי)</Label>
                  <Input
                    id="link-url"
                    value={formData.linkUrl || ''}
                    onChange={(e) => handleFieldChange('linkUrl', e.target.value)}
                    placeholder="https://example.com"
                    className="text-right"
                    dir="ltr"
                  />
                </div>
                
                <div>
                  <Label htmlFor="upload-image" className="text-sm font-medium mb-2 block text-right">העלת תמונה</Label>
                  <Input
                    id="upload-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFieldChange('uploadedImage', e.target.files?.[0])}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button 
              onClick={handleSaveTemplate}
              className="w-full py-3 text-base font-medium bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              <Save className="ml-2 h-5 w-5" />
              שמור תבנית
            </Button>
          </div>
        </div>
        </Card>


        {/* 6. הצגת תוכן למייל ולהודעה */}
        <Card className="p-4 md:p-6 shadow-sm border border-border bg-gradient-to-br from-background to-muted/20" dir="rtl">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-right">הצגת תוכן למייל ולהודעה</h3>
            <p className="text-muted-foreground text-right">כך ייראה התוכן שלך</p>
          </div>

          {/* Preview Mode Buttons */}
          <div className="mb-6">
            <div className="flex justify-center gap-2">
              <Button
                variant={previewChannel === "email" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewChannel("email")}
                className="flex items-center gap-2"
              >
                📧 מייל
              </Button>
              <Button
                variant={previewChannel === "whatsapp" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewChannel("whatsapp")}
                className="flex items-center gap-2"
              >
                💬 WhatsApp
              </Button>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-muted/30 min-h-[300px]">
            {/* Email Preview */}
            {previewChannel === "email" && (
              <div className="space-y-4" dir="rtl">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">תבנית: {formData.name || "שם התבנית"}</div>
                  <div className="text-xs text-muted-foreground mb-4">📧 מייל</div>
                </div>
                
                {/* Logo and Profile Images */}
                {(formData.useProfileLogo || (formData.logoUrl && !formData.useProfileLogo) || formData.useProfileImage || (formData.profileImageUrl && !formData.useProfileImage)) && (
                  <div className="flex justify-center gap-4 mb-4">
                    {/* Show logo if checkbox is checked OR custom logo is provided */}
                    {(formData.useProfileLogo || (formData.logoUrl && !formData.useProfileLogo)) && (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
                          {formData.useProfileLogo ? (
                            <div className="w-full h-full bg-primary/10 rounded-lg flex items-center justify-center">
                              <span className="text-primary font-bold">Logo</span>
                            </div>
                          ) : (
                            <img src={formData.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">
                          {formData.useProfileLogo ? "לוגו מהפרופיל" : "לוגו מותאם"}
                        </span>
                      </div>
                    )}
                    {/* Show profile image if checkbox is checked OR custom profile image is provided */}
                    {(formData.useProfileImage || (formData.profileImageUrl && !formData.useProfileImage)) && (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-white rounded-lg shadow-sm">
                          {formData.useProfileImage ? (
                            <div className="w-full h-full bg-primary/10 rounded-lg flex items-center justify-center">
                              <span className="text-primary font-bold">👤</span>
                            </div>
                          ) : (
                            <img src={formData.profileImageUrl} alt="Profile" className="w-full h-full object-cover rounded-lg" />
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">
                          {formData.useProfileImage ? "תמונה מהפרופיל" : "תמונה מותאמת"}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="bg-white p-4 rounded border shadow-sm">
                  <div className="text-sm font-medium text-gray-700 mb-2 text-right border-b pb-2">
                    📧 נושא: {formData.subject || "נושא המייל"}
                  </div>
                  <div className="text-sm text-gray-800 whitespace-pre-wrap text-right leading-relaxed">
                    {formData.body || "תוכן ההודעה יופיע כאן..."}
                  </div>
                  {formData.linkUrl && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <a href={formData.linkUrl} className="text-primary text-sm hover:underline text-right block">
                        🔗 {formData.linkUrl}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* WhatsApp Preview */}
            {previewChannel === "whatsapp" && (
              <div className="space-y-4" dir="rtl">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">תבנית: {formData.name || "שם התבנית"}</div>
                  <div className="text-xs text-muted-foreground mb-4">💬 WhatsApp</div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg max-w-sm mx-auto">
                  <div className="flex items-start gap-3">
                    {(formData.useProfileLogo || (formData.logoUrl && !formData.useProfileLogo) || formData.useProfileImage || (formData.profileImageUrl && !formData.useProfileImage)) && (
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        {formData.useProfileImage ? (
                          <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg">👤</span>
                          </div>
                        ) : formData.useProfileLogo ? (
                          <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xs">Logo</span>
                          </div>
                        ) : (
                          <img 
                            src={formData.profileImageUrl || formData.logoUrl} 
                            alt="Profile" 
                            className="w-full h-full object-cover rounded-full" 
                          />
                        )}
                      </div>
                    )}
                    <div className="bg-white p-3 rounded-lg shadow-sm flex-1">
                      <div className="text-sm text-gray-800 whitespace-pre-wrap text-right leading-relaxed">
                        {formData.body || "תוכן ההודעה יופיע כאן..."}
                      </div>
                      {formData.linkUrl && (
                        <div className="mt-2">
                          <div className="bg-green-100 p-2 rounded text-xs text-green-800 text-right">
                            🔗 {formData.linkUrl}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </Card>
    </div>
  );
};

export default CustomerResponseTab;
