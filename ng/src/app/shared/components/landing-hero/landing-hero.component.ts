import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LanguageService } from '../../../core/services/language.service';

type HeroVariant = 'landing' | 'signup';

interface Benefit {
  iconSvg?: SafeHtml;
  iconEmoji?: string;
  titleKey: string;
  descKey: string;
  bgColorClass?: string; // Background color class for the card
  iconColor?: string; // Icon color
  iconStrokeColor?: string; // Icon stroke color
}

@Component({
  selector: 'app-landing-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-hero.component.html',
  styleUrls: ['./landing-hero.component.sass']
})
export class LandingHeroComponent {
  @Input() variant: HeroVariant = 'landing';

  constructor(
    public lang: LanguageService,
    private sanitizer: DomSanitizer
  ) {}

  get logoClass(): string {
    return this.variant === 'signup' ? 'h-20 w-20 sm-h-24 sm-w-24 object-contain' : 'h-24 sm-h-28 md-h-32 mx-auto';
  }

  get containerClass(): string {
    return this.variant === 'signup' ? 'max-w-6xl' : 'landing-hero';
  }

  get titleClass(): string {
    return this.variant === 'signup'
      ? 'text-2xl sm-text-3xl md-text-5xl font-extrabold'
      : 'text-3xl sm-text-4xl md-text-5xl lg-text-6xl font-bold mb-4';
  }

  get subtitleClass(): string {
    return this.variant === 'signup'
      ? 'mt-3 text-muted max-w-2xl mx-auto text-base sm-text-lg'
      : 'mt-3 text-muted max-w-2xl mx-auto text-base sm-text-lg md-text-xl';
  }

  get subtitleKey(): string {
    return this.variant === 'signup'
      ? 'landingHero.subtitleSignup'
      : 'landingHero.subtitleLanding';
  }

  getCardClass(bgColorClass?: string): string {
    const baseClass = this.variant === 'signup'
      ? 'border border-border p-5 rounded-xl shadow-sm hover-shadow-md transition-shadow text-right'
      : 'rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 text-right';
    
    // For both variants, use the provided background color or default
    if (bgColorClass) {
      return `${bgColorClass} ${baseClass}`;
    }
    
    // Default fallback
    return this.variant === 'signup' 
      ? `bg-card ${baseClass}`
      : `bg-white ${baseClass}`;
  }

  get iconContainerClass(): string {
    return this.variant === 'signup'
      ? 'flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center'
      : 'flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center';
  }

  get iconClass(): string {
    return this.variant === 'signup'
      ? 'icon-primary'
      : 'w-full h-full';
  }

  get textContainerClass(): string {
    return this.variant === 'signup'
      ? 'text-right'
      : 'text-right flex-1';
  }

  get benefitTitleClass(): string {
    return this.variant === 'signup'
      ? 'font-semibold text-base sm-text-lg mb-1'
      : 'text-base sm-text-lg md-text-xl font-bold';
  }

  get benefitDescClass(): string {
    return this.variant === 'signup'
      ? 'text-sm sm-text-base text-muted leading-relaxed'
      : 'text-gray-600 text-sm sm-text-base';
  }

  get benefits(): Benefit[] {
    if (this.variant === 'signup') {
      const messageSquare = this.sanitizer.bypassSecurityTrustHtml('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>');
      const mapPin = this.sanitizer.bypassSecurityTrustHtml('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>');
      const target = this.sanitizer.bypassSecurityTrustHtml('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>');
      const zap = this.sanitizer.bypassSecurityTrustHtml('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>');

      // SVG icons for signup page with matching colors for each card
      const messageSquareSignup = this.sanitizer.bypassSecurityTrustHtml('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="#DBEAFE" stroke="#3B82F6" stroke-width="2"/>');
      const mapPinSignup = this.sanitizer.bypassSecurityTrustHtml('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" fill="#CCFBF1" stroke="#14B8A6" stroke-width="2"/><circle cx="12" cy="10" r="3" fill="#14B8A6"/>');
      const targetSignup = this.sanitizer.bypassSecurityTrustHtml('<circle cx="12" cy="12" r="10" fill="#F3E8FF" stroke="#A855F7" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="none" stroke="#A855F7" stroke-width="1.5"/><circle cx="12" cy="12" r="2" fill="#A855F7"/>');
      const zapSignup = this.sanitizer.bypassSecurityTrustHtml('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#FFEDD5" stroke="#F97316" stroke-width="2" stroke-linejoin="round"/>');

      return [
        { iconSvg: messageSquareSignup, titleKey: 'landingHero.smartSalesTool', descKey: 'landingHero.smartSalesToolDescSignup', bgColorClass: 'bg-blue-50' },
        { iconSvg: mapPinSignup, titleKey: 'landingHero.centralizedHub', descKey: 'landingHero.centralizedHubDescSignup', bgColorClass: 'bg-teal-50' },
        { iconSvg: targetSignup, titleKey: 'landingHero.qualifiedLeads', descKey: 'landingHero.qualifiedLeadsDescSignup', bgColorClass: 'bg-purple-50' },
        { iconSvg: zapSignup, titleKey: 'landingHero.smartAutomation', descKey: 'landingHero.smartAutomationDescSignup', bgColorClass: 'bg-orange-50' }
      ];
    } else {
      // SVG icons for landing page with matching colors for each card
      // 1. Smart Sales Tool - Blue theme
      const messageSquare = this.sanitizer.bypassSecurityTrustHtml('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="#DBEAFE" stroke="#3B82F6" stroke-width="2"/>');
      
      // 2. Centralized Hub - Teal theme
      const mapPin = this.sanitizer.bypassSecurityTrustHtml('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" fill="#CCFBF1" stroke="#14B8A6" stroke-width="2"/><circle cx="12" cy="10" r="3" fill="#14B8A6"/>');
      
      // 3. Partners - Purple theme
      const target = this.sanitizer.bypassSecurityTrustHtml('<circle cx="12" cy="12" r="10" fill="#F3E8FF" stroke="#A855F7" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="none" stroke="#A855F7" stroke-width="1.5"/><circle cx="12" cy="12" r="2" fill="#A855F7"/>');
      
      // 4. Automation - Orange theme
      const zap = this.sanitizer.bypassSecurityTrustHtml('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#FFEDD5" stroke="#F97316" stroke-width="2" stroke-linejoin="round"/>');

      return [
        { iconSvg: messageSquare, titleKey: 'landingHero.smartSalesTool', descKey: 'landingHero.smartSalesToolDescLanding', bgColorClass: 'bg-blue-50', iconColor: '#3B82F6', iconStrokeColor: '#3B82F6' },
        { iconSvg: mapPin, titleKey: 'landingHero.centralizedHub', descKey: 'landingHero.centralizedHubDescLanding', bgColorClass: 'bg-teal-50', iconColor: '#14B8A6', iconStrokeColor: '#14B8A6' },
        { iconSvg: target, titleKey: 'landingHero.qualifiedLeads', descKey: 'landingHero.qualifiedLeadsDescLanding', bgColorClass: 'bg-purple-50', iconColor: '#A855F7', iconStrokeColor: '#A855F7' },
        { iconSvg: zap, titleKey: 'landingHero.smartAutomation', descKey: 'landingHero.smartAutomationDescLanding', bgColorClass: 'bg-orange-50', iconColor: '#F97316', iconStrokeColor: '#F97316' }
      ];
    }
  }
}
