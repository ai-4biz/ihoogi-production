import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Guide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            📊 מדריך מקיף לפרסום קישורים בכל הרשתות
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            טבלה מפורטת עם כל המקומות שבהם ניתן לפרסם או לשתף קישור או כפתור
          </p>
          <Button 
            onClick={() => window.close()}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            חזור לדף הפצה
          </Button>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <tr>
                  <th className="py-4 px-4 text-right font-bold">רשת / פלטפורמה</th>
                  <th className="py-4 px-4 text-right font-bold">סוג פרסום / מקום</th>
                  <th className="py-4 px-4 text-right font-bold">מה ניתן להדביק</th>
                  <th className="py-4 px-4 text-right font-bold">איך זה נראה בפועל</th>
                  <th className="py-4 px-4 text-right font-bold">הערות / טיפים מקצועיים</th>
                </tr>
              </thead>
              <tbody className="text-right">
                {/* Facebook */}
                <tr className="border-b border-gray-200 bg-blue-50">
                  <td className="py-3 px-4 font-semibold text-blue-800" rowSpan={4}>
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🟦</span>
                      Facebook
                    </div>
                  </td>
                  <td className="py-3 px-4">פוסט רגיל בעמוד / קבוצה</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">מלל עם קישור</span>
                  </td>
                  <td className="py-3 px-4">תצוגת לינק עם תמונה, כותרת ותיאור</td>
                  <td className="py-3 px-4 text-xs">אין אפשרות לכפתור אמיתי (HTML). מומלץ לצרף תמונה + לינק בשורה נפרדת.</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">פוסט ממומן (מודעה)</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">כפתור HTML</span>
                  </td>
                  <td className="py-3 px-4">כפתור אמיתי: "הרשמה", "למידע נוסף", "קנה עכשיו"</td>
                  <td className="py-3 px-4 text-xs">דרך Ads Manager בלבד. הכי מקצועי ונקי.</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">Facebook Story</td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">רק קישור</span>
                  </td>
                  <td className="py-3 px-4">נפתח בחלון מובנה בפייסבוק</td>
                  <td className="py-3 px-4 text-xs">יש להוסיף דרך "Add Link" בסטורי עסקי בלבד.</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">Facebook Bio / אודות</td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">רק קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ ישירות מהעמוד</td>
                  <td className="py-3 px-4 text-xs">מומלץ לשים את הקישור הראשי שלך (למשל לאפליקציה / דף נחיתה).</td>
                </tr>

                {/* Instagram */}
                <tr className="border-b border-gray-200 bg-purple-50">
                  <td className="py-3 px-4 font-semibold text-purple-800" rowSpan={4}>
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🟣</span>
                      Instagram
                    </div>
                  </td>
                  <td className="py-3 px-4">פוסט רגיל</td>
                  <td className="py-3 px-4">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">טקסט בלבד</span>
                  </td>
                  <td className="py-3 px-4">יוצג כטקסט בלבד</td>
                  <td className="py-3 px-4 text-xs">לכתוב "קישור בביו 👆" ולכוון לשם.</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">סטורי</td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">רק קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ ישירות מתוך הסטורי</td>
                  <td className="py-3 px-4 text-xs">השתמשי במדבקת "Link". חובה עסקי או 1K+ עוקבים.</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">Bio (פרופיל)</td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">רק קישור</span>
                  </td>
                  <td className="py-3 px-4">מוצג בלינק הראשי של הפרופיל</td>
                  <td className="py-3 px-4 text-xs">מומלץ להכניס לינק למיני־דף (כמו Linktree או iHoogi link page).</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">מודעה ממומנת</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">כפתור HTML</span>
                  </td>
                  <td className="py-3 px-4">כפתור אמיתי ("הרשמה", "שליחת הודעה")</td>
                  <td className="py-3 px-4 text-xs">הכי אפקטיבי – דרך Meta Ads.</td>
                </tr>

                {/* LinkedIn */}
                <tr className="border-b border-gray-200 bg-blue-50">
                  <td className="py-3 px-4 font-semibold text-blue-800" rowSpan={4}>
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🔵</span>
                      LinkedIn
                    </div>
                  </td>
                  <td className="py-3 px-4">פוסט רגיל</td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">רק קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ + תצוגת לינק (תמונה וטקסט)</td>
                  <td className="py-3 px-4 text-xs">הכי יעיל להדביק את הלינק בשורה נפרדת בסוף הפוסט.</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">מאמר / Article / ניוזלטר</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">מלל עם קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ בתוך התוכן</td>
                  <td className="py-3 px-4 text-xs">מתאים לפוסטים ארוכים או בלוג עסקי.</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">פרופיל / About</td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">רק קישור</span>
                  </td>
                  <td className="py-3 px-4">בלחיצה על כפתור "Contact info"</td>
                  <td className="py-3 px-4 text-xs">מומלץ לשים לינק לאתר / דף נחיתה הראשי שלך.</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">הודעות פרטיות (DM)</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">מלל עם קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ אוטומטית</td>
                  <td className="py-3 px-4 text-xs">עובד מעולה בהודעות ישירות לשיתופי פעולה.</td>
                </tr>

                {/* WhatsApp */}
                <tr className="border-b border-gray-200 bg-green-50">
                  <td className="py-3 px-4 font-semibold text-green-800">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🟩</span>
                      WhatsApp
                    </div>
                  </td>
                  <td className="py-3 px-4">הודעה / קבוצה / סטטוס</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">מלל עם קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ אוטומטית</td>
                  <td className="py-3 px-4 text-xs">תומך גם בקישורים מקוצרים וגם באימוג'ים.</td>
                </tr>

                {/* Telegram */}
                <tr className="border-b border-gray-200 bg-blue-50">
                  <td className="py-3 px-4 font-semibold text-blue-800">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">💬</span>
                      Telegram
                    </div>
                  </td>
                  <td className="py-3 px-4">הודעה / ערוץ / קבוצה</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">מלל עם קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ אוטומטית</td>
                  <td className="py-3 px-4 text-xs">תומך גם בעיצוב טקסט (Markdown) לקישור נסתר.</td>
                </tr>

                {/* Twitter */}
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-800" rowSpan={2}>
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🐦</span>
                      Twitter (X)
                    </div>
                  </td>
                  <td className="py-3 px-4">פוסט / ציוץ</td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">רק קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ + תצוגה מקדימה</td>
                  <td className="py-3 px-4 text-xs">אין טקסט עשיר. השתמשי בלינק קצר.</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">Bio / אתר</td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">רק קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ</td>
                  <td className="py-3 px-4 text-xs">לשים את הקישור העיקרי שלך.</td>
                </tr>

                {/* YouTube */}
                <tr className="border-b border-gray-200 bg-red-50">
                  <td className="py-3 px-4 font-semibold text-red-800" rowSpan={4}>
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🔴</span>
                      YouTube
                    </div>
                  </td>
                  <td className="py-3 px-4">תיאור סרטון</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">מלל עם קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ ישירות</td>
                  <td className="py-3 px-4 text-xs">מומלץ בתחילת התיאור. פותח בדפדפן.</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">תגובה מוצמדת</td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">רק קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ</td>
                  <td className="py-3 px-4 text-xs">מתאים לקידום דף הרשמה או מוצר.</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">מסך סיום (End Screen)</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">כפתור HTML</span>
                  </td>
                  <td className="py-3 px-4">כפתור אמיתי בתוך הסרטון</td>
                  <td className="py-3 px-4 text-xs">זמין רק לערוצים מאומתים.</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">קישור בפרופיל הערוץ</td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">רק קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ ישירות מהעמוד הראשי</td>
                  <td className="py-3 px-4 text-xs">לשים שם את הלינק הראשי שלך.</td>
                </tr>

                {/* TikTok */}
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-800" rowSpan={3}>
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🎵</span>
                      TikTok
                    </div>
                  </td>
                  <td className="py-3 px-4">Bio</td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">רק קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ</td>
                  <td className="py-3 px-4 text-xs">רק בפרופיל עסקי.</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">פוסט רגיל</td>
                  <td className="py-3 px-4">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">טקסט בלבד</span>
                  </td>
                  <td className="py-3 px-4">יוצג ללא לינק פעיל</td>
                  <td className="py-3 px-4 text-xs">כתבי "קישור בביו 👆".</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">מודעה ממומנת</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">כפתור HTML</span>
                  </td>
                  <td className="py-3 px-4">כפתור אמיתי</td>
                  <td className="py-3 px-4 text-xs">דרך TikTok Ads בלבד.</td>
                </tr>

                {/* Email */}
                <tr className="border-b border-gray-200 bg-blue-50">
                  <td className="py-3 px-4 font-semibold text-blue-800" rowSpan={2}>
                    <div className="flex items-center">
                      <span className="text-xl mr-2">✉️</span>
                      Email
                    </div>
                  </td>
                  <td className="py-3 px-4">גוף ההודעה</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">מלל עם קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ ישירות</td>
                  <td className="py-3 px-4 text-xs">מומלץ לנסח: "לחצו כאן להצטרפות →".</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">חתימה</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">כפתור HTML</span>
                  </td>
                  <td className="py-3 px-4">לחיץ</td>
                  <td className="py-3 px-4 text-xs">ניתן לעצב עם כפתור מעוצב ב־HTML.</td>
                </tr>

                {/* SMS */}
                <tr className="border-b border-gray-200 bg-green-50">
                  <td className="py-3 px-4 font-semibold text-green-800">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">📱</span>
                      SMS
                    </div>
                  </td>
                  <td className="py-3 px-4">הודעת טקסט</td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">רק קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ</td>
                  <td className="py-3 px-4 text-xs">בלי תמונה או עיצוב – רק לינק קצר.</td>
                </tr>

                {/* אתרים */}
                <tr className="border-b border-gray-200 bg-blue-50">
                  <td className="py-3 px-4 font-semibold text-blue-800">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🌐</span>
                      אתר / דף נחיתה / בלוג
                    </div>
                  </td>
                  <td className="py-3 px-4">אזור תוכן</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">כפתור HTML</span>
                  </td>
                  <td className="py-3 px-4">כפתור אמיתי ומעוצב</td>
                  <td className="py-3 px-4 text-xs">`&lt;a href="https://..."&gt;לחצו כאן&lt;/a&gt;` או `&lt;button&gt;`.</td>
                </tr>

                {/* Pinterest */}
                <tr className="border-b border-gray-200 bg-red-50">
                  <td className="py-3 px-4 font-semibold text-red-800">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">📌</span>
                      Pinterest
                    </div>
                  </td>
                  <td className="py-3 px-4">Pin / Description</td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">רק קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ ישירות</td>
                  <td className="py-3 px-4 text-xs">מוסיף תצוגת תמונה + קישור למקור.</td>
                </tr>

                {/* Google Business */}
                <tr className="border-b border-gray-200 bg-blue-50">
                  <td className="py-3 px-4 font-semibold text-blue-800">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🏢</span>
                      Google Business Profile
                    </div>
                  </td>
                  <td className="py-3 px-4">פוסט / אתר</td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">רק קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ</td>
                  <td className="py-3 px-4 text-xs">מצוין לקידום דף הרשמה או שירות.</td>
                </tr>

                {/* Snapchat */}
                <tr className="bg-yellow-50">
                  <td className="py-3 px-4 font-semibold text-yellow-800">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">👻</span>
                      Snapchat Business
                    </div>
                  </td>
                  <td className="py-3 px-4">מודעה ממומנת / סטורי</td>
                  <td className="py-3 px-4">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">רק קישור</span>
                  </td>
                  <td className="py-3 px-4">לחיץ (Swipe Up / Tap)</td>
                  <td className="py-3 px-4 text-xs">רק בחשבון עסקי מאומת.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">💡 סיכום קצר לפי סוג תוכן</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-3">מלל עם קישור</h3>
              <p className="text-sm text-green-700 mb-2">היכן להשתמש:</p>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• WhatsApp, Telegram</li>
                <li>• Email, Facebook רגיל</li>
                <li>• Instagram סטורי רגיל</li>
                <li>• LinkedIn הודעות פרטיות</li>
                <li>• YouTube תיאורים</li>
              </ul>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">רק קישור</h3>
              <p className="text-sm text-purple-700 mb-2">היכן להשתמש:</p>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>• Twitter (X), LinkedIn</li>
                <li>• SMS, YouTube</li>
                <li>• TikTok Bio</li>
                <li>• Facebook/Instagram Bio</li>
                <li>• Pinterest, Google Business</li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">כפתור HTML אמיתי</h3>
              <p className="text-sm text-blue-700 mb-2">היכן להשתמש:</p>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• אתרים, דפי נחיתה</li>
                <li>• בלוגים</li>
                <li>• מודעות ממומנות</li>
                <li>• Meta / TikTok / YouTube</li>
                <li>• Email חתימות</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            💎 מדריך מקיף זה מכסה את כל הפלטפורמות המרכזיות לפרסום ושיתוף קישורים
          </p>
          <Button 
            onClick={() => window.close()}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            חזור לדף הפצה
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Guide;
