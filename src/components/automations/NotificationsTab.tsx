import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Save, Bell, Mail, MessageCircle, AlertTriangle } from "lucide-react";

const NotificationsTab = () => {
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
      title: "התרעות נשמרו",
      description: "הגדרות ההתראות עודכנו בהצלחה",
    });
  };
  
  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">מענה אוטומטי ללקוחות</h1>
        </div>
        <p className="text-gray-500 text-lg">הגדרות מענה אוטומטי ללקוחות וניהול התראות</p>
      </div>

      {/* Main Card */}
      <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-right">הגדרות התראות</h2>
          <p className="text-gray-500 text-right">הגדרת העדפות להתראות ומענה אוטומטי</p>
        </div>
        
        <div className="space-y-8">
          {/* Notification Channels */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-right flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-500" />
              ערוצי התראה עבורי
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <Label htmlFor="inapp-channel" className="text-base font-medium">התראות באפליקציה</Label>
                </div>
                <Switch 
                  id="inapp-channel" 
                  checked={channels.inApp}
                  onCheckedChange={() => toggleChannel('inApp')}
                  className="scale-110"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <Label htmlFor="email-channel" className="text-base font-medium">התראות בדואר אלקטרוני</Label>
                </div>
                <Switch 
                  id="email-channel" 
                  checked={channels.email}
                  onCheckedChange={() => toggleChannel('email')}
                  className="scale-110"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  <Label htmlFor="whatsapp-channel" className="text-base font-medium">התראות בוואטסאפ</Label>
                </div>
                <Switch 
                  id="whatsapp-channel" 
                  checked={channels.whatsapp}
                  onCheckedChange={() => toggleChannel('whatsapp')}
                  className="scale-110"
                />
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <h3 className="font-medium text-lg text-right flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              פרטי התקשרות
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-address" className="text-base font-medium">כתובת דואר אלקטרוני להתראות</Label>
                <Input 
                  id="email-address"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => handleContactInfoChange('email', e.target.value)}
                  placeholder="user@example.com"
                  className="text-base p-3 border-2 focus:border-blue-500"
                  dir="ltr"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp-number" className="text-base font-medium">מספר וואטסאפ להתראות</Label>
                <Input 
                  id="whatsapp-number"
                  type="tel"
                  value={contactInfo.whatsappNumber}
                  onChange={(e) => handleContactInfoChange('whatsappNumber', e.target.value)}
                  placeholder="+972501234567"
                  className="text-base p-3 border-2 focus:border-green-500"
                  dir="ltr"
                />
              </div>
            </div>
          </div>
          
          {/* Save Button */}
          <div className="pt-4">
            <Button 
              onClick={handleSave} 
              className="w-full py-3 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
            >
              <Save className="ml-2 h-5 w-5" />
              שמירת הגדרות התראות
            </Button>
          </div>
        </div>
      </Card>

      {/* Additional Info Card */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">מידע חשוב</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            ההתראות יישלחו אליך בהתאם להגדרות שבחרת. 
            ניתן לשנות את ההגדרות בכל עת מהמסך הזה.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default NotificationsTab;
