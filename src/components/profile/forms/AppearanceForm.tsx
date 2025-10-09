
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import HoogiTip from "@/components/HoogiTip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AppearanceForm = () => {
  const [appearancePrefs, setAppearancePrefs] = useState({
    theme: "light",
    avatarStyle: "owl",
    colorScheme: "teal",
    direction: "rtl"
  });

  const handlePrefChange = (field: string, value: string) => {
    setAppearancePrefs({
      ...appearancePrefs,
      [field]: value
    });
  };

  const handleSaveAppearance = () => {
    toast.success("הגדרות המראה נשמרו בהצלחה");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex justify-center mb-8 space-x-6 rtl:space-x-reverse">
        <div className="text-center">
          <div className="mb-2">ברירת מחדל</div>
          <Avatar className="h-24 w-24 border-2 border-primary">
            <AvatarImage src="/placeholder.svg" alt="Avatar" />
            <AvatarFallback className="bg-primary text-2xl text-white">🦉</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="text-center">
          <div className="mb-2">הבחירה שלך</div>
          <Avatar className={`h-24 w-24 border-2 ${
            appearancePrefs.colorScheme === "teal" ? "border-primary" : 
            appearancePrefs.colorScheme === "purple" ? "border-purple-500" : 
            "border-blue-500"
          } animate-float`}>
            <AvatarImage src="/placeholder.svg" alt="Avatar" />
            <AvatarFallback className={`text-2xl text-white ${
              appearancePrefs.colorScheme === "teal" ? "bg-primary" : 
              appearancePrefs.colorScheme === "purple" ? "bg-purple-500" : 
              "bg-blue-500"
            }`}>
              {appearancePrefs.avatarStyle === "owl" ? "🦉" : 
               appearancePrefs.avatarStyle === "robot" ? "🤖" : 
               appearancePrefs.avatarStyle === "person" ? "👤" : "🦉"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label>ערכת נושא <HoogiTip tip="בחר את ערכת הנושא המועדפת עליך" /></Label>
          <RadioGroup 
            value={appearancePrefs.theme} 
            onValueChange={(value) => handlePrefChange("theme", value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="light" id="theme-light" />
              <Label htmlFor="theme-light" className="cursor-pointer">בהיר</Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="dark" id="theme-dark" />
              <Label htmlFor="theme-dark" className="cursor-pointer">כהה</Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="system" id="theme-system" />
              <Label htmlFor="theme-system" className="cursor-pointer">לפי הגדרות המערכת</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>אווטר <HoogiTip tip="בחר את סוג האווטר שיוצג במערכת" /></Label>
          <RadioGroup 
            value={appearancePrefs.avatarStyle} 
            onValueChange={(value) => handlePrefChange("avatarStyle", value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="owl" id="avatar-owl" />
              <Label htmlFor="avatar-owl" className="cursor-pointer">ינשוף 🦉</Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="robot" id="avatar-robot" />
              <Label htmlFor="avatar-robot" className="cursor-pointer">רובוט 🤖</Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="person" id="avatar-person" />
              <Label htmlFor="avatar-person" className="cursor-pointer">אדם 👤</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>סכמת צבעים <HoogiTip tip="בחר את צבעי המערכת" /></Label>
          <RadioGroup 
            value={appearancePrefs.colorScheme} 
            onValueChange={(value) => handlePrefChange("colorScheme", value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="teal" id="color-teal" />
              <Label htmlFor="color-teal" className="cursor-pointer flex items-center">
                טורקיז
                <span className="h-4 w-4 rounded-full bg-primary mr-1 rtl:ml-1"></span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="purple" id="color-purple" />
              <Label htmlFor="color-purple" className="cursor-pointer flex items-center">
                סגול
                <span className="h-4 w-4 rounded-full bg-purple-500 mr-1 rtl:ml-1"></span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="blue" id="color-blue" />
              <Label htmlFor="color-blue" className="cursor-pointer flex items-center">
                כחול
                <span className="h-4 w-4 rounded-full bg-blue-500 mr-1 rtl:ml-1"></span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>כיוון טקסט <HoogiTip tip="קבע את כיוון הטקסט בממשק" /></Label>
          <RadioGroup 
            value={appearancePrefs.direction} 
            onValueChange={(value) => handlePrefChange("direction", value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="rtl" id="dir-rtl" />
              <Label htmlFor="dir-rtl" className="cursor-pointer">ימין לשמאל (RTL) - עברית, ערבית</Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <RadioGroupItem value="ltr" id="dir-ltr" />
              <Label htmlFor="dir-ltr" className="cursor-pointer">שמאל לימין (LTR) - אנגלית, רוסית</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSaveAppearance}>שמור הגדרות מראה</Button>
      </div>
    </div>
  );
};

export default AppearanceForm;
