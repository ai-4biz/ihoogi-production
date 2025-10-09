
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import HoogiTip from "@/components/HoogiTip";
import { Mic, Upload, Facebook, Instagram, Linkedin, Youtube, Globe, Plus, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const BusinessForm = () => {
  const [businessData, setBusinessData] = useState({
    businessName: "",
    mobile: "",
    email: "",
    mainCategory: "",
    customMainCategory: "",
    subCategory: "",
    customSubCategory: "",
    mainService: "",
    website: "",
    logoUploaded: false
  });

  // Media and Links state
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    tiktok: "",
    youtube: "",
  });
  const [logo, setLogo] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [infoSources, setInfoSources] = useState<string[]>([]);
  const [newInfoSource, setNewInfoSource] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#6366f1");
  const [secondaryColor, setSecondaryColor] = useState("#8b5cf6");
  const [backgroundColor, setBackgroundColor] = useState("#f8fafc");
  
  // Preview URLs for logo and avatar
  const [logoPreview, setLogoPreview] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleBusinessDataChange = (field: string, value: string) => {
    setBusinessData({
      ...businessData,
      [field]: value
    });
  };

  const handleSaveBusinessData = () => {
    // In a real app, this would save to a backend
    toast.success("פרטי העסק נשמרו בהצלחה");
  };

  // Media and Links handlers
  const handleSocialLinkChange = (network: string, value: string) => {
    setSocialLinks({
      ...socialLinks,
      [network]: value
    });
  };

  const handleAddSource = () => {
    if (newInfoSource.trim() && !infoSources.includes(newInfoSource.trim())) {
      setInfoSources([...infoSources, newInfoSource.trim()]);
      setNewInfoSource("");
    }
  };

  const handleRemoveSource = (source: string) => {
    setInfoSources(infoSources.filter(s => s !== source));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Dynamic subcategories based on main category
  const getSubcategories = (mainCategory: string) => {
    switch (mainCategory) {
      case "עריכת-דין":
        return ["דיני משפחה", "מסחרי", "קניין רוחני", "דיני עבודה", "נדל\"ן", "אחר"];
      case "מטפלים ומאמנים":
        return ["NLP", "קואצ'ינג", "פסיכולוגיה", "רפלקסולוגיה", "פיזיותרפיה", "אחר"];
      case "ייעוץ":
        return ["עסקי", "כלכלי", "אישי", "ארגוני", "אחר"];
      case "ביטוח":
        return ["חיים", "בריאות", "רכב", "דירה", "עסק", "אחר"];
      case "קוסמטיקה":
        return ["טיפולי פנים", "טיפולי גוף", "מניקור", "פדיקור", "אחר"];
      case "נדל\"ן":
        return ["עיצוב פנים", "אדריכלות", "שיפוצים", "תיווך", "ייעוץ השקעות", "אחר"];
      default:
        return ["אחר"];
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto" dir="rtl">
      <div className="mb-4">
        <HoogiTip tip="טיפ: מלאי כאן את פרטי העסק כדי שה-AI יתאים עבורך תכנים מדויקים יותר." />
      </div>
      
      {/* שורה 1: שם העסק */}
      <div className="space-y-2">
        <Label htmlFor="businessName" className="text-right">שם העסק <HoogiTip tip="השם שיופיע בתוכן שייווצר" /></Label>
        <Input 
          id="businessName" 
          value={businessData.businessName} 
          onChange={(e) => handleBusinessDataChange("businessName", e.target.value)}
          className="text-right"
        />
      </div>

      {/* שורה 2: נייד ומייל */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="mobile" className="text-right">נייד</Label>
          <Input 
            id="mobile" 
            type="tel"
            value={businessData.mobile} 
            onChange={(e) => handleBusinessDataChange("mobile", e.target.value)} 
            placeholder="050-1234567"
            className="text-right"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-right">מייל</Label>
          <Input 
            id="email" 
            type="email"
            value={businessData.email} 
            onChange={(e) => handleBusinessDataChange("email", e.target.value)} 
            placeholder="example@email.com"
            className="text-right"
          />
        </div>
      </div>

      {/* שורה 3: תחום, תת תחום, עיסוק עיקרי - מימין לשמאל */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="mainCategory" className="text-right">עיסוק עיקרי</Label>
          <Input 
            id="mainService" 
            value={businessData.mainService} 
            onChange={(e) => handleBusinessDataChange("mainService", e.target.value)} 
            placeholder="תיאור העיסוק העיקרי"
            className="text-right"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subCategory" className="text-right">תת תחום</Label>
          <Select 
            value={businessData.subCategory} 
            onValueChange={(value) => handleBusinessDataChange("subCategory", value)}
            disabled={!businessData.mainCategory}
          >
            <SelectTrigger id="subCategory" className="text-right">
              <SelectValue placeholder={businessData.mainCategory ? "בחר תת-תחום" : "בחר תחום תחילה"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {businessData.mainCategory && 
                  getSubcategories(businessData.mainCategory).map(subCat => (
                    <SelectItem key={subCat} value={subCat}>{subCat}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          {businessData.subCategory === "אחר" && (
            <Input 
              className="mt-2 text-right"
              placeholder="פרטי את תת-התחום"
              value={businessData.customSubCategory}
              onChange={(e) => handleBusinessDataChange("customSubCategory", e.target.value)}
            />
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="mainCategory" className="text-right">תחום</Label>
          <Select 
            value={businessData.mainCategory} 
            onValueChange={(value) => handleBusinessDataChange("mainCategory", value)}
          >
            <SelectTrigger id="mainCategory" className="text-right">
              <SelectValue placeholder="בחר תחום" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="מטפלים ומאמנים">מטפלים ומאמנים</SelectItem>
                <SelectItem value="ייעוץ">ייעוץ</SelectItem>
                <SelectItem value="עריכת-דין">עריכת דין</SelectItem>
                <SelectItem value="ביטוח">ביטוח</SelectItem>
                <SelectItem value="קוסמטיקה">קוסמטיקה</SelectItem>
                <SelectItem value="נדל&quot;ן">נדל&quot;ן</SelectItem>
                <SelectItem value="אחר">אחר</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {businessData.mainCategory === "אחר" && (
            <Input 
              className="mt-2 text-right"
              placeholder="תארי בקצרה את תחום העסק שלך"
              value={businessData.customMainCategory}
              onChange={(e) => handleBusinessDataChange("customMainCategory", e.target.value)}
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="subCategory" className="text-right">תת תחום</Label>
          <Select 
            value={businessData.subCategory} 
            onValueChange={(value) => handleBusinessDataChange("subCategory", value)}
            disabled={!businessData.mainCategory}
          >
            <SelectTrigger id="subCategory" className="text-right">
              <SelectValue placeholder={businessData.mainCategory ? "בחר תת-תחום" : "בחר תחום תחילה"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {businessData.mainCategory && 
                  getSubcategories(businessData.mainCategory).map(subCat => (
                    <SelectItem key={subCat} value={subCat}>{subCat}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          {businessData.subCategory === "אחר" && (
            <Input 
              className="mt-2 text-right"
              placeholder="פרטי את תת-התחום"
              value={businessData.customSubCategory}
              onChange={(e) => handleBusinessDataChange("customSubCategory", e.target.value)}
            />
          )}
        </div>
      </div>

      {/* חלק רביעי: העלאת תמונות - הקטנת הריבועים */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4 text-right">לוגו העסק</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-3 h-[80px]">
              {logoPreview ? (
                <img 
                  src={logoPreview} 
                  alt="Logo preview" 
                  className="h-[60px] w-[60px] object-contain" 
                />
              ) : (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">העלה לוגו</p>
                  <p className="text-xs text-muted-foreground">מומלץ 60×60 פיקסלים</p>
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => document.getElementById('logo-upload')?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 ml-2" />
                העלה לוגו
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4 text-right">תמונת פרופיל</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-3 h-[80px]">
              {avatarPreview ? (
                <img 
                  src={avatarPreview} 
                  alt="Avatar preview" 
                  className="h-[60px] w-[60px] object-cover rounded-full" 
                />
              ) : (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">העלה תמונת פרופיל</p>
                  <p className="text-xs text-muted-foreground">מומלץ 60×60 פיקסלים</p>
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => document.getElementById('avatar-upload')?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 ml-2" />
                העלה תמונה
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* חלק חמישי: צבעי מותג */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-right">צבעי מותג</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-right">צבע ראשי</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-12 h-8 rounded border"
              />
              <Input 
                value={primaryColor} 
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="text-right"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-right">צבע משני</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-12 h-8 rounded border"
              />
              <Input 
                value={secondaryColor} 
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="text-right"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-right">צבע רקע</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-12 h-8 rounded border"
              />
              <Input 
                value={backgroundColor} 
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="text-right"
              />
            </div>
          </div>
        </div>
      </div>

      {/* אתר עסקי ומקורות */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="website" className="text-right">אתר עסקי</Label>
          <Input 
            id="website" 
            type="url"
            value={businessData.website} 
            onChange={(e) => handleBusinessDataChange("website", e.target.value)} 
            placeholder="https://example.com"
            className="text-right"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-right">מקורות על העסק</Label>
          <div className="flex gap-2">
            <Input 
              value={newInfoSource}
              onChange={(e) => setNewInfoSource(e.target.value)}
              placeholder="הוסף מקור מידע"
              className="text-right"
            />
            <Button onClick={handleAddSource} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {infoSources.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {infoSources.map((source, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {source}
                  <button 
                    onClick={() => handleRemoveSource(source)}
                    className="text-xs hover:text-destructive"
                  >
                    <Trash className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* רשתות חברתיות - שתי שורות */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-right">רשתות חברתיות</h3>
        <div className="space-y-4">
          {/* שורה ראשונה - 3 רשתות */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facebook" className="text-right flex items-center gap-2 justify-end">
                <Facebook className="h-4 w-4 text-blue-600" />
                Facebook
              </Label>
              <Input 
                id="facebook" 
                value={socialLinks.facebook} 
                onChange={(e) => handleSocialLinkChange("facebook", e.target.value)} 
                placeholder="https://facebook.com/..."
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-right flex items-center gap-2 justify-end">
                <Instagram className="h-4 w-4 text-pink-600" />
                Instagram
              </Label>
              <Input 
                id="instagram" 
                value={socialLinks.instagram} 
                onChange={(e) => handleSocialLinkChange("instagram", e.target.value)} 
                placeholder="https://instagram.com/..."
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-right flex items-center gap-2 justify-end">
                <Linkedin className="h-4 w-4 text-blue-700" />
                LinkedIn
              </Label>
              <Input 
                id="linkedin" 
                value={socialLinks.linkedin} 
                onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)} 
                placeholder="https://linkedin.com/in/..."
                className="text-right"
              />
            </div>
          </div>
          
          {/* שורה שנייה - 2 רשתות */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tiktok" className="text-right flex items-center gap-2 justify-end">
                <Globe className="h-4 w-4 text-black" />
                TikTok
              </Label>
              <Input 
                id="tiktok" 
                value={socialLinks.tiktok} 
                onChange={(e) => handleSocialLinkChange("tiktok", e.target.value)} 
                placeholder="https://tiktok.com/@..."
                className="text-right"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube" className="text-right flex items-center gap-2 justify-end">
                <Youtube className="h-4 w-4 text-red-600" />
                YouTube
              </Label>
              <Input 
                id="youtube" 
                value={socialLinks.youtube} 
                onChange={(e) => handleSocialLinkChange("youtube", e.target.value)} 
                placeholder="https://youtube.com/@..."
                className="text-right"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSaveBusinessData}>שמור פרטי עסק</Button>
      </div>
    </div>
  );
};

export default BusinessForm;
