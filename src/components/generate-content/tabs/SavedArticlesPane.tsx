
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, ExternalLink, Mic } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import HoogiTip from "@/components/HoogiTip";

const mockArticles = [
  { 
    id: 1, 
    title: "עשרה טיפים לשיווק עסקים קטנים", 
    source: "בלוג עסקי", 
    lang: "עברית",
    selected: false,
    keyPoints: [
      "בניית מותג חזק ומזוהה",
      "שימוש ברשתות חברתיות",
      "אסטרטגיית תוכן ממוקדת"
    ]
  },
  { 
    id: 2, 
    title: "How to Grow Your Online Presence", 
    source: "Digital Marketing Blog", 
    lang: "אנגלית",
    selected: false,
    keyPoints: [
      "SEO fundamentals",
      "Content marketing strategy",
      "Social media engagement"
    ]
  },
  { 
    id: 3, 
    title: "מדריך למתחילים: בניית אמון עם לקוחות", 
    source: "מגזין עסקים", 
    lang: "עברית",
    selected: false,
    keyPoints: [
      "תקשורת שקופה עם לקוחות",
      "עמידה בהבטחות ולוחות זמנים",
      "שירות איכותי ועקבי"
    ]
  },
];

const SavedArticlesPane = () => {
  const [articles, setArticles] = useState(mockArticles);
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [externalUrl, setExternalUrl] = useState("");
  const [freeText, setFreeText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleArticleSelection = (id: number) => {
    setSelectedArticle(selectedArticle === id ? null : id);
    setArticles(articles.map(article => 
      article.id === id 
      ? {...article, selected: !article.selected}
      : article
    ));
  };
  
  const handleKeyPointToggle = (articleId: number, pointIndex: number) => {
    // This would toggle selection of specific key points
    toast({
      title: "נבחרה נקודה מרכזית",
      description: "הנקודה נוספה לבסיס הכתיבה"
    });
  };
  
  const handleAddToWritingBase = () => {
    toast({
      title: "נוסף לבסיס הכתיבה",
      description: "התוכן הנבחר נוסף לבסיס הכתיבה"
    });
  };
  
  const handleFetchExternalArticle = () => {
    if (!externalUrl) {
      toast({
        title: "שגיאה",
        description: "נא להזין כתובת URL",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "בקרוב...",
      description: "משיכת מאמר חיצוני תהיה זמינה בקרוב"
    });
  };
  
  const handleStartRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "מקליט...",
        description: "מקליט את הקול שלך. לחץ שוב לעצירה."
      });
    } else {
      toast({
        title: "הקלטה נשמרה",
        description: "הקלטת הקול הסתיימה ונשמרה"
      });
    }
  };
  
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    article.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="text-lg font-medium mb-4">מקורות תוכן</div>
      
      {/* System Articles */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            מאמרי מערכת מסומנים
            <HoogiTip tip="בחר מאמרים שסימנת כמועדפים" />
          </h3>
          
          <div className="w-64">
            <Input 
              placeholder="חיפוש מאמרים..." 
              prefixIcon={<Search className="h-4 w-4 text-gray-400" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {filteredArticles.length > 0 ? (
          <div className="space-y-4">
            {filteredArticles.map(article => (
              <div 
                key={article.id}
                className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                  selectedArticle === article.id ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleArticleSelection(article.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{article.title}</h4>
                    <p className="text-sm text-gray-500">{article.source}</p>
                  </div>
                  <Badge variant="outline">{article.lang}</Badge>
                </div>
                
                {selectedArticle === article.id && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">רעיונות מרכזיים:</p>
                    {article.keyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox 
                          id={`point-${article.id}-${idx}`}
                          onCheckedChange={() => handleKeyPointToggle(article.id, idx)} 
                        />
                        <Label 
                          htmlFor={`point-${article.id}-${idx}`}
                          className="text-sm"
                        >
                          {point}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <Button onClick={handleAddToWritingBase} className="w-full">
              הוסף לבסיס הכתיבה
            </Button>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            לא נמצאו מאמרים מסומנים
          </div>
        )}
      </Card>
      
      {/* External Article */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          מאמר חיצוני
          <HoogiTip tip="הוסף מאמר מאתר חיצוני" />
        </h3>
        
        <div className="flex gap-2 mb-4">
          <Input 
            placeholder="הכנס כתובת URL של מאמר חיצוני..."
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            className="flex-grow"
          />
          <Button 
            onClick={handleFetchExternalArticle}
            className="gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            אחזר + תרגם
          </Button>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-500 text-sm">
            תוכן המאמר יופיע כאן לאחר האחזור
          </p>
        </div>
      </Card>
      
      {/* Free Text / Voice */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          טקסט חופשי / הקלטה קולית
          <HoogiTip tip="הכנס טקסט או הקלט רעיון בקול" />
        </h3>
        
        <div className="mb-4">
          <Textarea 
            placeholder="הכנס טקסט חופשי כבסיס לכתיבה..."
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            className="min-h-[150px] mb-4"
          />
          
          <Button 
            variant="outline"
            onClick={handleStartRecording}
            className={`gap-2 ${isRecording ? 'bg-red-50 text-red-600 border-red-300' : ''}`}
          >
            <Mic className="h-4 w-4" />
            {isRecording ? "עצור הקלטה" : "הקלט רעיון קצר"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SavedArticlesPane;
