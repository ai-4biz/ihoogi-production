
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/hooks/use-user";
import AffiliateOverview from "@/components/affiliate/AffiliateOverview";
import AffiliatePartners from "@/components/affiliate/AffiliatePartners";
import AffiliateAddPartner from "@/components/affiliate/AffiliateAddPartner";
import AffiliateAnalytics from "@/components/affiliate/AffiliateAnalytics";

type AffiliateTab = "overview" | "partners" | "add-partner" | "analytics";

const AffiliateProgram = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<AffiliateTab>("overview");
  
  if (!user.subscription.hasAffiliateAccess) {
    return (
      <MainLayout initialState="affiliate">
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-center mb-6">תוכנית שותפים</h1>
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-xl">אין לך הרשאה לצפות בתוכנית השותפים.</p>
            <p className="mt-2 text-muted-foreground">אנא פנה למנהל המערכת להפעלת הרשאה.</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout initialState="affiliate">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">תוכנית שותפים</h1>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={(value) => setActiveTab(value as AffiliateTab)} className="w-full">
          <TabsList className="w-full justify-start overflow-auto mb-6">
            <TabsTrigger value="overview" className="text-md">סקירה</TabsTrigger>
            <TabsTrigger value="partners" className="text-md">שותפים</TabsTrigger>
            <TabsTrigger value="add-partner" className="text-md">הוספת שותף</TabsTrigger>
            <TabsTrigger value="analytics" className="text-md">ניתוח</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <AffiliateOverview />
          </TabsContent>
          
          <TabsContent value="partners" className="mt-0">
            <AffiliatePartners />
          </TabsContent>
          
          <TabsContent value="add-partner" className="mt-0">
            <AffiliateAddPartner />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-0">
            <AffiliateAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AffiliateProgram;
