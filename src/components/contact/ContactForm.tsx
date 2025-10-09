
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import Tooltip from "@/components/Tooltip";
import FormField from "@/components/FormField";

interface ContactFormProps {
  onBack: () => void;
}

interface ContactFormData {
  subject: string;
  name: string;
  email: string;
  message: string;
  file: File | null;
  url: string;
}

// Email routing map
const emailRoutingMap: Record<string, string> = {
  "תמיכה טכנית": "support@example.com",
  "שירות לקוחות": "service@example.com",
  "בעיה בתשלום": "billing@example.com",
  "דיווח על באג": "bugs@example.com",
  "שאלה כללית": "info@example.com",
};

const ContactForm = ({ onBack }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    subject: "",
    name: "",
    email: "",
    message: "",
    file: null,
    url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof ContactFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    // Basic validation
    if (!formData.subject) {
      toast({
        title: "שגיאה",
        description: "יש לבחור נושא לפנייה",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.name) {
      toast({
        title: "שגיאה",
        description: "יש להזין שם מלא",
        variant: "destructive",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "שגיאה",
        description: "יש להזין כתובת אימייל תקינה",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.message.trim()) {
      toast({
        title: "שגיאה",
        description: "יש להזין תיאור לפנייה",
        variant: "destructive",
      });
      return false;
    }

    // URL validation if provided
    if (formData.url && !formData.url.startsWith('http')) {
      toast({
        title: "שגיאה",
        description: "יש להזין כתובת URL תקינה",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    // Get the target email from the mapping
    const targetEmail = emailRoutingMap[formData.subject] || "info@example.com";

    // Simulate API call with timeout
    setTimeout(() => {
      console.log("Sending contact email:", {
        ...formData,
        targetEmail,
      });
      
      toast({
        title: "הפנייה נשלחה בהצלחה",
        description: `הפנייה שלך נשלחה ל-${targetEmail}`,
      });
      
      // Reset form
      setFormData({
        subject: "",
        name: "",
        email: "",
        message: "",
        file: null,
        url: "",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="max-w-lg mx-auto w-full py-4 px-2">
      <div className="flex justify-center mb-4">
        <img 
          src="/hoogi-new-avatar.png" 
          alt="iHoogi Avatar" 
          className="w-[140px] h-[140px] object-contain" 
        />
      </div>

      <h1 className="text-xl md:text-2xl font-bold text-center mb-6">צור קשר עם התמיכה שלנו</h1>

      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormField
              id="subject"
              label="נושא הפנייה"
              type="select"
              value={formData.subject}
              onChange={(value) => handleChange("subject", value)}
              tooltip="בחר נושא כדי לנתב את הפנייה"
              options={[
                { value: "תמיכה טכנית", label: "תמיכה טכנית" },
                { value: "שירות לקוחות", label: "שירות לקוחות" },
                { value: "בעיה בתשלום", label: "בעיה בתשלום" },
                { value: "דיווח על באג", label: "דיווח על באג" },
                { value: "שאלה כללית", label: "שאלה כללית" }
              ]}
            />

            <FormField
              id="name"
              label="שם מלא"
              type="text"
              value={formData.name}
              onChange={(value) => handleChange("name", value)}
              tooltip="הזן את שמך המלא"
            />

            <FormField
              id="email"
              label="אימייל ליצירת קשר"
              type="text"
              value={formData.email}
              onChange={(value) => handleChange("email", value)}
              tooltip="הזן כתובת אימייל תקינה לתשובה"
            />

            <FormField
              id="message"
              label="תיאור הפנייה"
              type="textarea"
              value={formData.message}
              onChange={(value) => handleChange("message", value)}
              tooltip="תאר את הפנייה שלך בפירוט"
            />
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="file" className="text-base font-medium">צרף קובץ</Label>
                <Tooltip content="ניתן לצרף קבצים מסוג PDF, PNG או JPG" />
              </div>
              <Input
                id="file"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  handleChange("file", file);
                }}
                className="flex-1"
              />
            </div>

            <FormField
              id="url"
              label="קישור (אופציונאלי)"
              type="text"
              value={formData.url}
              onChange={(value) => handleChange("url", value)}
              tooltip="קישור רלוונטי לתיאור הבעיה, אם יש"
              placeholder="https://..."
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between pt-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={onBack}
              className="h-10 text-base"
            >
              ⬅️ חזרה
            </Button>
            <Button 
              type="submit"
              className="h-10 bg-[#2D66F2] hover:bg-blue-600 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "שולח..." : "שלח"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
