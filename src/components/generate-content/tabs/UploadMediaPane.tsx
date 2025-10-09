
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Image as ImageIcon, FileImage, Mic } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import HoogiTip from "@/components/HoogiTip";

const UploadMediaPane = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [promptText, setPromptText] = useState("");

  const handleUpload = () => {
    setIsUploading(true);
    // Simulating upload process
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "הועלה בהצלחה",
        description: "המדיה הועלתה בהצלחה"
      });
    }, 1500);
  };

  const handleGenerateAIImage = () => {
    if (!promptText.trim()) {
      toast({
        title: "שגיאה",
        description: "אנא הכנס תיאור לתמונה",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "בקרוב...",
      description: "פונקציונליות זו תהיה זמינה בקרוב"
    });
  };

  const handleStockSearch = () => {
    toast({
      title: "בקרוב...",
      description: "חיפוש במאגרי תמונות חינמיים יהיה זמין בקרוב"
    });
  };

  const sampleImages = [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  ];

  return (
    <div className="space-y-8">
      <div className="text-lg font-medium mb-4">מדיה וגרפיקה</div>
      
      {/* AI Image Generator */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            יצירת תמונה בעזרת AI
            <HoogiTip tip="תיאור המתאר את התמונה שתרצה ליצור" />
          </h3>
          <p className="text-gray-500 text-sm">הזן תיאור מפורט והמערכת תייצר תמונה מותאמת</p>
        </div>
        
        <div className="space-y-4">
          <Textarea 
            placeholder="תאר את התמונה שתרצה ליצור..."
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            className="min-h-24"
          />
          
          <Button 
            onClick={handleGenerateAIImage}
            className="gap-2"
          >
            <ImageIcon className="h-4 w-4" />
            צור תמונה
          </Button>
          
          {/* Placeholder for generated image */}
          <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center text-gray-500">
            התמונה תופיע כאן
          </div>
        </div>
      </Card>
      
      {/* Stock Image Search */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            חיפוש במאגרי תמונות
            <HoogiTip tip="חפש תמונות במאגרי Unsplash ו-Pexels" />
          </h3>
          <p className="text-gray-500 text-sm">חפש תמונות חינמיות לשימוש בתוכן שלך</p>
        </div>
        
        <div className="flex gap-2 mb-4">
          <Input 
            placeholder="חפש תמונות..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefixIcon={<FileImage className="h-4 w-4 text-gray-400" />}
            className="flex-grow"
          />
          <Button onClick={handleStockSearch}>חפש</Button>
        </div>
        
        {/* Sample Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sampleImages.map((img, idx) => (
            <div 
              key={idx} 
              className="aspect-square rounded-md overflow-hidden bg-gray-100 hover:opacity-80 cursor-pointer"
              onClick={() => toast({
                title: "נבחרה תמונה",
                description: "התמונה נוספה לתוכן שלך"
              })}
            >
              <img 
                src={img} 
                alt={`Stock image ${idx + 1}`} 
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </Card>
      
      {/* File Upload */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">העלאת קבצים</h3>
          <p className="text-gray-500 text-sm">תמונות, סרטונים או קבצי PDF</p>
        </div>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-gray-600">גרור קבצים לכאן או לחץ להעלאה</p>
          <p className="text-sm text-gray-400 mt-1">JPG, PNG, MP4, PDF עד 10MB</p>
          <Button 
            onClick={handleUpload} 
            className="mt-4" 
            disabled={isUploading}
          >
            {isUploading ? "מעלה..." : "העלאת קובץ"}
          </Button>
        </div>
      </Card>
      
      {/* Profile/Logo Selection */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            תמונות פרופיל ולוגו
            <HoogiTip tip="בחר מתמונות הפרופיל שכבר העלית" />
          </h3>
          <p className="text-gray-500 text-sm">בחר מהתמונות שכבר העלית לפרופיל</p>
        </div>
        
        <div className="flex gap-4">
          <div 
            className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80"
            onClick={() => toast({
              title: "בחירת אווטאר",
              description: "תמונת הפרופיל נבחרה"
            })}
          >
            <img 
              src="https://i.pravatar.cc/80?img=3" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div 
            className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80"
            onClick={() => toast({
              title: "בחירת לוגו",
              description: "הלוגו נבחר"
            })}
          >
            <img 
              src="/placeholder.svg" 
              alt="Logo" 
              className="w-full h-full object-contain p-2"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UploadMediaPane;
