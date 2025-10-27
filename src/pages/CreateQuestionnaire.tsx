import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, Sparkles, Users, MessageSquare, FileText, Link as LinkIcon, Upload, Eye, ArrowRight, AlertCircle, Info } from "lucide-react";
import { useState } from "react";
import QuestionBuilder, { Question } from "@/components/questionnaire/QuestionBuilder";
import FormPreview from "@/components/questionnaire/FormPreview";
import ChatPreview from "@/components/questionnaire/ChatPreview";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateQuestionnaire = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [previewMode, setPreviewMode] = useState<'none' | 'form' | 'chat'>('none');
  const [logoFile, setLogoFile] = useState<string>("");
  const [profileFile, setProfileFile] = useState<string>("");
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [linkText, setLinkText] = useState<string>("");
  const [linkImageFile, setLinkImageFile] = useState<string>("");
  const [logoSizeWarning, setLogoSizeWarning] = useState<string>("");
  const [profileSizeWarning, setProfileSizeWarning] = useState<string>("");

  // Check if user has customer response templates
  const checkCustomerResponseTemplates = () => {
    // Mock check - in real app this would check localStorage or API
    const templates = localStorage.getItem('customer_response_templates');
    return templates && JSON.parse(templates).length > 0;
  };

  const handleDistributionClick = () => {
    if (checkCustomerResponseTemplates()) {
      // User has templates, go to distribution
      navigate('/distribution');
    } else {
      // No templates, show message and redirect to create template
      toast.info("בואו ניצור מענה אישי ללקוחות שלך", {
        description: "נעבור ליצירת תבנית מענה ללקוח חדש",
        duration: 3000
      });
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/create-template');
      }, 2000);
    }
  };

  // Mock data from user profile
  const businessName = "gil.arbisman";
  const subCategory = "יעוץ עסקי";
  const logoUrl = "/hoogi-new-avatar.png";

  // Ideal image dimensions - כפי שיוצג בטופס שנשלח ללקוח
  // הלוגו והפרופיל יוצגו 64x64px (h-16), התמונה העסקית 400px גובה מלא רוחב
  const IDEAL_LOGO_SIZE = { width: 256, height: 256 }; // 64px תצוגה → 256px source
  const IDEAL_PROFILE_SIZE = { width: 256, height: 256 }; // 64px תצוגה → 256px source
  const IDEAL_BUSINESS_IMAGE_SIZE = { width: 1280, height: 720 }; // מלבנית גבוהה 16:9

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      img.src = e.target?.result as string;
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        
        // לוגו יוצג 64x64px בטופס ללקוח (תמיד יוצג באותו גודל)
        if (width > 512 || height > 512) {
          setLogoSizeWarning(`גדול מדי (${width}x${height}) - רק לטעינה מהירה. בטופס יוצג 64x64px תמיד. מומלץ עד 256x256px.`);
        } else if (width < 128 || height < 128) {
          setLogoSizeWarning(`קטן מדי (${width}x${height}) - איכות ירודה בטופס. מומלץ לפחות 128x128px.`);
        } else {
          setLogoSizeWarning("");
        }
        
        setLogoFile(e.target?.result as string);
      };
    };
    
    reader.readAsDataURL(file);
  };

  const handleProfileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      img.src = e.target?.result as string;
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        
        // תמונת פרופיל יוצגת עגולה 64x64px בטופס ללקוח (תמיד יוצג באותו גודל)
        if (width > 512 || height > 512) {
          setProfileSizeWarning(`גדול מדי (${width}x${height}) - רק לטעינה מהירה. בטופס יוצג עגול 64x64px תמיד. מומלץ עד 256x256px.`);
        } else if (width < 128 || height < 128) {
          setProfileSizeWarning(`קטן מדי (${width}x${height}) - איכות ירודה בטופס. מומלץ לפחות 128x128px.`);
        } else {
          setProfileSizeWarning("");
        }
        
        setProfileFile(e.target?.result as string);
      };
    };
    
    reader.readAsDataURL(file);
  };

  const handleLinkImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      img.src = e.target?.result as string;
      img.onload = () => {
        setLinkImageFile(e.target?.result as string);
      };
    };
    
    reader.readAsDataURL(file);
  };

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
            businessName={businessName}
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

        {/* Header with business name */}
        <div className="mb-6">
          <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
            <div className="text-center">
              <h1 className="text-xl md:text-2xl font-bold text-foreground">
                {businessName} - {subCategory}
              </h1>
            </div>
          </div>
        </div>

        {/* Logo and Profile Picture section */}
        <div className="mb-6 space-y-4">
          <div className="bg-card rounded-xl p-4 md:p-6 shadow-sm border border-border">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Logo section */}
              <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 text-primary" defaultChecked />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                <img
                          src={logoFile || logoUrl}
                  alt="Logo"
                          className="w-14 h-14 md:w-16 md:h-16 object-contain cursor-help"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs max-w-xs">
                          <strong>למה לוגו?</strong> הלוגו יוצג בראש השאלון כדי לחזק את המותג שלך ולגרום למי שמילא את השאלון לזכור אתך
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span className="text-sm font-medium text-foreground">לוגו</span>
                </div>
                <label className="text-xs text-center text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                  <Upload className="inline h-4 w-4 ml-1" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  העלה לוגו
                </label>
                {logoSizeWarning && (
                  <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/20 p-2 rounded-md mt-2 max-w-xs">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>{logoSizeWarning}</span>
                  </div>
                )}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-[10px] text-muted-foreground text-center cursor-help">
                        מומלץ: עד 256x256px
                        <br />
                        (יוצג 64px בטופס)
                      </div>
                    </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs max-w-xs">
                          <strong>גודל אידאלי:</strong> עד 256x256 פיקסלים. הלוגו יוצג 64x64 פיקסלים בטופס שנשלח ללקוח.
                        </p>
                      </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Profile Picture section */}
              <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 text-primary" defaultChecked />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                <img
                  src={profileFile || logoUrl}
                  alt="Profile"
                          className="w-14 h-14 md:w-16 md:h-16 object-cover cursor-help"
                        />
                      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs max-w-xs">
          <strong>למה תמונת פרופיל?</strong> תמונה אישית יוצרת חיבור רגשי עם מי שממלא את השאלון. התמונה תוצג בגדול 64x64 פיקסלים.
        </p>
      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span className="text-sm font-medium text-foreground">תמונת פרופיל</span>
                </div>
                <label className="text-xs text-center text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                  <Upload className="inline h-4 w-4 ml-1" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileUpload}
                    className="hidden"
                  />
                  העלה תמונת פרופיל
                </label>
                {profileSizeWarning && (
                  <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/20 p-2 rounded-md mt-2 max-w-xs">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>{profileSizeWarning}</span>
                  </div>
                )}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-[10px] text-muted-foreground text-center cursor-help">
                        מומלץ: עד 256x256px
                        <br />
                        (יוצג 64px בטופס)
                      </div>
                    </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs max-w-xs">
                          <strong>גודל אידאלי:</strong> עד 256x256 פיקסלים. תמונת הפרופיל יוצגת 64x64 פיקסלים בטופס שנשלח ללקוח, לצד הלוגו.
                        </p>
                      </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto w-full">
          {/* Main form section */}
          <div className="space-y-4 md:space-y-6 mb-6">

              {/* Title input */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 md:p-6 shadow-sm border border-primary/20 hover:shadow-md transition-shadow">
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
                  className="min-h-[80px] md:min-h-[100px] text-base resize-none"
                />
              </div>

              {/* Link or Image upload */}
              <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl p-4 md:p-6 shadow-sm border border-secondary/20 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base md:text-lg font-semibold text-foreground">הוספת קישור / תמונה לשאלון</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-xs max-w-xs">
                          <p className="font-semibold mb-1">למה זה?</p>
                          <p className="mb-2">הקישור והתמונה יוצגו למי שממלא את השאלון וענו על השאלות.</p>
                          <p className="font-semibold mb-1">דוגמאות:</p>
                          <ul className="list-disc list-inside mr-2 space-y-1">
                            <li>מאמר או מדריך רלוונטי</li>
                            <li>קביעת פגישה/zoom</li>
                            <li>האתר שלך</li>
                            <li>מוצר או שירות ספציפי</li>
                            <li>סרטון הסבר</li>
                          </ul>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Link Text */}
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      איך יקראו לקישור?
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="inline h-3 w-3 text-muted-foreground hover:text-foreground cursor-help mr-1" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs max-w-xs">הטקסט שהקלק עליו יביא את הלקוח - זה מה שיראו הלקוחות</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    <Input
                      placeholder="לדוגמה: היכנס לאתר, ראה דוגמאות, קבע פגישה, צפה במאמר..."
                      value={linkText}
                      onChange={(e) => setLinkText(e.target.value)}
                      className="w-full"
                    />
                    <p className="text-[10px] text-muted-foreground mt-1">זה הטקסט שיראו הלקוחות במקום הקישור הארוך</p>
                  </div>

                  {/* Link URL */}
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      כתובת הקישור
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="inline h-3 w-3 text-muted-foreground hover:text-foreground cursor-help mr-1" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs max-w-xs">הכתובת האמיתית של העמוד - יש להכניס כתובת מלאה עם https://</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    <Input
                      placeholder="https://calendly.com/yourname או https://your-blog.com/article..."
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      className="w-full"
                    />
                    <p className="text-[10px] text-muted-foreground mt-1">כאן מכניסים את הכתובת הארוכה (URL)</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      העלאת תמונה למימוש קישור
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="inline h-3 w-3 text-muted-foreground hover:text-foreground cursor-help mr-1" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs max-w-xs">תמונה שתלווה את הקישור - לדוגמה תצוגה מקדימה של המאמר או השירות</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Upload className="h-5 w-5" />
                    <Input
                      type="file"
                      className="w-full"
                      accept="image/*"
                        onChange={handleLinkImageUpload}
                      />
                      {linkImageFile && (
                        <span className="text-xs text-green-600">✓ תמונה נבחרה</span>
                      )}
                    </label>
                    <div className="mt-2 bg-info/10 border border-info/20 rounded-md p-2">
                      <p className="text-xs text-muted-foreground text-center">
                        💡 מומלץ: <strong className="text-info font-semibold">1280x720px (יחס 16:9)</strong> - מתאים גם לנייד וגם לדסקטופ
                      </p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="text-[10px] text-muted-foreground mt-1 cursor-help text-center">
                              ℹ️ מידע נוסף על הגודל
                            </p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs max-w-xs">תמונה זו מייצגת את העסק והיא תוצג במלבן גבוה (400px גובה) ברוחב מלא בטופס שנשלח ללקוח - צריך להיות איכותי ויפה!</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          {/* בניית השאלון - מלבן לכל הרוחב */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 shadow-sm border border-primary/20 hover:shadow-md transition-all cursor-pointer mb-6"
               onClick={() => setIsBuilderOpen(true)}>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-4 bg-primary/20 rounded-lg">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">בניית השאלון</h2>
                <p className="text-sm text-muted-foreground">יצירה ועריכה של שאלות לשאלון</p>
              </div>
            </div>
            {questions.length > 0 && (
              <div className="bg-primary/10 rounded-lg p-3">
                <p className="text-sm text-primary font-medium">
                  {questions.length} שאלות נוספו לשאלון
                </p>
              </div>
            )}
          </div>

          {/* Save and Distribute buttons at bottom - centered */}
          <div className="flex justify-center gap-4 mt-8 mb-4">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white shadow-lg px-12 py-6 text-lg font-semibold rounded-xl"
              size="lg"
            >
              שמירה
            </Button>
            <Button 
              className="bg-secondary hover:bg-secondary/90 text-white shadow-lg px-12 py-6 text-lg font-semibold rounded-xl"
              size="lg"
              onClick={handleDistributionClick}
            >
              הפצה
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
