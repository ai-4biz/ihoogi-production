
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Image, 
  Settings, 
  Edit, 
  Upload, 
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Tab Components
import SavedArticlesPane from "./tabs/SavedArticlesPane";
import UploadMediaPane from "./tabs/UploadMediaPane";
import ContentPrefsForm from "./tabs/ContentPrefsForm";
import RichEditorPane from "./tabs/RichEditorPane";
import PublishScheduler from "./tabs/PublishScheduler";

type ContentTab = "sources" | "media" | "preferences" | "editor" | "publish";

const ContentTabbedLayout = () => {
  const [activeTab, setActiveTab] = useState<ContentTab>("sources");
  const navigate = useNavigate();
  
  const handleSaveProgress = () => {
    toast({
      title: "התקדמות נשמרה",
      description: "התקדמות היצירה נשמרה בהצלחה"
    });
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-6 items-center">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          חזרה ללוח הבקרה
        </Button>
        
        <Button 
          variant="outline" 
          className="ml-auto"
          onClick={handleSaveProgress}
        >
          שמירת התקדמות
        </Button>
      </div>
      
      <Tabs 
        defaultValue="sources" 
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as ContentTab)}
        className="w-full"
      >
        <TabsList className="mb-6 w-full overflow-x-auto flex whitespace-nowrap">
          <TabsTrigger 
            value="sources" 
            className={cn(
              "flex items-center gap-2 flex-1", 
              activeTab === "sources" && "text-blue-600"
            )}
          >
            <BookOpen className="h-4 w-4" />
            <span>מקורות תוכן</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="media" 
            className={cn(
              "flex items-center gap-2 flex-1", 
              activeTab === "media" && "text-purple-600"
            )}
          >
            <Image className="h-4 w-4" />
            <span>מדיה & גרפיקה</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="preferences" 
            className={cn(
              "flex items-center gap-2 flex-1", 
              activeTab === "preferences" && "text-orange-600"
            )}
          >
            <Settings className="h-4 w-4" />
            <span>מאפייני תוכן</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="editor" 
            className={cn(
              "flex items-center gap-2 flex-1", 
              activeTab === "editor" && "text-green-600"
            )}
          >
            <Edit className="h-4 w-4" />
            <span>כתיבה & עריכה</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="publish" 
            className={cn(
              "flex items-center gap-2 flex-1", 
              activeTab === "publish" && "text-red-600"
            )}
          >
            <Upload className="h-4 w-4" />
            <span>הפצה</span>
          </TabsTrigger>
        </TabsList>

        <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
          <TabsContent value="sources">
            <SavedArticlesPane />
          </TabsContent>
          
          <TabsContent value="media">
            <UploadMediaPane />
          </TabsContent>
          
          <TabsContent value="preferences">
            <ContentPrefsForm />
          </TabsContent>
          
          <TabsContent value="editor">
            <RichEditorPane />
          </TabsContent>
          
          <TabsContent value="publish">
            <PublishScheduler />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ContentTabbedLayout;
