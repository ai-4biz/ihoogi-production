import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, Shield, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "iHoogi – תנאי שימוש ותקנון";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-10 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            חזור
          </Button>
          
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <img src="/hoogi-new-avatar.png" alt="לוגו iHoogi" className="h-20 w-20 object-contain" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              תנאי שימוש ותקנון
            </h1>
            <p className="text-muted-foreground">
              תקנון השימוש בפלטפורמת iHoogi
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              עדכון אחרון: {new Date().toLocaleDateString('he-IL')}
            </p>
          </div>
        </div>

        {/* Quick Summary */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <CheckCircle className="h-5 w-5 text-primary" />
              תמצית התקנון
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-right">
            <p className="text-sm leading-relaxed">
              ✓ פלטפורמת iHoogi מספקת כלים ליצירת שאלונים חכמים וניהול לידים
            </p>
            <p className="text-sm leading-relaxed">
              ✓ השירות ניתן תחת מנוי חודשי/שנתי עם מגבלות שימוש לפי התוכנית
            </p>
            <p className="text-sm leading-relaxed">
              ✓ אתה אחראי לתוכן השאלונים והשימוש בנתונים שנאספים
            </p>
            <p className="text-sm leading-relaxed">
              ✓ אנו שומרים על פרטיותך ומגנים על המידע שלך
            </p>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Section 1 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <FileText className="h-5 w-5 text-primary" />
                1. כללי
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-right">
              <p className="leading-relaxed">
                ברוכים הבאים ל-iHoogi! תנאי שימוש אלו ("התקנון") מסדירים את השימוש שלך בפלטפורמת iHoogi ("השירות"), 
                המסופקת על ידי iHoogi Ltd. ("החברה", "אנו", "שלנו").
              </p>
              <p className="leading-relaxed">
                השימוש בשירות מהווה הסכמה מלאה לתנאים אלו. אם אינך מסכים לתנאים, אנא הימנע משימוש בשירות.
              </p>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <Shield className="h-5 w-5 text-primary" />
                2. השירות
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-right">
              <h4 className="font-semibold">2.1 תיאור השירות</h4>
              <p className="leading-relaxed">
                iHoogi מספקת פלטפורמה ליצירה, ניהול והפצה של שאלונים דיגיטליים, איסוף תגובות מלקוחות, 
                וניהול לידים עסקיים. השירות כולל כלים לאוטומציה, ניתוח נתונים, ואינטגרציה עם ערוצי הפצה שונים.
              </p>
              
              <h4 className="font-semibold mt-4">2.2 זמינות השירות</h4>
              <p className="leading-relaxed">
                אנו עושים מאמצים סבירים להבטיח זמינות של השירות 24/7, אך איננו מתחייבים לזמינות מלאה ורציפה. 
                עשויים להתקיים הפסקות לצורכי תחזוקה או שדרוגים.
              </p>
              
              <h4 className="font-semibold mt-4">2.3 שינויים בשירות</h4>
              <p className="leading-relaxed">
                אנו שומרים לעצמנו את הזכות לשנות, להשעות או להפסיק חלקים מהשירות בכל עת, 
                עם או ללא הודעה מוקדמת.
              </p>
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <Lock className="h-5 w-5 text-primary" />
                3. חשבון משתמש ואבטחה
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-right">
              <h4 className="font-semibold">3.1 יצירת חשבון</h4>
              <p className="leading-relaxed">
                ליצירת חשבון נדרש לספק מידע מדויק ומלא, כולל שם, כתובת דוא"ל ופרטי התקשרות. 
                אתה אחראי לשמירה על סודיות פרטי ההתחברוג שלך.
              </p>
              
              <h4 className="font-semibold mt-4">3.2 אחריות המשתמש</h4>
              <p className="leading-relaxed">
                אתה אחראי לכל פעילות המתבצעת תחת חשבונך. עליך להודיע לנו מיד על כל שימוש לא מורשה בחשבונך.
              </p>
              
              <h4 className="font-semibold mt-4">3.3 אבטחת מידע</h4>
              <p className="leading-relaxed">
                אנו משתמשים בטכנולוגיות אבטחה מתקדמות להגנה על המידע שלך, כולל הצפנה, גיבויים תקופתיים, 
                ואמצעי הגנה נוספים.
              </p>
            </CardContent>
          </Card>

          {/* Section 4 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <FileText className="h-5 w-5 text-primary" />
                4. שימוש מותר ואסור
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-right">
              <h4 className="font-semibold">4.1 שימוש מותר</h4>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>יצירת שאלונים עסקיים לגיטימיים</li>
                <li>איסוף מידע מלקוחות בהסכמתם</li>
                <li>ניהול לידים ותגובות עסקיות</li>
                <li>שימוש באוטומציות לשיפור שירות הלקוחות</li>
              </ul>
              
              <h4 className="font-semibold mt-4">4.2 שימוש אסור</h4>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>פרסום תכנים פוגעניים, מטעים או בלתי חוקיים</li>
                <li>שליחת דואר זבל (SPAM) או הודעות לא רצויות</li>
                <li>איסוף מידע ללא הסכמת המשתמשים</li>
                <li>שימוש בשירות למטרות הונאה או מרמה</li>
                <li>פגיעה באבטחת המערכת או ניסיון גישה לא מורשה</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 5 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <Shield className="h-5 w-5 text-primary" />
                5. תשלום ומנויים
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-right">
              <h4 className="font-semibold">5.1 תוכניות מנוי</h4>
              <p className="leading-relaxed">
                השירות מוצע במספר תוכניות מנוי, כל אחת עם מגבלות שונות של לידים, שאלונים ותכונות. 
                פרטי התוכניות והמחירים מפורטים באתר.
              </p>
              
              <h4 className="font-semibold mt-4">5.2 חיובים</h4>
              <p className="leading-relaxed">
                התשלום יתבצע מראש עבור כל תקופת מנוי (חודשית/שנתית). החיוב יתבצע באמצעות כרטיס אשראי 
                או אמצעי תשלום אחר שאושר.
              </p>
              
              <h4 className="font-semibold mt-4">5.3 ביטול והחזרים</h4>
              <p className="leading-relaxed">
                ניתן לבטל את המנוי בכל עת. במקרה של ביטול, השירות יישאר פעיל עד תום תקופת המנוי ששולמה. 
                החזרים יינתנו בהתאם למדיניות ההחזרים שלנו.
              </p>
            </CardContent>
          </Card>

          {/* Section 6 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <Lock className="h-5 w-5 text-primary" />
                6. פרטיות והגנת מידע
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-right">
              <h4 className="font-semibold">6.1 איסוף מידע</h4>
              <p className="leading-relaxed">
                אנו אוספים מידע הכרחי למתן השירות, כולל פרטי התקשרות, נתוני שימוש, 
                ומידע על השאלונים והלידים שלך.
              </p>
              
              <h4 className="font-semibold mt-4">6.2 שימוש במידע</h4>
              <p className="leading-relaxed">
                המידע משמש אך ורק לצורך מתן השירות, שיפורו, תמיכה טכנית, וניתוח סטטיסטי כללי. 
                אנו לא נמכור ולא נשתף את המידע האישי שלך עם צדדים שלישיים ללא הסכמתך.
              </p>
              
              <h4 className="font-semibold mt-4">6.3 אבטחת נתונים</h4>
              <p className="leading-relaxed">
                אנו משתמשים בהצפנה מתקדמת (SSL/TLS), גיבויים אוטומטיים, ואמצעי אבטחה נוספים 
                כדי להגן על הנתונים שלך.
              </p>
            </CardContent>
          </Card>

          {/* Section 7 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <AlertCircle className="h-5 w-5 text-primary" />
                7. קניין רוחני
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-right">
              <h4 className="font-semibold">7.1 בעלות על הפלטפורמה</h4>
              <p className="leading-relaxed">
                כל הזכויות בפלטפורמת iHoogi, כולל קוד, עיצוב, לוגו וטכנולוגיה, שייכות לחברה. 
                אין להעתיק, לשכפל או להשתמש בחלקים מהפלטפורמה ללא אישור בכתב.
              </p>
              
              <h4 className="font-semibold mt-4">7.2 תוכן המשתמש</h4>
              <p className="leading-relaxed">
                אתה שומר על הבעלות המלאה על התוכן שאתה יוצר (שאלונים, תבניות, נתונים). 
                אתה מעניק לנו רישיון להשתמש בתוכן זה אך ורק לצורך מתן השירות.
              </p>
            </CardContent>
          </Card>

          {/* Section 8 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <Shield className="h-5 w-5 text-primary" />
                8. אחריות והגבלות אחריות
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-right">
              <p className="leading-relaxed">
                השירות ניתן "כמות שהוא" (AS IS). אנו לא אחראים לנזקים ישירים או עקיפים הנובעים משימוש 
                או אי-יכולת להשתמש בשירות, כולל אובדן נתונים, הפסד רווחים, או נזקים אחרים.
              </p>
              <p className="leading-relaxed font-semibold text-orange-600">
                חשוב: אתה אחראי לגבות את הנתונים שלך באופן עצמאי ולוודא תאימות לתקנות הרלוונטיות 
                (כגון GDPR, חוק הגנת הפרטיות הישראלי).
              </p>
            </CardContent>
          </Card>

          {/* Section 9 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <FileText className="h-5 w-5 text-primary" />
                9. הפסקת שירות וסיום חשבון
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-right">
              <p className="leading-relaxed">
                אנו שומרים לעצמנו את הזכות להשעות או לסגור חשבון במקרים של הפרת תנאי שימוש, 
                שימוש לרעה, או פעילות חשודה.
              </p>
              <p className="leading-relaxed">
                במקרה של סגירת חשבון, תוכל להוריד את הנתונים שלך תוך 30 יום. לאחר מכן, 
                הנתונים עשויים להימחק לצמיתות.
              </p>
            </CardContent>
          </Card>

          {/* Section 10 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <CheckCircle className="h-5 w-5 text-primary" />
                10. שינויים בתקנון
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-right">
              <p className="leading-relaxed">
                אנו שומרים לעצמנו את הזכות לעדכן תקנון זה מעת לעת. במקרה של שינוי מהותי, 
                נשלח הודעה למשתמשים באמצעות דוא"ל או הודעה במערכת.
              </p>
              <p className="leading-relaxed">
                המשך שימוש בשירות לאחר שינוי התקנון מהווה הסכמה לתנאים המעודכנים.
              </p>
            </CardContent>
          </Card>

          {/* Section 11 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <FileText className="h-5 w-5 text-primary" />
                11. תמיכה ויצירת קשר
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-right">
              <p className="leading-relaxed">
                לשאלות, הבהרות או תמיכה טכנית, ניתן ליצור קשר:
              </p>
              <ul className="list-none space-y-2 mr-4">
                <li><strong>דוא"ל:</strong> support@hoogi.app</li>
                <li><strong>טלפון:</strong> 03-1234567</li>
                <li><strong>כתובת:</strong> תל אביב, ישראל</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 12 */}
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-right">
                <Shield className="h-5 w-5 text-primary" />
                12. הסכמה לתקנון
              </CardTitle>
            </CardHeader>
            <CardContent className="text-right">
              <p className="leading-relaxed font-semibold">
                על ידי שימוש בשירות iHoogi, אתה מאשר כי קראת, הבנת והסכמת לתנאי שימוש אלו במלואם.
              </p>
              <p className="leading-relaxed mt-3 text-sm text-muted-foreground">
                תקנון זה כפוף לדיני מדינת ישראל, והסמכות השיפוטית הבלעדית נתונה לבתי המשפט בתל אביב.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            size="lg"
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            חזרה
          </Button>
          <Button 
            onClick={() => navigate("/signup")}
            size="lg"
          >
            המשך להרשמה
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} iHoogi Ltd. כל הזכויות שמורות.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

