import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { SupabaseService } from '../../core/services/supabase.service';
import { ToastService } from '../../core/services/toast.service';
import { environment } from '../../../environments/environment';

interface Questionnaire {
  id: string;
  title: string;
  token?: string | null;
}

interface Distribution {
  id: string;
  questionnaire_id: string;
  automation_template_ids: Array<{
    template_id: string;
    channels: Array<'email' | 'whatsapp' | 'sms'>;
  }>;
  token: string | null;
  is_active: boolean;
}

interface SelectedTemplate {
  id: string;
  name: string;
  channels: Array<'email' | 'whatsapp' | 'sms'>;
}

interface AutomationTemplate {
  id: string;
  name: string;
  message_type: string;
  created_at: string;
}

interface SavedLink {
  id: string;
  url: string;
  linkText: string;
  type: 'form' | 'chat' | 'qr';
  createdAt: string;
  surveyId: string;
}

type LinkMode = 'form' | 'chat' | 'qr' | null;

@Component({
  selector: 'app-distribution-hub',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './distribution-hub.component.html',
  styleUrls: ['./distribution-hub.component.sass']
})
export class DistributionHubComponent implements OnInit {
  @ViewChild('previewSection') previewSection?: ElementRef;

  selectedQuestionnaire = '';
  questionnaires: Questionnaire[] = [];
  loading = false;
  currentMode: LinkMode = null;
  currentUrl = '';
  currentDistribution: Distribution | null = null;
  selectedSocialNetwork: 'whatsapp' | 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'telegram' | 'email' | 'sms' | 'website' | null = null;
  showLinksSection = false;

  // Template management - Updated: Single template selection
  selectedTemplateId: string = ''; // "" = לא נבחר, "none" = ללא מענה, או ID תבנית
  availableTemplates: AutomationTemplate[] = [];
  
  // Link texts - Custom text per link type
  linkTexts: { [key: string]: string } = {
    form: '',
    chat: '',
    qr: ''
  };

  // Saved texts (persisted)
  savedTexts: { [key: string]: string } = {
    form: '',
    chat: '',
    qr: ''
  };

  // Generated links
  formLink: string = '';
  chatLink: string = '';
  qrLink: string = '';

  // Template preview
  showTemplatePreview: boolean = false;
  templatePreviewHtml: string = '';

  // Legacy - keeping for backward compatibility (not used in new UI)
  selectedTemplates: SelectedTemplate[] = [];
  newTemplateId = '';
  savedLinks: SavedLink[] = [];

