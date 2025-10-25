import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { Progress } from '@/components/ui/progress';
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
  CheckCircle,
  Settings,
  Link,
  Copy,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Eye,
  MoreHorizontal,
  Phone,
  Mail,
  ExternalLink,
  Zap,
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  Globe,
  ChevronDown,
  StickyNote,
  MessageCircle,
  Upload,
  Search
} from 'lucide-react';
import { toast } from 'sonner';
import MainLayout from '@/components/layout/MainLayout';
import AdvancedReportGenerator from '@/components/reports/AdvancedReportGenerator';
import SmartReportsSystem from '@/components/reports/SmartReportsSystem';

interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  totalEarnings: number;
  monthlyEarnings: number;
  commissionPercentage: number;
  totalLeads: number;
  totalSales: number;
  commissionType: CommissionType;
  paymentMethod: PaymentMethod;
  nextPaymentDate?: string;
  usersBrought: number;
  conversionRate: number;
  uniqueLink: string;
  personalDescription?: string;
  internalNotes?: string;
  monthlyPerformance: { month: string; leads: number; sales: number; commission: number }[];
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

interface CommissionPayment {
  id: string;
  partnerId: string;
  partnerName: string;
  amount: number;
  status: 'unpaid' | 'pending' | 'paid';
  dueDate: string;
  paidDate?: string;
  description: string;
}

interface ProgramSettings {
  defaultCommissionPercentage: number;
  linkExpiryDays: number;
  allowPartnerDataView: boolean;
  termsText: string;
  productCommissionRates: { productId: string; productName: string; commissionRate: number }[];
  
  // הגדרות חברת סליקה
  paymentGateway: 'manual' | 'zcredit' | 'payme' | 'tranzila' | 'max';
  gatewayApiKey: string;
  gatewayApiSecret: string;
  gatewayMerchantId: string;
  autoInvoiceGeneration: boolean;
}

// TODO: Future enhancements for affiliate system
// 1. Payment API Integration - connect to ZCredit/PayMe/Tranzila APIs for automated payments
// 2. Chart Library Integration - add Recharts or Chart.js for data visualization 
// 3. Real-time notifications - WebSocket integration for payment status updates
// 4. Advanced analytics - monthly/yearly performance comparisons and trends
// 5. Partner portal - separate login for partners to view their own data
// 6. Commission calculation engine - automated calculation based on sales/leads
// 7. Email automation - automated commission payment notifications
// 8. Mobile responsiveness - optimize touch interactions and mobile layouts

