import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Plus, MessageSquare, Users, TrendingUp, Clock, Edit, Copy, BarChart3, Share2, Calendar, Eye, FileText, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

const SurveysPage = () => {
  const navigate = useNavigate();
  
  // State for questionnaire view mode (form or chat)
  const [questionnaireViewMode, setQuestionnaireViewMode] = useState<{[key: string]: 'form' | 'chat'}>({});
  
  const [questionnaires, setQuestionnaires] = useState([
    {
      id: "q-1",
      title: "שאלון שביעות רצון לקוחות",
      date: "2025-09-18",
      active: false,
      newLeads: 3,
      leadsThisMonth: 20,
      newResponses: 2,
      responsesThisMonth: 15,
    },
    {
      id: "q-2", 
      title: "שאלון שירותי ייעוץ עסקי",
      date: "2025-10-03",
      active: true,
      newLeads: 12,
      leadsThisMonth: 32,
      newResponses: 7,
      responsesThisMonth: 45,
    },
  ]);

  const toggleActive = (id: string) => {
    setQuestionnaires(prev => 
      prev.map(q => q.id === id ? { ...q, active: !q.active } : q)
    );
  };

  const toggleQuestionnaireView = (id: string) => {
    setQuestionnaireViewMode(prev => ({
      ...prev,
      [id]: prev[id] === 'form' ? 'chat' : 'form'
    }));
  };

  const getViewMode = (id: string) => questionnaireViewMode[id] || 'form';

  const totalResponses = 3;
  const totalLeads = 0;

  return (
    <MainLayout initialState="content">
      <div className="min-h-screen bg-background p-4 md:p-8" dir="rtl">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">השאלונים שלי</h1>
              <p className="text-muted-foreground text-lg">נהל והפץ את השאלונים שלך</p>
            </div>
            <Button 
              onClick={() => navigate('/create-questionnaire')}
              size="lg"
              className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              <Plus className="h-5 w-5" />
              שאלון חדש
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border shadow-sm">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <div className="text-sm text-muted-foreground mb-1">תגובות</div>
                <div className="text-4xl font-bold text-foreground">{totalResponses}</div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="p-6 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <div className="text-sm text-muted-foreground mb-1">לידים</div>
                <div className="text-4xl font-bold text-foreground">{totalLeads}</div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <div className="text-sm text-muted-foreground mb-1">התרומה</div>
                <div className="text-4xl font-bold text-foreground">0</div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm">
              <CardContent className="p-6 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <div className="text-sm text-muted-foreground mb-1">בטיפול</div>
                <div className="text-4xl font-bold text-foreground">0</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="questionnaires" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="questionnaires">שאלונים</TabsTrigger>
              <TabsTrigger value="distribution">הפצה</TabsTrigger>
            </TabsList>

            <TabsContent value="questionnaires">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {questionnaires.map((q) => (
                  <Card key={q.id} className="border shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardContent className="p-6 space-y-4">
                      {/* Toggle and Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={q.active}
                            onCheckedChange={() => toggleActive(q.id)}
                            className="data-[state=checked]:bg-cyan-500"
                          />
                          <span className="text-xs font-medium text-muted-foreground">
                            {q.active ? 'פעיל' : 'כבוי'}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-foreground leading-tight">{q.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{q.date}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">לידים חדשים</div>
                          <div className="text-2xl font-bold text-foreground">
                            {q.newLeads}
                          </div>
                          <div className="text-xs text-muted-foreground">מתוך {q.leadsThisMonth}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">תגובות חדשות</div>
                          <div className="text-2xl font-bold text-foreground">
                            {q.newResponses}
                          </div>
                          <div className="text-xs text-muted-foreground">מתוך {q.responsesThisMonth}</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-5 gap-2 pt-2 border-t">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex-col h-auto py-2 px-1 gap-1"
                          title={getViewMode(q.id) === 'form' ? 'הצג כטופס' : 'הצג כצ\'אט'}
                          onClick={() => toggleQuestionnaireView(q.id)}
                        >
                          {getViewMode(q.id) === 'form' ? (
                            <FileText className="h-4 w-4" />
                          ) : (
                            <MessageCircle className="h-4 w-4" />
                          )}
                          <span className="text-xs">{getViewMode(q.id) === 'form' ? 'טופס' : 'צ\'אט'}</span>
                        </Button>
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
            </TabsContent>

            <TabsContent value="distribution">
              <Card className="border shadow-md">
                <CardContent className="p-12 text-center">
                  <Share2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">הפצת שאלונים</h3>
                  <p className="text-muted-foreground">בחר שאלון מהרשימה כדי להתחיל בהפצה</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default SurveysPage;
