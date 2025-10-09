import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Tooltip from "@/components/Tooltip";

interface WizardSummaryProps {
  formData: any;
  resetWizard: () => void;
}

const WizardSummary = ({ formData, resetWizard }: WizardSummaryProps) => {
  const handleSendToEmail = () => {
    // In a real application, this would send the data to an API endpoint
    // For now, we'll just show a toast notification
    toast.success("סיכום השאלון נשלח למייל שלך");
    
    // After a moment, start content creation
    setTimeout(() => {
      toast.success("התחלנו לעבוד על התוכן שלך!");
    }, 1500);
    
    resetWizard();
  };

  // Helper function to get category/subcategory label
  const getCategoryLabel = (value: string, options: Array<{value: string, label: string}>): string => {
    return options.find(item => item.value === value)?.label || value;
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="rounded-full bg-green-100 p-3 mb-4">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">השאלון הושלם בהצלחה!</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        תודה שמילאת את השאלון. הנתונים שנאספו ישמשו ליצירת תוכן מותאם אישית לעסק שלך.
      </p>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8 w-full max-w-2xl border border-gray-200">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold mb-2">סיכום המידע שהזנת</h3>
            <p className="text-gray-600">כך ייראה המאמר שלך:</p>
          </div>
          
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {formData.logoUploaded && (
              <Avatar className="w-14 h-14 border border-gray-200">
                <AvatarImage src="/placeholder.svg" alt="לוגו" />
                <AvatarFallback>
                  {formData.businessName?.substring(0, 2) || "לוגו"}
                </AvatarFallback>
              </Avatar>
            )}
            
            {formData.profileImageUploaded && (
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg" alt="תמונת פרופיל" />
                <AvatarFallback>
                  {formData.businessName?.substring(0, 1) || "פ"}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2 text-primary">פרטי עסק</h4>
            <ul className="space-y-2 text-gray-700">
              <li>
                <span className="font-medium">שם העסק:</span> {formData.businessName || "לא צוין"}
              </li>
              <li>
                <span className="font-medium">תחום עיסוק:</span> {
                  formData.category === "other" 
                    ? formData.customCategory 
                    : getCategoryLabel(formData.category, categories)
                }
              </li>
              <li>
                <span className="font-medium">אזור פעילות:</span> {
                  formData.geographicArea === "other" 
                    ? formData.customGeographicArea 
                    : getCategoryLabel(formData.geographicArea, geographicAreas)
                }
              </li>
              <li>
                <span className="font-medium">נישה:</span> {formData.niche || "לא צוינה"}
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2 text-primary">סגנון ותוכן</h4>
            <ul className="space-y-2 text-gray-700">
              <li>
                <span className="font-medium">שפה:</span> {
                  formData.language === "other" 
                    ? formData.customLanguage 
                    : getCategoryLabel(formData.language, languageOptions)
                }
              </li>
              <li>
                <span className="font-medium">ערכים מובילים:</span> {
                  formData.values && formData.values.length > 0 
                    ? formData.values.map(v => getCategoryLabel(v, valueOptions)).join(", ") 
                    : "לא צוינו"
                }
              </li>
              <li>
                <span className="font-medium">תגית פנימית:</span> {formData.internalTag || "לא צוינה"}
              </li>
              <li>
                <span className="font-medium">הפצה מורשית:</span> {formData.allowDistribution ? "כן" : "לא"}
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-md">
        <Button 
          onClick={handleSendToEmail} 
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          המשך ליצירת תוכן מותאם לעסק שלך
        </Button>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          כל הנתונים נשמרים אוטומטית וניתנים לשינוי בכל עת.
        </p>
      </div>
      
      <div className="mt-8 text-center">
        <p className="italic text-gray-600">
          "יש לי תמונה ברורה של מי אתה – עכשיו אפשר להתחיל לבנות לך תוכן שעובד."
        </p>
        <p className="text-sm text-gray-500">- Hoogi</p>
      </div>
    </div>
  );
};

// Reference data for displaying labels in the summary
const categories = [
  { value: "law", label: "עריכת דין" },
  { value: "accounting", label: "ראיית חשבון" },
  { value: "therapy", label: "טיפול רגשי" },
  { value: "business", label: "ייעוץ עסקי" },
  { value: "design", label: "עיצוב פנים" },
  { value: "real_estate", label: "נדל\"ן" },
  { value: "medical", label: "רפואה" },
  { value: "marketing", label: "שיווק ופרסום" },
  { value: "retail", label: "קמעונאות" },
  { value: "tech", label: "טכנולוגיה" },
  { value: "other", label: "אחר" },
];

const languageOptions = [
  { value: "hebrew", label: "עברית" },
  { value: "english", label: "אנגלית" },
  { value: "arabic", label: "ערבית" },
  { value: "russian", label: "רוסית" },
  { value: "french", label: "צרפתית" },
  { value: "spanish", label: "ספרדית" },
  { value: "other", label: "שפה אחרת" },
];

const valueOptions = [
  { value: "reliability", label: "אמינות" },
  { value: "professionalism", label: "מקצועיות" },
  { value: "support", label: "ליווי צמוד" },
  { value: "transparency", label: "שקיפות" },
  { value: "creativity", label: "יצירתיות" },
  { value: "other", label: "אחר" },
];

const geographicAreas = [
  { value: "all", label: "כל הארץ" },
  { value: "north", label: "צפון" },
  { value: "haifa", label: "חיפה והקריות" },
  { value: "sharon", label: "השרון" },
  { value: "center", label: "מרכז" },
  { value: "tel_aviv", label: "תל אביב והסביבה" },
  { value: "jerusalem", label: "ירושלים והסביבה" },
  { value: "shfela", label: "השפלה" },
  { value: "south", label: "דרום" },
  { value: "online", label: "אונליין בלבד" },
  { value: "international", label: "בינלאומי" },
  { value: "other", label: "אחר" },
];

export default WizardSummary;
