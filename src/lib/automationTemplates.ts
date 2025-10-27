
type TriggerType = "lead" | "comment";
type ChannelType = "email" | "whatsapp";

export interface Template {
  id: string;
  name: string;
  triggerType: TriggerType;
  channel: ChannelType;
  subject?: string;
  body: string;
  isDefault: boolean;
  htmlBody?: string; // HTML email template
  logoUrl?: string; // User's logo
  profileImageUrl?: string; // User's profile image
  businessName?: string; // Business name
}

// Get user branding from localStorage
export function getUserBranding() {
  try {
    const branding = localStorage.getItem('businessBranding');
    if (branding) {
      return JSON.parse(branding);
    }
  } catch (e) {
    console.error('Failed to load branding', e);
  }
  return {
    logoUrl: "",
    profileImageUrl: "",
    businessName: "העסק שלי"
  };
}

// HTML Email Template Generator
export function generateQuestionnaireThankYouEmail(params: {
  firstName: string;
  businessName: string;
  questionnaireTitle: string;
  logoUrl?: string;
  profileImageUrl?: string;
  personalMessage?: string;
}): string {
  // Get branding or use params
  const branding = getUserBranding();
  const logoUrl = params.logoUrl || branding.logoUrl || "";
  const profileImageUrl = params.profileImageUrl || branding.profileImageUrl || "";
  const businessName = params.businessName || branding.businessName || "";
  return `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: white; border-radius: 20px; padding: 0; box-shadow: 0 20px 60px rgba(0,0,0,0.2); overflow: hidden;">
      
      <!-- Header with User Logo and Profile -->
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center; position: relative;">
        <div style="display: flex; justify-content: center; align-items: center; gap: 15px; margin-bottom: 20px;">
          ${params.logoUrl ? `<img src="${params.logoUrl}" alt="Logo" style="width: 64px; height: 64px; object-contain;">` : ''}
          ${params.profileImageUrl ? `<img src="${params.profileImageUrl}" alt="Profile" style="width: 64px; height: 64px; object-cover;">` : ''}
        </div>
        ${params.businessName ? `<h2 style="color: white; font-size: 20px; margin: 0;">${params.businessName}</h2>` : ''}
        <h1 style="color: white; font-size: 32px; margin: 20px 0 0 0; font-weight: 700; text-shadow: 0 2px 10px rgba(0,0,0,0.1);">תודה רבה!</h1>
        <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin: 10px 0 0 0;">השלמת את השאלון בהצלחה! 🎯</p>
      </div>
      
      <!-- Content -->
      <div style="padding: 40px 30px; direction: rtl; text-align: right;">
        <p style="font-size: 20px; margin-bottom: 15px; color: #1f2937; font-weight: 600;">היי ${params.firstName},</p>
        <p style="font-size: 16px; margin-bottom: 25px; color: #4b5563; line-height: 1.6;">וואו! 🎉 השלמת את השאלון "${params.questionnaireTitle}" בהצלחה! תודה רבה על הזמן והמאמץ שהשקעת.</p>
        
        ${params.personalMessage ? `
        <!-- Personal Message -->
        <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-right: 5px solid #2D66F2; padding: 25px; border-radius: 15px; margin: 30px 0; box-shadow: 0 4px 15px rgba(45, 102, 242, 0.1);">
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <span style="font-size: 32px; margin-left: 15px;">💬</span>
            <h3 style="color: #1e40af; margin: 0; font-size: 20px; font-weight: 700;">מענה אישי</h3>
          </div>
          <div style="background: white; padding: 20px; border-radius: 10px; color: #374151; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${params.personalMessage}</div>
        </div>
        ` : ''}
        
        <!-- Success Box -->
        <div style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); border-right: 5px solid #10b981; padding: 25px; border-radius: 15px; margin: 30px 0;">
          <h3 style="color: #065f46; margin: 0 0 15px 0; font-size: 20px; font-weight: 700;">✅ השאלון הושלם!</h3>
          <div style="background: white; padding: 15px; border-radius: 10px;">
            <p style="margin: 8px 0; color: #374151; font-size: 15px;"><strong style="color: #10b981;">📝 שאלון:</strong> ${params.questionnaireTitle}</p>
            <p style="margin: 8px 0; color: #374151; font-size: 15px;"><strong style="color: #10b981;">📅 תאריך השלמה:</strong> {{completionDate}}</p>
          </div>
        </div>
        
        <p style="font-size: 15px; color: #6b7280; margin-top: 30px; text-align: center; line-height: 1.6;">
          אני תמיד כאן בשבילך! 💙<br>
          ${businessName}
        </p>
      </div>
      
      <!-- Footer -->
      <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-top: 2px solid #e5e7eb; padding: 30px; text-align: center;">
        <p style="color: #9ca3af; font-size: 13px; margin: 10px 0 0 0;">© 2024 iHoogi - הפלטפורמה החכמה ליצירת שאלונים. כל הזכויות שמורות.</p>
      </div>
      
    </div>
  </div>
</body>
</html>`;
}

