
import MainLayout from "@/components/layout/MainLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Calendar, MessageSquare, Users, BarChart3, Edit, Copy, Share2, FileInput, QrCode, Facebook, MessagesSquare, ExternalLink, Instagram, Linkedin, Globe, Mail, Bot, Link as LinkIcon } from "lucide-react";
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

  return (
    <MainLayout initialState="articles">
      <div className="bg-background rounded-lg shadow-sm p-3 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
          <img src={questionnairesIcon} alt="שאלונים" className="h-6 w-6 md:h-8 md:w-8 ml-2" />
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
              {questionnaires.map((q) => (
                <Card key={q.id} className="border shadow-md hover:shadow-lg transition-all">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      {/* Right side: Status badge + Title */}
                      <div className="flex items-center gap-4 flex-1">
                        {/* Status Badge */}
                        <div className={`px-4 py-2 rounded-full text-sm font-medium ${q.status === 'active' ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          {q.status === 'active' ? 'פעיל' : 'כבוי'}
                        </div>

                        {/* Title */}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground">{q.title}</h3>
                        </div>
                      </div>

                      {/* Center: Stats in a row */}
                      <div className="flex items-center gap-4 md:gap-6 text-sm">
                        <div className="text-center">
                          <span className="text-muted-foreground">לידים ({q.leads.total})</span>
                        </div>
                        <div className="text-center">
                          <span className="text-muted-foreground">תגובות ({q.responses.total})</span>
                        </div>
                        <div className="text-center">
                          <span className="text-muted-foreground">חדשים ({q.leads.new})</span>
                        </div>
                      </div>

                      {/* Right side: Date */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{q.createdAt}</span>
                      </div>
                    </div>

                    {/* Additional Details - Sources, Partners, Automations */}
                    <div className="mt-4 pt-4 border-t space-y-3">
                      {/* Sources */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-medium text-muted-foreground min-w-[80px]">מקורות לידים:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {q.sources.length > 0 ? (
                            q.sources.map((s, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded-full bg-muted text-xs border">
                                {s.name} · {s.total} ({s.new} חדשים)
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-muted-foreground">אין מקורות</span>
                          )}
                        </div>
                      </div>

                      {/* Partners */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-medium text-muted-foreground min-w-[80px]">שותפים:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {q.partners.length > 0 ? (
                            q.partners.map((p, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded-full bg-primary/10 text-xs border border-primary/20">
                                {p.name} · {p.total} ({p.new} חדשים)
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-muted-foreground">אין שותפים</span>
                          )}
                        </div>
                      </div>

                      {/* Automations */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-medium text-muted-foreground min-w-[80px]">אוטומציות:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {q.automations.length > 0 ? (
                            q.automations.map((a, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded-full bg-accent text-xs border">
                                {a.type}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-muted-foreground">אין אוטומציות</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex-col h-auto py-2 px-1 gap-1"
                        title="עריכה"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="text-xs">עריכה</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex-col h-auto py-2 px-1 gap-1"
                        title="שכפול"
                      >
                        <Copy className="h-4 w-4" />
                        <span className="text-xs">שכפול</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex-col h-auto py-2 px-1 gap-1"
                        title="נתונים"
                      >
                        <BarChart3 className="h-4 w-4" />
                        <span className="text-xs">נתונים</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex-col h-auto py-2 px-1 gap-1"
                        title="הפצה"
                      >
                        <Share2 className="h-4 w-4" />
                        <span className="text-xs">הפצה</span>
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
