import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageCircle, ArrowLeft, Eye, Users, Calendar, ArrowRight } from "lucide-react";

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
  
  // Get user branding data from localStorage (from BusinessForm)
  const [brandingData, setBrandingData] = useState({
    primaryColor: '#22c55e',      // ירוק
    secondaryColor: '#f97316',    // כתום
    backgroundColor: '#f3e8ff',   // סגול בהיר
    logoUrl: '/hoogi-new-avatar.png',  // לוגו דוגמה
    profileImageUrl: '/hoogi-new-avatar.png',  // פרופיל דוגמה
    businessName: 'העסק שלי - דוגמה',
    links: ['https://example.com/info', 'https://example.com/services'],  // קישורים
    images: ['/hoogi-new-avatar.png']  // תמונות
  });

  useEffect(() => {
    // Load branding data from localStorage
    try {
      const savedBranding = localStorage.getItem('businessBranding');
      if (savedBranding) {
        const branding = JSON.parse(savedBranding);
        setBrandingData({
          primaryColor: branding.primaryColor || '#22c55e',
          secondaryColor: branding.secondaryColor || '#f97316',
          backgroundColor: branding.backgroundColor || '#f3e8ff',
          logoUrl: branding.logoUrl || '/hoogi-new-avatar.png',
          profileImageUrl: branding.profileImageUrl || '/hoogi-new-avatar.png',
          businessName: branding.businessName || 'העסק שלי - דוגמה',
          links: branding.links || ['https://example.com/info', 'https://example.com/services'],
          images: branding.images || ['/hoogi-new-avatar.png']
        });
      }
    } catch (error) {
      console.error('Error loading branding data:', error);
    }
    
    // Check if this is a preview from sessionStorage
    if (id === 'preview') {
      const previewData = sessionStorage.getItem('questionnairePreview');
      if (previewData) {
        try {
          const data = JSON.parse(previewData);
          const mockQuestionnaire: QuestionnaireData = {
            id: 999,
            title: "תצוגה מקדימה של השאלון",
            description: "זוהי תצוגה מקדימה של השאלון שלך",
            createdAt: new Date().toLocaleDateString('he-IL'),
            questions: data.questions.map((q: any, index: number) => ({
              id: index + 1,
              text: q.title || `שאלה ${index + 1}`,
              type: q.type === 'single-choice' || q.type === 'multiple-choice' ? 'multiple-choice' : 
                    q.type === 'rating' ? 'rating' : 
                    q.type === 'date' ? 'date' : 'text',
              options: q.options || []
            }))
          };
          setQuestionnaire(mockQuestionnaire);
          setMode(data.mode || 'form');
          return;
        } catch (error) {
          console.error('Error parsing preview data:', error);
        }
      }
    }

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
      {/* Header with Logo and Profile */}
      <Card className="border-2 shadow-lg" style={{ borderColor: brandingData.primaryColor, backgroundColor: brandingData.backgroundColor }}>
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-4 mb-6">
            {brandingData.logoUrl && (
              <img 
                src={brandingData.logoUrl} 
                alt="Logo" 
                className="h-20 w-20 object-contain"
              />
            )}
            <h2 className="text-2xl font-bold text-center" style={{ color: brandingData.primaryColor }}>
              {brandingData.businessName}
            </h2>
            {brandingData.profileImageUrl && (
              <img 
                src={brandingData.profileImageUrl} 
                alt="Profile" 
                className="h-16 w-16 rounded-full object-cover border-4"
                style={{ borderColor: brandingData.secondaryColor }}
              />
            )}
          </div>
          <h1 className="text-3xl font-bold text-center mb-2" style={{ color: brandingData.primaryColor }}>
            {questionnaire?.title}
          </h1>
          <p className="text-center text-muted-foreground">
            {questionnaire?.description}
          </p>
          
          {/* Links and Images Section */}
          {(brandingData.links?.length > 0 || brandingData.images?.length > 0) && (
            <div className="mt-6 pt-6 border-t border-border/50">
              <h3 className="text-lg font-semibold text-center mb-4" style={{ color: brandingData.secondaryColor }}>
                מידע נוסף
              </h3>
              
              {/* Links */}
              {brandingData.links && brandingData.links.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2 text-center">קישורים שימושיים:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {brandingData.links.map((link, idx) => (
                      <a 
                        key={idx}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm px-3 py-1.5 rounded-lg border-2 hover:shadow-md transition-all"
                        style={{ 
                          borderColor: brandingData.secondaryColor,
                          color: brandingData.secondaryColor,
                          backgroundColor: `${brandingData.secondaryColor}10`
                        }}
                      >
                        🔗 {link.length > 30 ? link.substring(0, 30) + '...' : link}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Images */}
              {brandingData.images && brandingData.images.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2 text-center">תמונות:</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {brandingData.images.map((img, idx) => (
                      <img 
                        key={idx}
                        src={img}
                        alt={`תמונה ${idx + 1}`}
                        className="h-20 w-20 object-cover rounded-lg border-2 shadow-sm hover:shadow-md transition-shadow"
                        style={{ borderColor: brandingData.primaryColor }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Questions */}
      {questionnaire?.questions.map((question) => (
        <Card key={question.id} className="border shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{ color: brandingData.primaryColor }}>{question.text}</h3>
              
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
                      className="w-10 h-10 rounded-full border-2 hover:text-white transition-colors"
                      style={{ 
                        borderColor: brandingData.primaryColor,
                        color: brandingData.primaryColor
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = brandingData.primaryColor;
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = brandingData.primaryColor;
                      }}
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
        <Button 
          className="px-8 py-3 text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: brandingData.primaryColor }}
        >
          שליחת השאלון
        </Button>
      </div>
    </div>
  );

  const renderChatView = () => (
    <div className="space-y-4">
      {/* Chat Header - Compact & Elegant */}
      <Card className="border shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: brandingData.primaryColor + '30', backgroundColor: brandingData.backgroundColor }}>
        <CardContent className="p-4">
          {/* Top Row: Logo (left) + Title + Profile (right) */}
          <div className="flex items-center justify-between mb-3">
            {/* Logo - Left */}
            <div className="flex-shrink-0">
              {brandingData.logoUrl ? (
                <img 
                  src={brandingData.logoUrl} 
                  alt="Logo" 
                  className="h-10 w-10 object-contain rounded-lg shadow-sm"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm" style={{ backgroundColor: brandingData.primaryColor }}>
                  <span className="text-white font-bold text-sm">ה</span>
                </div>
              )}
            </div>
            
            {/* Title - Center */}
            <div className="flex-1 text-center px-3">
              <h3 className="font-bold text-base" style={{ color: brandingData.primaryColor }}>{brandingData.businessName}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">מסייע בשאלות ומידע</p>
            </div>
            
            {/* Profile - Right */}
            <div className="flex-shrink-0">
              {brandingData.profileImageUrl ? (
                <img 
                  src={brandingData.profileImageUrl} 
                  alt="Profile" 
                  className="h-10 w-10 rounded-full object-cover border-2 shadow-sm"
                  style={{ borderColor: brandingData.secondaryColor }}
                />
              ) : (
                <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm" style={{ backgroundColor: brandingData.primaryColor, borderColor: brandingData.secondaryColor }}>
                  <span className="text-white font-bold text-sm">ה</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Description (if questionnaire exists) */}
          {questionnaire?.description && (
            <p className="text-xs text-center text-muted-foreground mb-3 px-2">
              {questionnaire.description}
            </p>
          )}
          
          {/* Links - Compact Buttons */}
          {brandingData.links && brandingData.links.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-2 justify-center">
                {brandingData.links.map((link, idx) => (
                  <a 
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border hover:shadow-sm transition-all font-medium"
                    style={{ 
                      borderColor: brandingData.secondaryColor,
                      color: brandingData.secondaryColor,
                      backgroundColor: brandingData.secondaryColor + '10'
                    }}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" />
                    </svg>
                    קישור {idx + 1}
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {/* Images - Below Description */}
          {brandingData.images && brandingData.images.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {brandingData.images.map((img, idx) => (
                <img 
                  key={idx}
                  src={img}
                  alt={`תמונה ${idx + 1}`}
                  className="h-16 w-16 object-cover rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                  style={{ borderColor: brandingData.primaryColor + '50' }}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {/* Bot Message */}
        <div className="flex gap-3">
          {brandingData.profileImageUrl ? (
            <img 
              src={brandingData.profileImageUrl} 
              alt="Assistant" 
              className="w-8 h-8 rounded-full object-cover flex-shrink-0 border-2"
              style={{ borderColor: brandingData.primaryColor }}
            />
          ) : (
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: brandingData.primaryColor }}>
              <span className="text-white text-sm font-bold">ה</span>
            </div>
          )}
          <div className="rounded-lg p-3 max-w-xs" style={{ backgroundColor: brandingData.secondaryColor + '20', borderRight: `3px solid ${brandingData.secondaryColor}` }}>
            <p className="text-foreground">שלום! אני כאן לעזור לך למלא את השאלון. בואי נתחיל עם השאלה הראשונה...</p>
          </div>
        </div>

        {/* User Message */}
        <div className="flex gap-3 justify-end">
          <div className="rounded-lg p-3 max-w-xs text-white" style={{ backgroundColor: brandingData.primaryColor }}>
            <p>שלום! אני מוכן למלא את השאלון</p>
          </div>
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-muted-foreground text-sm font-bold">א</span>
          </div>
        </div>

        {/* Bot Message */}
        <div className="flex gap-3">
          {brandingData.profileImageUrl ? (
            <img 
              src={brandingData.profileImageUrl} 
              alt="Assistant" 
              className="w-8 h-8 rounded-full object-cover flex-shrink-0 border-2"
              style={{ borderColor: brandingData.primaryColor }}
            />
          ) : (
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: brandingData.primaryColor }}>
              <span className="text-white text-sm font-bold">ה</span>
            </div>
          )}
          <div className="rounded-lg p-3 max-w-xs" style={{ backgroundColor: brandingData.secondaryColor + '20', borderRight: `3px solid ${brandingData.secondaryColor}` }}>
            <p className="text-foreground">מהו תחום הפעילות העיקרי של העסק שלכם?</p>
            <div className="mt-2 space-y-1">
              {["ייעוץ עסקי", "שיווק דיגיטלי", "פיתוח תוכנה", "אחר"].map((option, index) => (
                <button 
                  key={index} 
                  className="block w-full text-right p-2 rounded transition-colors hover:text-white"
                  style={{ color: brandingData.primaryColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = brandingData.primaryColor;
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = brandingData.primaryColor;
                  }}
                >
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
          className="flex-1 p-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
          style={{ 
            borderColor: brandingData.primaryColor + '40',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = brandingData.primaryColor;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = brandingData.primaryColor + '40';
          }}
        />
        <Button 
          className="text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: brandingData.primaryColor }}
        >
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
    <div className="min-h-screen bg-background" dir="rtl">
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
                <ArrowRight className="h-4 w-4" />
                חזרה
              </Button>
              <div className="text-right">
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
