
import { useState } from "react";
import { toast } from "sonner";
import GeneralSettings from "./form-sections/GeneralSettings";
import AIInputOptions from "./form-sections/AIInputOptions";
import ContentSettings from "./form-sections/ContentSettings";
import GenerateButton from "./form-sections/GenerateButton";

const ContentForm = () => {
  // State for all form fields
  const [selectedCategory, setSelectedCategory] = useState('');
  const [language, setLanguage] = useState('he');
  const [useInspiration, setUseInspiration] = useState(false);
  const [userInputText, setUserInputText] = useState('');
  const [uploadedContentFile, setUploadedContentFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedLibraryImage, setSelectedLibraryImage] = useState('');
  const [useBusinessLogo, setUseBusinessLogo] = useState(true);
  const [profileImageUpload, setProfileImageUpload] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [tone, setTone] = useState('');
  const [ctaText, setCtaText] = useState('');

  const handleVoiceInput = (text: string) => {
    setUserInputText(text);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setter: (file: any) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      setter(file);
      toast.success(`הקובץ ${file.name} הועלה בהצלחה`);
    }
  };

  const generateContent = () => {
    // Validation
    if (!selectedCategory) {
      toast.error('יש לבחור קטגוריה');
      return;
    }

    if (!userInputText && !uploadedContentFile) {
      toast.error('יש להזין טקסט או להעלות קובץ');
      return;
    }

    toast.success('מייצר תוכן... זה עשוי לקחת כמה שניות');
    
    // In a real implementation, this would call an API
    setTimeout(() => {
      toast.success('התוכן נוצר בהצלחה!');
      // Here we would navigate to a content preview page 
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* General Settings Section */}
      <GeneralSettings 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        language={language}
        setLanguage={setLanguage}
        useInspiration={useInspiration}
        setUseInspiration={setUseInspiration}
      />
      
      {/* AI Input Options Section */}
      <AIInputOptions 
        userInputText={userInputText}
        setUserInputText={setUserInputText}
        uploadedContentFile={uploadedContentFile}
        setUploadedContentFile={setUploadedContentFile}
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        useBusinessLogo={useBusinessLogo}
        setUseBusinessLogo={setUseBusinessLogo}
        handleVoiceInput={handleVoiceInput}
        handleFileUpload={handleFileUpload}
      />
      
      {/* Content Settings Section */}
      <ContentSettings 
        selectedPlatform={selectedPlatform}
        setSelectedPlatform={setSelectedPlatform}
        tone={tone}
        setTone={setTone}
        ctaText={ctaText}
        setCtaText={setCtaText}
      />
      
      {/* Generate Button */}
      <GenerateButton onGenerate={generateContent} />
    </div>
  );
};

export default ContentForm;
