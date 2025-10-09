
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, MessageCircle, Search } from "lucide-react";
import { mockComments } from "@/components/leads-responses/data/mockData";
import CommentsDetail from "@/components/leads-responses/CommentsDetail";

const Comments = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  
  const filteredComments = mockComments.filter(comment =>
    comment.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comment.post.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto h-screen flex flex-col">
      <div className="flex items-center justify-between py-4 border-b">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            תגובות מרשתות חברתיות
          </h1>
          <p className="text-gray-600">ניהול וטיפול בתגובות מרשתות חברתיות</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate("/main-dashboard")}
          className="flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          חזרה לדף הבית
        </Button>
      </div>

      <div className="flex gap-2 py-4">
        <Input 
          placeholder="חיפוש תגובות..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
          prefixIcon={<Search className="h-4 w-4 text-gray-400" />}
        />
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-1 h-full">
          {selectedCommentId ? (
            <CommentsDetail commentId={selectedCommentId} />
          ) : (
            <div className="grid gap-4">
              {filteredComments.map((comment) => (
                <Card 
                  key={comment.id} 
                  className={`overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${
                    !comment.replied ? 'border-l-4 border-l-red-500' : ''
                  }`}
                  onClick={() => setSelectedCommentId(comment.id)}
                >
                  <CardContent className="p-4">
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
                      <div className={`px-2 py-1 text-xs rounded-full ${
                        comment.replied ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {comment.replied ? "נענה" : "ממתין לתשובה"}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-500">פוסט: {comment.post}</p>
                      <p className="mt-2 bg-gray-50 p-2 rounded-md text-sm">{comment.comment}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
