
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const PreferencesTab = () => {
  const [channels, setChannels] = useState({
    inApp: true,
    email: true,
    whatsapp: false
  });
  
  const [contactInfo, setContactInfo] = useState({
    email: "user@example.com",
    whatsappNumber: "+972501234567"
  });
  
  const toggleChannel = (channel: keyof typeof channels) => {
    setChannels(prev => ({
      ...prev,
      [channel]: !prev[channel]
    }));
  };
  
  const handleContactInfoChange = (field: keyof typeof contactInfo, value: string) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSave = () => {
    toast({
      title: "העדפות נשמרו",
      description: "הגדרות האוטומציה עודכנו בהצלחה",
    });
  };
  
  return (
    <div className="space-y-6" dir="rtl">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-right">העדפות אוטומציה</h2>
          <p className="text-gray-500 text-right">הגדרת העדפות להתראות ומענה אוטומטי</p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-right">ערוצי התראה עבורי</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="inapp-channel">התראות באפליקציה</Label>
                <Switch 
                  id="inapp-channel" 
                  checked={channels.inApp}
                  onCheckedChange={() => toggleChannel('inApp')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="email-channel">התראות בדואר אלקטרוני</Label>
                <Switch 
                  id="email-channel" 
                  checked={channels.email}
                  onCheckedChange={() => toggleChannel('email')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="whatsapp-channel">התראות בוואטסאפ</Label>
                <Switch 
                  id="whatsapp-channel" 
                  checked={channels.whatsapp}
                  onCheckedChange={() => toggleChannel('whatsapp')}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium text-lg text-right">פרטי התקשרות</h3>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="email-address">כתובת דואר אלקטרוני להתראות</Label>
                <Input 
                  id="email-address"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => handleContactInfoChange('email', e.target.value)}
                  placeholder="user@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp-number">מספר וואטסאפ להתראות</Label>
                <Input 
                  id="whatsapp-number"
                  type="tel"
                  value={contactInfo.whatsappNumber}
                  onChange={(e) => handleContactInfoChange('whatsappNumber', e.target.value)}
                  placeholder="+972501234567"
                  dir="ltr"
                />
              </div>
            </div>
          </div>
          
          <Button onClick={handleSave} className="w-full mt-4">
            <Save className="ml-2 h-4 w-4" />
            שמירת העדפות
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PreferencesTab;
