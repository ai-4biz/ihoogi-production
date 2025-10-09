
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TranslateDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  index: number;
}

const TranslateDialog = ({ isOpen, setIsOpen, title, index }: TranslateDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>תרגום מאמר</DialogTitle>
          <DialogDescription>
            {title} #{index + 1}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-center text-gray-600">מתרגם מאמר...</p>
          <div className="flex justify-between">
            <Button onClick={() => setIsOpen(false)}>סגור</Button>
            <div className="flex gap-2">
              <Button variant="outline">English</Button>
              <Button variant="outline">עברית</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TranslateDialog;
