import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuestionnaireAnswersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leadName: string;
  questionnaireName: string;
  answers: Record<string, string>;
}

const QuestionnaireAnswersDialog = ({
  open,
  onOpenChange,
  leadName,
  questionnaireName,
  answers,
}: QuestionnaireAnswersDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>תשובות לקוח - {leadName}</span>
            <Badge variant="outline" className="font-normal">
              {questionnaireName}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4">
            {Object.entries(answers).map(([question, answer]) => (
              <div
                key={question}
                className="bg-muted/50 rounded-lg p-4 space-y-2"
              >
                <div className="font-medium text-sm text-muted-foreground">
                  {question}
                </div>
                <div className="text-base">
                  {answer}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionnaireAnswersDialog;
