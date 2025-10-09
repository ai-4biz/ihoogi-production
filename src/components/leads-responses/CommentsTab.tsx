
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HoogiTip from "@/components/HoogiTip";
import { mockComments } from "./data/mockData";
import CommentsDetail from "./CommentsDetail";

interface CommentsTabProps {
  searchQuery: string;
}

const CommentsTab = ({ searchQuery }: CommentsTabProps) => {
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [localSearch, setLocalSearch] = useState("");
  
  const effectiveSearchQuery = searchQuery || localSearch;
  
  const filteredComments = mockComments.filter(comment =>
    comment.username.toLowerCase().includes(effectiveSearchQuery.toLowerCase()) ||
    comment.comment.toLowerCase().includes(effectiveSearchQuery.toLowerCase()) ||
    comment.post.toLowerCase().includes(effectiveSearchQuery.toLowerCase())
  );
  
  // Back to comments list
  const handleBack = () => {
    setSelectedCommentId(null);
  };
  
  if (selectedCommentId) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <Button variant="ghost" onClick={handleBack} className="mb-2">
            &larr; חזרה לרשימת התגובות
          </Button>
        </div>
        <CommentsDetail commentId={selectedCommentId} />
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <MessageCircle className="h-5 w-5 mr-2" /> 
        תגובות מרשתות חברתיות
        <HoogiTip tip="כאן ניתן לראות ולהגיב לתגובות שהתקבלו בעמודים השונים" />
      </h2>
      
      <div className="mb-4">
        <Input
          placeholder="חיפוש תגובות..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="max-w-xs"
          prefixIcon={<Search className="h-4 w-4 text-gray-400" />}
        />
      </div>
      
      {filteredComments.length > 0 ? (
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <Card 
              key={comment.id} 
              className={`overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${
                !comment.replied ? 'border-l-4 border-l-red-500' : ''
              }`}
              onClick={() => setSelectedCommentId(comment.id)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${
                      comment.platform === 'facebook' ? 'bg-blue-100 text-blue-600' :
                      comment.platform === 'instagram' ? 'bg-purple-100 text-purple-600' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {comment.platform === 'facebook' && <span className="text-xl">f</span>}
                      {comment.platform === 'instagram' && <span className="text-xl">📷</span>}
                      {comment.platform === 'linkedin' && <span className="text-xl">in</span>}
                    </div>
                    <div>
                      <p className="font-medium">{comment.username}</p>
                      <p className="text-xs text-gray-500">
                        {comment.platform} | {comment.date}
                      </p>
                    </div>
                  </div>
                  <Badge className={comment.replied ? "bg-green-500" : "bg-yellow-500"}>
                    {comment.replied ? "נענה" : "ממתין לתשובה"}
                  </Badge>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500">פוסט: {comment.post}</p>
                  <p className="mt-2 bg-gray-50 p-3 rounded-md">{comment.comment}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          לא נמצאו תגובות
        </div>
      )}
    </div>
  );
};

export default CommentsTab;
