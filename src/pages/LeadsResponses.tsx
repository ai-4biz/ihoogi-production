
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, LineChart } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import LeadsList from "@/components/leads-responses/LeadsList";
import AnswersAnalyticsTab from "@/components/leads-responses/AnswersAnalyticsTab";

const LeadsResponses = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "leads";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <MainLayout initialState="leads">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <MessageSquare className="mr-2 h-6 w-6" />
          לידים ותשובות
        </h1>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="leads">לידים</TabsTrigger>
            <TabsTrigger value="answers-analytics">
              <LineChart className="h-4 w-4 mr-1" />
              ניתוח תשובות
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="leads" className="mt-0">
            <LeadsList searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="answers-analytics" className="mt-0">
            <AnswersAnalyticsTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default LeadsResponses;
