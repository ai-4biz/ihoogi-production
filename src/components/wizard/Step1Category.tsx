
import { useState, useEffect } from "react";
import FormField from "@/components/FormField";
import HoogiTip from "@/components/HoogiTip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Tooltip from "@/components/Tooltip";

// Mock data - in a real app this would come from an API or database
const categories = [
  { value: "law_finance_insurance", label: "עריכת דין, פיננסים וביטוח" },
  { value: "real_estate_construction", label: "נדל״ן, בנייה ועיצוב" },
  { value: "coaching_therapy", label: "אימון, טיפול והתפתחות אישית" },
  { value: "beauty_health", label: "יופי, בריאות ואסתטיקה" },
  { value: "restaurants_events", label: "מסעדנות, אוכל ואירועים" },
  { value: "tech_digital", label: "טכנולוגיה, הדרכה ועסקים דיגיטליים" },
  { value: "tourism_services", label: "תיירות, תחבורה ושירותים" },
  { value: "nonprofits", label: "עמותות וקהילה" },
  { value: "other", label: "אחר" },
];

const subcategories: Record<string, Array<{ value: string; label: string }>> = {
  law_finance_insurance: [
    { value: "law", label: "עריכת דין" },
    { value: "accounting", label: "ראיית חשבון / הנהלת חשבונות" },
    { value: "insurance", label: "ביטוח" },
    { value: "financial_consulting", label: "ייעוץ עסקי ופיננסי" },
    { value: "other", label: "אחר" },
  ],
  real_estate_construction: [
    { value: "real_estate_brokerage", label: "נדל״ן ותיווך" },
    { value: "project_management", label: "ניהול פרויקטים" },
    { value: "construction", label: "בנייה ושיפוצים" },
    { value: "architecture_interior", label: "אדריכלות ועיצוב פנים" },
    { value: "other", label: "אחר" },
  ],
  coaching_therapy: [
    { value: "personal_business_coaches", label: "מאמנים אישיים / עסקיים" },
    { value: "emotional_physical_therapists", label: "מטפלים רגשיים / גוף־נפש" },
    { value: "couples_family_therapy", label: "טיפול זוגי או משפחתי" },
    { value: "nlp_mindfulness", label: "NLP / מיינדפולנס" },
    { value: "other", label: "אחר" },
  ],
  beauty_health: [
    { value: "cosmetics", label: "קוסמטיקה" },
    { value: "clinics_alternative", label: "קליניקות / בריאות משלימה" },
    { value: "fitness_nutrition", label: "כושר ותזונה" },
    { value: "spa_beauty_centers", label: "ספא ומכוני יופי" },
    { value: "other", label: "אחר" },
  ],
  restaurants_events: [
    { value: "restaurants_cafes", label: "מסעדות ובתי קפה" },
    { value: "catering", label: "קייטרינג" },
    { value: "patisseries_bakeries", label: "קונדיטוריות / מאפיות" },
    { value: "bars_services", label: "ברים ושירותי בר" },
    { value: "other", label: "אחר" },
  ],
  tech_digital: [
    { value: "software_it", label: "שירותי תוכנה / IT" },
    { value: "digital_courses", label: "קורסים דיגיטליים" },
    { value: "digital_marketing", label: "שיווק דיגיטלי" },
    { value: "ecommerce", label: "איקומרס" },
    { value: "other", label: "אחר" },
  ],
  tourism_services: [
    { value: "hotels_zimmers", label: "מלונות וצימרים" },
    { value: "transportation", label: "תחבורה / הסעות" },
    { value: "event_production", label: "הפקת אירועים" },
    { value: "local_services", label: "שירותים מקומיים" },
    { value: "other", label: "אחר" },
  ],
  nonprofits: [
    { value: "nonprofits_orgs", label: "עמותות" },
    { value: "social_initiatives", label: "מיזמים חברתיים" },
    { value: "volunteering", label: "התנדבות" },
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
