import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import SurveyPicker from "@/components/surveys/SurveyPicker";
import QuickLinks from "@/components/surveys/QuickLinks";
import PreviewPane from "@/components/surveys/PreviewPane";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  // Custom link form state
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [linkData, setLinkData] = useState({
    linkText: ""
  });

  // Saved links state - initialize from localStorage
  const [savedLinks, setSavedLinks] = useState<Array<{
    id: string;
    url: string;
    linkText: string;
    type: "form" | "chat" | "qr";
    createdAt: string;
    surveyId: string;
  }>>(() => {
    try {
      const savedLinksData = localStorage.getItem('hoogi-saved-links');
      return savedLinksData ? JSON.parse(savedLinksData) : [];
    } catch (error) {
      console.error('Error loading saved links:', error);
      return [];
    }
  });

  // Save links to localStorage whenever savedLinks changes
  useEffect(() => {
    localStorage.setItem('hoogi-saved-links', JSON.stringify(savedLinks));
  }, [savedLinks]);

  // Customer response settings - up to 3 templates, each with multiple channels
  const [selectedTemplates, setSelectedTemplates] = useState<Array<{ 
    id: string; 
    channels: Array<'email' | 'whatsapp' | 'sms'> 
  }>>([]);

  // Get templates for lead trigger (questionnaire submissions)
  const templates = automationTemplates.getAll().filter(t => t.triggerType === "lead");
  
  // Helper functions for template management
  const addTemplate = (templateId: string) => {
    if (selectedTemplates.length >= 3) {
      toast.error("ניתן לבחור עד 3 תבניות בלבד");
      return;
    }
    setSelectedTemplates([...selectedTemplates, { id: templateId, channels: [] }]);
  };
  
  const removeTemplate = (index: number) => {
    setSelectedTemplates(selectedTemplates.filter((_, i) => i !== index));
  };
  
  const toggleChannelForTemplate = (templateIndex: number, channel: 'email' | 'whatsapp' | 'sms') => {
    setSelectedTemplates(prev => prev.map((template, idx) => {
      if (idx === templateIndex) {
        const channels = template.channels.includes(channel)
          ? template.channels.filter(c => c !== channel)
          : [...template.channels, channel];
        return { ...template, channels };
      }
      return template;
    }));
  };
  
  const isChannelUsedByOtherTemplates = (currentTemplateIndex: number, channel: 'email' | 'whatsapp' | 'sms') => {
    return selectedTemplates.some((t, idx) => 
      idx !== currentTemplateIndex && t.channels.includes(channel)
    );
  };
  
  const getUsedChannels = () => {
    return selectedTemplates.flatMap(t => t.channels);
  };
  
  const getAvailableChannels = (templateIndex: number): Array<'email' | 'whatsapp' | 'sms'> => {
    const allChannels: Array<'email' | 'whatsapp' | 'sms'> = ['email', 'whatsapp', 'sms'];
    return allChannels.filter(channel => 
      !isChannelUsedByOtherTemplates(templateIndex, channel)
    );
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

  // Custom link form functions
  const handleAddLink = () => {
    if (!linkData.linkText.trim()) {
      toast.error("אנא מלא את שדה המלל");
      return;
    }
    
    if (!currentUrl || !currentMode || !selectedSurveyId) {
      toast.error("אנא יצור קישור תחילה");
      return;
    }
    
    // Save the link with its text
    const newSavedLink = {
      id: `link-${Date.now()}`,
      url: currentUrl,
      linkText: linkData.linkText.trim(),
      type: currentMode,
      createdAt: new Date().toISOString(),
      surveyId: selectedSurveyId
    };
    
    setSavedLinks(prev => [...prev, newSavedLink]);
    toast.success("קישור עם מלל נשמר בהצלחה");
    setLinkData({ linkText: "" });
    setShowLinkForm(false);
  };

  // Delete saved link
  const handleDeleteSavedLink = (linkId: string) => {
    setSavedLinks(prev => prev.filter(link => link.id !== linkId));
    toast.success("קישור נמחק בהצלחה");
  };

  // Load saved link into current form
  const handleLoadSavedLink = (savedLink: typeof savedLinks[0]) => {
    setCurrentUrl(savedLink.url);
    setCurrentMode(savedLink.type);
    setLinkData({ linkText: savedLink.linkText });
    toast.success("קישור נטען בהצלחה");
  };

  // Copy functions for saved links
  const copySavedLinkAsButton = async (link: typeof savedLinks[0]) => {
    const buttonHtml = `<a href="${link.url}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">${link.linkText}</a>`;
    
    try {
      const blob = new Blob([buttonHtml], { type: 'text/html' });
      const data = [new ClipboardItem({ 'text/html': blob, 'text/plain': new Blob([link.linkText], { type: 'text/plain' }) })];
      await navigator.clipboard.write(data);
      toast.success("כפתור הועתק ללוח");
    } catch (err) {
      await navigator.clipboard.writeText(buttonHtml);
      toast.success("כפתור הועתק ללוח (HTML)");
    }
  };

  const copySavedLinkAsText = async (link: typeof savedLinks[0]) => {
    const htmlContent = `<a href="${link.url}">${link.linkText}</a>`;
    
    try {
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const data = [new ClipboardItem({ 'text/html': blob, 'text/plain': new Blob([link.linkText], { type: 'text/plain' }) })];
      await navigator.clipboard.write(data);
      toast.success("מלל עם קישור הועתק ללוח");
    } catch (err) {
      await navigator.clipboard.writeText(`${link.linkText} - ${link.url}`);
      toast.success("מלל עם קישור הועתק ללוח");
    }
  };

  const copySavedLinkAsLink = (link: typeof savedLinks[0]) => {
    navigator.clipboard.writeText(link.url);
    toast.success("קישור הועתק ללוח");
  };

  // Copy as button (with full styling) - copies from hidden text area
  const copyAsButton = () => {
    if (!linkData.linkText.trim() || !currentUrl) {
      toast.error("אנא מלא את שדה המלל ויצור קישור תחילה");
      return;
    }
    
    // Get content from hidden text area
    const hiddenContent = linkData.linkText;
    
    // Create HTML button with gradient background and icon - smaller version
    const htmlContent = `
      <div style="background: linear-gradient(to right, #3b82f6, #f97316); padding: 12px; border-radius: 8px; text-align: center;">
        <a href="${currentUrl}" target="_blank" style="display: inline-flex; align-items: center; gap: 4px; padding: 8px 16px; background: rgba(255,255,255,0.2); backdrop-filter: blur(4px); border-radius: 6px; color: white; font-weight: 500; text-decoration: none; transition: all 0.2s; font-size: 14px;">
          ${hiddenContent}
          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </a>
      </div>
    `;
    
    // Try to copy as HTML first (for rich text editors)
    if (navigator.clipboard.write) {
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([htmlContent], { type: 'text/html' }),
        'text/plain': new Blob([hiddenContent], { type: 'text/plain' })
      });
      
      navigator.clipboard.write([clipboardItem]).then(() => {
        toast.success("כפתור הקישור הועתק ללוח");
      }).catch(() => {
        // Fallback to plain text
        navigator.clipboard.writeText(hiddenContent);
        toast.success("מלל הכפתור הועתק ללוח");
      });
    } else {
      // Fallback for older browsers
      navigator.clipboard.writeText(hiddenContent);
      toast.success("מלל הכפתור הועתק ללוח");
    }
  };

  // Copy as text with link
  const copyAsText = () => {
    if (!linkData.linkText.trim() || !currentUrl) {
      toast.error("אנא מלא את שדה המלל ויצור קישור תחילה");
      return;
    }
    
    // Create clickable text with link
    const htmlContent = `<a href="${currentUrl}" target="_blank">${linkData.linkText}</a>`;
    
    // Try to copy as HTML first (for rich text editors)
    if (navigator.clipboard.write) {
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([htmlContent], { type: 'text/html' }),
        'text/plain': new Blob([linkData.linkText], { type: 'text/plain' })
      });
      
      navigator.clipboard.write([clipboardItem]).then(() => {
        toast.success("מלל הקישור הועתק ללוח");
      }).catch(() => {
        // Fallback to plain text
        navigator.clipboard.writeText(linkData.linkText);
        toast.success("מלל הכפתור הועתק ללוח");
      });
    } else {
      // Fallback for older browsers
      navigator.clipboard.writeText(linkData.linkText);
      toast.success("מלל הכפתור הועתק ללוח");
    }
  };

  // Copy as link only
  const copyAsLink = () => {
    if (!currentUrl) {
      toast.error("אנא יצור קישור תחילה");
      return;
    }
    
    navigator.clipboard.writeText(currentUrl);
    toast.success("קישור הועתק ללוח");
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
                    <h3 className="text-lg font-semibold text-foreground">מענה אוטומטי</h3>
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
                    ניתן לבחור עד 3 תבניות. כל תבנית ניתן לשייך לערוץ אחד או יותר (מייל, וואטסאפ, SMS). ערוץ שסומן בתבנית אחת לא יופיע בתבניות אחרות.
                  </p>
                </div>

                {/* Selected Templates Display */}
                {selectedTemplates.length > 0 && (
                  <div className="mb-6 space-y-3">
                    <Label className="text-sm font-semibold">תבניות שנבחרו ({selectedTemplates.length}/3)</Label>
                    <div className="space-y-3">
                      {selectedTemplates.map((template, index) => {
                        const templateData = templates.find(t => t.id === template.id);
                        const availableChannels = getAvailableChannels(index);
                        
                        return (
                          <div key={index} className="bg-muted/30 border border-border rounded-lg p-4">
                            {/* Template Name and Remove Button */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-foreground">{templateData?.name}</span>
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
                            
                            {/* Channel Selection */}
                            <div className="space-y-2">
                              <Label className="text-xs text-muted-foreground">ערוצי שליחה</Label>
                              <div className="flex gap-2 flex-wrap">
                                {/* Email */}
                                <div 
                                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                                    template.channels.includes('email')
                                      ? 'bg-blue-500 border-blue-600 text-white'
                                      : availableChannels.includes('email')
                                      ? 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100'
                                      : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                                  }`}
                                  onClick={() => {
                                    if (availableChannels.includes('email') || template.channels.includes('email')) {
                                      toggleChannelForTemplate(index, 'email');
                                    }
                                  }}
                                >
                                  <Checkbox 
                                    checked={template.channels.includes('email')}
                                    disabled={!availableChannels.includes('email') && !template.channels.includes('email')}
                                    className="pointer-events-none"
                                  />
                                  <Mail className="h-4 w-4" />
                                  <span className="text-sm font-medium">מייל</span>
                                </div>

                                {/* WhatsApp */}
                                <div 
                                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                                    template.channels.includes('whatsapp')
                                      ? 'bg-green-500 border-green-600 text-white'
                                      : availableChannels.includes('whatsapp')
                                      ? 'bg-green-50 border-green-200 text-green-800 hover:bg-green-100'
                                      : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                                  }`}
                                  onClick={() => {
                                    if (availableChannels.includes('whatsapp') || template.channels.includes('whatsapp')) {
                                      toggleChannelForTemplate(index, 'whatsapp');
                                    }
                                  }}
                                >
                                  <Checkbox 
                                    checked={template.channels.includes('whatsapp')}
                                    disabled={!availableChannels.includes('whatsapp') && !template.channels.includes('whatsapp')}
                                    className="pointer-events-none"
                                  />
                                  <MessageCircle className="h-4 w-4" />
                                  <span className="text-sm font-medium">וואטסאפ</span>
                                </div>

                                {/* SMS */}
                                <div 
                                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                                    template.channels.includes('sms')
                                      ? 'bg-purple-500 border-purple-600 text-white'
                                      : availableChannels.includes('sms')
                                      ? 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100'
                                      : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                                  }`}
                                  onClick={() => {
                                    if (availableChannels.includes('sms') || template.channels.includes('sms')) {
                                      toggleChannelForTemplate(index, 'sms');
                                    }
                                  }}
                                >
                                  <Checkbox 
                                    checked={template.channels.includes('sms')}
                                    disabled={!availableChannels.includes('sms') && !template.channels.includes('sms')}
                                    className="pointer-events-none"
                                  />
                                  <Smartphone className="h-4 w-4" />
                                  <span className="text-sm font-medium">SMS</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Add Template - only if less than 3 and has available channels */}
                {selectedTemplates.length < 3 && getUsedChannels().length < 3 && (
                  <div className="space-y-4">
                    <Label className="text-sm font-semibold">הוסף תבנית ({selectedTemplates.length}/3)</Label>
                    
                    {/* Template Selection */}
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm mb-2 block">בחר תבנית מענה</Label>
                        <Select 
                          disabled={!selectedSurveyId}
                          onValueChange={(templateId) => {
                            addTemplate(templateId);
                          }}
                        >
                          <SelectTrigger className="bg-background border-border">
                            <SelectValue placeholder={selectedSurveyId ? "בחר תבנית מענה" : "יש לבחור שאלון תחילה"} />
                          </SelectTrigger>
                          <SelectContent className="bg-popover z-50 border-border">
                            {templates.map(template => {
                              const alreadySelected = selectedTemplates.some(t => t.id === template.id);
                              return (
                                <SelectItem 
                                  key={template.id} 
                                  value={template.id}
                                  disabled={alreadySelected}
                                >
                                  {template.name}
                                  {alreadySelected && " (כבר נבחרה)"}
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
                
                {/* Message when all channels are used */}
                {selectedTemplates.length > 0 && getUsedChannels().length === 3 && selectedTemplates.length < 3 && (
                  <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-orange-800 text-right">
                      ⚠️ כל הערוצים בשימוש. מחק ערוץ או תבנית כדי להוסיף תבנית נוספת.
                    </p>
                  </div>
                )}

                {selectedTemplates.length > 0 && selectedSurveyId && (
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm text-foreground text-right">
                      ✓ מענה אוטומטי מופעל עבור {selectedTemplates.length} תבניות
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground text-right space-y-1">
                      {selectedTemplates.map((t, idx) => {
                        const templateData = templates.find(temp => temp.id === t.id);
                        if (t.channels.length === 0) return null;
                        return (
                          <p key={idx}>
                            • {templateData?.name}: {t.channels.map(ch => 
                              ch === 'email' ? 'מייל' : ch === 'whatsapp' ? 'וואטסאפ' : 'SMS'
                            ).join(", ")}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Links Section */}
              <div className="mb-6">
                <QuickLinks currentUrl={currentUrl} onBuild={handleBuildLink} onCopy={handleCopyUrl} onPreview={handlePreviewLink} disabled={!selectedSurveyId} />
              </div>

              {/* Custom Link Form */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100 to-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
                  
                  <div className="relative space-y-8">
                    {/* Input Section */}
                    <div className="space-y-6">
                      {/* Link and Text Input - Combined */}
                      {currentUrl && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Link Display */}
                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-gray-700 text-right block">
                                הקישור
                              </Label>
                              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                  <div className="flex-shrink-0">
                                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-mono text-gray-700 truncate" dir="ltr">
                                      {currentUrl}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => navigator.clipboard.writeText(currentUrl)}
                                    className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors duration-200"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Text Input */}
                            <div className="space-y-2">
                              <Label htmlFor="linkText" className="text-sm font-medium text-gray-700 text-right block">
                                מלל הקישור
                              </Label>
                              <Input
                                id="linkText"
                                value={linkData.linkText}
                                onChange={(e) => setLinkData({...linkData, linkText: e.target.value})}
                                className="text-right w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                placeholder='הזן את המלל שלך כאן...'
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Message when no link is created */}
                      {!currentUrl && (
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">צור קישור תחילה</h3>
                          <p className="text-sm text-gray-500 mb-4">על מנת להוסיף מלל לקישור, יש ליצור קישור תחילה באמצעות הכפתורים למעלה</p>
                        </div>
                      )}
                      
                      {/* Hidden text area for link content */}
                      <div className="hidden">
                        <Label htmlFor="linkContent" className="text-right">תוכן הקישור</Label>
                        <Input
                          id="linkContent"
                          value={linkData.linkText}
                          readOnly
                          className="text-right mt-2"
                        />
                      </div>
                    </div>
                    
                    {/* Action Buttons - Only show when link exists */}
                    {currentUrl && (
                      <div className="flex flex-wrap gap-4 justify-center">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowLinkForm(false)}
                          className="px-8 py-3 border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium rounded-xl"
                        >
                          ביטול
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={copyAsButton} 
                          disabled={!linkData.linkText.trim()}
                          className="px-8 py-3 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 font-medium rounded-xl"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          כפתור HTML
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={copyAsText} 
                          disabled={!linkData.linkText.trim()}
                          className="px-8 py-3 border-2 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 font-medium rounded-xl"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                          מלל עם קישור
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={copyAsLink} 
                          className="px-8 py-3 border-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 font-medium rounded-xl"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          רק קישור
                        </Button>
                        <Button 
                          onClick={handleAddLink}
                          className="px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 shadow-xl hover:shadow-2xl font-semibold rounded-xl transform hover:scale-105"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          הוסף כפתור
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Saved Links Section */}
              {savedLinks.length > 0 && (
                <div className="mb-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 text-right">קישורים שמורים</h3>
                      <p className="text-sm text-gray-500 text-right mt-1">הקישורים שלך עם המלל המותאם אישית</p>
                    </div>
                    
                    <div className="space-y-3">
                      {savedLinks.map((link) => (
                        <div key={link.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-gray-700">
                                {link.type === 'form' ? 'טופס' : link.type === 'chat' ? 'צ\'אט' : 'QR'}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(link.createdAt).toLocaleDateString('he-IL')}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleLoadSavedLink(link)}
                                className="px-3 py-1 text-xs"
                              >
                                טען
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteSavedLink(link.id)}
                                className="px-3 py-1 text-xs text-red-600 hover:text-red-700"
                              >
                                מחק
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">קישור:</p>
                              <p className="text-sm font-mono text-gray-700 truncate" dir="ltr">{link.url}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">מלל:</p>
                              <p className="text-sm text-gray-700">{link.linkText}</p>
                            </div>
                          </div>
                          
                          {/* Copy action buttons */}
                          <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copySavedLinkAsButton(link)}
                              className="px-3 py-1 text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
                            >
                              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              כפתור HTML
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copySavedLinkAsText(link)}
                              className="px-3 py-1 text-xs border-green-200 text-green-600 hover:bg-green-50"
                            >
                              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                              </svg>
                              מלל עם קישור
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copySavedLinkAsLink(link)}
                              className="px-3 py-1 text-xs border-purple-200 text-purple-600 hover:bg-purple-50"
                            >
                              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                              רק קישור
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Guide Section */}
              <div className="mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 text-right">העתקת קישור לרשתות השונות</h3>
                    <p className="text-sm text-gray-500 text-right mt-1">לאתר, לווראטאפ ולדפי נחיתה - כל רשת עם החוקים שלה</p>
                    <Button 
                      onClick={() => window.open('/guide', '_blank')}
                      className="mt-3 px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      📊 הצג מדריך מפורט
                    </Button>
                  </div>
                  
                  {/* Quick Summary */}
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 text-right leading-relaxed">
                      <strong>💡 סיכום מהיר:</strong><br/>
                      • <strong>מלל עם קישור:</strong> WhatsApp, Telegram, Email, Facebook רגיל<br/>
                      • <strong>רק קישור:</strong> Twitter, LinkedIn, SMS, YouTube, TikTok Bio<br/>
                      • <strong>כפתור HTML:</strong> אתרים, דפי נחיתה, מודעות ממומנות
                    </p>
                  </div>
                </div>
              </div>

            </div>

      </div>
    </MainLayout>;
};
export default Distribution;