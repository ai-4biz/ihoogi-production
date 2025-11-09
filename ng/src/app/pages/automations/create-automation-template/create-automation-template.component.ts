import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';
import { SupabaseService } from '../../../core/services/supabase.service';
import { ToastService } from '../../../core/services/toast.service';
import { BusinessContactSettingsService } from '../../../services/business-contact-settings.service';

interface TemplateForm {
  name: string;
  subject: string;
  body: string;
  aiResponse: string;
  personalMessagePosition: 'above' | 'below';
  messageLength: 'short' | 'medium' | 'long';
  includeReminder: boolean;
  reminderDays?: number;
  reminderTime?: string;
  reminderStatus?: string;
  reminderSubStatus?: string;
  imageUrl?: string;
  linkUrl?: string;
  uploadedImage?: File;
  useProfileLogo?: boolean;
  useProfileImage?: boolean;
  reminderFrequency?: 'every-few-days' | 'custom-days';
}

@Component({
  selector: 'app-create-automation-template',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-automation-template.component.html',
  styleUrls: ['./create-automation-template.component.sass']
})
export class CreateAutomationTemplateComponent implements OnInit {
  formData: TemplateForm = {
    name: '',
    subject: '',
    body: '',
    aiResponse: '',
    personalMessagePosition: 'below',
    messageLength: 'medium',
    includeReminder: false,
    reminderDays: 3,
    reminderTime: '',
    reminderStatus: '',
    reminderSubStatus: '',
    imageUrl: '',
    linkUrl: '',
    useProfileLogo: true,
    useProfileImage: true,
    reminderFrequency: 'custom-days'
  };

  isTextareaEnabled = false;
  previewChannel: 'email' | 'whatsapp' = 'email';
  saving = false;
  editMode = false;
  templateId?: string;
  selectedResponseType: 'ai' | 'personal' | null = 'personal';
  profileLogoUrl = '';
  profileImageUrl = '';
  cachedAIResponse: string = '';
  cachedMessageLength: 'short' | 'medium' | 'long' = 'medium';
  contactSettingsLoading = false;
  contactSettings = {
    return_email: '',
    return_phone: '',
    return_whatsapp: '',
    enabled_channels: ['email'] as string[]
  };
  private profileContactDefaults = {
    email: '',
    phone: '',
    whatsapp: ''
  };
  readonly contactChannels = [
    { id: 'email', label: 'מייל', icon: '📧' },
    { id: 'sms', label: 'SMS', icon: '📱' },
    { id: 'whatsapp', label: 'וואטסאפ', icon: '💬' }
  ];

  constructor(
    public lang: LanguageService,
    private supabase: SupabaseService,
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private businessContactSettingsService: BusinessContactSettingsService
  ) {}

