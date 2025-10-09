
import { MessageCircle } from "lucide-react";
import { commentsAnalytics } from "./data/mockData";

const CommentsAnalyticsTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">סיכום תגובות</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">סה"כ תגובות</p>
            <p className="text-3xl font-bold text-blue-900">{commentsAnalytics.total}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-800">תגובות השבוע</p>
            <p className="text-3xl font-bold text-green-900">{commentsAnalytics.thisWeek}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-800">תגובות חיוביות</p>
            <p className="text-3xl font-bold text-purple-900">{commentsAnalytics.positiveRate}</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <p className="text-sm text-amber-800">אחוז מענה</p>
            <p className="text-3xl font-bold text-amber-900">92%</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">פלטפורמות</h2>
        <ul className="space-y-4">
          {commentsAnalytics.platforms.map((platform, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="font-medium">{platform.name}</span>
              <div className="flex items-center">
                <span className="mr-2">{platform.count}</span>
                <div className="w-40 bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-purple-600 h-2.5 rounded-full" 
                    style={{ width: `${(platform.count / commentsAnalytics.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">מאמרים פופולריים</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commentsAnalytics.popularPosts.map((post, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">{post.title}</h3>
              <div className="flex items-center">
                <MessageCircle className="h-4 w-4 text-purple-500 mr-2" />
                <span>{post.comments} תגובות</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsAnalyticsTab;
