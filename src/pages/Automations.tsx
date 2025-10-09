import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; 
import MainLayout from "@/components/layout/MainLayout";
import { Bell, Edit, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import TriggersTab from "@/components/automations/TriggersTab";
import TemplatesTab from "@/components/automations/TemplatesTab";
import PreferencesTab from "@/components/automations/PreferencesTab";
import { useSearchParams } from "react-router-dom";

type AutomationTab = "triggers" | "templates" | "prefs";

const Automations = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as AutomationTab;
  const [activeTab, setActiveTab] = useState<AutomationTab>(tabParam || "triggers");

  useEffect(() => {
    if (tabParam && ["triggers", "templates", "prefs"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return (
    <MainLayout initialState="automations">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">אוטומציות</h1>
          <p className="text-gray-500">ניהול אוטומציות והתראות</p>
        </div>
        
        <Tabs 
          defaultValue="triggers" 
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as AutomationTab)}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 gap-2 mb-6">
            <TabsTrigger 
              value="triggers" 
              className={cn("flex items-center gap-2", activeTab === "triggers" && "text-blue-500")}
            >
              <Bell className="h-4 w-4" />
              <span>טריגרים</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="templates" 
              className={cn("flex items-center gap-2", activeTab === "templates" && "text-green-500")}
            >
              <Edit className="h-4 w-4" />
              <span>תבניות</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="prefs" 
              className={cn("flex items-center gap-2", activeTab === "prefs" && "text-orange-500")}
            >
              <Settings className="h-4 w-4" />
              <span>העדפות</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="triggers" className="mt-2">
            <TriggersTab />
          </TabsContent>
          
          <TabsContent value="templates" className="mt-2">
            <TemplatesTab />
          </TabsContent>
          
          <TabsContent value="prefs" className="mt-2">
            <PreferencesTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Automations;
