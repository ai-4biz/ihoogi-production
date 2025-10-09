
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Edit, Trash2, Star, Plus, ChevronDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Template {
  id: string;
  name: string;
  triggerType: "questionnaire" | "comment" | "reminder";
  templateType: "ai" | "personal" | "combined" | "standard" | "reminder";
  channel: "email" | "whatsapp";
  subject?: string;
  body: string;
  imageUrl?: string;
  fileUrl?: string;
  leadStatus?: string;
  isDefault: boolean;
}

const TemplatesTab = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);
  
  // Sample templates data
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "תבנית שאלון סטנדרטית",
      triggerType: "questionnaire",
      templateType: "standard",
      channel: "email",
      subject: "קיבלנו את השאלון שלך - {{businessName}}",
      body: "שלום {{firstName}},\n\nתודה שמילאת את השאלון שלנו.\nפנייתך התקבלה ואנו נחזור אליך בהקדם.\n\nבברכה,\n{{businessName}}",
      isDefault: true
    },
    {
      id: "2",
      name: "תבנית שאלון AI",
      triggerType: "questionnaire",
      templateType: "ai",
      channel: "email",
      subject: "תשובה אוטומטית לשאלון שלך",
      body: "תוכן זה ייווצר באופן אוטומטי על ידי AI בהתאם לתשובות בשאלון",
      isDefault: false
    },
    {
      id: "3",
      name: "תבנית תגובה רגילה",
      triggerType: "comment",
      templateType: "standard",
      channel: "email",
      subject: "תודה על התגובה שלך",
      body: "שלום {{firstName}},\n\nתודה על התגובה שלך.\nצוות התוכן שלנו יבחן את התגובה בהקדם.\n\nבברכה,\n{{businessName}}",
      isDefault: true
    }
  ]);

  const filteredTemplates = templates;

  const handleCreateTemplate = () => {
    setIsEditMode(false);
    setCurrentTemplate({
      id: crypto.randomUUID(),
      name: "",
      triggerType: "questionnaire",
      templateType: "standard",
      channel: "email",
      subject: "",
      body: "",
      isDefault: false
    });
    setIsDialogOpen(true);
  };

  const handleEditTemplate = (template: Template) => {
    setIsEditMode(true);
    setCurrentTemplate({...template});
    setIsDialogOpen(true);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prevTemplates => prevTemplates.filter(template => template.id !== id));
    toast({
      title: "התבנית נמחקה",
      description: "התבנית נמחקה בהצלחה"
    });
  };

  const handleSetDefault = (id: string) => {
    const template = templates.find(t => t.id === id);
    if (!template) return;
    
    setTemplates(prevTemplates => 
      prevTemplates.map(t => 
        t.triggerType === template.triggerType && t.channel === template.channel
          ? { ...t, isDefault: t.id === id }
          : t
      )
    );
    toast({
      title: "תבנית ברירת מחדל",
      description: "תבנית ברירת המחדל נקבעה בהצלחה"
    });
  };

  const handleSaveTemplate = () => {
    if (!currentTemplate) return;
    
    if (!currentTemplate.name.trim()) {
      toast({
        title: "שגיאה",
        description: "נא להזין שם לתבנית",
        variant: "destructive"
      });
      return;
    }

    if (!currentTemplate.subject || !currentTemplate.subject.trim()) {
      toast({
        title: "שגיאה",
        description: "נא להזין נושא למייל",
        variant: "destructive"
      });
      return;
    }

    if (!currentTemplate.body.trim()) {
      toast({
        title: "שגיאה",
        description: "נא להזין גוף הודעה",
        variant: "destructive"
      });
      return;
    }

    if (isEditMode) {
      setTemplates(prevTemplates => 
        prevTemplates.map(template => 
          template.id === currentTemplate.id ? currentTemplate : template
        )
      );
      toast({
        title: "התבנית עודכנה",
        description: "התבנית עודכנה בהצלחה"
      });
    } else {
      // If this is the first template of its kind, make it default
      const isFirstOfKind = !templates.some(
        t => t.triggerType === currentTemplate.triggerType && t.channel === currentTemplate.channel
      );
      
      if (isFirstOfKind || currentTemplate.isDefault) {
        // If this template is marked as default, unmark other templates of the same type/channel
        setTemplates(prevTemplates => 
          prevTemplates.map(template => 
            template.triggerType === currentTemplate.triggerType && 
            template.channel === currentTemplate.channel
              ? { ...template, isDefault: false }
              : template
          ).concat({...currentTemplate, isDefault: isFirstOfKind || currentTemplate.isDefault})
        );
      } else {
        setTemplates(prevTemplates => [...prevTemplates, currentTemplate]);
      }
      
      toast({
        title: "התבנית נוצרה",
        description: "התבנית נוצרה בהצלחה"
      });
    }

    setIsDialogOpen(false);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
      {/* Standard Email Template */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              תבנית סטנדרטית למייל
            </h2>
            <p className="text-muted-foreground text-sm">תבנית ברירת מחדל למענה אוטומטי בדוא"ל</p>
          </div>
        </div>
        <div className="space-y-3 bg-background p-4 rounded-md border">
          <div>
            <Label className="text-xs text-muted-foreground">נושא</Label>
            <p className="font-medium">קיבלנו את השאלון שלך - {"{{businessName}}"}</p>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">תוכן ההודעה</Label>
            <p className="whitespace-pre-wrap text-sm">
              שלום {"{{firstName}}"},
              {"\n\n"}
              תודה שמילאת את השאלון שלנו.
              {"\n"}
              פנייתך התקבלה ואנו נחזור אליך בהקדם.
              {"\n\n"}
              בברכה,
              {"\n"}
              {"{{businessName}}"}
            </p>
          </div>
        </div>
      </Card>

      {/* Template Builder */}
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">בניית תבניות</h2>
          <p className="text-muted-foreground">צור תבניות מותאמות אישית למענה אוטומטי</p>
        </div>

        <div className="border rounded-md mb-6" dir="rtl">
          <div className="p-4 border-b flex items-center justify-between bg-gray-50">
            <h3 className="font-medium text-right">תבניות קיימות</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCreateTemplate} 
              className="flex items-center bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
            >
              <Plus className="h-4 w-4 ml-2" />
              תבנית חדשה
            </Button>
          </div>
          
          <div className="divide-y">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map(template => (
                <div key={template.id} className="p-4 flex items-center justify-between hover:bg-gray-50" dir="rtl">
                  <div className="flex items-center gap-3 flex-1">
                    {template.isDefault && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Star className="h-4 w-4 text-yellow-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>ברירת מחדל</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    <div className="flex-1 text-right">
                      <div className="font-medium">{template.name}</div>
                      <div className="flex gap-2 mt-1 text-xs text-gray-500 justify-end">
                        <span>סוג: {
                          template.templateType === 'ai' ? 'AI' :
                          template.templateType === 'personal' ? 'פנייה אישית' :
                          template.templateType === 'combined' ? 'משולב' :
                          'סטנדרטית'
                        }</span>
                        <span>•</span>
                        <span>ערוץ: {template.channel === 'email' ? 'דוא"ל' : 'וואטסאפ'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditTemplate(template)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>ערוך</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>מחק</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    {!template.isDefault && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleSetDefault(template.id)}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>הגדר כברירת מחדל</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500" dir="rtl">
                <p>אין תבניות עדיין עבור הקטגוריה הזו</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCreateTemplate}
                  className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
                >
                  צור תבנית חדשה
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "עריכת תבנית" : "יצירת תבנית חדשה"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="template-name">שם תבנית</Label>
              <Input 
                id="template-name"
                value={currentTemplate?.name || ""} 
                onChange={(e) => setCurrentTemplate(prev => 
                  prev ? {...prev, name: e.target.value} : null
                )} 
                placeholder="הזן שם לתבנית"
                dir="rtl"
              />
            </div>

            <div>
              <Label htmlFor="template-type">סוג תבנית</Label>
              <Select 
                value={currentTemplate?.templateType || "standard"} 
                onValueChange={(value) => setCurrentTemplate(prev => 
                  prev ? {...prev, templateType: value as Template['templateType']} : null
                )}
              >
                <SelectTrigger id="template-type" className="w-full">
                  <SelectValue placeholder="בחר סוג תבנית" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">סטנדרטית</SelectItem>
                  <SelectItem value="ai">AI</SelectItem>
                  <SelectItem value="personal">פנייה אישית</SelectItem>
                  <SelectItem value="combined">משולב</SelectItem>
                  <SelectItem value="reminder">תזכורת</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {currentTemplate?.templateType === "reminder" && (
              <div>
                <Label htmlFor="lead-status">סטטוס ליד</Label>
                <Select 
                  value={currentTemplate?.leadStatus || ""} 
                  onValueChange={(value) => setCurrentTemplate(prev => 
                    prev ? {...prev, leadStatus: value} : null
                  )}
                >
                  <SelectTrigger id="lead-status" className="w-full">
                    <SelectValue placeholder="בחר סטטוס ליד" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">חדש</SelectItem>
                    <SelectItem value="contacted">יצר קשר</SelectItem>
                    <SelectItem value="qualified">מוסמך</SelectItem>
                    <SelectItem value="proposal">הצעה</SelectItem>
                    <SelectItem value="negotiation">משא ומתן</SelectItem>
                    <SelectItem value="closed">סגור</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label htmlFor="email-subject">נושא מייל</Label>
              <Input 
                id="email-subject"
                value={currentTemplate?.subject || ""} 
                onChange={(e) => setCurrentTemplate(prev => 
                  prev ? {...prev, subject: e.target.value} : null
                )} 
                placeholder="הזן נושא למייל"
                dir="rtl"
              />
            </div>

            <div>
              <Label htmlFor="message-body">גוף ההודעה</Label>
              <Textarea 
                id="message-body"
                value={currentTemplate?.body || ""} 
                onChange={(e) => setCurrentTemplate(prev => 
                  prev ? {...prev, body: e.target.value} : null
                )} 
                className="min-h-[150px]"
                placeholder="הזן את תוכן ההודעה"
                dir="rtl"
              />
            </div>

            {currentTemplate?.templateType !== 'standard' && (
              <div>
                <Label htmlFor="file-upload">העלאת קובץ או תמונה</Label>
                <Input 
                  id="file-upload"
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Here you would typically upload the file and get a URL
                      // For now, we'll just store the file name
                      setCurrentTemplate(prev => 
                        prev ? {...prev, imageUrl: file.name} : null
                      );
                      toast({
                        title: "קובץ נבחר",
                        description: `הקובץ ${file.name} נבחר בהצלחה`
                      });
                    }
                  }}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  ניתן להעלות תמונות או קבצי PDF, Word
                </p>
                {currentTemplate?.imageUrl && (
                  <p className="text-xs text-primary mt-2">
                    קובץ נבחר: {currentTemplate.imageUrl}
                  </p>
                )}
              </div>
            )}

            <Collapsible
              open={isCollapsibleOpen}
              onOpenChange={setIsCollapsibleOpen}
              className="w-full"
            >
              <CollapsibleTrigger asChild>
                <div className="flex items-center text-sm text-blue-600 cursor-pointer">
                  <ChevronDown className={`h-4 w-4 transition-transform ${isCollapsibleOpen ? 'transform rotate-180' : ''}`} />
                  <span className="mr-1">משתנים נתמכים</span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 p-2 bg-gray-50 rounded-md text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-100 px-2 py-1 rounded">{"{{firstName}}"}</div>
                  <div className="bg-gray-100 px-2 py-1 rounded">{"{{lastName}}"}</div>
                  <div className="bg-gray-100 px-2 py-1 rounded">{"{{businessName}}"}</div>
                  <div className="bg-gray-100 px-2 py-1 rounded">{"{{leadSource}}"}</div>
                  <div className="bg-gray-100 px-2 py-1 rounded">{"{{date}}"}</div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Switch 
                id="is-default"
                checked={currentTemplate?.isDefault || false}
                onCheckedChange={(checked) => setCurrentTemplate(prev => 
                  prev ? {...prev, isDefault: checked} : null
                )}
              />
              <Label htmlFor="is-default">הפוך לברירת-מחדל לערוץ זה</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" asChild>
              <DialogClose>ביטול</DialogClose>
            </Button>
            <Button onClick={handleSaveTemplate}>
              {isEditMode ? "עדכון" : "שמירה"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default TemplatesTab;