// HTML Email Template for Reminder
export function generateQuestionnaireReminderEmail(params: {
  firstName: string;
  businessName: string;
  questionnaireTitle: string;
  logoUrl?: string;
  profileImageUrl?: string;
  timeLeft?: string;
}): string {
  // Get branding or use params
  const branding = getUserBranding();
  const logoUrl = params.logoUrl || branding.logoUrl || "";
  const profileImageUrl = params.profileImageUrl || branding.profileImageUrl || "";
  const businessName = params.businessName || branding.businessName || "";
  return `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: white; border-radius: 20px; padding: 0; box-shadow: 0 20px 60px rgba(0,0,0,0.2); overflow: hidden;">
      
      <!-- Header with User Logo and Profile -->
      <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 30px; text-align: center; position: relative;">
        <div style="display: flex; justify-content: center; align-items: center; gap: 15px; margin-bottom: 20px;">
          ${params.logoUrl ? `<img src="${params.logoUrl}" alt="Logo" style="width: 64px; height: 64px; object-contain;">` : ''}
          ${params.profileImageUrl ? `<img src="${params.profileImageUrl}" alt="Profile" style="width: 64px; height: 64px; object-cover;">` : ''}
        </div>
        ${params.businessName ? `<h2 style="color: white; font-size: 20px; margin: 0;">${params.businessName}</h2>` : ''}
        <h1 style="color: white; font-size: 32px; margin: 20px 0 0 0; font-weight: 700;">תזכורת לשאלון</h1>
        <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin: 10px 0 0 0;">השאלון שלך מחכה לך! 🎯</p>
      </div>
      
      <!-- Content -->
      <div style="padding: 40px 30px; direction: rtl; text-align: right;">
        <p style="font-size: 20px; color: #1f2937; font-weight: 600;">היי ${params.firstName},</p>
        <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">לא שכחתי אותך! 😊 השאלון "${params.questionnaireTitle}" עדיין מחכה לתגובה שלך.</p>
        
        <!-- Urgency Box -->
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-right: 5px solid #f59e0b; padding: 25px; border-radius: 15px; margin: 30px 0;">
          <h3 style="color: #92400e; margin: 0 0 15px 0;">⚠️ זמן מוגבל!</h3>
          <div style="background: white; padding: 15px; border-radius: 10px;">
            <p style="color: #92400e; margin: 0;">
              <strong>⏰ ${params.timeLeft || 'השאלון ייסגר בקרוב'}</strong><br>
              אל תפספס את ההזדמנות לתת את הדעה שלך!
            </p>
          </div>
        </div>
        
        <p style="font-size: 15px; color: #6b7280; margin-top: 30px; text-align: center; line-height: 1.6;">
          תמיד כאן בשבילך! 💙<br>
          ${businessName}
        </p>
      </div>
      
      <!-- Footer -->
      <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-top: 2px solid #e5e7eb; padding: 30px; text-align: center;">
        <p style="color: #9ca3af; font-size: 13px; margin: 10px 0 0 0;">© 2024 iHoogi - הפלטפורמה החכמה ליצירת שאלונים. כל הזכויות שמורות.</p>
      </div>
      
    </div>
  </div>
</body>
</html>`;
}

