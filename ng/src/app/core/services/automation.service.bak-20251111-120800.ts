import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { LanguageService } from './language.service';
import { environment } from '../../../environments/environment';

interface AutomationTemplate {
  id: string;
  name: string;
  template_type: 'standard' | 'ai' | 'personal' | 'combined';
  response_type: 'new_customer' | 'reminder';
  channels: string[];
  email_subject?: string;
  message_body?: string;
  custom_ai_message?: string;
  user_id: string;
}

interface QuestionnaireData {
  id: string;
  owner_id: string;
  title: string;
}

interface ResponseData {
  [questionId: string]: any;
}

interface LeadContact {
  name: string;
  email: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutomationService {
  private readonly contactClosingRegex = /\n\n(?:בברכה|תודה(?: רבה)?|להתראות|Thanks|Thank you|Best regards|Regards|Sincerely)[^\n]*/i;

  constructor(
    private supabaseService: SupabaseService,
    private lang: LanguageService
  ) {}

  /**
   * Main entry point for automation execution
   * Called when a questionnaire response is submitted
   * Note: Automation templates are now only configured via distributions, not questionnaires
   */
  async executeAutomation(
    questionnaire: QuestionnaireData,
    responseData: ResponseData,
    questions: any[]
  ): Promise<void> {
    // Automation templates are now only configured via distributions, not questionnaires
    console.log('🤖 [AUTOMATION] Automation execution disabled - templates are managed via distribution hub');
    return;
  }

  /**
   * Load automation template from database
   */
  private async loadAutomationTemplate(templateId: string): Promise<AutomationTemplate | null> {
    try {
      const { data, error } = await this.supabaseService.client
        .from('automation_templates')
        .select('*')
        .eq('id', templateId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error loading automation template:', error);
      return null;
    }
  }

  /**
   * Load owner profile for template variables
   */
  private async loadOwnerProfile(ownerId: string): Promise<any> {
    try {
      const { data, error } = await this.supabaseService.client
        .from('profiles')
        .select('company, email, phone, whatsapp, website, image_url, logo_url')
        .eq('id', ownerId)
        .single();

      if (error) throw error;
      return data || {};
    } catch (error) {
      console.error('Error loading owner profile:', error);
      return {};
    }
  }

  /**
   * Extract contact information from response data
   * Assumes first 3 questions are: name, email, phone
   */
  private extractContactInfo(responseData: ResponseData, questions: any[]): LeadContact {
    const contact: LeadContact = {
      name: '',
      email: ''
    };

    if (questions.length >= 1) {
      const nameValue = responseData[questions[0].id];
      contact.name = Array.isArray(nameValue) ? nameValue.join(', ') : (nameValue || '');
    }

    if (questions.length >= 2) {
      const emailValue = responseData[questions[1].id];
      contact.email = Array.isArray(emailValue) ? emailValue[0] : (emailValue || '');
    }

    if (questions.length >= 3) {
      const phoneValue = responseData[questions[2].id];
      contact.phone = Array.isArray(phoneValue) ? phoneValue[0] : (phoneValue || '');
    }

    return contact;
  }

  /**
   * Replace template variables with actual values
   */
  private replaceVariables(
    template: string,
    contact: LeadContact,
    ownerProfile: any
  ): string {
    return template
      .replace(/\{\{firstName\}\}/g, contact.name.split(' ')[0] || contact.name)
      .replace(/\{\{fullName\}\}/g, contact.name)
      .replace(/\{\{businessName\}\}/g, ownerProfile.company || ownerProfile.email?.split('@')[0] || 'Our Team')
      .replace(/\{\{email\}\}/g, contact.email)
      .replace(/\{\{phone\}\}/g, contact.phone || '');
  }

  /**
   * Generate standard template message
   */
  private async generateStandardMessage(
    contact: LeadContact,
    ownerProfile: any,
    questionnaire: QuestionnaireData,
    channels?: string[] | null
  ): Promise<string> {
    const businessName = ownerProfile.company || ownerProfile.email?.split('@')[0] || 'Our Team';
    const firstName = contact.name.split(' ')[0] || contact.name;

    const message = this.lang.currentLanguage === 'he'
      ? `שלום ${firstName},\n\nתודה שמילאת את השאלון שלנו. פנייתך התקבלה ואנו נחזור אליך בהקדם.\n\nבברכה,\n${businessName}`
      : `Hello ${firstName},\n\nThank you for completing our questionnaire. Your submission has been received and we will get back to you soon.\n\nBest regards,\n${businessName}`;
    return message;
  }

  /**
   * Generate personal template message
   */
  private generatePersonalMessage(
    template: AutomationTemplate,
    contact: LeadContact,
    ownerProfile: any
  ): string {
    const messageBody = template.message_body || 'Thank you for your response!';
    return this.replaceVariables(messageBody, contact, ownerProfile);
  }

  /**
   * Generate AI-powered message based on responses
   */
  private async generateAIMessage(
    template: AutomationTemplate,
    responseData: ResponseData,
    questions: any[],
    contact: LeadContact,
    ownerProfile: any
  ): Promise<string> {
    // TODO: Integrate with your AI service (OpenAI, Claude, etc.)
    // For now, return a placeholder with context

    const businessName = ownerProfile.company || 'Our Team';
    const firstName = contact.name.split(' ')[0] || contact.name;

    // Build context from responses
    let responseContext = '';
    questions.slice(3).forEach(question => { // Skip first 3 (name, email, phone)
      const answer = responseData[question.id];
      if (answer) {
        const answerText = Array.isArray(answer) ? answer.join(', ') : answer;
        responseContext += `\nQ: ${question.question_text}\nA: ${answerText}\n`;
      }
    });

    // Placeholder for AI-generated response
    // In production, this would call an AI API with the custom_ai_message as instructions
    const aiInstructions = template.custom_ai_message || 'Generate a personalized response';

    const message = this.lang.currentLanguage === 'he'
      ? `שלום ${firstName},\n\nתודה על מילוי השאלון. בהתבסס על תשובותיך, אנו ממליצים...\n\n[הודעה מותאמת אישית על פי ${aiInstructions}]\n\nנשמח לעמוד לשירותך,\n${businessName}`
      : `Hello ${firstName},\n\nThank you for completing the questionnaire. Based on your responses, we recommend...\n\n[Personalized message based on ${aiInstructions}]\n\nBest regards,\n${businessName}`;
    return message;
  }

  /**
   * Generate combined AI and personal message
   */
  private async generateCombinedMessage(
    template: AutomationTemplate,
    responseData: ResponseData,
    questions: any[],
    contact: LeadContact,
    ownerProfile: any
  ): Promise<string> {
    const aiPart = await this.generateAIMessage(template, responseData, questions, contact, ownerProfile);
    const personalPart = this.replaceVariables(
      template.message_body || '',
      contact,
      ownerProfile
    );

    // Combine based on AI position (if configured)
    // For now, AI first, then personal
    return `${aiPart}\n\n---\n\n${personalPart}`;
  }

  /**
   * Send message through configured channels
   */
  private async sendThroughChannels(
    channels: string[],
    contact: LeadContact,
    subject: string,
    message: string,
    ownerProfile: any,
    template?: AutomationTemplate | null
  ): Promise<void> {
    const normalizedSubject = subject && subject.trim()
      ? subject.trim()
      : this.lang.t('automations.defaultEmailSubject');

    const payload = this.buildMessagePayload(template ?? null, ownerProfile, message, channels);

    this.debugLog('template.content', payload.templateContent);
    this.debugLog('template.htmlContent', payload.templateHtmlContent);
    this.debugLog('template.contactChannels', payload.templateChannels);
    this.debugLog('profile', ownerProfile);
    this.debugLog('finalEmailHtml', payload.emailHtml);
    this.debugLog('finalEmailText', payload.emailText);
    this.debugLog('finalWhatsappBody', payload.whatsappBody);
    this.debugLog('finalSmsBody', payload.smsBody);

    const sendPromises: Promise<void>[] = [];

    for (const channel of channels) {
      switch (channel) {
        case 'email':
          if (contact.email) {
            sendPromises.push(this.sendEmail(contact.email, normalizedSubject, payload.emailText, payload.emailHtml, ownerProfile));
          }
          break;

        case 'whatsapp':
          if (contact.phone && payload.whatsappBody) {
            sendPromises.push(this.sendWhatsApp(contact.phone, payload.whatsappBody));
          }
          break;

        case 'sms':
        case 'message':
        case 'general':
          if (contact.phone && payload.smsBody) {
            sendPromises.push(this.sendSms(contact.phone, payload.smsBody));
          }
          break;
      }
    }

    await Promise.allSettled(sendPromises);
  }

  private async sendEmail(
    to: string,
    subject: string,
    textBody: string,
    htmlBody: string,
    ownerProfile: any
  ): Promise<void> {
    try {
      console.log('📧 [EMAIL] Preparing to send email...');
      console.log('  To:', to);
      console.log('  Subject:', subject);
      console.log('  ReplyTo:', ownerProfile.email);

      const finalHtml = htmlBody || this.convertTextToHtml(textBody);

      const { data, error } = await this.supabaseService.client.functions.invoke('send-automation-email', {
        body: {
          to,
          subject,
          html: finalHtml,
          text: textBody,
          replyTo: ownerProfile.email
        }
      });

      if (error) {
        console.error('❌ [EMAIL] Error from email function:', error);
        console.log('ℹ️ [EMAIL] Edge Function might not be deployed. Email details:');
        console.log('  To:', to);
        console.log('  Subject:', subject);
        console.log('  Body:', textBody);
        console.log('📝 [EMAIL] To deploy: supabase functions deploy send-automation-email');
        throw error;
      }

      console.log('✅ [EMAIL] Email sent successfully:', data);
    } catch (error: any) {
      console.error('❌ [EMAIL] Error sending email:', error);
      console.log('ℹ️ [EMAIL] Email that would have been sent:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('To:', to);
      console.log('Subject:', subject);
      console.log('ReplyTo:', ownerProfile.email);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(textBody);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
  }

  private async sendWhatsApp(phone: string, message: string): Promise<void> {
    try {
      console.log('WhatsApp would be sent to:', phone);
      console.log('Message:', message);
    } catch (error) {
      console.error('Error sending WhatsApp:', error);
    }
  }

  private async sendSms(phone: string, message: string): Promise<void> {
    try {
      console.log('SMS would be sent to:', phone);
      console.log('Message:', message);
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  }

  private buildMessagePayload(
    template: AutomationTemplate | null,
    ownerProfile: any,
    processedText: string,
    selectedChannels: string[]
  ): {
    emailText: string;
    emailHtml: string;
    whatsappBody: string;
    smsBody: string;
    templateContent: string;
    templateHtmlContent: string;
    templateChannels: string[];
  } {
    const templateContent = this.extractTemplateContent(template, processedText);
    const templateHtmlContent = this.extractTemplateHtmlContent(template);
    const templateChannels = this.extractTemplateChannels(template, selectedChannels);

    const contactBlock = this.buildContactBlock(ownerProfile, templateChannels);
    const contactBlockText = contactBlock?.text ?? '';
    const contactBlockHtml = contactBlock?.html ?? '';

    const baseText = processedText?.trim() || templateContent;
    const emailText = this.buildEmailText(baseText, contactBlockText);
    const emailHtml = this.buildEmailHtml(templateHtmlContent, contactBlockHtml, contactBlockText, emailText);
    const whatsappBody = this.buildWhatsappBody(baseText, contactBlockText, templateChannels);
    const smsBody = this.buildSmsBody(baseText, contactBlockText, templateChannels);

    return {
      emailText,
      emailHtml,
      whatsappBody,
      smsBody,
      templateContent,
      templateHtmlContent,
      templateChannels
    };
  }

  private extractTemplateContent(template: AutomationTemplate | null, fallback: string): string {
    const raw = (template as any)?.content
      ?? (template as any)?.message_body
      ?? (template as any)?.body
      ?? fallback;
    return typeof raw === 'string' && raw.trim() ? raw.trim() : (fallback || '');
  }

  private extractTemplateHtmlContent(template: AutomationTemplate | null): string {
    const raw = (template as any)?.htmlContent ?? (template as any)?.html_content;
    return typeof raw === 'string' && raw.trim() ? raw.trim() : '';
  }

  private extractTemplateChannels(template: AutomationTemplate | null, selectedChannels: string[]): string[] {
    const source = (template as any)?.contactChannels ?? (template as any)?.channels;
    if (Array.isArray(source) && source.length) {
      return source.filter((ch: any) => typeof ch === 'string').map((ch: string) => ch.toLowerCase());
    }
    return selectedChannels.map(ch => ch.toLowerCase());
  }

  private buildEmailHtml(
    baseHtml: string,
    contactBlockHtml: string,
    contactBlockText: string,
    fallbackText: string
  ): string {
    if (!baseHtml && !fallbackText) {
      return contactBlockHtml || '';
    }

    let html = baseHtml || this.convertTextToHtml(fallbackText);

    if (!contactBlockHtml && contactBlockText) {
      contactBlockHtml = this.convertTextToHtml(contactBlockText);
    }

    if (!contactBlockHtml) {
      return html;
    }

    if (html.includes(contactBlockHtml) || (contactBlockText && html.includes(contactBlockText))) {
      return html;
    }

    return this.insertContactBlockHtml(html, contactBlockHtml);
  }

  private buildEmailText(baseText: string, contactBlockText: string): string {
    const text = baseText || '';
    if (!contactBlockText || text.includes(contactBlockText.trim())) {
      return text;
    }
    return this.insertContactBlock(text, contactBlockText);
  }

  private buildWhatsappBody(baseText: string, contactBlockText: string, channels: string[]): string {
    if (!channels.includes('whatsapp')) {
      return baseText;
    }
    return this.buildEmailText(baseText, contactBlockText);
  }

  private buildSmsBody(baseText: string, contactBlockText: string, channels: string[]): string {
    if (!channels.includes('sms') && !channels.includes('message') && !channels.includes('general')) {
      return baseText;
    }
    return this.buildEmailText(baseText, contactBlockText);
  }

  private buildContactBlock(ownerProfile: any, channels?: string[] | null): { text: string; html: string } | null {
    const channelList = Array.isArray(channels) ? channels : ['email', 'whatsapp', 'sms'];
    const activeChannels = new Set(
      channelList.map(ch => ch as 'email' | 'whatsapp' | 'sms')
    );

    const items: Array<{ icon: string; label: string; href?: string; display: string }> = [];
    const header = this.lang.t('automations.contactBlockTitle') || 'Contact the Business Owner';
    const emailValue = typeof ownerProfile?.email === 'string' ? ownerProfile.email.trim() : '';
    const phoneValue = typeof ownerProfile?.phone === 'string' ? ownerProfile.phone.trim() : '';
    const whatsappRaw = typeof ownerProfile?.whatsapp === 'string' ? ownerProfile.whatsapp.trim() : '';

    if (activeChannels.has('email') && emailValue) {
      const label = this.lang.t('automations.contactEmailLabel') || 'Email';
      items.push({
        icon: '📧',
        label,
        href: `mailto:${emailValue}`,
        display: emailValue
      });
    }

    if (activeChannels.has('sms') && phoneValue) {
      const label = this.lang.t('automations.contactPhoneLabel') || 'Phone';
      const sanitizedPhone = this.sanitizePhoneNumber(phoneValue);
      if (sanitizedPhone) {
        items.push({
          icon: '📞',
          label,
          href: `tel:${sanitizedPhone}`,
          display: sanitizedPhone
        });
      }
    }

    const whatsappDigits = this.sanitizePhoneNumber(whatsappRaw || phoneValue);
    if (activeChannels.has('whatsapp') && whatsappDigits) {
      const label = this.lang.t('automations.contactWhatsappLabel') || 'WhatsApp';
      items.push({
        icon: '💬',
        label,
        href: `https://wa.me/${whatsappDigits}`,
        display: whatsappDigits
      });
    }

    if (!items.length) {
      return null;
    }

    const textLines = items.map(item => `${item.icon} ${item.label}: ${item.display}`);
    const textBlock = `${header}\n${textLines.join('\n')}`;

    const isRTL = this.lang.currentLanguage === 'he';
    const align = isRTL ? 'right' : 'left';
    const direction = isRTL ? 'rtl' : 'ltr';
    const justifyContent = isRTL ? 'flex-end' : 'flex-start';

    const itemsHtml = items.map(item => {
      const content = item.href
        ? `<a href="${item.href}" style="color:#047857;text-decoration:none;font-weight:500;">${this.escapeHtml(item.display)}</a>`
        : `<span style="color:#047857;font-weight:500;">${this.escapeHtml(item.display)}</span>`;
      return `
        <div style="display:flex;align-items:center;gap:8px;justify-content:${justifyContent};font-size:14px;margin-bottom:8px;">
          <span style="font-size:16px;">${item.icon}</span>
          <span style="color:#047857;">${this.escapeHtml(item.label)}:&nbsp;${content}</span>
        </div>`;
    }).join('');

    const htmlBlock = `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:16px;">
        <tr>
          <td style="background:linear-gradient(135deg,#ECFDF5,#D1FAE5);border:1px solid rgba(16,185,129,0.2);border-radius:12px;padding:20px;">
            <div style="font-family:'Segoe UI',Arial,sans-serif;direction:${direction};text-align:${align};">
              <div style="font-size:16px;font-weight:600;color:#047857;margin-bottom:12px;">${this.escapeHtml(header)}</div>
              ${itemsHtml}
            </div>
          </td>
        </tr>
      </table>`;

    return {
      text: textBlock,
      html: htmlBlock
    };
  }

  private insertContactBlock(message: string, blockText: string): string {
    const trimmedMessage = message.trimEnd();
    const match = this.contactClosingRegex.exec(trimmedMessage);

    if (match && match.index !== undefined) {
      const insertionIndex = match.index;
      const before = trimmedMessage.slice(0, insertionIndex).trimEnd();
      const closing = trimmedMessage.slice(insertionIndex).replace(/^\s+/, '\n\n');
      const separator = closing.startsWith('\n\n') ? '' : '\n\n';
      return `${before}\n\n${blockText}${separator}${closing}`;
    }

    return `${trimmedMessage}\n\n${blockText}`;
  }

  private insertContactBlockHtml(html: string, blockHtml: string): string {
    const closingRegex = /(בברכה|תודה(?: רבה)?|Thanks|Thank you|Best regards|Regards|Sincerely)/i;
    const match = closingRegex.exec(html);

    if (match && match.index !== undefined) {
      const insertionIndex = match.index;
      return `${html.slice(0, insertionIndex)}${blockHtml}${html.slice(insertionIndex)}`;
    }

    return html + blockHtml;
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  private convertTextToHtml(text: string): string {
    return text.replace(/\n/g, '<br>');
  }

  private sanitizePhoneNumber(value: string): string {
    return value ? value.replace(/\D/g, '') : '';
  }

  private debugLog(label: string, value: any) {
    if (environment.production) {
      return;
    }
    console.log(`>>> DEBUG: ${label} =`, value);
  }
}
