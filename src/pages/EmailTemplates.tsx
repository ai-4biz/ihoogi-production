import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Save, Eye, Send, Copy, Edit, Plus, Trash2 } from "lucide-react";

interface EmailTemplate {
  id: string;
  name: string;
  type: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[];
  isActive: boolean;
}

const EmailTemplates = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    type: "",
    subject: "",
    htmlContent: "",
    textContent: "",
    variables: [] as string[]
  });

  // Load templates on component mount
  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    // Default email templates
    const defaultTemplates: EmailTemplate[] = [
      {
        id: "1",
        name: "אישור הרשמה",
        type: "registration",
        subject: "ברוכים הבאים ל-Hoogi! 🎉",
        htmlContent: `
          <!DOCTYPE html>
          <html dir="rtl" lang="he">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="background: white; border-radius: 20px; padding: 0; box-shadow: 0 20px 60px rgba(0,0,0,0.2); overflow: hidden;">
                
                <!-- Header with Hoogi Avatar -->
                <div style="background: linear-gradient(135deg, #2D66F2 0%, #1e40af 100%); padding: 40px 30px; text-align: center; position: relative;">
                  <div style="display: inline-block; position: relative;">
                    <img src="/hoogi-new-avatar.png" alt="Hoogi" style="width: 100px; height: 100px; border-radius: 50%; border: 5px solid white; box-shadow: 0 8px 20px rgba(0,0,0,0.2); background: white;">
                    <div style="position: absolute; bottom: -5px; right: -5px; background: #10b981; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white;">
                      <span style="font-size: 16px;">👋</span>
                    </div>
                  </div>
                  <h1 style="color: white; font-size: 32px; margin: 20px 0 0 0; font-weight: 700; text-shadow: 0 2px 10px rgba(0,0,0,0.1);">ברוכים הבאים ל-Hoogi!</h1>
                  <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin: 10px 0 0 0;">הפלטפורמה החכמה ליצירת שאלונים 🚀</p>
                </div>
                
                <!-- Content -->
                <div style="padding: 40px 30px; direction: rtl; text-align: right;">
                  <p style="font-size: 20px; margin-bottom: 15px; color: #1f2937; font-weight: 600;">היי {{userName}},</p>
                  <p style="font-size: 16px; margin-bottom: 25px; color: #4b5563; line-height: 1.6;">תודה רבה שהצטרפת אלינו! 🎉 החשבון שלך נוצר בהצלחה ואני מוכן לעזור לך ליצור שאלונים מדהימים.</p>
                  
                  <!-- Info Box -->
                  <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-right: 5px solid #2D66F2; padding: 25px; border-radius: 15px; margin: 30px 0; box-shadow: 0 4px 15px rgba(45, 102, 242, 0.1);">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                      <span style="font-size: 32px; margin-left: 15px;">👤</span>
                      <h3 style="color: #1e40af; margin: 0; font-size: 20px; font-weight: 700;">פרטי החשבון שלך</h3>
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 10px; margin-top: 15px;">
                      <p style="margin: 8px 0; color: #374151; font-size: 15px;"><strong style="color: #2D66F2;">📧 אימייל:</strong> {{userEmail}}</p>
                      <p style="margin: 8px 0; color: #374151; font-size: 15px;"><strong style="color: #2D66F2;">📅 תאריך הרשמה:</strong> {{registrationDate}}</p>
                    </div>
                  </div>
                  
                  <!-- CTA Button -->
                  <div style="text-align: center; margin: 40px 0;">
                    <a href="{{loginLink}}" style="background: linear-gradient(135deg, #2D66F2 0%, #1e40af 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 30px; font-weight: 700; font-size: 18px; display: inline-block; box-shadow: 0 10px 30px rgba(45, 102, 242, 0.4); transition: transform 0.2s;">
                      🚀 התחל ליצור שאלונים עכשיו
                    </a>
                  </div>
                  
                  <!-- Tips Box -->
                  <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-right: 5px solid #f59e0b; padding: 20px; border-radius: 15px; margin: 30px 0;">
                    <p style="margin: 0; color: #92400e; font-size: 15px; line-height: 1.6;">
                      <strong style="font-size: 16px;">💡 טיפ מהוגי:</strong><br>
                      התחל עם שאלון פשוט ותראה איך אני עוזר לך לקבל תובנות מדהימות מהתגובות! 
                    </p>
                  </div>
                  
                  <p style="font-size: 15px; color: #6b7280; margin-top: 30px; text-align: center; line-height: 1.6;">
                    יש לך שאלות? אני כאן בשבילך! 💬<br>
                    פשוט שלח לי הודעה ואשמח לעזור.
                  </p>
                </div>
                
                <!-- Footer -->
                <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-top: 2px solid #e5e7eb; padding: 30px; text-align: center;">
                  <div style="margin-bottom: 15px;">
                    <a href="{{supportLink}}" style="color: #2D66F2; text-decoration: none; margin: 0 15px; font-size: 14px; font-weight: 600;">📞 תמיכה</a>
                    <a href="{{privacyLink}}" style="color: #2D66F2; text-decoration: none; margin: 0 15px; font-size: 14px; font-weight: 600;">🔒 פרטיות</a>
                  </div>
                  <p style="color: #9ca3af; font-size: 13px; margin: 10px 0 0 0;">© 2024 Hoogi - הפלטפורמה החכמה ליצירת שאלונים. כל הזכויות שמורות.</p>
                  <p style="color: #d1d5db; font-size: 12px; margin: 5px 0 0 0;">נוצר עם ❤️ על ידי צוות Hoogi</p>
                </div>
                
              </div>
            </div>
          </body>
          </html>
        `,
        textContent: `
          ברוכים הבאים ל-Hoogi!
          
          שלום {{userName}},
          
          תודה שהצטרפת אלינו! החשבון שלך נוצר בהצלחה.
          
          פרטי החשבון שלך:
          - אימייל: {{userEmail}}
          - תאריך הרשמה: {{registrationDate}}
          
          התחל ליצור שאלונים: {{loginLink}}
          
          אם יש לך שאלות, אנחנו כאן לעזור!
          
          © 2024 Hoogi. כל הזכויות שמורות.
        `,
        variables: ["userName", "userEmail", "registrationDate", "loginLink", "supportLink", "privacyLink"],
        isActive: true
      },
      {
        id: "2",
        name: "איפוס סיסמה",
        type: "password-reset",
        subject: "איפוס סיסמה - Hoogi",
        htmlContent: `
          <!DOCTYPE html>
          <html dir="rtl" lang="he">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #f43f5e 0%, #be123c 100%);">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="background: white; border-radius: 20px; padding: 0; box-shadow: 0 20px 60px rgba(0,0,0,0.2); overflow: hidden;">
                
                <!-- Header with Hoogi Avatar -->
                <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 40px 30px; text-align: center; position: relative;">
                  <div style="display: inline-block; position: relative;">
                    <img src="/hoogi-new-avatar.png" alt="Hoogi" style="width: 100px; height: 100px; border-radius: 50%; border: 5px solid white; box-shadow: 0 8px 20px rgba(0,0,0,0.2); background: white;">
                    <div style="position: absolute; bottom: -5px; right: -5px; background: #ef4444; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white;">
                      <span style="font-size: 16px;">🔐</span>
                    </div>
                  </div>
                  <h1 style="color: white; font-size: 32px; margin: 20px 0 0 0; font-weight: 700; text-shadow: 0 2px 10px rgba(0,0,0,0.1);">איפוס סיסמה</h1>
                  <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin: 10px 0 0 0;">בקשת איפוס סיסמה לחשבון שלך 🔒</p>
                </div>
                
                <!-- Content -->
                <div style="padding: 40px 30px; direction: rtl; text-align: right;">
                  <p style="font-size: 20px; margin-bottom: 15px; color: #1f2937; font-weight: 600;">היי {{userName}},</p>
                  <p style="font-size: 16px; margin-bottom: 25px; color: #4b5563; line-height: 1.6;">קיבלתי את הבקשה שלך לאיפוס סיסמה. אל דאגה, אני כאן לעזור! 🤝</p>
                  
                  <!-- Warning Box -->
                  <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-right: 5px solid #f59e0b; padding: 25px; border-radius: 15px; margin: 30px 0; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.2);">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                      <span style="font-size: 32px; margin-left: 15px;">⚠️</span>
                      <h3 style="color: #92400e; margin: 0; font-size: 20px; font-weight: 700;">חשוב לדעת!</h3>
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 10px;">
                      <p style="margin: 8px 0; color: #92400e; font-size: 15px; line-height: 1.6;">
                        <strong>🕐 הקישור תקף ל-{{expiryHours}} שעות בלבד</strong><br>
                        אם לא ביקשת איפוס סיסמה, אתה יכול להתעלם מהמייל הזה והסיסמה שלך תישאר ללא שינוי.
                      </p>
                    </div>
                  </div>
                  
                  <!-- CTA Button -->
                  <div style="text-align: center; margin: 40px 0;">
                    <a href="{{resetLink}}" style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 30px; font-weight: 700; font-size: 18px; display: inline-block; box-shadow: 0 10px 30px rgba(220, 38, 38, 0.4);">
                      🔐 אפס את הסיסמה שלך
                    </a>
                  </div>
                  
                  <!-- Link Box -->
                  <div style="background: #f9fafb; border: 2px dashed #d1d5db; padding: 20px; border-radius: 15px; margin: 30px 0;">
                    <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; font-weight: 600;">אם הכפתור לא עובד, העתק את הקישור הזה:</p>
                    <p style="margin: 0; color: #2D66F2; font-size: 12px; word-break: break-all; direction: ltr; text-align: left;">{{resetLink}}</p>
                  </div>
                  
                  <!-- Security Tip -->
                  <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-right: 5px solid #2D66F2; padding: 20px; border-radius: 15px; margin: 30px 0;">
                    <p style="margin: 0; color: #1e40af; font-size: 15px; line-height: 1.6;">
                      <strong style="font-size: 16px;">🛡️ טיפ אבטחה מהוגי:</strong><br>
                      בחר סיסמה חזקה עם אותיות, מספרים וסימנים. אל תשתמש באותה סיסמה באתרים שונים!
                    </p>
                  </div>
                  
                  <p style="font-size: 15px; color: #6b7280; margin-top: 30px; text-align: center; line-height: 1.6;">
                    יש בעיה? אני כאן לעזור! 💪<br>
                    פנה אלינו בכל שאלה.
                  </p>
                </div>
                
                <!-- Footer -->
                <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-top: 2px solid #e5e7eb; padding: 30px; text-align: center;">
                  <p style="color: #9ca3af; font-size: 13px; margin: 10px 0 0 0;">© 2024 Hoogi - הפלטפורמה החכמה ליצירת שאלונים. כל הזכויות שמורות.</p>
                  <p style="color: #d1d5db; font-size: 12px; margin: 5px 0 0 0;">נוצר עם ❤️ על ידי צוות Hoogi</p>
                </div>
                
              </div>
            </div>
          </body>
          </html>
        `,
        textContent: `
          איפוס סיסמה - Hoogi
          
          שלום {{userName}},
          
          קיבלנו בקשה לאיפוס הסיסמה של החשבון שלך.
          
          אם לא ביקשת איפוס סיסמה, אנא התעלם מהמייל הזה.
          הקישור יפוג בעוד {{expiryHours}} שעות.
          
          אפס סיסמה: {{resetLink}}
          
          אם יש לך בעיות עם הקישור, העתק והדבק את הכתובת הבאה בדפדפן:
          {{resetLink}}
          
          © 2024 Hoogi. כל הזכויות שמורות.
        `,
        variables: ["userName", "resetLink", "expiryHours"],
        isActive: true
      },
      {
        id: "3",
        name: "תשובה לתמיכה",
        type: "support-response",
        subject: "תשובה לפנייה שלך - Hoogi Support 💙",
        htmlContent: `
          <!DOCTYPE html>
          <html dir="rtl" lang="he">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="background: white; border-radius: 20px; padding: 0; box-shadow: 0 20px 60px rgba(0,0,0,0.2); overflow: hidden;">
                
                <!-- Header with Hoogi Avatar -->
                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center; position: relative;">
                  <div style="display: inline-block; position: relative;">
                    <img src="/hoogi-new-avatar.png" alt="Hoogi" style="width: 100px; height: 100px; border-radius: 50%; border: 5px solid white; box-shadow: 0 8px 20px rgba(0,0,0,0.2); background: white;">
                    <div style="position: absolute; bottom: -5px; right: -5px; background: #2D66F2; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white;">
                      <span style="font-size: 16px;">💬</span>
                    </div>
                  </div>
                  <h1 style="color: white; font-size: 32px; margin: 20px 0 0 0; font-weight: 700; text-shadow: 0 2px 10px rgba(0,0,0,0.1);">קיבלת תשובה!</h1>
                  <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin: 10px 0 0 0;">עניתי על הפנייה שלך 😊</p>
                </div>
                
                <!-- Content -->
                <div style="padding: 40px 30px; direction: rtl; text-align: right;">
                  <p style="font-size: 20px; margin-bottom: 15px; color: #1f2937; font-weight: 600;">היי {{userName}},</p>
                  <p style="font-size: 16px; margin-bottom: 25px; color: #4b5563; line-height: 1.6;">תודה רבה שפנית אליי! 🙏 עברתי על הפנייה שלך והנה התשובה המלאה.</p>
                  
                  <!-- Ticket Info -->
                  <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border-right: 5px solid #10b981; padding: 25px; border-radius: 15px; margin: 30px 0; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.1);">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                      <span style="font-size: 32px; margin-left: 15px;">📋</span>
                      <h3 style="color: #065f46; margin: 0; font-size: 20px; font-weight: 700;">פרטי הפנייה</h3>
                    </div>
                    <div style="background: white; padding: 15px; border-radius: 10px;">
                      <p style="margin: 8px 0; color: #374151; font-size: 15px;"><strong style="color: #10b981;">🔢 מספר פנייה:</strong> {{ticketNumber}}</p>
                      <p style="margin: 8px 0; color: #374151; font-size: 15px;"><strong style="color: #10b981;">📝 נושא:</strong> {{ticketSubject}}</p>
                      <p style="margin: 8px 0; color: #374151; font-size: 15px;"><strong style="color: #10b981;">📅 תאריך:</strong> {{ticketDate}}</p>
                    </div>
                  </div>
                  
                  <!-- Response Box -->
                  <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-right: 5px solid #2D66F2; padding: 25px; border-radius: 15px; margin: 30px 0; box-shadow: 0 4px 15px rgba(45, 102, 242, 0.1);">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                      <span style="font-size: 32px; margin-left: 15px;">💬</span>
                      <h3 style="color: #1e40af; margin: 0; font-size: 20px; font-weight: 700;">התשובה שלי</h3>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 10px; color: #374151; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">{{supportResponse}}</div>
                  </div>
                  
                  <!-- CTA Button -->
                  <div style="text-align: center; margin: 40px 0;">
                    <a href="{{ticketLink}}" style="background: linear-gradient(135deg, #2D66F2 0%, #1e40af 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 30px; font-weight: 700; font-size: 18px; display: inline-block; box-shadow: 0 10px 30px rgba(45, 102, 242, 0.4);">
                      👀 צפה בפנייה המלאה
                    </a>
                  </div>
                  
                  <!-- Help Box -->
                  <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-right: 5px solid #f59e0b; padding: 20px; border-radius: 15px; margin: 30px 0;">
                    <p style="margin: 0; color: #92400e; font-size: 15px; line-height: 1.6;">
                      <strong style="font-size: 16px;">🤔 עדיין צריך עזרה?</strong><br>
                      אם התשובה לא פתרה את הבעיה שלך, פתח פנייה חדשה ואחזור אליך בהקדם!
                    </p>
                  </div>
                  
                  <p style="font-size: 15px; color: #6b7280; margin-top: 30px; text-align: center; line-height: 1.6;">
                    אני תמיד כאן בשבילך! 💙<br>
                    הוגי, העוזר הווירטואלי שלך
                  </p>
                </div>
                
                <!-- Footer -->
                <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-top: 2px solid #e5e7eb; padding: 30px; text-align: center;">
                  <p style="color: #9ca3af; font-size: 13px; margin: 10px 0 0 0;">© 2024 Hoogi - הפלטפורמה החכמה ליצירת שאלונים. כל הזכויות שמורות.</p>
                  <p style="color: #d1d5db; font-size: 12px; margin: 5px 0 0 0;">נוצר עם ❤️ על ידי צוות Hoogi</p>
                </div>
                
              </div>
            </div>
          </body>
          </html>
        `,
        textContent: `
          תשובה לפנייה שלך - Hoogi Support
          
          שלום {{userName}},
          
          תודה שפנית אלינו! קיבלנו את הפנייה שלך וענינו עליה.
          
          פרטי הפנייה:
          - מספר פנייה: {{ticketNumber}}
          - נושא: {{ticketSubject}}
          - תאריך: {{ticketDate}}
          
          התשובה שלנו:
          {{supportResponse}}
          
          צפה בפנייה המלאה: {{ticketLink}}
          
          אם התשובה לא פתרה את הבעיה שלך, תוכל לפתוח פנייה חדשה.
          
          © 2024 Hoogi. כל הזכויות שמורות.
          צוות התמיכה שלנו כאן לעזור לך! 💙
        `,
        variables: ["userName", "ticketNumber", "ticketSubject", "ticketDate", "supportResponse", "ticketLink"],
        isActive: true
      },
      {
        id: "4",
        name: "הזמנת שותף",
        type: "partner-invitation",
        subject: "הזמנה מיוחדת: הצטרף לשותפים של Hoogi! 🤝",
        htmlContent: `
          <!DOCTYPE html>
          <html dir="rtl" lang="he">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="background: white; border-radius: 20px; padding: 0; box-shadow: 0 20px 60px rgba(0,0,0,0.2); overflow: hidden;">
                
                <!-- Header with Hoogi Avatar -->
                <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 30px; text-align: center; position: relative;">
                  <div style="display: inline-block; position: relative;">
                    <img src="/hoogi-new-avatar.png" alt="Hoogi" style="width: 100px; height: 100px; border-radius: 50%; border: 5px solid white; box-shadow: 0 8px 20px rgba(0,0,0,0.2); background: white;">
                    <div style="position: absolute; bottom: -5px; right: -5px; background: #10b981; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white;">
                      <span style="font-size: 16px;">🤝</span>
                    </div>
                  </div>
                  <h1 style="color: white; font-size: 32px; margin: 20px 0 0 0; font-weight: 700; text-shadow: 0 2px 10px rgba(0,0,0,0.1);">הזמנה מיוחדת!</h1>
                  <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin: 10px 0 0 0;">הצטרף לתוכנית השותפים של Hoogi 💰</p>
                </div>
                
                <!-- Content -->
                <div style="padding: 40px 30px; direction: rtl; text-align: right;">
                  <p style="font-size: 20px; margin-bottom: 15px; color: #1f2937; font-weight: 600;">היי {{partnerName}},</p>
                  <p style="font-size: 16px; margin-bottom: 25px; color: #4b5563; line-height: 1.6;">
                    <strong>{{inviterName}}</strong> הזמין אותך להצטרף לתוכנית השותפים שלנו! 🎉<br>
                    זו הזדמנות מעולה להרוויח יחד איתנו ולהיות חלק מהמהפכה בעולם השאלונים.
                  </p>
                  
                  <!-- Benefits Box -->
                  <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-right: 5px solid #f59e0b; padding: 25px; border-radius: 15px; margin: 30px 0; box-shadow: 0 4px 15px rgba(245, 158, 11, 0.2);">
                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                      <span style="font-size: 32px; margin-left: 15px;">💰</span>
                      <h3 style="color: #92400e; margin: 0; font-size: 20px; font-weight: 700;">למה כדאי להצטרף?</h3>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 10px;">
                      <div style="margin-bottom: 12px; padding: 10px; background: #f9fafb; border-radius: 8px;">
                        <p style="margin: 0; color: #374151; font-size: 15px;">
                          <strong style="color: #f59e0b;">💸 עמלה של {{commissionRate}}%</strong> על כל מכירה שתביא
                        </p>
                      </div>
                      <div style="margin-bottom: 12px; padding: 10px; background: #f9fafb; border-radius: 8px;">
                        <p style="margin: 0; color: #374151; font-size: 15px;">
                          <strong style="color: #f59e0b;">🎨 חומרי שיווק מקצועיים</strong> להצלחה מובטחת
                        </p>
                      </div>
                      <div style="margin-bottom: 12px; padding: 10px; background: #f9fafb; border-radius: 8px;">
                        <p style="margin: 0; color: #374151; font-size: 15px;">
                          <strong style="color: #f59e0b;">🛠️ תמיכה טכנית מלאה</strong> 24/7
                        </p>
                      </div>
                      <div style="padding: 10px; background: #f9fafb; border-radius: 8px;">
                        <p style="margin: 0; color: #374151; font-size: 15px;">
                          <strong style="color: #f59e0b;">📊 דשבורד מתקדם</strong> למעקב אחר כל הרווחים
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- CTA Button -->
                  <div style="text-align: center; margin: 40px 0;">
                    <a href="{{invitationLink}}" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 18px 40px; text-decoration: none; border-radius: 30px; font-weight: 700; font-size: 18px; display: inline-block; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);">
                      🤝 אני רוצה להצטרף!
                    </a>
                  </div>
                  
                  <!-- Urgency Box -->
                  <div style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border-right: 5px solid #ef4444; padding: 20px; border-radius: 15px; margin: 30px 0;">
                    <p style="margin: 0; color: #991b1b; font-size: 15px; line-height: 1.6; text-align: center;">
                      <strong style="font-size: 16px;">⏰ מהר! ההזמנה תפוג בעוד {{expiryDays}} ימים</strong><br>
                      אל תפספס את ההזדמנות הזו!
                    </p>
                  </div>
                  
                  <!-- Info Box -->
                  <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-right: 5px solid #2D66F2; padding: 20px; border-radius: 15px; margin: 30px 0;">
                    <p style="margin: 0; color: #1e40af; font-size: 15px; line-height: 1.6;">
                      <strong style="font-size: 16px;">💡 איך זה עובד?</strong><br>
                      פשוט לחץ על הכפתור, השלם את ההרשמה, וקבל את הקישורים והכלים שלך. תוך דקות תתחיל להרוויח!
                    </p>
                  </div>
                  
                  <p style="font-size: 15px; color: #6b7280; margin-top: 30px; text-align: center; line-height: 1.6;">
                    אשמח לראות אותך בקבוצת השותפים! 🎊<br>
                    הוגי, העוזר החכם שלך
                  </p>
                </div>
                
                <!-- Footer -->
                <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-top: 2px solid #e5e7eb; padding: 30px; text-align: center;">
                  <p style="color: #9ca3af; font-size: 13px; margin: 10px 0 0 0;">© 2024 Hoogi - הפלטפורמה החכמה ליצירת שאלונים. כל הזכויות שמורות.</p>
                  <p style="color: #d1d5db; font-size: 12px; margin: 5px 0 0 0;">נוצר עם ❤️ על ידי צוות Hoogi</p>
                </div>
                
              </div>
            </div>
          </body>
          </html>
        `,
        textContent: `
          הזמנה להצטרף כשותף - Hoogi
          
          שלום {{partnerName}},
          
          {{inviterName}} הזמין אותך להצטרף כשותף בתוכנית השותפים של Hoogi!
          
          יתרונות השותפות:
          - עמלה של {{commissionRate}}% על כל מכירה
          - חומרי שיווק מקצועיים
          - תמיכה טכנית מלאה
          - דשבורד מתקדם למעקב מכירות
          
          הצטרף כשותף: {{invitationLink}}
          
          ההזמנה תפוג בעוד {{expiryDays}} ימים.
          
          © 2024 Hoogi. כל הזכויות שמורות.
        `,
        variables: ["partnerName", "inviterName", "commissionRate", "invitationLink", "expiryDays"],
        isActive: true
      }
    ];
    setTemplates(defaultTemplates);
  };

  const handleSaveTemplate = () => {
    if (!selectedTemplate) return;
    
    setTemplates(prev => 
      prev.map(template => 
        template.id === selectedTemplate.id ? selectedTemplate : template
      )
    );
    
    setIsEditing(false);
    toast({
      title: "✅ התבנית נשמרה בהצלחה",
      description: `התבנית "${selectedTemplate.name}" עודכנה`,
    });
  };

  const handleAddTemplate = () => {
    if (!newTemplate.name || !newTemplate.type || !newTemplate.subject) {
      toast({
        title: "שגיאה",
        description: "יש למלא את כל השדות החובה",
        variant: "destructive",
      });
      return;
    }

    const template: EmailTemplate = {
      id: Date.now().toString(),
      name: newTemplate.name,
      type: newTemplate.type,
      subject: newTemplate.subject,
      htmlContent: newTemplate.htmlContent,
      textContent: newTemplate.textContent,
      variables: newTemplate.variables,
      isActive: true,
    };

    setTemplates(prev => [...prev, template]);
    setNewTemplate({
      name: "",
      type: "",
      subject: "",
      htmlContent: "",
      textContent: "",
      variables: []
    });
    
    toast({
      title: "✅ תבנית חדשה נוספה",
      description: `התבנית "${template.name}" נוספה בהצלחה`,
    });
  };

  const handleDeleteTemplate = (id: string) => {
    const template = templates.find(t => t.id === id);
    if (template) {
      setTemplates(prev => prev.filter(t => t.id !== id));
      if (selectedTemplate?.id === id) {
        setSelectedTemplate(null);
      }
      toast({
        title: "🗑️ התבנית נמחקה",
        description: `התבנית "${template.name}" נמחקה`,
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "📋 הועתק ללוח",
      description: "התוכן הועתק בהצלחה",
    });
  };

  const templateTypes = [
    { value: "registration", label: "אישור הרשמה" },
    { value: "password-reset", label: "איפוס סיסמה" },
    { value: "support-response", label: "תשובה לתמיכה" },
    { value: "partner-invitation", label: "הזמנת שותף" },
    { value: "newsletter", label: "ניוזלטר" },
    { value: "payment-confirmation", label: "אישור תשלום" },
    { value: "custom", label: "מותאם אישית" }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ניהול תבניות מייל</h1>
        <p className="text-gray-600">צור וערוך תבניות מייל מקצועיות עם עיצוב מותאם ללוגו שלך</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Templates List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  📧 תבניות קיימות
                </CardTitle>
                <Button
                  size="sm"
                  onClick={() => setNewTemplate({
                    name: "",
                    type: "",
                    subject: "",
                    htmlContent: "",
                    textContent: "",
                    variables: []
                  })}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedTemplate?.id === template.id
                        ? 'bg-blue-50 border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-sm">{template.name}</h4>
                        <p className="text-xs text-gray-500">{template.subject}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {template.isActive ? 'פעיל' : 'לא פעיל'}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTemplate(template.id);
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Template Editor */}
        <div className="lg:col-span-2">
          {selectedTemplate ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    ✏️ עריכת תבנית: {selectedTemplate.name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPreviewMode(!previewMode)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {previewMode ? 'עריכה' : 'תצוגה מקדימה'}
                    </Button>
                    {!isEditing && (
                      <Button
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        ערוך
                      </Button>
                    )}
                    {isEditing && (
                      <Button
                        size="sm"
                        onClick={handleSaveTemplate}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        שמור
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {previewMode ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">תצוגה מקדימה:</h3>
                      <div 
                        className="border rounded-lg p-4 bg-gray-50"
                        dangerouslySetInnerHTML={{ __html: selectedTemplate.htmlContent }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(selectedTemplate.htmlContent)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        העתק HTML
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(selectedTemplate.textContent)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        העתק טקסט
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="basic">פרטים בסיסיים</TabsTrigger>
                      <TabsTrigger value="html">תוכן HTML</TabsTrigger>
                      <TabsTrigger value="text">תוכן טקסט</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="basic" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="template-name">שם התבנית</Label>
                          <Input
                            id="template-name"
                            value={selectedTemplate.name}
                            onChange={(e) => setSelectedTemplate({
                              ...selectedTemplate,
                              name: e.target.value
                            })}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="template-type">סוג התבנית</Label>
                          <Select
                            value={selectedTemplate.type}
                            onValueChange={(value) => setSelectedTemplate({
                              ...selectedTemplate,
                              type: value
                            })}
                            disabled={!isEditing}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {templateTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="template-subject">נושא המייל</Label>
                        <Input
                          id="template-subject"
                          value={selectedTemplate.subject}
                          onChange={(e) => setSelectedTemplate({
                            ...selectedTemplate,
                            subject: e.target.value
                          })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label>משתנים זמינים</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedTemplate.variables.map((variable) => (
                            <span
                              key={variable}
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                            >
                              {`{{${variable}}}`}
                            </span>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="html" className="space-y-4">
                      <div>
                        <Label htmlFor="html-content">תוכן HTML</Label>
                        <Textarea
                          id="html-content"
                          value={selectedTemplate.htmlContent}
                          onChange={(e) => setSelectedTemplate({
                            ...selectedTemplate,
                            htmlContent: e.target.value
                          })}
                          disabled={!isEditing}
                          rows={20}
                          className="font-mono text-sm"
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="text" className="space-y-4">
                      <div>
                        <Label htmlFor="text-content">תוכן טקסט</Label>
                        <Textarea
                          id="text-content"
                          value={selectedTemplate.textContent}
                          onChange={(e) => setSelectedTemplate({
                            ...selectedTemplate,
                            textContent: e.target.value
                          })}
                          disabled={!isEditing}
                          rows={15}
                          className="font-mono text-sm"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="text-6xl mb-4">📧</div>
                  <h3 className="text-xl font-semibold mb-2">בחר תבנית לעריכה</h3>
                  <p className="text-gray-600">לחץ על תבנית מהרשימה כדי להתחיל לערוך</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailTemplates;
