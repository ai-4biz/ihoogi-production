
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Pencil } from "lucide-react";

interface ContactRoute {
  id: string;
  subject: string;
  email: string;
  responsiblePerson: string;
  phone: string;
}

const ContactRoutingForm = () => {
  const [routes, setRoutes] = useState<ContactRoute[]>([
    { id: "1", subject: "תמיכה טכנית", email: "support@example.com", responsiblePerson: "טל", phone: "050-1234567" },
    { id: "2", subject: "שירות לקוחות", email: "service@example.com", responsiblePerson: "דנה", phone: "050-2345678" },
    { id: "3", subject: "בעיה בתשלום", email: "billing@example.com", responsiblePerson: "רוני", phone: "050-3456789" },
    { id: "4", subject: "דיווח על באג", email: "bugs@example.com", responsiblePerson: "אור", phone: "050-4567890" },
    { id: "5", subject: "שאלה כללית", email: "info@example.com", responsiblePerson: "ליאת", phone: "050-5678901" },
  ]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<ContactRoute | null>(null);
  
  const handleEditClick = (route: ContactRoute) => {
    setCurrentRoute({...route});
    setIsEditing(true);
  };
  
  const handleInputChange = (field: keyof ContactRoute, value: string) => {
    if (currentRoute) {
      setCurrentRoute({
        ...currentRoute,
        [field]: value
      });
    }
  };
  
  const handleSave = () => {
    if (currentRoute) {
      setRoutes(routes.map(route => 
        route.id === currentRoute.id ? currentRoute : route
      ));
      
      setIsEditing(false);
      setCurrentRoute(null);
      
      toast({
        title: "הגדרות עודכנו",
        description: "עדכון הגדרות הפניית הפניות בוצע בהצלחה",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">ניהול ניתוב פניות</h3>
        <p className="text-sm text-muted-foreground">
          הגדר לאן יופנו פניות לפי נושא הפנייה
        </p>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>נושא</TableHead>
              <TableHead>כתובת דואר</TableHead>
              <TableHead>אחראי לקבלת הפניות</TableHead>
              <TableHead className="w-[80px]">פעולות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.id}>
                <TableCell className="font-medium">{route.subject}</TableCell>
                <TableCell dir="ltr">{route.email}</TableCell>
                <TableCell>{route.responsiblePerson} (טלפון: {route.phone})</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEditClick(route)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>עריכת ניתוב פניות</DialogTitle>
          </DialogHeader>
          
          {currentRoute && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">נושא</label>
                <Input 
                  value={currentRoute.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">כתובת דואר</label>
                <Input 
                  value={currentRoute.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  dir="ltr"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">שם האחראי</label>
                <Input 
                  value={currentRoute.responsiblePerson}
                  onChange={(e) => handleInputChange("responsiblePerson", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">מספר טלפון</label>
                <Input 
                  value={currentRoute.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  dir="ltr"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsEditing(false)} variant="outline">
              ביטול
            </Button>
            <Button onClick={handleSave}>
              שמור שינויים
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactRoutingForm;
