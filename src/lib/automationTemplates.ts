
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
