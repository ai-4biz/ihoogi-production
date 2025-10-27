import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Star, Calendar, Mic, Paperclip } from "lucide-react";
import { Question } from "./QuestionBuilder";

interface FormPreviewProps {
  questions: Question[];
  formTitle?: string;
  formDescription?: string;
  logoUrl?: string;
  profileImageUrl?: string;
  businessName?: string;
}

const FormPreview = ({ 
  questions, 
  formTitle = "שאלון לדוגמה",
  formDescription = "נשמח אם תוכל למלא את השאלון הבא",
  logoUrl,
  profileImageUrl,
  businessName
}: FormPreviewProps) => {
  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "text":
        return (
          <Textarea 
            placeholder={question.placeholder || "הכנס תשובה..."}
            className="min-h-[100px]"
          />
        );
      
      case "email":
        return (
          <Input 
            type="email" 
            placeholder={question.placeholder || "example@email.com"}
          />
        );
      
      case "phone":
        return (
          <Input 
            type="tel" 
            placeholder={question.placeholder || "050-1234567"}
          />
        );
      
      case "single-choice":
        return (
          <RadioGroup>
            {question.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value={option} id={`${question.id}-${idx}`} />
                <Label htmlFor={`${question.id}-${idx}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case "multiple-choice":
        return (
          <div className="space-y-2">
            {question.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox id={`${question.id}-${idx}`} />
                <Label htmlFor={`${question.id}-${idx}`}>{option}</Label>
              </div>
            ))}
          </div>
        );
      
      case "rating":
        return (
          <div className="flex gap-2">
            {Array.from({ length: question.maxRating || 5 }, (_, i) => i + 1).map((num) => (
              <Button
                key={num}
                variant="outline"
                size="icon"
                className="hover:bg-primary/20"
              >
                <Star className="h-5 w-5" />
              </Button>
            ))}
          </div>
        );
      
      case "date":
        return (
          <div className="flex items-center gap-2">
            <Input type="date" />
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </div>
        );
      
      case "voice":
        return (
          <Button variant="outline" className="w-full">
            <Mic className="h-5 w-5 ml-2" />
            לחץ להקלטה קולית
          </Button>
        );
      
      case "file-upload":
        return (
          <Button variant="outline" className="w-full">
            <Paperclip className="h-5 w-5 ml-2" />
            העלה קובץ
          </Button>
        );
      
      default:
        return <Input placeholder="הכנס תשובה..." />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-background">
      <Card className="p-8 shadow-lg">
        {/* Banner with logo, profile and business name */}
        <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center gap-3">
            {logoUrl && (
              <img 
                src={logoUrl} 
                alt="Logo" 
                className="h-12 w-12 object-contain"
              />
            )}
            
            {profileImageUrl && (
              <img 
                src={profileImageUrl} 
                alt="Profile" 
                className="h-12 w-12 object-cover"
              />
            )}
          </div>
          
          {businessName && (
            <h2 className="text-xl font-bold text-primary">
              {businessName}
            </h2>
          )}
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary mb-2">
            {formTitle}
          </h1>
          {formDescription && (
            <p className="text-muted-foreground">
              {formDescription}
            </p>
          )}
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="space-y-3">
              <Label className="text-base font-semibold">
                {index + 1}. {question.title}
                {question.required && (
                  <span className="text-destructive mr-1">*</span>
                )}
              </Label>
              {renderQuestion(question)}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <Button size="lg" className="px-12">
            שלח שאלון
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FormPreview;
