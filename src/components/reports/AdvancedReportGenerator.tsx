import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DatePickerWithRange } from './DatePickerWithRange';
import { 
  Search, 
  Filter, 
  ChevronUp, 
  ChevronDown,
  FileSpreadsheet,
  Loader2
} from 'lucide-react';

interface ReportColumn {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'currency' | 'status' | 'boolean';
  visible: boolean;
  sortable: boolean;
  filterable: boolean;
}

interface FilterConfig {
  column: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between' | 'in' | 'not_in';
  value: any;
  label: string;
}

interface SortConfig {
  column: string;
  direction: 'asc' | 'desc';
}

interface SavedConfiguration {
  id: string;
  name: string;
  filters: FilterConfig[];
  visibleColumns: string[];
  sortConfig: SortConfig;
  createdAt: Date;
}

interface AdvancedReportGeneratorProps {
  data: any[];
  columns: ReportColumn[];
  title: string;
  onExport?: (filteredData: any[], config: any) => void;
}

const AdvancedReportGenerator: React.FC<AdvancedReportGeneratorProps> = ({
  data,
  columns,
  title,
  onExport
}) => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.filter(col => col.visible).map(col => col.key)
  );
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: undefined,
    to: undefined
  });

  // Filtered and sorted data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchTerm) {
      result = result.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply date range filter
    if (dateRange.from && dateRange.to) {
      result = result.filter(item => {
        const itemDate = new Date(item.date || item.createdAt || item.joinDate);
        return itemDate >= dateRange.from! && itemDate <= dateRange.to!;
      });
    }

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.column];
        const bValue = b[sortConfig.column];
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();
        
        if (sortConfig.direction === 'asc') {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
    }

    return result;
  }, [data, searchTerm, sortConfig, dateRange]);

  // Handle column sorting
  const handleSort = useCallback((columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    setSortConfig(prev => {
      if (prev?.column === columnKey) {
        return prev.direction === 'asc' 
          ? { column: columnKey, direction: 'desc' }
          : null;
      }
      return { column: columnKey, direction: 'asc' };
    });
  }, [columns]);

  // Handle column visibility
  const toggleColumnVisibility = useCallback((columnKey: string) => {
    setVisibleColumns(prev => 
      prev.includes(columnKey)
        ? prev.filter(key => key !== columnKey)
        : [...prev, columnKey]
    );
  }, []);

  // Handle row selection
  const toggleRowSelection = useCallback((rowId: string) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  }, []);

  const toggleAllRows = useCallback(() => {
    if (selectedRows.size === filteredData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredData.map(item => item.id)));
    }
  }, [selectedRows.size, filteredData]);

  // Export to Excel
  const handleExport = useCallback(async () => {
    setIsExporting(true);
    
    try {
      const exportData = selectedRows.size > 0 
        ? filteredData.filter(item => selectedRows.has(item.id))
        : filteredData;

      const config = {
        sortConfig,
        visibleColumns,
        dateRange,
        searchTerm
      };

      if (onExport) {
        await onExport(exportData, config);
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  }, [selectedRows, filteredData, sortConfig, visibleColumns, dateRange, searchTerm, onExport]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-right text-2xl font-bold">{title}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {filteredData.length} רשומות
              </Badge>
              {selectedRows.size > 0 && (
                <Badge variant="secondary" className="text-sm">
                  {selectedRows.size} נבחרו
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="חיפוש בכל השדות..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-right pr-10"
              />
            </div>

            {/* Date Range */}
            <div>
              <Label className="text-right text-sm mb-2 block">טווח תאריכים</Label>
              <DatePickerWithRange
                date={dateRange}
                onDateChange={setDateRange}
              />
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowColumnSelector(!showColumnSelector)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                עמודות
              </Button>
            </div>

            {/* Export */}
            <div className="flex gap-2">
              <Button
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FileSpreadsheet className="h-4 w-4" />
                )}
                ייצוא לאקסל
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {/* Select All Checkbox */}
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedRows.size === filteredData.length && filteredData.length > 0}
                      onCheckedChange={toggleAllRows}
                    />
                  </TableHead>
                  
                  {/* Dynamic Columns */}
                  {columns
                    .filter(col => visibleColumns.includes(col.key))
                    .map(column => (
                      <TableHead 
                        key={column.key}
                        className={`text-right ${column.sortable ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                        onClick={() => column.sortable && handleSort(column.key)}
                      >
                        <div className="flex items-center justify-end gap-2">
                          {column.label}
                          {column.sortable && sortConfig?.column === column.key && (
                            sortConfig.direction === 'asc' ? 
                              <ChevronUp className="h-4 w-4" /> : 
                              <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                    ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item.id || index}>
                    {/* Row Selection Checkbox */}
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.has(item.id)}
                        onCheckedChange={() => toggleRowSelection(item.id)}
                      />
                    </TableCell>
                    
                    {/* Dynamic Data Cells */}
                    {columns
                      .filter(col => visibleColumns.includes(col.key))
                      .map(column => (
                        <TableCell key={column.key} className="text-right">
                          {renderCellValue(item[column.key], column.type)}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Column Selector Dialog */}
      <Dialog open={showColumnSelector} onOpenChange={setShowColumnSelector}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">בחירת עמודות</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {columns.map(column => (
              <div key={column.key} className="flex items-center justify-between">
                <Label htmlFor={column.key} className="text-right">
                  {column.label}
                </Label>
                <Checkbox
                  id={column.key}
                  checked={visibleColumns.includes(column.key)}
                  onCheckedChange={() => toggleColumnVisibility(column.key)}
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper function to render cell values
const renderCellValue = (value: any, type: string) => {
  switch (type) {
    case 'currency':
      return `₪${Number(value).toLocaleString()}`;
    case 'date':
      return new Date(value).toLocaleDateString('he-IL');
    case 'status':
      return (
        <Badge variant={value === 'active' ? 'default' : 'secondary'}>
          {value === 'active' ? 'פעיל' : 'לא פעיל'}
        </Badge>
      );
    case 'boolean':
      return value ? '✓' : '✗';
    default:
      return String(value);
  }
};

// Default Excel export function
const exportToExcel = async (data: any[], config: any) => {
  // This would be implemented with a library like xlsx
  console.log('Exporting to Excel:', data, config);
};

export default AdvancedReportGenerator;
