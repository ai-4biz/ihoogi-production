
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
  businessImageUrl?: string;
  linkUrl?: string;
  linkText?: string;
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
      
      <!-- Top Banner: iHoogi Logo + User Business Branding + Message -->
      <div style="background: linear-gradient(to left, #10b98120 0%, #10b98110 100%); padding: 30px; display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #10b98140;">
        <!-- Right Side: User Business Branding -->
        <div style="display: flex; align-items: center; gap: 12px;">
          ${logoUrl ? `<img src="${logoUrl}" alt="Logo" style="width: 48px; height: 48px; object-fit: contain;">` : ''}
          ${profileImageUrl ? `<img src="${profileImageUrl}" alt="Profile" style="width: 48px; height: 48px; object-fit: cover; border-radius: 8px;">` : ''}
        </div>
        
        <!-- Center: Business Name + Message -->
        <div style="text-align: center; flex: 1;">
          ${businessName ? `<h2 style="font-size: 20px; color: #10b981; font-weight: bold; margin: 0 0 5px 0;">${businessName}</h2>` : ''}
          <p style="font-size: 16px; color: #059669; font-weight: 600; margin: 0;">פנייתך התקבלה – הצוות שלנו כבר מטפל בה.</p>
        </div>
        
        <!-- Left Side: iHoogi Logo -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="https://raw.githubusercontent.com/ihoogi/assets/main/hoogi-new-avatar.png" alt="iHoogi" style="width: 60px; height: 60px; object-fit: contain;">
          <span style="font-size: 14px; color: white; font-weight: 700;">🦉 שלום מ-iHoogi</span>
        </div>
      </div>
      
      <!-- Business Image -->
      ${params.businessImageUrl ? `
      <div style="padding: 20px 30px; border-bottom: 1px solid #e5e7eb;">
        <img src="${params.businessImageUrl}" alt="Business Image" style="width: 100%; height: auto; border-radius: 12px; object-fit: cover;">
      </div>
      ` : ''}
      
      <!-- Link -->
      ${params.linkUrl ? `
      <div style="padding: 20px 30px; text-align: center; border-bottom: 1px solid #e5e7eb;">
        <a href="${params.linkUrl}" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
          ${params.linkText || "לצפייה"}
        </a>
      </div>
      ` : ''}
      
      <!-- Content -->
      <div style="padding: 30px; direction: rtl; text-align: right;">
        <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">תודה רבה על המענה ושהקדשת את הזמן! 👍</p>
      </div>
      
      <!-- Bottom Banner: Logo + Business Details + Signature -->
      <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-top: 2px solid #e5e7eb; padding: 30px; display: flex; align-items: center; justify-content: space-between; direction: rtl;">
        ${logoUrl ? `<img src="${logoUrl}" alt="Logo" style="width: 48px; height: 48px; object-contain;">` : '<div style="width: 48px; height: 48px;"></div>'}
        <div style="text-align: center; direction: rtl;">
          ${businessName ? `<p style="color: #1f2937; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">${businessName}</p>` : ''}
          <p style="color: #059669; font-size: 15px; font-weight: 600; margin: 0;">בברכה</p>
        </div>
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
  businessImageUrl?: string;
  linkUrl?: string;
  linkText?: string;
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
      
      <!-- Top Banner: iHoogi Logo + User Business Branding + Message -->
      <div style="background: linear-gradient(to left, #10b98120 0%, #10b98110 100%); padding: 30px; display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #10b98140;">
        <!-- Right Side: User Business Branding -->
        <div style="display: flex; align-items: center; gap: 12px;">
          ${logoUrl ? `<img src="${logoUrl}" alt="Logo" style="width: 48px; height: 48px; object-fit: contain;">` : ''}
          ${profileImageUrl ? `<img src="${profileImageUrl}" alt="Profile" style="width: 48px; height: 48px; object-fit: cover; border-radius: 8px;">` : ''}
        </div>
        
        <!-- Center: Business Name + Message -->
        <div style="text-align: center; flex: 1;">
          ${businessName ? `<h2 style="font-size: 20px; color: #10b981; font-weight: bold; margin: 0 0 5px 0;">${businessName}</h2>` : ''}
          <p style="font-size: 16px; color: #059669; font-weight: 600; margin: 0;">תזכורת</p>
        </div>
        
        <!-- Left Side: iHoogi Logo -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="https://raw.githubusercontent.com/ihoogi/assets/main/hoogi-new-avatar.png" alt="iHoogi" style="width: 60px; height: 60px; object-fit: contain;">
          <span style="font-size: 14px; color: white; font-weight: 700;">🦉 תזכורת מ-iHoogi</span>
        </div>
      </div>
      
      <!-- Business Image -->
      ${params.businessImageUrl ? `
      <div style="padding: 20px 30px; border-bottom: 1px solid #e5e7eb;">
        <img src="${params.businessImageUrl}" alt="Business Image" style="width: 100%; height: auto; border-radius: 12px; object-fit: cover;">
      </div>
      ` : ''}
      
      <!-- Link -->
      ${params.linkUrl ? `
      <div style="padding: 20px 30px; text-align: center; border-bottom: 1px solid #e5e7eb;">
        <a href="${params.linkUrl}" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
          ${params.linkText || "לצפייה"}
        </a>
      </div>
      ` : ''}
      
      <!-- Content -->
      <div style="padding: 30px; direction: rtl; text-align: right;">
        <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">השאלון "${params.questionnaireTitle}" עדיין מחכה לתגובה שלך.</p>
      </div>
      
      <!-- Bottom Banner: Logo + Business Details + Signature -->
      <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-top: 2px solid #e5e7eb; padding: 30px; display: flex; align-items: center; justify-content: space-between; direction: rtl;">
        ${logoUrl ? `<img src="${logoUrl}" alt="Logo" style="width: 48px; height: 48px; object-contain;">` : '<div style="width: 48px; height: 48px;"></div>'}
        <div style="text-align: center; direction: rtl;">
          ${businessName ? `<p style="color: #1f2937; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">${businessName}</p>` : ''}
          <p style="color: #059669; font-size: 15px; font-weight: 600; margin: 0;">בברכה</p>
        </div>
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
