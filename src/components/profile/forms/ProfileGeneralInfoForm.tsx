
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HoogiTip from "@/components/HoogiTip";
import { Phone, Mail } from "lucide-react";
import { toast } from "sonner";

interface ProfileGeneralInfoFormProps {
  onSave: () => void;
}

const ProfileGeneralInfoForm = ({ onSave }: ProfileGeneralInfoFormProps) => {
  const [formData, setFormData] = useState({
    phone: "",
    whatsapp: "",
    email: "",
    mainCategory: "",
    subCategory: "",
    mainService: "",
  });

  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // Check if all required fields are filled
    const requiredFields = ['phone', 'email', 'mainCategory', 'subCategory', 'mainService'];
    setAllFieldsFilled(requiredFields.every(field => newFormData[field as keyof typeof newFormData]));
  };

  const copyPhoneToWhatsApp = () => {
    if (formData.phone) {
      setFormData(prev => ({ ...prev, whatsapp: prev.phone }));
      toast.success("מספר הטלפון הועתק לוואטסאפ");
    } else {
      toast.error("אנא הזן מספר טלפון תחילה");
    }
  };

  const handleContinue = () => {
    if (allFieldsFilled) {
      onSave();
    } else {
      toast.error("נשארו שדות חובה לסיום");
    }
  };

  // Mock data for categories
  const categories = [
    "מטפלים ומאמנים",
    "ייעוץ",
    "עריכת-דין",
    "ביטוח",
    "קוסמטיקה",
    "אחר"
  ];

  // Dynamic subcategories based on main category
  const getSubcategories = (mainCategory: string) => {
    switch (mainCategory) {
      case "עריכת-דין":
        return ["מסחרי", "נדל\"ן", "דיני משפחה", "אחר"];
      case "מטפלים ומאמנים":
        return ["NLP", "קואצ'ינג", "פסיכולוגיה", "אחר"];
      case "ייעוץ":
        return ["עסקי", "כלכלי", "אישי", "אחר"];
      case "ביטוח":
        return ["חיים", "בריאות", "רכב", "דירה", "אחר"];
      case "קוסמטיקה":
        return ["טיפולי פנים", "טיפולי גוף", "מניקור", "אחר"];
      default:
        return ["אחר"];
    }
  };

  // Dynamic services based on subcategory
  const getServices = (subCategory: string) => {
    switch (subCategory) {
      case "מסחרי":
        return ["חוזים", "שותפויות", "ייעוץ משפטי", "אחר"];
      case "נדל\"ן":
        return ["מכירה/קנייה", "שכירות", "תמ\"א 38", "אחר"];
      default:
        return ["שירות 1", "שירות 2", "שירות 3", "אחר"];
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="phone" className="text-base">מספר טלפון <span className="text-red-500">*</span></Label>
            <HoogiTip tip="מספר הטלפון ישמש ליצירת קשר מהיר" />
          </div>
          <div className="flex items-center gap-2">
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              prefixIcon={<Phone className="h-4 w-4 text-gray-500" />}
              placeholder="050-0000000"
              className="flex-1"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="whatsapp" className="text-base">מספר WhatsApp <span className="text-red-500">*</span></Label>
            <HoogiTip tip="מספר הוואטסאפ ישמש לשליחת הודעות מהירות" />
          </div>
          <div className="flex items-center gap-2">
            <Input
              id="whatsapp"
              value={formData.whatsapp}
              onChange={(e) => handleInputChange("whatsapp", e.target.value)}
              placeholder="050-0000000"
              className="flex-1"
              required
            />
            <Button size="sm" variant="outline" onClick={copyPhoneToWhatsApp} type="button">
              העתק מטלפון
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="email" className="text-base">אימייל <span className="text-red-500">*</span></Label>
            <HoogiTip tip="כתובת המייל תשמש לכניסה למערכת ולקבלת התראות" />
          </div>
          <div className="flex items-center gap-2">
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              prefixIcon={<Mail className="h-4 w-4 text-gray-500" />}
              placeholder="your@email.com"
              className="flex-1"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="mainCategory" className="text-base">קטגוריה ראשית <span className="text-red-500">*</span></Label>
            <HoogiTip tip="בחר את הקטגוריה המתאימה ביותר לעסק שלך" />
          </div>
          <Select
            value={formData.mainCategory}
            onValueChange={(value) => handleInputChange("mainCategory", value)}
          >
            <SelectTrigger id="mainCategory">
              <SelectValue placeholder="בחר קטגוריה" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formData.mainCategory === "אחר" && (
            <Input
              placeholder="הזן קטגוריה מותאמת אישית"
              className="mt-2"
              onChange={(e) => handleInputChange("customMainCategory", e.target.value)}
            />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="subCategory" className="text-base">תת-קטגוריה <span className="text-red-500">*</span></Label>
            <HoogiTip tip="בחר את התת-קטגוריה המתאימה לעסק שלך" />
          </div>
          <Select
            value={formData.subCategory}
            onValueChange={(value) => handleInputChange("subCategory", value)}
            disabled={!formData.mainCategory}
          >
            <SelectTrigger id="subCategory">
              <SelectValue placeholder={formData.mainCategory ? "בחר תת-קטגוריה" : "בחר קטגוריה ראשית תחילה"} />
            </SelectTrigger>
            <SelectContent>
              {formData.mainCategory && getSubcategories(formData.mainCategory).map((subcategory) => (
                <SelectItem key={subcategory} value={subcategory}>
                  {subcategory}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formData.subCategory === "אחר" && (
            <Input
              placeholder="הזן תת-קטגוריה מותאמת אישית"
              className="mt-2"
              onChange={(e) => handleInputChange("customSubCategory", e.target.value)}
            />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="mainService" className="text-base">סוג שירות עיקרי <span className="text-red-500">*</span></Label>
            <HoogiTip tip="בחר את השירות העיקרי שאתה מספק" />
          </div>
          <Select
            value={formData.mainService}
            onValueChange={(value) => handleInputChange("mainService", value)}
            disabled={!formData.subCategory}
          >
            <SelectTrigger id="mainService">
              <SelectValue placeholder={formData.subCategory ? "בחר שירות עיקרי" : "בחר תת-קטגוריה תחילה"} />
            </SelectTrigger>
            <SelectContent>
              {formData.subCategory && getServices(formData.subCategory).map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formData.mainService === "אחר" && (
            <Input
              placeholder="הזן שירות מותאם אישית"
              className="mt-2"
              onChange={(e) => handleInputChange("customMainService", e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleContinue} 
          disabled={!allFieldsFilled}
          className="min-w-[180px]"
        >
          המשך לשאלות מתקדמות
        </Button>
      </div>
    </div>
  );
};

export default ProfileGeneralInfoForm;
