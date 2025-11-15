import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';
import { SupabaseService } from '../../../core/services/supabase.service';
import { ToastService } from '../../../core/services/toast.service';

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
  includeBusinessDetails?: boolean;
  businessDetails?: {
    showBusinessName?: boolean;
    showEmail?: boolean;
    showPhone?: boolean;
    showWebsite?: boolean;
    showWhatsapp?: boolean;
    showAddress?: boolean;
    showSocialNetworks?: boolean;
  };
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
    reminderFrequency: 'custom-days',
    includeBusinessDetails: false,
    businessDetails: {
      showBusinessName: true,
      showEmail: true,
      showPhone: true,
      showWebsite: false,
      showWhatsapp: false,
      showAddress: false,
      showSocialNetworks: false
    }
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
  businessProfileData: any = {
    company: '',
    email: '',
    phone: '',
    website: '',
    whatsapp: '',
    address: '',
    social_networks: {}
  };
  showBusinessDetailsMessage = false;

  constructor(
    public lang: LanguageService,
    private supabase: SupabaseService,
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute
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
        .select('logo_url, image_url, company, email, phone, website, whatsapp, address, social_networks')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        this.profileLogoUrl = data.logo_url || '';
        this.profileImageUrl = data.image_url || '';
        this.businessProfileData = {
          company: data.company || '',
          email: data.email || '',
          phone: data.phone || '',
          website: data.website || '',
          whatsapp: data.whatsapp || '',
          address: data.address || '',
          social_networks: data.social_networks || {}
        };
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

  getSelectedBusinessDetails(): Array<{label: string, value: string, icon: string, link?: string, type: string}> {
    const details: Array<{label: string, value: string, icon: string, link?: string, type: string}> = [];
    
    if (!this.formData.includeBusinessDetails || !this.formData.businessDetails) {
      return details;
    }

    const bd = this.formData.businessDetails;
    const data = this.businessProfileData || {};

    if (bd.showBusinessName && data.company) {
      details.push({ label: 'שם העסק', value: data.company, icon: '🏢', type: 'text' });
    }
    if (bd.showEmail && data.email) {
      details.push({ label: 'אימייל', value: data.email, icon: '📧', link: `mailto:${data.email}`, type: 'email' });
    }
    if (bd.showPhone && data.phone) {
      const phoneClean = data.phone.replace(/[^\d+]/g, '');
      details.push({ label: 'טלפון', value: data.phone, icon: '📞', link: `tel:${phoneClean}`, type: 'phone' });
    }
    if (bd.showWebsite && data.website) {
      const websiteUrl = data.website.startsWith('http') ? data.website : `https://${data.website}`;
      details.push({ label: 'אתר', value: data.website, icon: '🌐', link: websiteUrl, type: 'website' });
    }
    if (bd.showWhatsapp && data.whatsapp) {
      const whatsappClean = data.whatsapp.replace(/[^\d+]/g, '');
      details.push({ label: 'וואטסאפ', value: data.whatsapp, icon: '💬', link: `https://wa.me/${whatsappClean}`, type: 'whatsapp' });
    }
    if (bd.showAddress && data.address) {
      const addressEncoded = encodeURIComponent(data.address);
      details.push({ label: 'כתובת', value: data.address, icon: '📍', link: `https://maps.google.com/?q=${addressEncoded}`, type: 'address' });
    }
    if (bd.showSocialNetworks && data.social_networks) {
      const sn = data.social_networks;
      if (sn.facebook) {
        const fbUrl = sn.facebook.startsWith('http') ? sn.facebook : `https://facebook.com/${sn.facebook}`;
        details.push({ label: 'Facebook', value: sn.facebook, icon: '📘', link: fbUrl, type: 'social' });
      }
      if (sn.instagram) {
        const igUrl = sn.instagram.startsWith('http') ? sn.instagram : `https://instagram.com/${sn.instagram}`;
        details.push({ label: 'Instagram', value: sn.instagram, icon: '📷', link: igUrl, type: 'social' });
      }
      if (sn.linkedin) {
        const liUrl = sn.linkedin.startsWith('http') ? sn.linkedin : `https://linkedin.com/in/${sn.linkedin}`;
        details.push({ label: 'LinkedIn', value: sn.linkedin, icon: '💼', link: liUrl, type: 'social' });
      }
      if (sn.tiktok) {
        const ttUrl = sn.tiktok.startsWith('http') ? sn.tiktok : `https://tiktok.com/@${sn.tiktok}`;
        details.push({ label: 'TikTok', value: sn.tiktok, icon: '🎵', link: ttUrl, type: 'social' });
      }
      if (sn.youtube) {
        const ytUrl = sn.youtube.startsWith('http') ? sn.youtube : `https://youtube.com/${sn.youtube}`;
        details.push({ label: 'YouTube', value: sn.youtube, icon: '📺', link: ytUrl, type: 'social' });
      }
    }

    return details;
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

    try {
      this.saving = true;
      const user = this.supabase.currentUser;

      if (!user) {
        this.toast.show('יש להתחבר למערכת', 'error');
        return;
      }

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
}
