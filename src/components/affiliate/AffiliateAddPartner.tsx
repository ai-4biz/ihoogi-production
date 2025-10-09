
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
import { Info } from "lucide-react";

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
});

type FormValues = z.infer<typeof formSchema>;

const AffiliateAddPartner = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  return (
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
  );
};

export default AffiliateAddPartner;