// This will eventually be replaced with actual storage/API calls
let templates: Template[] = [
  {
    id: "1",
    name: "תבנית פנייה חדשה 1",
    triggerType: "lead",
    channel: "email",
    subject: "קיבלנו את פנייתך - {{businessName}}",
    body: "שלום {{firstName}},\n\nתודה שיצרת קשר עם {{businessName}}.\nפנייתך התקבלה ואנו נחזור אליך בהקדם.\n\nבברכה,\n{{businessName}}",
    isDefault: true
  },
  {
    id: "2",
    name: "תבנית פנייה קצרה",
    triggerType: "lead",
    channel: "whatsapp",
    body: "שלום {{firstName}}, תודה שיצרת קשר עם {{businessName}}. פנייתך התקבלה ואנו נחזור אליך בהקדם.",
    isDefault: true
  },
  {
    id: "3",
    name: "תבנית תגובה רגילה",
    triggerType: "comment",
    channel: "email",
    subject: "תודה על התגובה שלך",
    body: "שלום {{firstName}},\n\nתודה על התגובה שלך.\nצוות התוכן שלנו יבחן את התגובה בהקדם.\n\nבברכה,\n{{businessName}}",
    isDefault: true
  },
  {
    id: "4",
    name: "תבנית תגובה וואטסאפ",
    triggerType: "comment",
    channel: "whatsapp",
    body: "שלום {{firstName}}, תודה על התגובה שלך. צוות התוכן שלנו יבחן את התגובה בהקדם.",
    isDefault: true
  }
];

// Helper function to replace variables in template text
export function replaceTemplateVariables(text: string, variables: Record<string, string>): string {
  return Object.entries(variables).reduce((result, [key, value]) => {
    return result.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }, text);
}

const automationTemplates = {
  // Get all templates for a specific trigger type and channel
  get: (triggerType: TriggerType, channel: ChannelType): Template[] => {
    return templates.filter(
      template => template.triggerType === triggerType && template.channel === channel
    );
  },

  // Get the default template for a specific trigger type and channel
  getDefault: (triggerType: TriggerType, channel: ChannelType): Template | undefined => {
    return templates.find(
      template => 
        template.triggerType === triggerType && 
        template.channel === channel && 
        template.isDefault
    );
  },
  
  // Get a template by ID
  getById: (id: string): Template | undefined => {
    return templates.find(template => template.id === id);
  },
  
  // Get all templates
  getAll: (): Template[] => {
    return [...templates];
  },
  
  // Add a new template
  add: (template: Omit<Template, 'id'>): Template => {
    const newTemplate = {
      ...template,
      id: crypto.randomUUID()
    };
    
    // If this template is set as default, unset default for other templates of the same type/channel
    if (newTemplate.isDefault) {
      templates = templates.map(t => 
        t.triggerType === newTemplate.triggerType && t.channel === newTemplate.channel
          ? { ...t, isDefault: false }
          : t
      );
    }
    
    templates.push(newTemplate);
    return newTemplate;
  },
  
  // Update an existing template
  update: (id: string, templateData: Partial<Template>): Template | undefined => {
    const index = templates.findIndex(t => t.id === id);
    if (index === -1) return undefined;
    
    // If this template is being set as default, unset default for other templates of the same type/channel
    if (templateData.isDefault) {
      const currentTemplate = templates[index];
      templates = templates.map(t => 
        t.id !== id && t.triggerType === currentTemplate.triggerType && t.channel === currentTemplate.channel
          ? { ...t, isDefault: false }
          : t
      );
    }
    
    templates[index] = { ...templates[index], ...templateData };
    return templates[index];
  },
  
  // Delete a template
  delete: (id: string): boolean => {
    const initialLength = templates.length;
    templates = templates.filter(t => t.id !== id);
    return templates.length < initialLength;
  },
  
  // Set a template as default
  setDefault: (id: string): Template | undefined => {
    const template = templates.find(t => t.id === id);
    if (!template) return undefined;
    
    // Unset default flag for other templates of the same type/channel
    templates = templates.map(t => 
      t.triggerType === template.triggerType && t.channel === template.channel
        ? { ...t, isDefault: t.id === id }
        : t
    );
    
    return templates.find(t => t.id === id);
  }
};

export default automationTemplates;
