
import { useState, useEffect } from "react";
import FormField from "@/components/FormField";
import HoogiTip from "@/components/HoogiTip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Tooltip from "@/components/Tooltip";

// Mock data - in a real app this would come from an API or database
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

const subcategories: Record<string, Array<{ value: string; label: string }>> = {
  law: [
    { value: "family", label: "דיני משפחה" },
    { value: "real_estate", label: "נדל\"ן" },
    { value: "corporate", label: "דיני חברות" },
    { value: "litigation", label: "ליטיגציה" },
    { value: "tax", label: "מיסוי" },
    { value: "other", label: "אחר" },
  ],
  accounting: [
    { value: "tax", label: "מיסוי" },
    { value: "audit", label: "ביקורת" },
    { value: "consulting", label: "ייעוץ פיננסי" },
    { value: "bookkeeping", label: "הנהלת חשבונות" },
    { value: "other", label: "אחר" },
  ],
  therapy: [
    { value: "cbt", label: "טיפול קוגניטיבי התנהגותי" },
    { value: "psychodynamic", label: "טיפול פסיכודינמי" },
    { value: "couples", label: "טיפול זוגי" },
    { value: "family", label: "טיפול משפחתי" },
    { value: "children", label: "טיפול בילדים" },
    { value: "other", label: "אחר" },
  ],
  business: [
    { value: "strategy", label: "אסטרטגיה" },
    { value: "marketing", label: "שיווק" },
    { value: "operations", label: "תפעול" },
    { value: "finance", label: "פיננסים" },
    { value: "hr", label: "משאבי אנוש" },
    { value: "other", label: "אחר" },
  ],
  design: [
    { value: "residential", label: "עיצוב דירות" },
    { value: "commercial", label: "עיצוב מסחרי" },
    { value: "office", label: "עיצוב משרדים" },
    { value: "furniture", label: "עיצוב רהיטים" },
    { value: "other", label: "אחר" },
  ],
  real_estate: [
    { value: "residential", label: "מגורים" },
    { value: "commercial", label: "מסחרי" },
    { value: "investment", label: "השקעות" },
    { value: "management", label: "ניהול נכסים" },
    { value: "other", label: "אחר" },
  ],
  medical: [
    { value: "general", label: "רפואה כללית" },
    { value: "specialist", label: "רפואה מקצועית" },
    { value: "alternative", label: "רפואה משלימה" },
    { value: "dental", label: "רפואת שיניים" },
    { value: "other", label: "אחר" },
  ],
  marketing: [
    { value: "digital", label: "שיווק דיגיטלי" },
    { value: "content", label: "שיווק תוכן" },
    { value: "social", label: "שיווק ברשתות חברתיות" },
    { value: "traditional", label: "שיווק מסורתי" },
    { value: "other", label: "אחר" },
  ],
  retail: [
    { value: "clothing", label: "ביגוד" },
    { value: "electronics", label: "אלקטרוניקה" },
    { value: "food", label: "מזון" },
    { value: "home", label: "ריהוט ובית" },
    { value: "other", label: "אחר" },
  ],
  tech: [
    { value: "software", label: "תוכנה" },
    { value: "hardware", label: "חומרה" },
    { value: "ai", label: "בינה מלאכותית" },
    { value: "data", label: "מדע נתונים" },
    { value: "cybersecurity", label: "אבטחת מידע" },
    { value: "other", label: "אחר" },
  ],
  other: [],
};

interface Step1Props {
  formData: {
    category: string;
    subcategory: string;
    customCategory: string;
    customSubcategory: string;
  };
  updateFormData: (data: any) => void;
}

const Step1Category = ({ formData, updateFormData }: Step1Props) => {
  const [availableSubcategories, setAvailableSubcategories] = useState<Array<{ value: string; label: string }>>([]);

  useEffect(() => {
    if (formData.category && formData.category !== "other") {
      setAvailableSubcategories(subcategories[formData.category] || []);
    } else {
      setAvailableSubcategories([]);
    }
  }, [formData.category]);

  const hoogiTip = "בחר את התחום שלך כדי שאשאל בדיוק את מה שאתה צריך. חשוב לבחור את התחום הנכון כדי שנוכל להתאים את התוכן באופן מיטבי לעסק שלך.";

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">באיזה תחום העסק שלך פועל?</h2>
      
      <HoogiTip tip={hoogiTip} />
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="category" className="text-base font-medium">
              בחר את תחום העיסוק שלך
            </Label>
            <Tooltip content="בחר את התחום העיקרי של העסק שלך מהרשימה" />
          </div>
          <Select
            value={formData.category}
            onValueChange={(value) => updateFormData({ 
              category: value, 
              subcategory: "" 
            })}
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="חפש ובחר תחום עיקרי" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {formData.category === "other" ? (
          <FormField
            id="customCategory"
            label="פרט את תחום העיסוק שלך"
            value={formData.customCategory || ""}
            onChange={(value) => updateFormData({ customCategory: value })}
            tooltip="תאר את תחום העיסוק הספציפי שלך במדויק"
          />
        ) : null}
        
        {formData.category && availableSubcategories.length > 0 ? (
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="subcategory" className="text-base font-medium">
                בחר תת-תחום / תחום מדויק
              </Label>
              <Tooltip content="בחר את התחום הספציפי יותר בתוך התחום הראשי שבחרת" />
            </div>
            <Select
              value={formData.subcategory}
              onValueChange={(value) => updateFormData({ subcategory: value })}
            >
              <SelectTrigger id="subcategory" className="w-full">
                <SelectValue placeholder="בחר תת-תחום" />
              </SelectTrigger>
              <SelectContent>
                {availableSubcategories.map((subcategory) => (
                  <SelectItem key={subcategory.value} value={subcategory.value}>
                    {subcategory.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}
        
        {formData.subcategory === "other" && formData.category !== "other" ? (
          <FormField
            id="customSubcategory"
            label="פרט את תת-התחום שלך"
            value={formData.customSubcategory || ""}
            onChange={(value) => updateFormData({ customSubcategory: value })}
            tooltip="תאר את תת-התחום הספציפי שלך במדויק"
          />
        ) : null}
      </div>
    </div>
  );
};

export default Step1Category;