const PartnersManagement: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'partners' | 'new-partner' | 'reports' | 'send-form'>('partners');
  const [showAddPartner, setShowAddPartner] = useState(false);
  const [showCommissionDialog, setShowCommissionDialog] = useState(false);
  const [showPartnerDetails, setShowPartnerDetails] = useState(false);
  const [formSections, setFormSections] = useState({
    basic: true,
    business: false,
    commission: false,
    payment: false,
    advanced: false
  });

  // Smart Partners Generator states
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [viewedPartners, setViewedPartners] = useState<string[]>([]);
  const [partnerStatuses, setPartnerStatuses] = useState<Record<string, string>>({});
  const [partnerSubStatuses, setPartnerSubStatuses] = useState<Record<string, string>>({});
  const [selectedPartnerForNotes, setSelectedPartnerForNotes] = useState<Partner | null>(null);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<string | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [strengthFilter, setStrengthFilter] = useState('');
  
  // Partner search states
  const [partnerSearchTerm, setPartnerSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Partner[]>([]);
  const [selectedPartnerForForm, setSelectedPartnerForForm] = useState<Partner | null>(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [commissionFilter, setCommissionFilter] = useState('');
  const [leadsFilter, setLeadsFilter] = useState('');
  
  // Partner Report states
  const [selectedPartnerForReport, setSelectedPartnerForReport] = useState<string>('');
  const [selectedPartnersForReport, setSelectedPartnersForReport] = useState<string[]>([]);
  const [countryFilter, setCountryFilter] = useState<string>('');
  const [companyFilter, setCompanyFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  
  // User profile data (should come from user context)
  const userProfile = {
    businessName: "שם העסק שלי", // יבוא מהפרופיל
    email: "info@mybusiness.co.il", // יבוא מהפרופיל
    phone: "03-1234567", // יבוא מהפרופיל
    website: "www.mybusiness.co.il", // יבוא מהפרופיל
    logo: "/hoogi-new-avatar.png", // יבוא מהפרופיל
    primaryColor: "blue", // יבוא מהפרופיל
    secondaryColor: "indigo" // יבוא מהפרופיל
  };
  
  // Commission data from "שותף חדש" form
  const commissionData = {
    type: "percentage",
    percentage: 15,
    frequency: "monthly",
    condition: "after_one_paid_month",
    paymentMethod: "bank_transfer"
  };

  // Set initial tab based on route
  useEffect(() => {
    if (location.pathname === '/my-partners') {
      setActiveTab('overview'); // Open to overview tab for "השותפים שלי"
    } else if (location.pathname === '/partners') {
      setActiveTab('partners'); // Open to partners tab for admin view
    }
  }, [location.pathname]);

  // Mock data with enhanced partner details
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: '1',
      name: 'אבי כהן',
      email: 'avi@example.com',
      phone: '+972501234567',
      company: 'כהן ושות',
      avatar: '/avatars/avi.jpg',
      status: 'active',
      joinDate: '2024-01-15',
      totalEarnings: 15000,
      monthlyEarnings: 2500,
      commissionPercentage: 10,
      totalLeads: 34,
      totalSales: 12,
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
      conversionRate: 78,
      uniqueLink: 'https://hoogi.co/partner/avi-cohen-123',
      personalDescription: 'מומחה לשיווק דיגיטלי עם ניסיון של 10 שנים בתחום',
      internalNotes: 'שותף אמין ומקצועי, ביצועים מעולים',
      monthlyPerformance: [
        { month: 'ינואר', leads: 15, sales: 8, commission: 1200 },
        { month: 'פברואר', leads: 19, sales: 4, commission: 1300 }
      ]
    },
    {
      id: '2',
      name: 'שרה לוי',
      email: 'sara@example.com',
      phone: '+972501234568',
      company: 'לוי קונסולטינג',
      avatar: '/avatars/sara.jpg',
      status: 'active',
      joinDate: '2024-02-01',
      totalEarnings: 8500,
      monthlyEarnings: 1200,
      commissionPercentage: 12,
      totalLeads: 28,
      totalSales: 8,
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
      conversionRate: 65,
      uniqueLink: 'https://hoogi.co/partner/sara-levi-456',
      personalDescription: 'יועצת עסקית מובילה עם התמחות בשיווק B2B',
      internalNotes: 'מגיעה תוצאות טובות, שותף חדש יחסית',
      monthlyPerformance: [
        { month: 'פברואר', leads: 28, sales: 8, commission: 1200 }
      ]
    }
  ]);

  // Commission payments data
  const [commissionPayments, setCommissionPayments] = useState<CommissionPayment[]>([
    {
      id: '1',
      partnerId: '1',
      partnerName: 'אבי כהן',
      amount: 2500,
      status: 'unpaid',
      dueDate: '2024-03-01',
      description: 'עמלה חודשית - פברואר 2024'
    },
    {
      id: '2',
      partnerId: '2',
      partnerName: 'שרה לוי',
      amount: 1200,
      status: 'paid',
      dueDate: '2024-02-15',
      paidDate: '2024-02-14',
      description: 'עמלה חודשית - פברואר 2024'
    },
    {
      id: '3',
      partnerId: '1',
      partnerName: 'אבי כהן',
      amount: 2300,
      status: 'paid',
      dueDate: '2024-02-01',
      paidDate: '2024-01-31',
      description: 'עמלה חודשית - ינואר 2024'
    }
  ]);

  // Program settings
  const [programSettings, setProgramSettings] = useState<ProgramSettings>({
    defaultCommissionPercentage: 15,
    linkExpiryDays: 30,
    allowPartnerDataView: true,
    termsText: 'השותפים מחויבים לעמוד בתנאי השימוש של התוכנית ולשמור על רמה גבוהה של שירות ללקוחות.',
    productCommissionRates: [
      { productId: 'basic', productName: 'תכנית Basic', commissionRate: 20 },
      { productId: 'pro', productName: 'תכנית Pro', commissionRate: 25 },
      { productId: 'premium', productName: 'תכנית Premium', commissionRate: 30 }
    ],
    
    // הגדרות חברת סליקה
    paymentGateway: 'manual',
    gatewayApiKey: '',
    gatewayApiSecret: '',
    gatewayMerchantId: '',
    autoInvoiceGeneration: false
  });

  const commissionTypes = [
    { value: 'fixed_monthly', label: 'עמלה חודשית קבועה', icon: Calendar },
    { value: 'percentage_monthly', label: 'עמלה חודשית באחוזים', icon: TrendingUp },
    { value: 'one_time', label: 'עמלה חד פעמית', icon: DollarSign },
    { value: 'yearly_12_split', label: 'מנוי שנתי (חלוקה ל-12 חודשים)', icon: Calendar },
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

  // Smart Partners Generator functions
  const toggleSelectRow = (partnerId: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    setSelectedRows(prev => 
      prev.includes(partnerId) 
        ? prev.filter(id => id !== partnerId)
        : [...prev, partnerId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredPartners.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredPartners.map(p => p.id));
    }
  };

  const handlePartnerClick = (partnerId: string) => {
    if (!viewedPartners.includes(partnerId)) {
      setViewedPartners(prev => [...prev, partnerId]);
    }
  };

  const handleStatusChange = (partnerId: string, status: string) => {
    setPartnerStatuses(prev => ({ ...prev, [partnerId]: status }));
    setPartnerSubStatuses(prev => ({ ...prev, [partnerId]: '' }));
  };

  const handleSubStatusChange = (partnerId: string, subStatus: string) => {
    setPartnerSubStatuses(prev => ({ ...prev, [partnerId]: subStatus }));
  };

  // Function to search partners
  const searchPartners = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    
    const filtered = partners.filter(partner => 
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.phone.includes(searchTerm)
    );
    
    setSearchResults(filtered);
  };

  // Function to handle partner search input change
  const handlePartnerSearchChange = (value: string) => {
    setPartnerSearchTerm(value);
    searchPartners(value);
  };

  // Function to fill form with partner data
  const fillFormWithPartnerData = (partner: Partner) => {
    // הצגת הודעה שהטופס מולא
    toast.success('הטופס מולא בפרטי השותף שנבחר');
    
    // עדכון השותף שנבחר
    setSelectedPartnerForForm(partner);
  };

  const getSubStatusOptions = (status: string) => {
    switch (status) {
      case 'active':
        return ['מעולה', 'טוב', 'ממוצע', 'חלש'];
      case 'inactive':
        return ['זמנית', 'קבועה', 'בהמתנה'];
      case 'pending':
        return ['אישור', 'בדיקה', 'ממתין'];
      case 'suspended':
        return ['זמנית', 'קבועה', 'הפרה'];
      default:
        return [];
    }
  };

  const getPartnerStrength = (partner: Partner) => {
    const score = partner.totalLeads * 0.4 + partner.conversionRate * 0.3 + partner.totalEarnings * 0.3;
    if (score >= 80) return 'מעולה';
    if (score >= 60) return 'טוב';
    if (score >= 40) return 'ממוצע';
    return 'חלש';
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'מעולה': return 'bg-green-500';
      case 'טוב': return 'bg-blue-500';
      case 'ממוצע': return 'bg-yellow-500';
      case 'חלש': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setStrengthFilter('');
    setDateFrom('');
    setDateTo('');
    setRegionFilter('');
    setSourceFilter('');
    setCommissionFilter('');
    setLeadsFilter('');
  };

  const generatePartnerReport = () => {
    const csvContent = [
      ['שם שותף', 'סך לידים', 'סך עמלות', 'אחוז המרה', 'תאריך הצטרפות'],
      ...partners.map(partner => [
        partner.name,
        partner.totalLeads.toString(),
        partner.totalEarnings.toString(),
        partner.conversionRate.toString(),
        partner.joinDate
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `דוח_שותפים_${new Date().toLocaleDateString('he-IL')}.csv`;
    link.click();
  };

  const generateExcelReport = () => {
    // יצירת Excel עם כל הפרטים
    const excelData = [
      ['שם שותף', 'אימייל', 'טלפון', 'סטטוס', 'תאריך הצטרפות', 'סך לידים', 'סך מכירות', 'סך עמלות', 'עמלות חודשיות', 'אחוז עמלה', 'אחוז המרה', 'פעילות אחרונה', 'אזור', 'מקור'],
      ...partners.map(partner => [
        partner.name,
        partner.email,
        partner.phone,
        getStatusText(partner.status),
        partner.joinDate,
        partner.totalLeads.toString(),
        partner.totalSales.toString(),
        partner.totalEarnings.toString(),
        partner.monthlyEarnings.toString(),
        partner.commissionPercentage.toString(),
        partner.conversionRate.toString(),
        partner.lastActivity,
        partner.region || '',
        partner.source || ''
      ])
    ];

    // המרה ל-CSV (Excel יכול לקרוא CSV)
    const csvContent = excelData.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `דוח_שותפים_מפורט_${new Date().toLocaleDateString('he-IL')}.xlsx`;
    link.click();
    
    toast.success("דוח Excel נוצר בהצלחה!");
  };

  const generateDetailedPartnerReport = () => {
    const selectedPartner = partners.find(p => p.id === selectedPartnerForReport);
    if (!selectedPartner) return;

    // יצירת דוח מפורט עם השדות שביקשת
    const excelData = [
      ['דוח שותף מפורט', ''],
      ['תאריך יצירת הדוח', new Date().toLocaleDateString('he-IL')],
      [''],
      ['פרטי השותף', ''],
      ['שם השותף', selectedPartner.name],
      ['אימייל', selectedPartner.email],
      ['טלפון', selectedPartner.phone],
      ['תאריך הצטרפות', selectedPartner.joinDate],
      ['סטטוס', getStatusText(selectedPartner.status)],
      [''],
      ['נתוני מנויים', ''],
      ['שם מנוי', 'תאריך הצטרפות', 'סוג מנוי', 'גובה מנוי', 'תוספות נלוות', 'סטטוס מנוי', 'תאריך חידוש/ביטול', 'רשת מקור', 'גובה עמלה צפוי', 'סטטוס תשלום עמלה'],
      // דוגמה למנויים (במציאות זה יבוא מהמסד נתונים)
      ['יוסי כהן', '15/01/2024', 'פרימיום', '₪299/חודש', 'תמיכה 24/7, אחסון מוגבר', 'פעיל', '15/02/2024', 'פייסבוק', '₪89.70', 'שולם'],
      ['שרה לוי', '20/01/2024', 'בסיסי', '₪99/חודש', 'אין', 'פעיל', '20/02/2024', 'גוגל', '₪29.70', 'שולם'],
      ['דוד ישראלי', '10/02/2024', 'מקצועי', '₪499/חודש', 'תמיכה VIP, אחסון ללא הגבלה', 'הוקפא', '10/03/2024', 'אינסטגרם', '₪149.70', 'בהמתנה'],
      [''],
      ['סיכום', ''],
      ['סך מנויים פעילים', '2'],
      ['סך מנויים הוקפאו', '1'],
      ['סך מנויים בוטלו', '0'],
      ['סך עמלות צפויות', '₪269.10'],
      ['סך עמלות שולמו', '₪119.40'],
      ['סך עמלות בהמתנה', '₪149.70']
    ];

    // המרה ל-CSV (Excel יכול לקרוא CSV)
    const csvContent = excelData.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `דוח_שותף_מפורט_${selectedPartner.name}_${new Date().toLocaleDateString('he-IL')}.xlsx`;
    link.click();
    
    toast.success(`דוח מפורט נוצר עבור ${selectedPartner.name}!`);
  };

  // Filtered partners
  const filteredPartners = partners.filter(partner => {
    const matchesSearch = !searchTerm || partner.name.toLowerCase().includes(searchTerm.toLowerCase()) || partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || partner.status === statusFilter;
    const matchesStrength = !strengthFilter || getPartnerStrength(partner) === strengthFilter;
    const matchesRegion = !regionFilter || partner.region === regionFilter;
    const matchesSource = !sourceFilter || partner.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesStrength && matchesRegion && matchesSource;
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6" dir="rtl">
        {/* User Banner with Logo */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <img 
                  src="/hoogi-new-avatar.png" 
                  alt="Hoogi Logo" 
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">שלום, משתמש המערכת</h2>
                <p className="text-blue-100 text-lg">ברוכים הבאים למערכת ניהול השותפים</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm">תאריך: {new Date().toLocaleDateString('he-IL')}</p>
              <p className="text-blue-100 text-sm">שעה: {new Date().toLocaleTimeString('he-IL')}</p>
            </div>
          </div>
        </div>

        {/* Add Partner Button */}
        <div className="flex justify-end mb-6">
          <Dialog open={showAddPartner} onOpenChange={setShowAddPartner}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                <Plus className="h-5 w-5 ml-2" />
                הוסף שותף חדש
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-right text-xl font-bold">הוספת שותף חדש</DialogTitle>
              </DialogHeader>
              <div className="p-2">
                <AddPartnerForm onClose={() => setShowAddPartner(false)} fillFormWithPartnerData={fillFormWithPartnerData} selectedPartner={selectedPartnerForForm} />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">סך משתמשים שהובאו</p>
                  <p className="text-2xl font-bold">73</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">סך עמלות החודש</p>
                  <p className="text-2xl font-bold">₪3,700</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">שותפים פעילים</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">סך השותפים</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-xl p-1">
            <TabsTrigger value="reports" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              דוחות
            </TabsTrigger>
            <TabsTrigger value="partners" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              השותפים שלי
            </TabsTrigger>
            <TabsTrigger value="send-form" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              שלח טופס לשותף
            </TabsTrigger>
            <TabsTrigger value="new-partner" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              פרטי שותפים
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Partner Details Tab Content */}
        {activeTab === 'new-partner' && (
          <div className="space-y-8">
            {/* Edit Existing Partner Section */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="bg-blue-100/50 rounded-t-lg">
                <CardTitle className="text-right text-xl font-bold text-blue-800 flex items-center gap-2">
                  <Edit className="h-5 w-5 text-blue-600" />
                  ערוך שותף קיים
                </CardTitle>
                <p className="text-right text-blue-600 text-sm">חפש שותף קיים כדי לערוך את פרטיו</p>
              </CardHeader>
              <CardContent className="bg-white/70 rounded-b-lg">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                  {/* נקה סינון */}
                  <div className="flex items-end">
                    <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50 w-full text-xs">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      נקה
                    </Button>
                  </div>
                  
                  {/* חיפוש לפי שם */}
                  <div>
                    <Label htmlFor="searchName" className="text-right block mb-1 text-xs font-medium">שם</Label>
                    <Input
                      id="searchName"
                      placeholder="שם שותף..."
                      className="text-right border-blue-200 focus:border-blue-400 text-sm"
                    />
                  </div>
                  
                  {/* חיפוש לפי אימייל */}
                  <div>
                    <Label htmlFor="searchEmail" className="text-right block mb-1 text-xs font-medium">אימייל</Label>
                    <Input
                      id="searchEmail"
                      placeholder="אימייל שותף..."
                      className="text-right border-blue-200 focus:border-blue-400 text-sm"
                    />
                  </div>
                  
                  {/* סינון לפי מדינה */}
                  <div>
                    <Label htmlFor="filterCountry" className="text-right block mb-1 text-xs font-medium">מדינה</Label>
                    <Select>
                      <SelectTrigger className="text-right border-blue-200 focus:border-blue-400 text-sm h-9">
                        <SelectValue placeholder="בחר" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="israel">ישראל</SelectItem>
                        <SelectItem value="usa">ארצות הברית</SelectItem>
                        <SelectItem value="uk">בריטניה</SelectItem>
                        <SelectItem value="germany">גרמניה</SelectItem>
                        <SelectItem value="france">צרפת</SelectItem>
                        <SelectItem value="all">כל המדינות</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* כפתור חפש */}
                  <div className="flex items-end">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 w-full text-xs h-9">
                      <Search className="h-3 w-3 mr-1" />
                      חפש
                    </Button>
                  </div>
                  
                  {/* כפתור עדכון */}
                  <div className="flex items-end">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full text-xs h-9">
                      <Edit className="h-3 w-3 mr-1" />
                      עדכון
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <div className="text-gray-500 font-medium">או הוסף שותף חדש</div>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            
            {/* Add New Partner Form */}
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="bg-green-100/50 rounded-t-lg">
                <CardTitle className="text-right text-xl font-bold text-green-800 flex items-center gap-2">
                  <Plus className="h-5 w-5 text-green-600" />
                  הוספת שותף חדש
                </CardTitle>
                <p className="text-right text-green-600 text-sm">הוסף שותף חדש למערכת</p>
              </CardHeader>
              <CardContent className="bg-white/70 rounded-b-lg">
                <AddPartnerForm onClose={() => setActiveTab('partners')} fillFormWithPartnerData={fillFormWithPartnerData} selectedPartner={selectedPartnerForForm} />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Partners Tab Content */}
        {activeTab === 'partners' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            {/* Smart Partners Generator */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-right text-2xl font-bold">מחולל שותפים חכם</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => generatePartnerReport()}
                    className="px-4 py-2"
                  >
                    <FileText className="h-4 w-4 ml-2" />
                    דוח קצר לשותף
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => generateExcelReport()}
                    className="px-4 py-2 text-green-600 hover:text-green-700"
                  >
                    <Download className="h-4 w-4 ml-2" />
                    ייצוא Excel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
                    <Plus className="h-4 w-4 ml-2" />
                    הוסף שותף
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Advanced Filters */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="חיפוש שותפים..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    {/* Status Filter */}
                    <Select onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="סטטוס" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">כל הסטטוסים</SelectItem>
                        <SelectItem value="active">פעיל</SelectItem>
                        <SelectItem value="inactive">לא פעיל</SelectItem>
                        <SelectItem value="pending">ממתין</SelectItem>
                        <SelectItem value="suspended">מושעה</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {/* Strength Filter */}
                    <Select onValueChange={setStrengthFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="חוזק" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">כל הרמות</SelectItem>
                        <SelectItem value="מעולה">מעולה</SelectItem>
                        <SelectItem value="טוב">טוב</SelectItem>
                        <SelectItem value="ממוצע">ממוצע</SelectItem>
                        <SelectItem value="חלש">חלש</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {/* Date Range */}
                    <div className="flex gap-2">
                      <input
                        type="date"
                        placeholder="מתאריך"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                        onChange={(e) => setDateFrom(e.target.value)}
                      />
                      <input
                        type="date"
                        placeholder="עד תאריך"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                        onChange={(e) => setDateTo(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {/* Additional Filters Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    {/* Region Filter */}
                    <Select onValueChange={setRegionFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="אזור" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">כל האזורים</SelectItem>
                        <SelectItem value="מרכז">מרכז</SelectItem>
                        <SelectItem value="צפון">צפון</SelectItem>
                        <SelectItem value="דרום">דרום</SelectItem>
                        <SelectItem value="ירושלים">ירושלים</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {/* Source Filter */}
                    <Select onValueChange={setSourceFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="מקור" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">כל המקורות</SelectItem>
                        <SelectItem value="פייסבוק">פייסבוק</SelectItem>
                        <SelectItem value="גוגל">גוגל</SelectItem>
                        <SelectItem value="לינקדאין">לינקדאין</SelectItem>
                        <SelectItem value="המלצה">המלצה</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {/* Commission Range */}
                    <Select onValueChange={setCommissionFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="טווח עמלות" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">כל הטווחים</SelectItem>
                        <SelectItem value="0-1000">₪0 - ₪1,000</SelectItem>
                        <SelectItem value="1000-5000">₪1,000 - ₪5,000</SelectItem>
                        <SelectItem value="5000-10000">₪5,000 - ₪10,000</SelectItem>
                        <SelectItem value="10000+">₪10,000+</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {/* Leads Range */}
                    <Select onValueChange={setLeadsFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="טווח לידים" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">כל הטווחים</SelectItem>
                        <SelectItem value="0-10">0 - 10 לידים</SelectItem>
                        <SelectItem value="10-50">10 - 50 לידים</SelectItem>
                        <SelectItem value="50-100">50 - 100 לידים</SelectItem>
                        <SelectItem value="100+">100+ לידים</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Clear Filters */}
                  <div className="flex justify-end mt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={clearAllFilters}
                    >
                      נקה סינונים
                    </Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="text-right">
                        <TableHead className="w-[40px] p-2">
                          <Checkbox 
                            checked={selectedRows.length === filteredPartners.length && filteredPartners.length > 0} 
                            onCheckedChange={toggleSelectAll}
                            aria-label="בחר הכל"
                          />
                        </TableHead>
                        <TableHead className="w-[180px] p-2">שם שותף</TableHead>
                        <TableHead className="w-[140px] p-2">חוזק</TableHead>
                        <TableHead className="w-[100px] p-2">סטטוס</TableHead>
                        <TableHead className="w-[120px] p-2">תת-סטטוס</TableHead>
                        <TableHead className="w-[80px] p-2">לידים</TableHead>
                        <TableHead className="w-[100px] p-2">עמלות</TableHead>
                        <TableHead className="w-[120px] p-2">אחוז המרה</TableHead>
                        <TableHead className="w-[160px] p-2">פעולות מהירות</TableHead>
                        <TableHead className="w-[70px] p-2 text-center">הערות</TableHead>
                        <TableHead className="w-[60px] p-2 text-center">מחק</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPartners.map((partner) => {
                        const isNew = partner.status === "active" && !viewedPartners.includes(partner.id);
                        const currentStatus = partnerStatuses[partner.id] || partner.status;
                        const currentSubStatus = partnerSubStatuses[partner.id] || "";
                        const strength = getPartnerStrength(partner);
                        
                        return (
                          <TableRow 
                            key={partner.id} 
                            className={`${selectedRows.includes(partner.id) ? "bg-primary/5" : ""} ${isNew ? "border-r-4 border-r-blue-500" : ""} cursor-pointer hover:bg-gray-50`}
                            onClick={() => handlePartnerClick(partner.id)}
                          >
                            <TableCell className="p-2" onClick={(e) => toggleSelectRow(partner.id, e)}>
                              <Checkbox 
                                checked={selectedRows.includes(partner.id)} 
                                aria-label={`בחר שותף ${partner.name}`}
                              />
                            </TableCell>
                            
                            <TableCell className="p-2">
                              <div className="flex flex-col gap-0.5">
                                <div className="font-medium text-sm">{partner.name}</div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  {partner.joinDate}
                                </div>
                              </div>
                            </TableCell>
                            
                            <TableCell className="p-2">
                              <div className="flex items-center gap-1">
                                <div className={`w-3 h-3 rounded-full ${getStrengthColor(strength)}`}></div>
                                <span className="text-sm font-medium">{strength}</span>
                              </div>
                            </TableCell>
                            
                            <TableCell className="p-2">
                              <Select 
                                value={currentStatus} 
                                onValueChange={(value) => handleStatusChange(partner.id, value)}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">פעיל</SelectItem>
                                  <SelectItem value="inactive">לא פעיל</SelectItem>
                                  <SelectItem value="pending">ממתין</SelectItem>
                                  <SelectItem value="suspended">מושעה</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            
                            <TableCell className="p-2">
                              <Select 
                                value={currentSubStatus} 
                                onValueChange={(value) => handleSubStatusChange(partner.id, value)}
                                onClick={(e) => e.stopPropagation()}
                                disabled={!currentStatus}
                              >
                                <SelectTrigger className="h-8 text-xs">
                                  <SelectValue placeholder="בחר תת-סטטוס" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getSubStatusOptions(currentStatus).map((option) => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                            
                            <TableCell className="p-2">
                              <div className="text-center">
                                <div className="text-lg font-bold text-blue-600">{partner.totalLeads}</div>
                                <div className="text-xs text-muted-foreground">לידים</div>
                              </div>
                            </TableCell>
                            
                            <TableCell className="p-2">
                              <div className="text-center">
                                <div className="text-lg font-bold text-green-600">₪{partner.totalEarnings.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">סך הכל</div>
                              </div>
                            </TableCell>
                            
                            <TableCell className="p-2">
                              <div className="text-center">
                                <div className="text-lg font-bold text-purple-600">{partner.conversionRate}%</div>
                                <div className="text-xs text-muted-foreground">המרה</div>
                              </div>
                            </TableCell>
                            
                            <TableCell className="p-2">
                              <div className="flex gap-1">
                                <a
                                  href={`tel:${partner.phone}`}
                                  className="flex flex-col items-center justify-center gap-0.5 p-1 rounded-md bg-green-50 border border-green-200 hover:bg-green-100 transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toast.success("פותח שיחה...");
                                  }}
                                >
                                  <Phone className="h-3 w-3 text-green-600" />
                                  <span className="text-[8px] font-medium text-green-700">שיחה</span>
                                </a>

                                <a
                                  href={`https://wa.me/${partner.phone.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex flex-col items-center justify-center gap-0.5 p-1 rounded-md bg-green-50 border border-green-200 hover:bg-green-100 transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toast.success("פותח WhatsApp...");
                                  }}
                                >
                                  <MessageCircle className="h-3 w-3 text-green-600" />
                                  <span className="text-[8px] font-medium text-green-700">וואטס</span>
                                </a>
                                
                                <a
                                  href={`mailto:${partner.email}`}
                                  className="flex flex-col items-center justify-center gap-0.5 p-1 rounded-md bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toast.success("פותח מייל...");
                                  }}
                                >
                                  <Mail className="h-3 w-3 text-purple-600" />
                                  <span className="text-[8px] font-medium text-purple-700">מייל</span>
                                </a>
                              </div>
                            </TableCell>
                            
                            <TableCell className="p-2 text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPartnerForNotes(partner);
                                  setNotesDialogOpen(true);
                                }}
                                className="h-6 w-6 p-0"
                              >
                                <StickyNote className="h-3 w-3" />
                              </Button>
                            </TableCell>
                            
                            <TableCell className="p-2 text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPartnerToDelete(partner.id);
                                  setDeleteDialogOpen(true);
                                }}
                                className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reports Tab Content */}
        {activeTab === 'reports' && (
          <div className="space-y-8">
            {/* Partner Report */}
            <Card>
              <CardHeader>
                <CardTitle className="text-right text-xl font-bold flex items-center gap-2">
                  <Users className="h-6 w-6 text-blue-600" />
                  דוח שותף מפורט
                </CardTitle>
                <p className="text-right text-gray-600 text-sm">דוח מפורט עם כל הפרטים של השותף והמנויים שלו</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Advanced Search and Selection */}
                  <div className="space-y-4">
                    {/* Advanced Search */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="text-right font-semibold text-blue-800 mb-3">חיפוש מתקדם</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-right text-sm font-medium mb-2 block">חיפוש לפי שם</Label>
                          <Input
                            placeholder="הקלד שם שותף..."
                            className="text-right"
                            value={partnerSearchTerm}
                            onChange={(e) => setPartnerSearchTerm(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-right text-sm font-medium mb-2 block">סינון לפי מדינה</Label>
                          <Select onValueChange={(value) => setCountryFilter(value)}>
                            <SelectTrigger className="text-right">
                              <SelectValue placeholder="בחר מדינה" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">כל המדינות</SelectItem>
                              <SelectItem value="israel">ישראל</SelectItem>
                              <SelectItem value="usa">ארצות הברית</SelectItem>
                              <SelectItem value="uk">בריטניה</SelectItem>
                              <SelectItem value="germany">גרמניה</SelectItem>
                              <SelectItem value="france">צרפת</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-right text-sm font-medium mb-2 block">סינון לפי סטטוס</Label>
                          <Select onValueChange={(value) => setStatusFilter(value)}>
                            <SelectTrigger className="text-right">
                              <SelectValue placeholder="בחר סטטוס" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">כל הסטטוסים</SelectItem>
                              <SelectItem value="active">פעיל</SelectItem>
                              <SelectItem value="inactive">לא פעיל</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <Label className="text-right text-sm font-medium mb-2 block">סינון לפי חברה</Label>
                          <Input
                            placeholder="הקלד שם חברה..."
                            className="text-right"
                            value={companyFilter}
                            onChange={(e) => setCompanyFilter(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-right text-sm font-medium mb-2 block">סינון לפי תאריך הצטרפות</Label>
                          <Input
                            type="date"
                            className="text-right"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                          />
                        </div>
                        <div className="flex items-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setPartnerSearchTerm('');
                              setCountryFilter('');
                              setStatusFilter('');
                              setCompanyFilter('');
                              setDateFilter('');
                            }}
                            className="w-full"
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            נקה סינון
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Partners List with Checkboxes */}
                    <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm font-medium text-gray-700">
                          בחר שותפים לדוח ({selectedPartnersForReport.length} נבחרו)
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedPartnersForReport(partners.map(p => p.id))}
                            className="text-xs"
                          >
                            בחר הכל
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedPartnersForReport([])}
                            className="text-xs"
                          >
                            בטל הכל
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {partners
                          .filter(partner => {
                            // חיפוש לפי שם ואימייל
                            const nameMatch = !partnerSearchTerm || 
                              partner.name.toLowerCase().includes(partnerSearchTerm.toLowerCase()) ||
                              partner.email.toLowerCase().includes(partnerSearchTerm.toLowerCase());
                            
                            // סינון לפי מדינה
                            const countryMatch = !countryFilter || partner.country === countryFilter;
                            
                            // סינון לפי סטטוס
                            const statusMatch = !statusFilter || partner.status === statusFilter;
                            
                            // סינון לפי חברה
                            const companyMatch = !companyFilter || 
                              (partner.company && partner.company.toLowerCase().includes(companyFilter.toLowerCase()));
                            
                            // סינון לפי תאריך
                            const dateMatch = !dateFilter || partner.joinDate === dateFilter;
                            
                            return nameMatch && countryMatch && statusMatch && companyMatch && dateMatch;
                          })
                          .map((partner) => (
                            <div key={partner.id} className="flex items-center justify-between p-2 bg-white rounded border hover:bg-gray-50">
                              <div className="flex items-center gap-3">
                                <Checkbox
                                  checked={selectedPartnersForReport.includes(partner.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedPartnersForReport([...selectedPartnersForReport, partner.id]);
                                    } else {
                                      setSelectedPartnersForReport(selectedPartnersForReport.filter(id => id !== partner.id));
                                    }
                                  }}
                                />
                                <div className="text-right">
                                  <div className="font-medium text-sm">{partner.name}</div>
                                  <div className="text-xs text-gray-600">{partner.email}</div>
                                </div>
                              </div>
                              <Badge 
                                variant={partner.status === 'active' ? 'default' : 'secondary'}
                                className={partner.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                              >
                                {partner.status === 'active' ? 'פעיל' : 'לא פעיל'}
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => generateDetailedPartnerReport()}
                        disabled={selectedPartnersForReport.length === 0}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                      >
                        <FileText className="h-4 w-4 ml-2" />
                        צור דוח מפורט ({selectedPartnersForReport.length})
                      </Button>
                      <Button 
                        onClick={() => exportPartnersToExcel()}
                        disabled={selectedPartnersForReport.length === 0}
                        variant="outline"
                        className="border-green-200 text-green-600 hover:bg-green-50 px-6 py-2"
                      >
                        <Download className="h-4 w-4 ml-2" />
                        הורד אקסל ({selectedPartnersForReport.length})
                      </Button>
                    </div>
                  </div>

                  {/* Report Preview */}
                  {selectedPartnersForReport.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-right font-semibold mb-4">
                        תצוגה מקדימה של הדוח ({selectedPartnersForReport.length} שותפים נבחרו):
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedPartnersForReport.map((partnerId) => {
                          const partner = partners.find(p => p.id === partnerId);
                          if (!partner) return null;
                          
                          return (
                            <div key={partnerId} className="bg-white rounded-lg p-3 border">
                              <div className="text-sm text-gray-600 mb-1">שותף נבחר</div>
                              <div className="font-medium">{partner.name}</div>
                              <div className="text-xs text-gray-500">{partner.email}</div>
                              <Badge 
                                variant={partner.status === 'active' ? 'default' : 'secondary'}
                                className={partner.status === 'active' ? 'bg-green-100 text-green-800 mt-2' : 'bg-gray-100 text-gray-800 mt-2'}
                              >
                                {partner.status === 'active' ? 'פעיל' : 'לא פעיל'}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Report Example */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                    <h3 className="text-right font-semibold text-green-800 mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-green-600" />
                      דוגמה לדוח שותף
                    </h3>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <div className="text-right">
                        <h4 className="font-bold text-lg mb-4 text-gray-800">דוח שותף: יוסי כהן</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-semibold text-gray-700 mb-3">פרטי השותף</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">שם מלא:</span>
                                <span className="font-medium">יוסי כהן</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">אימייל:</span>
                                <span className="font-medium">yossi@example.com</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">טלפון:</span>
                                <span className="font-medium">050-1234567</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">חברה:</span>
                                <span className="font-medium">כהן ושות'</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">מדינה:</span>
                                <span className="font-medium">ישראל</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-700 mb-3">פרטי עמלה</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">סוג עמלה:</span>
                                <span className="font-medium">אחוז</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">אחוז עמלה:</span>
                                <span className="font-medium">30%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">תדירות תשלום:</span>
                                <span className="font-medium">חודשי</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">אמצעי תשלום:</span>
                                <span className="font-medium">העברה בנקאית</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">סטטוס:</span>
                                <Badge className="bg-green-100 text-green-800">פעיל</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h5 className="font-semibold text-gray-700 mb-3">מנויים של השותף</h5>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-3 py-2 text-right text-gray-600">שם מנוי</th>
                                  <th className="px-3 py-2 text-right text-gray-600">תאריך הצטרפות</th>
                                  <th className="px-3 py-2 text-right text-gray-600">סוג מנוי</th>
                                  <th className="px-3 py-2 text-right text-gray-600">עמלה צפויה</th>
                                  <th className="px-3 py-2 text-right text-gray-600">סטטוס</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                <tr>
                                  <td className="px-3 py-2">דני לוי</td>
                                  <td className="px-3 py-2">15/01/2024</td>
                                  <td className="px-3 py-2">פרימיום</td>
                                  <td className="px-3 py-2">₪89.70</td>
                                  <td className="px-3 py-2">
                                    <Badge className="bg-green-100 text-green-800">פעיל</Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-3 py-2">שרה כהן</td>
                                  <td className="px-3 py-2">22/01/2024</td>
                                  <td className="px-3 py-2">בסיסי</td>
                                  <td className="px-3 py-2">₪29.90</td>
                                  <td className="px-3 py-2">
                                    <Badge className="bg-green-100 text-green-800">פעיל</Badge>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="px-3 py-2">מיכל רוזן</td>
                                  <td className="px-3 py-2">05/02/2024</td>
                                  <td className="px-3 py-2">פרימיום</td>
                                  <td className="px-3 py-2">₪89.70</td>
                                  <td className="px-3 py-2">
                                    <Badge className="bg-blue-100 text-blue-800">ממתין</Badge>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">סה"כ עמלה צפויה החודש:</span>
                            <span className="font-bold text-blue-800">₪209.30</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smart Reports System */}
            <Card>
              <CardHeader>
                <CardTitle className="text-right text-xl font-bold flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                  מערכת דוחות חכמה 👑
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SmartReportsSystem
                  partners={partners}
                  onExport={(data, reportType) => {
                    console.log('Exporting smart report:', reportType, data);
                  }}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Send Form Tab Content */}
        {activeTab === 'send-form' && (
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">שלח טופס לשותף</h1>
                    <p className="text-gray-600 text-sm">צור טופס רשמי עם פרטי עמלה וחוזה לחתימה</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                  <img 
                    src="/hoogi-new-avatar.png" 
                    alt="Hoogi Owl" 
                    className="w-6 h-6 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Official Partner Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              
              {/* Company Header */}
              <div className={`bg-gradient-to-r from-${userProfile.primaryColor}-600 to-${userProfile.secondaryColor}-600 text-white p-8`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={userProfile.logo} 
                      alt={`${userProfile.businessName} Logo`} 
                      className="w-16 h-16 rounded-full object-cover bg-white/20 p-2"
                    />
                    <div>
                      <h1 className="text-3xl font-bold">{userProfile.businessName}</h1>
                      <p className="text-blue-100 text-lg">טופס הצטרפות לשותפות</p>
                      <p className="text-blue-200 text-sm">מערכת ניהול שותפים מתקדמת</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-100 text-sm">תאריך: {new Date().toLocaleDateString('he-IL')}</p>
                    <p className="text-blue-100 text-sm">מסמך רשמי</p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8 space-y-8">
                
                {/* Section 1: Personal Information */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Users className="h-6 w-6 text-blue-600" />
                    פרטים אישיים
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="partnerName" className="text-sm font-medium text-gray-700 mb-2 block">שם מלא *</Label>
                      <Input
                        id="partnerName"
                        className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="הזן שם מלא"
                      />
                    </div>
                    <div>
                      <Label htmlFor="partnerEmail" className="text-sm font-medium text-gray-700 mb-2 block">אימייל *</Label>
                      <Input
                        id="partnerEmail"
                        type="email"
                        className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="example@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="partnerPhone" className="text-sm font-medium text-gray-700 mb-2 block">טלפון *</Label>
                      <Input
                        id="partnerPhone"
                        className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="050-1234567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="partnerId" className="text-sm font-medium text-gray-700 mb-2 block">ת.ז./ח.פ *</Label>
                      <Input
                        id="partnerId"
                        className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="123456789"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Bank Details */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <CreditCard className="h-6 w-6 text-green-600" />
                    פרטי חשבון בנקאיים
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="bankName" className="text-sm font-medium text-gray-700 mb-2 block">שם הבנק *</Label>
                      <Input
                        id="bankName"
                        className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="שם הבנק"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bankBranch" className="text-sm font-medium text-gray-700 mb-2 block">מספר סניף *</Label>
                      <Input
                        id="bankBranch"
                        className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="מספר סניף"
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber" className="text-sm font-medium text-gray-700 mb-2 block">מספר חשבון *</Label>
                      <Input
                        id="accountNumber"
                        className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="מספר חשבון"
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountName" className="text-sm font-medium text-gray-700 mb-2 block">שם על החשבון *</Label>
                      <Input
                        id="accountName"
                        className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="שם בעל החשבון"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Commission Details */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                    פרטי עמלה
                  </h2>
                  <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-purple-700 mb-2 block">סוג עמלה</Label>
                        <div className="bg-white rounded-lg p-3 border border-purple-200">
                          <span className="text-purple-800 font-medium">
                            {commissionData.type === 'percentage' ? `אחוז מהמכירות - ${commissionData.percentage}%` :
                             commissionData.type === 'fixed' ? `סכום קבוע - ₪${commissionData.percentage}` :
                             commissionData.type === 'mixed' ? 'עמלה מעורבת' : 'עמלה מדורגת'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-purple-700 mb-2 block">תדירות תשלום</Label>
                        <div className="bg-white rounded-lg p-3 border border-purple-200">
                          <span className="text-purple-800 font-medium">
                            {commissionData.frequency === 'monthly' ? 'חודשי' :
                             commissionData.frequency === 'weekly' ? 'שבועי' :
                             commissionData.frequency === 'quarterly' ? 'רבעוני' : 'לפי בקשה'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-purple-700 mb-2 block">תנאי תשלום</Label>
                        <div className="bg-white rounded-lg p-3 border border-purple-200">
                          <span className="text-purple-800 font-medium">
                            {commissionData.condition === 'after_one_paid_month' ? 'לאחר חודש מנוי פעיל' :
                             commissionData.condition === 'immediate' ? 'מיידי' :
                             commissionData.condition === 'after_lead_conversion_only' ? 'לאחר המרת ליד בלבד' : 'לפי הסכם'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-purple-700 mb-2 block">אמצעי תשלום</Label>
                        <div className="bg-white rounded-lg p-3 border border-purple-200">
                          <span className="text-purple-800 font-medium">
                            {commissionData.paymentMethod === 'bank_transfer' ? 'העברה בנקאית' :
                             commissionData.paymentMethod === 'credit_card' ? 'כרטיס אשראי' :
                             commissionData.paymentMethod === 'paypal' ? 'PayPal' :
                             commissionData.paymentMethod === 'crypto' ? 'מטבע דיגיטלי' : 'לפי בחירה'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4: Contract */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <FileText className="h-6 w-6 text-orange-600" />
                    חוקים כלליים לשותפים
                  </h2>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
                      
                      <div>
                        <p className="font-bold text-lg mb-2">חוקים כלליים לשותפים</p>
                        <p className="text-gray-600 text-xs">תאריך: {new Date().toLocaleDateString('he-IL')}</p>
                        <p className="text-gray-600 text-xs">מסמך רשמי - כללים בסיסיים לשותפים</p>
                      </div>
                      
                      <div>
                        <p className="font-bold mb-2">1. הגדרות כלליות:</p>
                        <p className="mr-4">השותף מתחייב לפעול בהתאם לתנאי ההסכם ולחוקי המדינה. השותף יקבל עמלה לפי התנאים המפורטים בהסכם הספציפי.</p>
                        <p className="mr-4">השותף מתחייב לייצג את החברה בצורה מקצועית ומכובדת.</p>
                      </div>
                      
                      <div>
                        <p className="font-bold mb-2">2. עמלות ותשלומים:</p>
                        <p className="mr-4">העמלה תשולם לפי התנאים המפורטים בטופס זה.</p>
                        <p className="mr-4">התשלום יבוצע באמצעות אמצעי התשלום המפורטים בטופס זה.</p>
                        <p className="mr-4">כל התשלומים יבוצעו בחשבון הבנק של השותף כפי שמופיע בטופס זה.</p>
                      </div>
                      
                      <div>
                        <p className="font-bold mb-2">3. חובות השותף:</p>
                        <p className="mr-4">השותף מתחייב לפעול ביושר ובהתאם לכללי החברה. השותף לא יפעל נגד האינטרסים של החברה.</p>
                        <p className="mr-4">השותף מתחייב לשמור על סודיות המידע העסקי של החברה.</p>
                      </div>
                      
                      <div>
                        <p className="font-bold mb-2">4. חובות החברה:</p>
                        <p className="mr-4">החברה מתחייבת לספק לשותף את כל המידע והכלים הנדרשים לביצוע עבודתו.</p>
                        <p className="mr-4">החברה תספק תמיכה טכנית ומקצועית לשותף לפי הצורך.</p>
                      </div>
                      
                      <div>
                        <p className="font-bold mb-2">5. סיום ההסכם:</p>
                        <p className="mr-4">כל צד רשאי לסיים את ההסכם בהודעה מוקדמת של 30 יום. במקרה של הפרת תנאי ההסכם, ההסכם יסתיים מיידית.</p>
                        <p className="mr-4">במקרה של סיום ההסכם, השותף מתחייב להחזיר את כל החומרים והמידע של החברה.</p>
                      </div>
                      
                      <div>
                        <p className="font-bold mb-2">6. פרטי קשר:</p>
                        <p className="mr-4">לכל שאלה או בקשה, ניתן לפנות לחברה באמצעות פרטי הקשר המופיעים בהסכם הספציפי.</p>
                        <p className="mr-4">הסכם זה נחתם ב-{new Date().toLocaleDateString('he-IL')} ונכנס לתוקף מיידית.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* העלאת הסכם ספציפי */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Upload className="h-6 w-6 text-blue-600" />
                    הסכם ספציפי לחתימה
                  </h2>
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="contractUpload" className="text-sm font-medium text-blue-700 mb-2 block">
                          העלאת הסכם ספציפי לחתימה
                        </Label>
                        <div className="flex items-center gap-3">
                          <Input
                            id="contractUpload"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="flex-1"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                // כאן יהיה הלוגיקה לשמירת הקובץ
                                console.log('Contract file uploaded:', file.name);
                              }
                            }}
                          />
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            העלה קובץ
                          </Button>
                        </div>
                        <p className="text-xs text-blue-600 mt-2">
                          כאן תוכל להעלות את ההסכם הספציפי שלך (PDF, DOC, DOCX) שיישלח לשותף לחתימה בנוסף לחוקים הכלליים.
                        </p>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">הוראות לחתימה</span>
                        </div>
                        <ul className="text-xs text-blue-700 space-y-1 mr-4">
                          <li>• ההסכם הספציפי יישלח לשותף יחד עם החוקים הכלליים</li>
                          <li>• השותף יקבל הודעה באימייל עם קישור לחתימה</li>
                          <li>• לאחר החתימה, הקובץ החתום יוחזר אוטומטית</li>
                          <li>• ניתן לעקוב אחרי סטטוס החתימה במערכת</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 5: Signature */}
                <div className="pb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    חתימה דיגיטלית
                  </h2>
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-green-700 mb-2 block">חתימת השותף</Label>
                        <div className="bg-white rounded-lg p-4 border border-green-200 h-24 flex items-center justify-center">
                          <span className="text-green-600 text-sm">אזור חתימה דיגיטלית</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-green-700 mb-2 block">תאריך חתימה</Label>
                        <div className="bg-white rounded-lg p-4 border border-green-200 h-24 flex items-center justify-center">
                          <span className="text-green-600 text-sm">{new Date().toLocaleDateString('he-IL')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm text-green-700">השותף מתחייב לקרוא ולהבין את כל התנאים המפורטים בהסכם זה</p>
                      <p className="text-xs text-green-600 mt-1">חתימה דיגיטלית זו מהווה אישור על הסכמה מלאה לתנאי ההסכם</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Footer */}
              <div className="bg-gray-50 border-t border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={userProfile.logo} 
                      alt={`${userProfile.businessName} Logo`} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{userProfile.businessName}</h3>
                      <p className="text-gray-600 text-sm">מערכת ניהול שותפים מקצועית</p>
                      <p className="text-gray-500 text-xs">כל הזכויות שמורות © {new Date().getFullYear()}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>טלפון: {userProfile.phone}</p>
                    <p>אימייל: {userProfile.email}</p>
                    <p>אתר: {userProfile.website}</p>
                    <p className="text-xs text-gray-500 mt-1">מסמך רשמי - {new Date().toLocaleDateString('he-IL')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Button variant="outline" className="px-6 py-2">
                <Download className="h-4 w-4 ml-2" />
                הורד PDF
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                <Mail className="h-4 w-4 ml-2" />
                שלח לשותף
              </Button>
            </div>
          </div>
        )}










        {/* Partner Details Dialog */}
        <Dialog open={showPartnerDetails} onOpenChange={setShowPartnerDetails}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-right flex items-center gap-3">
                <Users className="h-6 w-6 text-blue-600" />
                פרטי שותף - {selectedPartnerForNotes?.name}
              </DialogTitle>
            </DialogHeader>
            {selectedPartnerForNotes && (
              <div className="space-y-6 mt-6">
                {/* Partner Header */}
                <div className="flex items-start justify-between bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-right">{selectedPartnerForNotes.name}</h3>
                      <p className="text-gray-600 text-right">{selectedPartnerForNotes.company}</p>
                      <p className="text-sm text-gray-500 text-right">{selectedPartnerForNotes.email}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge className={getStatusColor(selectedPartnerForNotes.status)}>
                          {getStatusText(selectedPartnerForNotes.status)}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          הצטרף: {new Date(selectedPartnerForNotes.joinDate).toLocaleDateString('he-IL')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Partner Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600">{selectedPartnerForNotes.totalLeads}</p>
                      <p className="text-sm text-gray-500">לידים</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">{selectedPartnerForNotes.totalSales}</p>
                      <p className="text-sm text-gray-500">מכירות</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-orange-600">{selectedPartnerForNotes.commissionPercentage}%</p>
                      <p className="text-sm text-gray-500">עמלה</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-purple-600">₪{selectedPartnerForNotes.totalEarnings.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">סה"כ עמלות</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Unique Link Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-right flex items-center gap-2">
                      <Link className="h-5 w-5 text-blue-500" />
                      לינק ייחודי לשיתוף
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Input 
                        value={selectedPartnerForNotes.uniqueLink} 
                        readOnly 
                        className="text-right font-mono text-sm"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(selectedPartnerForNotes.uniqueLink);
                          // TODO: Add toast notification using useToast hook
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                        שתף
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 text-right mt-2">
                      לינק ייחודי זה מזוהה עם השותף ומאפשר מעקב אחר פעילות
                    </p>
                  </CardContent>
                </Card>

                {/* Personal Description */}
                {selectedPartnerForNotes.personalDescription && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-right">תיאור אישי</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-right">{selectedPartnerForNotes.personalDescription}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Monthly Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-right">ביצועים לפי חודשים</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedPartnerForNotes.monthlyPerformance.map((month, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="text-right">
                            <p className="font-medium">{month.month}</p>
                          </div>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="text-center">
                              <p className="font-bold text-blue-600">{month.leads}</p>
                              <p className="text-gray-500">לידים</p>
                            </div>
                            <div className="text-center">
                              <p className="font-bold text-green-600">{month.sales}</p>
                              <p className="text-gray-500">מכירות</p>
                            </div>
                            <div className="text-center">
                              <p className="font-bold text-orange-600">₪{month.commission.toLocaleString()}</p>
                              <p className="text-gray-500">עמלה</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Internal Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-right">הערות פנימיות</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={selectedPartnerForNotes.internalNotes || ''}
                      onChange={(e) => {
                        // TODO: Update partner internal notes in database
                        // setPartners(prev => prev.map(p => p.id === selectedPartnerForNotes.id ? {...p, internalNotes: e.target.value} : p));
                      }}
                      className="text-right min-h-[100px]"
                      placeholder="הוסף הערות פנימיות על השותף..."
                    />
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowPartnerDetails(false)}>
                    סגור
                  </Button>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 ml-2" />
                    ערוך שותף
                  </Button>
                  <Button>
                    שמור שינויים
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
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
const AddPartnerForm: React.FC<{ onClose: () => void; fillFormWithPartnerData: (partner: Partner) => void; selectedPartner?: Partner }> = ({ onClose, fillFormWithPartnerData, selectedPartner }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // פרטים אישיים
    name: '',
    email: '',
    phone: '',
    whatsapp: '', // WhatsApp
    company: '',
    personalId: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    state: '', // מחוז/מדינה (לשותפים מחו"ל)
    region: '', // אזור (לשותפים מחו"ל)
    
    // מסמכים משפטיים מתקדמים
    contractFile: null as File | null, // העלאת חוזה הסכם
    contractSigned: false, // סטטוס חתימה על החוזה
    contractSignedDate: '', // תאריך חתימה
    signedContract: null as File | null,
    termsAccepted: false,
    contractTerms: '',
    
    // פרטים משפטיים נוספים
    businessType: 'individual' as 'individual' | 'company' | 'authorized_dealer', // סוג עצמאי/חברה/עוסק מורשה
    billingName: '', // שם על החשבונית
    businessNumber: '', // מספר עוסק מורשה
    taxId: '', // מספר זהות/חברה לצורך מס
    businessRegistrationDate: '',
    businessAddress: '',
    authorizedSignatory: '', // חתימה מורשית
    
    // מסמכים משפטיים נדרשים
    businessLicense: null as File | null, // רישיון עסק
    taxExemption: null as File | null, // פטור ממס
    bankLetter: null as File | null, // אישור בנק
    
    // מסמכים נוספים
    idDocument: null as File | null, // תעודת זהות
    businessRegistration: null as File | null, // תעודת רישום עסק
    incomeCertificate: null as File | null, // אישור הכנסות
    additionalDocuments: null as File | null, // מסמכים נוספים
    additionalFiles: [] as File[], // קבצים נוספים מרובים
    
    // פרטי חשבון בנקאיים
    bankAccountName: '', // שם על החשבון
    bankName: '',
    bankBranch: '',
    bankBranchName: '', // שם הסניף
    accountNumber: '',
    
    // פרטי העברה לחול (International Wire Transfer)
    beneficiaryName: '', // שם בעל החשבון באנגלית
    beneficiaryAddress: '', // כתובת מלאה
    bankNameEnglish: '', // שם הבנק באנגלית
    bankAddress: '', // כתובת הבנק
    ibanNumber: '', // מספר IBAN
    swiftBicCode: '', // קוד SWIFT/BIC
    paymentAmount: '', // סכום התשלום
    paymentPurpose: '', // מטרת התשלום
    intermediaryBank: '', // בנק תיווך (אם נדרש)
    paymentReference: '', // מספר אסמכתא
    
    // פרטי כרטיס אשראי
    cardHolderName: '',
    cardNumber: '',
    cardExpiryMonth: '',
    cardExpiryYear: '',
    cardCvv: '',
    
    // פרטי PayPal
    paypalAccountName: '',
    paypalEmail: '',
    
    // פרטי מטבע דיגיטלי
    cryptoWallet: '',
    cryptoWalletType: '', // Bitcoin, Ethereum וכו'
    
    paymentMethod: '',
    paymentCurrency: 'ILS' as 'ILS' | 'USD' | 'EUR' | 'GBP',
    
    // הגדרות עמלה מתקדמות
    commissionType: '',
    commissionStructure: 'simple' as 'simple' | 'mixed' | 'tiered', // מבנה העמלה
    
    // עמלה פשוטה
    commissionPercentage: '',
    fixedAmount: '',
    minAmount: '',
    maxAmount: '',
    
    // עמלה מעורבת
    mixedInitialAmount: '', // סכום התחלתי
    mixedInitialType: 'fixed' as 'fixed' | 'percentage', // סוג הסכום ההתחלתי
    mixedInitialPercentage: '',
    mixedOngoingStructure: 'fixed' as 'fixed' | 'percentage' | 'tiered', // מבנה העמלה המתמשכת
    mixedOngoingAmount: '',
    mixedOngoingPercentage: '',
    
    // עמלות מדורגות
    tieredCommissions: [
      { minSales: 0, maxSales: 10000, percentage: 10 },
      { minSales: 10000, maxSales: 50000, percentage: 15 },
      { minSales: 50000, maxSales: 999999, percentage: 20 }
    ],
    
    // שדות נוספים (legacy)
    initialAmount: '',
    monthlyAmount: '',
    userThreshold: '',
    timePeriod: '',
    
    // מנוי שנתי (12 חודשים)
    yearlyTotalCommission: '', // סכום העמלה השנתית הכולל
    yearlyMonthlyCommission: '', // סכום העמלה החודשית (אוטומטי)
    
    // תנאי תשלום משופרים
    paymentCondition: 'after_one_paid_month' as 'after_one_paid_month' | 'after_lead_month_plus_days' | 'immediate' | 'after_lead_conversion_only',
    paymentDelayDays: 3, // ימים נוספים לאחר התנאי הראשי
    paymentAfterSubscription: true,
    paymentAfterLeadMonth: false,
    
    // הגדרות עמלה מתקדמות
    commissionIncludesBase: true, // עמלה כוללת את הבסיס
    commissionIncludesAddons: true, // עמלה כוללת תוספות קניית לידים
    separatePaymentPerUser: true, // הפרדת תשלום לכל משתמש
    
    // הגדרות תשלום חדשות
    paymentForBasicSubscription: true, // תשלום עבור מנוי בסיסי
    paymentForAddons: true, // תשלום עבור תוספות
    
    // הגדרות מע"מ
    commissionIncludesVAT: false, // עמלה כוללת מע"מ
    paymentBeforeVAT: false, // תשלום לפני מע"מ
    paymentAfterVAT: false, // תשלום אחרי מע"מ
    
    // הגדרות נוספות
    status: 'active' as 'active' | 'inactive',
    joinDate: new Date().toISOString().split('T')[0],
    personalDescription: '',
    internalNotes: '',
    
    // לינק שותף
    uniqueLink: '',
    linkExpiryDays: 30,
    
    // תבנית תשלום
    paymentTemplate: '',
    autoPayment: false,
    paymentFrequency: 'monthly' as 'monthly' | 'weekly' | 'quarterly',
    
    // תנאי תשלום לפרטי חשבון
    paymentDay: '15',
    minPaymentThreshold: '500',
    baseCommissionPercentage: '15',
    paymentType: 'verified' as 'verified' | 'immediate' | 'monthly',
    allowCancellations: false,
    
    // תוספות שירותים
    fixedAddonCommission: '10',
    percentageAddonCommission: '20',
    addonPaymentWithMonthly: true,
    
    // מתי בחודש יהיה התשלום
    paymentDayOfMonth: '15',
    customPaymentFrequency: '',
    customPaymentFrequencyUnit: 'days' as 'days' | 'weeks' | 'months',
    customPaymentCondition: ''
  });

  // Generate unique link
  const generateUniqueLink = () => {
    const nameSlug = formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
    const randomId = Math.random().toString(36).substr(2, 9);
    return `https://hoogi.co/partner/${nameSlug}-${randomId}`;
  };

  // Update unique link when name changes
  React.useEffect(() => {
    if (formData.name && !formData.uniqueLink) {
      setFormData(prev => ({ ...prev, uniqueLink: generateUniqueLink() }));
    }
  }, [formData.name]);

  // Fill form when partner is selected
  React.useEffect(() => {
    if (selectedPartner) {
      fillFormWithPartnerDataInternal(selectedPartner);
    }
  }, [selectedPartner]);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Function to fill form with partner data
  const fillFormWithPartnerDataInternal = (partner: Partner) => {
    // מילוי פרטים אישיים
    setFormData(prev => ({
      ...prev,
      // פרטים אישיים
      name: partner.name || '',
      email: partner.email || '',
      phone: partner.phone || '',
      whatsapp: partner.whatsapp || '',
      company: partner.company || '',
      personalId: partner.personalId || '',
      address: partner.address || '',
      city: partner.city || '',
      zipCode: partner.zipCode || '',
      country: partner.country || '',
      state: partner.state || '',
      region: partner.region || '',
      
      // פרטי עסק
      billingName: partner.billingName || '',
      position: partner.position || '',
      
      // פרטי בנק
      bankName: partner.bankName || '',
      accountNumber: partner.accountNumber || '',
      branchNumber: partner.branchNumber || '',
      swiftBicCode: partner.swiftBicCode || '',
      ibanNumber: partner.ibanNumber || '',
      
      // עמלות
      commissionType: partner.commissionType || 'percentage',
      commissionPercentage: partner.commissionPercentage || 0,
      commissionAmount: partner.commissionAmount || 0,
      commissionFrequency: partner.commissionFrequency || 'monthly',
      commissionPaymentMethod: partner.commissionPaymentMethod || 'bank_transfer',
      commissionCondition: partner.commissionCondition || 'after_one_paid_month',
      commissionMinPayment: partner.commissionMinPayment || 0,
      
      // תשלומים
      paymentTerms: partner.paymentTerms || 'net_30',
      paymentMethod: partner.paymentMethod || 'bank_transfer',
      paymentFrequency: partner.paymentFrequency || 'monthly',
      paymentCondition: partner.paymentCondition || 'after_one_paid_month',
      paymentDelayDays: partner.paymentDelayDays || 0,
      
      // מסמכים משפטיים
      contractFile: partner.contractFile || null,
      contractSigned: partner.contractSigned || false,
      contractSignedDate: partner.contractSignedDate || '',
      
      // סטטוס
      status: partner.status || 'active',
      notes: partner.notes || ''
    }));
    
    // הצגת הודעה שהטופס מולא
    toast.success('הטופס מולא בפרטי השותף שנבחר');
  };

  const handleSignatureComplete = (signature: string) => {
    setSignatureData(signature);
    setShowSignaturePad(false);
  };

  const clearSignature = () => {
    setSignatureData(null);
  };

  const addTieredCommission = () => {
    setFormData(prev => ({
      ...prev,
      tieredCommissions: [
        ...prev.tieredCommissions,
        { minSales: 0, maxSales: 100000, percentage: 25 }
      ]
    }));
  };

  const updateTieredCommission = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      tieredCommissions: prev.tieredCommissions.map((tier, i) => 
        i === index ? { ...tier, [field]: value } : tier
      )
    }));
  };

  const removeTieredCommission = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tieredCommissions: prev.tieredCommissions.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (file: File, fieldName: string = 'signedContract') => {
    if (fieldName === 'additionalFiles') {
      setFormData(prev => ({ 
        ...prev, 
        additionalFiles: [...(prev.additionalFiles || []), file] 
      }));
    } else {
      setFormData(prev => ({ ...prev, [fieldName]: file }));
    }
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSave = () => {
    // TODO: Save partner data and close dialog
    console.log('Saving partner:', formData);
    onClose();
  };

  const generateNewPartnerExcel = () => {
    // יצירת Excel עם כל הפרטים של הטופס
    const excelData = [
      ['פרטי שותף חדש', ''],
      ['תאריך יצירה', new Date().toLocaleDateString('he-IL')],
      [''],
      ['פרטים אישיים', ''],
      ['שם מלא', formData.name],
      ['אימייל', formData.email],
      ['טלפון', formData.phone],
      ['WhatsApp', formData.whatsapp],
      ['חברה', formData.company],
      ['תעודת זהות', formData.personalId],
      ['כתובת', formData.address],
      ['עיר', formData.city],
      ['מיקוד/קוד דואר', formData.zipCode],
      ['מדינה', formData.country],
      ['מחוז/מדינה', formData.state],
      ['אזור', formData.region],
      [''],
      ['חוזה הסכם', ''],
      ['חוזה הועלה', formData.contractFile ? 'כן' : 'לא'],
      ['סטטוס חתימה', formData.contractSigned ? 'חתום' : 'ממתין לחתימה'],
      ['תאריך חתימה', formData.contractSignedDate || ''],
      [''],
      ['פרטי עסק', ''],
      ['שם על החשבונית', formData.billingName],
      ['סוג עסק', formData.businessType],
      ['מספר עוסק מורשה', formData.businessNumber],
      ['מספר זהות/חברה', formData.taxId],
      ['תאריך רישום עסק', formData.businessRegistrationDate],
      ['כתובת עסק', formData.businessAddress],
      ['חתימה מורשית', formData.authorizedSignatory],
      [''],
      ['פרטי חשבון בנקאיים', ''],
      ['שם על החשבון', formData.bankAccountName],
      ['שם הבנק', formData.bankName],
      ['מספר סניף', formData.bankBranch],
      ['שם הסניף', formData.bankBranchName],
      ['מספר חשבון', formData.accountNumber],
      [''],
      ['פרטי העברה לחול', ''],
      ['שם בעל החשבון באנגלית', formData.beneficiaryName],
      ['כתובת מלאה', formData.beneficiaryAddress],
      ['שם הבנק באנגלית', formData.bankNameEnglish],
      ['כתובת הבנק', formData.bankAddress],
      ['קוד SWIFT', formData.swiftCode],
      ['קוד IBAN', formData.ibanCode],
      [''],
      ['הגדרות עמלה', ''],
      ['סוג עמלה', formData.commissionType],
      ['אחוז עמלה', formData.commissionPercentage?.toString() || ''],
      ['עמלה חודשית קבועה', formData.monthlyCommission?.toString() || ''],
      ['עמלה חד פעמית', formData.oneTimeCommission?.toString() || ''],
      ['תדירות תשלום', formData.paymentFrequency],
      ['שיטת תשלום', formData.paymentMethod],
      ['תנאי תשלום', formData.paymentCondition],
      ['עמלה כוללת מע"מ', formData.commissionIncludesVAT ? 'כן' : 'לא'],
      ['תשלום לפני מע"מ', formData.paymentBeforeVAT ? 'כן' : 'לא'],
      ['תשלום אחרי מע"מ', formData.paymentAfterVAT ? 'כן' : 'לא'],
      [''],
      ['מנוי שנתי (12 חודשים)', ''],
      ['סכום עמלה שנתי כולל', formData.yearlyTotalCommission || ''],
      ['סכום עמלה חודשי', formData.yearlyMonthlyCommission || ''],
      [''],
      ['מסמכים', ''],
      ['חוזה חתום', formData.signedContract ? 'הועלה' : 'לא הועלה'],
      ['רישיון עסק', formData.businessLicense ? 'הועלה' : 'לא הועלה'],
      ['פטור ממס', formData.taxExemption ? 'הועלה' : 'לא הועלה'],
      ['אישור בנק', formData.bankLetter ? 'הועלה' : 'לא הועלה'],
      ['תעודת זהות', formData.idDocument ? 'הועלה' : 'לא הועלה'],
      ['תעודת רישום עסק', formData.businessRegistration ? 'הועלה' : 'לא הועלה'],
      ['אישור הכנסות', formData.incomeCertificate ? 'הועלה' : 'לא הועלה'],
      ['מסמכים נוספים', formData.additionalDocuments ? 'הועלה' : 'לא הועלה'],
      ['קבצים נוספים', formData.additionalFiles?.length ? `${formData.additionalFiles.length} קבצים` : 'אין קבצים']
    ];

    // המרה ל-CSV (Excel יכול לקרוא CSV)
    const csvContent = excelData.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `טופס_שותף_חדש_${formData.name || 'ללא_שם'}_${new Date().toLocaleDateString('he-IL')}.xlsx`;
    link.click();
    
    toast.success("טופס שותף חדש נוצר ב-Excel בהצלחה!");
  };

  const steps = [
    { number: 1, title: 'פרטים אישיים', icon: Users },
    { number: 2, title: 'פרטי חשבון', icon: CreditCard },
    { number: 3, title: 'הגדרות עמלה', icon: DollarSign }
  ];

  return (
    <>
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                  isActive ? 'bg-blue-600 border-blue-600 text-white' :
                  isCompleted ? 'bg-green-600 border-green-600 text-white' :
                  'bg-gray-100 border-gray-300 text-gray-500'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`text-sm mt-2 ${isActive ? 'font-medium text-blue-600' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg border p-6">
        {currentStep === 1 && (
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader className="bg-blue-100/50 rounded-t-lg">
              <CardTitle className="text-right flex items-center gap-2 text-blue-800">
                <Users className="h-5 w-5 text-blue-600" />
                פרטים אישיים
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 bg-white/70 rounded-b-lg">
              {/* פרטים בסיסיים */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  פרטים בסיסיים
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-right">שם מלא *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      className="text-right bg-white"
                      placeholder="הזן שם מלא"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-right">אימייל *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      className="text-right bg-white"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-right">טלפון *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      className="text-right bg-white"
                      placeholder="050-1234567"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp" className="text-right">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      value={formData.whatsapp}
                      onChange={(e) => handleFieldChange('whatsapp', e.target.value)}
                      className="text-right bg-white"
                      placeholder="050-1234567"
                    />
                  </div>
                </div>
              </div>

              {/* פרטי עסק */}
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <Building className="h-5 w-5 text-green-600" />
                  פרטי עסק
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="billingName" className="text-right">שם על החשבונית</Label>
                    <Input
                      id="billingName"
                      value={formData.billingName}
                      onChange={(e) => handleFieldChange('billingName', e.target.value)}
                      className="text-right bg-white"
                      placeholder="שם שיופיע על החשבונית"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessType" className="text-right">סוג עסק *</Label>
                    <Select value={formData.businessType} onValueChange={(value) => handleFieldChange('businessType', value)}>
                      <SelectTrigger className="text-right bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">עצמאי</SelectItem>
                        <SelectItem value="authorized_dealer">עוסק מורשה</SelectItem>
                        <SelectItem value="company">חברה</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="personalId" className="text-right">ת.ז./ח.פ *</Label>
                    <Input
                      id="personalId"
                      value={formData.personalId}
                      onChange={(e) => handleFieldChange('personalId', e.target.value)}
                      className="text-right bg-white"
                      placeholder="123456789"
                      required
                    />
                  </div>
                  
                  {formData.businessType === 'authorized_dealer' && (
                    <div>
                      <Label htmlFor="businessNumber" className="text-right">מספר עוסק מורשה *</Label>
                      <Input
                        id="businessNumber"
                        value={formData.businessNumber}
                        onChange={(e) => handleFieldChange('businessNumber', e.target.value)}
                        className="text-right bg-white"
                        placeholder="מספר עוסק מורשה"
                        required
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="company" className="text-right">שם החברה/העסק</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleFieldChange('company', e.target.value)}
                      className="text-right bg-white"
                      placeholder="שם החברה או העסק"
                    />
                  </div>
                  <div>
                    <Label className="text-right">סטטוס</Label>
                    <Select value={formData.status} onValueChange={(value) => handleFieldChange('status', value)}>
                      <SelectTrigger className="text-right bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">פעיל</SelectItem>
                        <SelectItem value="inactive">לא פעיל</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* כתובת */}
              <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
                  <Building className="h-5 w-5 text-purple-600" />
                  כתובת
                </h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-right">כתובת</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleFieldChange('address', e.target.value)}
                      className="text-right bg-white"
                      placeholder="הזן כתובת מלאה"
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-right">עיר</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleFieldChange('city', e.target.value)}
                        className="text-right bg-white"
                        placeholder="תל אביב"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="text-right">מיקוד/קוד דואר</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleFieldChange('zipCode', e.target.value)}
                        className="text-right bg-white"
                        placeholder="1234567"
                      />
                    </div>
                  </div>
                  
                  {/* מדינה ומחוזות */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="country" className="text-right">מדינה *</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => handleFieldChange('country', value)}
                      >
                        <SelectTrigger className="text-right bg-white">
                          <SelectValue placeholder="בחר מדינה" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="israel">ישראל</SelectItem>
                          <SelectItem value="usa">ארצות הברית</SelectItem>
                          <SelectItem value="uk">בריטניה</SelectItem>
                          <SelectItem value="canada">קנדה</SelectItem>
                          <SelectItem value="australia">אוסטרליה</SelectItem>
                          <SelectItem value="germany">גרמניה</SelectItem>
                          <SelectItem value="france">צרפת</SelectItem>
                          <SelectItem value="spain">ספרד</SelectItem>
                          <SelectItem value="italy">איטליה</SelectItem>
                          <SelectItem value="netherlands">הולנד</SelectItem>
                          <SelectItem value="other">אחר</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* מחוז/מדינה (רק אם נבחרה ארה"ב) */}
                    {formData.country === 'usa' && (
                      <div>
                        <Label htmlFor="state" className="text-right">מדינה/מחוז</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => handleFieldChange('state', value)}
                        >
                          <SelectTrigger className="text-right bg-white">
                            <SelectValue placeholder="בחר מדינה" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="alabama">Alabama</SelectItem>
                            <SelectItem value="alaska">Alaska</SelectItem>
                            <SelectItem value="arizona">Arizona</SelectItem>
                            <SelectItem value="arkansas">Arkansas</SelectItem>
                            <SelectItem value="california">California</SelectItem>
                            <SelectItem value="colorado">Colorado</SelectItem>
                            <SelectItem value="connecticut">Connecticut</SelectItem>
                            <SelectItem value="delaware">Delaware</SelectItem>
                            <SelectItem value="florida">Florida</SelectItem>
                            <SelectItem value="georgia">Georgia</SelectItem>
                            <SelectItem value="hawaii">Hawaii</SelectItem>
                            <SelectItem value="idaho">Idaho</SelectItem>
                            <SelectItem value="illinois">Illinois</SelectItem>
                            <SelectItem value="indiana">Indiana</SelectItem>
                            <SelectItem value="iowa">Iowa</SelectItem>
                            <SelectItem value="kansas">Kansas</SelectItem>
                            <SelectItem value="kentucky">Kentucky</SelectItem>
                            <SelectItem value="louisiana">Louisiana</SelectItem>
                            <SelectItem value="maine">Maine</SelectItem>
                            <SelectItem value="maryland">Maryland</SelectItem>
                            <SelectItem value="massachusetts">Massachusetts</SelectItem>
                            <SelectItem value="michigan">Michigan</SelectItem>
                            <SelectItem value="minnesota">Minnesota</SelectItem>
                            <SelectItem value="mississippi">Mississippi</SelectItem>
                            <SelectItem value="missouri">Missouri</SelectItem>
                            <SelectItem value="montana">Montana</SelectItem>
                            <SelectItem value="nebraska">Nebraska</SelectItem>
                            <SelectItem value="nevada">Nevada</SelectItem>
                            <SelectItem value="new-hampshire">New Hampshire</SelectItem>
                            <SelectItem value="new-jersey">New Jersey</SelectItem>
                            <SelectItem value="new-mexico">New Mexico</SelectItem>
                            <SelectItem value="new-york">New York</SelectItem>
                            <SelectItem value="north-carolina">North Carolina</SelectItem>
                            <SelectItem value="north-dakota">North Dakota</SelectItem>
                            <SelectItem value="ohio">Ohio</SelectItem>
                            <SelectItem value="oklahoma">Oklahoma</SelectItem>
                            <SelectItem value="oregon">Oregon</SelectItem>
                            <SelectItem value="pennsylvania">Pennsylvania</SelectItem>
                            <SelectItem value="rhode-island">Rhode Island</SelectItem>
                            <SelectItem value="south-carolina">South Carolina</SelectItem>
                            <SelectItem value="south-dakota">South Dakota</SelectItem>
                            <SelectItem value="tennessee">Tennessee</SelectItem>
                            <SelectItem value="texas">Texas</SelectItem>
                            <SelectItem value="utah">Utah</SelectItem>
                            <SelectItem value="vermont">Vermont</SelectItem>
                            <SelectItem value="virginia">Virginia</SelectItem>
                            <SelectItem value="washington">Washington</SelectItem>
                            <SelectItem value="west-virginia">West Virginia</SelectItem>
                            <SelectItem value="wisconsin">Wisconsin</SelectItem>
                            <SelectItem value="wyoming">Wyoming</SelectItem>
                            <SelectItem value="dc">Washington D.C.</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    {/* אזור (לשותפים מחו"ל) */}
                    {formData.country && formData.country !== 'israel' && (
                      <div>
                        <Label htmlFor="region" className="text-right">אזור/מחוז</Label>
                        <Input
                          id="region"
                          value={formData.region}
                          onChange={(e) => handleFieldChange('region', e.target.value)}
                          className="text-right bg-white"
                          placeholder="הזן אזור או מחוז"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* תיאור אישי */}
              <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-600" />
                  תיאור אישי
                </h4>
                <div>
                  <Label htmlFor="personalDescription" className="text-right">תיאור אישי</Label>
                  <Textarea
                    id="personalDescription"
                    value={formData.personalDescription}
                    onChange={(e) => handleFieldChange('personalDescription', e.target.value)}
                    className="text-right bg-white"
                    placeholder="תיאור קצר על השותף ותחומי הפעילות שלו/ה"
                    rows={3}
                  />
                </div>
              </div>

              {/* מסמכים משפטיים */}
              <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-red-600" />
                  מסמכים משפטיים
                </h4>
                
                <div className="space-y-4">
                  {/* חוזה הסכם */}
                  <div className="p-4 bg-white rounded-lg border border-purple-200">
                    <h5 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-purple-600" />
                      חוזה הסכם
                    </h5>
                    
                    {/* העלאת חוזה מקורי */}
                    <div className="mb-4">
                      <Label htmlFor="contractFile" className="text-right block mb-2">העלאת חוזה הסכם</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          id="contractFile"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFieldChange('contractFile', file);
                            }
                          }}
                          className="flex-1"
                        />
                        {formData.contractFile && (
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-green-600">
                              {formData.contractFile.name}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                // הורדת הקובץ המקורי
                                const url = URL.createObjectURL(formData.contractFile!);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = formData.contractFile!.name;
                                a.click();
                                URL.revokeObjectURL(url);
                              }}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* חוזה חתום */}
                    <div>
                      <Label htmlFor="signedContract" className="text-right block mb-2">חוזה חתום</Label>
                      <div className="space-y-3">
                        {/* אפשרות 1: העלאת קובץ חתום */}
                        <div>
                          <Label className="text-sm text-gray-600 mb-2 block">אפשרות 1: העלאת קובץ חתום</Label>
                          <div className="flex items-center gap-3">
                            <Input
                              id="signedContract"
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(file, 'signedContract');
                                  handleFieldChange('contractSigned', true);
                                  handleFieldChange('contractSignedDate', new Date().toISOString());
                                }
                              }}
                              className="flex-1"
                            />
                            {formData.signedContract && (
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-green-600">
                                  {formData.signedContract.name}
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    // הורדת הקובץ החתום
                                    const url = URL.createObjectURL(formData.signedContract!);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = formData.signedContract!.name;
                                    a.click();
                                    URL.revokeObjectURL(url);
                                  }}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* אפשרות 2: קבלת טופס חתום */}
                        <div className="border-t pt-3">
                          <Label className="text-sm text-gray-600 mb-2 block">אפשרות 2: קבלת טופס חתום מהטופס שנשלח</Label>
                          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-blue-600" />
                                <span className="text-sm text-blue-800">טופס חתום מהשותף</span>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  // כאן יהיה הלוגיקה לקבלת הטופס החתום
                                  toast.success("הטופס החתום התקבל בהצלחה!");
                                  handleFieldChange('contractSigned', true);
                                  handleFieldChange('contractSignedDate', new Date().toISOString());
                                }}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                קבל טופס חתום
                              </Button>
                            </div>
                            <p className="text-xs text-blue-600 mt-2">
                              הטופס החתום יגיע אוטומטית לאחר שהשותף ימלא ויחתום על הטופס שנשלח לו
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 text-right mt-2">
                        ניתן לבחור באחת מהאפשרויות: העלאת קובץ חתום או קבלת טופס חתום מהטופס שנשלח לשותף
                      </p>
                    </div>

                    {/* סטטוס חתימה */}
                    <div className="mt-3 p-2 bg-gray-50 rounded border">
                      <div className="flex items-center gap-2">
                        {formData.contractSigned ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-green-600 font-medium text-sm">חוזה חתום</span>
                            {formData.contractSignedDate && (
                              <span className="text-xs text-gray-500">
                                ({new Date(formData.contractSignedDate).toLocaleDateString('he-IL')})
                              </span>
                            )}
                          </>
                        ) : (
                          <>
                            <Clock className="h-4 w-4 text-orange-500" />
                            <span className="text-orange-600 font-medium text-sm">ממתין לחתימה</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* מסמכים נוספים */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">מסמכים נוספים</Label>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-right">תעודת זהות</Label>
                        <div className="flex items-center gap-3 mt-2">
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file, 'idDocument');
                            }}
                            className="flex-1"
                          />
                          {formData.idDocument && (
                            <Badge variant="outline" className="text-green-600">
                              {formData.idDocument.name}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label className="text-right">תעודת רישום עסק</Label>
                        <div className="flex items-center gap-3 mt-2">
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file, 'businessRegistration');
                            }}
                            className="flex-1"
                          />
                          {formData.businessRegistration && (
                            <Badge variant="outline" className="text-green-600">
                              {formData.businessRegistration.name}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-right">אישור הכנסות</Label>
                        <div className="flex items-center gap-3 mt-2">
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file, 'incomeCertificate');
                            }}
                            className="flex-1"
                          />
                          {formData.incomeCertificate && (
                            <Badge variant="outline" className="text-green-600">
                              {formData.incomeCertificate.name}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label className="text-right">מסמכים נוספים</Label>
                        <div className="flex items-center gap-3 mt-2">
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file, 'additionalDocuments');
                            }}
                            className="flex-1"
                          />
                          {formData.additionalDocuments && (
                            <Badge variant="outline" className="text-green-600">
                              {formData.additionalDocuments.name}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 text-right mt-1">
                          מסמכים נוספים כמו המלצות, תעודות מקצועיות וכו'
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* מסמכים משפטיים נוספים */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-right">רישיון עסק</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, 'businessLicense');
                          }}
                          className="flex-1"
                        />
                        {formData.businessLicense && (
                          <Badge variant="outline" className="text-green-600">
                            {formData.businessLicense.name}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-right">פטור ממס</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <Input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, 'taxExemption');
                          }}
                          className="flex-1"
                        />
                        {formData.taxExemption && (
                          <Badge variant="outline" className="text-green-600">
                            {formData.taxExemption.name}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-right">אישור בנק</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, 'bankLetter');
                        }}
                        className="flex-1"
                      />
                      {formData.bankLetter && (
                        <Badge variant="outline" className="text-green-600">
                          {formData.bankLetter.name}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 text-right mt-1">
                      אישור מהבנק לפרטי החשבון לשותף זה
                    </p>
                  </div>

                  {/* העלאת קבצים מרובים */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">העלאת קבצים נוספים</Label>
                    
                    <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-3">גרור קבצים לכאן או לחץ לבחירה</p>
                      <div className="flex gap-2 justify-center">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.multiple = true;
                            input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
                            input.onchange = (e) => {
                              const files = (e.target as HTMLInputElement).files;
                              if (files) {
                                Array.from(files).forEach(file => {
                                  handleFileUpload(file, 'additionalFiles');
                                });
                              }
                            };
                            input.click();
                          }}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Plus className="w-4 h-4 ml-1" />
                          בחר קבצים
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.multiple = true;
                            input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
                            input.onchange = (e) => {
                              const files = (e.target as HTMLInputElement).files;
                              if (files) {
                                Array.from(files).forEach(file => {
                                  handleFileUpload(file, 'additionalFiles');
                                });
                              }
                            };
                            input.click();
                          }}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Plus className="w-4 h-4 ml-1" />
                          הוסף עוד
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600 text-right mt-2">
                        ניתן להעלות מספר קבצים בו זמנית (PDF, JPG, PNG, DOC, DOCX)
                      </p>
                    </div>
                    
                    {/* רשימת קבצים שהועלו */}
                    {formData.additionalFiles && formData.additionalFiles.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">קבצים שהועלו:</Label>
                        <div className="space-y-1">
                          {formData.additionalFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                              <span className="text-sm text-gray-700">{file.name}</span>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newFiles = formData.additionalFiles?.filter((_, i) => i !== index) || [];
                                  handleFieldChange('additionalFiles', newFiles);
                                }}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* לינק שותף ייחודי - נוסף לפרטים אישיים */}
        {currentStep === 1 && (
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <CardHeader className="bg-purple-100/50 rounded-t-lg">
              <CardTitle className="text-right flex items-center gap-2 text-purple-800">
                <Link className="h-5 w-5 text-purple-600" />
                לינק שותף ייחודי
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 bg-white/70 rounded-b-lg">
              <div className="max-w-2xl mx-auto">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Label htmlFor="uniqueLink" className="text-right">לינק שותף *</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="uniqueLink"
                      value={formData.uniqueLink}
                      onChange={(e) => handleFieldChange('uniqueLink', e.target.value)}
                      className="text-right font-mono text-sm flex-1"
                      placeholder="https://hoogi.co/partner/..."
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        handleFieldChange('uniqueLink', generateUniqueLink());
                      }}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(formData.uniqueLink);
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600 text-right mt-2">
                    לינק זה יזהה את השותף ויאפשר מעקב אחר פעילות ההפצה שלו/ה
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkExpiryDays" className="text-right">תוקף לינק (ימים)</Label>
                    <Input
                      id="linkExpiryDays"
                      type="number"
                      value={formData.linkExpiryDays}
                      onChange={(e) => handleFieldChange('linkExpiryDays', e.target.value)}
                      className="text-right"
                      placeholder="30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="internalNotes" className="text-right">הערות פנימיות</Label>
                    <Textarea
                      id="internalNotes"
                      value={formData.internalNotes}
                      onChange={(e) => handleFieldChange('internalNotes', e.target.value)}
                      className="text-right"
                      placeholder="הערות נוספות על השותף..."
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader className="bg-blue-100/50 rounded-t-lg">
              <CardTitle className="text-right flex items-center gap-2 text-blue-800">
                <CreditCard className="h-5 w-5 text-blue-600" />
                פרטי חשבון לתשלום
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 bg-white/70 rounded-b-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-right">אמצעי תשלום מועדף *</Label>
                  <Select value={formData.paymentMethod} onValueChange={(value) => handleFieldChange('paymentMethod', value)}>
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="בחר אמצעי תשלום" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_transfer">העברה בנקאית</SelectItem>
                      <SelectItem value="international_wire">העברה לחול</SelectItem>
                      <SelectItem value="credit_card">כרטיס אשראי</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="crypto">מטבע דיגיטלי</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-right">מטבע תשלום *</Label>
                  <Select value={formData.paymentCurrency} onValueChange={(value) => handleFieldChange('paymentCurrency', value)}>
                    <SelectTrigger className="text-right">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ILS">₪ שקל ישראלי</SelectItem>
                      <SelectItem value="USD">$ דולר אמריקאי</SelectItem>
                      <SelectItem value="EUR">€ יורו</SelectItem>
                      <SelectItem value="GBP">£ לירה שטרלינג</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.paymentMethod === 'bank_transfer' && (
                <div className="space-y-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    פרטי העברה בנקאית מקומית
                  </h4>
                  
                  <div>
                    <Label htmlFor="bankAccountName" className="text-right">שם על החשבון *</Label>
                    <Input
                      id="bankAccountName"
                      value={formData.bankAccountName}
                      onChange={(e) => handleFieldChange('bankAccountName', e.target.value)}
                      className="text-right"
                      placeholder="שם מלא כפי שמופיע על החשבון"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bankName" className="text-right">שם הבנק *</Label>
                      <Input
                        id="bankName"
                        value={formData.bankName}
                        onChange={(e) => handleFieldChange('bankName', e.target.value)}
                        className="text-right"
                        placeholder="בנק הפועלים"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bankBranchName" className="text-right">שם הסניף *</Label>
                      <Input
                        id="bankBranchName"
                        value={formData.bankBranchName}
                        onChange={(e) => handleFieldChange('bankBranchName', e.target.value)}
                        className="text-right"
                        placeholder="שם הסניף המלא"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bankBranch" className="text-right">מספר סניף *</Label>
                      <Input
                        id="bankBranch"
                        value={formData.bankBranch}
                        onChange={(e) => handleFieldChange('bankBranch', e.target.value)}
                        className="text-right"
                        placeholder="123"
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber" className="text-right">מספר חשבון *</Label>
                      <Input
                        id="accountNumber"
                        value={formData.accountNumber}
                        onChange={(e) => handleFieldChange('accountNumber', e.target.value)}
                        className="text-right"
                        placeholder="123456789"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'international_wire' && (
                <div className="space-y-6 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-purple-600" />
                    פרטי העברה לחול (International Wire Transfer)
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="beneficiaryName" className="text-right text-sm">Beneficiary Name *</Label>
                      <Input
                        id="beneficiaryName"
                        value={formData.beneficiaryName}
                        onChange={(e) => handleFieldChange('beneficiaryName', e.target.value)}
                        className="text-right"
                        placeholder="Full name as appears in bank (in English)"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="beneficiaryAddress" className="text-right text-sm">Beneficiary Address *</Label>
                      <Input
                        id="beneficiaryAddress"
                        value={formData.beneficiaryAddress}
                        onChange={(e) => handleFieldChange('beneficiaryAddress', e.target.value)}
                        className="text-right"
                        placeholder="Full address as appears in bank documents"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bankNameEnglish" className="text-right text-sm">Bank Name (English) *</Label>
                        <Input
                          id="bankNameEnglish"
                          value={formData.bankNameEnglish}
                          onChange={(e) => handleFieldChange('bankNameEnglish', e.target.value)}
                          className="text-right"
                          placeholder="e.g., Bank Leumi le-Israel B.M."
                        />
                      </div>
                      <div>
                        <Label htmlFor="bankAddress" className="text-right text-sm">Bank Address</Label>
                        <Input
                          id="bankAddress"
                          value={formData.bankAddress}
                          onChange={(e) => handleFieldChange('bankAddress', e.target.value)}
                          className="text-right"
                          placeholder="Main branch or headquarters address"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ibanNumber" className="text-right text-sm">Account Number / IBAN *</Label>
                        <Input
                          id="ibanNumber"
                          value={formData.ibanNumber}
                          onChange={(e) => handleFieldChange('ibanNumber', e.target.value)}
                          className="text-right"
                          placeholder="IL62 0108 0000 0000 1234 567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="swiftBicCode" className="text-right text-sm">SWIFT/BIC Code *</Label>
                        <Input
                          id="swiftBicCode"
                          value={formData.swiftBicCode}
                          onChange={(e) => handleFieldChange('swiftBicCode', e.target.value)}
                          className="text-right"
                          placeholder="LUMIILITXXX"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="paymentAmount" className="text-right text-sm">Amount *</Label>
                        <Input
                          id="paymentAmount"
                          type="number"
                          value={formData.paymentAmount}
                          onChange={(e) => handleFieldChange('paymentAmount', e.target.value)}
                          className="text-right"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="paymentPurpose" className="text-right text-sm">Purpose of Payment *</Label>
                        <Input
                          id="paymentPurpose"
                          value={formData.paymentPurpose}
                          onChange={(e) => handleFieldChange('paymentPurpose', e.target.value)}
                          className="text-right"
                          placeholder="e.g., Payment for software services"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="intermediaryBank" className="text-right text-sm">Intermediary Bank (if required)</Label>
                        <Input
                          id="intermediaryBank"
                          value={formData.intermediaryBank}
                          onChange={(e) => handleFieldChange('intermediaryBank', e.target.value)}
                          className="text-right"
                          placeholder="Required for US intermediary banks"
                        />
                      </div>
                      <div>
                        <Label htmlFor="paymentReference" className="text-right text-sm">Reference *</Label>
                        <Input
                          id="paymentReference"
                          value={formData.paymentReference}
                          onChange={(e) => handleFieldChange('paymentReference', e.target.value)}
                          className="text-right"
                          placeholder="Transaction reference number"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'credit_card' && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <div>
                    <Label htmlFor="cardHolderName" className="text-right">שם בעל הכרטיס *</Label>
                    <Input
                      id="cardHolderName"
                      value={formData.cardHolderName}
                      onChange={(e) => handleFieldChange('cardHolderName', e.target.value)}
                      className="text-right"
                      placeholder="שם מלא כפי שמופיע על הכרטיס"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber" className="text-right">מספר כרטיס אשראי *</Label>
                    <Input
                      id="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => handleFieldChange('cardNumber', e.target.value)}
                      className="text-right"
                      placeholder="1234-5678-9012-3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="cardExpiryMonth" className="text-right">חודש *</Label>
                      <Select value={formData.cardExpiryMonth} onValueChange={(value) => handleFieldChange('cardExpiryMonth', value)}>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                              {String(i + 1).padStart(2, '0')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="cardExpiryYear" className="text-right">שנה *</Label>
                      <Select value={formData.cardExpiryYear} onValueChange={(value) => handleFieldChange('cardExpiryYear', value)}>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="YYYY" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => {
                            const year = new Date().getFullYear() + i;
                            return (
                              <SelectItem key={year} value={String(year)}>
                                {year}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="cardCvv" className="text-right">CVV *</Label>
                      <Input
                        id="cardCvv"
                        value={formData.cardCvv}
                        onChange={(e) => handleFieldChange('cardCvv', e.target.value)}
                        className="text-right"
                        placeholder="123"
                        maxLength={4}
                        type="password"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'paypal' && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <div>
                    <Label htmlFor="paypalAccountName" className="text-right">שם על חשבון PayPal *</Label>
                    <Input
                      id="paypalAccountName"
                      value={formData.paypalAccountName}
                      onChange={(e) => handleFieldChange('paypalAccountName', e.target.value)}
                      className="text-right"
                      placeholder="שם מלא כפי שמופיע בחשבון PayPal"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="paypalEmail" className="text-right">כתובת PayPal *</Label>
                    <Input
                      id="paypalEmail"
                      type="email"
                      value={formData.paypalEmail}
                      onChange={(e) => handleFieldChange('paypalEmail', e.target.value)}
                      className="text-right"
                      placeholder="partner@paypal.com"
                      required
                    />
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'crypto' && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <div>
                    <Label className="text-right">סוג מטבע דיגיטלי *</Label>
                    <Select value={formData.cryptoWalletType} onValueChange={(value) => handleFieldChange('cryptoWalletType', value)}>
                      <SelectTrigger className="text-right">
                        <SelectValue placeholder="בחר סוג מטבע" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                        <SelectItem value="binance">Binance Coin (BNB)</SelectItem>
                        <SelectItem value="litecoin">Litecoin (LTC)</SelectItem>
                        <SelectItem value="ripple">Ripple (XRP)</SelectItem>
                        <SelectItem value="cardano">Cardano (ADA)</SelectItem>
                        <SelectItem value="usdt">Tether (USDT)</SelectItem>
                        <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="cryptoWallet" className="text-right">כתובת ארנק דיגיטלי *</Label>
                    <Input
                      id="cryptoWallet"
                      value={formData.cryptoWallet}
                      onChange={(e) => handleFieldChange('cryptoWallet', e.target.value)}
                      className="text-right font-mono text-sm"
                      placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                      required
                    />
                    <p className="text-xs text-gray-600 text-right mt-1">
                      ודא שכתובת הארנק תואמת לסוג המטבע שבחרת
                    </p>
                  </div>
                </div>
              )}

              {/* מתי ישולם התשלום לשותף */}
              <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-800 mb-3">מתי ישולם התשלום לשותף?</h5>
                <div className="space-y-4">
                  <div>
                    <Select value={formData.paymentCondition} onValueChange={(value) => handleFieldChange('paymentCondition', value)}>
                      <SelectTrigger className="text-right">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="after_one_paid_month">
                          🔐 רק אחרי חודש מנוי אחד ששולם במלואו
                        </SelectItem>
                        <SelectItem value="after_lead_month_plus_days">
                          ⏰ חודש מהליד + X ימים ביטחון
                        </SelectItem>
                        <SelectItem value="immediate">
                          ⚡ תשלום מיידי (לא מומלץ)
                        </SelectItem>
                        <SelectItem value="after_lead_conversion_only">
                          🎯 רק על פי המרת לידים אמיתית
                        </SelectItem>
                        <SelectItem value="custom">
                          ✏️ אחר - הגדר בעצמך
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.paymentCondition === 'after_lead_month_plus_days' && (
                    <div>
                      <Label className="text-sm font-medium">ימים נוספים מעבר לחודש (ביטחון)</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input 
                          type="number"
                          value={formData.paymentDelayDays || 3}
                          onChange={(e) => handleFieldChange('paymentDelayDays', parseInt(e.target.value))}
                          className="text-right w-20"
                          min="1"
                          max="30"
                        />
                        <span className="text-sm text-gray-600">ימים</span>
                      </div>
                    </div>
                  )}

                  {formData.paymentCondition === 'custom' && (
                    <div>
                      <Label className="text-sm font-medium">הגדר תנאי תשלום מותאם אישית</Label>
                      <Textarea 
                        value={formData.customPaymentCondition || ""}
                        onChange={(e) => handleFieldChange('customPaymentCondition', e.target.value)}
                        className="text-right mt-2"
                        placeholder="הכנס כאן את התנאים המותאמים אישית שלך..."
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* מתי בחודש יהיה התשלום */}
              <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h5 className="font-medium text-orange-800 mb-3">מתי בחודש יהיה התשלום?</h5>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">יום בחודש לתשלום</Label>
                      <Select value={formData.paymentDayOfMonth || "15"} onValueChange={(value) => handleFieldChange('paymentDayOfMonth', value)}>
                        <SelectTrigger className="text-right">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 לחודש</SelectItem>
                          <SelectItem value="5">5 לחודש</SelectItem>
                          <SelectItem value="10">10 לחודש</SelectItem>
                          <SelectItem value="15">15 לחודש</SelectItem>
                          <SelectItem value="20">20 לחודש</SelectItem>
                          <SelectItem value="25">25 לחודש</SelectItem>
                          <SelectItem value="30">30 לחודש</SelectItem>
                          <SelectItem value="last">יום אחרון בחודש</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">תדירות תשלום</Label>
                      <Select value={formData.paymentFrequency || "monthly"} onValueChange={(value) => handleFieldChange('paymentFrequency', value)}>
                        <SelectTrigger className="text-right">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">שבועי</SelectItem>
                          <SelectItem value="biweekly">דו-שבועי</SelectItem>
                          <SelectItem value="monthly">חודשי</SelectItem>
                          <SelectItem value="quarterly">רבעוני</SelectItem>
                          <SelectItem value="custom">מותאם אישית</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {formData.paymentFrequency === 'custom' && (
                    <div>
                      <Label className="text-sm font-medium">הגדר תדירות מותאמת אישית</Label>
                      <div className="flex items-center gap-2 mt-2">
                        <Input 
                          type="number"
                          value={formData.customPaymentFrequency || ""}
                          onChange={(e) => handleFieldChange('customPaymentFrequency', e.target.value)}
                          className="text-right w-20"
                          placeholder="7"
                        />
                        <Select value={formData.customPaymentFrequencyUnit || "days"} onValueChange={(value) => handleFieldChange('customPaymentFrequencyUnit', value)}>
                          <SelectTrigger className="text-right w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="days">ימים</SelectItem>
                            <SelectItem value="weeks">שבועות</SelectItem>
                            <SelectItem value="months">חודשים</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <CardHeader className="bg-orange-100/50 rounded-t-lg">
              <CardTitle className="text-right flex items-center gap-2 text-orange-800">
                <DollarSign className="h-5 w-5 text-orange-600" />
                הגדרות עמלה
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 bg-white/70 rounded-b-lg">
              {/* סוגי עמלה */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  סוגי עמלה
                </h4>
                <div>
                  <Label className="text-right">סוג עמלה *</Label>
                  <Select value={formData.commissionType} onValueChange={(value) => {
                    handleFieldChange('commissionType', value);
                    handleFieldChange('commissionStructure', 
                      value === 'mixed' ? 'mixed' : 
                      value === 'tiered' ? 'tiered' : 'simple'
                    );
                  }}>
                    <SelectTrigger className="text-right bg-white">
                      <SelectValue placeholder="בחר סוג עמלה" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed_monthly">עמלה חודשית קבועה</SelectItem>
                      <SelectItem value="percentage_monthly">עמלה חודשית באחוזים</SelectItem>
                      <SelectItem value="one_time">עמלה חד פעמית (ללא תשלומים נוספים)</SelectItem>
                      <SelectItem value="mixed">עמלה מעורבת</SelectItem>
                      <SelectItem value="tiered">עמלות מדורגות</SelectItem>
                      <SelectItem value="user_based">עמלה לפי משתמשים</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.commissionType === 'percentage_monthly' && (
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <h5 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    עמלה חודשית באחוזים
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="commissionPercentage" className="text-right">אחוז עמלה (%) *</Label>
                      <Input
                        id="commissionPercentage"
                        type="number"
                        value={formData.commissionPercentage}
                        onChange={(e) => handleFieldChange('commissionPercentage', e.target.value)}
                        className="text-right bg-white"
                        placeholder="15"
                      />
                    </div>
                    <div>
                      <Label htmlFor="minAmount" className="text-right">סכום מינימלי (₪)</Label>
                      <Input
                        id="minAmount"
                        type="number"
                        value={formData.minAmount}
                        onChange={(e) => handleFieldChange('minAmount', e.target.value)}
                        className="text-right bg-white"
                        placeholder="500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxAmount" className="text-right">סכום מקסימלי (₪)</Label>
                      <Input
                        id="maxAmount"
                        type="number"
                        value={formData.maxAmount}
                        onChange={(e) => handleFieldChange('maxAmount', e.target.value)}
                        className="text-right bg-white"
                        placeholder="5000"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.commissionType === 'fixed_monthly' && (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                  <h5 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    עמלה חודשית קבועה
                  </h5>
                  <div>
                    <Label htmlFor="fixedAmount" className="text-right">סכום קבוע לחודש (₪) *</Label>
                    <Input
                      id="fixedAmount"
                      type="number"
                      value={formData.fixedAmount}
                      onChange={(e) => handleFieldChange('fixedAmount', e.target.value)}
                      className="text-right bg-white"
                      placeholder="1000"
                    />
                  </div>
                </div>
              )}

              {formData.commissionType === 'one_time' && (
                <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                  <h5 className="font-semibold text-orange-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    עמלה חד פעמית
                  </h5>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fixedAmount" className="text-right">סכום עמלה חד פעמית (₪) *</Label>
                      <Input
                        id="fixedAmount"
                        type="number"
                        value={formData.fixedAmount}
                        onChange={(e) => handleFieldChange('fixedAmount', e.target.value)}
                        className="text-right bg-white"
                        placeholder="500"
                      />
                    </div>
                    <div className="bg-orange-100 p-3 rounded text-sm text-orange-800">
                      <strong>שימו לב:</strong> עמלה חד פעמית משולמת פעם אחת בלבד ואין תשלומים נוספים.
                      התשלום יבוצע לפי תנאי התשלום שנבחרו בקטגוריה הבאה.
                    </div>
                  </div>
                </div>
              )}

              {formData.commissionType === 'mixed' && (
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                  <h5 className="font-semibold text-indigo-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-indigo-600" />
                    עמלה מעורבת
                  </h5>
                  <div className="space-y-6">
                    <h5 className="font-medium text-right text-blue-700">שלב 1: תשלום התחלתי</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-right">סוג התשלום ההתחלתי</Label>
                        <Select value={formData.mixedInitialType} onValueChange={(value) => handleFieldChange('mixedInitialType', value)}>
          <SelectTrigger className="text-right">
                            <SelectValue />
          </SelectTrigger>
          <SelectContent>
                            <SelectItem value="fixed">סכום קבוע</SelectItem>
                            <SelectItem value="percentage">אחוז מההכנסות</SelectItem>
          </SelectContent>
        </Select>
      </div>

                      {formData.mixedInitialType === 'fixed' ? (
                        <div>
                          <Label htmlFor="mixedInitialAmount" className="text-right">סכום התחלתי *</Label>
                          <Input
                            id="mixedInitialAmount"
                            type="number"
                            value={formData.mixedInitialAmount}
                            onChange={(e) => handleFieldChange('mixedInitialAmount', e.target.value)}
                            className="text-right"
                            placeholder="500"
                          />
                        </div>
                      ) : (
                        <div>
                          <Label htmlFor="mixedInitialPercentage" className="text-right">אחוז התחלתי (%) *</Label>
                          <Input
                            id="mixedInitialPercentage"
                            type="number"
                            value={formData.mixedInitialPercentage}
                            onChange={(e) => handleFieldChange('mixedInitialPercentage', e.target.value)}
                            className="text-right"
                            placeholder="10"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* שלב 2: עמלה מתמשכת */}
                  <div className="space-y-4">
                    <h5 className="font-medium text-right text-blue-700">שלב 2: עמלה מתמשכת</h5>
                    <div>
                      <Label className="text-right">מבנה העמלה המתמשכת</Label>
                      <Select value={formData.mixedOngoingStructure} onValueChange={(value) => handleFieldChange('mixedOngoingStructure', value)}>
                        <SelectTrigger className="text-right">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">סכום קבוע חודשי</SelectItem>
                          <SelectItem value="percentage">אחוז מההכנסות</SelectItem>
                          <SelectItem value="tiered">עמלות מדורגות</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.mixedOngoingStructure === 'fixed' && (
                      <div>
                        <Label htmlFor="mixedOngoingAmount" className="text-right">סכום חודשי קבוע *</Label>
                        <Input
                          id="mixedOngoingAmount"
                          type="number"
                          value={formData.mixedOngoingAmount}
                          onChange={(e) => handleFieldChange('mixedOngoingAmount', e.target.value)}
                          className="text-right"
                          placeholder="200"
                        />
                      </div>
                    )}

                    {formData.mixedOngoingStructure === 'percentage' && (
                      <div>
                        <Label htmlFor="mixedOngoingPercentage" className="text-right">אחוז חודשי *</Label>
                        <Input
                          id="mixedOngoingPercentage"
                          type="number"
                          value={formData.mixedOngoingPercentage}
                          onChange={(e) => handleFieldChange('mixedOngoingPercentage', e.target.value)}
                          className="text-right"
                          placeholder="15"
                        />
                      </div>
                    )}

                    {formData.mixedOngoingStructure === 'tiered' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h6 className="font-medium text-right">דרגות עמלה מתמשכת</h6>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={addTieredCommission}
                          >
                            <Plus className="h-4 w-4 ml-2" />
                            הוסף דרגה
                          </Button>
                        </div>
                        
                        {formData.tieredCommissions.map((tier, index) => (
                          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 bg-white rounded border">
                            <div>
                              <Label className="text-right text-sm">מינימום (₪)</Label>
                              <Input
                                type="number"
                                value={tier.minSales}
                                onChange={(e) => updateTieredCommission(index, 'minSales', Number(e.target.value))}
                                className="text-right"
                                placeholder="0"
                              />
                            </div>
                            <div>
                              <Label className="text-right text-sm">מקסימום (₪)</Label>
                              <Input
                                type="number"
                                value={tier.maxSales}
                                onChange={(e) => updateTieredCommission(index, 'maxSales', Number(e.target.value))}
                                className="text-right"
                                placeholder="∞"
                              />
                            </div>
                            <div>
                              <Label className="text-right text-sm">אחוז (%)</Label>
                              <Input
                                type="number"
                                value={tier.percentage}
                                onChange={(e) => updateTieredCommission(index, 'percentage', Number(e.target.value))}
                                className="text-right"
                                placeholder="10"
                              />
                            </div>
                            <div className="flex items-end">
                              <Button 
                                type="button"
                                variant="outline" 
                                size="sm"
                                onClick={() => removeTieredCommission(index)}
                                disabled={formData.tieredCommissions.length === 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {formData.commissionType === 'user_based' && (
                <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                  <h5 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    עמלה לפי משתמשים
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="userThreshold" className="text-right">מס' משתמשים מינימלי *</Label>
                      <Input
                        id="userThreshold"
                        type="number"
                        value={formData.userThreshold}
                        onChange={(e) => handleFieldChange('userThreshold', e.target.value)}
                        className="text-right bg-white"
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="commissionPercentage" className="text-right">אחוז עמלה (%) *</Label>
                      <Input
                        id="commissionPercentage"
                        type="number"
                        value={formData.commissionPercentage}
                        onChange={(e) => handleFieldChange('commissionPercentage', e.target.value)}
                        className="text-right bg-white"
                        placeholder="20"
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.commissionType === 'tiered' && (
                <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-right">עמלות מדורגות</h4>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={addTieredCommission}
                    >
                      <Plus className="h-4 w-4 ml-2" />
                      הוסף דרגה
                    </Button>
                  </div>
                  
                  {formData.tieredCommissions.map((tier, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 bg-white rounded border">
                      <div>
                        <Label className="text-right text-sm">מכירות מינימליות (₪)</Label>
                        <Input
                          type="number"
                          value={tier.minSales}
                          onChange={(e) => updateTieredCommission(index, 'minSales', Number(e.target.value))}
                          className="text-right"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label className="text-right text-sm">מכירות מקסימליות (₪)</Label>
                        <Input
                          type="number"
                          value={tier.maxSales}
                          onChange={(e) => updateTieredCommission(index, 'maxSales', Number(e.target.value))}
                          className="text-right"
                          placeholder="∞"
                        />
                      </div>
                      <div>
                        <Label className="text-right text-sm">אחוז עמלה (%)</Label>
                        <Input
                          type="number"
                          value={tier.percentage}
                          onChange={(e) => updateTieredCommission(index, 'percentage', Number(e.target.value))}
                          className="text-right"
                          placeholder="10"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm"
                          onClick={() => removeTieredCommission(index)}
                          disabled={formData.tieredCommissions.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <p className="text-sm text-gray-600 text-right">
                    דרגי העמלה יובאו בחשבון לפי סדר הופעה. העמלה תחושב על כל טווח מכירות בנפרד.
                  </p>
                </div>
              )}

              {formData.commissionType === 'yearly_12_split' && (
                <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
                  <h5 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    מנוי שנתי (חלוקה ל-12 חודשים)
                  </h5>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-right">סכום העמלה השנתית הכולל (₪)</Label>
                        <Input
                          type="number"
                          value={formData.yearlyTotalCommission}
                          onChange={(e) => {
                            const total = parseFloat(e.target.value) || 0;
                            const monthly = total / 12;
                            handleFieldChange('yearlyTotalCommission', e.target.value);
                            handleFieldChange('yearlyMonthlyCommission', monthly.toFixed(2));
                          }}
                          className="text-right bg-white"
                          placeholder="2400"
                        />
                        <p className="text-xs text-gray-600 text-right mt-1">
                          סכום העמלה השנתית הכולל
                        </p>
                      </div>
                      <div>
                        <Label className="text-right">סכום העמלה החודשית (₪)</Label>
                        <Input
                          type="number"
                          value={formData.yearlyMonthlyCommission}
                          readOnly
                          className="text-right bg-gray-100"
                          placeholder="200"
                        />
                        <p className="text-xs text-gray-600 text-right mt-1">
                          מחושב אוטומטית (1/12 מהסכום השנתי)
                        </p>
                      </div>
                    </div>

                    <div className="bg-purple-100 p-3 rounded text-sm text-purple-800">
                      <strong>מידע:</strong> העמלה השנתית תחולק ל-12 תשלומים חודשיים שווים.
                    </div>
                  </div>
                </div>
              )}

              {/* הגדרות תשלום */}
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  הגדרות תשלום
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <Label className="text-right font-medium">תשלום עבור מנוי בסיסי</Label>
                    <Switch
                      checked={formData.paymentForBasicSubscription || false}
                      onCheckedChange={(checked) => handleFieldChange('paymentForBasicSubscription', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <Label className="text-right font-medium">תשלום עבור תוספות</Label>
                    <Switch
                      checked={formData.paymentForAddons || false}
                      onCheckedChange={(checked) => handleFieldChange('paymentForAddons', checked)}
                    />
                  </div>

                  {/* הגדרות מע"מ */}
                  <div className="flex items-center justify-between gap-4 p-3 bg-white rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="commissionIncludesVAT"
                          checked={formData.commissionIncludesVAT || false}
                          onCheckedChange={(checked) => handleFieldChange('commissionIncludesVAT', checked)}
                        />
                        <Label htmlFor="commissionIncludesVAT" className="text-sm font-medium">
                          כולל מעמ
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="paymentBeforeVAT"
                          checked={formData.paymentBeforeVAT || false}
                          onCheckedChange={(checked) => handleFieldChange('paymentBeforeVAT', checked)}
                        />
                        <Label htmlFor="paymentBeforeVAT" className="text-sm font-medium">
                          לפני מעמ
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* תוספות מותאמות אישית */}
              <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                <h5 className="font-semibold text-orange-800 mb-4 flex items-center gap-2">
                  <Plus className="h-5 w-5 text-orange-600" />
                  תוספות מותאמות אישית
                </h5>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* עמלה בסכום קבוע */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <Label className="text-sm font-medium text-green-700">עמלה בסכום קבוע (₪)</Label>
                      </div>
                      
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <Label className="text-xs text-gray-600">שם התוספת</Label>
                            <Input 
                              placeholder="לדוגמה: 100 לידים+"
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600">מחיר התוספת (₪)</Label>
                            <Input 
                              placeholder="49"
                              type="number"
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600">עמלה קבועה (₪)</Label>
                            <Input 
                              placeholder="10"
                              type="number"
                              className="text-sm"
                            />
                          </div>
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 ml-1" />
                          מחק
                        </Button>
                      </div>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full border-dashed border-green-300 text-green-600 hover:bg-green-50"
                      >
                        <Plus className="w-4 h-4 ml-2" />
                        הוסף עמלה קבועה
                      </Button>
                    </div>

                    {/* עמלה באחוזים */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <Label className="text-sm font-medium text-blue-700">עמלה באחוזים (%)</Label>
                      </div>
                      
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <Label className="text-xs text-gray-600">שם התוספת</Label>
                            <Input 
                              placeholder="לדוגמה: תמיכה טלפונית"
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600">מחיר התוספת (₪)</Label>
                            <Input 
                              placeholder="79"
                              type="number"
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-600">אחוז עמלה (%)</Label>
                            <Input 
                              placeholder="20"
                              type="number"
                              className="text-sm"
                            />
                          </div>
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 ml-1" />
                          מחק
                        </Button>
                      </div>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full border-dashed border-blue-300 text-blue-600 hover:bg-blue-50"
                      >
                        <Plus className="w-4 h-4 ml-2" />
                        הוסף עמלה באחוזים
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h6 className="font-medium text-orange-800 mb-2">הסבר:</h6>
                    <p className="text-sm text-orange-700">
                      ניתן להוסיף תוספות שירותים עם עמלה קבועה (₪) או עמלה באחוזים (%). 
                      כל תוספת תקבל את העמלה המוגדרת שלה בהתאם לסוג העמלה שנבחר.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}



        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <div>
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowRight className="h-4 w-4 ml-2" />
                הקודם
              </Button>
            )}
          </div>
          
          <div className="flex gap-3">
        <Button variant="outline" onClick={onClose}>
          ביטול
        </Button>
        <Button 
          variant="outline" 
          onClick={() => generateNewPartnerExcel()}
          className="text-green-600 hover:text-green-700"
        >
          <Download className="h-4 w-4 mr-2" />
          ייצוא Excel
        </Button>
            {currentStep < 3 ? (
              <Button onClick={handleNext}>
                הבא
                <ArrowLeft className="h-4 w-4 mr-2" />
              </Button>
            ) : (
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
          שמור שותף
        </Button>
            )}
          </div>
        </div>
      </div>
    </div>
    
    {/* SignaturePad Modal */}
    {showSignaturePad && (
      <SignaturePad 
        onComplete={handleSignatureComplete}
        onCancel={() => setShowSignaturePad(false)}
      />
    )}
    </>
  );
};

// SignaturePad Component
interface SignaturePadProps {
  onComplete: (signature: string) => void;
  onCancel: () => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onComplete, onCancel }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const signature = canvas.toDataURL();
    onComplete(signature);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-center mb-4">חתימה דיגיטלית</h3>
        
        <div className="border border-gray-300 rounded-lg mb-4">
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            className="w-full h-48 cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>

        <div className="flex gap-2 justify-center">
          <Button variant="outline" onClick={handleClear}>
            נקה
          </Button>
          <Button variant="outline" onClick={onCancel}>
            ביטול
          </Button>
          <Button onClick={handleSave}>
            שמור חתימה
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PartnersManagement;
