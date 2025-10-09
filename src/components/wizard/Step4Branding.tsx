
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import FormField from "@/components/FormField";
import HoogiTip from "@/components/HoogiTip";
import { Upload } from "lucide-react";
import Tooltip from "@/components/Tooltip";

interface Step4Props {
  formData: {
    logoUploaded: boolean;
    profileImageUploaded: boolean;
    allowDistribution: boolean;
    allowLeadCollection: boolean;
    internalTag: string;
  };
  updateFormData: (data: any) => void;
}

const Step4Branding = ({ formData, updateFormData }: Step4Props) => {
  const [uploadedFiles, setUploadedFiles] = useState<{
    logo?: File;
    profile?: File;
  }>({});

  const handleFileChange = (field: string, files: FileList | null) => {
    if (files && files[0]) {
      setUploadedFiles({
        ...uploadedFiles,
        [field]: files[0],
      });
      
      // In a real app, you would handle the file upload to a server here
      // For now, just update the state to indicate it was uploaded
      updateFormData({
        [`${field}Uploaded`]: true,
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">מיתוג וסיום</h2>
      
      <HoogiTip tip="הפרטים הקטנים כאן – בונים את ההשפעה הגדולה שם. בואו נסיים עם הויזואלים שיחזקו את המסר שלך." />
      
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-6">
            {/* Logo upload */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <Label htmlFor="logo-upload" className="text-base font-medium">
                  העלאת לוגו העסק
                </Label>
                <Tooltip content="העלה את הלוגו של העסק שלך (פורמט מומלץ: PNG או SVG עם רקע שקוף)" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-1">גרור לכאן או לחץ לבחירת קובץ</p>
                    <p className="text-xs text-gray-400">PNG, JPG עד 5MB</p>
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange("logo", e.target.files)}
                    />
                  </div>
                </div>
                {formData.logoUploaded && (
                  <div className="flex items-center bg-green-50 border border-green-200 rounded-md py-2 px-3">
                    <span className="text-green-600 text-sm">הועלה בהצלחה</span>
                  </div>
                )}
              </div>
            </div>

            {/* Profile image upload */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <Label htmlFor="profile-upload" className="text-base font-medium">
                  העלאת תמונת פרופיל ייצוגית
                </Label>
                <Tooltip content="תמונה שתייצג אותך או את העסק שלך בכרטיס העסק ובמאמרים" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-1">גרור לכאן או לחץ לבחירת קובץ</p>
                    <p className="text-xs text-gray-400">PNG, JPG עד 5MB</p>
                    <Input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange("profile", e.target.files)}
                    />
                  </div>
                </div>
                {formData.profileImageUploaded && (
                  <div className="flex items-center bg-green-50 border border-green-200 rounded-md py-2 px-3">
                    <span className="text-green-600 text-sm">הועלה בהצלחה</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Label
                htmlFor="allowDistribution"
                className="text-base font-medium"
              >
                האם לאפשר לנו להפיץ את המאמר בפלטפורמות שבחרת?
              </Label>
              <Tooltip content="אם תסמן כן, נוכל להפיץ את התוכן שלך ברשתות חברתיות ופלטפורמות שיווקיות נוספות" />
            </div>
            <Switch
              id="allowDistribution"
              checked={formData.allowDistribution || false}
              onCheckedChange={(checked) =>
                updateFormData({ allowDistribution: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Label
                htmlFor="allowLeadCollection"
                className="text-base font-medium"
              >
                האם לאפשר איסוף תגובות ולידים באופן אוטומטי?
              </Label>
              <Tooltip content="מאפשר לנו לאסוף פרטי קשר של אנשים המגיבים לתוכן שלך" />
            </div>
            <Switch
              id="allowLeadCollection"
              checked={formData.allowLeadCollection || false}
              onCheckedChange={(checked) =>
                updateFormData({ allowLeadCollection: checked })
              }
            />
          </div>
        </div>

        <FormField
          id="internalTag"
          label="תן שם פנימי למאמר (תגית)"
          value={formData.internalTag || ""}
          onChange={(value) => updateFormData({ internalTag: value })}
          tooltip='למשל "קמפיין חגים" או "נושא מומחיות"'
          placeholder='למשל "קמפיין חגים"'
        />

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-8">
          <h3 className="font-medium text-blue-800 mb-2">סיכום המידע שהזנת</h3>
          <p className="text-blue-700">
            אספנו את כל המידע הדרוש ליצירת תוכן מותאם אישית לעסק שלך. בסיום השאלון תוכל להמשיך ליצירת תוכן מותאם במיוחד עבורך.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step4Branding;
