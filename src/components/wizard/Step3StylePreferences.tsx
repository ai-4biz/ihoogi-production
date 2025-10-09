import { useState } from "react";
import FormField from "@/components/FormField";
import HoogiTip from "@/components/HoogiTip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X, Trash } from "lucide-react";
import Tooltip from "@/components/Tooltip";

interface Step3Props {
  formData: {
    language: string;
    differentiator: string;
    values: string[];
    customValue: string;
    feeling: string;
    favoritePhrase: string;
    blogs: string;
    socialProfiles: Array<{
      platform: string;
      handle: string;
    }>;
  };
  updateFormData: (data: any) => void;
}

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
  { value: "innovation", label: "חדשנות" },
  { value: "quality", label: "איכות" },
  { value: "service", label: "שירות" },
  { value: "personalization", label: "התאמה אישית" },
  { value: "other", label: "אחר" },
];

const feelingOptions = [
  { value: "confidence", label: "ביטחון" },
  { value: "inspiration", label: "השראה" },
  { value: "calm", label: "רוגע" },
  { value: "excitement", label: "התרגשות" },
  { value: "relief", label: "הקלה" },
  { value: "trust", label: "אמון" },
  { value: "curiosity", label: "סקרנות" },
  { value: "hope", label: "תקווה" },
  { value: "other", label: "אחר" },
];

const socialPlatforms = [
  { value: "facebook", label: "פייסבוק" },
  { value: "instagram", label: "אינסטגרם" },
  { value: "linkedin", label: "לינקדאין" },
  { value: "twitter", label: "טוויטר/X" },
  { value: "tiktok", label: "טיקטוק" },
  { value: "youtube", label: "יוטיוב" },
  { value: "pinterest", label: "פינטרסט" },
  { value: "other", label: "אחר" },
];

