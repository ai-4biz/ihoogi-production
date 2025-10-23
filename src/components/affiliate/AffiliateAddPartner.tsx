
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { Info, PenTool, Trash2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "שם השותף חייב להכיל לפחות 2 תווים",
  }),
  email: z.string().email({
    message: "אנא הכנס כתובת אימייל תקינה",
  }),
  whatsapp: z.string().regex(/^\+?[0-9\s]{10,15}$/, {
    message: "אנא הכנס מספר טלפון תקין",
  }),
  tier: z.enum(["bronze", "silver", "gold"], {
    required_error: "אנא בחר דרגה",
  }),
  referralCode: z.string().min(3, {
    message: "קוד ההפניה חייב להכיל לפחות 3 תווים",
  }),
  isActive: z.boolean().default(true),
  notes: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "יש לקבל את תנאי השותפות",
  }),
  digitalSignature: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AffiliateAddPartner = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [signatureData, setSignatureData] = useState<string>("");
  
  // Generate a random referral code
  const generateReferralCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      tier: "bronze",
      referralCode: generateReferralCode(),
      isActive: true,
      notes: "",
      termsAccepted: false,
      digitalSignature: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast({
        title: "שותף נוסף בהצלחה!",
        description: `השותף ${values.name} נוסף למערכת`,
      });
      setIsSubmitting(false);
      form.reset({
        name: "",
        email: "",
        whatsapp: "",
        tier: "bronze",
        referralCode: generateReferralCode(),
        isActive: true,
        notes: "",
      });
    }, 1000);
  };
  
  const regenerateCode = () => {
    form.setValue("referralCode", generateReferralCode());
  };

  // Digital signature functions
  const handleSignatureComplete = (signature: string) => {
    setSignatureData(signature);
    form.setValue("digitalSignature", signature);
    setShowSignaturePad(false);
    toast({
      title: "חתימה נשמרה",
      description: "החתימה הדיגיטלית נשמרה בהצלחה",
    });
  };

  const clearSignature = () => {
    setSignatureData("");
    form.setValue("digitalSignature", "");
    toast({
      title: "חתימה נמחקה",
      description: "החתימה הדיגיטלית נמחקה",
    });
  };

  return (
    <>
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>הוספת שותף חדש</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>שם מלא</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="הכנס שם מלא" {...field} />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 absolute right-3 top-3 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>הכנס שם מלא של השותף</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>אימייל</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="flex">
                          <Input placeholder="דואר אלקטרוני" {...field} />
                          <span className="absolute left-3 top-3 text-muted-foreground">✉️</span>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 absolute right-3 top-3 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>הכנס כתובת אימייל תקינה</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>מספר וואטסאפ</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="flex">
                          <Input placeholder="מספר טלפון" {...field} />
                          <span className="absolute left-3 top-3 text-muted-foreground">🟢</span>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 absolute right-3 top-3 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>הכנס מספר טלפון בפורמט בינלאומי, למשל: +97250123456</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>דרגה</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="בחר דרגה" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bronze">Bronze</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="referralCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>קוד הפניה</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="קוד הפניה" {...field} />
                      </FormControl>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="icon"
                              onClick={regenerateCode}
                            >
                              🔄
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>צור קוד הפניה חדש</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormDescription>
                      הקוד יופיע בסוף כתובת ההפניה
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        שותף פעיל
                      </FormLabel>
                      <FormDescription>
                        האם השותף פעיל כרגע במערכת?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>הערות</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="הערות לגבי השותף" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    אופציונלי - הוסף הערות או מידע נוסף לגבי השותף
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* תקנון השותפים */}
            <Card className="border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">תקנון השותפים</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <Textarea 
                    placeholder="הכנס כאן את תנאי השותפות והתקנון..."
                    className="min-h-[200px] resize-none"
                    defaultValue="תקנון תוכנית השותפים

1. הגדרות כלליות:
   - השותף מתחייב לפעול בהתאם לתקנון זה
   - כל הפעילות תתבצע באופן מקצועי ואתי
   - השותף יקבל עמלה על פי התנאים המוגדרים

2. עמלות ותשלומים:
   - עמלה של 15% מהמכירות המובילות דרך השותף
   - תשלום חודשי עד ה-15 לחודש
   - סף תשלום מינימלי: 500 ₪

3. חובות השותף:
   - שמירה על סודיות המידע העסקי
   - אי שימוש במידע לרעה
   - דיווח תקין על פעילות השיווק

4. זכויות החברה:
   - ביטול הסכם השותפות בכל עת
   - שינוי תנאי התקנון בהודעה מוקדמת של 30 יום
   - בדיקת פעילות השותף

5. סיום הסכם:
   - כל צד רשאי לסיים את ההסכם בהודעה מוקדמת של 30 יום
   - במקרה של הפרת תנאי התקנון - סיום מיידי"
                    readOnly
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium">
                          אני מקבל את תנאי השותפות והתקנון *
                        </FormLabel>
                        <FormDescription className="text-xs text-gray-500">
                          על ידי סימון זה אתה מאשר שקראת והסכמת לתנאי התקנון
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* חתימה דיגיטלית */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">חתימה דיגיטלית</Label>
                  <div className="space-y-2">
                    {signatureData ? (
                      <div className="border border-gray-200 rounded-lg p-4 bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">חתימה שמורה:</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={clearSignature}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 ml-1" />
                            מחק חתימה
                          </Button>
                        </div>
                        <div className="border border-gray-300 rounded p-2 bg-gray-50">
                          <img 
                            src={signatureData} 
                            alt="חתימה דיגיטלית" 
                            className="max-h-20 mx-auto"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <PenTool className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-3">אין חתימה שמורה</p>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowSignaturePad(true)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <PenTool className="w-4 h-4 ml-1" />
                          הוסף חתימה דיגיטלית
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Button 
              type="submit" 
              className="w-full md:w-auto" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "מוסיף..." : "הוסף שותף"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
    
    {/* חתימה דיגיטלית - Modal */}
    {showSignaturePad && (
      <SignaturePad 
        onComplete={handleSignatureComplete}
        onCancel={() => setShowSignaturePad(false)}
      />
    )}
  </>
  );
};

// קומפוננטה לחתימה דיגיטלית
interface SignaturePadProps {
  onComplete: (signature: string) => void;
  onCancel: () => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onComplete, onCancel }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [hasSignature, setHasSignature] = React.useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // הגדרות Canvas
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      setIsDrawing(true);
      setHasSignature(true);
      
      const rect = canvas.getBoundingClientRect();
      const x = e instanceof MouseEvent ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
      const y = e instanceof MouseEvent ? e.clientY - rect.top : e.touches[0].clientY - rect.top;
      
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e instanceof MouseEvent ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
      const y = e instanceof MouseEvent ? e.clientY - rect.top : e.touches[0].clientY - rect.top;
      
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    // Event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
      
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isDrawing]);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const signatureData = canvas.toDataURL('image/png');
    onComplete(signatureData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4 text-center">חתימה דיגיטלית</h3>
        
        <div className="border-2 border-gray-300 rounded-lg mb-4">
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            className="w-full h-48 cursor-crosshair"
            style={{ touchAction: 'none' }}
          />
        </div>
        
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            onClick={clearSignature}
            disabled={!hasSignature}
          >
            נקה
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
          >
            ביטול
          </Button>
          <Button
            onClick={saveSignature}
            disabled={!hasSignature}
            className="bg-blue-600 hover:bg-blue-700"
          >
            שמור חתימה
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-2">
          השתמש בעכבר או באצבע כדי לחתום
        </p>
      </div>
    </div>
  );
};

export default AffiliateAddPartner;
