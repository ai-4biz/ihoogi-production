
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import BusinessForm from "@/components/profile/forms/BusinessForm";
import BillingForm from "@/components/profile/forms/BillingForm";
import { toast } from "sonner";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("business");
  
  const handleSaveLinks = () => {
    toast.success("הפרטים נשמרו בהצלחה");
  };

  return (
    <MainLayout initialState="profile">
      <div className="container mx-auto p-4 max-w-5xl">
        <h1 className="text-2xl font-bold mb-4">הפרופיל שלי</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="business">פרופיל</TabsTrigger>
            <TabsTrigger value="billing">חיובים</TabsTrigger>
          </TabsList>
          
          <div className="mt-6 border rounded-lg p-6">
            <TabsContent value="business">
              <BusinessForm />
            </TabsContent>
            <TabsContent value="billing">
              <BillingForm />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;
