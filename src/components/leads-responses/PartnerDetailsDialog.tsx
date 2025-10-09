import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Users, Mail, Phone, Globe } from "lucide-react";

interface Partner {
  name: string;
  total: number;
  new: number;
  email?: string;
  phone?: string;
  website?: string;
  startDate?: string;
  description?: string;
  performance?: {
    month: string;
    leads: number;
  }[];
}

interface PartnerDetailsDialogProps {
  partner: Partner | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PartnerDetailsDialog = ({ partner, open, onOpenChange }: PartnerDetailsDialogProps) => {
  if (!partner) return null;

  const mockPartner = {
    ...partner,
    email: "partner@example.com",
    phone: "050-1234567",
    website: "www.partner-site.com",
    startDate: "01.01.2025",
    description: "שותף עסקי מוביל בתחום השיווק הדיגיטלי עם התמחות בקידום ברשתות חברתיות",
    performance: [
      { month: "ינואר", leads: 12 },
      { month: "פברואר", leads: 18 },
      { month: "מרץ", leads: 15 },
      { month: "אפריל", leads: 22 },
      { month: "מאי", leads: partner.total },
    ],
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            פרטי שותף: {mockPartner.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">{mockPartner.total}</div>
                <div className="text-sm text-muted-foreground">סה״כ לידים</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-500/20 bg-green-50">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{mockPartner.new}</div>
                <div className="text-sm text-muted-foreground">לידים חדשים</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-500/20 bg-orange-50">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  {Math.round((mockPartner.new / mockPartner.total) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">שיעור המרה</div>
              </CardContent>
            </Card>
          </div>

          {/* Partner Info */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">תאריך התחלה:</span>
                <Badge variant="outline">{mockPartner.startDate}</Badge>
              </div>

              {mockPartner.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">אימייל:</span>
                  <a href={`mailto:${mockPartner.email}`} className="text-primary hover:underline">
                    {mockPartner.email}
                  </a>
                </div>
              )}

              {mockPartner.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">טלפון:</span>
                  <a href={`tel:${mockPartner.phone}`} className="text-primary hover:underline">
                    {mockPartner.phone}
                  </a>
                </div>
              )}

              {mockPartner.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">אתר:</span>
                  <a 
                    href={`https://${mockPartner.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {mockPartner.website}
                  </a>
                </div>
              )}

              {mockPartner.description && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {mockPartner.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Chart */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">ביצועים לפי חודש</h3>
              </div>
              <div className="space-y-3">
                {mockPartner.performance?.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.month}</span>
                      <span className="font-semibold">{item.leads} לידים</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${(item.leads / mockPartner.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">פעילות אחרונה</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">ליד חדש התקבל</div>
                    <div className="text-xs text-muted-foreground">לפני 2 שעות</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">ליד עודכן לסטטוס "בטיפול"</div>
                    <div className="text-xs text-muted-foreground">אתמול</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">3 לידים חדשים התקבלו</div>
                    <div className="text-xs text-muted-foreground">לפני 3 ימים</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerDetailsDialog;
