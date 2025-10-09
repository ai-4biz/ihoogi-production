
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import ContactDialog from "./ContactDialog";

const ContactButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center gap-1.5"
        onClick={() => setIsDialogOpen(true)}
      >
        <Mail className="h-4 w-4" />
        <span>צור קשר</span>
      </Button>
      
      <ContactDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};

export default ContactButton;
