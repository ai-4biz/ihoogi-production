import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  DollarSign, 
  FileText, 
  Target,
  Globe,
  CreditCard,
  Building,
  Calendar,
  Download,
  Eye,
  Filter,
  AlertCircle,
  Zap
} from 'lucide-react';

interface SmartReportsSystemProps {
  partners: any[];
  onExport?: (data: any[], reportType: string) => void;
}

interface ReportTemplate {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<any>;
  description: string;
  columns: Array<{
    key: string;
    label: string;
    type: 'text' | 'number' | 'currency' | 'date' | 'status' | 'percentage';
    visible: boolean;
    sortable: boolean;
    filterable: boolean;
  }>;
  filters: string[];
  color: string;
}

const SmartReportsSystem: React.FC<SmartReportsSystemProps> = ({ partners, onExport }) => {
  const [selectedReport, setSelectedReport] = useState<string>('');

  // הגדרת כל סוגי הדוחות החדשים
  const reportTemplates: ReportTemplate[] = [
    // 💰 קטגוריה: כספי (תשלומים ועמלות)
    {
      id: 'payouts-executed',
      name: 'דוח תשלומים שבוצעו',
      category: 'כספי',
      icon: CreditCard,
      description: 'ניהול ומעקב אחר תשלומים לשותפים',
      color: 'blue',
      columns: [
        { key: 'paymentId', label: 'מזהה תשלום', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'partnerName', label: 'שם שותף', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'affiliateId', label: 'מזהה שותף', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'amount', label: 'סכום לתשלום', type: 'currency', visible: true, sortable: true, filterable: true },
        { key: 'currency', label: 'מטבע', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'eligibilityDate', label: 'תאריך זכאות', type: 'date', visible: true, sortable: true, filterable: true },
        { key: 'actualPaymentDate', label: 'תאריך תשלום בפועל', type: 'date', visible: true, sortable: true, filterable: true },
        { key: 'paymentStatus', label: 'סטטוס תשלום', type: 'status', visible: true, sortable: true, filterable: true },
        { key: 'managerNote', label: 'הערת מנהל', type: 'text', visible: true, sortable: false, filterable: true },
        { key: 'receiptFile', label: 'קובץ אסמכתא', type: 'text', visible: true, sortable: false, filterable: false }
      ],
      filters: ['paymentStatus', 'currency', 'actualPaymentDate']
    },
    {
      id: 'bank-export-israel',
      name: 'דוח יצוא לבנק ישראלי',
      category: 'כספי',
      icon: Building,
      description: 'הפקת קובץ להעברת תשלומים לבנקים בישראל',
      color: 'emerald',
      columns: [
        { key: 'accountHolderName', label: 'שם בעל חשבון', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'bankCode', label: 'קוד בנק', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'branchNumber', label: 'מספר סניף', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'accountNumber', label: 'מספר חשבון', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'transferAmount', label: 'סכום להעברה', type: 'currency', visible: true, sortable: true, filterable: true },
        { key: 'currency', label: 'מטבע', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'plannedPaymentDate', label: 'תאריך תשלום מתוכנן', type: 'date', visible: true, sortable: true, filterable: true },
        { key: 'paymentDescription', label: 'תיאור תשלום', type: 'text', visible: true, sortable: false, filterable: true },
        { key: 'paymentId', label: 'מזהה תשלום', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'affiliateId', label: 'מזהה שותף', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'exportStatus', label: 'סטטוס ייצוא', type: 'status', visible: true, sortable: true, filterable: true },
        { key: 'exportDate', label: 'תאריך יצוא', type: 'date', visible: true, sortable: true, filterable: true }
      ],
      filters: ['exportStatus', 'currency', 'exportDate']
    },
    {
      id: 'bank-export-international',
      name: 'דוח יצוא תשלומים בינלאומיים',
      category: 'כספי',
      icon: Globe,
      description: 'העברת תשלומים לשותפים בחו״ל',
      color: 'purple',
      columns: [
        { key: 'accountHolderName', label: 'שם בעל החשבון', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'bankCountry', label: 'מדינת בנק', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'bankName', label: 'שם הבנק', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'swiftBicCode', label: 'קוד SWIFT / BIC', type: 'text', visible: true, sortable: false, filterable: true },
        { key: 'ibanNumber', label: 'מספר IBAN', type: 'text', visible: true, sortable: false, filterable: true },
        { key: 'bankAddress', label: 'כתובת בנק', type: 'text', visible: true, sortable: false, filterable: true },
        { key: 'transferAmount', label: 'סכום להעברה', type: 'currency', visible: true, sortable: true, filterable: true },
        { key: 'currency', label: 'סוג מטבע', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'paymentDate', label: 'תאריך תשלום', type: 'date', visible: true, sortable: true, filterable: true },
        { key: 'paymentDescription', label: 'תיאור תשלום', type: 'text', visible: true, sortable: false, filterable: true },
        { key: 'paymentId', label: 'מזהה תשלום', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'affiliateId', label: 'מזהה שותף', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'paymentStatus', label: 'סטטוס תשלום', type: 'status', visible: true, sortable: true, filterable: true },
        { key: 'exportDate', label: 'תאריך יצוא', type: 'date', visible: true, sortable: true, filterable: true }
      ],
      filters: ['currency', 'paymentStatus', 'bankCountry', 'exportDate']
    },
    {
      id: 'monthly-summary',
      name: 'דוח עמלות מצטבר',
      category: 'כספי',
      icon: Calendar,
      description: 'שקיפות חודשית לשותף על פעילותו',
      color: 'orange',
      columns: [
        { key: 'month', label: 'חודש', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'totalTransactions', label: 'סך עסקאות שבוצעו', type: 'number', visible: true, sortable: true, filterable: true },
        { key: 'totalSalesAmount', label: 'סכום כולל של מכירות', type: 'currency', visible: true, sortable: true, filterable: true },
        { key: 'totalCommissions', label: 'סך עמלות (נטו)', type: 'currency', visible: true, sortable: true, filterable: true },
        { key: 'averagePerTransaction', label: 'ממוצע לעסקה', type: 'currency', visible: true, sortable: true, filterable: true },
        { key: 'changeFromPreviousMonth', label: 'אחוז שינוי מחודש קודם', type: 'percentage', visible: true, sortable: true, filterable: true },
        { key: 'paymentStatus', label: 'סטטוס תשלום', type: 'status', visible: true, sortable: true, filterable: true }
      ],
      filters: ['month', 'paymentStatus']
    },

    // 📈 קטגוריה: שיווקית (פעילות וניתוח ביצועים)
    {
      id: 'leads-by-partner',
      name: 'דוח לידים לפי שותף',
      category: 'שיווקית',
      icon: Users,
      description: 'מעקב אחרי הלידים שכל שותף הביא',
      color: 'blue',
      columns: [
        { key: 'partnerName', label: 'שם שותף', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'affiliateId', label: 'מזהה שותף', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'totalLeads', label: 'סה״כ לידים', type: 'number', visible: true, sortable: true, filterable: true },
        { key: 'openLeads', label: 'לידים פתוחים', type: 'number', visible: true, sortable: true, filterable: true },
        { key: 'convertedLeads', label: 'לידים שהומרו ללקוחות', type: 'number', visible: true, sortable: true, filterable: true },
        { key: 'abandonedLeads', label: 'לידים שננטשו', type: 'number', visible: true, sortable: true, filterable: true },
        { key: 'conversionRate', label: 'אחוז המרה (%)', type: 'percentage', visible: true, sortable: true, filterable: true },
        { key: 'lastUpdate', label: 'תאריך עדכון אחרון', type: 'date', visible: true, sortable: true, filterable: true }
      ],
      filters: ['conversionRate', 'lastUpdate']
    },
    {
      id: 'conversion-report',
      name: 'דוח המרות',
      category: 'שיווקית',
      icon: TrendingUp,
      description: 'מדידת יעילות הקמפיינים והשותפים',
      color: 'green',
      columns: [
        { key: 'partnerName', label: 'שם שותף', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'affiliateId', label: 'מזהה שותף', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'period', label: 'תקופה', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'leadsCount', label: 'מספר לידים', type: 'number', visible: true, sortable: true, filterable: true },
        { key: 'paidTransactions', label: 'מספר עסקאות בתשלום', type: 'number', visible: true, sortable: true, filterable: true },
        { key: 'conversionRate', label: 'אחוז המרה (%)', type: 'percentage', visible: true, sortable: true, filterable: true },
        { key: 'totalCommissions', label: 'סך עמלות שנוצרו', type: 'currency', visible: true, sortable: true, filterable: true },
        { key: 'changeFromPreviousMonth', label: 'אחוז שינוי מהחודש הקודם', type: 'percentage', visible: true, sortable: true, filterable: true }
      ],
      filters: ['period', 'conversionRate']
    },
    {
      id: 'tracking-links-report',
      name: 'דוח לינקים ייחודיים',
      category: 'שיווקית',
      icon: Globe,
      description: 'מעקב אחר קליקים והמרות לפי לינקים',
      color: 'purple',
      columns: [
        { key: 'affiliateId', label: 'מזהה שותף', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'linkName', label: 'שם לינק / תיאור קמפיין', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'linkUrl', label: 'כתובת לינק (URL)', type: 'text', visible: true, sortable: false, filterable: true },
        { key: 'clicksCount', label: 'מספר קליקים', type: 'number', visible: true, sortable: true, filterable: true },
        { key: 'leadsCount', label: 'מספר לידים', type: 'number', visible: true, sortable: true, filterable: true },
        { key: 'paidTransactions', label: 'מספר עסקאות בתשלום', type: 'number', visible: true, sortable: true, filterable: true },
        { key: 'linkConversionRate', label: 'אחוז המרה ללינק', type: 'percentage', visible: true, sortable: true, filterable: true },
        { key: 'lastUpdate', label: 'תאריך עדכון אחרון', type: 'date', visible: true, sortable: true, filterable: true }
      ],
      filters: ['linkConversionRate', 'lastUpdate', 'affiliateId']
    },
    {
      id: 'marketing-performance',
      name: 'דוח ביצועים שיווקיים',
      category: 'שיווקית',
      icon: BarChart3,
      description: 'ניתוח כולל של כל ערוצי השיווק',
      color: 'cyan',
      columns: [
        { key: 'marketingChannel', label: 'ערוץ שיווק', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'totalVisits', label: 'סך כניסות', type: 'number', visible: true, sortable: true, filterable: true },
        { key: 'leadsReceived', label: 'לידים שהתקבלו', type: 'number', visible: true, sortable: true, filterable: true },
        { key: 'conversionRate', label: 'אחוז המרות', type: 'percentage', visible: true, sortable: true, filterable: true },
        { key: 'totalRevenue', label: 'הכנסה כוללת', type: 'currency', visible: true, sortable: true, filterable: true },
        { key: 'averageCostPerLead', label: 'עלות ממוצעת לליד', type: 'currency', visible: true, sortable: true, filterable: true },
        { key: 'roi', label: 'ROI (החזר השקעה %)', type: 'percentage', visible: true, sortable: true, filterable: true }
      ],
      filters: ['marketingChannel', 'conversionRate', 'roi']
    },

    // 👥 קטגוריה: ניהולית (שותפים ופעולות מערכת)
    {
      id: 'partners-leaderboard',
      name: 'דוח דירוג שותפים',
      category: 'ניהולית',
      icon: Target,
      description: 'לעודד תחרות ולתת שקיפות לשותפים',
      color: 'gold',
      columns: [
        { key: 'rank', label: 'מקום בדירוג', type: 'number', visible: true, sortable: true, filterable: true },
        { key: 'partnerName', label: 'שם שותף', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'totalSales', label: 'סך מכירות', type: 'currency', visible: true, sortable: true, filterable: true },
        { key: 'totalCommissions', label: 'סך עמלות', type: 'currency', visible: true, sortable: true, filterable: true },
        { key: 'conversionRate', label: 'אחוז המרה', type: 'percentage', visible: true, sortable: true, filterable: true },
        { key: 'period', label: 'חודש / תקופה', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'rankChange', label: 'שינוי ממקום קודם', type: 'text', visible: true, sortable: false, filterable: true }
      ],
      filters: ['period', 'rank']
    },
    {
      id: 'audit-log',
      name: 'דוח לוג פעולות',
      category: 'ניהולית',
      icon: AlertCircle,
      description: 'תיעוד מלא של פעולות ניהול ותשלומים',
      color: 'red',
      columns: [
        { key: 'actionDate', label: 'תאריך פעולה', type: 'date', visible: true, sortable: true, filterable: true },
        { key: 'userName', label: 'שם המשתמש שביצע', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'actionType', label: 'סוג פעולה', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'objectId', label: 'מזהה אובייקט', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'actionDetails', label: 'פירוט הפעולה', type: 'text', visible: true, sortable: false, filterable: true },
        { key: 'result', label: 'תוצאה', type: 'status', visible: true, sortable: true, filterable: true }
      ],
      filters: ['actionType', 'result', 'actionDate', 'userName']
    },

    // 💬 קטגוריה: תקשורת ותמיכה
    {
      id: 'support-requests',
      name: 'דוח פניות שותפים',
      category: 'תמיכה',
      icon: AlertCircle,
      description: 'מעקב אחרי פניות לתמיכה',
      color: 'orange',
      columns: [
        { key: 'partnerName', label: 'שם שותף', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'requestDate', label: 'תאריך פניה', type: 'date', visible: true, sortable: true, filterable: true },
        { key: 'requestSubject', label: 'נושא פניה', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'supportStatus', label: 'סטטוס טיפול', type: 'status', visible: true, sortable: true, filterable: true },
        { key: 'closureDate', label: 'תאריך סגירה', type: 'date', visible: true, sortable: true, filterable: true },
        { key: 'supportNote', label: 'הערת תמיכה', type: 'text', visible: true, sortable: false, filterable: true }
      ],
      filters: ['supportStatus', 'requestDate', 'requestSubject']
    },
    {
      id: 'notifications-log',
      name: 'דוח הודעות ותזכורות',
      category: 'תמיכה',
      icon: Zap,
      description: 'מעקב אחרי הודעות שנשלחו אוטומטית לשותפים',
      color: 'purple',
      columns: [
        { key: 'sendDate', label: 'תאריך שליחה', type: 'date', visible: true, sortable: true, filterable: true },
        { key: 'recipient', label: 'שם שותף / כתובת מייל', type: 'text', visible: true, sortable: false, filterable: true },
        { key: 'messageType', label: 'סוג הודעה', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'messageSubject', label: 'נושא ההודעה', type: 'text', visible: true, sortable: true, filterable: true },
        { key: 'status', label: 'סטטוס', type: 'status', visible: true, sortable: true, filterable: true },
        { key: 'contentLink', label: 'קישור לתוכן ההודעה', type: 'text', visible: true, sortable: false, filterable: false }
      ],
      filters: ['messageType', 'status', 'sendDate']
    }
  ];

  // קבוצת דוחות לפי קטגוריה
  const reportsByCategory = useMemo(() => {
    const categories = reportTemplates.reduce((acc, report) => {
      if (!acc[report.category]) {
        acc[report.category] = [];
      }
      acc[report.category].push(report);
      return acc;
    }, {} as Record<string, ReportTemplate[]>);

    return categories;
  }, []);

  const currentReport = reportTemplates.find(r => r.id === selectedReport);

  // פונקציה ליצירת נתונים דמו
  const generateMockData = (reportId: string) => {
    const mockData: Record<string, any[]> = {
      'payouts-executed': partners.map((partner, index) => ({
        paymentId: `P-2025-${String(index + 1).padStart(3, '0')}`,
        partnerName: partner.name,
        affiliateId: partner.id,
        amount: Math.floor(Math.random() * 5000) + 500,
        currency: 'ILS',
        eligibilityDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        actualPaymentDate: new Date().toISOString(),
        paymentStatus: ['ממתין', 'אושר', 'שולם', 'נכשל'][Math.floor(Math.random() * 4)],
        managerNote: 'תשלום תקין',
        receiptFile: `receipt_${index + 1}.pdf`
      })),
      'bank-export-israel': partners.map((partner, index) => ({
        accountHolderName: partner.name,
        bankCode: '010',
        branchNumber: '123',
        accountNumber: partner.accountNumber || '123456789',
        transferAmount: Math.floor(Math.random() * 5000) + 500,
        currency: 'ILS',
        plannedPaymentDate: new Date().toISOString(),
        paymentDescription: `עמלת חודש ${new Date().toLocaleDateString('he-IL', { month: 'long' })}`,
        paymentId: `P-2025-${String(index + 1).padStart(3, '0')}`,
        affiliateId: partner.id,
        exportStatus: ['בהכנה', 'נשלח'][Math.floor(Math.random() * 2)],
        exportDate: new Date().toISOString()
      })),
      'bank-export-international': partners.map((partner, index) => ({
        accountHolderName: partner.name,
        bankCountry: 'IL',
        bankName: partner.bankName || 'Bank Leumi',
        swiftBicCode: partner.swiftBicCode || 'LUMIILITXXX',
        ibanNumber: partner.ibanNumber || 'IL620108000000009876543',
        bankAddress: 'Tel Aviv, Israel',
        transferAmount: Math.floor(Math.random() * 5000) + 500,
        currency: 'USD',
        paymentDate: new Date().toISOString(),
        paymentDescription: 'International commission payment',
        paymentId: `P-2025-${String(index + 1).padStart(3, '0')}`,
        affiliateId: partner.id,
        paymentStatus: ['ממתין', 'אושר', 'שולם'][Math.floor(Math.random() * 3)],
        exportDate: new Date().toISOString()
      })),
      'monthly-summary': partners.map((partner, index) => ({
        month: new Date().toLocaleDateString('he-IL', { month: 'long' }),
        totalTransactions: Math.floor(Math.random() * 50) + 5,
        totalSalesAmount: Math.floor(Math.random() * 100000) + 10000,
        totalCommissions: Math.floor(Math.random() * 10000) + 1000,
        averagePerTransaction: Math.floor(Math.random() * 2000) + 200,
        changeFromPreviousMonth: Math.floor(Math.random() * 40) - 20,
        paymentStatus: ['שולם', 'ממתין'][Math.floor(Math.random() * 2)]
      })),
      'leads-by-partner': partners.map((partner, index) => ({
        partnerName: partner.name,
        affiliateId: partner.id,
        totalLeads: Math.floor(Math.random() * 100) + 10,
        openLeads: Math.floor(Math.random() * 20) + 2,
        convertedLeads: Math.floor(Math.random() * 30) + 5,
        abandonedLeads: Math.floor(Math.random() * 10) + 1,
        conversionRate: Math.floor(Math.random() * 30) + 10,
        lastUpdate: new Date().toISOString()
      })),
      'conversion-report': partners.map((partner, index) => ({
        partnerName: partner.name,
        affiliateId: partner.id,
        period: `${new Date().toLocaleDateString('he-IL', { month: 'long' })} 2025`,
        leadsCount: Math.floor(Math.random() * 100) + 10,
        paidTransactions: Math.floor(Math.random() * 30) + 5,
        conversionRate: Math.floor(Math.random() * 30) + 10,
        totalCommissions: Math.floor(Math.random() * 10000) + 1000,
        changeFromPreviousMonth: Math.floor(Math.random() * 40) - 20
      })),
      'tracking-links-report': partners.map((partner, index) => ({
        affiliateId: partner.id,
        linkName: `קמפיין ${index + 1}`,
        linkUrl: `https://hoogi.co/ref/${partner.id}`,
        clicksCount: Math.floor(Math.random() * 1000) + 100,
        leadsCount: Math.floor(Math.random() * 100) + 10,
        paidTransactions: Math.floor(Math.random() * 30) + 5,
        linkConversionRate: Math.floor(Math.random() * 30) + 10,
        lastUpdate: new Date().toISOString()
      })),
      'marketing-performance': [
        { marketingChannel: 'פייסבוק', totalVisits: 5000, leadsReceived: 500, conversionRate: 15, totalRevenue: 50000, averageCostPerLead: 100, roi: 200 },
        { marketingChannel: 'אינסטגרם', totalVisits: 3000, leadsReceived: 300, conversionRate: 12, totalRevenue: 30000, averageCostPerLead: 80, roi: 180 },
        { marketingChannel: 'גוגל', totalVisits: 2000, leadsReceived: 200, conversionRate: 18, totalRevenue: 40000, averageCostPerLead: 120, roi: 250 },
        { marketingChannel: 'וואטסאפ', totalVisits: 1000, leadsReceived: 150, conversionRate: 25, totalRevenue: 25000, averageCostPerLead: 60, roi: 300 }
      ],
      'partners-leaderboard': partners.map((partner, index) => ({
        rank: index + 1,
        partnerName: partner.name,
        totalSales: Math.floor(Math.random() * 100000) + 10000,
        totalCommissions: Math.floor(Math.random() * 10000) + 1000,
        conversionRate: Math.floor(Math.random() * 30) + 10,
        period: `${new Date().toLocaleDateString('he-IL', { month: 'long' })} 2025`,
        rankChange: index === 0 ? '⬆️' : index === 1 ? '⬇️' : '➡️'
      })),
      'audit-log': Array.from({ length: 20 }, (_, i) => ({
        actionDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        userName: 'Rona Arbisman',
        actionType: ['ייצוא', 'אישור תשלום', 'עדכון חשבון'][Math.floor(Math.random() * 3)],
        objectId: `OBJ-${i + 1}`,
        actionDetails: 'פירוט הפעולה',
        result: ['בוצע בהצלחה', 'נכשל'][Math.floor(Math.random() * 2)]
      })),
      'support-requests': Array.from({ length: 10 }, (_, i) => ({
        partnerName: partners[Math.floor(Math.random() * partners.length)]?.name || 'Unknown',
        requestDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        requestSubject: ['בעיית תשלום', 'שאלה טכנית', 'בקשה לעדכון'][Math.floor(Math.random() * 3)],
        supportStatus: ['חדש', 'בטיפול', 'נסגר'][Math.floor(Math.random() * 3)],
        closureDate: Math.random() > 0.5 ? new Date().toISOString() : null,
        supportNote: 'תשובה לשאלה'
      })),
      'notifications-log': Array.from({ length: 15 }, (_, i) => ({
        sendDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        recipient: partners[Math.floor(Math.random() * partners.length)]?.email || 'partner@example.com',
        messageType: ['תשלום', 'עדכון', 'תזכורת'][Math.floor(Math.random() * 3)],
        messageSubject: 'נושא ההודעה',
        status: ['נשלחה', 'נכשלה'][Math.floor(Math.random() * 2)],
        contentLink: `https://notifications.hoogi.co/msg-${i + 1}`
      }))
    };

    return mockData[reportId as keyof typeof mockData] || [];
  };

  const handleExport = () => {
    if (currentReport && onExport) {
      const data = generateMockData(currentReport.id);
      onExport(data, currentReport.name);
    }
  };

  return (
    <div className="space-y-6">
      {/* בחירת קטגוריה - כפתורים בשורה אחת */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">בחר קטגוריית דוחות</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {Object.entries(reportsByCategory).map(([category, reports]) => (
            <Button
              key={category}
              variant={selectedReport && reportTemplates.find(r => r.id === selectedReport)?.category === category ? "default" : "outline"}
              className="flex items-center gap-2"
              onClick={() => {
                // אם הקטגוריה כבר נבחרה, בחר את הדוח הראשון
                const firstReport = reports[0];
                setSelectedReport(firstReport.id);
              }}
            >
              <span className="text-sm font-medium">{category}</span>
              <Badge variant="secondary" className="text-xs">
                {reports.length}
              </Badge>
            </Button>
          ))}
          
          {selectedReport && (
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => setSelectedReport('')}
            >
              <span className="text-sm">נקה בחירה</span>
            </Button>
          )}
        </div>
      </div>

      {/* בחירת דוח ספציפי - כפתורים קטנים */}
      {selectedReport && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Eye className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">בחר דוח ספציפי</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {reportTemplates
              .filter(report => report.category === reportTemplates.find(r => r.id === selectedReport)?.category)
              .map((report) => {
                const IconComponent = report.icon;
                return (
                  <Button
                    key={report.id}
                    variant={selectedReport === report.id ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => setSelectedReport(report.id)}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="text-sm">{report.name}</span>
                  </Button>
                );
              })}
          </div>
        </div>
      )}

      {/* הצגת הדוח */}
      {currentReport && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <currentReport.icon className={`h-6 w-6 text-${currentReport.color}-600`} />
                <CardTitle className="text-xl font-bold">
                  {currentReport.name}
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={handleExport} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  ייצוא לאקסל
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground text-right">
              {currentReport.description}
            </p>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {currentReport.columns
                      .filter(col => col.visible)
                      .map((column) => (
                        <TableHead key={column.key} className="text-right">
                          {column.label}
                        </TableHead>
                      ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generateMockData(currentReport.id).slice(0, 10).map((row, index) => (
                    <TableRow key={index}>
                      {currentReport.columns
                        .filter(col => col.visible)
                        .map((column) => (
                          <TableCell key={column.key} className="text-right">
                            {column.type === 'currency' && row[column.key] 
                              ? `₪${row[column.key].toLocaleString()}`
                              : column.type === 'percentage' && row[column.key]
                              ? `${row[column.key]}%`
                              : column.type === 'date' && row[column.key]
                              ? new Date(row[column.key]).toLocaleDateString('he-IL')
                              : column.type === 'status'
                              ? <Badge variant={row[column.key] === 'שולם' || row[column.key] === 'נשלחה' ? 'default' : 'secondary'}>
                                  {row[column.key]}
                                </Badge>
                              : row[column.key] || '-'
                            }
                          </TableCell>
                        ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-sm text-muted-foreground text-center">
              מציג 10 שורות ראשונות מתוך {generateMockData(currentReport.id).length} שורות
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartReportsSystem;