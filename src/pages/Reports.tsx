import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  FileSpreadsheet,
  Download,
  Filter,
  Settings
} from 'lucide-react';
import AdvancedReportGenerator from '@/components/reports/AdvancedReportGenerator';
import * as XLSX from 'xlsx';

// Mock data for partners
const mockPartnersData = [
  {
    id: '1',
    name: 'יוסי כהן',
    email: 'yossi@example.com',
    phone: '050-1234567',
    status: 'active',
    joinDate: '2024-01-15',
    totalLeads: 45,
    totalSales: 12,
    totalEarnings: 3500,
    monthlyEarnings: 1200,
    commissionPercentage: 15,
    conversionRate: 26.7,
    lastActivity: '2024-10-20',
    region: 'מרכז',
    source: 'המלצה'
  },
  {
    id: '2',
    name: 'שרה לוי',
    email: 'sara@example.com',
    phone: '052-9876543',
    status: 'active',
    joinDate: '2024-02-20',
    totalLeads: 38,
    totalSales: 8,
    totalEarnings: 2800,
    monthlyEarnings: 950,
    commissionPercentage: 12,
    conversionRate: 21.1,
    lastActivity: '2024-10-19',
    region: 'צפון',
    source: 'פייסבוק'
  },
  {
    id: '3',
    name: 'דוד ישראלי',
    email: 'david@example.com',
    phone: '054-5555555',
    status: 'inactive',
    joinDate: '2024-03-10',
    totalLeads: 22,
    totalSales: 3,
    totalEarnings: 1200,
    monthlyEarnings: 0,
    commissionPercentage: 10,
    conversionRate: 13.6,
    lastActivity: '2024-09-15',
    region: 'דרום',
    source: 'גוגל'
  },
  {
    id: '4',
    name: 'מיכל רוזן',
    email: 'michal@example.com',
    phone: '053-7777777',
    status: 'active',
    joinDate: '2024-04-05',
    totalLeads: 67,
    totalSales: 18,
    totalEarnings: 5200,
    monthlyEarnings: 1800,
    commissionPercentage: 18,
    conversionRate: 26.9,
    lastActivity: '2024-10-21',
    region: 'מרכז',
    source: 'לינקדאין'
  },
  {
    id: '5',
    name: 'אבי גולד',
    email: 'avi@example.com',
    phone: '050-8888888',
    status: 'pending',
    joinDate: '2024-09-01',
    totalLeads: 15,
    totalSales: 2,
    totalEarnings: 600,
    monthlyEarnings: 300,
    commissionPercentage: 8,
    conversionRate: 13.3,
    lastActivity: '2024-10-18',
    region: 'ירושלים',
    source: 'המלצה'
  }
];

// Column definitions for partners report
const partnersColumns = [
  { key: 'name', label: 'שם השותף', type: 'text', visible: true, sortable: true, filterable: true },
  { key: 'email', label: 'אימייל', type: 'text', visible: true, sortable: true, filterable: true },
  { key: 'phone', label: 'טלפון', type: 'text', visible: true, sortable: true, filterable: true },
  { key: 'status', label: 'סטטוס', type: 'status', visible: true, sortable: true, filterable: true },
  { key: 'joinDate', label: 'תאריך הצטרפות', type: 'date', visible: true, sortable: true, filterable: true },
  { key: 'totalLeads', label: 'סך לידים', type: 'number', visible: true, sortable: true, filterable: true },
  { key: 'totalSales', label: 'סך מכירות', type: 'number', visible: true, sortable: true, filterable: true },
  { key: 'totalEarnings', label: 'סך עמלות', type: 'currency', visible: true, sortable: true, filterable: true },
  { key: 'monthlyEarnings', label: 'עמלות חודשיות', type: 'currency', visible: true, sortable: true, filterable: true },
  { key: 'commissionPercentage', label: 'אחוז עמלה', type: 'number', visible: true, sortable: true, filterable: true },
  { key: 'conversionRate', label: 'אחוז המרה', type: 'number', visible: true, sortable: true, filterable: true },
  { key: 'lastActivity', label: 'פעילות אחרונה', type: 'date', visible: true, sortable: true, filterable: true },
  { key: 'region', label: 'אזור', type: 'text', visible: true, sortable: true, filterable: true },
  { key: 'source', label: 'מקור', type: 'text', visible: true, sortable: true, filterable: true }
];

