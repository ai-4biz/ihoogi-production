
import { useEffect, useState } from "react";
import FormField from "@/components/FormField";
import HoogiTip from "@/components/HoogiTip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import Tooltip from "@/components/Tooltip";

// Geographic areas options
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

// Service examples based on category
const serviceExamples: Record<string, string> = {
  law: "למשל: ייעוץ משפטי בנושאי גירושין, ייצוג בבית משפט, עריכת חוזים",
  accounting: "למשל: הכנת דוחות כספיים, ייעוץ מס, הנהלת חשבונות",
  therapy: "למשל: טיפול CBT, טיפול זוגי, טיפול במצבי חרדה",
  business: "למשל: ייעוץ אסטרטגי לעסקים קטנים, ליווי חברות סטארט-אפ, תכניות עסקיות",
  design: "למשל: עיצוב דירות פרטיות, תכנון משרדים, עיצוב חללים מסחריים",
  real_estate: "למשל: שיווק נכסים, ייעוץ משכנתאות, ניהול נכסים להשקעה",
  medical: "למשל: רפואת משפחה, טיפולי שיניים, רפואה אסתטית",
  marketing: "למשל: שיווק דיגיטלי, ניהול מדיה חברתית, קמפיינים פרסומיים",
  retail: "למשל: מכירת מוצרי אופנה, אלקטרוניקה, מוצרי בית",
  tech: "למשל: פיתוח אפליקציות, שירותי ענן, פתרונות אבטחת מידע",
  other: "תאר את השירות המרכזי שאתה מספק ללקוחות שלך",
};

// Audience examples based on category
const audienceExamples: Record<string, Array<{ value: string; label: string }>> = {
  law: [
    { value: "individuals", label: "אנשים פרטיים" },
    { value: "businesses", label: "עסקים" },
    { value: "large_corporations", label: "חברות גדולות" },
    { value: "startups", label: "סטארט-אפים" },
    { value: "public_institutions", label: "מוסדות ציבוריים" },
    { value: "other", label: "אחר" },
  ],
  accounting: [
    { value: "small_businesses", label: "עסקים קטנים" },
    { value: "corporations", label: "חברות גדולות" },
    { value: "self_employed", label: "עצמאיים" },
    { value: "startups", label: "סטארט-אפים" },
    { value: "non_profit", label: "עמותות ומלכ\"רים" },
    { value: "other", label: "אחר" },
  ],
  therapy: [
    { value: "adults", label: "מבוגרים" },
    { value: "children", label: "ילדים ונוער" },
    { value: "couples", label: "זוגות" },
    { value: "families", label: "משפחות" },
    { value: "professionals", label: "אנשי מקצוע" },
    { value: "other", label: "אחר" },
  ],
  business: [
    { value: "startups", label: "סטארט-אפים" },
    { value: "small_businesses", label: "עסקים קטנים" },
    { value: "medium_businesses", label: "עסקים בינוניים" },
    { value: "large_businesses", label: "עסקים גדולים" },
    { value: "entrepreneurs", label: "יזמים" },
    { value: "other", label: "אחר" },
  ],
  design: [
    { value: "private", label: "לקוחות פרטיים" },
    { value: "commercial", label: "עסקים" },
    { value: "contractors", label: "קבלנים" },
    { value: "architects", label: "אדריכלים" },
    { value: "real_estate", label: "חברות נדל\"ן" },
    { value: "other", label: "אחר" },
  ],
  real_estate: [
    { value: "buyers", label: "רוכשים" },
    { value: "sellers", label: "מוכרים" },
    { value: "investors", label: "משקיעים" },
    { value: "renters", label: "שוכרים" },
    { value: "landlords", label: "בעלי נכסים" },
    { value: "other", label: "אחר" },
  ],
  medical: [
    { value: "patients", label: "מטופלים" },
    { value: "elderly", label: "קשישים" },
    { value: "children", label: "ילדים" },
    { value: "athletes", label: "ספורטאים" },
    { value: "chronic", label: "בעלי מחלות כרוניות" },
    { value: "other", label: "אחר" },
  ],
  marketing: [
    { value: "businesses", label: "עסקים" },
    { value: "startups", label: "סטארט-אפים" },
    { value: "agencies", label: "סוכנויות" },
    { value: "self_employed", label: "עצמאיים" },
    { value: "large_brands", label: "מותגים גדולים" },
    { value: "other", label: "אחר" },
  ],
  retail: [
    { value: "consumers", label: "צרכנים פרטיים" },
    { value: "businesses", label: "עסקים" },
    { value: "youth", label: "צעירים" },
    { value: "luxury", label: "שוק היוקרה" },
    { value: "budget", label: "שוק המחירים הנמוכים" },
    { value: "other", label: "אחר" },
  ],
  tech: [
    { value: "businesses", label: "עסקים" },
    { value: "enterprise", label: "ארגונים גדולים" },
    { value: "startups", label: "סטארט-אפים" },
    { value: "developers", label: "מפתחים" },
    { value: "consumers", label: "צרכנים פרטיים" },
    { value: "other", label: "אחר" },
  ],
  other: [
    { value: "general", label: "קהל כללי" },
    { value: "specific", label: "קהל ייעודי" },
    { value: "businesses", label: "עסקים" },
    { value: "individuals", label: "אנשים פרטיים" },
    { value: "other", label: "אחר" },
  ],
};

