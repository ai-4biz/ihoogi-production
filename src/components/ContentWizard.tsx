
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import WizardProgress from "@/components/WizardProgress";
import Step1Category from "@/components/wizard/Step1Category";
import Step2BusinessDetails from "@/components/wizard/Step2BusinessDetails";
import Step3StylePreferences from "@/components/wizard/Step3StylePreferences";
import Step4Branding from "@/components/wizard/Step4Branding";
import WizardSummary from "@/components/wizard/WizardSummary";
import { toast } from "sonner";

const initialFormData = {
  // Step 1
  category: "",
  subcategory: "",
  customCategory: "",
  customSubcategory: "",
  
  // Step 2
  businessName: "",
  mainService: "",
  geographicArea: "",
  customGeographicArea: "",
  targetAudience: "",
  customTargetAudience: "",
  niche: "",
  website: "",
  
  // Step 3
  language: "",
  differentiator: "",
  values: [],
  customValue: "",
  feeling: "",
  favoritePhrase: "",
  blogs: "",
  socialProfiles: [],
  
  // Step 4
  logoUploaded: false,
  profileImageUploaded: false,
  allowDistribution: false,
  allowLeadCollection: false,
  internalTag: "",
};

const ContentWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // In a real app, you could load saved data from localStorage or an API
    const savedData = localStorage.getItem("contentWizardData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (e) {
        console.error("Failed to parse saved data");
      }
    }
  }, []);

  const updateFormData = (data: any) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);
    // In a real app, save to localStorage or an API on each update
    localStorage.setItem("contentWizardData", JSON.stringify(updatedData));
    toast.success("נשמר בהצלחה");
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      setCompleted(true);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const resetWizard = () => {
    setFormData(initialFormData);
    setStep(1);
    setCompleted(false);
    localStorage.removeItem("contentWizardData");
  };

  const renderStep = () => {
    if (completed) {
      return <WizardSummary formData={formData} resetWizard={resetWizard} />;
    }

    switch (step) {
      case 1:
        return <Step1Category formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Step2BusinessDetails formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Step3StylePreferences formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <Step4Branding formData={formData} updateFormData={updateFormData} />;
      default:
        return <Step1Category formData={formData} updateFormData={updateFormData} />;
    }
  };

  const isStepValid = () => {
    // Validation logic for each step
    switch (step) {
      case 1:
        return !!formData.category && (formData.category !== "other" || !!formData.customCategory);
      case 2:
        return !!formData.businessName;
      case 3:
        return !!formData.language;
      case 4:
        return !!formData.internalTag;
      default:
        return true;
    }
  };

  if (completed) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-100">
        {renderStep()}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">
        שאלון אישי – כדי שנתאים את התוכן במיוחד לעסק שלך
      </h1>
      
      <WizardProgress currentStep={step} totalSteps={4} />
      
      {renderStep()}
      
      <div className="flex justify-between mt-10">
        {step > 1 ? (
          <Button 
            onClick={prevStep}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/5"
          >
            חזרה
          </Button>
        ) : (
          <div></div>
        )}
        
        <Button 
          onClick={nextStep}
          disabled={!isStepValid()}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {step === 4 ? "סיום והמשך ליצירת תוכן" : "המשך"}
        </Button>
      </div>
    </div>
  );
};

export default ContentWizard;