const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('partners');
  const [isLoading, setIsLoading] = useState(false);

  // Handle Excel export
  const handleExportToExcel = async (data: any[], config: any) => {
    setIsLoading(true);
    
    try {
      // Create workbook
      const workbook = XLSX.utils.book_new();
      
      // Prepare data for export
      const exportData = data.map(item => {
        const exportItem: any = {};
        partnersColumns.forEach(col => {
          if (config.visibleColumns.includes(col.key)) {
            switch (col.type) {
              case 'currency':
                exportItem[col.label] = Number(item[col.key]);
                break;
              case 'date':
                exportItem[col.label] = new Date(item[col.key]).toLocaleDateString('he-IL');
                break;
              case 'status':
                exportItem[col.label] = item[col.key] === 'active' ? 'פעיל' : 
                                      item[col.key] === 'inactive' ? 'לא פעיל' : 'ממתין';
                break;
              default:
                exportItem[col.label] = item[col.key];
            }
          }
        });
        return exportItem;
      });

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      
      // Set column widths
      const columnWidths = partnersColumns
        .filter(col => config.visibleColumns.includes(col.key))
        .map(() => ({ wch: 15 }));
      worksheet['!cols'] = columnWidths;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'דוח שותפים');

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `דוח_שותפים_${timestamp}.xlsx`;

      // Save file
      XLSX.writeFile(workbook, filename);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate summary statistics
  const totalPartners = mockPartnersData.length;
  const activePartners = mockPartnersData.filter(p => p.status === 'active').length;
  const totalEarnings = mockPartnersData.reduce((sum, p) => sum + p.totalEarnings, 0);
  const monthlyEarnings = mockPartnersData.reduce((sum, p) => sum + p.monthlyEarnings, 0);
  const totalLeads = mockPartnersData.reduce((sum, p) => sum + p.totalLeads, 0);
  const totalSales = mockPartnersData.reduce((sum, p) => sum + p.totalSales, 0);
  const avgConversionRate = mockPartnersData.reduce((sum, p) => sum + p.conversionRate, 0) / totalPartners;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-right">מחולל דוחות מתקדם</h1>
          <p className="text-gray-600 text-right mt-2">
            ניתוח מערכות מתקדם לבניית דוחות מקצועיים
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            <BarChart3 className="h-3 w-3 ml-1" />
            מערכת דוחות מתקדמת
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 text-right">סך השותפים</p>
                <p className="text-2xl font-bold text-right">{totalPartners}</p>
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
                <p className="text-2xl font-bold text-right">{activePartners}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 text-right">סך עמלות</p>
                <p className="text-2xl font-bold text-right">₪{totalEarnings.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 text-right">עמלות חודשיות</p>
                <p className="text-2xl font-bold text-right">₪{monthlyEarnings.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="partners" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            דוח שותפים
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            דוח ביצועים
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            דוח כספי
          </TabsTrigger>
        </TabsList>

        <TabsContent value="partners" className="space-y-6">
          <AdvancedReportGenerator
            data={mockPartnersData}
            columns={partnersColumns}
            title="דוח שותפים מפורט"
            onExport={handleExportToExcel}
          />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-right">דוח ביצועים</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{totalLeads}</p>
                  <p className="text-sm text-gray-600">סך לידים</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{totalSales}</p>
                  <p className="text-sm text-gray-600">סך מכירות</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">{avgConversionRate.toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">אחוז המרה ממוצע</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-right">דוח כספי</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-green-600">₪{totalEarnings.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">סך עמלות מצטברות</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">₪{monthlyEarnings.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">עמלות חודשיות</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
