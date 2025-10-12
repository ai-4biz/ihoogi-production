import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  DollarSign, 
  Calendar, 
  CreditCard, 
  Building, 
  FileText,
  TrendingUp,
  Clock,
  UserCheck,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  totalEarnings: number;
  monthlyEarnings: number;
  commissionType: CommissionType;
  paymentMethod: PaymentMethod;
  nextPaymentDate?: string;
  usersBrought: number;
  conversionRate: number;
}

interface CommissionType {
  type: 'fixed_monthly' | 'percentage_monthly' | 'one_time' | 'mixed' | 'user_based' | 'time_based';
  fixedAmount?: number;
  percentage?: number;
  minAmount?: number;
  maxAmount?: number;
  expiryDate?: string;
  userThreshold?: number;
  initialAmount?: number;
  monthlyAmount?: number;
  timeBasedAmount?: number;
  timePeriod?: string;
  conditions?: string[];
}

interface PaymentMethod {
  type: 'credit_card' | 'bank_transfer' | 'paypal' | 'crypto';
  details: string;
  accountNumber?: string;
  bankName?: string;
  cardLast4?: string;
  isDefault: boolean;
}

const PartnersManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'partners' | 'commissions' | 'payments' | 'reports'>('partners');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showAddPartner, setShowAddPartner] = useState(false);
  const [showCommissionDialog, setShowCommissionDialog] = useState(false);

  // Mock data
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: '1',
      name: 'יוסי כהן',
      email: 'yossi@example.com',
      phone: '+972501234567',
      company: 'כהן ושות',
      status: 'active',
      joinDate: '2024-01-15',
      totalEarnings: 15000,
      monthlyEarnings: 2500,
      commissionType: {
        type: 'mixed',
        initialAmount: 1000,
        monthlyAmount: 2500,
        percentage: 15
      },
      paymentMethod: {
        type: 'bank_transfer',
        details: 'בנק הפועלים',
        accountNumber: '****1234',
        bankName: 'בנק הפועלים',
        isDefault: true
      },
      nextPaymentDate: '2024-02-15',
      usersBrought: 45,
      conversionRate: 78
    },
    {
      id: '2',
      name: 'שרה לוי',
      email: 'sara@example.com',
      phone: '+972501234568',
      status: 'active',
      joinDate: '2024-02-01',
      totalEarnings: 8500,
      monthlyEarnings: 1200,
      commissionType: {
        type: 'user_based',
        percentage: 20,
        userThreshold: 10,
        minAmount: 500,
        maxAmount: 5000
      },
      paymentMethod: {
        type: 'credit_card',
        details: 'Visa',
        cardLast4: '****5678',
        isDefault: true
      },
      usersBrought: 28,
      conversionRate: 65
    }
  ]);

  const commissionTypes = [
    { value: 'fixed_monthly', label: 'עמלה חודשית קבועה', icon: Calendar },
    { value: 'percentage_monthly', label: 'עמלה חודשית באחוזים', icon: TrendingUp },
    { value: 'one_time', label: 'עמלה חד פעמית', icon: DollarSign },
    { value: 'mixed', label: 'עמלה מעורבת', icon: Building },
    { value: 'user_based', label: 'עמלה לפי משתמשים', icon: UserCheck },
    { value: 'time_based', label: 'עמלה לפי זמן', icon: Clock }
  ];

  const paymentMethods = [
    { value: 'credit_card', label: 'כרטיס אשראי', icon: CreditCard },
    { value: 'bank_transfer', label: 'העברה בנקאית', icon: Building },
    { value: 'paypal', label: 'PayPal', icon: DollarSign },
    { value: 'crypto', label: 'מטבע דיגיטלי', icon: TrendingUp }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'פעיל';
      case 'inactive': return 'לא פעיל';
      case 'suspended': return 'מושעה';
      default: return 'לא ידוע';
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6" dir="rtl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">ניהול שותפים</h1>
              <p className="text-gray-500 text-lg">מערכת ניהול שותפים ועמלות מתקדמת</p>
            </div>
          </div>
          <Dialog open={showAddPartner} onOpenChange={setShowAddPartner}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                <Plus className="h-5 w-5 ml-2" />
                הוסף שותף חדש
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-right">הוספת שותף חדש</DialogTitle>
              </DialogHeader>
              <AddPartnerForm onClose={() => setShowAddPartner(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 text-right">סך השותפים</p>
                  <p className="text-2xl font-bold text-right">{partners.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 text-right">שותפים פעילים</p>
                  <p className="text-2xl font-bold text-right">{partners.filter(p => p.status === 'active').length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 text-right">סך עמלות החודש</p>
                  <p className="text-2xl font-bold text-right">
                    ₪{partners.reduce((sum, p) => sum + p.monthlyEarnings, 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 text-right">סך משתמשים שהובאו</p>
                  <p className="text-2xl font-bold text-right">{partners.reduce((sum, p) => sum + p.usersBrought, 0)}</p>
                </div>
                <UserCheck className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="partners" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              שותפים
            </TabsTrigger>
            <TabsTrigger value="commissions" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              עמלות
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              תשלומים
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              דוחות
            </TabsTrigger>
          </TabsList>

          {/* Partners Tab */}
          <TabsContent value="partners">
            <Card>
              <CardHeader>
                <CardTitle className="text-right">רשימת שותפים</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">שם</TableHead>
                        <TableHead className="text-right">סטטוס</TableHead>
                        <TableHead className="text-right">סוג עמלה</TableHead>
                        <TableHead className="text-right">עמלה חודשית</TableHead>
                        <TableHead className="text-right">משתמשים</TableHead>
                        <TableHead className="text-right">תשלום הבא</TableHead>
                        <TableHead className="text-right">פעולות</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {partners.map((partner) => (
                        <TableRow key={partner.id}>
                          <TableCell className="text-right">
                            <div>
                              <p className="font-medium">{partner.name}</p>
                              <p className="text-sm text-gray-500">{partner.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(partner.status)}>
                              {getStatusText(partner.status)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {commissionTypes.find(ct => ct.value === partner.commissionType.type)?.label}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ₪{partner.monthlyEarnings.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div>
                              <p>{partner.usersBrought}</p>
                              <p className="text-sm text-gray-500">{partner.conversionRate}% המרה</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {partner.nextPaymentDate}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commissions Tab */}
          <TabsContent value="commissions">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commissionTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Card key={type.value} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-right">
                        <Icon className="h-6 w-6 text-blue-600" />
                        {type.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-right mb-4">
                        {getCommissionDescription(type.value)}
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setShowCommissionDialog(true)}
                      >
                        הגדר עמלה
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="text-right">ניהול תשלומים</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <Card key={method.value} className="p-4">
                          <div className="flex items-center gap-3">
                            <Icon className="h-6 w-6 text-blue-600" />
                            <span className="font-medium">{method.label}</span>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-right">הגדרות תשלום</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-right">תשלום אוטומטי</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-right">שליחת חשבונית</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-right">תזכורת תשלום</span>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="text-right">דוחות ועמלות</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <FileText className="h-6 w-6 mb-2" />
                      דוח חודשי
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <TrendingUp className="h-6 w-6 mb-2" />
                      דוח ביצועים
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <DollarSign className="h-6 w-6 mb-2" />
                      דוח עמלות
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

// Helper function to get commission description
const getCommissionDescription = (type: string): string => {
  switch (type) {
    case 'fixed_monthly':
      return 'עמלה קבועה המשולמת מדי חודש בסכום קבוע';
    case 'percentage_monthly':
      return 'עמלה המשולמת כאחוז מההכנסות החודשיות';
    case 'one_time':
      return 'עמלה חד פעמית המשולמת לאחר השגת מטרה מסוימת';
    case 'mixed':
      return 'שילוב של עמלה ראשונית ועמלה חודשית';
    case 'user_based':
      return 'עמלה המשולמת לפי מספר המשתמשים שהובאו';
    case 'time_based':
      return 'עמלה המשולמת לפי תקופת זמן מסוימת';
    default:
      return '';
  }
};

// Add Partner Form Component
const AddPartnerForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    commissionType: '',
    paymentMethod: '',
    fixedAmount: '',
    percentage: '',
    initialAmount: '',
    monthlyAmount: ''
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-right">שם מלא</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="text-right"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-right">אימייל</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="text-right"
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-right">טלפון</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="text-right"
          />
        </div>
        <div>
          <Label htmlFor="company" className="text-right">חברה (אופציונלי)</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="text-right"
          />
        </div>
      </div>

      <div>
        <Label className="text-right">סוג עמלה</Label>
        <Select value={formData.commissionType} onValueChange={(value) => setFormData({ ...formData, commissionType: value })}>
          <SelectTrigger className="text-right">
            <SelectValue placeholder="בחר סוג עמלה" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fixed_monthly">עמלה חודשית קבועה</SelectItem>
            <SelectItem value="percentage_monthly">עמלה חודשית באחוזים</SelectItem>
            <SelectItem value="one_time">עמלה חד פעמית</SelectItem>
            <SelectItem value="mixed">עמלה מעורבת</SelectItem>
            <SelectItem value="user_based">עמלה לפי משתמשים</SelectItem>
            <SelectItem value="time_based">עמלה לפי זמן</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-right">אמצעי תשלום</Label>
        <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
          <SelectTrigger className="text-right">
            <SelectValue placeholder="בחר אמצעי תשלום" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="credit_card">כרטיס אשראי</SelectItem>
            <SelectItem value="bank_transfer">העברה בנקאית</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
            <SelectItem value="crypto">מטבע דיגיטלי</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4 justify-end">
        <Button variant="outline" onClick={onClose}>
          ביטול
        </Button>
        <Button onClick={() => {
          // Handle save
          onClose();
        }}>
          שמור שותף
        </Button>
      </div>
    </div>
  );
};

export default PartnersManagement;
