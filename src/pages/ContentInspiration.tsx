
import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Calendar, MessageSquare, Users, BarChart3, Edit, Copy, Share2, FileInput, QrCode, Facebook, MessagesSquare, ExternalLink, Instagram, Linkedin, Globe, Mail, Bot, Link as LinkIcon, MessageCircle, Eye, ChevronDown, ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import questionnairesIcon from "@/assets/questionnaires-icon-new.png";

interface Questionnaire {
  id: number;
  title: string;
  status: "active" | "draft";
  createdAt: string;
  updatedAt: string;
  responses: {
    total: number;
    answers: number;
    cancellations: number;
  };
  leads: {
    total: number;
    new: number;
    cancellations: number;
  };
  sources: {
    name: string;
    total: number;
    new: number;
  }[];
  automations: {
    type: string;
    method: string;
  }[];
  partners: {
    name: string;
    total: number;
    new: number;
  }[];
}

const ContentInspiration = () => {
  // State for questionnaire view mode (form or chat)
  const [questionnaireViewMode, setQuestionnaireViewMode] = useState<{[key: string]: 'form' | 'chat'}>({});
  
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([
    {
      id: 1,
      title: "שאלון שירותי ייעוץ עסקי",
      status: "active",
      createdAt: "3.10.2025",
      updatedAt: "3.10.2025",
      responses: { total: 45, answers: 38, cancellations: 7 },
      leads: { total: 32, new: 12, cancellations: 3 },
      sources: [
        { name: "פייסבוק", total: 15, new: 5 },
        { name: "אינסטגרם", total: 12, new: 4 },
        { name: "לינקדאין", total: 8, new: 2 },
        { name: "אתר", total: 6, new: 1 },
        { name: "ווטסאפ", total: 4, new: 0 }
      ],
      automations: [
        { type: "מייל AI", method: "תשובה אוטומטית" },
        { type: "ווטסאפ", method: "תבנית מותאמת" }
      ],
      partners: [
        { name: "דני כהן", total: 15, new: 6 },
        { name: "יעל לוי", total: 10, new: 4 },
        { name: "רון אבני", total: 7, new: 2 }
      ]
    },
    {
      id: 2,
      title: "שאלון מוצרים דיגיטליים",
      status: "active",
      createdAt: "1.10.2025",
      updatedAt: "2.10.2025",
      responses: { total: 28, answers: 24, cancellations: 4 },
      leads: { total: 18, new: 6, cancellations: 2 },
      sources: [
        { name: "דף נחיתה", total: 10, new: 3 },
        { name: "אתר", total: 9, new: 2 },
        { name: "פייסבוק", total: 9, new: 1 }
      ],
      automations: [
        { type: "ווטסאפ", method: "תשובת AI" }
      ],
      partners: [
        { name: "מיכל גרין", total: 12, new: 4 },
        { name: "אורי שמש", total: 6, new: 2 }
      ]
    },
    {
      id: 3,
      title: "שאלון אירועים",
      status: "draft",
      createdAt: "2.10.2025",
      updatedAt: "2.10.2025",
      responses: { total: 0, answers: 0, cancellations: 0 },
      leads: { total: 0, new: 0, cancellations: 0 },
      sources: [],
      automations: [],
      partners: []
    }
  ]);

  const toggleActive = (id: number) => {
    setQuestionnaires(prev => prev.map(q => q.id === id ? { ...q, status: q.status === "active" ? "draft" : "active" } : q));
  };
  const getSourceIcon = (sourceName: string) => {
    switch (sourceName) {
      case "פייסבוק": return <Facebook className="h-4 w-4 text-blue-600" />;
      case "אינסטגרם": return <Instagram className="h-4 w-4 text-pink-600" />;
      case "לינקדאין": return <Linkedin className="h-4 w-4 text-blue-700" />;
      case "דף נחיתה": return <FileInput className="h-4 w-4 text-purple-600" />;
      case "ווטסאפ": return <MessagesSquare className="h-4 w-4 text-green-600" />;
      case "אתר": return <Globe className="h-4 w-4 text-gray-600" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const handleCopyLink = (type: string, questionnaireId: number) => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/questionnaire/${questionnaireId}/${type}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "הקישור הועתק",
      description: `הקישור ל${type} הועתק ללוח`,
    });
  };

  const handleView = (type: string, questionnaireId: number) => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/questionnaire/${questionnaireId}/${type}`;
    window.open(link, '_blank');
  };

  const toggleQuestionnaireView = (id: number) => {
    setQuestionnaireViewMode(prev => ({
      ...prev,
      [id.toString()]: prev[id.toString()] === 'form' ? 'chat' : 'form'
    }));
  };

  const getViewMode = (id: number) => questionnaireViewMode[id.toString()] || 'form';

  const handleDuplicateQuestionnaire = (questionnaire: Questionnaire) => {
    const newTitle = prompt(`הכנס כותרת חדשה לשאלון המשוכפל:\n(השאלון המקורי: "${questionnaire.title}")`, `${questionnaire.title} - עותק`);
    
    if (newTitle && newTitle.trim()) {
      const duplicatedQuestionnaire = {
        ...questionnaire,
        id: Date.now(), // Generate new ID
        title: newTitle.trim(),
        createdAt: new Date().toLocaleDateString('he-IL'),
        leads: { total: 0, new: 0 },
        responses: { total: 0 },
        sources: [],
        partners: [],
        automations: []
      };
      
      setQuestionnaires(prev => [duplicatedQuestionnaire, ...prev]);
      toast({
        title: "השאלון שוכפל בהצלחה!",
        description: `השאלון "${newTitle.trim()}" נוסף לרשימה.`,
      });
    }
  };

  return (
    <MainLayout initialState="articles">
      <div className="container mx-auto p-4 max-w-6xl" dir="rtl">
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

        <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-end">
          <img src={questionnairesIcon} alt="שאלונים" className="h-7 w-7 md:h-8 md:w-8 ml-3" />
          השאלונים שלי
        </h1>
        
        <div className="space-y-4">
          {questionnaires.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>אין שאלונים עדיין</p>
            </div>
          ) : (
            <div className="space-y-4">
              {questionnaires.map((q, index) => {
                const bgColors = [
                  'bg-blue-50/30',
                  'bg-purple-50/30',
                  'bg-green-50/30',
                  'bg-orange-50/30',
                  'bg-pink-50/30',
                ];
                const bgColor = bgColors[index % bgColors.length];
                
                return (
                <Card key={q.id} className={`border shadow-sm hover:shadow-md transition-shadow ${bgColor}`}>
                  <CardContent className="p-4 md:p-6">
                    
                    {/* חלק ראשון: כותרת השאלון */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        {/* Status Badge */}
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${q.status === 'active' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          {q.status === 'active' ? 'פעיל' : 'כבוי'}
                        </div>
                        
                        {/* Stats */}
                        <div className="flex gap-4">
                          <div className="text-center cursor-pointer" onClick={() => window.open(`/leads-responses?id=${q.id}&tab=leads&filter=all`, '_blank')}>
                            <div className="text-2xl font-bold text-primary">{q.leads.total}</div>
                            <div className="text-xs text-muted-foreground">לידים סה"כ</div>
                          </div>
                          <div className="text-center cursor-pointer" onClick={() => window.open(`/leads-responses?id=${q.id}&tab=leads&filter=new`, '_blank')}>
                            <div className="text-2xl font-bold text-green-600">{q.leads.new}</div>
                            <div className="text-xs text-muted-foreground">לידים חדשים</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Title */}
                      <div className="text-right">
                        <h3 className="font-semibold text-lg text-foreground mb-1">{q.title}</h3>
                        <p className="text-sm text-muted-foreground">נוצר ב-{q.createdAt}</p>
                      </div>
                    </div>

                    {/* חלק שני: כלי הפעולה */}
                    <div className="mb-6">
                      <div className="grid grid-cols-5 gap-2">
                        {/* הצגה */}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex-col h-auto py-3 px-2 gap-1.5 hover:bg-primary/10 transition-colors"
                          title="הצג שאלון"
                          onClick={() => window.open(`/questionnaire-view/${q.id}?mode=form`, '_blank')}
                        >
                          <Eye className="h-5 w-5 text-primary" />
                          <span className="text-xs font-medium">הצגה</span>
                        </Button>
                        
                        {/* הפצה */}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex-col h-auto py-3 px-2 gap-1.5 hover:bg-primary/10 transition-colors"
                          title="הפצה"
                          onClick={() => window.open(`/distribution?id=${q.id}`, '_blank')}
                        >
                          <Share2 className="h-5 w-5 text-primary" />
                          <span className="text-xs font-medium">הפצה</span>
                        </Button>
                        
                        {/* עריכה */}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex-col h-auto py-3 px-2 gap-1.5 hover:bg-muted transition-colors"
                          title="עריכה"
                          onClick={() => window.open(`/create-questionnaire?id=${q.id}&mode=edit`, '_blank')}
                        >
                          <Edit className="h-5 w-5 text-muted-foreground" />
                          <span className="text-xs font-medium">עריכה</span>
                        </Button>
                        
                        {/* שכפול */}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex-col h-auto py-3 px-2 gap-1.5 hover:bg-muted transition-colors"
                          title="שכפול"
                          onClick={() => handleDuplicateQuestionnaire(q)}
                        >
                          <Copy className="h-5 w-5 text-muted-foreground" />
                          <span className="text-xs font-medium">שכפול</span>
                        </Button>
                        
                        {/* נתונים */}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex-col h-auto py-3 px-2 gap-1.5 hover:bg-primary/10 transition-colors"
                          title="נתונים"
                          onClick={() => window.open(`/leads-responses?id=${q.id}&tab=analysis`, '_blank')}
                        >
                          <BarChart3 className="h-5 w-5 text-primary" />
                          <span className="text-xs font-medium">נתונים</span>
                        </Button>
                      </div>
                    </div>

                    {/* חלק שלישי: נתונים - מקורות לידים ושותפים */}
                    <div className="pt-4 border-t">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                        {/* מקורות לידים */}
                        <div className="bg-muted/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              <h4 className="font-semibold text-sm">מקורות לידים</h4>
                            </div>
                            <div className="flex gap-2 text-xs">
                              <span 
                                className="cursor-pointer text-primary hover:underline"
                                onClick={() => window.open(`/leads-responses?id=${q.id}&tab=leads&filter=source&source=all`, '_blank')}
                              >
                                {q.sources.reduce((sum, source) => sum + (source.total || 0), 0)} סה"כ
                              </span>
                              <span className="text-muted-foreground">/</span>
                              <span 
                                className="cursor-pointer text-green-600 hover:underline"
                                onClick={() => window.open(`/leads-responses?id=${q.id}&tab=leads&filter=source&source=new`, '_blank')}
                              >
                                {q.sources.reduce((sum, source) => sum + (source.new || 0), 0)} חדשים
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {q.sources.length > 0 ? (
                              q.sources.map((source, index) => {
                                // צבעים מייצגים לרשתות חברתיות
                                const getSourceColor = (sourceName: string) => {
                                  switch (sourceName.toLowerCase()) {
                                    case 'פייסבוק':
                                    case 'facebook':
                                      return 'bg-blue-100 text-blue-800 border-blue-200';
                                    case 'אינסטגרם':
                                    case 'instagram':
                                      return 'bg-pink-100 text-pink-800 border-pink-200';
                                    case 'לינקדאין':
                                    case 'linkedin':
                                      return 'bg-blue-100 text-blue-900 border-blue-300';
                                    case 'ווטסאפ':
                                    case 'whatsapp':
                                      return 'bg-green-100 text-green-800 border-green-200';
                                    case 'אתר':
                                    case 'website':
                                      return 'bg-purple-100 text-purple-800 border-purple-200';
                                    case 'טיקטוק':
                                    case 'tiktok':
                                      return 'bg-black text-white border-gray-800';
                                    case 'טוויטר':
                                    case 'twitter':
                                      return 'bg-sky-100 text-sky-800 border-sky-200';
                                    default:
                                      return 'bg-gray-100 text-gray-800 border-gray-200';
                                  }
                                };

                                return (
                                  <div 
                                    key={index} 
                                    className={`px-2 py-1 rounded text-xs border ${getSourceColor(source.name)} flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity`}
                                    onClick={() => window.open(`/leads-responses?id=${q.id}&tab=leads&filter=source&source=${encodeURIComponent(source.name)}`, '_blank')}
                                  >
                                    <span>{source.name}</span>
                                    <span className="text-xs opacity-75">
                                      ({source.total || 0} / {source.new || 0})
                                    </span>
                                  </div>
                                );
                              })
                            ) : (
                              <span className="text-muted-foreground text-xs">אין מקורות</span>
                            )}
                          </div>
                        </div>

                        {/* שותפים */}
                        <div className="bg-muted/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              <h4 className="font-semibold text-sm">שותפים</h4>
                            </div>
                            <div className="flex gap-2 text-xs">
                              <span 
                                className="cursor-pointer text-primary hover:underline"
                                onClick={() => window.open(`/leads-responses?id=${q.id}&tab=leads&filter=partner&partner=all`, '_blank')}
                              >
                                {q.partners.reduce((sum, partner) => sum + (partner.total || 0), 0)} סה"כ
                              </span>
                              <span className="text-muted-foreground">/</span>
                              <span 
                                className="cursor-pointer text-green-600 hover:underline"
                                onClick={() => window.open(`/leads-responses?id=${q.id}&tab=leads&filter=partner&partner=new`, '_blank')}
                              >
                                {q.partners.reduce((sum, partner) => sum + (partner.new || 0), 0)} חדשים
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {q.partners.length > 0 ? (
                              q.partners.map((partner, index) => (
                                <div 
                                  key={index} 
                                  className="bg-secondary/10 text-secondary px-2 py-1 rounded text-xs flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
                                  onClick={() => window.open(`/leads-responses?id=${q.id}&tab=leads&filter=partner&partner=${encodeURIComponent(partner.name)}`, '_blank')}
                                >
                                  <span>{partner.name}</span>
                                  <span className="text-xs opacity-75">
                                    ({partner.total || 0} / {partner.new || 0})
                                  </span>
                                </div>
                              ))
                            ) : (
                              <span className="text-muted-foreground text-xs">אין שותפים</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
              })}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ContentInspiration;
