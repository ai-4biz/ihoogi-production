
import { Mic } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
}

const VoiceInput = ({ onTranscript }: VoiceInputProps) => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    // For now we'll simulate recording
    setIsRecording(true);
    
    // In a real implementation, this would connect to a speech-to-text service
    setTimeout(() => {
      setIsRecording(false);
      toast.success("הקלטה הושלמה");
      // This would normally contain the transcribed text from a service like Whisper/Google STT
      onTranscript("טקסט לדוגמה מהמיקרופון");
    }, 2000);
  };

  return (
    <Button 
      type="button" 
      variant="ghost" 
      size="icon" 
      className={`rounded-full ${isRecording ? 'text-accent animate-pulse' : 'text-primary'}`}
      onClick={startRecording}
    >
      <Mic className="h-5 w-5" />
    </Button>
  );
};

export default VoiceInput;
