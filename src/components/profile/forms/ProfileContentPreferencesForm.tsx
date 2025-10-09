
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HoogiTip from "@/components/HoogiTip";
import { Diamond, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ProfileContentPreferencesFormProps {
  onSave?: () => void;
}

const ProfileContentPreferencesForm = ({ onSave }: ProfileContentPreferencesFormProps) => {
  const [contentLanguage, setContentLanguage] = useState("he");
  const [distributionLanguage, setDistributionLanguage] = useState("he");
  const [availableCredits] = useState(7);
  const [autoDistributionNetworks, setAutoDistributionNetworks] = useState<string[]>(["facebook"]);
  
  const languages = [
    { value: "he", label: "עברית" },
    { value: "en", label: "English" },
    { value: "ar", label: "العربية" },
    { value: "ru", label: "Русский" }
  ];
  
  const socialNetworks = [
    { value: "facebook", label: "פייסבוק", icon: "🔵" },
    { value: "instagram", label: "אינסטגרם", icon: "📸" },
    { value: "linkedin", label: "לינקדאין", icon: "👔" },
    { value: "tiktok", label: "טיקטוק", icon: "📱" },
    { value: "twitter", label: "טוויטר/X", icon: "🐦" },
    { value: "whatsapp", label: "וואטסאפ", icon: "💬" }
  ];

  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      toast.success("ההעדפות נשמרו בהצלחה");
    }
  };

  const handleAddNetwork = () => {
    toast.info("הוספת רשת צורכת 1 קרדיט. יושם בהמשך.");
  };

  const toggleNetwork = (network: string) => {
    if (autoDistributionNetworks.includes(network)) {
      setAutoDistributionNetworks(autoDistributionNetworks.filter(n => n !== network));
    } else {
      setAutoDistributionNetworks([...autoDistributionNetworks, network]);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-medium mb-4">שפות</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="contentLanguage" className="text-base">שפת מאמרי-מערכת</Label>
              <HoogiTip tip="שפת המאמרים שיוצגו לך במערכת" />
            </div>
            <Select
              value={contentLanguage}
              onValueChange={setContentLanguage}
            >
              <SelectTrigger id="contentLanguage">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="distributionLanguage" className="text-base">שפת הפצה</Label>
              <HoogiTip tip="השפה בה יופצו התכנים שלך" />
            </div>
            <Select
              value={distributionLanguage}
              onValueChange={(value) => {
                if (value !== contentLanguage) {
                  toast.info("שינוי שפת הפצה צורך 1 קרדיט");
                }
                setDistributionLanguage(value);
              }}
            >
              <SelectTrigger id="distributionLanguage">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">רשתות להפצה אוטומטית</h3>
          <div className="flex items-center gap-2 py-1 px-3 bg-primary/10 rounded-lg">
            <Diamond className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{availableCredits} קרדיטים זמינים</span>
          </div>
        </div>
        
        <div className="bg-amber-50 p-3 rounded-lg mb-4">
          <p className="text-sm text-amber-800">
            שים לב: כל שפה או רשת חברתית נוספת צורכת 1 קרדיט.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {socialNetworks.map((network) => (
            <div 
              key={network.value} 
              className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                autoDistributionNetworks.includes(network.value) 
                  ? "border-primary bg-primary/5" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => toggleNetwork(network.value)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{network.icon}</span>
                  <span>{network.label}</span>
                </div>
                <Switch 
                  checked={autoDistributionNetworks.includes(network.value)} 
                  onCheckedChange={() => toggleNetwork(network.value)}
                />
              </div>
            </div>
          ))}
          
          <div 
            className="border border-dashed border-gray-300 rounded-lg p-3 flex items-center justify-center cursor-pointer hover:border-gray-400"
            onClick={handleAddNetwork}
          >
            <Button variant="ghost" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>הוסף רשת</span>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {autoDistributionNetworks.length > 0 && (
            <div className="text-sm">
              <span className="font-medium">רשתות פעילות: </span>
              {autoDistributionNetworks.map(network => {
                const networkInfo = socialNetworks.find(n => n.value === network);
                return (
                  <Badge key={network} variant="outline" className="mr-1">
                    {networkInfo?.icon} {networkInfo?.label}
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} className="min-w-[180px]">
          שמור העדפות
        </Button>
      </div>
    </div>
  );
};

export default ProfileContentPreferencesForm;
