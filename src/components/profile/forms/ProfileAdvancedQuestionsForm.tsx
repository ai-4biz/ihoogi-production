
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import HoogiTip from "@/components/HoogiTip";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ProfileAdvancedQuestionsFormProps {
  onSave: () => void;
}

const ProfileAdvancedQuestionsForm = ({ onSave }: ProfileAdvancedQuestionsFormProps) => {
  const [formData, setFormData] = useState({
    uniqueness: "",
    targetAudience: [] as string[],
    coreValue: "",
    communicationTone: "professional",
    callToAction: "",
    tagline: "",
  });

  const [customAudienceInput, setCustomAudienceInput] = useState("");
  
  // Count how many questions have been answered
  const answeredQuestions = Object.values(formData).filter(value => 
    Array.isArray(value) ? value.length > 0 : value !== ""
  ).length;
  
  const totalQuestions = 6;

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const addCustomAudience = () => {
    if (customAudienceInput.trim() && !formData.targetAudience.includes(customAudienceInput.trim())) {
      handleInputChange("targetAudience", [...formData.targetAudience, customAudienceInput.trim()]);
      setCustomAudienceInput("");
    }
  };
  
  const removeAudienceTag = (tag: string) => {
    handleInputChange("targetAudience", formData.targetAudience.filter(t => t !== tag));
  };

  const audiencePresets = [
    "נשים 25-40", 
    "גברים 30-55", 
    "בעלי עסקים", 
    "הורים", 
    "משפחות", 
    "B2B", 
    "B2C"
  ];

  const coreValueOptions = [
    "מקצועיות", 
    "אמון", 
    "חדשנות", 
    "יחס אישי", 
    "מחיר משתלם", 
    "זמינות", 
    "אחר"
  ];

  const toneOptions = [
    { value: "professional", label: "מקצועי" },
    { value: "friendly", label: "ידידותי" },
    { value: "humorous", label: "הומוריסטי" },
    { value: "inspirational", label: "השראתי" }
  ];

  const ctaOptions = [
    "קבעו שיחה",
    "הורד מדריך חינם",
    "קנה עכשיו",
    "הירשם לניוזלטר",
    "צור קשר",
    "פנה אלינו",
    "אחר"
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-blue-50 p-3 rounded-lg mb-6">
        <p className="text-sm text-blue-800">
          שאלות אלה אינן חובה, אך מענה עליהן יעזור לנו לייצר תוכן מדויק יותר עבורך. 
          ענית על {answeredQuestions} מתוך {totalQuestions} שאלות.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="uniqueness" className="text-base">במה העסק שלך ייחודי?</Label>
            <HoogiTip tip="הדגש בידול – זה הופך פוסט לבלתי-נשכח" />
          </div>
          <Textarea
            id="uniqueness"
            value={formData.uniqueness}
            onChange={(e) => handleInputChange("uniqueness", e.target.value)}
            placeholder="תאר במה העסק שלך שונה מהמתחרים"
            className="resize-none"
            rows={3}
            maxLength={280}
          />
          <div className="text-xs text-right text-gray-500">
            {formData.uniqueness.length}/280 תווים
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="targetAudience" className="text-base">מי קהל היעד הטיפוסי?</Label>
            <HoogiTip tip="בחר מהרשימה או הוסף קהלי יעד מותאמים אישית" />
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {audiencePresets.map(preset => (
              <Button
                key={preset}
                type="button"
                size="sm"
                variant={formData.targetAudience.includes(preset) ? "default" : "outline"}
                onClick={() => {
                  if (formData.targetAudience.includes(preset)) {
                    removeAudienceTag(preset);
                  } else {
                    handleInputChange("targetAudience", [...formData.targetAudience, preset]);
                  }
                }}
              >
                {preset}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <Input
              value={customAudienceInput}
              onChange={(e) => setCustomAudienceInput(e.target.value)}
              placeholder="הוסף קהל יעד מותאם אישית"
              className="flex-1"
            />
            <Button type="button" variant="outline" onClick={addCustomAudience}>
              הוסף
            </Button>
          </div>
          
          {formData.targetAudience.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.targetAudience.map(tag => (
                <Badge key={tag} variant="secondary" className="flex gap-1 items-center">
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => removeAudienceTag(tag)}
                    className="ml-1 text-xs rounded-full hover:bg-gray-200 h-4 w-4 inline-flex items-center justify-center"
                    aria-label="Remove tag"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="coreValue" className="text-base">מהו ערך-הליבה של השירות?</Label>
            <HoogiTip tip="הערך המרכזי שהלקוחות שלך מקבלים" />
          </div>
          <Select
            value={formData.coreValue}
            onValueChange={(value) => handleInputChange("coreValue", value)}
          >
            <SelectTrigger id="coreValue">
              <SelectValue placeholder="בחר ערך ליבה" />
            </SelectTrigger>
            <SelectContent>
              {coreValueOptions.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formData.coreValue === "אחר" && (
            <Input
              placeholder="הזן ערך ליבה מותאם אישית"
              className="mt-2"
              onChange={(e) => handleInputChange("customCoreValue", e.target.value)}
            />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="text-base">טון תקשורת מועדף</Label>
            <HoogiTip tip="הטון שישמש כברירת מחדל בתוכן שייווצר עבורך" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {toneOptions.map((tone) => (
              <Button
                key={tone.value}
                type="button"
                variant={formData.communicationTone === tone.value ? "default" : "outline"}
                className="justify-center"
                onClick={() => handleInputChange("communicationTone", tone.value)}
              >
                {tone.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="callToAction" className="text-base">קריאה לפעולה קבועה</Label>
            <HoogiTip tip="מה תרצה שהלקוחות יעשו לאחר קריאת התוכן שלך" />
          </div>
          <Select
            value={formData.callToAction}
            onValueChange={(value) => handleInputChange("callToAction", value)}
          >
            <SelectTrigger id="callToAction">
              <SelectValue placeholder="בחר קריאה לפעולה" />
            </SelectTrigger>
            <SelectContent>
              {ctaOptions.map((cta) => (
                <SelectItem key={cta} value={cta}>
                  {cta}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formData.callToAction === "אחר" && (
            <Input
              placeholder="הזן קריאה לפעולה מותאמת אישית"
              className="mt-2"
              onChange={(e) => handleInputChange("customCallToAction", e.target.value)}
            />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="tagline" className="text-base">משפט מחץ אישי</Label>
            <HoogiTip tip="משפט מחץ שיופיע בסוף כל פוסט" />
          </div>
          <Input
            id="tagline"
            value={formData.tagline}
            onChange={(e) => handleInputChange("tagline", e.target.value)}
            placeholder="משפט מחץ קצר וקולע"
            maxLength={80}
          />
          <div className="text-xs text-right text-gray-500">
            {formData.tagline.length}/80 תווים
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={onSave} className="min-w-[180px]">
          שמור שינויים
        </Button>
      </div>
    </div>
  );
};

export default ProfileAdvancedQuestionsForm;
