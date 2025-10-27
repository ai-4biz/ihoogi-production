import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { 
  Save, 
  MessageCircle, 
  Bot, 
  User,
  Link,
  Image,
  Upload,
  Mail,
  Clock
} from "lucide-react";
import { generateQuestionnaireThankYouEmail, generateQuestionnaireReminderEmail, getUserBranding } from "@/lib/automationTemplates";

interface TemplateForm {
  name: string;
  subject: string;
  body: string;
  aiResponse: string;
  personalMessagePosition: "above" | "below";
  messageLength: "short" | "medium" | "long";
  channels: ("email" | "whatsapp")[];
  includeReminder: boolean;
  reminderDays?: number;
  reminderTime?: string;
  reminderStatus?: string;
  reminderSubStatus?: string;
  logoUrl?: string;
  profileImageUrl?: string;
  linkUrl?: string;
  uploadedImage?: File;
  useProfileLogo?: boolean;
  useProfileImage?: boolean;
  reminderFrequency?: "every-few-days" | "custom-days";
}

const CustomerResponseTab = () => {
  const [formData, setFormData] = useState<TemplateForm>({
    name: "",
    subject: "",
    body: "",
    aiResponse: "",
    personalMessagePosition: "below",
    messageLength: "medium",
    channels: ["email", "whatsapp"],
    includeReminder: false,
    reminderDays: 3,
    reminderTime: "",
    reminderStatus: "",
    reminderSubStatus: "",
    logoUrl: "",
    profileImageUrl: "",
    linkUrl: "",
    useProfileLogo: true,
    useProfileImage: false,
    reminderFrequency: "custom-days",
  });

  const [isTextareaEnabled, setIsTextareaEnabled] = useState(false);
  const [previewChannel, setPreviewChannel] = useState<"email" | "whatsapp">("email");

  const handleFieldChange = (field: keyof TemplateForm, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateAIResponse = () => {
    // כאן תהיה הלוגיקה לייצור תשובת AI
    const sampleAIResponse = "תודה על פנייתכם. אנו נבדוק את השאלות שלכם ונחזור אליכם בהקדם עם מענה מפורט.";
    
    setFormData(prev => ({
      ...prev,
      aiResponse: sampleAIResponse,
      body: sampleAIResponse // תמיד מעתיקים את תשובת AI לתיבה הראשית
    }));
    
    setIsTextareaEnabled(true); // הפעלת תיבת הטקסט
    
    toast({
      title: "תשובת AI נוצרה",
      description: "נוצר מענה אוטומטי שניתן לערוך"
    });
  };

  const generatePersonalResponse = () => {
    // כאן תהיה הלוגיקה לייצור מענה אישי בסיסי
    const samplePersonalResponse = "שלום! אני יכול לעזור לך עם השאלות שלך. מה מעניין אותך במיוחד?";
    
    setFormData(prev => ({
      ...prev,
      body: samplePersonalResponse
    }));
    
    setIsTextareaEnabled(true); // הפעלת תיבת הטקסט
    
    toast({
      title: "מענה אישי נוצר",
      description: "נוצר מענה אישי שניתן לערוך"
    });
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
        <p className="text-muted-foreground text-lg">יצירת תבניות מענה פשוטות ונוחות</p>
      </div>

      {/* תבניות מערכת אוטומטיות */}
      <Card className="p-6 shadow-sm border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">תבניות אוטומטיות של המערכת</h2>
              <p className="text-sm text-muted-foreground">אלה נשלחות אוטומטית מהמערכת</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Thank You Template */}
          <div className="border-2 border-green-200 bg-green-50/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-green-700">מייל תודה אוטומטי</h4>
                <p className="text-xs text-muted-foreground">שולח לאחר מענה לשאלון</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-green-200 shadow-sm">
              <div 
                className="bg-gray-50 rounded overflow-auto max-h-[400px] p-2"
                dangerouslySetInnerHTML={{ __html: (() => {
                  const branding = getUserBranding();
                  return generateQuestionnaireThankYouEmail({
                    firstName: "דוד",
                    businessName: branding.businessName || "העסק שלי",
                    questionnaireTitle: "שאלון שירות",
                    logoUrl: branding.logoUrl,
                    profileImageUrl: branding.profileImageUrl,
                    personalMessage: "תודה רבה על הזמן שהשקעת! התשובות שלך עוזרות לנו לשפר את השירות."
                  });
                })()}}
              >
              </div>
            </div>
          </div>

          {/* Reminder Template */}
          <div className="border-2 border-orange-200 bg-orange-50/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-bold text-orange-700">מייל תזכורת אוטומטי</h4>
                <p className="text-xs text-muted-foreground">שולח ללקוחות שלא ענו</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-orange-200 shadow-sm">
              <div 
                className="bg-gray-50 rounded overflow-auto max-h-[400px] p-2"
                dangerouslySetInnerHTML={{ __html: (() => {
                  const branding = getUserBranding();
                  return generateQuestionnaireReminderEmail({
                    firstName: "דוד",
                    businessName: branding.businessName || "העסק שלי",
                    questionnaireTitle: "שאלון שירות",
                    logoUrl: branding.logoUrl,
                    profileImageUrl: branding.profileImageUrl,
                    timeLeft: "בעוד 2 ימים"
                  });
                })()}}
              >
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* תבניות משתמש - יצירה ידנית */}
      <Card className="p-6 shadow-sm border border-border" dir="rtl">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-right">תבניות משתמש - יצירה ידנית</h2>
          </div>
          <p className="text-muted-foreground text-right">יצירת תבניות מענה מותאמות אישית שלך</p>
        </div>

        {/* שם התבנית */}
        <div className="space-y-4 mb-6" dir="rtl">
          <div className="space-y-2">
            <Label htmlFor="template-name" className="text-sm font-medium text-right">שם התבנית *</Label>
            <Input
              id="template-name"
              value={formData.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              placeholder="הקלד שם לתבנית..."
              className="text-right"
              dir="rtl"
              required
            />
          </div>
        </div>

        {/* חלק אחד - יצירת התבנית */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl p-4 md:p-6 shadow-sm border border-blue-200/50 dark:border-blue-800/50 hover:shadow-md transition-shadow space-y-4">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 text-right">יצירת תבנית מענה</h3>
          
          <div className="space-y-4" dir="rtl">

            {/* אורך התשובה */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-right">אורך התשובה</Label>
              <Select 
                value={formData.messageLength} 
                onValueChange={(value: "short" | "medium" | "long") => handleFieldChange('messageLength', value)}
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
              <p className="text-xs text-muted-foreground text-right">
                {getMessageLengthDescription(formData.messageLength)}
              </p>
            </div>

            {/* נושא המענה */}
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium text-right">נושא המענה</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleFieldChange('subject', e.target.value)}
                placeholder="לדוגמה: תודה על השאלון שלך"
                className="text-right"
                dir="rtl"
              />
            </div>

            {/* כפתורי יצירה */}
            <div className="flex items-center gap-3">
              <Button 
                onClick={generateAIResponse}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Bot className="h-4 w-4" />
                מענה AI
              </Button>
              <Button 
                onClick={generatePersonalResponse}
                variant="outline"
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                מענה אישי
              </Button>
            </div>

            {/* תוכן ההודעה */}
            <div className="space-y-4">
              <Label htmlFor="body" className="text-sm font-medium text-right">תוכן ההודעה</Label>
              <Textarea
                id="body"
                value={formData.body}
                onChange={(e) => handleFieldChange('body', e.target.value)}
                placeholder={isTextareaEnabled ? "עורך את התוכן..." : "לחיצה על כפתור מענה AI או מענה אישי תאפשר לכתוב כאן..."}
                disabled={!isTextareaEnabled}
                className={`min-h-[120px] text-right resize-none ${
                  isTextareaEnabled 
                    ? "bg-white/80 dark:bg-gray-800/80 border-blue-200 dark:border-blue-800 focus:border-blue-400 dark:focus:border-blue-600" 
                    : "bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                }`}
                dir="rtl"
                rows={6}
              />
            </div>
          </div>
        </div>

        {/* תזכורות */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-xl p-4 md:p-6 shadow-sm border border-orange-200/50 dark:border-orange-800/50 hover:shadow-md transition-shadow">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 text-right">תזכורות</h3>
          
            <div className="space-y-4" dir="rtl">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="include-reminder"
                  checked={formData.includeReminder}
                  onCheckedChange={(checked) => handleFieldChange('includeReminder', checked)}
                />
                <Label htmlFor="include-reminder" className="text-sm font-medium text-right cursor-pointer">כלול תזכורות</Label>
              </div>

              {formData.includeReminder && (
                <div className="pl-4 border-r-2 border-orange-200/30 dark:border-orange-800/30 bg-orange-50/50 dark:bg-orange-950/10 rounded-lg p-4">
                  {/* שורה ראשונה: תדירות התזכורת ושעת שליחה */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-right block mb-1">מתי לתזכר</Label>
                      <Select 
                        value={formData.reminderFrequency || "custom-days"} 
                        onValueChange={(value: "every-few-days" | "custom-days") => handleFieldChange('reminderFrequency', value)}
                      >
                        <SelectTrigger className="text-right" dir="rtl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="every-few-days">כל כמה ימים</SelectItem>
                          <SelectItem value="custom-days">עוד X ימים</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {(formData.reminderFrequency === "custom-days" || formData.reminderFrequency === "every-few-days") && (
                      <div className="w-24">
                        <Label className="text-sm font-medium text-right block mb-1">ימים</Label>
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
                    )}
                    
                    <div className="w-32">
                      <Label htmlFor="reminder-time" className="text-sm font-medium text-right block mb-1">שעת שליחה</Label>
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

                  {/* שורה שנייה: סטטוס ותת-סטטוס */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label htmlFor="reminder-status" className="text-sm font-medium text-right block mb-1">סטטוס *</Label>
                      <Select 
                        value={formData.reminderStatus || ""} 
                        onValueChange={(value) => {
                          handleFieldChange('reminderStatus', value);
                          handleFieldChange('reminderSubStatus', ''); // Reset sub-status
                        }}
                        required
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
                      <div className="flex-1">
                        <Label htmlFor="reminder-sub-status" className="text-sm font-medium text-right block mb-1">תת-סטטוס (אופציונלי)</Label>
                        <Select 
                          value={formData.reminderSubStatus || ""} 
                          onValueChange={(value) => handleFieldChange('reminderSubStatus', value)}
                        >
                          <SelectTrigger className="text-right" dir="rtl">
                            <SelectValue placeholder="בחר תת-סטטוס (אופציונלי)" />
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

          {/* מפריד */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

          {/* 7. עיצוב ותוספות */}
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/20 dark:to-indigo-900/20 rounded-xl p-4 md:p-6 shadow-sm border border-indigo-200/50 dark:border-indigo-800/50 hover:shadow-md transition-shadow">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 text-right">עיצוב ותוספות</h3>
            
            <div className="space-y-4" dir="rtl">
              {/* שורה ראשונה: לוגו ותמונת פרופיל עם דוגמות */}
              <div className="flex items-center gap-6" dir="rtl">
                <div className="flex items-center gap-3">
                  {/* דוגמת לוגו */}
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                    <span className="text-primary font-bold text-sm">Logo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="use-profile-logo"
                      checked={formData.useProfileLogo || false}
                      onCheckedChange={(checked) => handleFieldChange('useProfileLogo', checked)}
                    />
                    <Label htmlFor="use-profile-logo" className="text-sm font-medium text-right">לוגו מהפרופיל</Label>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* דוגמת תמונת פרופיל */}
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="use-profile-image"
                      checked={formData.useProfileImage || false}
                      onCheckedChange={(checked) => handleFieldChange('useProfileImage', checked)}
                    />
                    <Label htmlFor="use-profile-image" className="text-sm font-medium text-right">תמונת פרופיל</Label>
                  </div>
                </div>
              </div>

              {/* שורה שנייה: קישור והעלת תמונה */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="link-url" className="text-sm font-medium text-right block mb-1">קישור (אופציונלי)</Label>
                  <Input
                    id="link-url"
                    value={formData.linkUrl || ''}
                    onChange={(e) => handleFieldChange('linkUrl', e.target.value)}
                    placeholder="https://example.com"
                    className="text-right"
                    dir="ltr"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="upload-image" className="text-sm font-medium text-right block mb-1">העלת תמונה</Label>
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


          {/* תצוגה מקדימה של התבנית הנוצרת */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-right mb-4">תצוגה מקדימה</h3>
            
            {/* Preview Mode Buttons */}
            <div className="mb-4">
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
                  💬 הודעה
                </Button>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50 min-h-[200px]">
              {previewChannel === "email" && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden" dir="rtl">
                  {/* Top Banner: Logo + Business Name + Message */}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg border-b border-primary/20">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const branding = getUserBranding();
                        return branding.logoUrl && (
                          <img 
                            src={branding.logoUrl} 
                            alt="Logo" 
                            className="h-12 w-12 object-contain"
                          />
                        );
                      })()}
                    </div>
                    <div className="text-right">
                      {(() => {
                        const branding = getUserBranding();
                        return (
                          <>
                            {branding.businessName && (
                              <h2 className="text-xl font-bold text-primary mb-1">
                                {branding.businessName}
                              </h2>
                            )}
                            <p className="text-base font-semibold text-green-600">פנייתך התקבלה – הצוות שלנו כבר מטפל בה.</p>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 min-h-[200px] bg-gray-50/30" dir="rtl">
                    <div className="text-base text-gray-800 text-right leading-relaxed whitespace-pre-wrap">
                      {formData.body || "תודה רבה על המענה ושהקדשת את הזמן! 👍"}
                    </div>
                  </div>
                  
                  {/* Bottom Banner: Logo + Business Details + Signature */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-t p-6 flex items-center justify-between" dir="rtl">
                    {(() => {
                      const branding = getUserBranding();
                      return (
                        <>
                          {/* Right side: Logo */}
                          {branding.logoUrl && (
                            <img 
                              src={branding.logoUrl} 
                              alt="Logo" 
                              className="h-12 w-12 object-contain"
                            />
                          )}
                          
                          {/* Left side: Business Name + Signature */}
                          <div className="text-center">
                            <p className="text-base font-semibold text-gray-800 mb-1">{branding.businessName || "שם העסק"}</p>
                            <p className="text-green-600 font-semibold">בברכה</p>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}

              {previewChannel === "whatsapp" && (
                <div className="space-y-3" dir="rtl">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-2">תבנית: {formData.name || "שם התבנית"}</div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg max-w-sm mx-auto">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm flex-1">
                        {/* AI Response - אם מעל המענה האישי */}
                        {formData.aiResponse && formData.personalMessagePosition === "above" && (
                          <div className="mb-2 p-2 bg-blue-50 rounded text-xs text-right border-r-2 border-blue-300">
                            <div className="flex items-center gap-1 mb-1">
                              <Bot className="h-3 w-3 text-blue-600" />
                              <span className="text-blue-800 font-medium">מענה AI</span>
                            </div>
                            <div className="text-gray-700 whitespace-pre-wrap">
                              {formData.aiResponse}
                            </div>
                          </div>
                        )}
                        
                        <div className="text-sm text-gray-800 whitespace-pre-wrap text-right leading-relaxed">
                          {formData.body || "תוכן המענה האישי יופיע כאן..."}
                        </div>
                        
                        {/* AI Response - אחרי המענה האישי */}
                        {formData.aiResponse && formData.personalMessagePosition === "below" && (
                          <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-right border-r-2 border-blue-300">
                            <div className="flex items-center gap-1 mb-1">
                              <Bot className="h-3 w-3 text-blue-600" />
                              <span className="text-blue-800 font-medium">מענה AI</span>
                            </div>
                            <div className="text-gray-700 whitespace-pre-wrap">
                              {formData.aiResponse}
                            </div>
                          </div>
                        )}
                        
                        {formData.linkUrl && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <a href={formData.linkUrl} className="text-primary text-xs hover:underline text-right block">
                              🔗 {formData.linkUrl}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <Button 
              onClick={handleSaveTemplate}
              className="w-full py-3 text-base font-medium"
            >
              <Save className="ml-2 h-5 w-5" />
              שמור תבנית
            </Button>
          </div>
        </Card>
    </div>
  );
};

export default CustomerResponseTab;
