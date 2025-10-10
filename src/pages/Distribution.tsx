import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import SurveyPicker from "@/components/surveys/SurveyPicker";
import QuickLinks from "@/components/surveys/QuickLinks";
import PreviewPane from "@/components/surveys/PreviewPane";
import { Button } from "@/components/ui/button";
import { Plus, Mail, MessageCircle, Smartphone, ExternalLink, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import automationTemplates from "@/lib/automationTemplates";
const Distribution = () => {
  const navigate = useNavigate();

  // Mock surveys data
  const surveys = [{
    id: "s-101",
    name: "שאלון שירותי ייעוץ עסקי"
  }, {
    id: "s-102",
    name: "שאלון שביעות רצון לקוחות"
  }, {
    id: "s-103",
    name: "שאלון אבחון צרכים"
  }];
  const [selectedSurveyId, setSelectedSurveyId] = useState<string>("");
  const [currentMode, setCurrentMode] = useState<"form" | "chat" | "qr" | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  // Customer response settings - up to 3 templates
  const [selectedTemplates, setSelectedTemplates] = useState<Array<{ id: string; channel: 'email' | 'whatsapp' | 'sms' }>>([]);

  // Get templates for lead trigger (questionnaire submissions)
  const templates = automationTemplates.getAll().filter(t => t.triggerType === "lead");
  
  // Helper functions for template management
  const addTemplate = (templateId: string, channel: 'email' | 'whatsapp' | 'sms') => {
    if (selectedTemplates.length >= 3) {
      toast.error("ניתן לבחור עד 3 תבניות בלבד");
      return;
    }
    if (selectedTemplates.some(t => t.channel === channel)) {
      toast.error(`כבר קיימת תבנית ל${channel === 'email' ? 'מייל' : channel === 'whatsapp' ? 'וואטסאפ' : 'SMS'}`);
      return;
    }
    setSelectedTemplates([...selectedTemplates, { id: templateId, channel }]);
  };
  
  const removeTemplate = (index: number) => {
    setSelectedTemplates(selectedTemplates.filter((_, i) => i !== index));
  };
  
  const isChannelUsed = (channel: 'email' | 'whatsapp' | 'sms') => {
    return selectedTemplates.some(t => t.channel === channel);
  };
  
  const handleBuildLink = (type: "form" | "chat" | "qr") => {
    if (!selectedSurveyId) {
      toast.error("בחר שאלון תחילה");
      return;
    }
    const base = typeof window !== "undefined" ? window.location.origin : "";
    let url = "";
    if (type === "form") {
      url = `${base}/form/${selectedSurveyId}`;
    } else if (type === "chat") {
      url = `${base}/chat/${selectedSurveyId}`;
    } else if (type === "qr") {
      url = `${base}/form/${selectedSurveyId}`;
    }
    setCurrentMode(type);
    setCurrentUrl(url);
    toast.success("קישור נוצר בהצלחה");
  };
  const handleCopyUrl = () => {
    if (currentUrl) {
      navigator.clipboard.writeText(currentUrl);
      toast.success("הקישור הועתק ללוח");
    }
  };
  const handlePreviewLink = (link: any) => {
    setCurrentMode(link.type);
    setCurrentUrl(link.url);
  };
  return <MainLayout initialState="content">
      <div className="flex flex-col w-full space-y-6 p-4 md:p-8 bg-background" dir="rtl">
        {/* Back Button */}
        <div className="flex items-center mb-2">
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

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-right">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2 justify-end">
              <span>📤</span> הפצת שאלונים
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1 text-right">
              צור קישורי הפצה לשאלונים שלך ושתף אותם עם הלקוחות
            </p>
          </div>
          
        </div>

        {/* מענה לקוחות - ללא לשוניות */}
            <div className="bg-card rounded-2xl shadow-sm p-5 md:p-8 border border-border">
              {/* Survey Selection */}
              <div className="bg-muted/50 rounded-xl p-4 md:p-6 mb-6 border border-border">
                <SurveyPicker value={selectedSurveyId} onChange={setSelectedSurveyId} options={surveys} />
              </div>

              {/* Customer Response Section */}
              <div className="bg-card rounded-xl p-4 md:p-6 mb-6 border border-border" dir="rtl">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">תבניות מענה אוטומטי</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigate("/automations?tab=templates")} 
                      className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
                    >
                      <Plus className="h-4 w-4" />
                      צור תבנית חדשה
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground text-right">
                    ניתן לבחור עד 3 תבניות, כל אחת לערוץ שונה (מייל, וואטסאפ או SMS)
                  </p>
                </div>

                {/* Selected Templates Display */}
                {selectedTemplates.length > 0 && (
                  <div className="mb-4 space-y-2">
                    <Label className="text-sm font-semibold">תבניות שנבחרו ({selectedTemplates.length}/3)</Label>
                    <div className="space-y-2">
                      {selectedTemplates.map((template, index) => {
                        const templateData = templates.find(t => t.id === template.id);
                        const channelIcon = template.channel === 'email' ? <Mail className="h-4 w-4" /> :
                                          template.channel === 'whatsapp' ? <MessageCircle className="h-4 w-4" /> :
                                          <Smartphone className="h-4 w-4" />;
                        const channelColor = template.channel === 'email' ? 'bg-blue-50 border-blue-200 text-blue-800' :
                                           template.channel === 'whatsapp' ? 'bg-green-50 border-green-200 text-green-800' :
                                           'bg-purple-50 border-purple-200 text-purple-800';
                        
                        return (
                          <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${channelColor}`}>
                            <div className="flex items-center gap-2">
                              {channelIcon}
                              <span className="font-medium">{templateData?.name}</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeTemplate(index)}
                              className="text-destructive hover:text-destructive/80"
                            >
                              הסר
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Add Template - only if less than 3 */}
                {selectedTemplates.length < 3 && (
                  <div className="space-y-4">
                    <Label className="text-sm font-semibold">הוסף תבנית ({selectedTemplates.length}/3)</Label>
                    
                    {/* Template Selection */}
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm mb-2 block">בחר תבנית</Label>
                        <Select 
                          disabled={!selectedSurveyId}
                          onValueChange={(templateId) => {
                            const template = templates.find(t => t.id === templateId);
                            if (template) {
                              // Show channel selection after template is selected
                              const channel = template.channel as 'email' | 'whatsapp' | 'sms';
                              addTemplate(templateId, channel);
                            }
                          }}
                        >
                          <SelectTrigger className="bg-background border-border">
                            <SelectValue placeholder={selectedSurveyId ? "בחר תבנית מענה" : "יש לבחור שאלון תחילה"} />
                          </SelectTrigger>
                          <SelectContent className="bg-popover z-50 border-border">
                            {templates.map(template => {
                              const channel = template.channel as 'email' | 'whatsapp' | 'sms';
                              const isDisabled = isChannelUsed(channel);
                              return (
                                <SelectItem 
                                  key={template.id} 
                                  value={template.id}
                                  disabled={isDisabled}
                                >
                                  {template.name} - {template.channel === "email" ? "מייל" : template.channel === "whatsapp" ? "WhatsApp" : "SMS"}
                                  {isDisabled && " (בשימוש)"}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {!selectedSurveyId && <p className="mt-4 text-xs text-muted-foreground text-right">יש לבחור שאלון כדי להפעיל מענה אוטומטי.</p>}

                {selectedTemplates.length > 0 && selectedSurveyId && (
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm text-foreground text-right">
                      ✓ מענה אוטומטי יישלח בערוצים: {selectedTemplates.map(t => 
                        t.channel === 'email' ? 'מייל' : 
                        t.channel === 'whatsapp' ? 'וואטסאפ' : 'SMS'
                      ).join(", ")}
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Links Section */}
              <div className="mb-6">
                <QuickLinks currentUrl={currentUrl} onBuild={handleBuildLink} onCopy={handleCopyUrl} onPreview={handlePreviewLink} disabled={!selectedSurveyId} />
              </div>

              {/* Preview Section */}
              {currentMode && currentUrl && <div className="mt-6 md:mt-8 animate-fade-in">
                  <PreviewPane mode={currentMode} url={currentUrl} />
                </div>}
            </div>

      </div>
    </MainLayout>;
};
export default Distribution;