
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bold, 
  Italic, 
  List, 
  Link, 
  Wand2, 
  Save, 
  Mic 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import HoogiTip from "@/components/HoogiTip";

const RichEditorPane = () => {
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  
  const handleGenerateDraft = () => {
    const loremText = `לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף גולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס.`;
    setContent(loremText);
    toast({
      title: "נוצרה טיוטה",
      description: "הטיוטה נוצרה בהצלחה",
    });
  };
  
  const handleSaveDraft = () => {
    localStorage.setItem("contentDraft", content);
    toast({
      title: "הטיוטה נשמרה",
      description: "הטיוטה נשמרה בהצלחה להמשך עריכה"
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
  
  const countWords = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };
  
  const characterCount = content.length;
  const wordCount = countWords(content);
  
  const formatToolOptions = [
    { icon: Bold, tooltip: "מודגש" },
    { icon: Italic, tooltip: "נטוי" },
    { icon: List, tooltip: "רשימה" },
    { icon: Link, tooltip: "קישור" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-lg font-medium mb-4">כתיבה ועריכה</div>
      
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Button 
          onClick={handleGenerateDraft}
          className="gap-2"
        >
          <Wand2 className="h-4 w-4" />
          צור טיוטת AI
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleStartRecording}
            className={`gap-2 ${isRecording ? 'bg-red-50 text-red-600 border-red-300' : ''}`}
          >
            <Mic className="h-4 w-4" />
            {isRecording ? "עצור הקלטה" : "הקלט רעיון"}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleSaveDraft}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            שמור טיוטה
          </Button>
        </div>
      </div>
      
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          {formatToolOptions.map((tool, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => toast({
                title: "בקרוב...",
                description: `כלי העיצוב ${tool.tooltip} יהיה זמין בקרוב`
              })}
            >
              <tool.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
        
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="התחל לכתוב את התוכן שלך כאן..."
          className="min-h-[300px] text-base leading-relaxed resize-none"
        />
        
        <div className="flex justify-between mt-4 text-sm text-gray-500">
          <div>
            {characterCount} תווים | {wordCount} מילים
          </div>
          <div className="flex items-center gap-2">
            <span>אורך מבוקש:</span>
            <span className={characterCount > 400 ? "text-yellow-600" : "text-green-600"}>
              400 תווים
            </span>
            <HoogiTip tip="האורך המבוקש מוגדר בלשונית 'מאפייני תוכן'" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RichEditorPane;
