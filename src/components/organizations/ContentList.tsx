
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

// Mock data for content items
const mockContentItems = [
  {
    id: "1",
    title: "איך להגדיל את מכירות העסק ב-2024",
    category: "שיווק",
    author: "ישראל ישראלי",
    date: "2023-11-01",
    status: "published"
  },
  {
    id: "2",
    title: "10 טיפים לשיפור נוכחות דיגיטלית",
    category: "דיגיטל",
    author: "חנה כהן",
    date: "2023-10-15",
    status: "draft"
  },
  {
    id: "3",
    title: "מדריך מקיף לשיווק ברשתות חברתיות",
    category: "שיווק",
    author: "יוסף לוי",
    date: "2023-09-22",
    status: "published"
  },
  {
    id: "4",
    title: "איך לבנות אמון עם לקוחות",
    category: "מכירות",
    author: "שרה גולדברג",
    date: "2023-11-05",
    status: "review"
  },
  {
    id: "5",
    title: "מגמות דיגיטל לשנת 2024",
    category: "דיגיטל",
    author: "דוד מזרחי",
    date: "2023-10-30",
    status: "published"
  }
];

type ContentStatus = "published" | "draft" | "review";

const statusLabels: Record<ContentStatus, string> = {
  published: "פורסם",
  draft: "טיוטה",
  review: "בבדיקה"
};

const statusColors: Record<ContentStatus, string> = {
  published: "bg-green-100 text-green-800",
  draft: "bg-yellow-100 text-yellow-800",
  review: "bg-blue-100 text-blue-800"
};

const ContentList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const handleEditContent = (contentId: string) => {
    toast.info("מעבר לעריכת התוכן...");
    navigate(`/generate-content?articleId=${contentId}`);
  };

  // Get unique categories from content items
  const categories = Array.from(new Set(mockContentItems.map(item => item.category)));

  const filteredContent = mockContentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Format date to Hebrew format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('he-IL', { 
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric'
    }).format(date);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="חיפוש לפי כותרת או מחבר..."
            className="pl-10 rtl:pr-10 rtl:pl-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-48">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="קטגוריה" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל הקטגוריות</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button
          className="bg-[#2D66F2] hover:bg-blue-700"
          onClick={() => navigate('/generate-content')}
        >
          יצירת תוכן חדש
        </Button>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>כותרת</TableHead>
              <TableHead className="hidden md:table-cell">קטגוריה</TableHead>
              <TableHead className="hidden md:table-cell">מחבר</TableHead>
              <TableHead className="hidden md:table-cell">תאריך</TableHead>
              <TableHead>סטטוס</TableHead>
              <TableHead>פעולות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContent.length > 0 ? (
              filteredContent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{item.author}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(item.date)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.status as ContentStatus]}`}>
                      {statusLabels[item.status as ContentStatus]}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEditContent(item.id)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">ערוך</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>ערוך את התוכן</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  לא נמצאו פריטי תוכן
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ContentList;
