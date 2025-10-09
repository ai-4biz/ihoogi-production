
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import FormField from "@/components/FormField";

interface GeneralSettingsProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  useInspiration: boolean;
  setUseInspiration: (value: boolean) => void;
}

const GeneralSettings = ({
  selectedCategory,
  setSelectedCategory,
  language,
  setLanguage,
  useInspiration,
  setUseInspiration
}: GeneralSettingsProps) => {
  const navigate = useNavigate();
  
  // Mock categories
  const contentCategories = [
    { value: 'health', label: 'בריאות' },
    { value: 'finance', label: 'פיננסים' },
    { value: 'tech', label: 'טכנולוגיה' },
    { value: 'education', label: 'חינוך' },
    { value: 'lifestyle', label: 'סגנון חיים' }
  ];

  // Languages
  const languages = [
    { value: 'he', label: 'עברית' },
    { value: 'en', label: 'אנגלית' },
    { value: 'ar', label: 'ערבית' },
    { value: 'ru', label: 'רוסית' }
  ];
  
  const browseInspirationArticles = () => {
    navigate('/select-inspiration');
  };
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">📝 הגדרות כלליות</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="content-category"
          label="קטגוריית תוכן"
          type="select"
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={contentCategories}
          tooltip="בחרי את הקטגוריה המתאימה לתוכן שלך"
        />
        
        <FormField
          id="language"
          label="שפה"
          type="select"
          value={language}
          onChange={setLanguage}
          options={languages}
          tooltip="בחרי את השפה בה תרצי ליצור את התוכן"
        />
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Switch 
            id="use-inspiration" 
            checked={useInspiration} 
            onCheckedChange={setUseInspiration}
          />
          <Label htmlFor="use-inspiration">השתמשי במאמרי השראה?</Label>
        </div>
        
        {useInspiration && (
          <Button 
            onClick={browseInspirationArticles} 
            className="bg-primary text-white"
          >
            📚 צפייה במאמרים
          </Button>
        )}
      </div>
    </div>
  );
};

export default GeneralSettings;
