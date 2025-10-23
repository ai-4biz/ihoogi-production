
import { Button } from "@/components/ui/button";
import ContentWizard from "@/components/ContentWizard";
import { useNavigate } from "react-router-dom";
import { ArrowRight, User, CreditCard, Headphones } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import HoogiTip from "@/components/HoogiTip";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();

  // Redirect to home page
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  const handleNavigateToInspiration = () => {
    navigate("/content-inspiration");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Main Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🎯 ברוכה הבאה ללוח השליטה שלך</h1>
          <p className="text-lg text-gray-600 mb-6">
            מכאן תוכלי לנהל את כל חלקי המערכת – תוכן, לקוחות, תשלומים ואוטומציות
          </p>
        </div>

        {/* Management Center Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            🔧 מרכז ניהול
            <HoogiTip tip="כאן תוכלי לנווט בין החלקים השונים במערכת" />
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* User Profile Card */}
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4 p-3 bg-blue-100 rounded-full">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">🧑‍💼 פרופיל משתמש</h3>
                    <p className="text-gray-600 mt-2">עדכון פרטים אישיים, סיסמה, שפה מועדפת ועוד</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full" onClick={() => navigate('/profile')}>
                  כניסה לפרופיל
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Billing Management Card */}
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4 p-3 bg-purple-100 rounded-full">
                    <CreditCard className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">💳 ניהול מנוי ותשלומים</h3>
                    <p className="text-gray-600 mt-2">בדיקת סטטוס מנוי, חשבוניות, כרטיס אשראי, שדרוג או ביטול</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full" onClick={() => navigate('/billing')}>
                  צפייה בפרטי מנוי
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Support Card */}
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4 p-3 bg-green-100 rounded-full">
                    <Headphones className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">🛟 תמיכה ובקשות</h3>
                    <p className="text-gray-600 mt-2">שליחת בקשת תמיכה, שאלות נפוצות וצ'אט עם צוות</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full" onClick={() => navigate('/support')}>
                  פנייה לתמיכה
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Content Wizard Section */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <h2 className="text-2xl font-bold mb-4">✨ אשף התוכן</h2>
            <ContentWizard />
            
            <div className="mt-8 flex justify-center">
              <Button 
                onClick={handleNavigateToInspiration}
                className="flex items-center gap-2 text-lg"
                size="lg"
              >
                עבור למסך השראה 
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
