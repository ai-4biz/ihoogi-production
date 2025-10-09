
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
      <div className="bg-gradient-to-br from-background to-muted/20 rounded-xl shadow-sm p-4 md:p-8" dir="rtl">
        {/* Back Button */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.history.back()}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            חזור
          </Button>
        </div>

        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl p-6 mb-8 border border-primary/20">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-end">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center ml-3 shadow-lg">
              <img src={questionnairesIcon} alt="שאלונים" className="h-6 w-6 brightness-0 invert" />
            </div>
            השאלונים שלי
          </h1>
          <p className="text-sm text-muted-foreground text-right mt-2">נהל, ערוך והפץ את השאלונים שלך במקום אחד</p>
        </div>
        
        <div className="space-y-4">
          {questionnaires.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>אין שאלונים עדיין</p>
            </div>
          ) : (
            <div className="space-y-5">
              {questionnaires.map((q) => (
                <Card key={q.id} className="border-2 border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-muted/10">
                  <CardContent className="p-5 md:p-7">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                      {/* Right side: Status badge + Title */}
                      <div className="flex items-center gap-4 flex-1">
                        {/* Status Badge with enhanced design */}
                        <div className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-md ${q.status === 'active' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700'}`}>
                          {q.status === 'active' ? '✓ פעיל' : '○ כבוי'}
                        </div>

                        {/* Title with icon */}
                        <div className="flex-1 text-right">
                          <h3 className="text-xl font-bold text-foreground flex items-center justify-end gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            {q.title}
                          </h3>
                        </div>
                      </div>

                      {/* Center: Stats in colorful boxes */}
                      <div className="flex items-center gap-3 text-sm">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-2 rounded-lg border border-blue-200">
                          <div className="text-center">
                            <p className="text-xs text-blue-600 font-medium mb-1">לידים</p>
                            <p className="text-lg font-bold text-blue-800">{q.leads.total}</p>
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 px-4 py-2 rounded-lg border border-green-200">
                          <div className="text-center">
                            <p className="text-xs text-green-600 font-medium mb-1">חדשים</p>
                            <p className="text-lg font-bold text-green-800">{q.leads.new}</p>
                          </div>
                        </div>
                      </div>

                      {/* Right side: Date with enhanced design */}
                      <div className="flex items-center gap-2 text-sm bg-muted/50 px-4 py-2 rounded-lg">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">{q.createdAt}</span>
                      </div>
                    </div>

                    {/* Information Section with enhanced design */}
                    <div className="mt-6 pt-5 border-t border-border/50">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* מקורות לידים - כחול עם shadow */}
                        <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 border-2 border-blue-300 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                              <Users className="h-4 w-4 text-white" />
                            </div>
                            <h4 className="font-bold text-blue-900 text-base">מקורות לידים</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {q.sources.length > 0 ? (
                              q.sources.slice(0, 3).map((s, idx) => (
                                <div key={idx} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-blue-200 shadow-sm">
                                  {getSourceIcon(s.name)}
                                  <span className="text-xs font-semibold text-blue-900">{s.name}</span>
                                  <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">{s.total}</span>
                                </div>
                              ))
                            ) : (
                              <span className="text-sm text-blue-600 italic">אין מקורות</span>
                            )}
                            {q.sources.length > 3 && (
                              <span className="px-3 py-1.5 rounded-lg bg-blue-200 text-blue-900 text-xs font-semibold">
                                +{q.sources.length - 3} נוספים
                              </span>
                            )}
                          </div>
                        </div>

                        {/* שותפים - סגול עם shadow */}
                        <div className="bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 border-2 border-purple-300 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                              <Users className="h-4 w-4 text-white" />
                            </div>
                            <h4 className="font-bold text-purple-900 text-base">שותפים</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {q.partners.length > 0 ? (
                              q.partners.slice(0, 3).map((p, idx) => (
                                <div key={idx} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-purple-200 shadow-sm">
                                  <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-white">{p.name.charAt(0)}</span>
                                  </div>
                                  <span className="text-xs font-semibold text-purple-900">{p.name}</span>
                                  <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">{p.total}</span>
                                </div>
                              ))
                            ) : (
                              <span className="text-sm text-purple-600 italic">אין שותפים</span>
                            )}
                            {q.partners.length > 3 && (
                              <span className="px-3 py-1.5 rounded-lg bg-purple-200 text-purple-900 text-xs font-semibold">
                                +{q.partners.length - 3} נוספים
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons with enhanced design */}
                    <div className="grid grid-cols-5 gap-2 mt-6 pt-5 border-t border-border/50">
                      {/* הצגת השאלון */}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-col h-auto py-4 px-3 gap-2 bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-300 hover:from-cyan-100 hover:to-cyan-200 hover:border-cyan-400 hover:shadow-lg text-cyan-800 transition-all duration-200"
                        title="הצג שאלון"
                        onClick={() => window.open(`/questionnaire-view/${q.id}?mode=form`, '_blank')}
                      >
                        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                          <Eye className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xs font-bold">הצגת שאלון</span>
                      </Button>
                      
                      {/* עריכה */}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-col h-auto py-4 px-3 gap-2 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 hover:from-blue-100 hover:to-blue-200 hover:border-blue-400 hover:shadow-lg text-blue-800 transition-all duration-200"
                        title="עריכה"
                        onClick={() => window.open(`/create-questionnaire?id=${q.id}&mode=edit`, '_blank')}
                      >
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                          <Edit className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xs font-bold">עריכה</span>
                      </Button>
                      
                      {/* הפצה */}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-col h-auto py-4 px-3 gap-2 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 hover:from-green-100 hover:to-green-200 hover:border-green-400 hover:shadow-lg text-green-800 transition-all duration-200"
                        title="הפצה"
                        onClick={() => window.open(`/distribution?id=${q.id}`, '_blank')}
                      >
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
                          <Share2 className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xs font-bold">הפצה</span>
                      </Button>
                      
                      {/* שכפול */}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-col h-auto py-4 px-3 gap-2 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 hover:from-orange-100 hover:to-orange-200 hover:border-orange-400 hover:shadow-lg text-orange-800 transition-all duration-200"
                        title="שכפול"
                        onClick={() => handleDuplicateQuestionnaire(q)}
                      >
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-md">
                          <Copy className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xs font-bold">שכפול</span>
                      </Button>
                      
                      {/* סטטיסטיקה */}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-col h-auto py-4 px-3 gap-2 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 hover:from-purple-100 hover:to-purple-200 hover:border-purple-400 hover:shadow-lg text-purple-800 transition-all duration-200"
                        title="סטטיסטיקה"
                        onClick={() => window.open(`/leads-responses?id=${q.id}&tab=analysis`, '_blank')}
                      >
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center shadow-md">
                          <BarChart3 className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xs font-bold">סטטיסטיקה</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ContentInspiration;