  constructor(
    public lang: LanguageService,
    private supabaseService: SupabaseService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {}

  async ngOnInit() {
    await Promise.all([
      this.loadQuestionnaires(),
      this.loadAutomationTemplates()
    ]);

    // Load saved links from localStorage
    this.loadSavedLinks();
    
    // Load saved custom texts from localStorage
    this.loadSavedTexts();

    // Check for questionnaireId from query params
    this.route.queryParams.subscribe(params => {
      if (params['questionnaireId']) {
        this.selectedQuestionnaire = params['questionnaireId'];
      }
    });
  }

  loadSavedLinks() {
    try {
      const savedLinksData = localStorage.getItem('hoogi-saved-links');
      this.savedLinks = savedLinksData ? JSON.parse(savedLinksData) : [];
    } catch (error) {
      console.error('Error loading saved links:', error);
      this.savedLinks = [];
    }
  }

  saveSavedLinks() {
    try {
      localStorage.setItem('hoogi-saved-links', JSON.stringify(this.savedLinks));
    } catch (error) {
      console.error('Error saving links:', error);
    }
  }

  async loadQuestionnaires() {
    try {
      this.loading = true;
      const userId = this.supabaseService.currentUser?.id;
      if (!userId) return;

      const { data, error } = await this.supabaseService.client
        .from('questionnaires')
        .select('id, title, token, is_active')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      this.questionnaires = (data || []).map(q => ({
        id: q.id,
        title: q.title || this.lang.t('questionnaires.untitled'),
        token: q.token
      }));
    } catch (e: any) {
      console.error('Error loading questionnaires:', e);
    } finally {
      this.loading = false;
    }
  }

  async loadAutomationTemplates() {
    try {
      const userId = this.supabaseService.currentUser?.id;
      if (!userId) return;

      const { data, error } = await this.supabaseService.client
        .from('automation_templates')
        .select('id, name, message_type, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      this.availableTemplates = data || [];
    } catch (e: any) {
      console.error('Error loading automation templates:', e);
      this.toast.show(this.lang.t('errors.loadTemplates'), 'error');
    }
  }

  goBack() {
    window.history.back();
  }

  // Updated: Handle questionnaire selection (Step 1)
  async onQuestionnaireChange() {
    // Reset state
    this.selectedTemplateId = '';
    this.formLink = '';
    this.chatLink = '';
    this.qrLink = '';
    this.currentMode = null;
    this.currentUrl = '';
    this.currentDistribution = null;
    this.selectedTemplates = [];
    this.selectedSocialNetwork = null;
    this.showLinksSection = false;
    this.linkTexts = { form: '', chat: '', qr: '' };
    this.savedTexts = { form: '', chat: '', qr: '' };

    if (this.selectedQuestionnaire) {
      // Load saved texts for this questionnaire
      this.loadSavedTexts();
      this.generateLinks();
      await this.loadExistingDistribution();
    } else {
      this.resetLinks();
    }
  }

  // Updated: Handle template selection (Step 2)
  onTemplateChange(templateId: string): void {
    this.selectedTemplateId = templateId;
    // Generate links if questionnaire is selected
    if (this.selectedQuestionnaire && templateId) {
      this.generateLinks();
    }
  }

  // Legacy - keeping for backward compatibility
  async onTemplatesChange() {
    // Hide the links section when templates change
    this.currentMode = null;
    this.currentUrl = '';
    this.selectedSocialNetwork = null;
    this.showLinksSection = false;
  }

  // Generate universal links (Step 3)
  generateLinks(): void {
    if (!this.selectedQuestionnaire) {
      return;
    }

    const baseUrl = environment.siteUrl || window.location.origin;
    
    // Get distribution token if available, otherwise use questionnaire token
    const questionnaire = this.questionnaires.find(q => q.id === this.selectedQuestionnaire);
    const token = this.currentDistribution?.token || questionnaire?.token || this.selectedQuestionnaire;

    // Universal links with tracking parameter (src) - will auto-detect location when clicked
    // The src parameter allows tracking where the lead came from (form/chat/qr)
    this.formLink = `${baseUrl}/q/${token}?src=form`;
    this.chatLink = `${baseUrl}/q/${token}/chat?src=chat`;
    this.qrLink = `${baseUrl}/q/${token}/qr?src=qr`;
  }

  // Reset links
  resetLinks(): void {
    this.formLink = '';
    this.chatLink = '';
    this.qrLink = '';
  }

  // Copy link or custom text (if saved)
  async copyLink(link: string, type: string): Promise<void> {
    if (!link) {
      this.toast.show(
        this.lang.currentLanguage === 'he' ? 'אין קישור להעתקה' : 'No link to copy',
        'error'
      );
      return;
    }

    // If saved text exists, copy it. Otherwise, copy the link
    const savedText = this.savedTexts[type];
    const textToCopy = (savedText && savedText.trim()) ? savedText : link;

    const success = await this.copyToClipboard(textToCopy);
    if (success) {
      const message = (savedText && savedText.trim())
        ? (this.lang.currentLanguage === 'he' ? 'המלל הועתק ללוח' : 'Text copied to clipboard')
        : (this.lang.currentLanguage === 'he' ? 'הקישור הועתק ללוח' : 'Link copied to clipboard');
      this.toast.show(message, 'success');
    } else {
      this.toast.show(
        this.lang.currentLanguage === 'he' ? 'שגיאה בהעתקה' : 'Copy failed',
        'error'
      );
    }
  }

  // Preview template (demo customer response)
  previewTemplate(): void {
    if (!this.selectedTemplateId || this.selectedTemplateId === 'none') {
      return;
    }

    const template = this.availableTemplates.find(t => t.id === this.selectedTemplateId);
    if (!template) {
      return;
    }

    // Open template preview in a new tab or modal
    // For now, navigate to automations page with template preview
    this.router.navigate(['/automations'], {
      queryParams: { tab: 'templates', preview: this.selectedTemplateId }
    });
  }

  // Preview link (open link in new tab)
  previewLink(link: string, type: string): void {
    if (!link) {
      this.toast.show(
        this.lang.currentLanguage === 'he' ? 'אין קישור לתצוגה' : 'No link to preview',
        'error'
      );
      return;
    }

    window.open(link, '_blank');
  }

  // Edit questionnaire
  editQuestionnaire(): void {
    if (!this.selectedQuestionnaire) {
      return;
    }
    this.router.navigate(['/questionnaires/edit', this.selectedQuestionnaire]);
  }

  // Delete questionnaire
  async deleteQuestionnaire(): Promise<void> {
    if (!this.selectedQuestionnaire) {
      return;
    }

    const confirmMessage = this.lang.currentLanguage === 'he'
      ? 'האם אתה בטוח שברצונך למחוק את השאלון?'
      : 'Are you sure you want to delete this questionnaire?';

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      const { error } = await this.supabaseService.client
        .from('questionnaires')
        .delete()
        .eq('id', this.selectedQuestionnaire);

      if (error) throw error;

      this.toast.show(
        this.lang.currentLanguage === 'he' ? 'השאלון נמחק בהצלחה' : 'Questionnaire deleted successfully',
        'success'
      );

      // Reset form and reload questionnaires
      this.resetForm();
      await this.loadQuestionnaires();
    } catch (error: any) {
      console.error('Error deleting questionnaire:', error);
      this.toast.show(
        this.lang.currentLanguage === 'he' ? 'שגיאה במחיקת השאלון' : 'Error deleting questionnaire',
        'error'
      );
    }
  }

  // Reset form
  resetForm(): void {
    this.selectedQuestionnaire = '';
    this.selectedTemplateId = '';
    this.formLink = '';
    this.chatLink = '';
    this.qrLink = '';
    this.linkTexts = { form: '', chat: '', qr: '' };
    this.showLinksSection = false;
    this.currentDistribution = null;
  }

  // Check if Step 3 can be shown
  canShowStep3(): boolean {
    return !!(this.selectedQuestionnaire && this.selectedTemplateId && this.selectedTemplateId !== '');
  }

  // Check if Step 2 is valid
  isStep2Valid(): boolean {
    return !!(this.selectedTemplateId && this.selectedTemplateId !== '');
  }

  async loadExistingDistribution() {
    if (!this.selectedQuestionnaire) return;

    try {
      const { data: existingDistributions, error } = await this.supabaseService.client
        .from('distributions')
        .select('*')
        .eq('questionnaire_id', this.selectedQuestionnaire)
        .eq('is_active', true)
        .limit(1);

      if (error) throw error;

      if (existingDistributions && existingDistributions.length > 0) {
        this.currentDistribution = existingDistributions[0] as Distribution;

        // Load template and channels from existing distribution
        if (this.currentDistribution.automation_template_ids && this.currentDistribution.automation_template_ids.length > 0) {
          const templateMapping = this.currentDistribution.automation_template_ids[0];
          this.selectedTemplateId = templateMapping.template_id;
          this.selectedChannels = templateMapping.channels || ['email'];
        }
      }
    } catch (error) {
      console.error('Error loading existing distribution:', error);
    }
  }

  async handleShowLinks() {
    if (!this.selectedQuestionnaire) {
      this.toast.show(
        this.lang.t('distribution.chooseQuestionnaireFirst'),
        'error'
      );
      return;
    }

    // Updated: Validate Step 2 - template must be selected (even if "none")
    if (!this.isStep2Valid()) {
      this.toast.show(
        this.lang.currentLanguage === 'he'
          ? 'יש לבחור מענה אוטומטי או "ללא מענה אוטומטי ללקוח" כדי להמשיך'
          : 'Please select an automatic response or "No automatic customer response" to continue',
        'error'
      );
      return;
    }

    // Save the distribution first (creates/updates distribution)
    const success = await this.saveDistribution();

    // Only show the links section if distribution was saved successfully
    if (success) {
      this.showLinksSection = true;
      // Generate links if not already generated
      if (!this.formLink) {
        this.generateLinks();
      }
    } else {
      console.error('Failed to save distribution - not showing links section');
    }
  }

  // Generate a unique distribution token
  private generateDistributionToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = 'd_'; // Distribution prefix
    for (let i = 0; i < 12; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }

  async saveDistribution(): Promise<boolean> {
    if (!this.selectedQuestionnaire) return false;

    const questionnaire = this.questionnaires.find(q => q.id === this.selectedQuestionnaire);
    if (!questionnaire) return false;

    // Updated: Prepare automation template data - single template selection
    let automationTemplateIds: Array<{ template_id: string; channels: Array<'email' | 'whatsapp' | 'sms'> }> = [];
    
    if (this.selectedTemplateId && this.selectedTemplateId !== 'none') {
      // If a template is selected, we need to determine channels
      // For now, default to email (can be enhanced later)
      automationTemplateIds = [{
        template_id: this.selectedTemplateId,
        channels: ['email'] // Default channel - can be enhanced to allow channel selection
      }];
    }
    // If "none" is selected, automationTemplateIds stays empty

    // Generate or reuse distribution token
    const distributionToken = this.currentDistribution?.token || this.generateDistributionToken();

    const distributionData = {
      questionnaire_id: this.selectedQuestionnaire,
      automation_template_ids: automationTemplateIds, // Empty array if "none" selected
      token: distributionToken,
      is_active: true
    };

    try {
      if (this.currentDistribution) {
        // Update existing distribution
        const { data, error } = await this.supabaseService.client
          .from('distributions')
          .update(distributionData)
          .eq('id', this.currentDistribution.id)
          .select()
          .single();

        if (error) throw error;

        this.currentDistribution = data as Distribution;
        console.log('Distribution updated:', data);
      } else {
        // Create new distribution
        const { data, error } = await this.supabaseService.client
          .from('distributions')
          .insert(distributionData)
          .select()
          .single();

        if (error) throw error;

        this.currentDistribution = data as Distribution;
        console.log('Distribution created:', data);
      }
      return true; // Success
    } catch (error: any) {
      console.error('Error saving distribution:', error);
      this.toast.show(
        this.lang.t('distribution.savingError') + ': ' + (error.message || 'Unknown error'),
        'error'
      );
      return false; // Failure
    }
  }

  // Template management methods
  async addTemplate() {
    if (!this.newTemplateId) return;

    if (this.selectedTemplates.length >= 3) {
      this.toast.show(
        this.lang.t('distribution.maxTemplatesReached'),
        'error'
      );
      return;
    }

    // Check if the last template has at least one channel selected
    if (this.selectedTemplates.length > 0) {
      const lastTemplate = this.selectedTemplates[this.selectedTemplates.length - 1];
      if (lastTemplate.channels.length === 0) {
        this.toast.show(
          this.lang.t('distribution.selectChannelForPrevious'),
          'error'
        );
        return;
      }
    }

    const template = this.availableTemplates.find(t => t.id === this.newTemplateId);
    if (template) {
      this.selectedTemplates.push({
        id: template.id,
        name: template.name,
        channels: []
      });
      this.newTemplateId = '';
      await this.onTemplatesChange();
    }
  }

  async removeTemplate(index: number) {
    this.selectedTemplates.splice(index, 1);
    await this.onTemplatesChange();
  }

  async toggleChannelForTemplate(templateIndex: number, channel: 'email' | 'whatsapp' | 'sms') {
    const template = this.selectedTemplates[templateIndex];
    const channelIndex = template.channels.indexOf(channel);

    if (channelIndex > -1) {
      // Remove channel
      template.channels.splice(channelIndex, 1);
    } else {
      // Add channel
      template.channels.push(channel);
    }
    await this.onTemplatesChange();
  }

  isChannelUsedByOtherTemplates(currentTemplateIndex: number, channel: 'email' | 'whatsapp' | 'sms'): boolean {
    return this.selectedTemplates.some((t, idx) =>
      idx !== currentTemplateIndex && t.channels.includes(channel)
    );
  }

  getUsedChannels(): Array<'email' | 'whatsapp' | 'sms'> {
    return this.selectedTemplates.flatMap(t => t.channels);
  }

  getAvailableChannels(templateIndex: number): Array<'email' | 'whatsapp' | 'sms'> {
    const allChannels: Array<'email' | 'whatsapp' | 'sms'> = ['email', 'whatsapp', 'sms'];
    return allChannels.filter(channel =>
      !this.isChannelUsedByOtherTemplates(templateIndex, channel)
    );
  }

  isTemplateAlreadySelected(templateId: string): boolean {
    return this.selectedTemplates.some(t => t.id === templateId);
  }

  // Social network selection and sharing
  async selectSocialNetwork(network: 'whatsapp' | 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'telegram' | 'email' | 'sms' | 'website') {
    // Generate form link if not already generated
    const wasGenerated = !this.currentUrl;
    if (wasGenerated) {
      await this.handleBuildLink('form');
    }

    // If still no URL (error occurred), return
    if (!this.currentUrl) {
      return;
    }

    this.selectedSocialNetwork = network;

    // Get network name (translated)
    const networkNames: { [key: string]: string } = {
      'whatsapp': 'WhatsApp',
      'facebook': 'Facebook',
      'instagram': 'Instagram',
      'linkedin': 'LinkedIn',
      'youtube': 'YouTube',
      'telegram': 'Telegram',
      'email': 'Email',
      'sms': 'SMS',
      'website': 'Website'
    };
    const networkName = networkNames[network] || network;

    // Create URL with tracking parameter
    let urlWithTracking: string;
    try {
      const url = new URL(this.currentUrl, environment.siteUrl);
      url.searchParams.set('src', network);
      urlWithTracking = url.toString();
    } catch (error) {
      console.error('Error creating URL:', error);
      // Fallback: append parameter manually
      urlWithTracking = this.currentUrl + (this.currentUrl.includes('?') ? '&' : '?') + `src=${network}`;
    }

    // Copy URL to clipboard first for all networks
    const copySuccess = await this.copyToClipboard(urlWithTracking);

    // Show notification based on copy success
    if (copySuccess) {
      this.toast.show(
        `${networkName} - ${this.lang.t('distribution.linkCopiedToClipboard')}`,
        'success'
      );
    } else {
      this.toast.show(
        this.lang.currentLanguage === 'he'
          ? 'שגיאה בהעתקת הקישור'
          : 'Failed to copy link',
        'error'
      );
      return; // Don't proceed if copy failed
    }

    // Get the share endpoint for the social network
    let shareUrl = '';
    const shareTitle = this.lang.currentLanguage === 'he' ? 'מלא את השאלון שלנו' : 'Fill out our questionnaire';

    switch (network) {
      case 'whatsapp':
        // WhatsApp Web/App share with pre-filled text and URL
        const whatsappMessage = this.lang.currentLanguage === 'he'
          ? `מלא את השאלון שלנו: ${urlWithTracking}`
          : `Fill out our questionnaire: ${urlWithTracking}`;
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
        break;
      case 'facebook':
        // Open Facebook share dialog
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlWithTracking)}`;
        break;
      case 'instagram':
        // Instagram doesn't have a web share API, so we only copy the link
        return;
      case 'linkedin':
        // LinkedIn share with URL (LinkedIn will auto-fetch title and description)
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlWithTracking)}`;
        break;
      case 'youtube':
        // YouTube doesn't have a share endpoint for links
        return;
      case 'telegram':
        // Telegram share with URL and text
        const telegramText = this.lang.currentLanguage === 'he' ? 'מלא את השאלון שלנו' : 'Fill out our questionnaire';
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(urlWithTracking)}&text=${encodeURIComponent(telegramText)}`;
        break;
      case 'email':
        // Email with subject and body containing the URL
        const emailSubject = this.lang.currentLanguage === 'he' ? 'מלא את השאלון שלנו' : 'Fill out our questionnaire';
        const emailMessage = this.lang.currentLanguage === 'he'
          ? `היי,\n\nאשמח אם תוכל למלא את השאלון שלנו:\n${urlWithTracking}\n\nתודה!`
          : `Hi,\n\nI'd appreciate if you could fill out our questionnaire:\n${urlWithTracking}\n\nThank you!`;
        shareUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailMessage)}`;
        break;
      case 'sms':
        // SMS with pre-filled text and URL
        const smsMessage = this.lang.currentLanguage === 'he'
          ? `מלא את השאלון שלנו: ${urlWithTracking}`
          : `Fill out our questionnaire: ${urlWithTracking}`;
        shareUrl = `sms:?body=${encodeURIComponent(smsMessage)}`;
        break;
      case 'website':
        // Generic share - only copy to clipboard
        return;
    }

    // Open the share URL after a short delay to ensure the notification is visible
    if (shareUrl) {
      setTimeout(() => {
        window.open(shareUrl, '_blank');
      }, 800);
    }
  }

  // Delete saved link
  handleDeleteSavedLink(linkId: string) {
    this.savedLinks = this.savedLinks.filter(link => link.id !== linkId);
    this.saveSavedLinks();

    this.toast.show(
      this.lang.t('links.linkDeleted'),
      'success'
    );
  }

  // Load saved link into current form
  handleLoadSavedLink(savedLink: SavedLink) {
    this.currentUrl = savedLink.url;
    this.currentMode = savedLink.type;

    this.toast.show(
      this.lang.t('links.linkLoaded'),
      'success'
    );
  }

  // Copy link with tracking parameter
  async copyLinkWithTracking(network: 'facebook' | 'instagram' | 'linkedin' | 'general') {
    if (!this.currentUrl) {
      this.toast.show(
        this.lang.currentLanguage === 'he' ? 'אנא יצור קישור תחילה' : 'Please create a link first',
        'error'
      );
      return;
    }

    const url = new URL(this.currentUrl);
    url.searchParams.set('src', network);
    const trackedUrl = url.toString();

    const success = await this.copyToClipboard(trackedUrl);

    if (success) {
      this.toast.show(
        this.lang.currentLanguage === 'he' ? `קישור עם מעקב ${network} הועתק ללוח` : `${network} tracked link copied to clipboard`,
        'success'
      );
    } else {
      this.toast.show(
        this.lang.currentLanguage === 'he' ? 'שגיאה בהעתקה' : 'Copy failed',
        'error'
      );
    }
  }

  async handleBuildLink(type: 'form' | 'chat' | 'qr') {
    if (!this.selectedQuestionnaire) {
      this.toast.show(
        this.lang.t('distribution.chooseQuestionnaireFirst'),
        'error'
      );
      return;
    }

    // Check if distribution exists and has a token
    if (!this.currentDistribution || !this.currentDistribution.token) {
      this.toast.show(
        this.lang.t('distribution.chooseQuestionnaireFirst'),
        'error'
      );
      return;
    }

    const base = environment.siteUrl;
    const distributionToken = this.currentDistribution.token;
    let url = '';

    // Build URL with distribution token and add src parameter
    if (type === 'form') {
      url = `${base}/q/${distributionToken}?src=form`;
    } else if (type === 'chat') {
      url = `${base}/q/${distributionToken}/chat?src=chat`;
    } else if (type === 'qr') {
      url = `${base}/q/${distributionToken}/qr?src=qr`;
    }

    this.currentMode = type;
    this.currentUrl = url;

    // Don't show toast or copy - just mark as selected
    // User will copy when they select a social network
  }

  getTypeName(type: 'form' | 'chat' | 'qr'): string {
    switch (type) {
      case 'form': return this.lang.t('distribution.form');
      case 'chat': return this.lang.t('distribution.chat');
      case 'qr': return this.lang.t('distribution.qr');
      default: return '';
    }
  }

  navigateToAutomations() {
    const confirmMessage = this.lang.currentLanguage === 'he'
      ? 'אתה יוצא מהמסך למסך יצירת מענה ללקוח. האם להמשיך?'
      : 'You are leaving this page to create a customer response template. Continue?';
    
    if (!confirm(confirmMessage)) {
      return;
    }
    
    this.router.navigate(['/automations'], { queryParams: { tab: 'templates' } });
  }

  // Save custom text for a specific link type
  saveCustomText(type: string): void {
    const text = this.linkTexts[type]?.trim() || '';
    this.savedTexts[type] = text;
    
    // Save to localStorage
    this.saveTextsToStorage();
    
    const message = text
      ? (this.lang.currentLanguage === 'he' ? 'המלל נשמר בהצלחה' : 'Text saved successfully')
      : (this.lang.currentLanguage === 'he' ? 'המלל נמחק' : 'Text cleared');
    this.toast.show(message, 'success');
  }

  // Load saved texts from localStorage
  loadSavedTexts(): void {
    try {
      const savedTextsData = localStorage.getItem(`hoogi-saved-texts-${this.selectedQuestionnaire}`);
      if (savedTextsData) {
        this.savedTexts = JSON.parse(savedTextsData);
        // Also populate linkTexts with saved texts
        Object.keys(this.savedTexts).forEach(key => {
          if (this.savedTexts[key]) {
            this.linkTexts[key] = this.savedTexts[key];
          }
        });
      }
    } catch (error) {
      console.error('Error loading saved texts:', error);
      this.savedTexts = { form: '', chat: '', qr: '' };
    }
  }

  // Save texts to localStorage
  saveTextsToStorage(): void {
    try {
      if (this.selectedQuestionnaire) {
        localStorage.setItem(`hoogi-saved-texts-${this.selectedQuestionnaire}`, JSON.stringify(this.savedTexts));
      }
    } catch (error) {
      console.error('Error saving texts:', error);
    }
  }

  getChannelNameInHebrew(channel: 'email' | 'whatsapp' | 'sms'): string {
    switch (channel) {
      case 'email': return this.lang.t('distribution.channelEmail');
      case 'whatsapp': return this.lang.t('distribution.channelWhatsapp');
      case 'sms': return this.lang.t('distribution.channelSms');
    }
  }

  getFormattedChannels(template: SelectedTemplate): string {
    return template.channels.map(ch => this.getChannelNameInHebrew(ch)).join(', ');
  }

  // Helper method to copy text to clipboard with fallback for non-HTTPS environments
  private async copyToClipboard(text: string): Promise<boolean> {
    // Try modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.error('Clipboard API failed:', err);
      }
    }

    // Fallback to legacy method for HTTP environments
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      return successful;
    } catch (err) {
      console.error('Legacy copy failed:', err);
      return false;
    }
  }
}
