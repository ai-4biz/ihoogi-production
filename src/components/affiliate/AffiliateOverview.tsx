
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, Share2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/hooks/use-user";

const AffiliateOverview = () => {
  const { user } = useUser();
  const [referralLink, setReferralLink] = useState("https://hoogi.ai/ref/user123");
  
  // Mock data for the promoted posts
  const promotedPosts = [
    { id: 1, title: "איך לשפר את השיווק שלך ב-2023", clicks: 145, leads: 12, conversions: 3, revenue: 450 },
    { id: 2, title: "5 טיפים למנהלי עסקים קטנים", clicks: 89, leads: 7, conversions: 1, revenue: 150 },
    { id: 3, title: "המדריך המלא לשיווק בתוכן", clicks: 203, leads: 18, conversions: 5, revenue: 750 },
  ];
  
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({ title: "הקישור הועתק בהצלחה!" });
  };
  
  const shareAgain = (postId: number) => {
    toast({ title: "בקרוב", description: "אפשרות לשיתוף מחדש תהיה זמינה בקרוב" });
  };

  // Calculate metrics summary from promoted posts
  const totalClicks = promotedPosts.reduce((sum, post) => sum + post.clicks, 0);
  const totalLeads = promotedPosts.reduce((sum, post) => sum + post.leads, 0);
  const totalConversions = promotedPosts.reduce((sum, post) => sum + post.conversions, 0);
  const totalRevenue = promotedPosts.reduce((sum, post) => sum + post.revenue, 0);

  return (
    <div>
      {/* Referral Link Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>קישור הפנייה אישי</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1">
              <Input 
                value={referralLink} 
                onChange={(e) => setReferralLink(e.target.value)} 
                className="bg-gray-50" 
                readOnly
              />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={copyReferralLink}>
                    <Copy className="h-4 w-4 mr-2" /> העתק
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>לחץ להעתקת הקישור</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
      
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">לחיצות</p>
              <p className="text-3xl font-bold">{totalClicks}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">לידים</p>
              <p className="text-3xl font-bold">{totalLeads}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">המרות</p>
              <p className="text-3xl font-bold">{totalConversions}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">הכנסה משוערת (₪)</p>
              <p className="text-3xl font-bold">{totalRevenue}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Promoted Posts Table */}
      <Card className="mb-6 overflow-hidden">
        <CardHeader>
          <CardTitle>פוסטים שקודמו</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>כותרת</TableHead>
                  <TableHead className="text-center">לחיצות</TableHead>
                  <TableHead className="text-center">לידים</TableHead>
                  <TableHead className="text-center">המרות</TableHead>
                  <TableHead className="text-center">הכנסה (₪)</TableHead>
                  <TableHead className="text-right">פעולות</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promotedPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell className="text-center">{post.clicks}</TableCell>
                    <TableCell className="text-center">{post.leads}</TableCell>
                    <TableCell className="text-center">{post.conversions}</TableCell>
                    <TableCell className="text-center">{post.revenue}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => shareAgain(post.id)}
                      >
                        <Share2 className="h-4 w-4 mr-2" /> שתף שוב
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliateOverview;
