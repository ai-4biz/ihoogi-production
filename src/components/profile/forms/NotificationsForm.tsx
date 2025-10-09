
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import HoogiTip from "@/components/HoogiTip";

const NotificationsForm = () => {
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: true,
    browser: false,
    mobile: false,
    whatsapp: false,
    contentCreated: true,
    commentsReceived: true,
    leadGenerated: true,
    systemUpdates: false,
    frequency: "immediate"
  });

  const handlePrefChange = (field: string, value: any) => {
    setNotificationPrefs({
      ...notificationPrefs,
      [field]: value
    });
  };

  const handleSaveNotifications = () => {
    toast.success("הגדרות ההתראות נשמרו בהצלחה");
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">ערוצי התראות</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between space-x-4 rtl:space-x-reverse bg-white p-4 rounded-lg border border-gray-100">
            <div>
              <Label htmlFor="email-notif" className="font-medium">דואר אלקטרוני</Label>
              <p className="text-sm text-gray-500">קבל התראות לכתובת הדוא״ל שלך</p>
            </div>
            <Switch 
              id="email-notif" 
              checked={notificationPrefs.email}
              onCheckedChange={(checked) => handlePrefChange("email", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-4 rtl:space-x-reverse bg-white p-4 rounded-lg border border-gray-100">
            <div>
              <Label htmlFor="browser-notif" className="font-medium">דפדפן</Label>
              <p className="text-sm text-gray-500">הצג התראות בדפדפן</p>
            </div>
            <Switch 
              id="browser-notif" 
              checked={notificationPrefs.browser}
              onCheckedChange={(checked) => handlePrefChange("browser", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-4 rtl:space-x-reverse bg-white p-4 rounded-lg border border-gray-100">
            <div>
              <Label htmlFor="mobile-notif" className="font-medium">מובייל</Label>
              <p className="text-sm text-gray-500">שלח התראות לאפליקציה</p>
            </div>
            <Switch 
              id="mobile-notif" 
              checked={notificationPrefs.mobile}
              onCheckedChange={(checked) => handlePrefChange("mobile", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-4 rtl:space-x-reverse bg-white p-4 rounded-lg border border-gray-100">
            <div>
              <Label htmlFor="whatsapp-notif" className="font-medium">WhatsApp</Label>
              <p className="text-sm text-gray-500">קבל התראות בוואטסאפ</p>
            </div>
            <Switch 
              id="whatsapp-notif" 
              checked={notificationPrefs.whatsapp}
              onCheckedChange={(checked) => handlePrefChange("whatsapp", checked)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">סוגי התראות</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between space-x-4 rtl:space-x-reverse bg-white p-4 rounded-lg border border-gray-100">
            <div>
              <Label htmlFor="content-notif" className="font-medium">יצירת תוכן</Label>
              <p className="text-sm text-gray-500">כשתוכן חדש נוצר עבורך</p>
            </div>
            <Switch 
              id="content-notif" 
              checked={notificationPrefs.contentCreated}
              onCheckedChange={(checked) => handlePrefChange("contentCreated", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-4 rtl:space-x-reverse bg-white p-4 rounded-lg border border-gray-100">
            <div>
              <Label htmlFor="comments-notif" className="font-medium">תגובות</Label>
              <p className="text-sm text-gray-500">כשמתקבלות תגובות בפוסטים</p>
            </div>
            <Switch 
              id="comments-notif" 
              checked={notificationPrefs.commentsReceived}
              onCheckedChange={(checked) => handlePrefChange("commentsReceived", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-4 rtl:space-x-reverse bg-white p-4 rounded-lg border border-gray-100">
            <div>
              <Label htmlFor="leads-notif" className="font-medium">לידים</Label>
              <p className="text-sm text-gray-500">כשמתקבל ליד חדש מהתוכן</p>
            </div>
            <Switch 
              id="leads-notif" 
              checked={notificationPrefs.leadGenerated}
              onCheckedChange={(checked) => handlePrefChange("leadGenerated", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-4 rtl:space-x-reverse bg-white p-4 rounded-lg border border-gray-100">
            <div>
              <Label htmlFor="system-notif" className="font-medium">עדכוני מערכת</Label>
              <p className="text-sm text-gray-500">שינויים ועדכונים במערכת</p>
            </div>
            <Switch 
              id="system-notif" 
              checked={notificationPrefs.systemUpdates}
              onCheckedChange={(checked) => handlePrefChange("systemUpdates", checked)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">תדירות <HoogiTip tip="כיצד תרצה לקבל את ההתראות" /></h3>
        <RadioGroup 
          value={notificationPrefs.frequency} 
          onValueChange={(value) => handlePrefChange("frequency", value)}
          className="flex flex-col space-y-3"
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white p-3 rounded-lg border border-gray-100">
            <RadioGroupItem value="immediate" id="freq-immediate" />
            <Label htmlFor="freq-immediate" className="cursor-pointer flex-1">
              <div className="font-medium">מיידי</div>
              <p className="text-sm text-gray-500">קבל התראות מיד כשהן מתרחשות</p>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white p-3 rounded-lg border border-gray-100">
            <RadioGroupItem value="daily" id="freq-daily" />
            <Label htmlFor="freq-daily" className="cursor-pointer flex-1">
              <div className="font-medium">יומי</div>
              <p className="text-sm text-gray-500">סיכום יומי של כל ההתראות</p>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white p-3 rounded-lg border border-gray-100">
            <RadioGroupItem value="weekly" id="freq-weekly" />
            <Label htmlFor="freq-weekly" className="cursor-pointer flex-1">
              <div className="font-medium">שבועי</div>
              <p className="text-sm text-gray-500">סיכום שבועי של כל ההתראות</p>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSaveNotifications}>שמור הגדרות התראות</Button>
      </div>
    </div>
  );
};

export default NotificationsForm;
