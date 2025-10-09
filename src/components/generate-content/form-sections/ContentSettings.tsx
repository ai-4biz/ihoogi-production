
import FormField from "@/components/FormField";

interface ContentSettingsProps {
  selectedPlatform: string;
  setSelectedPlatform: (value: string) => void;
  tone: string;
  setTone: (value: string) => void;
  ctaText: string;
  setCtaText: (value: string) => void;
}

const ContentSettings = ({
  selectedPlatform,
  setSelectedPlatform,
  tone,
  setTone,
  ctaText,
  setCtaText
}: ContentSettingsProps) => {
  // Platforms
  const platforms = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'email', label: 'Email' },
    { value: 'blog', label: 'Blog' }
  ];

  // Tones
  const tones = [
    { value: 'professional', label: 'מקצועי' },
    { value: 'friendly', label: 'ידידותי' },
    { value: 'inspirational', label: 'השראתי' },
    { value: 'assertive', label: 'אסרטיבי' },
    { value: 'humorous', label: 'הומוריסטי' }
  ];
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">🎯 הגדרות תוכן</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="platform"
          label="פלטפורמת יעד"
          type="select"
          value={selectedPlatform}
          onChange={setSelectedPlatform}
          options={platforms}
          tooltip="בחרי את הפלטפורמה בה תרצי לפרסם את התוכן"
        />
        
        <FormField
          id="tone"
          label="טון"
          type="select"
          value={tone}
          onChange={setTone}
          options={tones}
          tooltip="בחרי את סגנון הכתיבה המתאים לך"
        />
        
        <FormField
          id="cta-text"
          label="קריאה לפעולה"
          type="text"
          value={ctaText}
          onChange={setCtaText}
          placeholder="למשל: צרו קשר, הרשמו עכשיו, למדו עוד"
          tooltip="הזיני כאן את הקריאה לפעולה שתופיע בסוף הפוסט"
        />
      </div>
    </div>
  );
};

export default ContentSettings;
