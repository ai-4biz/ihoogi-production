
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import HoogiTip from "@/components/HoogiTip";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, PlusCircle, X } from "lucide-react";

const ContentPreferencesForm = () => {
  const [contentPrefs, setContentPrefs] = useState({
    language: "hebrew",
    tone: "professional",
    values: [] as string[],
    customValue: "",
    socialProfiles: [] as {type: string, url: string}[],
    newSocialType: "",
    newSocialUrl: "",
    favoritePhrase: "",
    blogSources: "",
    businessStory: ""
  });

  const handlePrefChange = (field: string, value: any) => {
    setContentPrefs({
      ...contentPrefs,
      [field]: value
    });
  };

  const handleValueToggle = (value: string) => {
    const currentValues = [...contentPrefs.values];
    if (currentValues.includes(value)) {
      handlePrefChange("values", currentValues.filter(v => v !== value));
    } else {
      handlePrefChange("values", [...currentValues, value]);
    }
  };

  const handleSavePreferences = () => {
    toast.success("העדפות התוכן נשמרו בהצלחה");
  };

  const valueOptions = [
    { id: "reliability", label: "אמינות" },
    { id: "professionalism", label: "מקצועיות" },
    { id: "support", label: "ליווי צמוד" },
    { id: "transparency", label: "שקיפות" },
    { id: "creativity", label: "יצירתיות" },
    { id: "innovation", label: "חדשנות" },
    { id: "tradition", label: "מסורת" },
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="language">שפת תוכן <HoogiTip tip="השפה שבה יווצר התוכן" /></Label>
          <Select 
            value={contentPrefs.language} 
            onValueChange={(value) => handlePrefChange("language", value)}
          >
            <SelectTrigger id="language">
              <SelectValue placeholder="בחר שפה" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="hebrew">עברית</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="arabic">العربية</SelectItem>
                <SelectItem value="russian">Русский</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tone">טון תוכן <HoogiTip tip="הסגנון שבו יכתב התוכן" /></Label>
          <Select 
            value={contentPrefs.tone} 
            onValueChange={(value) => handlePrefChange("tone", value)}
          >
            <SelectTrigger id="tone">
              <SelectValue placeholder="בחר טון" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="professional">מקצועי</SelectItem>
                <SelectItem value="friendly">ידידותי</SelectItem>
                <SelectItem value="formal">רשמי</SelectItem>
                <SelectItem value="casual">אישי וקליל</SelectItem>
                <SelectItem value="humorous">הומוריסטי</SelectItem>
                <SelectItem value="educational">חינוכי</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3 md:col-span-2">
          <Label>ערכים מובילים <HoogiTip tip="הערכים שהעסק שלך מייצג" /></Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {valueOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox 
                  id={option.id}
                  checked={contentPrefs.values.includes(option.id)}
                  onCheckedChange={() => handleValueToggle(option.id)}
                />
                <Label htmlFor={option.id} className="cursor-pointer">{option.label}</Label>
              </div>
            ))}
            <div className="flex items-center space-x-2 rtl:space-x-reverse col-span-2">
              <Input 
                placeholder="ערך אחר..."
                value={contentPrefs.customValue}
                onChange={(e) => handlePrefChange("customValue", e.target.value)}
                className="w-full"
              />
              <Button 
                type="button" 
                onClick={() => {
                  if (contentPrefs.customValue.trim()) {
                    handleValueToggle(contentPrefs.customValue.trim());
                    handlePrefChange("customValue", "");
                  }
                }}
                variant="outline"
                size="sm"
              >
                הוסף
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="favoritePhrase">ביטוי או משפט אהוב <HoogiTip tip="ביטוי שאוהבים להשתמש בו בתוכן" /></Label>
          <Input 
            id="favoritePhrase" 
            value={contentPrefs.favoritePhrase} 
            onChange={(e) => handlePrefChange("favoritePhrase", e.target.value)} 
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="businessStory">הסיפור האישי שלי בבניית העסק</Label>
          <div className="relative">
            <Textarea 
              id="businessStory" 
              value={contentPrefs.businessStory} 
              onChange={(e) => handlePrefChange("businessStory", e.target.value)} 
              rows={4}
              placeholder="ספר/י את הסיפור האישי שלך בבניית העסק"
              className="pr-10"
            />
            <Button 
              type="button" 
              size="icon" 
              variant="ghost" 
              className="absolute right-2 top-2"
              onClick={() => toast.info("הקלטה תהיה זמינה בקרוב")}
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSavePreferences}>שמור העדפות</Button>
      </div>
    </div>
  );
};

export default ContentPreferencesForm;
