import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Save, Bell, Mail, MessageCircle, AlertTriangle, Clock, Users, DollarSign, CreditCard, UserPlus, UserMinus } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { ArrowRight } from "lucide-react";

const Notifications = () => {
  // User type detection (mock - in real app this would come from auth context)
  const isAppOwner = true; // Change to false for regular user
  
  const [channels, setChannels] = useState({
    inApp: true,
    email: true,
    whatsapp: false
  });
  
  const [contactInfo, setContactInfo] = useState({
    email: "user@example.com",
    whatsappNumber: "+972501234567"
  });

  // Timing settings
  const [timingSettings, setTimingSettings] = useState({
    frequency: "daily", // hourly, daily, weekly, monthly
    time: "09:00",
    days: ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  });

  // Owner-specific notifications
  const [ownerNotifications, setOwnerNotifications] = useState({
    partners: {
      newPartner: true,
      partnerPayments: true,
      partnerActivity: false
    },
    payments: {
      incoming: true,
      outgoing: true,
      failed: true,
      externalProviders: true
    },
    subscriptions: {
      newSubscriptions: true,
      cancelledSubscriptions: true,
      subscriptionType: true,
      paymentFailures: true
    },
    finances: {
      revenue: true,
      expenses: true,
      providerPayments: true,
      networkPayments: true
    }
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

  const handleOwnerNotificationChange = (category: keyof typeof ownerNotifications, notification: keyof typeof ownerNotifications[keyof typeof ownerNotifications]) => {
    setOwnerNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [notification]: !prev[category][notification]
      }
    }));
  };
  
  const handleSave = () => {
    toast({
      title: "התרעות נשמרו",
      description: "הגדרות ההתראות עודכנו בהצלחה",
    });
  };
  
  return (
    <MainLayout initialState="notifications">
      <div className="max-w-4xl mx-auto p-3 md:p-6 lg:p-8" dir="rtl">
        {/* Back Button */}
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.history.back()}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            חזור
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bell className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">ההתרעות שלי</h1>
          </div>
          <p className="text-gray-500 text-lg">ניהול התראות והגדרות תזמון</p>
        </div>

        {/* Timing Settings - Top Priority */}
        <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold">הגדרות תזמון</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-base font-medium">תדירות התראות</Label>
              <Select value={timingSettings.frequency} onValueChange={(value) => setTimingSettings(prev => ({ ...prev, frequency: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">שעתי</SelectItem>
                  <SelectItem value="daily">יומי</SelectItem>
                  <SelectItem value="weekly">שבועי</SelectItem>
                  <SelectItem value="monthly">חודשי</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-base font-medium">שעת שליחה</Label>
              <Input 
                type="time"
                value={timingSettings.time}
                onChange={(e) => setTimingSettings(prev => ({ ...prev, time: e.target.value }))}
                className="text-base p-3"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-base font-medium">ימים בשבוע</Label>
              <Select value="all" onValueChange={() => {}}>
                <SelectTrigger>
                  <SelectValue placeholder="בחר ימים" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">כל הימים</SelectItem>
                  <SelectItem value="weekdays">ימי חול בלבד</SelectItem>
                  <SelectItem value="custom">מותאם אישית</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Notification Channels */}
        <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-right">ערוצי התראה</h2>
            <p className="text-gray-500 text-right">בחר איך לקבל התראות</p>
          </div>
          
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
        </Card>

        {/* Contact Information */}
        <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-right">פרטי התקשרות</h2>
            <p className="text-gray-500 text-right">כתובות לקבלת התראות</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-address" className="text-base font-medium">כתובת דואר אלקטרוני</Label>
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
              <Label htmlFor="whatsapp-number" className="text-base font-medium">מספר וואטסאפ</Label>
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
        </Card>

        {/* Owner-specific notifications */}
        {isAppOwner && (
          <>
            {/* Partners Notifications */}
            <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-6 w-6 text-purple-600" />
                <h2 className="text-xl font-semibold">התראות שותפים</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <UserPlus className="h-5 w-5 text-green-600" />
                    <span className="text-base">שותף חדש נרשם</span>
                  </div>
                  <Switch 
                    checked={ownerNotifications.partners.newPartner}
                    onCheckedChange={() => handleOwnerNotificationChange('partners', 'newPartner')}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <span className="text-base">תשלומים לשותפים</span>
                  </div>
                  <Switch 
                    checked={ownerNotifications.partners.partnerPayments}
                    onCheckedChange={() => handleOwnerNotificationChange('partners', 'partnerPayments')}
                  />
                </div>
              </div>
            </Card>

            {/* Payments Notifications */}
            <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-green-50 to-blue-50 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-semibold">התראות תשלומים</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-base">תשלומים נכנסים</span>
                  </div>
                  <Switch 
                    checked={ownerNotifications.payments.incoming}
                    onCheckedChange={() => handleOwnerNotificationChange('payments', 'incoming')}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-red-600" />
                    <span className="text-base">תשלומים יוצאים</span>
                  </div>
                  <Switch 
                    checked={ownerNotifications.payments.outgoing}
                    onCheckedChange={() => handleOwnerNotificationChange('payments', 'outgoing')}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span className="text-base">תשלומים לספקים חיצוניים</span>
                  </div>
                  <Switch 
                    checked={ownerNotifications.payments.externalProviders}
                    onCheckedChange={() => handleOwnerNotificationChange('payments', 'externalProviders')}
                  />
                </div>
              </div>
            </Card>

            {/* Subscriptions Notifications */}
            <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-50 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <UserPlus className="h-6 w-6 text-orange-600" />
                <h2 className="text-xl font-semibold">התראות מנויים</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <UserPlus className="h-5 w-5 text-green-600" />
                    <span className="text-base">מנוי חדש</span>
                  </div>
                  <Switch 
                    checked={ownerNotifications.subscriptions.newSubscriptions}
                    onCheckedChange={() => handleOwnerNotificationChange('subscriptions', 'newSubscriptions')}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <UserMinus className="h-5 w-5 text-red-600" />
                    <span className="text-base">מנוי בוטל</span>
                  </div>
                  <Switch 
                    checked={ownerNotifications.subscriptions.cancelledSubscriptions}
                    onCheckedChange={() => handleOwnerNotificationChange('subscriptions', 'cancelledSubscriptions')}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <span className="text-base">שינוי סוג מנוי</span>
                  </div>
                  <Switch 
                    checked={ownerNotifications.subscriptions.subscriptionType}
                    onCheckedChange={() => handleOwnerNotificationChange('subscriptions', 'subscriptionType')}
                  />
                </div>
              </div>
            </Card>

            {/* Financial Notifications */}
            <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-orange-50 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="h-6 w-6 text-yellow-600" />
                <h2 className="text-xl font-semibold">התראות כספיות</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-base">הכנסות</span>
                  </div>
                  <Switch 
                    checked={ownerNotifications.finances.revenue}
                    onCheckedChange={() => handleOwnerNotificationChange('finances', 'revenue')}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-red-600" />
                    <span className="text-base">הוצאות</span>
                  </div>
                  <Switch 
                    checked={ownerNotifications.finances.expenses}
                    onCheckedChange={() => handleOwnerNotificationChange('finances', 'expenses')}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-base">תשלומים לרשתות</span>
                  </div>
                  <Switch 
                    checked={ownerNotifications.finances.networkPayments}
                    onCheckedChange={() => handleOwnerNotificationChange('finances', 'networkPayments')}
                  />
                </div>
              </div>
            </Card>
          </>
        )}
        
        {/* Save Button */}
        <div className="flex justify-center">
          <Button 
            onClick={handleSave} 
            className="px-12 py-3 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
          >
            <Save className="ml-2 h-5 w-5" />
            שמירת הגדרות התראות
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Notifications;
