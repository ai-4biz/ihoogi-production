
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import PartnerDetails from "./PartnerDetails";

// Mock data for partners
const partners = [
  { 
    id: "P001", 
    name: "דן כהן", 
    email: "dan@example.com", 
    whatsapp: "+972501234567", 
    tier: "gold", 
    leads: 34, 
    conversions: 12, 
    revenue: 4500, 
    paymentStatus: "paid",
    joinDate: "2023-06-15" 
  },
  { 
    id: "P002", 
    name: "מיכל לוי", 
    email: "michal@example.com", 
    whatsapp: "+972502345678", 
    tier: "silver", 
    leads: 19, 
    conversions: 5, 
    revenue: 1850, 
    paymentStatus: "pending",
    joinDate: "2023-09-22" 
  },
  { 
    id: "P003", 
    name: "אבי ישראלי", 
    email: "avi@example.com", 
    whatsapp: "+972503456789", 
    tier: "bronze", 
    leads: 8, 
    conversions: 2, 
    revenue: 750, 
    paymentStatus: "paid",
    joinDate: "2024-01-10" 
  },
  { 
    id: "P004", 
    name: "רונית שרון", 
    email: "ronit@example.com", 
    whatsapp: "+972504567890", 
    tier: "gold", 
    leads: 45, 
    conversions: 18, 
    revenue: 6700, 
    paymentStatus: "paid",
    joinDate: "2022-11-05" 
  },
  { 
    id: "P005", 
    name: "עומר דוידוב", 
    email: "omer@example.com", 
    whatsapp: "+972505678901", 
    tier: "bronze", 
    leads: 6, 
    conversions: 1, 
    revenue: 375, 
    paymentStatus: "pending",
    joinDate: "2024-03-28" 
  },
];

const AffiliatePartners = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [showPartnerDetails, setShowPartnerDetails] = useState(false);
  
  // Filter partners based on search and filters
  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         partner.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTier = tierFilter === "" || partner.tier === tierFilter;
    const matchesStatus = statusFilter === "" || 
                         (statusFilter === "paid" && partner.paymentStatus === "paid") ||
                         (statusFilter === "pending" && partner.paymentStatus === "pending");
    
    return matchesSearch && matchesTier && matchesStatus;
  });

  const handlePartnerClick = (partner: any) => {
    setSelectedPartner(partner);
    setShowPartnerDetails(true);
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case "gold": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "silver": return "bg-gray-100 text-gray-800 hover:bg-gray-200";
      case "bronze": return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const formatTierName = (tier: string) => {
    return tier.charAt(0).toUpperCase() + tier.slice(1);
  };

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>שותפים</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="חיפוש לפי שם, מזהה או אימייל..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="w-full md:w-40">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Select value={tierFilter} onValueChange={setTierFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="סינון לפי דרגה" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">הכל</SelectItem>
                          <SelectItem value="bronze">Bronze</SelectItem>
                          <SelectItem value="silver">Silver</SelectItem>
                          <SelectItem value="gold">Gold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>סנן שותפים לפי דרגה</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="w-full md:w-40">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="סינון לפי סטטוס" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">הכל</SelectItem>
                          <SelectItem value="paid">שולם</SelectItem>
                          <SelectItem value="pending">ממתין</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>סנן שותפים לפי סטטוס תשלום</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>שם שותף & מזהה</TableHead>
                    <TableHead>דרגה</TableHead>
                    <TableHead className="text-center">לידיים</TableHead>
                    <TableHead className="text-center">המרות</TableHead>
                    <TableHead className="text-center">הכנסה (₪)</TableHead>
                    <TableHead className="text-center">סטטוס</TableHead>
                    <TableHead className="text-right">פרטי קשר</TableHead>
                    <TableHead className="text-right">פעולות</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPartners.map((partner) => (
                    <TableRow key={partner.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{partner.name}</div>
                          <div className="text-xs text-muted-foreground">{partner.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTierBadgeColor(partner.tier)}>
                          {formatTierName(partner.tier)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">{partner.leads}</TableCell>
                      <TableCell className="text-center">{partner.conversions}</TableCell>
                      <TableCell className="text-center">{partner.revenue}</TableCell>
                      <TableCell className="text-center">
                        {partner.paymentStatus === "paid" ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">✅ שולם</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">🔴 ממתין</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => window.location.href = `mailto:${partner.email}`}>
                                  ✉️
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{partner.email}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => window.location.href = `https://wa.me/${partner.whatsapp}`}>
                                  🟢
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{partner.whatsapp}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handlePartnerClick(partner)}
                        >
                          פרטי שותף
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredPartners.map((partner) => (
              <Card key={partner.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{partner.name}</h4>
                      <p className="text-xs text-muted-foreground">{partner.id}</p>
                    </div>
                    <Badge className={getTierBadgeColor(partner.tier)}>
                      {formatTierName(partner.tier)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="text-sm">
                      <p className="text-muted-foreground">לידיים</p>
                      <p className="font-medium">{partner.leads}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">המרות</p>
                      <p className="font-medium">{partner.conversions}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">הכנסה (₪)</p>
                      <p className="font-medium">{partner.revenue}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">סטטוס</p>
                      {partner.paymentStatus === "paid" ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">✅ שולם</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">🔴 ממתין</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => window.location.href = `mailto:${partner.email}`}
                      >
                        ✉️
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => window.location.href = `https://wa.me/${partner.whatsapp}`}
                      >
                        🟢
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handlePartnerClick(partner)}
                    >
                      פרטי שותף
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {showPartnerDetails && selectedPartner && (
        <PartnerDetails 
          partner={selectedPartner} 
          isOpen={showPartnerDetails} 
          onClose={() => setShowPartnerDetails(false)} 
        />
      )}
    </div>
  );
};

export default AffiliatePartners;