  ngOnInit() {
    // Check if we're in edit mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.templateId = params['id'];
        this.loadTemplate(params['id']);
      }
    });

    this.loadUserProfile();
    this.loadBusinessContactSettings();
  }

  async loadBusinessContactSettings() {
    try {
      const user = this.supabase.currentUser;
      if (!user) {
        return;
      }

      this.contactSettingsLoading = true;
      const existing = await this.businessContactSettingsService.getByBusinessId(user.id);

      this.contactSettings = {
        return_email: existing?.return_email ?? this.profileContactDefaults.email,
        return_phone: existing?.return_phone ?? this.profileContactDefaults.phone,
        return_whatsapp: existing?.return_whatsapp ?? this.profileContactDefaults.whatsapp,
        enabled_channels: Array.isArray(existing?.enabled_channels) && existing.enabled_channels.length
          ? [...existing.enabled_channels]
          : this.getDefaultChannelsFromProfile()
      };

      this.applyProfileDefaultsToContactSettings();
    } catch (error) {
      console.error('Error loading business contact settings:', error);
      this.toast.show('לא ניתן היה לטעון את הגדרות המענה ללקוח', 'error');
    } finally {
      this.contactSettingsLoading = false;
    }
  }

  async loadTemplate(id: string) {
    try {
      const { data, error } = await this.supabase.client
        .from('automation_templates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        console.log('Loading template data:', data);

        // Map database fields to form fields
        this.formData = {
          name: data.name || '',
          subject: data.subject || '',
          body: data.body || '',
          aiResponse: '',
          personalMessagePosition: 'below',
          messageLength: data.ai_message_length || 'medium',
          includeReminder: data.include_reminder || false,
          reminderDays: data.reminder_days || 3,
          reminderTime: data.reminder_time || '',
          reminderStatus: data.reminder_status || '',
          reminderSubStatus: data.reminder_sub_status || '',
          useProfileLogo: data.use_profile_logo !== false,
          useProfileImage: data.use_profile_image !== false,
          linkUrl: data.link_url || '',
          imageUrl: data.image_url || '',
          reminderFrequency: 'custom-days'
        };

        console.log('Mapped form data:', this.formData);

        // Enable textarea if there's content
        if (this.formData.body) {
          this.isTextareaEnabled = true;
        }

        // Set response type based on message_type field
        this.selectedResponseType = data.message_type || 'personal';

        this.toast.show(this.lang.t('automations.templateLoadedForEditing'), 'success');
      }
    } catch (e: any) {
      console.error('Error loading template:', e);
      this.toast.show(this.lang.t('errors.loadTemplates'), 'error');
    }
  }

  async loadUserProfile() {
    try {
      const user = this.supabase.currentUser;
      if (!user) return;

      const { data, error } = await this.supabase.client
        .from('profiles')
        .select('logo_url, image_url, email, phone, whatsapp')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        this.profileLogoUrl = data.logo_url || '';
        this.profileImageUrl = data.image_url || '';
        this.profileContactDefaults = {
          email: data.email || '',
          phone: data.phone || '',
          whatsapp: data.whatsapp || ''
        };
        this.applyProfileDefaultsToContactSettings();
      }
    } catch (e) {
      console.error('Error loading profile:', e);
    }
  }

  getMessageLengthDescription(length: string): string {
    switch (length) {
      case 'short': return 'הודעה קצרה (1-2 משפטים)';
      case 'medium': return 'הודעה בינונית (3-4 משפטים)';
      case 'long': return 'הודעה ארוכה (5+ משפטים)';
      default: return '';
    }
  }

  getLeadStatusOptions() {
    return [
      { value: 'new', label: 'חדש' },
      { value: 'in-progress', label: 'בטיפול' },
      { value: 'reminder', label: 'תזכורת' },
      { value: 'closed-success', label: 'נסגר בהצלחה' },
      { value: 'not-relevant', label: 'לא רלוונטי' },
      { value: 'no-answer', label: 'לא נענה' },
      { value: 'cancelled', label: 'בוטל ע״י הלקוח' }
    ];
  }

  getSubStatusOptions(mainStatus: string) {
    const statusOptions: Record<string, Array<{value: string, label: string}>> = {
      'in-progress': [
        { value: 'contacted', label: 'נוצר קשר' },
        { value: 'price-sent', label: 'הצעת מחיר נשלחה' },
        { value: 'waiting-response', label: 'ממתין למענה' },
        { value: 'call-scheduled', label: 'שיחה מתוכננת' }
      ],
      'reminder': [
        { value: 'week-reminder', label: 'לחזור בעוד שבוע' },
        { value: 'approval-waiting', label: 'ממתין לאישור' },
        { value: 'update-requested', label: 'לקוח ביקש להתעדכן' }
      ],
      'closed-success': [
        { value: 'active-client', label: 'לקוח פעיל' },
        { value: 'service-provided', label: 'שירות סופק' },
        { value: 'payment-completed', label: 'תשלום הושלם' }
      ],
      'not-relevant': [
        { value: 'not-interested', label: 'לא מעוניין' },
        { value: 'not-suitable', label: 'לא מתאים' },
        { value: 'duplicate-lead', label: 'ליד כפול' },
        { value: 'missing-info', label: 'מידע חסר' }
      ],
      'no-answer': [
        { value: 'failed-attempts', label: 'ניסיונות כושלים' },
        { value: 'invalid-number', label: 'מספר לא תקין' }
      ],
      'cancelled': [
        { value: 'cancelled-after-price', label: 'ביטל אחרי הצעת מחיר' },
        { value: 'moved-to-competitor', label: 'עבר לספק אחר' }
      ]
    };
    return statusOptions[mainStatus] || [];
  }

  async generateAIResponse() {
    try {
      this.selectedResponseType = 'ai';
      this.isTextareaEnabled = true;

      // Check if we have a cached response and the message length hasn't changed
      if (this.cachedAIResponse && this.cachedMessageLength === this.formData.messageLength) {
        console.log('Using cached AI response');
        this.formData.aiResponse = this.cachedAIResponse;
        this.formData.body = this.cachedAIResponse;
        return;
      }

      // Load user profile data
      const user = this.supabase.currentUser;
      if (!user) {
        this.toast.show(this.lang.t('errors.notAuthenticated'), 'error');
        return;
      }

      const { data: profile, error: profileError } = await this.supabase.client
        .from('profiles')
        .select('occupation, suboccupation, company, website, social_networks')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      // Build social media links string
      let socialMediaLinks = '';
      if (profile?.social_networks) {
        const links = [];
        if (profile.social_networks.facebook) links.push(`Facebook: ${profile.social_networks.facebook}`);
        if (profile.social_networks.instagram) links.push(`Instagram: ${profile.social_networks.instagram}`);
        if (profile.social_networks.linkedin) links.push(`LinkedIn: ${profile.social_networks.linkedin}`);
        if (profile.social_networks.tiktok) links.push(`TikTok: ${profile.social_networks.tiktok}`);
        if (profile.social_networks.youtube) links.push(`YouTube: ${profile.social_networks.youtube}`);
        socialMediaLinks = links.join(', ');
      }

      // Call the AI function with sample client answers for demo
      const { data, error } = await this.supabase.client.functions.invoke('generate-ai-response', {
        body: {
          mainCategory: profile?.occupation || '',
          subcategory: profile?.suboccupation || '',
          businessDescription: profile?.company || '',
          websiteUrl: profile?.website || '',
          socialMediaLinks: socialMediaLinks,
          clientAnswers: this.lang.t('automations.aiDemoClientAnswers'),
          emailLength: this.formData.messageLength
        }
      });

      if (error) throw error;

      // Use the email response for the template body
      if (data?.email) {
        this.formData.aiResponse = data.email;
        this.formData.body = data.email;
        // Cache the response
        this.cachedAIResponse = data.email;
        this.cachedMessageLength = this.formData.messageLength;
      } else {
        throw new Error('No AI response generated');
      }
    } catch (e: any) {
      console.error('Error generating AI response:', e);
      this.toast.show(this.lang.t('errors.generateAIResponse'), 'error');

      // Fallback to sample response using language service
      const fallbackResponse = this.lang.t('automations.aiFallbackResponse');
      this.formData.aiResponse = fallbackResponse;
      this.formData.body = fallbackResponse;
    }
  }

  generatePersonalResponse() {
    const samplePersonalResponse = this.lang.t('automations.personalResponseSample');

    this.formData.body = samplePersonalResponse;
    this.isTextareaEnabled = true;
    this.selectedResponseType = 'personal';
  }

  onReminderStatusChange() {
    // Reset sub-status when main status changes
    this.formData.reminderSubStatus = '';
  }

  isChannelEnabled(channel: string) {
    return this.contactSettings.enabled_channels.includes(channel);
  }

  toggleChannel(channel: string) {
    const enabled = this.isChannelEnabled(channel);
    if (enabled) {
      if (this.contactSettings.enabled_channels.length === 1) {
        return;
      }
      this.contactSettings.enabled_channels = this.contactSettings.enabled_channels.filter(c => c !== channel);
    } else {
      this.contactSettings.enabled_channels = [...this.contactSettings.enabled_channels, channel];
    }
  }

  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.formData.uploadedImage = file;

      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.formData.imageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async handleSaveTemplate() {
    if (!this.formData.name.trim()) {
      this.toast.show('נא להזין שם לתבנית', 'error');
      return;
    }

    if (!this.formData.body.trim()) {
      this.toast.show('נא להזין תוכן הודעה', 'error');
      return;
    }

    if (!this.validateContactSettings()) {
      return;
    }

    try {
      this.saving = true;
      const user = this.supabase.currentUser;

      if (!user) {
        this.toast.show('יש להתחבר למערכת', 'error');
        return;
      }

      await this.saveBusinessContactSettings(user.id);

      const templateData = {
        name: this.formData.name,
        message_type: this.selectedResponseType || 'personal',
        body: this.formData.body,
        ai_message_length: this.formData.messageLength,
        subject: this.formData.subject,
        include_reminder: this.formData.includeReminder,
        reminder_days: this.formData.reminderDays,
        reminder_time: this.formData.reminderTime,
        reminder_status: this.formData.reminderStatus,
        reminder_sub_status: this.formData.reminderSubStatus,
        image_url: this.formData.imageUrl || null,
        link_url: this.formData.linkUrl,
        use_profile_logo: this.formData.useProfileLogo,
        use_profile_image: this.formData.useProfileImage
      };

      if (this.editMode && this.templateId) {
        // Update existing template
        const { error } = await this.supabase.client
          .from('automation_templates')
          .update(templateData)
          .eq('id', this.templateId);

        if (error) throw error;

        this.toast.show(this.lang.t('automations.templateUpdatedSuccessfully'), 'success');
      } else {
        // Create new template
        const { error } = await this.supabase.client
          .from('automation_templates')
          .insert({
            ...templateData,
            user_id: user.id
          });

        if (error) throw error;

        this.toast.show(this.lang.t('automations.templateSavedSuccessfully'), 'success');
      }

      this.router.navigate(['/automations'], { queryParams: { tab: 'templates' } });
    } catch (e: any) {
      console.error('Error saving template:', e);
      this.toast.show(e.message || this.lang.t('automations.errorSavingTemplate'), 'error');
    } finally {
      this.saving = false;
    }
  }

  goBack() {
    this.router.navigate(['/automations'], { queryParams: { tab: 'templates' } });
  }

  private validateContactSettings(): boolean {
    if (!this.contactSettings.enabled_channels.length) {
      this.toast.show('בחר לפחות ערוץ אחד למענה הלקוח', 'error');
      return false;
    }

    if (this.isChannelEnabled('email') && !this.contactSettings.return_email.trim()) {
      this.toast.show('נא להזין כתובת מייל לחזרה', 'error');
      return false;
    }

    if (this.isChannelEnabled('sms') && !this.contactSettings.return_phone.trim()) {
      this.toast.show('נא להזין מספר טלפון לשליחת SMS', 'error');
      return false;
    }

    if (this.isChannelEnabled('whatsapp') && !this.contactSettings.return_whatsapp.trim()) {
      this.toast.show('נא להזין מספר וואטסאפ פעיל', 'error');
      return false;
    }

    return true;
  }

  private getDefaultChannelsFromProfile(): string[] {
    const channels: string[] = [];
    if (this.profileContactDefaults.email) {
      channels.push('email');
    }
    if (this.profileContactDefaults.phone) {
      channels.push('sms');
    }
    if (this.profileContactDefaults.whatsapp) {
      channels.push('whatsapp');
    }
    return channels.length ? channels : ['email'];
  }

  private applyProfileDefaultsToContactSettings() {
    if (!this.contactSettings.return_email && this.profileContactDefaults.email) {
      this.contactSettings.return_email = this.profileContactDefaults.email;
    }
    if (!this.contactSettings.return_phone && this.profileContactDefaults.phone) {
      this.contactSettings.return_phone = this.profileContactDefaults.phone;
    }
    if (!this.contactSettings.return_whatsapp && this.profileContactDefaults.whatsapp) {
      this.contactSettings.return_whatsapp = this.profileContactDefaults.whatsapp;
    }
    if (!this.contactSettings.enabled_channels.length) {
      this.contactSettings.enabled_channels = this.getDefaultChannelsFromProfile();
    }
  }

  private async saveBusinessContactSettings(businessId: string) {
    try {
      await this.businessContactSettingsService.upsert({
        business_id: businessId,
        return_email: this.contactSettings.return_email.trim() || null,
        return_phone: this.contactSettings.return_phone.trim() || null,
        return_whatsapp: this.contactSettings.return_whatsapp.trim() || null,
        enabled_channels: this.contactSettings.enabled_channels
      });
    } catch (error) {
      console.error('Error saving business contact settings:', error);
      this.toast.show('שמירת הגדרות המענה נכשלה', 'error');
    }
  }
}