const Step3StylePreferences = ({ formData, updateFormData }: Step3Props) => {
  const [customLanguage, setCustomLanguage] = useState("");
  const [newSocialProfile, setNewSocialProfile] = useState({
    platform: "",
    handle: ""
  });

  const addSocialProfile = () => {
    if (newSocialProfile.platform && newSocialProfile.handle) {
      const updatedProfiles = [...(formData.socialProfiles || []), { ...newSocialProfile }];
      updateFormData({ socialProfiles: updatedProfiles });
      setNewSocialProfile({ platform: "", handle: "" });
    }
  };

  const removeSocialProfile = (index: number) => {
    const updatedProfiles = [...(formData.socialProfiles || [])];
    updatedProfiles.splice(index, 1);
    updateFormData({ socialProfiles: updatedProfiles });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">ערכים, ייחוד וקישורים</h2>
      
      <HoogiTip tip="ביחד נבנה את האישיות של העסק שלך, עם הערכים והמסרים שחשובים לך." />
      
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="language" className="text-base font-medium">
                באיזו שפה תרצה שנכתוב עבורך?
              </Label>
              <Tooltip content="בחר את השפה העיקרית בה יופיעו התכנים שלך" />
            </div>
            <Select
              value={formData.language}
              onValueChange={(value) => {
                updateFormData({ language: value });
                if (value !== "other") {
                  setCustomLanguage("");
                }
              }}
            >
              <SelectTrigger id="language" className="w-full">
                <SelectValue placeholder="בחר שפה" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {formData.language === "other" && (
            <FormField
              id="customLanguage"
              label="פרט איזו שפה"
              value={customLanguage}
              onChange={(value) => setCustomLanguage(value)}
              tooltip="ציין את השפה הספציפית בה תרצה שנכתוב עבורך"
            />
          )}
        </div>
        
        <FormField
          id="differentiator"
          label="מה מבדל אותך מעסקים אחרים בתחום שלך?"
          type="textarea"
          value={formData.differentiator || ""}
          onChange={(value) => updateFormData({ differentiator: value })}
          tooltip='למשל: "יחס אישי", "שירות זמין 24/7", "תהליך קצר וממוקד"'
        />
        
        <div className="space-y-2">
          <div className="flex items-center">
            <Label className="text-base font-medium">
              מהם הערכים שהכי חשובים לך בעסק?
            </Label>
            <Tooltip content="בחר ערכים שמייצגים את העסק שלך" />
          </div>
          <FormField
            id="values"
            label="ערכים חשובים"
            type="checkbox"
            options={valueOptions}
            value={formData.values || []}
            onChange={(selectedValues) => {
              updateFormData({ values: selectedValues });
            }}
            className=""
            hideVoice={true}
          />
        </div>
        
        {(formData.values || []).includes("other") && (
          <FormField
            id="customValue"
            label="פרט ערך נוסף"
            value={formData.customValue || ""}
            onChange={(value) => updateFormData({ customValue: value })}
            tooltip="ציין ערך נוסף החשוב לך בעסק"
          />
        )}
        
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="feeling" className="text-base font-medium">
              מה היית רוצה שהלקוחות ירגישו כשהם נחשפים לתוכן שלך?
            </Label>
            <Tooltip content="בחר את התחושה העיקרית שתרצה להעביר ללקוחות שלך" />
          </div>
          <Select
            value={formData.feeling || ""}
            onValueChange={(value) => updateFormData({ feeling: value })}
          >
            <SelectTrigger id="feeling" className="w-full">
              <SelectValue placeholder="בחר תחושה" />
            </SelectTrigger>
            <SelectContent>
              {feelingOptions.map((feeling) => (
                <SelectItem key={feeling.value} value={feeling.value}>
                  {feeling.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <FormField
          id="favoritePhrase"
          label="משפט שאתה מאמין בו או אומר ללקוחות לעיתים קרובות?"
          value={formData.favoritePhrase || ""}
          onChange={(value) => updateFormData({ favoritePhrase: value })}
          tooltip='למשל: "אין דבר כזה אי אפשר"'
        />
        
        <FormField
          id="blogs"
          label="האם יש לך בלוגים או מקורות מידע שנוכל לשלב?"
          type="textarea"
          value={formData.blogs || ""}
          onChange={(value) => updateFormData({ blogs: value })}
          tooltip="הזן כתובות אתרים, בלוגים או מקורות מידע שתרצה שנשלב"
        />
        
        <div className="space-y-4">
          <div className="flex items-center">
            <Label className="text-base font-medium">
              האם יש לך קישורים חשובים לפרופילים חברתיים?
            </Label>
            <Tooltip content="הוסף את הפרופילים החברתיים של העסק שלך" />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Select
              value={newSocialProfile.platform}
              onValueChange={(value) => setNewSocialProfile({
                ...newSocialProfile,
                platform: value
              })}
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="בחר רשת חברתית" />
              </SelectTrigger>
              <SelectContent>
                {socialPlatforms.map((platform) => (
                  <SelectItem key={platform.value} value={platform.value}>
                    {platform.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <input
              type="text"
              value={newSocialProfile.handle}
              onChange={(e) => setNewSocialProfile({
                ...newSocialProfile,
                handle: e.target.value
              })}
              placeholder="כתובת או שם משתמש"
              className="flex-1 h-10 rounded-md border border-input px-3 py-2 text-sm"
            />
            
            <Button 
              type="button" 
              onClick={addSocialProfile} 
              size="icon"
              variant="outline"
              disabled={!newSocialProfile.platform || !newSocialProfile.handle}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {(formData.socialProfiles || []).length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">פרופילים שהוספת:</p>
              <div className="space-y-2">
                {formData.socialProfiles.map((profile, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                    <div>
                      <span className="font-medium">
                        {socialPlatforms.find(p => p.value === profile.platform)?.label || profile.platform}:
                      </span>
                      <span className="ml-2">{profile.handle}</span>
                    </div>
                    <Button 
                      type="button" 
                      onClick={() => removeSocialProfile(index)} 
                      size="icon" 
                      variant="ghost"
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Step3StylePreferences;
