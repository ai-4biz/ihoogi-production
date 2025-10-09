
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const GenerateContentHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="flex justify-between mb-8 flex-col md:flex-row gap-4">
      <div>
        <h1 className="text-3xl font-bold">יצירת תוכן</h1>
        <p className="text-gray-600">כאן תוכלי ליצור תוכן מותאם אישית לעסק שלך</p>
      </div>
      <div className="relative w-full md:w-64">
        <Input 
          placeholder="חיפוש..."
          className="bg-white" 
          prefixIcon={<Search className="h-5 w-5 text-gray-400" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default GenerateContentHeader;
