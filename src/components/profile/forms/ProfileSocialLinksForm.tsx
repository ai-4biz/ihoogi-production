
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HoogiTip from "@/components/HoogiTip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Trash, Facebook, Instagram, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface ProfileSocialLinksFormProps {
  onSave: () => void;
}

const ProfileSocialLinksForm = ({ onSave }: ProfileSocialLinksFormProps) => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    tiktok: "",
    youtube: "",
  });

  const [website, setWebsite] = useState("");
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

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="mb-4">
        <HoogiTip tip="כדי שה-AI יסגל את הסגנון שלך, הוסף קישורים למקורות השראה ולרשתות החברתיות." />
      </div>

      {/* Logo and Avatar - First */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">לוגו העסק</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-4 h-[120px]">
              {logoPreview ? (
                <img 
                  src={logoPreview} 
                  alt="Logo preview" 
                  className="h-[100px] w-[100px] object-contain" 
                />
              ) : (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">העלה לוגו</p>
                  <p className="text-xs text-muted-foreground">מומלץ 100×100 פיקסלים</p>
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                id="logo-upload"
                className="hidden"
                accept="image/png,image/svg+xml"
                onChange={handleLogoChange}
              />
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => document.getElementById('logo-upload')?.click()}
              >
                {logoPreview ? "שנה לוגו" : "העלה לוגו"}
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">תמונת פרופיל אישית</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-4 h-[120px]">
              {avatarPreview ? (
                <Avatar className="h-[100px] w-[100px]">
                  <AvatarImage src={avatarPreview} alt="Avatar preview" />
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">העלה תמונת פרופיל</p>
                  <p className="text-xs text-muted-foreground">מומלץ 120×120 פיקסלים</p>
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/jpeg,image/png"
                onChange={handleAvatarChange}
              />
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => document.getElementById('avatar-upload')?.click()}
              >
                {avatarPreview ? "שנה תמונה" : "העלה תמונה"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Colors - Second */}
      <div>
        <h3 className="text-lg font-medium mb-4">צבעי המותג</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="primaryColor" className="text-base mb-2 block">צבע ראשי</Label>
            <div className="flex items-center gap-2">
              <Input
                id="primaryColor"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-16 h-16 cursor-pointer"
              />
              <Input
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                placeholder="#6366f1"
                className="flex-1 font-mono"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="secondaryColor" className="text-base mb-2 block">צבע משני</Label>
            <div className="flex items-center gap-2">
              <Input
                id="secondaryColor"
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-16 h-16 cursor-pointer"
              />
              <Input
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                placeholder="#8b5cf6"
                className="flex-1 font-mono"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="backgroundColor" className="text-base mb-2 block">צבע רקע</Label>
            <div className="flex items-center gap-2">
              <Input
                id="backgroundColor"
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-16 h-16 cursor-pointer"
              />
              <Input
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                placeholder="#f8fafc"
                className="flex-1 font-mono"
              />
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          הצבעים ישמשו לעיצוב התוכן והממשק שלך
        </p>
      </div>

      {/* Website - Third */}
      <div>
        <h3 className="text-lg font-medium mb-4">אתר עסקי</h3>
        <div className="space-y-2">
          <Label htmlFor="website" className="text-base">כתובת האתר</Label>
          <Input
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="www.yourwebsite.com"
          />
        </div>
      </div>

      {/* Info Sources - Fourth */}
      <div>
        <h3 className="text-lg font-medium mb-4">מקורות מידע קבועים</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Input
              value={newInfoSource}
              onChange={(e) => setNewInfoSource(e.target.value)}
              placeholder="הזן URL של מקור מידע (בלוג, אתר חדשות וכו')"
              className="flex-1"
            />
            <Button type="button" onClick={handleAddSource}>
              <Plus className="h-4 w-4" />
              הוסף
            </Button>
          </div>
          
          <div className="flex flex-col gap-2">
            {infoSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">נמשך למאמרים</Badge>
                  <span className="text-sm truncate max-w-[300px]">{source}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleRemoveSource(source)}>
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
            {infoSources.length === 0 && (
              <p className="text-sm text-muted-foreground">אין מקורות מידע נוספים.</p>
            )}
          </div>
        </div>
      </div>

      {/* Social Networks - Fifth */}
      <div>
        <h3 className="text-lg font-medium mb-4">רשתות חברתיות</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Facebook className="h-4 w-4 text-blue-600" />
                <Label htmlFor="facebook" className="text-base">פייסבוק</Label>
              </div>
              <Input
                id="facebook"
                value={socialLinks.facebook}
                onChange={(e) => handleSocialLinkChange("facebook", e.target.value)}
                placeholder="facebook.com/yourpage"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-pink-600" />
                <Label htmlFor="instagram" className="text-base">אינסטגרם</Label>
              </div>
              <Input
                id="instagram"
                value={socialLinks.instagram}
                onChange={(e) => handleSocialLinkChange("instagram", e.target.value)}
                placeholder="instagram.com/yourusername"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-blue-700" />
                <Label htmlFor="linkedin" className="text-base">לינקדאין</Label>
              </div>
              <Input
                id="linkedin"
                value={socialLinks.linkedin}
                onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                placeholder="linkedin.com/in/yourusername"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tiktok" className="text-base">טיקטוק</Label>
              <Input
                id="tiktok"
                value={socialLinks.tiktok}
                onChange={(e) => handleSocialLinkChange("tiktok", e.target.value)}
                placeholder="tiktok.com/@yourusername"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="youtube" className="text-base">יוטיוב</Label>
              <Input
                id="youtube"
                value={socialLinks.youtube}
                onChange={(e) => handleSocialLinkChange("youtube", e.target.value)}
                placeholder="youtube.com/c/yourchannel"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={onSave} className="min-w-[180px]">
          שמור שינויים
        </Button>
      </div>
    </div>
  );
};

export default ProfileSocialLinksForm;