// Niche examples based on category
const nicheExamples: Record<string, string> = {
  law: "למשל: עורכי דין לגירושין לעולים, או התמחות בנושאי פטנטים",
  accounting: "למשל: ראיית חשבון למסעדות, או התמחות במיסוי בינלאומי",
  therapy: "למשל: טיפול CBT למבוגרים עם ADHD, או טיפול זוגי לזוגות בשלבי פרידה",
  business: "למשל: ייעוץ עסקי לחברות טכנולוגיה בתחילת דרכן, או ליווי לעסקים משפחתיים",
  design: "למשל: עיצוב משרדים לחברות סטארטאפ, או התמחות בעיצוב אקולוגי",
  real_estate: "למשל: מומחיות בנכסי יוקרה, או התמחות בנדל\"ן מסחרי באזורים ספציפיים",
  medical: "למשל: רפואה אסתטית לא פולשנית, או טיפולים ייחודיים לשחקני כדורגל",
  marketing: "למשל: שיווק דיגיטלי לחברות תיירות, או אסטרטגיות מיוחדות לחברות B2B",
  retail: "למשל: ביגוד מידות גדולות בלבד, או מוצרים אורגניים טבעיים",
  tech: "למשל: פיתוח אפליקציות לאוכלוסייה המבוגרת, או פתרונות אבטחה לתעשייה ספציפית",
  other: "למשל: תחום התמחות ספציפי או נישה ייחודית בענף שלך",
};

interface Step2Props {
  formData: {
    category: string;
    businessName: string;
    mainService: string;
    geographicArea: string;
    customGeographicArea: string;
    targetAudience: string;
    customTargetAudience: string;
    niche: string;
    website: string;
  };
  updateFormData: (data: any) => void;
}

const Step2BusinessDetails = ({ formData, updateFormData }: Step2Props) => {
  const [audienceOptions, setAudienceOptions] = useState<Array<{ value: string; label: string }>>([]);
  const [serviceExample, setServiceExample] = useState("");
  const [nicheExample, setNicheExample] = useState("");

  useEffect(() => {
    if (formData.category) {
      setAudienceOptions(audienceExamples[formData.category] || audienceExamples.other);
      setServiceExample(serviceExamples[formData.category] || serviceExamples.other);
      setNicheExample(nicheExamples[formData.category] || nicheExamples.other);
    } else {
      setAudienceOptions(audienceExamples.other);
      setServiceExample(serviceExamples.other);
      setNicheExample(nicheExamples.other);
    }
  }, [formData.category]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">מידע עסקי</h2>
      
      <HoogiTip tip="ספר לי על העסק שלך כדי שאוכל ליצור תוכן שמדבר אל קהל היעד הנכון." />
      
      <div className="space-y-6">
        <FormField
          id="businessName"
          label="שם העסק שלך"
          value={formData.businessName || ""}
          onChange={(value) => updateFormData({ businessName: value })}
          tooltip="השם הרשמי של העסק שלך כפי שמופיע במסמכים"
        />
        
        <FormField
          id="mainService"
          label="מה השירות המרכזי שלך?"
          type="textarea"
          value={formData.mainService || ""}
          onChange={(value) => updateFormData({ mainService: value })}
          tooltip="תאר את השירות העיקרי שאתה מציע ללקוחות שלך"
          showExamples={true}
          examples={serviceExample}
        />
        
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="targetAudience" className="text-base font-medium">
              מי קהל היעד שלך?
            </Label>
            <Tooltip content="בחר את קהל היעד העיקרי של העסק שלך" />
          </div>
          <Select
            value={formData.targetAudience}
            onValueChange={(value) => updateFormData({ targetAudience: value })}
          >
            <SelectTrigger id="targetAudience" className="w-full">
              <SelectValue placeholder="בחר קהל יעד" />
            </SelectTrigger>
            <SelectContent>
              {audienceOptions.map((audience) => (
                <SelectItem key={audience.value} value={audience.value}>
                  {audience.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {formData.targetAudience === "other" && (
          <FormField
            id="customTargetAudience"
            label="פרט את קהל היעד שלך"
            value={formData.customTargetAudience || ""}
            onChange={(value) => updateFormData({ customTargetAudience: value })}
            tooltip="תאר את קהל היעד העיקרי שלך"
          />
        )}
        
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="geographicArea" className="text-base font-medium">
              איפה העסק שלך פועל?
            </Label>
            <Tooltip content="בחר את האזור הגיאוגרפי שבו העסק שלך פעיל" />
          </div>
          <Select
            value={formData.geographicArea}
            onValueChange={(value) => updateFormData({ geographicArea: value })}
          >
            <SelectTrigger id="geographicArea" className="w-full">
              <SelectValue placeholder="בחר אזור" />
            </SelectTrigger>
            <SelectContent>
              {geographicAreas.map((area) => (
                <SelectItem key={area.value} value={area.value}>
                  {area.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {formData.geographicArea === "other" && (
          <FormField
            id="customGeographicArea"
            label="פרט את האזור הגאוגרפי"
            value={formData.customGeographicArea || ""}
            onChange={(value) => updateFormData({ customGeographicArea: value })}
            tooltip="תאר את האזור הגאוגרפי בו אתה פועל"
          />
        )}
        
        <FormField
          id="niche"
          label="האם יש לך נישה ייחודית או התמחות יוצאת דופן?"
          type="textarea"
          value={formData.niche || ""}
          onChange={(value) => updateFormData({ niche: value })}
          tooltip="התמחות ייחודית יכולה לעזור לך להתבלט בשוק"
          showExamples={true}
          examples={nicheExample}
        />
        
        <FormField
          id="website"
          label="כתובת אתר אינטרנט"
          value={formData.website || ""}
          onChange={(value) => updateFormData({ website: value })}
          tooltip="הכנס את כתובת האתר שלך, אם יש"
          hideVoice={true}
        />
      </div>
    </div>
  );
};

export default Step2BusinessDetails;
