
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Link, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import HoogiTip from "@/components/HoogiTip";
import { format } from "date-fns";

const PublishScheduler = () => {
  const [autoPublish, setAutoPublish] = useState(false);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("12:00");
  const [mockUrl, setMockUrl] = useState("https://example.com/content/12345");
  
  const handlePublish = () => {
    toast({
      title: "בקרוב...",
      description: "פונקציונליות הפרסום האוטומטי תהיה זמינה בקרוב"
    });
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(mockUrl);
    toast({
      title: "הקישור הועתק",
      description: "הקישור הועתק ללוח"
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-lg font-medium mb-4">הפצה</div>
      
      <Card className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Switch
              checked={autoPublish}
              onCheckedChange={setAutoPublish}
              id="auto-publish"
            />
            <Label htmlFor="auto-publish" className="text-base cursor-pointer">
              פרסום אוטומטי
            </Label>
            <HoogiTip tip="פרסם את התוכן אוטומטית לרשתות החברתיות" />
          </div>
        </div>
        
        {autoPublish && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>תאריך פרסום</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="justify-start text-right w-full"
                    >
                      <CalendarIcon className="ml-2 h-4 w-4" />
                      {date ? format(date, "dd/MM/yyyy") : "בחר תאריך"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>שעת פרסום</Label>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            
            <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
              <p className="text-sm text-blue-800">
                {date 
                  ? `התוכן יפורסם ב-${format(date, "dd/MM/yyyy")} בשעה ${time}`
                  : "בחר תאריך ושעה לפרסום אוטומטי"
                }
              </p>
            </div>
          </div>
        )}
        
        <div className="pt-4 flex flex-col sm:flex-row gap-4">
          <Button 
            className="flex-1"
            onClick={handlePublish}
          >
            <Share2 className="ml-2 h-4 w-4" />
            פרסם עכשיו
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleCopyLink}
          >
            <Link className="ml-2 h-4 w-4" />
            העתק קישור
          </Button>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">סטטוס פרסום</h3>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">קישור:</p>
          <div className="flex items-center">
            <Input 
              value={mockUrl}
              readOnly
              onClick={(e) => (e.target as HTMLInputElement).select()}
              className="flex-grow"
            />
            <Button 
              variant="ghost"
              size="sm"
              className="ml-2"
              onClick={handleCopyLink}
            >
              <Link className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PublishScheduler;
