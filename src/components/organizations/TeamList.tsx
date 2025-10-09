
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Mail, UserPlus, ChevronDown, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";

// Mock data for team members
const mockTeamMembers = [
  {
    id: "1",
    name: "ישראל ישראלי",
    email: "israel@example.com",
    role: "admin",
    lastLogin: "2023-11-15T12:30:45"
  },
  {
    id: "2",
    name: "חנה כהן",
    email: "hana@example.com",
    role: "editor",
    lastLogin: "2023-11-14T09:22:15"
  },
  {
    id: "3",
    name: "יוסף לוי",
    email: "yosef@example.com",
    role: "viewer",
    lastLogin: "2023-11-10T16:40:30"
  },
  {
    id: "4",
    name: "שרה גולדברג",
    email: "sarah@example.com",
    role: "editor",
    lastLogin: "2023-11-13T11:05:22"
  },
  {
    id: "5",
    name: "דוד מזרחי",
    email: "david@example.com",
    role: "viewer",
    lastLogin: "2023-11-12T14:15:10"
  }
];

type UserRole = "admin" | "editor" | "viewer";

const roleLabels: Record<UserRole, string> = {
  admin: "מנהל",
  editor: "עורך",
  viewer: "צופה"
};

const roleColors: Record<UserRole, string> = {
  admin: "bg-purple-100 text-purple-800",
  editor: "bg-blue-100 text-blue-800",
  viewer: "bg-green-100 text-green-800"
};

const TeamList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<UserRole>("viewer");

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('he-IL', { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleInvite = () => {
    if (!inviteEmail) {
      toast.error("נא להזין כתובת אימייל");
      return;
    }
    
    toast.success(`הזמנה נשלחה ל-${inviteEmail}`);
    setInviteEmail("");
    setInviteRole("viewer");
    setInviteDialogOpen(false);
  };

  const handleChangeRole = (userId: string, newRole: UserRole) => {
    toast.success(`הרשאות המשתמש עודכנו ל${roleLabels[newRole]}`);
  };

  const filteredMembers = mockTeamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="חיפוש לפי שם או אימייל..."
            className="pl-10 rtl:pr-10 rtl:pl-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-48">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger>
              <SelectValue placeholder="תפקיד" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל התפקידים</SelectItem>
              <SelectItem value="admin">מנהל</SelectItem>
              <SelectItem value="editor">עורך</SelectItem>
              <SelectItem value="viewer">צופה</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#2D66F2] hover:bg-blue-700">
              <UserPlus className="ml-2 h-4 w-4" />
              הוסף משתמש
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>הזמן משתמש חדש</DialogTitle>
              <DialogDescription>
                שלח הזמנה למשתמש חדש להצטרף לארגון
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">כתובת אימייל</Label>
                <Input
                  id="email"
                  placeholder="email@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="role">תפקיד</Label>
                <Select value={inviteRole} onValueChange={(value) => setInviteRole(value as UserRole)}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="בחר תפקיד" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">מנהל</SelectItem>
                    <SelectItem value="editor">עורך</SelectItem>
                    <SelectItem value="viewer">צופה</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                ביטול
              </Button>
              <Button className="bg-[#2D66F2] hover:bg-blue-700" onClick={handleInvite}>
                שלח הזמנה
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>שם משתמש</TableHead>
              <TableHead className="hidden md:table-cell">אימייל</TableHead>
              <TableHead>תפקיד</TableHead>
              <TableHead className="hidden md:table-cell">
                <div className="flex items-center">
                  <Calendar className="ml-2 h-4 w-4" />
                  כניסה אחרונה
                </div>
              </TableHead>
              <TableHead>פעולות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{member.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[member.role as UserRole]}`}>
                      {roleLabels[member.role as UserRole]}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(member.lastLogin)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 px-2 lg:px-3">
                              עדכן הרשאות
                              <ChevronDown className="mr-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>שנה את הרשאות המשתמש</p>
                        </TooltipContent>
                      </Tooltip>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleChangeRole(member.id, "admin")}>
                          מנהל
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeRole(member.id, "editor")}>
                          עורך
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeRole(member.id, "viewer")}>
                          צופה
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  לא נמצאו משתמשים
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TeamList;
