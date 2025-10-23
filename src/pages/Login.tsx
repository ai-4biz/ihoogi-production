import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'forgot' | 'change'>('login');

  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Forgot state
  const [resetEmail, setResetEmail] = useState("");

  // Change password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  useEffect(() => {
    document.title = "iHoogi – התחברות";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "התחברות ל-iHoogi – כניסה מהירה, שכחתי סיסמה והחלפת סיסמה");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("התחברת בהצלחה!");
    navigate("/my-hoogi");
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("נשלח אליך מייל לאיפוס סיסמה");
    setMode('login');
    setResetEmail("");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("הסיסמה החדשה חייבת להכיל לפחות 6 תווים");
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      toast.error("הסיסמאות אינן תואמות");
      return;
    }
    toast.success("הסיסמה הוחלפה בהצלחה");
    setMode('login');
    setCurrentPassword("");
    setNewPassword("");
    setNewPasswordConfirm("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-10 px-4 animate-fade-in">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/hoogi-new-avatar.png" alt="לוגו iHoogi" className="h-24 w-24 object-contain animate-fade-in" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            התחברות ל-<span className="text-primary">iHoogi</span>
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 justify-center mb-4" role="tablist" aria-label="login options">
          <Button variant={mode === 'login' ? 'default' : 'outline'} className="h-10" onClick={() => setMode('login')} aria-selected={mode==='login'}>
            התחברות
          </Button>
          <Button variant={mode === 'forgot' ? 'default' : 'outline'} className="h-10" onClick={() => setMode('forgot')} aria-selected={mode==='forgot'}>
            שכחתי סיסמה
          </Button>
          <Button variant={mode === 'change' ? 'default' : 'outline'} className="h-10" onClick={() => setMode('change')} aria-selected={mode==='change'}>
            החלפת סיסמה
          </Button>
        </div>

        {/* Login */}
        {mode === 'login' && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="block text-right">מייל</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-right" required placeholder="example@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="block text-right">סיסמה</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-right" required placeholder="הזן סיסמה" />
              </div>
              <div className="text-right">
                <Button type="button" variant="link" className="text-sm text-primary hover:underline p-0 h-auto" onClick={() => setMode('forgot')}>
                  שכחתי סיסמה
                </Button>
              </div>
              <Button type="submit" className="w-full h-12 text-lg font-semibold" size="lg">התחבר</Button>
              <Button type="button" variant="outline" className="w-full h-12 text-lg font-semibold" size="lg" onClick={() => navigate('/signup')}>
                עדיין לא רשום/ה? הירשם/י
              </Button>
            </form>
          </div>
        )}

        {/* Forgot */}
        {mode === 'forgot' && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-center mb-4">איפוס סיסמה</h2>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resetEmail" className="block text-right">מייל</Label>
                <Input id="resetEmail" type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} className="text-right" required placeholder="example@email.com" />
                <p className="text-xs text-muted-foreground text-right">נשלח אליך מייל עם קישור לאיפוס הסיסמה</p>
              </div>
              <Button type="submit" className="w-full h-12 text-lg font-semibold" size="lg">שלח קישור לאיפוס</Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => setMode('login')}>חזרה להתחברות</Button>
            </form>
          </div>
        )}

        {/* Change */}
        {mode === 'change' && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-center mb-4">החלפת סיסמה</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="changeEmail" className="block text-right">מייל</Label>
                <Input id="changeEmail" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="text-right" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="block text-right">סיסמה נוכחית</Label>
                <Input id="currentPassword" type="password" value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)} className="text-right" required />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="block text-right">סיסמה חדשה</Label>
                  <Input id="newPassword" type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="text-right" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPasswordConfirm" className="block text-right">אימות סיסמה</Label>
                  <Input id="newPasswordConfirm" type="password" value={newPasswordConfirm} onChange={(e)=>setNewPasswordConfirm(e.target.value)} className="text-right" required />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 text-lg font-semibold" size="lg">שנה סיסמה</Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => setMode('login')}>חזרה להתחברות</Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
