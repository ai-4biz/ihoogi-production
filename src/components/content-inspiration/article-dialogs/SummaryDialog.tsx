
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SummaryDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  index: number;
}

const SummaryDialog = ({ isOpen, setIsOpen, title, index }: SummaryDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>סיכום AI</DialogTitle>
          <DialogDescription>
            {title} #{index + 1}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-gray-600">תוכן מאמר זה עוסק ב{title}. חשוב לציין שעם התפתחות הטכנולוגיה, חשוב לשמור על עדכניות ורלוונטיות בתחום השיווק הדיגיטלי. הנקודות המרכזיות כוללות שימוש נכון בפלטפורמות חברתיות, יצירת תוכן איכותי, והבנת קהל היעד.</p>
          <Button onClick={() => setIsOpen(false)}>סגור</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SummaryDialog;
