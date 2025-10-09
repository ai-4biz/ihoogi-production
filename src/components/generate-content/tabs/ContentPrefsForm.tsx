
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/hooks/use-toast";
import HoogiTip from "@/components/HoogiTip";

const ContentPrefsForm = () => {
  const [targetNetwork, setTargetNetwork] = useState("facebook");
  const [contentLength, setContentLength] = useState([400]);
  const [contentTone, setContentTone] = useState("professional");
  const [callToAction, setCallToAction] = useState("contact");
  const [hashtags, setHashtags] = useState("");
  
  const handleSavePreferences = () => {
    // Save to localStorage for now
    localStorage.setItem("contentPrefs", JSON.stringify({
      targetNetwork,
      contentLength: contentLength[0],
      contentTone,
      callToAction,
      hashtags: hashtags.split(",").map(tag => tag.trim()).filter(Boolean)
    }));
    
    toast({
      title: "העדפות נשמרו",
      description: "העדפות התוכן שלך נשמרו בהצלחה"
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-lg font-medium mb-4">מאפייני תוכן</div>
      
      <Card className="p-6 space-y-6">
        {/* Target Network */}
        <div className="space-y-3">
          <Label className="text-base flex items-center">
            רשת יעד
            <HoogiTip tip="בחר רשת חברתית להפצת התוכן" />
          </Label>
          
          <RadioGroup 
            value={targetNetwork} 
            onValueChange={setTargetNetwork}
            className="flex flex-wrap gap-4"
          >
            {[
              { value: "facebook", label: "Facebook" },
              { value: "linkedin", label: "LinkedIn" },
              { value: "blog", label: "Blog" },
              { value: "email", label: "Email" }
            ].map(option => (
              <div key={option.value} className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        {/* Content Length */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <Label className="text-base flex items-center">
              אורך מבוקש
              <HoogiTip tip="בחר את אורך התוכן הרצוי" />
            </Label>
            <span className="text-sm font-medium">{contentLength[0]} תווים</span>
          </div>
          
          <Slider
            value={contentLength}
            onValueChange={setContentLength}
            min={50}
            max={800}
            step={10}
            className="w-full"
          />
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>קצר (50)</span>
            <span>בינוני (400)</span>
            <span>ארוך (800)</span>
          </div>
        </div>
        
        {/* Tone Selection */}
        <div className="space-y-3">
          <Label className="text-base flex items-center">
            טון
            <HoogiTip tip="בחר את הטון הכללי של התוכן" />
          </Label>
          
          <ToggleGroup 
            type="single" 
            value={contentTone} 
            onValueChange={(value) => value && setContentTone(value)}
            className="flex flex-wrap justify-start gap-2"
          >
            {[
              { value: "professional", label: "מקצועי" },
              { value: "friendly", label: "ידידותי" },
              { value: "humorous", label: "מצחיק" },
              { value: "inspirational", label: "השראתי" }
            ].map(tone => (
              <ToggleGroupItem
                key={tone.value}
                value={tone.value}
                className={`px-3 py-1 rounded-full text-sm ${
                  contentTone === tone.value 
                    ? "bg-primary text-white" 
                    : "bg-gray-100"
                }`}
              >
                {tone.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        
        {/* Call to Action */}
        <div className="space-y-3">
          <Label className="text-base flex items-center">
            קריאה לפעולה
            <HoogiTip tip="בחר את הקריאה לפעולה בסוף התוכן" />
          </Label>
          
          <RadioGroup 
            value={callToAction} 
            onValueChange={setCallToAction}
            className="flex flex-wrap gap-4"
          >
            {[
              { value: "buy", label: "קנה עכשיו" },
              { value: "register", label: "הירשם" },
              { value: "contact", label: "קבע שיחה" }
            ].map(option => (
              <div key={option.value} className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value={option.value} id={`cta-${option.value}`} />
                <Label htmlFor={`cta-${option.value}`} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        {/* Hashtags */}
        <div className="space-y-3">
          <Label className="text-base flex items-center">
            תגיות HashTag (אופציונלי)
            <HoogiTip tip="הוסף תגיות מופרדות בפסיקים" />
          </Label>
          
          <Input 
            placeholder="הכנס תגיות מופרדות בפסיקים, לדוגמה: #תוכן, #שיווק, #עסקים"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          />
          <p className="text-sm text-gray-500">
            הזן תגיות מופרדות בפסיקים
          </p>
        </div>
        
        <Button onClick={handleSavePreferences} className="w-full">
          שמור העדפות
        </Button>
      </Card>
    </div>
  );
};

export default ContentPrefsForm;
