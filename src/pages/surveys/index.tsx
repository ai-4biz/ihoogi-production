import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, MessageSquare, Users, TrendingUp, Clock, Edit, Copy, BarChart3, Share2, Calendar, Eye, FileText, MessageCircle, Facebook, Instagram, Linkedin, Globe, Smartphone, Mail, Zap, Bot } from "lucide-react";
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
      templateName: "תבנית מענה סטנדרטית",
      templateSentCount: 12,
      sources: [
        { name: "פייסבוק", total: 15, new: 5, icon: Facebook, color: "bg-blue-500" },
        { name: "אינסטגרם", total: 12, new: 4, icon: Instagram, color: "bg-pink-500" },
        { name: "לינקדאין", total: 8, new: 2, icon: Linkedin, color: "bg-blue-600" },
        { name: "אתר", total: 6, new: 1, icon: Globe, color: "bg-green-500" },
        { name: "ווטסאפ", total: 4, new: 0, icon: Smartphone, color: "bg-green-600" },
      ],
      partners: [
        { name: "דני כהן", total: 15, new: 6 },
        { name: "יעל לוי", total: 10, new: 4 },
        { name: "רון אבני", total: 7, new: 2 },
      ],
      automations: [
        { name: "מייל AI", icon: Mail, color: "bg-orange-500" },
        { name: "ווטסאפ", icon: Smartphone, color: "bg-green-600" },
      ],
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
      templateName: "מענה AI מותאם",
      templateSentCount: 28,
      sources: [
        { name: "פייסבוק", total: 20, new: 8, icon: Facebook, color: "bg-blue-500" },
        { name: "אינסטגרם", total: 15, new: 6, icon: Instagram, color: "bg-pink-500" },
        { name: "לינקדאין", total: 12, new: 4, icon: Linkedin, color: "bg-blue-600" },
        { name: "אתר", total: 8, new: 2, icon: Globe, color: "bg-green-500" },
        { name: "ווטסאפ", total: 5, new: 1, icon: Smartphone, color: "bg-green-600" },
      ],
      partners: [
        { name: "שרה גולד", total: 18, new: 8 },
        { name: "מיכאל רוזן", total: 12, new: 5 },
        { name: "נועה כהן", total: 9, new: 3 },
      ],
      automations: [
        { name: "מייל AI", icon: Mail, color: "bg-orange-500" },
        { name: "ווטסאפ", icon: Smartphone, color: "bg-green-600" },
        { name: "בוט צ'אט", icon: Bot, color: "bg-purple-500" },
      ],
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

  const totalResponses = questionnaires.reduce((sum, q) => sum + q.responsesThisMonth, 0);
  const totalLeads = questionnaires.reduce((sum, q) => sum + q.leadsThisMonth, 0);
  const totalNewLeads = questionnaires.reduce((sum, q) => sum + q.newLeads, 0);
  const totalNewResponses = questionnaires.reduce((sum, q) => sum + q.newResponses, 0);

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
            <Card className="border shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-blue-700 mb-1">תגובות חדשות</div>
                <div className="text-3xl font-bold text-blue-900">{totalNewResponses}</div>
                <div className="text-xs text-blue-600 mt-1">מתוך {totalResponses} בסך הכל</div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-green-700 mb-1">לידים חדשים</div>
                <div className="text-3xl font-bold text-green-900">{totalNewLeads}</div>
                <div className="text-xs text-green-600 mt-1">מתוך {totalLeads} בסך הכל</div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-purple-700 mb-1">שיעור המרה</div>
                <div className="text-3xl font-bold text-purple-900">12%</div>
                <div className="text-xs text-purple-600 mt-1">מהשבוע שעבר</div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="text-sm text-orange-700 mb-1">אוטומציות פעילות</div>
                <div className="text-3xl font-bold text-orange-900">{questionnaires.reduce((sum, q) => sum + q.automations.length, 0)}</div>
                <div className="text-xs text-orange-600 mt-1">בכל השאלונים</div>
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
              <div className="grid grid-cols-1 gap-8">
                {questionnaires.map((q) => (
                  <Card key={q.id} className="border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
                    <CardContent className="p-8 space-y-6">
                      {/* Header with Toggle and Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Switch 
                            checked={q.active}
                            onCheckedChange={() => toggleActive(q.id)}
                            className="data-[state=checked]:bg-cyan-500 scale-110"
                          />
                          <Badge variant={q.active ? "default" : "secondary"} className="px-3 py-1">
                            {q.active ? '🟢 פעיל' : '⚫ כבוי'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{q.date}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-foreground leading-tight">{q.title}</h3>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-green-600" />
                            <span className="text-green-700 font-medium">חדשים ({q.newLeads})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                            <span className="text-blue-700 font-medium">תגובות ({q.responsesThisMonth})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-purple-600" />
                            <span className="text-purple-700 font-medium">לידים ({q.leadsThisMonth})</span>
                          </div>
                        </div>
                      </div>

                      {/* Template Info */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700">תבנית מענה:</h4>
                        <div 
                          className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 hover:border-cyan-300 transition-colors cursor-pointer"
                          onClick={() => navigate('/create-template')}
                        >
                          <FileText className="h-5 w-5 text-cyan-600" />
                          <div className="flex-1">
                            <div className="font-medium text-cyan-900">{q.templateName}</div>
                            <div className="text-sm text-cyan-700">{q.templateSentCount} הודעות נשלחו</div>
                          </div>
                          <Edit className="h-4 w-4 text-cyan-600" />
                        </div>
                      </div>

                      {/* Sources */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700">מקורות לידים:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                          {q.sources.map((source, index) => {
                            const IconComponent = source.icon;
                            return (
                              <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                                <div className={`w-8 h-8 ${source.color} rounded-lg flex items-center justify-center`}>
                                  <IconComponent className="h-4 w-4 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs font-medium text-gray-900">{source.name}</div>
                                  <div className="text-xs text-gray-600">{source.total} ({source.new} חדשים)</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Partners */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700">שותפים:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {q.partners.map((partner, index) => (
                            <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">
                                  {partner.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium text-gray-900">{partner.name}</div>
                                <div className="text-xs text-gray-600">{partner.total} ({partner.new} חדשים)</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Automations */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700">אוטומציות:</h4>
                        <div className="flex flex-wrap gap-2">
                          {q.automations.map((automation, index) => {
                            const IconComponent = automation.icon;
                            return (
                              <Badge key={index} className={`${automation.color} text-white border-0 px-3 py-1 flex items-center gap-1`}>
                                <IconComponent className="h-3 w-3" />
                                {automation.name}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-5 gap-3 pt-4 border-t border-gray-200">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex-col h-auto py-3 px-2 gap-2 hover:bg-cyan-50 hover:text-cyan-700 transition-colors"
                          title={getViewMode(q.id) === 'form' ? 'הצג כטופס' : 'הצג כצ\'אט'}
                          onClick={() => toggleQuestionnaireView(q.id)}
                        >
                          {getViewMode(q.id) === 'form' ? (
                            <FileText className="h-5 w-5" />
                          ) : (
                            <MessageCircle className="h-5 w-5" />
                          )}
                          <span className="text-xs font-medium">{getViewMode(q.id) === 'form' ? 'טופס' : 'צ\'אט'}</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex-col h-auto py-3 px-2 gap-2 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          title="עריכה"
                        >
                          <Edit className="h-5 w-5" />
                          <span className="text-xs font-medium">עריכה</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex-col h-auto py-3 px-2 gap-2 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                          title="שכפול"
                        >
                          <Copy className="h-5 w-5" />
                          <span className="text-xs font-medium">שכפול</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex-col h-auto py-3 px-2 gap-2 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                          title="נתונים"
                        >
                          <BarChart3 className="h-5 w-5" />
                          <span className="text-xs font-medium">נתונים</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex-col h-auto py-3 px-2 gap-2 hover:bg-green-50 hover:text-green-700 transition-colors"
                          title="הפצה"
                        >
                          <Share2 className="h-5 w-5" />
                          <span className="text-xs font-medium">הפצה</span>
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
