import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageCircle, ArrowLeft, Eye, Users, Calendar } from "lucide-react";

interface QuestionnaireData {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  questions: Array<{
    id: number;
    text: string;
    type: 'text' | 'multiple-choice' | 'rating' | 'yes-no';
    options?: string[];
  }>;
}

const QuestionnaireView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<'form' | 'chat'>(searchParams.get('mode') as 'form' || 'form');
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireData | null>(null);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockQuestionnaire: QuestionnaireData = {
      id: parseInt(id || '1'),
      title: "שאלון שירותי ייעוץ עסקי",
      description: "שאלון זה נועד לאסוף מידע על הצרכים העסקיים שלכם",
      createdAt: "3.10.2025",
      questions: [
        {
          id: 1,
          text: "מהו תחום הפעילות העיקרי של העסק שלכם?",
          type: "multiple-choice",
          options: ["ייעוץ עסקי", "שיווק דיגיטלי", "פיתוח תוכנה", "אחר"]
        },
        {
          id: 2,
          text: "כמה עובדים יש לכם?",
          type: "multiple-choice",
          options: ["1-5", "6-20", "21-50", "51+"]
        },
        {
          id: 3,
          text: "איך תדרגו את רמת השירות שלנו?",
          type: "rating"
        },
        {
          id: 4,
          text: "האם תרצו לקבל עדכונים על השירותים שלנו?",
          type: "yes-no"
        },
        {
          id: 5,
          text: "הערות נוספות:",
          type: "text"
        }
      ]
    };
    
    setQuestionnaire(mockQuestionnaire);
  }, [id]);

  const renderFormView = () => (
    <div className="space-y-6">
      {questionnaire?.questions.map((question) => (
        <Card key={question.id} className="border shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">{question.text}</h3>
              
              {question.type === 'multiple-choice' && question.options && (
                <div className="space-y-2">
                  {question.options.map((option, index) => (
                    <label key={index} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name={`question-${question.id}`}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-foreground">{option}</span>
                    </label>
                  ))}
                </div>
              )}
              
              {question.type === 'rating' && (
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      className="w-10 h-10 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              )}
              
              {question.type === 'yes-no' && (
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name={`question-${question.id}`} className="w-4 h-4 text-primary" />
                    <span className="text-foreground">כן</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name={`question-${question.id}`} className="w-4 h-4 text-primary" />
                    <span className="text-foreground">לא</span>
                  </label>
                </div>
              )}
              
              {question.type === 'text' && (
                <textarea 
                  className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="הזינו את תשובתכם כאן..."
                />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="flex justify-center pt-6">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3">
          שליחת השאלון
        </Button>
      </div>
    </div>
  );

  const renderChatView = () => (
    <div className="space-y-4">
      {/* Chat Header */}
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">ה</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Hoogi Assistant</h3>
              <p className="text-sm text-muted-foreground">מסייע בשאלות ומידע</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {/* Bot Message */}
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground text-sm">ה</span>
          </div>
          <div className="bg-muted rounded-lg p-3 max-w-xs">
            <p className="text-foreground">שלום! אני כאן לעזור לך למלא את השאלון. בואי נתחיל עם השאלה הראשונה...</p>
          </div>
        </div>

        {/* User Message */}
        <div className="flex gap-3 justify-end">
          <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs">
            <p>שלום! אני מוכן למלא את השאלון</p>
          </div>
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-muted-foreground text-sm">א</span>
          </div>
        </div>

        {/* Bot Message */}
        <div className="flex gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground text-sm">ה</span>
          </div>
          <div className="bg-muted rounded-lg p-3 max-w-xs">
            <p className="text-foreground">מהו תחום הפעילות העיקרי של העסק שלכם?</p>
            <div className="mt-2 space-y-1">
              {["ייעוץ עסקי", "שיווק דיגיטלי", "פיתוח תוכנה", "אחר"].map((option, index) => (
                <button key={index} className="block w-full text-right p-2 hover:bg-background rounded transition-colors">
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="הקלד הודעה..."
          className="flex-1 p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          שליחה
        </Button>
      </div>
    </div>
  );

  if (!questionnaire) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">טוען שאלון...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.history.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                חזרה
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{questionnaire.title}</h1>
                <p className="text-muted-foreground">{questionnaire.description}</p>
              </div>
            </div>
            
            {/* Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={mode === 'form' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMode('form')}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                טופס
              </Button>
              <Button
                variant={mode === 'chat' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMode('chat')}
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                צ'אט
              </Button>
            </div>
          </div>
          
          {/* Questionnaire Info */}
          <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>נוצר: {questionnaire.createdAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>{questionnaire.questions.length} שאלות</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {mode === 'form' ? renderFormView() : renderChatView()}
      </div>
    </div>
  );
};

export default QuestionnaireView;
