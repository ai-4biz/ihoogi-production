
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HoogiTip from "@/components/HoogiTip";
import BusinessForm from "./forms/BusinessForm";
import ContentPreferencesForm from "./forms/ContentPreferencesForm";
import AppearanceForm from "./forms/AppearanceForm";
import NotificationsForm from "./forms/NotificationsForm";
import BillingForm from "./forms/BillingForm";

interface ProfileQuestionnaireSectionProps {
  sectionId: string;
}

const ProfileQuestionnaireSection = ({ sectionId }: ProfileQuestionnaireSectionProps) => {
  const [personalData, setPersonalData] = useState({
    firstName: "אורחת",
    lastName: "",
    email: "",
    phone: "",
    language: "hebrew",
    bio: "",
  });

  const handlePersonalDataChange = (field: string, value: string) => {
    setPersonalData({
      ...personalData,
      [field]: value
    });
  };

  const handleSavePersonalData = () => {
    // In a real app, this would save to a backend
    toast.success("הפרטים נשמרו בהצלחה");
  };

  // Render the appropriate section based on sectionId
  switch(sectionId) {
    case "personal":
      return (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Avatar className="h-28 w-28 border-2 border-primary animate-float">
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback className="bg-primary text-2xl text-white">
                  {personalData.firstName.substring(0, 1) || "U"}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute bottom-0 right-0 rounded-full" 
                onClick={() => toast.info("עדיין לא יושם")}
              >
                שינוי
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">שם פרטי <HoogiTip tip="השם שיוצג בפרופיל שלך" /></Label>
              <Input 
                id="firstName" 
                value={personalData.firstName} 
                onChange={(e) => handlePersonalDataChange("firstName", e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">שם משפחה <HoogiTip tip="השם שיוצג בפרופיל שלך" /></Label>
              <Input 
                id="lastName" 
                value={personalData.lastName} 
                onChange={(e) => handlePersonalDataChange("lastName", e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">דוא"ל <HoogiTip tip="המייל שישמש לכניסה ולהתראות" /></Label>
              <Input 
                id="email" 
                type="email"
                value={personalData.email} 
                onChange={(e) => handlePersonalDataChange("email", e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">טלפון <HoogiTip tip="מספר טלפון ליצירת קשר" /></Label>
              <Input 
                id="phone" 
                value={personalData.phone} 
                onChange={(e) => handlePersonalDataChange("phone", e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">שפה מועדפת <HoogiTip tip="השפה בה תוצג המערכת" /></Label>
              <Select 
                value={personalData.language} 
                onValueChange={(value) => handlePersonalDataChange("language", value)}
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
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">אודות <HoogiTip tip="ספר לנו קצת על עצמך" /></Label>
              <Textarea 
                id="bio" 
                value={personalData.bio} 
                onChange={(e) => handlePersonalDataChange("bio", e.target.value)} 
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleSavePersonalData}>שמור שינויים</Button>
          </div>
        </div>
      );
      
    case "business":
      return <BusinessForm />;
      
    case "content":
      return <ContentPreferencesForm />;
      
    case "appearance":
      return <AppearanceForm />;
      
    case "notifications":
      return <NotificationsForm />;
      
    case "billing":
      return <BillingForm />;
      
    default:
      return <div>בחר קטגוריה מהתפריט למעלה</div>;
  }
};

export default ProfileQuestionnaireSection;
