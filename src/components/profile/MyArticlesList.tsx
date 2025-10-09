
import React from 'react';

const MyArticlesList = () => {
  // Sample articles data
  const articles = [
    { id: 1, title: "5 טיפים לשיווק דיגיטלי", date: "15.05.2025", comments: 14, leads: 8 },
    { id: 2, title: "בניית נוכחות ברשתות חברתיות", date: "10.05.2025", comments: 7, leads: 3 },
    { id: 3, title: "איך לכתוב תוכן שממיר", date: "05.05.2025", comments: 11, leads: 5 },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">המאמרים שלי</h2>
      <p className="text-gray-600">כאן תוכל לראות ולנהל את כל המאמרים שיצרת במערכת</p>
      
      <div className="bg-gray-50 p-4 rounded-xl overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-right">כותרת</th>
              <th className="py-3 text-center">תאריך</th>
              <th className="py-3 text-center">תגובות</th>
              <th className="py-3 text-center">לידים</th>
              <th className="py-3 text-center">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id} className="border-b">
                <td className="py-3">{article.title}</td>
                <td className="py-3 text-center">{article.date}</td>
                <td className="py-3 text-center">{article.comments}</td>
                <td className="py-3 text-center">{article.leads}</td>
                <td className="py-3 text-center">
                  <div className="flex justify-center space-x-2 rtl:space-x-reverse">
                    <button className="text-blue-500 hover:text-blue-700">ערוך</button>
                    <button className="text-red-500 hover:text-red-700">מחק</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyArticlesList;
