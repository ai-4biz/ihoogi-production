import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Sparkles, Users, MessageSquare, FileText, Link as LinkIcon, Upload, Eye, ArrowRight } from "lucide-react";
import { useState } from "react";
import QuestionBuilder, { Question } from "@/components/questionnaire/QuestionBuilder";
import FormPreview from "@/components/questionnaire/FormPreview";
import ChatPreview from "@/components/questionnaire/ChatPreview";
import { toast } from "sonner";

const CreateQuestionnaire = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [previewMode, setPreviewMode] = useState<'none' | 'form' | 'chat'>('none');
  const [logoFile, setLogoFile] = useState<string>("");
  const [profileFile, setProfileFile] = useState<string>("");

  // Mock data from user profile
  const businessName = "gil.arbisman";
  const subCategory = "יעוץ עסקי";
  const logoUrl = "/hoogi-new-avatar.png";

  const handleSaveQuestions = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
    setIsBuilderOpen(false);
    toast.success("השאלון נשמר בהצלחה!");
  };

  const createExampleQuestionnaire = () => {
    const exampleQuestions: Question[] = [
      {
        id: "1",
        order: 1,
        title: "מה שמך המלא?",
        type: "text",
        required: true,
        placeholder: "הכנס את שמך..."
      },
      {
        id: "2",
        order: 2,
        title: "מהי כתובת האימייל שלך?",
        type: "email",
        required: true,
        placeholder: "example@email.com"
      },
      {
        id: "3",
        order: 3,
        title: "מה מספר הטלפון שלך?",
        type: "phone",
        required: true,
        placeholder: "050-1234567"
      },
      {
        id: "4",
        order: 4,
        title: "איזה שירות מעניין אותך?",
        type: "single-choice",
        required: true,
        options: ["ייעוץ עסקי", "שיווק דיגיטלי", "פיתוח אתרים", "אחר"]
      },
      {
        id: "5",
        order: 5,
        title: "אילו ערוצי תקשורת אתה משתמש?",
        type: "multiple-choice",
        required: false,
        options: ["WhatsApp", "Email", "SMS", "טלפון"]
      },
      {
        id: "6",
        order: 6,
        title: "איך היית מדרג את השירות?",
        type: "rating",
        required: true,
        minRating: 1,
        maxRating: 5
      },
      {
        id: "7",
        order: 7,
        title: "מתי תרצה לקבוע פגישה?",
        type: "date",
        required: false
      },
      {
        id: "8",
        order: 8,
        title: "ספר לנו עוד על הצרכים שלך",
        type: "text",
        required: false,
        placeholder: "כתוב כאן..."
      },
      {
        id: "9",
        order: 9,
        title: "העלה קובץ רלוונטי (אופציונלי)",
        type: "file-upload",
        required: false
      },
      {
        id: "10",
        order: 10,
        title: "הקלט הודעה קולית",
        type: "voice",
        required: false
      }
    ];
    
    setQuestions(exampleQuestions);
    setTitle("שאלון לדוגמה - כל סוגי השאלות");
    setDescription("שאלון זה מכיל דוגמאות לכל סוגי השאלות האפשריים");
    toast.success("נוצרה דוגמה עם כל סוגי השאלות!");
  };

  // Show preview if mode is active
  if (previewMode === 'form') {
    return (
      <MainLayout initialState="content">
        <div className="flex flex-col w-full min-h-screen bg-background p-4 md:p-8">
          <Button
            onClick={() => setPreviewMode('none')}
            className="mb-4 self-start"
            variant="outline"
          >
            חזור לעריכה
          </Button>
          <FormPreview
            questions={questions}
            formTitle={title || "שאלון לדוגמה"}
            formDescription={description}
            logoUrl={logoFile || logoUrl}
            profileImageUrl={profileFile}
          />
        </div>
      </MainLayout>
    );
  }

  if (previewMode === 'chat') {
    return (
      <MainLayout initialState="content">
        <div className="flex flex-col w-full min-h-screen bg-background p-4 md:p-8">
          <Button
            onClick={() => setPreviewMode('none')}
            className="mb-4 self-start"
            variant="outline"
          >
            חזור לעריכה
          </Button>
          <ChatPreview
            questions={questions}
            formTitle={title || "שאלון לדוגמה"}
            logoUrl={logoFile || logoUrl}
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout initialState="content">
      <div className="flex flex-col w-full min-h-screen bg-background p-4 md:p-8" dir="rtl">
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

        {/* Header with business name and logo */}
        <div className="mb-6 flex items-center gap-3 bg-card rounded-xl p-4 shadow-sm border border-border">
          <img
            src={logoUrl}
            alt="Logo"
            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
          />
          <div className="text-right">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              {businessName}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">{subCategory}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full">
          {/* Top section with two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
            {/* Left column - Main form */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Action buttons row - including view mode icons */}
              <div className="flex flex-wrap gap-2 md:gap-3 justify-start items-center">
                <Button 
                  className="bg-secondary hover:bg-secondary/90 text-white shadow-md"
                  onClick={createExampleQuestionnaire}
                >
                  <Sparkles className="ml-2 h-4 w-4" />
                  דוגמה - כל סוגי השאלות
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white shadow-md"
                  onClick={() => setIsBuilderOpen(true)}
                >
                  <Plus className="ml-2 h-4 w-4" />
                  הוסף שאלה
                </Button>
                
                {/* View mode icons */}
                <div className="flex gap-2 mr-auto">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 md:h-9 md:w-9"
                    onClick={() => questions.length > 0 ? setPreviewMode('chat') : toast.error("הוסף שאלות קודם")}
                    title="תצוגת צ'אט"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 md:h-9 md:w-9"
                    onClick={() => questions.length > 0 ? setPreviewMode('form') : toast.error("הוסף שאלות קודם")}
                    title="תצוגת טופס"
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                  {questions.length > 0 && (
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewMode('form')}
                      className="hidden md:flex"
                    >
                      <Eye className="ml-2 h-4 w-4" />
                      תצוגה מקדימה
                    </Button>
                  )}
                </div>
              </div>

              {/* Title input */}
              <div className="bg-card rounded-xl p-4 md:p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">כותרת השאלון</h3>
                <Input
                  placeholder="הקלד כותרת..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-base"
                />
              </div>

              {/* Description input */}
              <div className="bg-card rounded-xl p-4 md:p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-foreground">תיאור השאלון</h3>
                <Textarea
                  placeholder="כתוב מילים שמסבירות בצורה כללית את השאלון..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] md:min-h-[150px] text-base"
                />
              </div>

              {/* Upload section */}
              <div className="bg-card rounded-xl p-4 md:p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-foreground">קובץ או קישור</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">קישור</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="הדבק קישור..."
                        className="flex-1"
                      />
                      <Button variant="outline" size="icon" className="bg-primary/10 hover:bg-primary/20 border-primary/30">
                        <LinkIcon className="h-5 w-5 text-primary" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">העלאת לוגו (לתצוגה מקדימה)</label>
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        className="flex-1"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setLogoFile(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <Button variant="outline" size="icon" className="bg-accent/10 hover:bg-accent/20 border-accent/30">
                        <Upload className="h-5 w-5 text-accent" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-foreground">תמונת פרופיל (אופציונלי)</label>
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        className="flex-1"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setProfileFile(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <Button variant="outline" size="icon" className="bg-primary/10 hover:bg-primary/20 border-primary/30">
                        <Upload className="h-5 w-5 text-primary" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Sidebar */}
            <div className="space-y-4 md:space-y-6">
              {/* בניית שאלות card */}
              <div 
                className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 md:p-6 shadow-sm border border-primary/20 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setIsBuilderOpen(true)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-foreground">בניית שאלות</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  יצירה ועריכה של שאלות
                </p>
                {questions.length > 0 && (
                  <p className="text-xs text-primary font-medium">
                    {questions.length} שאלות נוספו
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Save button at bottom - centered */}
          <div className="flex justify-center mt-8 mb-4">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white shadow-lg px-12 py-6 text-lg font-semibold rounded-xl"
              size="lg"
            >
              שמירה
            </Button>
          </div>
        </div>

        {/* Question Builder Dialog */}
        <Dialog open={isBuilderOpen} onOpenChange={setIsBuilderOpen}>
          <DialogContent className="max-w-4xl bg-background">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">בניית שאלון</DialogTitle>
            </DialogHeader>
            <QuestionBuilder 
              onSave={handleSaveQuestions}
              onCancel={() => setIsBuilderOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default CreateQuestionnaire;
