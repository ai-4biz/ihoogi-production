
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Save } from "lucide-react";

const ContentPrefsPane = () => {
  const [aiLevel, setAiLevel] = useState("balanced");
  const [autoSave, setAutoSave] = useState(true);
  const [defaultTone, setDefaultTone] = useState("friendly");
  const [maxLength, setMaxLength] = useState([350]);
  const [defaultLang, setDefaultLang] = useState("he");
  
  const handleSavePrefs = () => {
    toast({
      title: "הגדרות נשמרו",
      description: "העדפות התוכן נשמרו בהצלחה",
    });
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">העדפות תוכן</h2>
        <p className="text-gray-500">הגדרת העדפות ליצירת וניהול תוכן</p>
      </div>

      <div className="space-y-6">
        {/* AI Level */}
        <div className="space-y-2">
          <Label>רמת סיוע AI</Label>
          <RadioGroup value={aiLevel} onValueChange={setAiLevel} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="basic" id="basic" />
              <Label htmlFor="basic" className="mr-2">בסיסי - הצעות מינימליות</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="balanced" id="balanced" />
              <Label htmlFor="balanced" className="mr-2">מאוזן - סיוע חכם</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="creative" id="creative" />
              <Label htmlFor="creative" className="mr-2">יצירתי - הצעות מתקדמות</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Default Tone */}
        <div className="space-y-2">
          <Label>טון ברירת מחדל</Label>
          <Select value={defaultTone} onValueChange={setDefaultTone}>
            <SelectTrigger>
              <SelectValue placeholder="בחר טון ברירת מחדל" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">מקצועי</SelectItem>
              <SelectItem value="friendly">ידידותי</SelectItem>
              <SelectItem value="formal">רשמי</SelectItem>
              <SelectItem value="casual">יומיומי</SelectItem>
              <SelectItem value="enthusiastic">נלהב</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Default Language */}
        <div className="space-y-2">
          <Label>שפת ברירת מחדל</Label>
          <Select value={defaultLang} onValueChange={setDefaultLang}>
            <SelectTrigger>
              <SelectValue placeholder="בחר שפת ברירת מחדל" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="he">עברית</SelectItem>
              <SelectItem value="en">אנגלית</SelectItem>
              <SelectItem value="ar">ערבית</SelectItem>
              <SelectItem value="ru">רוסית</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Max Content Length */}
        <div className="space-y-4">
          <Label>אורך מקסימלי לתוכן: {maxLength} תווים</Label>
          <Slider
            value={maxLength}
            onValueChange={setMaxLength}
            max={1000}
            min={50}
            step={10}
          />
        </div>

        {/* Auto Save Toggle */}
        <div className="flex items-center justify-between">
          <Label>שמירה אוטומטית</Label>
          <Switch checked={autoSave} onCheckedChange={setAutoSave} />
        </div>

        {/* Hashtags */}
        <div className="space-y-2">
          <Label>תגיות ברירת מחדל (מופרדות בפסיקים)</Label>
          <Input placeholder="#business, #marketing, #sales" />
        </div>

        <Button onClick={handleSavePrefs} className="w-full">
          <Save className="ml-2 h-4 w-4" />
          שמירת העדפות
        </Button>
      </div>
    </Card>
  );
};

export default ContentPrefsPane;
