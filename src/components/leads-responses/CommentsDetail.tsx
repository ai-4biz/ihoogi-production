
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar } from "@/components/ui/avatar";
import { Globe, Paperclip, Link, Copy, FileText, Edit, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { mockComments } from "./data/mockData";
import { cn } from "@/lib/utils";
import HoogiTip from "@/components/HoogiTip";
import automationTemplates from "@/lib/automationTemplates";

// Mock platform images
const platformIcons = {
  facebook: <span className="text-blue-600 font-bold">📘</span>,
  instagram: <span className="text-purple-600 font-bold">🟣</span>,
  twitter: <span className="text-blue-400 font-bold">🐦</span>,
  linkedin: <span className="text-blue-800 font-bold">in</span>,
};

// Quick response templates
const quickResponses = [
  { id: "service-info", label: "מידע על שירות", template: "תודה על פנייתך. השירות שלנו כולל..." },
  { id: "thanks", label: "תודה על המחמאה", template: "תודה רבה על המחמאה! אנחנו שמחים שנהנית מהשירות שלנו." },
  { id: "apology", label: "התנצלות", template: "אנו מתנצלים על אי הנעימות. נשמח לפתור את הבעיה בהקדם..." },
  { id: "consultation", label: "הצעת ייעוץ", template: "נשמח להציע לך ייעוץ אישי בנושא. האם נוח לך לקבוע שיחת התייעצות?" },
  { id: "details", label: "הצעה לקבל פרטים", template: "כדי שנוכל לעזור בצורה מיטבית, נשמח לקבל ממך פרטים נוספים." },
];

// Comment categories with colors
const commentCategories = [
  { id: "question", label: "שאלה", color: "bg-blue-100 text-blue-800" },
  { id: "complaint", label: "תלונה", color: "bg-orange-100 text-orange-800" },
  { id: "compliment", label: "מחמאה", color: "bg-green-100 text-green-800" },
  { id: "public", label: "בפני-קהל", color: "bg-purple-100 text-purple-800" },
];

interface CommentsDetailProps {
  commentId: string | null;
}

const CommentsDetail = ({ commentId }: CommentsDetailProps) => {
  const [responseText, setResponseText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("question");
  const [selectedChannel, setSelectedChannel] = useState("email");
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [attachmentLink, setAttachmentLink] = useState("");
  const [showTemplateSaver, setShowTemplateSaver] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  
  // Find the selected comment from mock data
  const selectedComment = commentId 
    ? mockComments.find(comment => comment.id === commentId)
    : null;

  if (!selectedComment) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <p className="text-gray-500">בחר תגובה מהרשימה כדי להציג את הפרטים</p>
      </div>
    );
  }

  const handleQuickResponse = (template: string) => {
    setResponseText(template);
  };

  const handleGenerateAIResponse = () => {
    // Mock AI response generation
    setResponseText(`תודה על פנייתך, ${selectedComment.username}! 
אנו מעריכים את המשוב שלך ונשמח לעזור בכל דבר נוסף.
בברכה,
צוות השירות`);
    
    toast({
      title: "תשובת AI נוצרה",
      description: "התשובה נוצרה בהצלחה",
      variant: "default",
    });
  };

  const handleSendResponse = () => {
    if (!responseText.trim()) {
      toast({
        title: "שגיאה",
        description: "יש להזין תוכן לתגובה",
        variant: "destructive",
      });
      return;
    }

    // Here we would call the appropriate send function based on the selected channel
    const message = `נשלחה תגובה דרך ${selectedChannel === "email" ? "אימייל" : "וואטסאפ"}`;
    
    toast({
      title: "התגובה נשלחה",
      description: message,
    });
    
    setResponseText("");
    setAttachmentFile(null);
    setAttachmentLink("");
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim() || !responseText.trim()) {
      toast({
        title: "שגיאה",
        description: "יש להזין שם תבנית ותוכן",
        variant: "destructive",
      });
      return;
    }

    // Save template using the automationTemplates utility
    automationTemplates.add({
      name: templateName,
      triggerType: "comment",
      channel: selectedChannel as any,
      body: responseText,
      isDefault: isDefault,
      ...(selectedChannel === "email" ? { subject: `תגובה לפוסט: ${selectedComment.post}` } : {})
    });

    toast({
      title: "התבנית נשמרה",
      description: `התבנית "${templateName}" נשמרה בהצלחה`,
    });
    
    setShowTemplateSaver(false);
    setTemplateName("");
    setIsDefault(false);
  };

  const getStatusBadge = () => {
    if (!selectedComment.replied) {
      return <Badge className="bg-red-500">חדש</Badge>;
    }
    return <Badge className="bg-green-500">טופל</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    const categoryConfig = commentCategories.find(c => c.id === category) || commentCategories[0];
    return (
      <Badge className={categoryConfig.color}>
        {categoryConfig.label}
      </Badge>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Left Pane - Comment Card */}
      <div className="w-full lg:w-[260px] p-2 flex-shrink-0">
        <Card className="h-full overflow-auto">
          <CardContent className="p-4">
            <div className="flex items-start gap-2 mb-4">
              <div className="w-[100px] h-[100px] bg-gray-100 rounded overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Post thumbnail" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  {platformIcons[selectedComment.platform as keyof typeof platformIcons] || "🌐"}
                  <span className="font-medium">{selectedComment.platform}</span>
                </div>
                <div className="mt-2">
                  <div className="text-sm">סוג פוסט: <span className="font-medium">רגיל</span></div>
                  <div className="text-sm">סגמנט: <span className="font-medium">כללי</span></div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="text-sm">סטטוס:</div>
                    {getStatusBadge()}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{selectedComment.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-500">בדיקת תוכן עברה</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center gap-1"
            >
              <Globe className="h-4 w-4" />
              צפה בפוסט המקורי
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Center Pane - Response Generator */}
      <div className="flex-1 p-2 overflow-y-auto">
        <Card className="h-full overflow-y-auto">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">
                התגובה ל-{selectedComment.username}
              </h3>
              <div className="flex gap-2">
                {getCategoryBadge(selectedCategory)}
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  תגובה ידנית
                </div>
              </div>
            </div>

            <Button
              onClick={handleGenerateAIResponse}
              className="bg-purple-600 hover:bg-purple-700 text-white mb-4 flex items-center gap-2"
            >
              <span className="font-bold">⚡</span> צור תשובה AI
              <HoogiTip tip="יצירת תשובה באמצעות בינה מלאכותית" />
            </Button>

            <div className="mb-4 overflow-x-auto">
              <div className="flex space-x-2 rtl:space-x-reverse whitespace-nowrap pb-2">
                {quickResponses.map((response) => (
                  <button
                    key={response.id}
                    className="px-3 py-1.5 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors"
                    onClick={() => handleQuickResponse(response.template)}
                  >
                    {response.label}
                  </button>
                ))}
              </div>
            </div>

            <Textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="כתוב את תגובתך כאן..."
              className="min-h-[150px] mb-4 resize-y"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="file-upload" className="block mb-1">קובץ מצורף</Label>
                <div className="flex gap-2">
                  <Input
                    id="file-upload"
                    type="file"
                    className="flex-1"
                    onChange={(e) => setAttachmentFile(e.target.files?.[0] || null)}
                  />
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="link-attachment" className="block mb-1">קישור מצורף</Label>
                <div className="flex gap-2">
                  <Input
                    id="link-attachment"
                    type="url"
                    placeholder="https://"
                    className="flex-1"
                    value={attachmentLink}
                    onChange={(e) => setAttachmentLink(e.target.value)}
                  />
                  <Button variant="outline" size="icon">
                    <Link className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="mb-2 text-sm font-medium">שלח באמצעות:</div>
                <RadioGroup 
                  defaultValue="email" 
                  className="flex gap-4"
                  value={selectedChannel}
                  onValueChange={setSelectedChannel}
                >
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <RadioGroupItem value="whatsapp" id="whatsapp" />
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-2 self-end">
                <Button 
                  variant="outline" 
                  onClick={() => setShowTemplateSaver(!showTemplateSaver)}
                >
                  <FileText className="h-4 w-4 ml-1" />
                  שמור כתבנית
                </Button>
                
                <Button onClick={handleSendResponse}>
                  שלח תשובה
                </Button>
              </div>
            </div>

            {/* Template saver */}
            {showTemplateSaver && (
              <Card className="mt-4">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">שמירת תבנית</h4>
                  
                  <div className="mb-3">
                    <Label htmlFor="template-name" className="block mb-1">שם התבנית</Label>
                    <Input
                      id="template-name"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      placeholder="הזן שם לתבנית"
                    />
                  </div>
                  
                  {selectedChannel === "email" && (
                    <div className="mb-3">
                      <Label htmlFor="template-subject" className="block mb-1">נושא המייל</Label>
                      <Input
                        id="template-subject"
                        defaultValue={`תגובה לפוסט: ${selectedComment.post}`}
                        placeholder="הזן נושא למייל"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      id="default-template"
                      checked={isDefault}
                      onChange={(e) => setIsDefault(e.target.checked)}
                      className="ml-2"
                    />
                    <Label htmlFor="default-template">הפוך לברירת-מחדל לערוץ זה</Label>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowTemplateSaver(false)}>
                      ביטול
                    </Button>
                    <Button onClick={handleSaveTemplate}>
                      שמור תבנית
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Pane - Original Post */}
      <div className="w-full lg:w-[300px] p-2 flex-shrink-0">
        <Card className="h-full overflow-auto">
          <CardContent className="p-4">
            <div className="flex justify-end gap-2 mb-4">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Copy className="h-4 w-4" />
                <span className="sr-only">העתק קישור</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <FileText className="h-4 w-4" />
                <span className="sr-only">העתק טקסט</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
                <span className="sr-only">ערוך</span>
              </Button>
            </div>
            
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-1">{selectedComment.post}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{selectedComment.date}</span>
                <Button variant="link" size="sm" className="h-auto p-0">
                  צפה בפוסט המקורי
                </Button>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">תגובת המשתמש</h4>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <div className="bg-blue-100 text-blue-800 h-full w-full flex items-center justify-center text-xs">
                      {selectedComment.username.charAt(0).toUpperCase()}
                    </div>
                  </Avatar>
                  <span className="font-medium text-sm">{selectedComment.username}</span>
                </div>
                <p className="text-sm">{selectedComment.comment}</p>
              </div>
            </div>
            
            <div>
              <div className="mb-2">
                <Label>סטטוס CRM</Label>
                <select className="w-full p-2 border rounded mb-2">
                  <option>ליד חדש</option>
                  <option>לקוח פוטנציאלי</option>
                  <option>בטיפול</option>
                  <option>נסגר</option>
                </select>
              </div>
              <Button variant="outline" className="w-full">
                הוסף ל-CRM
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommentsDetail;
