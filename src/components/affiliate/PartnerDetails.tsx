
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

interface PartnerDetailsProps {
  partner: any;
  isOpen: boolean;
  onClose: () => void;
}

const PartnerDetails = ({ partner, isOpen, onClose }: PartnerDetailsProps) => {
  const handleStatusChange = () => {
    // Mock function to change payment status
    toast({ 
      title: "סטטוס עודכן",
      description: `סטטוס התשלום של ${partner.name} עודכן בהצלחה.` 
    });
  };

  const handleSendEmail = () => {
    window.location.href = `mailto:${partner.email}`;
  };
  
  const handleSendWhatsapp = () => {
    window.location.href = `https://wa.me/${partner.whatsapp}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('he-IL').format(date);
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case "gold": return "bg-yellow-100 text-yellow-800";
      case "silver": return "bg-gray-100 text-gray-800";
      case "bronze": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTierName = (tier: string) => {
    return tier.charAt(0).toUpperCase() + tier.slice(1);
  };

  // Mock data for partner activity
  const partnerActivity = [
    { date: "2024-04-01", type: "הפניה", details: "הפנה 3 לקוחות חדשים", value: 300 },
    { date: "2024-03-25", type: "המרה", details: "לקוח הצטרף למנוי Professional", value: 1200 },
    { date: "2024-03-10", type: "תשלום", details: "תשלום עמלה חודשית", value: -850 },
    { date: "2024-03-05", type: "הפניה", details: "הפנה 2 לקוחות חדשים", value: 200 },
    { date: "2024-02-15", type: "המרה", details: "לקוח הצטרף למנוי Starter", value: 450 },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">פרטי שותף</DialogTitle>
          <DialogDescription>
            מידע מפורט על השותף והפעילות
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-1">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg">{partner.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{partner.id}</p>
              
              <Badge className={getTierBadgeColor(partner.tier)}>
                {formatTierName(partner.tier)}
              </Badge>
              
              <div className="mt-4 space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">אימייל</p>
                  <p className="text-sm">{partner.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">וואטסאפ</p>
                  <p className="text-sm">{partner.whatsapp}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">הצטרף בתאריך</p>
                  <p className="text-sm">{formatDate(partner.joinDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">סטטוס תשלום</p>
                  {partner.paymentStatus === "paid" ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">✅ שולם</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">🔴 ממתין</Badge>
                  )}
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleSendEmail}
                >
                  שלח אימייל
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleSendWhatsapp}
                >
                  שלח וואטסאפ
                </Button>
                <Button 
                  variant={partner.paymentStatus === "paid" ? "destructive" : "default"}
                  className="w-full" 
                  onClick={handleStatusChange}
                >
                  {partner.paymentStatus === "paid" ? "סמן כלא שולם" : "סמן כשולם"}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="mb-6">
              <h3 className="font-semibold mb-2">סיכום פעילות</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-sm text-blue-700">לידיים</p>
                  <p className="text-xl font-bold">{partner.leads}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <p className="text-sm text-purple-700">המרות</p>
                  <p className="text-xl font-bold">{partner.conversions}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-sm text-green-700">הכנסה (₪)</p>
                  <p className="text-xl font-bold">{partner.revenue}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">היסטורית פעילות</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>תאריך</TableHead>
                      <TableHead>סוג פעילות</TableHead>
                      <TableHead>פרטים</TableHead>
                      <TableHead className="text-right">ערך (₪)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partnerActivity.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell>{formatDate(activity.date)}</TableCell>
                        <TableCell>{activity.type}</TableCell>
                        <TableCell>{activity.details}</TableCell>
                        <TableCell className={`text-right ${activity.value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {activity.value >= 0 ? '+' : ''}{activity.value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose}>סגור</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerDetails;
