
import { BarChart } from "lucide-react";
import { leadsAnalytics } from "./data/mockData";

const LeadsAnalyticsTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">סיכום לידים</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">סה"כ לידים</p>
            <p className="text-3xl font-bold text-blue-900">{leadsAnalytics.total}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-800">לידים השבוע</p>
            <p className="text-3xl font-bold text-green-900">{leadsAnalytics.thisWeek}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-800">אחוז המרה</p>
            <p className="text-3xl font-bold text-purple-900">{leadsAnalytics.conversionRate}</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <p className="text-sm text-amber-800">זמן תגובה ממוצע</p>
            <p className="text-3xl font-bold text-amber-900">{leadsAnalytics.responseTime}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">מקורות לידים</h2>
        <ul className="space-y-4">
          {leadsAnalytics.sources.map((source, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="font-medium">{source.name}</span>
              <div className="flex items-center">
                <span className="mr-2">{source.count}</span>
                <div className="w-40 bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(source.count / leadsAnalytics.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">טיפים לשיפור</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-blue-100 rounded-lg p-4 bg-blue-50">
            <h3 className="font-medium text-blue-800 mb-2">הגדלת כמות לידים</h3>
            <p className="text-sm text-blue-700">
              הוספת טופס צור קשר בולט יותר בדפי נחיתה יכולה להגדיל את כמות הלידים ב-30%.
            </p>
          </div>
          <div className="border border-green-100 rounded-lg p-4 bg-green-50">
            <h3 className="font-medium text-green-800 mb-2">שיפור זמן תגובה</h3>
            <p className="text-sm text-green-700">
              מענה תוך שעה מרגע קבלת הליד מגדיל את סיכויי ההמרה פי 7.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsAnalyticsTab;
