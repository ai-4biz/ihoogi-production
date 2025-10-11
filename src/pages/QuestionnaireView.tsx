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
      {/* Header - Modern Clean Design */}
      <div className="flex justify-center items-start gap-6 mb-8">
        {/* Logo - Left */}
        {brandingData.logoUrl && (
          <div className="flex-shrink-0 transform transition-all hover:scale-105">
            <img 
              src={brandingData.logoUrl} 
              alt="Logo" 
              className="h-32 w-32 object-contain rounded-lg shadow-lg"
              style={{ 
                border: `3px solid ${brandingData.primaryColor}`,
                background: `linear-gradient(135deg, ${brandingData.backgroundColor}40 0%, white 100%)`
              }}
            />
          </div>
        )}
        
        {/* Center Content - No Box, Clean Layout */}
        <div className="flex-1 max-w-2xl">
          {/* Gradient Header Bar */}
          <div 
            className="h-1 w-full rounded-full mb-4 shadow-sm"
            style={{ 
              background: `linear-gradient(90deg, ${brandingData.primaryColor} 0%, ${brandingData.secondaryColor} 100%)`
            }}
          />
          
          {/* Title Section */}
          <div className="text-center mb-4">
            <h2 
              className="font-bold text-2xl leading-tight mb-2 drop-shadow-sm" 
              style={{ color: brandingData.primaryColor }}
            >
              {brandingData.businessName}
            </h2>
            <h1 
              className="font-semibold text-xl leading-tight" 
              style={{ 
                color: brandingData.secondaryColor,
                textShadow: `0 1px 2px ${brandingData.secondaryColor}20`
              }}
            >
              {questionnaire?.title}
            </h1>
          </div>
          
          {/* Description with Subtle Background */}
          {questionnaire?.description && (
            <div 
              className="text-center p-4 rounded-xl mb-4 shadow-sm"
              style={{ 
                backgroundColor: `${brandingData.backgroundColor}30`,
                borderRight: `4px solid ${brandingData.secondaryColor}`
              }}
            >
              <p className="text-base text-gray-700 leading-relaxed">
                {questionnaire.description}
              </p>
            </div>
          )}
          
          {/* Image with Modern Frame */}
          {brandingData.images && brandingData.images.length > 0 && (
            <div className="mb-4 overflow-hidden rounded-2xl shadow-lg">
              <img 
                src={brandingData.images[0]}
                alt="תמונה"
                className="w-full h-48 object-cover transform transition-all hover:scale-105"
                style={{ 
                  borderBottom: `4px solid ${brandingData.primaryColor}`
                }}
              />
            </div>
          )}
          
          {/* Link with Modern Button Style */}
          {brandingData.links && brandingData.links.length > 0 && (
            <div className="flex justify-center">
              <a 
                href={brandingData.links[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform transition-all hover:scale-105 text-white"
                style={{ 
                  background: `linear-gradient(135deg, ${brandingData.primaryColor} 0%, ${brandingData.secondaryColor} 100%)`
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" />
                </svg>
                למידע נוסף
              </a>
            </div>
          )}
        </div>
        
        {/* Profile - Right */}
        {brandingData.profileImageUrl && (
          <div className="flex-shrink-0 transform transition-all hover:scale-105">
            <img 
              src={brandingData.profileImageUrl} 
              alt="Profile" 
              className="h-32 w-32 rounded-full object-cover shadow-lg"
              style={{ 
                border: `4px solid ${brandingData.secondaryColor}`,
                boxShadow: `0 8px 16px ${brandingData.secondaryColor}30`
              }}
            />
          </div>
        )}
      </div>

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
    <div className="space-y-4" style={{ 
      background: `linear-gradient(135deg, ${brandingData.secondaryColor}20 0%, ${brandingData.primaryColor}20 100%)`,
      padding: '20px',
      borderRadius: '12px',
      border: `1px solid ${brandingData.secondaryColor}30`
    }}>
      {/* Chat Header - Modern Clean Design */}
      <div className="flex justify-center items-start gap-6 mb-8">
        {/* Logo - Left */}
        {brandingData.logoUrl && (
          <div className="flex-shrink-0 transform transition-all hover:scale-105">
            <img 
              src={brandingData.logoUrl} 
              alt="Logo" 
              className="h-32 w-32 object-contain rounded-lg shadow-lg"
              style={{ 
                border: `3px solid ${brandingData.primaryColor}`,
                background: `linear-gradient(135deg, ${brandingData.backgroundColor}40 0%, white 100%)`
              }}
            />
          </div>
        )}
        
        {/* Center Content - No Box, Clean Layout */}
        <div className="flex-1 max-w-2xl">
          {/* Gradient Header Bar */}
          <div 
            className="h-1 w-full rounded-full mb-4 shadow-sm"
            style={{ 
              background: `linear-gradient(90deg, ${brandingData.primaryColor} 0%, ${brandingData.secondaryColor} 100%)`
            }}
          />
          
          {/* Title Section */}
          <div className="text-center mb-4">
            <h2 
              className="font-bold text-2xl leading-tight mb-2 drop-shadow-sm" 
              style={{ color: brandingData.primaryColor }}
            >
              {brandingData.businessName}
            </h2>
          </div>
          
          {/* Description with Subtle Background */}
          {questionnaire?.description && (
            <div 
              className="text-center p-4 rounded-xl mb-4 shadow-sm"
              style={{ 
                backgroundColor: `${brandingData.backgroundColor}30`,
                borderRight: `4px solid ${brandingData.secondaryColor}`
              }}
            >
              <p className="text-base text-gray-700 leading-relaxed">
                {questionnaire.description}
              </p>
            </div>
          )}
          
          {/* Image with Modern Frame */}
          {brandingData.images && brandingData.images.length > 0 && (
            <div className="mb-4 overflow-hidden rounded-2xl shadow-lg">
              <img 
                src={brandingData.images[0]}
                alt="תמונה"
                className="w-full h-48 object-cover transform transition-all hover:scale-105"
                style={{ 
                  borderBottom: `4px solid ${brandingData.primaryColor}`
                }}
              />
            </div>
          )}
          
          {/* Link with Modern Button Style */}
          {brandingData.links && brandingData.links.length > 0 && (
            <div className="flex justify-center">
              <a 
                href={brandingData.links[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform transition-all hover:scale-105 text-white"
                style={{ 
                  background: `linear-gradient(135deg, ${brandingData.primaryColor} 0%, ${brandingData.secondaryColor} 100%)`
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" />
                </svg>
                למידע נוסף
              </a>
            </div>
          )}
        </div>
        
        {/* Profile - Right */}
        {brandingData.profileImageUrl && (
          <div className="flex-shrink-0 transform transition-all hover:scale-105">
            <img 
              src={brandingData.profileImageUrl} 
              alt="Profile" 
              className="h-32 w-32 rounded-full object-cover shadow-lg"
              style={{ 
                border: `4px solid ${brandingData.secondaryColor}`,
                boxShadow: `0 8px 16px ${brandingData.secondaryColor}30`
              }}
            />
          </div>
        )}
      </div>

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
          className="text-white hover:opacity-90 transition-opacity px-6"
          style={{ backgroundColor: brandingData.secondaryColor }}
        >
          שלח תשובה
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
