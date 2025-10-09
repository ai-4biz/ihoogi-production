
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Download, Send, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

// Mock data for invoices
const mockInvoices = [
  {
    id: "INV-2023-001",
    partner: "חברה לדוגמא בע״מ",
    amount: 3500,
    status: "paid",
    dateIssued: "2023-11-01",
    dateDue: "2023-12-01"
  },
  {
    id: "INV-2023-002",
    partner: "עסק קטן שלי",
    amount: 1200,
    status: "pending",
    dateIssued: "2023-11-05",
    dateDue: "2023-12-05"
  },
  {
    id: "INV-2023-003",
    partner: "מרכז השירותים",
    amount: 2800,
    status: "paid",
    dateIssued: "2023-10-15",
    dateDue: "2023-11-15"
  },
  {
    id: "INV-2023-004",
    partner: "סטארטאפ חדשני",
    amount: 1500,
    status: "overdue",
    dateIssued: "2023-09-22",
    dateDue: "2023-10-22"
  },
  {
    id: "INV-2023-005",
    partner: "קבוצת יזמות",
    amount: 4200,
    status: "pending",
    dateIssued: "2023-11-10",
    dateDue: "2023-12-10"
  }
];

type InvoiceStatus = "paid" | "pending" | "overdue";

const statusLabels: Record<InvoiceStatus, string> = {
  paid: "שולם",
  pending: "ממתין לתשלום",
  overdue: "באיחור"
};

const statusColors: Record<InvoiceStatus, string> = {
  paid: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  overdue: "bg-red-100 text-red-800"
};

const InvoicesTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInvoice, setSelectedInvoice] = useState<typeof mockInvoices[0] | null>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);

  const handleDownloadPDF = (invoiceId: string) => {
    toast.success(`חשבונית ${invoiceId} הורדה בהצלחה`);
  };

  const handleSendReminder = (invoiceId: string) => {
    toast.success(`תזכורת לגבי חשבונית ${invoiceId} נשלחה בהצלחה`);
  };

  const handlePreviewInvoice = (invoice: typeof mockInvoices[0]) => {
    setSelectedInvoice(invoice);
    setPreviewDialogOpen(true);
  };

  // Format date to Hebrew format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('he-IL', { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric'
    }).format(date);
  };

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="חיפוש לפי מספר חשבונית או שם שותף..."
            className="pl-10 rtl:pr-10 rtl:pl-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="סטטוס" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל הסטטוסים</SelectItem>
              <SelectItem value="paid">שולם</SelectItem>
              <SelectItem value="pending">ממתין לתשלום</SelectItem>
              <SelectItem value="overdue">באיחור</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="bg-[#2D66F2] hover:bg-blue-700">
          צור חשבונית חדשה
        </Button>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>מספר חשבונית</TableHead>
              <TableHead>שותף</TableHead>
              <TableHead className="hidden md:table-cell">סכום (₪)</TableHead>
              <TableHead className="hidden md:table-cell">תאריך הוצאה</TableHead>
              <TableHead>סטטוס</TableHead>
              <TableHead>פעולות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.partner}</TableCell>
                  <TableCell className="hidden md:table-cell">{invoice.amount.toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(invoice.dateIssued)}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[invoice.status as InvoiceStatus]}>
                      {statusLabels[invoice.status as InvoiceStatus]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handlePreviewInvoice(invoice)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">צפה</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>צפה בחשבונית</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDownloadPDF(invoice.id)}
                          >
                            <Download className="h-4 w-4" />
                            <span className="sr-only">הורד PDF</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>הורד PDF</p>
                        </TooltipContent>
                      </Tooltip>

                      {(invoice.status === "pending" || invoice.status === "overdue") && (
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleSendReminder(invoice.id)}
                            >
                              <Send className="h-4 w-4" />
                              <span className="sr-only">שלח תזכורת</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>שלח תזכורת</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  לא נמצאו חשבוניות
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>צפייה בחשבונית {selectedInvoice?.id}</DialogTitle>
            <DialogDescription>פרטי חשבונית לשותף {selectedInvoice?.partner}</DialogDescription>
          </DialogHeader>
          
          <div className="bg-white p-6 border rounded-lg">
            <div className="flex justify-between mb-8">
              <div>
                <h3 className="font-bold text-xl">חשבונית #{selectedInvoice?.id}</h3>
                <p className="text-gray-500">הוצאה בתאריך: {selectedInvoice && formatDate(selectedInvoice.dateIssued)}</p>
              </div>
              <div className="text-right">
                <h3 className="font-bold">הוגי טכנולוגיות בע״מ</h3>
                <p>רחוב הטכנולוגיה 123</p>
                <p>תל אביב, ישראל</p>
                <p>מס׳ עוסק: 123456789</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h4 className="font-bold mb-2">לכבוד:</h4>
              <p>{selectedInvoice?.partner}</p>
              <p>כתובת השותף 123</p>
              <p>ישראל</p>
            </div>
            
            <div className="border rounded-lg overflow-hidden mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>תיאור</TableHead>
                    <TableHead className="text-right">סה״כ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>שירותי תוכן ושיווק דיגיטלי</TableCell>
                    <TableCell className="text-right">{selectedInvoice?.amount?.toLocaleString()} ₪</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">סה״כ לתשלום</TableCell>
                    <TableCell className="font-bold text-right">{selectedInvoice?.amount?.toLocaleString()} ₪</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <div className="border-t pt-4">
              <p className="font-bold mb-2">תנאי תשלום:</p>
              <p>נא לשלם עד לתאריך {selectedInvoice && formatDate(selectedInvoice.dateDue)}</p>
              <p className="mt-4">תודה על שיתוף הפעולה!</p>
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setPreviewDialogOpen(false)}>
              סגור
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleSendReminder(selectedInvoice?.id || "")}
              >
                <Send className="ml-2 h-4 w-4" />
                שלח תזכורת
              </Button>
              <Button 
                className="bg-[#2D66F2] hover:bg-blue-700"
                onClick={() => handleDownloadPDF(selectedInvoice?.id || "")}
              >
                <Download className="ml-2 h-4 w-4" />
                הורד PDF
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoicesTab;
