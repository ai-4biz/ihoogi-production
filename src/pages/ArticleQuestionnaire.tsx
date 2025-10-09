
import MainLayout from "@/components/layout/MainLayout";

const ArticleQuestionnaire = () => {
  return (
    <MainLayout initialState="content">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">שאלון מאמר</h1>
        
        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">שלב 1: פרטי מאמר</h2>
            <p className="text-gray-600 mb-4">נא למלא את הפרטים הבסיסיים של המאמר</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">נושא המאמר</label>
                <input 
                  type="text" 
                  className="w-full border rounded-md p-2"
                  placeholder="נא להזין נושא מאמר"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">קהל יעד</label>
                <select className="w-full border rounded-md p-2">
                  <option>בחירת קהל יעד</option>
                  <option>לקוחות פרטיים</option>
                  <option>עסקים קטנים</option>
                  <option>חברות גדולות</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">שלב 2: תוכן ומבנה</h2>
            <p className="text-gray-600 mb-4">הגדירו את מבנה המאמר והתוכן הרצוי</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">סגנון כתיבה</label>
                <select className="w-full border rounded-md p-2">
                  <option>בחירת סגנון</option>
                  <option>רשמי</option>
                  <option>מקצועי</option>
                  <option>ידידותי</option>
                  <option>יצירתי</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">נקודות מפתח במאמר</label>
                <textarea 
                  className="w-full border rounded-md p-2 h-24"
                  placeholder="נקודות עיקריות שתרצו לכלול במאמר"
                ></textarea>
              </div>
            </div>
          </div>
          
          <button className="bg-[#2D66F2] text-white px-6 py-2 rounded-md hover:bg-blue-600">
            צור מאמר
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ArticleQuestionnaire;
