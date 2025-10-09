
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { List, Users, FileText, Handshake, BarChart, FileText as Invoice } from "lucide-react";
import { cn } from "@/lib/utils";
import OrganizationsList from "./OrganizationsList";
import TeamList from "./TeamList";
import ContentList from "./ContentList";
import PartnersTab from "./PartnersTab";
import DashboardTab from "./DashboardTab";
import InvoicesTab from "./InvoicesTab";

type OrganizationTab = "organizations" | "team" | "content" | "partners" | "dashboard" | "invoices";

const OrganizationsView = () => {
  const [activeTab, setActiveTab] = useState<OrganizationTab>("organizations");

  const tabs = [
    {
      id: "organizations",
      label: "רשימת אירגונים",
      icon: <List className="h-4 w-4 ml-2" />,
      tooltip: "צפייה ברשימת האירגונים"
    },
    {
      id: "team",
      label: "צוות",
      icon: <Users className="h-4 w-4 ml-2" />,
      tooltip: "ניהול צוות הארגון"
    },
    {
      id: "content",
      label: "תוכן",
      icon: <FileText className="h-4 w-4 ml-2" />,
      tooltip: "ניהול תוכן של הארגון"
    },
    {
      id: "partners",
      label: "שותפים",
      icon: <Handshake className="h-4 w-4 ml-2" />,
      tooltip: "ניהול שותפים של הארגון"
    },
    {
      id: "dashboard",
      label: "דשבורד",
      icon: <BarChart className="h-4 w-4 ml-2" />,
      tooltip: "צפייה בנתונים של הארגון"
    },
    {
      id: "invoices",
      label: "חשבוניות",
      icon: <Invoice className="h-4 w-4 ml-2" />,
      tooltip: "ניהול חשבוניות של הארגון"
    }
  ];

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">🏢 ניהול אירגונים</h1>
        
        <Tabs
          defaultValue="organizations"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as OrganizationTab)}
          className="w-full"
        >
          <TabsList className="flex flex-wrap mb-6 bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => (
              <Tooltip key={tab.id} delayDuration={300}>
                <TooltipTrigger asChild>
                  <TabsTrigger 
                    value={tab.id}
                    className={cn(
                      "flex-1 md:flex-none md:min-w-32 data-[state=active]:bg-white data-[state=active]:shadow-sm flex items-center justify-center",
                      "text-sm py-2 px-4"
                    )}
                  >
                    {tab.icon}
                    <span className="hidden md:inline">{tab.label}</span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tab.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TabsList>

          <TabsContent value="organizations">
            <OrganizationsList />
          </TabsContent>
          
          <TabsContent value="team">
            <TeamList />
          </TabsContent>
          
          <TabsContent value="content">
            <ContentList />
          </TabsContent>
          
          <TabsContent value="partners">
            <PartnersTab />
          </TabsContent>
          
          <TabsContent value="dashboard">
            <DashboardTab />
          </TabsContent>
          
          <TabsContent value="invoices">
            <InvoicesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OrganizationsView;
