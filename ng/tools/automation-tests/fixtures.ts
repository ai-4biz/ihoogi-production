export interface TemplateFixture {
  id: string;
  name: string;
  message_body: string;
  body?: string;
  content?: string;
  htmlContent?: string;
  html_content?: string;
  contactChannels?: string[];
  channels?: string[];
  subject?: string;
}

export interface ProfileFixture {
  company: string;
  email: string;
  phone: string;
  whatsapp: string;
}

export interface ContactFixture {
  name: string;
  email: string;
  phone: string;
}

export interface ScenarioDefinition {
  id: string;
  title: string;
  channels: string[];
}

export interface ScenarioFixture {
  definition: ScenarioDefinition;
  template: TemplateFixture;
  profile: ProfileFixture;
  contact: ContactFixture;
}

const baseTemplate: TemplateFixture = {
  id: 'tmpl-001',
  name: 'Welcome Reply',
  message_body: [
    'שלום {{fullName}},',
    'תודה רבה על מילוי הטופס. אנחנו מתרגשים להתחיל לעבוד יחד!',
    '',
    'בברכה,',
    'צוות רונה'
  ].join('\n'),
  htmlContent: [
    '<p>שלום {{fullName}},</p>',
    '<p>תודה רבה על מילוי הטופס. אנחנו מתרגשים להתחיל לעבוד יחד!</p>',
    '<p>בברכה,<br>צוות רונה</p>'
  ].join('\n'),
  subject: 'תודה שמילאת את השאלון'
};

const baseProfile: ProfileFixture = {
  company: 'סטודיו רונה',
  email: 'owner@example.com',
  phone: '+972-50-123-4567',
  whatsapp: '+972-52-987-6543'
};

const baseContact: ContactFixture = {
  name: 'עדי כהן',
  email: 'adi@example.com',
  phone: '+972-54-765-4321'
};

export const scenarios: ScenarioDefinition[] = [
  { id: 'scenario-a', title: 'No channels selected', channels: [] },
  { id: 'scenario-b', title: 'Email only', channels: ['email'] },
  { id: 'scenario-c', title: 'WhatsApp only', channels: ['whatsapp'] },
  { id: 'scenario-d', title: 'SMS only', channels: ['sms'] },
  { id: 'scenario-e', title: 'Email + WhatsApp', channels: ['email', 'whatsapp'] },
  { id: 'scenario-f', title: 'Email + SMS', channels: ['email', 'sms'] },
  { id: 'scenario-g', title: 'WhatsApp + SMS', channels: ['whatsapp', 'sms'] },
  { id: 'scenario-h', title: 'All channels', channels: ['email', 'whatsapp', 'sms'] }
];

export function buildScenarioFixtures(): ScenarioFixture[] {
  return scenarios.map(definition => ({
    definition,
    template: {
      ...baseTemplate,
      content: baseTemplate.message_body,
      body: baseTemplate.message_body,
      html_content: baseTemplate.htmlContent,
      contactChannels: definition.channels,
      channels: definition.channels
    },
    profile: { ...baseProfile },
    contact: { ...baseContact }
  }));
}

