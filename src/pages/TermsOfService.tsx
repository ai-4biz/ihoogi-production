import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileText, Shield, Lock, AlertCircle, CheckCircle, Globe, Users, CreditCard, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'he' | 'en'>('he');

  useEffect(() => {
    document.title = language === 'he' ? "Ai-4.BIZ – תנאי שימוש ותקנון" : "Ai-4.BIZ – Terms of Service & Privacy Policy";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(language === 'he' ? 'en' : 'he');
  };

  const renderHebrewContent = () => (
    <div dir="rtl">
      {/* Quick Summary */}
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-right">
            <CheckCircle className="h-5 w-5 text-primary" />
            תקנון ותנאי שימוש – iHoogi / AI-4Biz
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-right">
          <p className="text-sm leading-relaxed">
            ✓ תנאי שימוש (Terms of Service)
          </p>
          <p className="text-sm leading-relaxed">
            ✓ מדיניות פרטיות (Privacy Policy)
          </p>
          <p className="text-sm leading-relaxed">
            ✓ תנאי תשלום ומנויים
          </p>
          <p className="text-sm leading-relaxed">
            ✓ תנאי שותפים (Affiliate Program)
          </p>
          <p className="text-sm leading-relaxed">
            ✓ הגבלת אחריות ושיפוי משפטי
          </p>
          <p className="text-sm leading-relaxed">
            ✓ הגנה על קניין רוחני
          </p>
          <p className="text-sm leading-relaxed">
            ✓ שירותים מבוססי בינה מלאכותית (AI)
          </p>
        </CardContent>
      </Card>

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
              <strong>1.1</strong> תקנון זה מהווה הסכם מחייב בין המשתמש לבין <strong>AI-4Biz</strong> (להלן: "החברה", "אנחנו", "שלנו") – הבעלים והמפעילה הבלעדית של הפלטפורמה <strong>iHoogi</strong>, לרבות הסוכן הדיגיטלי "I-Hoogi", וכל השירותים, המערכות והתכנים הנלווים.
            </p>
            <p className="leading-relaxed">
              <strong>1.2</strong> כל פעילות עסקית, לרבות מנויים, חשבוניות ותשלומים לשותפים, מתבצעת על ידי <strong>AI-4Biz</strong>, הפועלת כחוק בישראל.
            </p>
            <p className="leading-relaxed">
              <strong>1.3</strong> מקום הפעילות: קדימה, ישראל.
            </p>
            <p className="leading-relaxed">
              <strong>1.4</strong> כל אזכור של "iHoogi" או "I-Hoogi" בתקנון זה מתייחס לפלטפורמה, למערכת ולמותג שבבעלות ובניהול <strong>AI-4Biz</strong>.
            </p>
            <p className="leading-relaxed">
              <strong>1.5</strong> השימוש בשירות מהווה הסכמה מלאה ובלתי חוזרת לכל תנאי התקנון ומדיניות הפרטיות של החברה.
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
            <p className="leading-relaxed">
              <strong>2.1</strong> הפלטפורמה מספקת כלים חכמים לניהול לידים, יצירת שאלונים, אוטומציות, ניתוח נתונים, מענה אוטומטי ותמיכה שיווקית.
            </p>
            <p className="leading-relaxed">
              <strong>2.2</strong> השירות ניתן במודל מנוי חודשי או שנתי לפי תוכנית.
            </p>
            <p className="leading-relaxed">
              <strong>2.3</strong> השירות אינו מהווה ייעוץ מקצועי (משפטי, פיננסי, טיפולי או רפואי) ואינו מחליף שיקול דעת אנושי.
            </p>
            <p className="leading-relaxed">
              <strong>2.4</strong> החברה רשאית לשנות, להוסיף או להסיר רכיבים לפי שיקול דעתה.
            </p>
            <p className="leading-relaxed">
              <strong>2.5</strong> ייתכנו הפסקות זמניות לשם תחזוקה או שדרוג.
            </p>
          </CardContent>
        </Card>

        {/* Section 3 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <Users className="h-5 w-5 text-primary" />
              3. חשבון משתמש
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-right">
            <p className="leading-relaxed">
              <strong>3.1</strong> המשתמש מתחייב למסור פרטים נכונים, לשמור על סודיות ולדווח על כל שימוש לא מורשה.
            </p>
            <p className="leading-relaxed">
              <strong>3.2</strong> כל פעולה בחשבון תיחשב כאילו בוצעה על ידי המשתמש.
            </p>
            <p className="leading-relaxed">
              <strong>3.3</strong> החברה רשאית להשעות או לסגור חשבון בגין הפרת תנאים או שימוש לרעה.
            </p>
          </CardContent>
        </Card>

        {/* Section 4 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <AlertCircle className="h-5 w-5 text-primary" />
              4. שימוש מותר ואסור
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-right">
            <p className="leading-relaxed">
              <strong>4.1</strong> השירות נועד לשימוש עסקי חוקי בלבד.
            </p>
            <p className="leading-relaxed">
              <strong>4.2</strong> נאסר להשתמש בשירות לשם הפצת תכנים פוגעניים, ספאם, חדירה למידע, הפרת זכויות יוצרים, או הפצה לא מורשית.
            </p>
            <p className="leading-relaxed">
              <strong>4.3</strong> החברה רשאית לחסום או למחוק חשבון במקרה של שימוש אסור, ללא החזר כספי.
            </p>
          </CardContent>
        </Card>

        {/* Section 5 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <CreditCard className="h-5 w-5 text-primary" />
              5. תשלום ומנויים
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-right">
            <p className="leading-relaxed">
              <strong>5.1</strong> השירות ניתן בתשלום מראש חודשי או שנתי.
            </p>
            <p className="leading-relaxed">
              <strong>5.2</strong> המחירים כוללים מע"מ אלא אם צוין אחרת.
            </p>
            <p className="leading-relaxed">
              <strong>5.3</strong> ניתן לבטל מנוי בכל עת דרך האפליקציה.
            </p>
            <p className="leading-relaxed">
              <strong>5.4</strong> החזר כספי יינתן רק בגין תקלה מוכחת באחריות החברה.
            </p>
            <p className="leading-relaxed">
              <strong>5.5</strong> במקרה מחלוקת על חיוב, יש לפנות תחילה אל החברה לפתרון בטרם פנייה לחברת אשראי.
            </p>
          </CardContent>
        </Card>

        {/* Section 6 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <Users className="h-5 w-5 text-primary" />
              6. תוכנית שותפים
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-right">
            <p className="leading-relaxed">
              <strong>6.1</strong> החברה מפעילה תוכנית שותפים לקבלת עמלות בגין הפניות.
            </p>
            <p className="leading-relaxed">
              <strong>6.2</strong> העמלות משולמות אחת לחודש לאחר אישור עסקה.
            </p>
            <p className="leading-relaxed">
              <strong>6.3</strong> החברה רשאית לעכב עמלות במקרה של פעילות פסולה או הפרת תנאים.
            </p>
            <p className="leading-relaxed">
              <strong>6.4</strong> כל תשלום נעשה כחוק, כולל ניכוי מס במקור כנדרש.
            </p>
          </CardContent>
        </Card>

        {/* Section 7 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <Lock className="h-5 w-5 text-primary" />
              7. פרטיות והגנת מידע
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-right">
            <p className="leading-relaxed">
              <strong>7.1</strong> החברה פועלת בהתאם לחוק הגנת הפרטיות הישראלי, GDPR ו-CCPA.
            </p>
            <p className="leading-relaxed">
              <strong>7.2</strong> נאסף מידע הדרוש להפעלת השירות בלבד.
            </p>
            <p className="leading-relaxed">
              <strong>7.3</strong> הנתונים נשמרים ב-Supabase, Google Cloud ו-OpenAI בתקן ISO 27001 ו-GDPR.
            </p>
            <p className="leading-relaxed">
              <strong>7.4</strong> החברה אינה מוכרת מידע לצדדים שלישיים.
            </p>
            <p className="leading-relaxed">
              <strong>7.5</strong> המשתמש אחראי לקבלת הסכמה חוקית מלקוחות הקצה.
            </p>
            <p className="leading-relaxed">
              <strong>7.6</strong> מידע אישי נשמר בשרתים מאובטחים בישראל ובאיחוד האירופי.
            </p>
            <p className="leading-relaxed">
              <strong>7.7</strong> ניתן לבקש גישה, תיקון או מחיקה של נתונים דרך לשונית "צור קשר".
            </p>
            <p className="leading-relaxed">
              <strong>7.8</strong> החברה רשאית להשתמש במידע אנונימי בלבד לשיפור השירות.
            </p>
          </CardContent>
        </Card>

        {/* Section 8 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <FileText className="h-5 w-5 text-primary" />
              8. Cookies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-right">
            <p className="leading-relaxed">
              המערכת משתמשת בעוגיות (Cookies) להפעלת השירות, לשיפור חוויית המשתמש ולסטטיסטיקות אנונימיות. ניתן לחסום עוגיות, אך חלק מהפונקציות עלולות שלא לפעול.
            </p>
          </CardContent>
        </Card>

        {/* Section 9 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <Shield className="h-5 w-5 text-primary" />
              9. קניין רוחני
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-right">
            <p className="leading-relaxed">
              <strong>9.1</strong> כל הזכויות בקוד, בעיצוב ובמותג <strong>iHoogi</strong> שייכות ל-<strong>AI-4Biz</strong>.
            </p>
            <p className="leading-relaxed">
              <strong>9.2</strong> "AI-4Biz", "iHoogi" והלוגו הם סימני מסחר של החברה.
            </p>
            <p className="leading-relaxed">
              <strong>9.3</strong> אין להעתיק, לשכפל או לשנות חלקים מהמערכת ללא אישור.
            </p>
            <p className="leading-relaxed">
              <strong>9.4</strong> תכנים שהועלו על ידי המשתמשים נשארים בבעלותם, אך ניתנת רשות שימוש להפעלת השירות.
            </p>
          </CardContent>
        </Card>

        {/* Section 10 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <Shield className="h-5 w-5 text-primary" />
              10. הגבלת אחריות
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-right">
            <p className="leading-relaxed">
              <strong>10.1</strong> השירות ניתן "כמות שהוא".
            </p>
            <p className="leading-relaxed">
              <strong>10.2</strong> החברה אינה אחראית לכל נזק ישיר או עקיף, לרבות הפסד רווחים או אובדן נתונים.
            </p>
            <p className="leading-relaxed">
              <strong>10.3</strong> החברה אינה אחראית לשירותי צד שלישי (Meta, WhatsApp, API, דוא"ל, סליקה).
            </p>
            <p className="leading-relaxed">
              <strong>10.4</strong> אחריות החברה, אם תוטל, מוגבלת לסכום ששולם ב-30 הימים שקדמו לאירוע.
            </p>
          </CardContent>
        </Card>

        {/* Section 11 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <FileText className="h-5 w-5 text-primary" />
              11. הודעות למשתמש
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-right">
            <p className="leading-relaxed">
              <strong>11.1</strong> החברה רשאית לשלוח עדכוני מערכת ותוכן שיווקי רלוונטי.
            </p>
            <p className="leading-relaxed">
              <strong>11.2</strong> ניתן להסיר את ההרשמה להודעות שיווקיות בכל עת.
            </p>
          </CardContent>
        </Card>

        {/* Section 12 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <FileText className="h-5 w-5 text-primary" />
              12. דין ושיפוט
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-right">
            <p className="leading-relaxed">
              <strong>12.1</strong> התקנון כפוף לדיני מדינת ישראל.
            </p>
            <p className="leading-relaxed">
              <strong>12.2</strong> סמכות השיפוט הבלעדית – בתי המשפט בתל-אביב.
            </p>
            <p className="leading-relaxed">
              <strong>12.3</strong> ניתן ליישב סכסוכים באמצעות בוררות לפי שיקול דעת החברה.
            </p>
          </CardContent>
        </Card>

        {/* Section 13 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <CheckCircle className="h-5 w-5 text-primary" />
              13. עדכונים
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-right">
            <p className="leading-relaxed">
              <strong>13.1</strong> החברה רשאית לעדכן תקנון זה מעת לעת.
            </p>
            <p className="leading-relaxed">
              <strong>13.2</strong> המשך שימוש מהווה הסכמה לנוסח המעודכן.
            </p>
          </CardContent>
        </Card>

        {/* Section 14 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <Shield className="h-5 w-5 text-primary" />
              14. שירותים מבוססי בינה מלאכותית (AI)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-right">
            <p className="leading-relaxed">
              <strong>14.1</strong> השירות כולל רכיבי AI שעלולים להיות חלקיים, שגויים או לא מדויקים.
            </p>
            <p className="leading-relaxed">
              <strong>14.2</strong> תוצרי AI אינם ייעוץ מקצועי ואין להסתמך עליהם ללא אימות אנושי.
            </p>
            <p className="leading-relaxed">
              <strong>14.3</strong> המשתמש חייב לאשר ידנית כל תוכן לפני שליחתו ללקוחות או הפצה.
            </p>
            <p className="leading-relaxed">
              <strong>14.4</strong> המשתמש אחראי לכל קלט שמוזן למערכת ולא יפר זכויות או פרטיות.
            </p>
            <p className="leading-relaxed">
              <strong>14.5</strong> כל שליחה אוטומטית חייבת לעמוד בחוק הספאם ובתקנות Meta ו-GDPR.
            </p>
            <p className="leading-relaxed">
              <strong>14.6</strong> החברה אינה אחראית לשיבושים, חסימות או תקלות אצל ספקי צד-שלישי.
            </p>
            <p className="leading-relaxed">
              <strong>14.7</strong> לצורכי אבטחה ושיפור יישמרו לוגים אנונימיים בלבד.
            </p>
            <p className="leading-relaxed">
              <strong>14.8</strong> המידע ישמש לשיפור השירות רק במתכונת אנונימית.
            </p>
            <p className="leading-relaxed">
              <strong>14.9</strong> המשתמש מקבל רישיון שימוש לא בלעדי בתוצרי ה-AI.
            </p>
            <p className="leading-relaxed">
              <strong>14.10</strong> החברה, עובדיה וספקיה לא יישאו באחריות לנזקים עקב תוצרי AI.
            </p>
            <p className="leading-relaxed">
              <strong>14.11</strong> פיצ'רים מסומנים כ-Beta עלולים לכלול מגבלות או שגיאות.
            </p>
            <p className="leading-relaxed">
              <strong>14.12</strong> החברה רשאית לעצור זמנית פעולות במקרה חשד לשימוש לרעה.
            </p>
            <p className="leading-relaxed">
              <strong>14.13</strong> המשתמש ישפה את החברה בגין טענות צד-שלישי הנובעות מהקלט או התוצרים.
            </p>
          </CardContent>
        </Card>

        {/* Section 15 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <FileText className="h-5 w-5 text-primary" />
              15. קרדיט ותצוגה
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-right">
            <p className="leading-relaxed">
              © 2025 AI-4Biz – כל הזכויות שמורות.
            </p>
            <p className="leading-relaxed">
              מופעל באמצעות iHoogi.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderEnglishContent = () => (
    <div dir="ltr">
      {/* Quick Summary */}
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-left">
            <CheckCircle className="h-5 w-5 text-primary" />
            Terms of Service – iHoogi / AI-4Biz
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-left">
          <p className="text-sm leading-relaxed">
            ✓ Terms of Service
          </p>
          <p className="text-sm leading-relaxed">
            ✓ Privacy Policy
          </p>
          <p className="text-sm leading-relaxed">
            ✓ Payment and Subscription Terms
          </p>
          <p className="text-sm leading-relaxed">
            ✓ Affiliate Program Terms
          </p>
          <p className="text-sm leading-relaxed">
            ✓ Liability Limitations and Legal Protection
          </p>
          <p className="text-sm leading-relaxed">
            ✓ Intellectual Property Protection
          </p>
          <p className="text-sm leading-relaxed">
            ✓ AI-Based Services
          </p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Section 1 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <FileText className="h-5 w-5 text-primary" />
              1. General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <p className="leading-relaxed">
              <strong>1.1</strong> These Terms constitute a binding agreement between the user ("you") and <strong>AI-4Biz</strong> ("the Company", "we", "our").
            </p>
            <p className="leading-relaxed">
              <strong>1.2</strong> AI-4Biz owns and operates the <strong>iHoogi</strong> platform, including the digital agent "I-Hoogi".
            </p>
            <p className="leading-relaxed">
              <strong>1.3</strong> All billing, subscriptions and affiliate payments are processed by <strong>AI-4Biz</strong>, legally registered in Israel.
            </p>
            <p className="leading-relaxed">
              <strong>1.4</strong> Using the Service constitutes full acceptance of these Terms and the Privacy Policy.
            </p>
          </CardContent>
        </Card>

        {/* Section 2 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <Shield className="h-5 w-5 text-primary" />
              2. The Service
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <p className="leading-relaxed">
              <strong>2.1</strong> The platform provides smart tools for lead management, questionnaires, automation, AI content generation and analytics.
            </p>
            <p className="leading-relaxed">
              <strong>2.2</strong> Services are offered on monthly or annual subscription plans.
            </p>
            <p className="leading-relaxed">
              <strong>2.3</strong> The Service does not constitute professional advice (legal, financial, medical, therapeutic) and must be verified by humans.
            </p>
            <p className="leading-relaxed">
              <strong>2.4</strong> We may modify or suspend features at any time.
            </p>
            <p className="leading-relaxed">
              <strong>2.5</strong> Temporary downtime may occur for maintenance or updates.
            </p>
          </CardContent>
        </Card>

        {/* Section 3 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <Users className="h-5 w-5 text-primary" />
              3. User Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <p className="leading-relaxed">
              <strong>3.1</strong> You must provide accurate details, keep credentials secure and notify us of unauthorized use.
            </p>
            <p className="leading-relaxed">
              <strong>3.2</strong> Any activity in your account is deemed yours.
            </p>
            <p className="leading-relaxed">
              <strong>3.3</strong> We may suspend or terminate accounts for violations.
            </p>
          </CardContent>
        </Card>

        {/* Section 4 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <AlertCircle className="h-5 w-5 text-primary" />
              4. Permitted Use
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <p className="leading-relaxed">
              <strong>4.1</strong> The Service is for lawful business use only.
            </p>
            <p className="leading-relaxed">
              <strong>4.2</strong> Do not use the Service to send spam, upload harmful content or violate rights.
            </p>
            <p className="leading-relaxed">
              <strong>4.3</strong> We may block accounts for abuse without refund.
            </p>
          </CardContent>
        </Card>

        {/* Section 5 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <CreditCard className="h-5 w-5 text-primary" />
              5. Payments and Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <p className="leading-relaxed">
              <strong>5.1</strong> Prepaid monthly or annual subscriptions.
            </p>
            <p className="leading-relaxed">
              <strong>5.2</strong> Prices include VAT unless stated otherwise.
            </p>
            <p className="leading-relaxed">
              <strong>5.3</strong> You may cancel anytime; access continues until period end.
            </p>
            <p className="leading-relaxed">
              <strong>5.4</strong> Refunds only for verified Company-caused issues.
            </p>
            <p className="leading-relaxed">
              <strong>5.5</strong> Billing disputes must be raised with <strong>AI-4Biz</strong> before contacting card issuers.
            </p>
          </CardContent>
        </Card>

        {/* Section 6 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <Users className="h-5 w-5 text-primary" />
              6. Affiliate Program
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <p className="leading-relaxed">
              <strong>6.1</strong> AI-4Biz runs an affiliate program granting commissions for valid referrals.
            </p>
            <p className="leading-relaxed">
              <strong>6.2</strong> Payments occur monthly after confirmation.
            </p>
            <p className="leading-relaxed">
              <strong>6.3</strong> We may withhold commissions for fraud or violations.
            </p>
            <p className="leading-relaxed">
              <strong>6.4</strong> All payments comply with tax laws.
            </p>
          </CardContent>
        </Card>

        {/* Section 7 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <Lock className="h-5 w-5 text-primary" />
              7. Privacy and Data Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <p className="leading-relaxed">
              <strong>7.1</strong> AI-4Biz complies with Israeli law, GDPR and CCPA.
            </p>
            <p className="leading-relaxed">
              <strong>7.2</strong> We collect only essential operational data.
            </p>
            <p className="leading-relaxed">
              <strong>7.3</strong> Data is stored securely via Supabase, OpenAI and Google Cloud (ISO 27001 / GDPR).
            </p>
            <p className="leading-relaxed">
              <strong>7.4</strong> We do not sell user data.
            </p>
            <p className="leading-relaxed">
              <strong>7.5</strong> Users must obtain legal consent from their end-clients.
            </p>
            <p className="leading-relaxed">
              <strong>7.6</strong> Data is stored in secured servers within Israel and the EU.
            </p>
            <p className="leading-relaxed">
              <strong>7.7</strong> You may request access, correction or deletion via the "Contact Us" form.
            </p>
            <p className="leading-relaxed">
              <strong>7.8</strong> Anonymous data may be used for service improvement only.
            </p>
          </CardContent>
        </Card>

        {/* Section 8 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <FileText className="h-5 w-5 text-primary" />
              8. Cookies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <p className="leading-relaxed">
              We use cookies to enable features, save preferences and collect anonymized analytics.
            </p>
            <p className="leading-relaxed">
              You can disable cookies, but some features may not function.
            </p>
          </CardContent>
        </Card>

        {/* Section 9 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <Shield className="h-5 w-5 text-primary" />
              9. Intellectual Property
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <p className="leading-relaxed">
              <strong>9.1</strong> All code, design and brand elements belong to <strong>AI-4Biz</strong>.
            </p>
            <p className="leading-relaxed">
              <strong>9.2</strong> "AI-4Biz" and "iHoogi" are registered trademarks.
            </p>
            <p className="leading-relaxed">
              <strong>9.3</strong> No copying, distribution or modification without written approval.
            </p>
            <p className="leading-relaxed">
              <strong>9.4</strong> User-uploaded content remains the user's property, but a license is granted for service operation.
            </p>
          </CardContent>
        </Card>

        {/* Section 10 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <Shield className="h-5 w-5 text-primary" />
              10. Limitation of Liability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <p className="leading-relaxed">
              <strong>10.1</strong> The Service is provided "as is".
            </p>
            <p className="leading-relaxed">
              <strong>10.2</strong> We are not liable for any direct or indirect loss or damage.
            </p>
            <p className="leading-relaxed">
              <strong>10.3</strong> We are not responsible for third-party APIs or integrations (Meta, WhatsApp, email, payment processors).
            </p>
            <p className="leading-relaxed">
              <strong>10.4</strong> Maximum liability = fees paid within the preceding 30 days.
            </p>
          </CardContent>
        </Card>

        {/* Section 11 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <FileText className="h-5 w-5 text-primary" />
              11. Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <p className="leading-relaxed">
              <strong>11.1</strong> We may send system or service-related messages.
            </p>
            <p className="leading-relaxed">
              <strong>11.2</strong> You may opt out of marketing emails at any time.
            </p>
          </CardContent>
        </Card>

        {/* Section 12 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <FileText className="h-5 w-5 text-primary" />
              12. Governing Law
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <p className="leading-relaxed">
              <strong>12.1</strong> These Terms are governed by the laws of Israel.
            </p>
            <p className="leading-relaxed">
              <strong>12.2</strong> Exclusive jurisdiction: Tel Aviv District Courts.
            </p>
            <p className="leading-relaxed">
              <strong>12.3</strong> Disputes may be resolved via arbitration at our discretion.
            </p>
          </CardContent>
        </Card>

        {/* Section 13 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <CheckCircle className="h-5 w-5 text-primary" />
              13. Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <p className="leading-relaxed">
              <strong>13.1</strong> We may update these Terms periodically.
            </p>
            <p className="leading-relaxed">
              <strong>13.2</strong> Continued use constitutes acceptance of revised Terms.
            </p>
          </CardContent>
        </Card>

        {/* Section 14 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <Shield className="h-5 w-5 text-primary" />
              14. AI-Based Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <p className="leading-relaxed">
              <strong>14.1</strong> The Service includes AI components that may produce incomplete or inaccurate outputs.
            </p>
            <p className="leading-relaxed">
              <strong>14.2</strong> AI content is not professional advice and must be verified by a human reviewer.
            </p>
            <p className="leading-relaxed">
              <strong>14.3</strong> Users must manually approve all AI-generated content before sending or publishing.
            </p>
            <p className="leading-relaxed">
              <strong>14.4</strong> Users are responsible for all input (Prompts) and compliance with rights and privacy laws.
            </p>
            <p className="leading-relaxed">
              <strong>14.5</strong> Automated messaging must comply with anti-spam laws and Meta / GDPR policies.
            </p>
            <p className="leading-relaxed">
              <strong>14.6</strong> AI-4Biz is not liable for third-party service failures or API changes.
            </p>
            <p className="leading-relaxed">
              <strong>14.7</strong> System logs may retain anonymized data for security and improvement.
            </p>
            <p className="leading-relaxed">
              <strong>14.8</strong> Anonymized metadata may be used to enhance algorithms.
            </p>
            <p className="leading-relaxed">
              <strong>14.9</strong> Users receive a non-exclusive license for AI outputs.
            </p>
            <p className="leading-relaxed">
              <strong>14.10</strong> AI-4Biz and its suppliers bear no liability for any AI errors or misuse.
            </p>
            <p className="leading-relaxed">
              <strong>14.11</strong> Beta features may contain limitations or bugs.
            </p>
            <p className="leading-relaxed">
              <strong>14.12</strong> We may pause automations if misuse is suspected.
            </p>
            <p className="leading-relaxed">
              <strong>14.13</strong> Users indemnify AI-4Biz against claims arising from their inputs or AI outputs.
            </p>
          </CardContent>
        </Card>

        {/* Section 15 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-left">
              <FileText className="h-5 w-5 text-primary" />
              15. Credits and Display
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <p className="leading-relaxed">
              © 2025 AI-4Biz – All rights reserved.
            </p>
            <p className="leading-relaxed">
              Powered by iHoogi.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-b from-background to-muted/20 py-10 px-4`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className={`flex justify-between items-center mb-4 ${language === 'he' ? 'flex-row-reverse' : ''}`}>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(-1)}
            >
              {language === 'he' ? (
                <>
                  <ArrowRight className="ml-2 h-4 w-4" />
                  חזור
                </>
              ) : (
                <>
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  Back
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              {language === 'he' ? 'English' : 'עברית'}
            </Button>
          </div>
          
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <img src="/ai-4-biz-logo.svg" alt="Ai-4.BIZ Logo" className="h-20 w-32 object-contain" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              {language === 'he' ? '📜 תקנון ותנאי שימוש – iHoogi / AI-4Biz' : '📜 Terms of Service – iHoogi / AI-4Biz'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'he' ? 'תקנון השימוש בפלטפורמת iHoogi / AI-4Biz' : 'iHoogi / AI-4Biz Platform Usage Terms'}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {language === 'he' ? 'עדכון אחרון: 23 באוקטובר 2025' : 'Last updated: October 23, 2025'}
            </p>
          </div>
        </div>

        {/* Content */}
        {language === 'he' ? renderHebrewContent() : renderEnglishContent()}

        {/* Footer Actions */}
        <div className={`mt-8 flex justify-center gap-4 ${language === 'he' ? 'flex-row-reverse' : ''}`}>
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            size="lg"
          >
            {language === 'he' ? (
              <>
                <ArrowRight className="ml-2 h-4 w-4" />
                חזרה
              </>
            ) : (
              <>
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Back
              </>
            )}
          </Button>
          <Button 
            onClick={() => navigate("/signup")}
            size="lg"
            className="flex items-center gap-2"
          >
            {language === 'he' ? 'המשך להרשמה' : 'Continue to Registration'}
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AI-4Biz {language === 'he' ? 'כל הזכויות שמורות.' : 'All rights reserved.'}</p>
          <p className="mt-2 text-xs">
            {language === 'he' ? 'נוצר באהבה בישראל ❤️' : 'Created with love in Israel ❤️'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;