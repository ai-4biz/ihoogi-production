
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import HoogiTip from "@/components/HoogiTip";
import { ExternalLink, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ProfilePersonalQuestionsFormProps {
  onSave?: () => void;
}

const ProfilePersonalQuestionsForm = ({ onSave }: ProfilePersonalQuestionsFormProps) => {
  const [favoriteQuote, setFavoriteQuote] = useState("");
  const [businessOffer, setBusinessOffer] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState("");

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const handleOpenTypeform = () => {
    toast.info("השאלון האישי יופעל בהמשך");
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      toast.success("הפרטים נשמרו בהצלחה");
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="bg-primary/5 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium mb-2">שאלון אישי מורחב</h3>
        <p className="mb-4 text-sm">
          שאלון זה יעזור לנו להכיר אותך טוב יותר וליצור תוכן מותאם אישית עבורך.
        </p>
        <Button onClick={handleOpenTypeform} className="flex items-center gap-2">
          <span>פתח שאלון אישי</span>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="favoriteQuote" className="text-base">משפט שאני אוהב/ת</Label>
            <HoogiTip tip="ציטוט, פתגם או משפט שמייצג אותך" />
          </div>
          <Input
            id="favoriteQuote"
            value={favoriteQuote}
            onChange={(e) => setFavoriteQuote(e.target.value)}
            placeholder='למשל: "הדרך הטובה ביותר לחזות את העתיד היא ליצור אותו"'
            maxLength={150}
          />
          <div className="text-xs text-right text-gray-500">
            {favoriteQuote.length}/150 תווים
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="businessOffer" className="text-base">מה אני מציע/ה לעסק</Label>
            <HoogiTip tip="תיאור קצר של השירותים שאתה מציע" />
          </div>
          <Textarea
            id="businessOffer"
            value={businessOffer}
            onChange={(e) => setBusinessOffer(e.target.value)}
            placeholder="תאר בקצרה את השירות העיקרי שאתה מציע ללקוחות שלך"
            className="resize-none"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Label htmlFor="interests" className="text-base">אני פתוח/ה להצעות בתחום...</Label>
            <HoogiTip tip="תחומי עניין שהיית רוצה להרחיב אליהם" />
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <Input
              id="interests"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="הוסף תחום עניין"
              className="flex-1"
            />
            <Button 
              type="button" 
              size="sm" 
              variant="outline" 
              onClick={handleAddInterest}
              disabled={!newInterest.trim()}
            >
              <Plus className="h-4 w-4 mr-1" />
              הוסף
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <Badge key={index} variant="secondary" className="flex gap-1 items-center">
                {interest}
                <button 
                  type="button" 
                  onClick={() => handleRemoveInterest(interest)}
                  className="ml-1 text-xs rounded-full hover:bg-gray-200 h-4 w-4 inline-flex items-center justify-center"
                  aria-label="Remove interest"
                >
                  ×
                </button>
              </Badge>
            ))}
            {interests.length === 0 && (
              <p className="text-sm text-gray-500">עדיין לא הוספת תחומי עניין.</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} className="min-w-[180px]">
          שמור שינויים
        </Button>
      </div>
    </div>
  );
};

export default ProfilePersonalQuestionsForm;
