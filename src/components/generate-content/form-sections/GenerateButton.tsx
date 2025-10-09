
import { Button } from "@/components/ui/button";

interface GenerateButtonProps {
  onGenerate: () => void;
}

const GenerateButton = ({ onGenerate }: GenerateButtonProps) => {
  return (
    <div className="flex justify-center">
      <Button 
        onClick={onGenerate} 
        className="bg-primary text-white px-8 py-6 text-lg"
      >
        ✨ צור תוכן
      </Button>
    </div>
  );
};

export default GenerateButton;
