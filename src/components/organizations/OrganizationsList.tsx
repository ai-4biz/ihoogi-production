
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription, 
  DrawerFooter, 
  DrawerClose 
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { Search, PlusCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Mock data for organizations
const mockOrganizations = [
  {
    id: "1",
    name: "חברה לדוגמא בע״מ",
    ownerEmail: "owner@example.com",
    usersCount: 12,
    contentCount: 45,
    status: "active",
    createdAt: "2023-01-15"
  },
  {
    id: "2",
    name: "עסק קטן שלי",
    ownerEmail: "small@business.com",
    usersCount: 3,
    contentCount: 17,
    status: "active",
    createdAt: "2023-03-22"
  },
  {
    id: "3",
    name: "מרכז השירותים",
    ownerEmail: "service@center.co.il",
    usersCount: 8,
    contentCount: 32,
    status: "inactive",
    createdAt: "2023-07-05"
  },
  {
    id: "4",
    name: "סטארטאפ חדשני",
    ownerEmail: "startup@innovation.com",
    usersCount: 5,
    contentCount: 9,
    status: "pending",
    createdAt: "2023-11-10"
  },
  {
    id: "5",
    name: "קבוצת יזמות",
    ownerEmail: "group@ventures.co.il",
    usersCount: 15,
    contentCount: 67,
    status: "active",
    createdAt: "2023-02-18"
  }
];

type OrgStatus = "active" | "inactive" | "pending";

const statusLabels: Record<OrgStatus, string> = {
  active: "פעיל",
  inactive: "לא פעיל",
  pending: "ממתין"
};

const statusColors: Record<OrgStatus, string> = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800"
};

const OrganizationsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrg, setSelectedOrg] = useState<typeof mockOrganizations[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenOrg = (org: typeof mockOrganizations[0]) => {
    setSelectedOrg(org);
    setDrawerOpen(true);
  };

  const filteredOrgs = mockOrganizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          org.ownerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || org.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="חיפוש לפי שם או אימייל..."
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
              <SelectItem value="active">פעיל</SelectItem>
              <SelectItem value="inactive">לא פעיל</SelectItem>
              <SelectItem value="pending">ממתין</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="bg-[#2D66F2] hover:bg-blue-700">
          <PlusCircle className="ml-2 h-4 w-4" />
          הוסף ארגון
        </Button>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>שם הארגון</TableHead>
              <TableHead className="hidden md:table-cell">אימייל בעלים</TableHead>
              <TableHead className="hidden md:table-cell">מספר משתמשים</TableHead>
              <TableHead className="hidden md:table-cell">פריטי תוכן</TableHead>
              <TableHead>סטטוס</TableHead>
              <TableHead>פעולות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrgs.length > 0 ? (
              filteredOrgs.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="font-medium">{org.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{org.ownerEmail}</TableCell>
                  <TableCell className="hidden md:table-cell">{org.usersCount}</TableCell>
                  <TableCell className="hidden md:table-cell">{org.contentCount}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      statusColors[org.status as OrgStatus]
                    )}>
                      {statusLabels[org.status as OrgStatus]}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenOrg(org)}
                        >
                          פתח
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>הצג פרטי ארגון</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  לא נמצאו ארגונים
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="max-h-[90vh]">
          <div className="max-w-3xl mx-auto w-full p-6">
            <DrawerHeader>
              <DrawerTitle className="text-2xl">{selectedOrg?.name}</DrawerTitle>
              <DrawerDescription>מזהה ארגון: {selectedOrg?.id}</DrawerDescription>
            </DrawerHeader>
            
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-sm text-gray-500">אימייל בעלים</h3>
                  <p className="mt-1">{selectedOrg?.ownerEmail}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-sm text-gray-500">תאריך יצירה</h3>
                  <p className="mt-1">{selectedOrg?.createdAt}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-sm text-gray-500">מספר משתמשים</h3>
                  <p className="mt-1">{selectedOrg?.usersCount}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-sm text-gray-500">פריטי תוכן</h3>
                  <p className="mt-1">{selectedOrg?.contentCount}</p>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => {
                  toast.success("הסטטוס עודכן בהצלחה");
                  setDrawerOpen(false);
                }}>
                  עדכן סטטוס
                </Button>
                
                <Button 
                  className="bg-[#2D66F2] hover:bg-blue-700" 
                  onClick={() => {
                    toast.success("הארגון עודכן בהצלחה");
                    setDrawerOpen(false);
                  }}
                >
                  שמור שינויים
                </Button>
              </div>
            </div>
            
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">סגור</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default OrganizationsList;
