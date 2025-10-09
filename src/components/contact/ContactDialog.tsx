
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import HoogiTip from "@/components/HoogiTip";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ContactSubject = 
  | "technical" 
  | "customer-service" 
  | "billing" 
  | "bug" 
  | "general";

interface ContactForm {
  subject: ContactSubject | "";
  name: string;
  email: string;
  description: string;
  file: File | null;
}

// Map subjects to email addresses
const subjectToEmailMap: Record<ContactSubject, string> = {
  "technical": "support@example.com",
  "customer-service": "service@example.com",
  "billing": "billing@example.com",
  "bug": "bugs@example.com",
  "general": "info@example.com",
};

// Subject options for dropdown
const subjectOptions = [
  { value: "technical", label: "תמיכה טכנית" },
  { value: "customer-service", label: "שירות לקוחות" },
  { value: "billing", label: "בעיה בתשלום" },
  { value: "bug", label: "דיווח על באג" },
  { value: "general", label: "שאלה כללית" },
];

const ContactDialog = ({ open, onOpenChange }: ContactDialogProps) => {
  const [form, setForm] = useState<ContactForm>({
    subject: "",
    name: "",
    email: "",
    description: "",
    file: null,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm(prev => ({
      ...prev,
      file
    }));
  };
  
  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const isFormValid = () => {
    return (
      form.subject !== "" && 
      form.name.trim() !== "" && 
      form.email.trim() !== "" && 
      isEmailValid(form.email) &&
      form.description.trim().length >= 10
    );
  };
  
  // Mock function to handle form submission
  const sendContactEmail = async (
    subject: ContactSubject,
    name: string,
    email: string,
    description: string,
    file: File | null
  ) => {
    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // Get the target email address based on subject
        const targetEmail = subjectToEmailMap[subject];
        console.log(`Sending to: ${targetEmail}`, { subject, name, email, description, file });
        
        // Simulate 90% success rate
        const success = Math.random() < 0.9;
        resolve(success);
      }, 1000);
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "שגיאה",
        description: "יש למלא את כל השדות החובה בצורה תקינה",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await sendContactEmail(
        form.subject as ContactSubject,
        form.name,
        form.email,
        form.description,
        form.file
      );
      
      if (success) {
        toast({
          title: "הפנייה נשלחה בהצלחה",
          description: "נציג שלנו יחזור אליך בהקדם",
        });
        
        // Reset form and close dialog on success
        setForm({
          subject: "",
          name: "",
          email: "",
          description: "",
          file: null,
        });
        
        onOpenChange(false);
      } else {
        toast({
          title: "שגיאה בשליחה",
          description: "אירעה שגיאה בשליחת הפנייה, נסה שוב מאוחר יותר",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "שגיאה בשליחה",
        description: "אירעה שגיאה בשליחת הפנייה, נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl text-center mb-4">צור קשר עם התמיכה שלנו</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="subject">נושא הפנייה</Label>
              <HoogiTip tip="בחר נושא כדי לנתב את הפנייה" />
            </div>
            <Select
              value={form.subject}
              onValueChange={(value) => handleInputChange("subject", value)}
            >
              <SelectTrigger id="subject">
                <SelectValue placeholder="בחר נושא" />
              </SelectTrigger>
              <SelectContent>
                {subjectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="name">שם מלא</Label>
              <HoogiTip tip="הכנס את שמך המלא" />
            </div>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="ישראל ישראלי"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="email">אימייל ליצירת קשר</Label>
              <HoogiTip tip="כתובת המייל באמצעותה ניצור איתך קשר" />
            </div>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="your@email.com"
              className={form.email && !isEmailValid(form.email) ? "border-red-500" : ""}
            />
            {form.email && !isEmailValid(form.email) && (
              <p className="text-red-500 text-sm">כתובת אימייל לא תקינה</p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="description">תיאור הפנייה</Label>
              <HoogiTip tip="תאר את הפנייה שלך בהרחבה" />
            </div>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="אנא תאר את הפנייה בפירוט..."
              rows={4}
              className="min-h-[100px]"
            />
            {form.description && form.description.length < 10 && (
              <p className="text-red-500 text-sm">יש להזין לפחות 10 תווים</p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="file">קובץ מצורף (אופציונלי)</Label>
              <HoogiTip tip="ניתן לצרף קבצים מסוג PDF, PNG, JPG" />
            </div>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg"
            />
            {form.file && (
              <p className="text-sm text-gray-500">
                {form.file.name} ({Math.round(form.file.size / 1024)} KB)
              </p>
            )}
          </div>
          
          <Button
            type="submit"
            className="w-full h-10 mt-4"
            disabled={isSubmitting || !isFormValid()}
          >
            {isSubmitting ? "שולח..." : "שלח פנייה"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
