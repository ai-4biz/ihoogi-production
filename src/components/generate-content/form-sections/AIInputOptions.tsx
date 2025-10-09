
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import FormField from "@/components/FormField";
import VoiceInput from "@/components/VoiceInput";

interface AIInputOptionsProps {
  userInputText: string;
  setUserInputText: (value: string) => void;
  uploadedContentFile: any;
  setUploadedContentFile: (file: any) => void;
  uploadedImage: any;
  setUploadedImage: (file: any) => void;
  useBusinessLogo: boolean;
  setUseBusinessLogo: (value: boolean) => void;
  handleVoiceInput: (text: string) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>, setter: (file: any) => void) => void;
}

const AIInputOptions = ({
  userInputText,
  setUserInputText,
  uploadedContentFile,
  setUploadedContentFile,
  uploadedImage,
  setUploadedImage,
  useBusinessLogo,
  setUseBusinessLogo,
  handleVoiceInput,
  handleFileUpload
}: AIInputOptionsProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">💡 אפשרויות קלט לבינה מלאכותית</h2>
      <div className="space-y-6">
        <FormField
          id="user-input-text"
          label="כתבי על מה את רוצה שהפוסט יהיה"
          type="textarea"
          value={userInputText}
          onChange={setUserInputText}
          placeholder="למשל: אני רוצה לכתוב על החשיבות של תזונה נכונה בקרב ספורטאים..."
          tooltip="הזיני כאן את הטקסט שאת רוצה שהפוסט יכלול, תיאור הנושא, או נקודות עיקריות"
        />
        
        <div className="space-y-2">
          <Label htmlFor="audio-recorder">או הקליטי הודעה קולית</Label>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <VoiceInput onTranscript={handleVoiceInput} />
            <span className="text-sm text-gray-500">לחצי להקלטה</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="content-file">העלאת מאמר או פוסט לדוגמה</Label>
          <Input
            id="content-file"
            type="file"
            accept=".docx,.pdf,.txt,.md"
            onChange={(e) => handleFileUpload(e, setUploadedContentFile)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="image-upload">העלאת תמונה לפוסט</Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, setUploadedImage)}
          />
        </div>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <Switch 
            id="use-business-logo" 
            checked={useBusinessLogo} 
            onCheckedChange={setUseBusinessLogo}
          />
          <Label htmlFor="use-business-logo">השתמשי בלוגו העסק?</Label>
        </div>
        
        {useBusinessLogo && (
          <div className="p-4 border rounded-md flex items-center justify-center">
            <div className="text-center">
              <img 
                src="/placeholder.svg" 
                alt="Business Logo" 
                className="w-24 h-24 mx-auto"
              />
              <p className="text-sm text-gray-500 mt-2">לוגו העסק</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInputOptions;
