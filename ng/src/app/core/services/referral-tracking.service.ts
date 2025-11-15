import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReferralTrackingService {
  /**
   * Detects the channel/source from which the user arrived at the questionnaire
   * Checks URL parameters (src, utm_source) and document.referrer
   * Returns a channel name like 'facebook', 'instagram', 'linkedin', 'google', 'direct', etc.
   */
  detectChannel(): string {
    console.log('=== detectChannel() called ===');
    console.log('Full URL:', window.location.href);
    console.log('Search params:', window.location.search);
    console.log('Referrer:', document.referrer);
    console.log('User Agent:', navigator.userAgent);
    
    const urlParams = new URLSearchParams(window.location.search);
    console.log('URL params object:', Array.from(urlParams.entries()));

    // PRIORITY 1: Check for 'src' parameter FIRST (like gold version)
    // This ensures that ?src=whatsapp is always detected as 'whatsapp', even if there's a referrer
    console.log('Priority 1: src parameter check');
    const srcParam = urlParams.get('src');
    console.log('src parameter value:', srcParam || 'NONE');
    if (srcParam) {
      const normalizedChannel = this.normalizeSource(srcParam);
      console.log('Normalized channel from src:', normalizedChannel);
      // Debug: Log WhatsApp detection
      if (normalizedChannel === 'whatsapp' || srcParam.toLowerCase().includes('whatsapp') || srcParam.toLowerCase() === 'wa') {
        console.log('WhatsApp detected via src parameter:', { srcParam, normalizedChannel, referer: document.referrer || 'none' });
      }
      console.log('=== Final Channel (src parameter) ===', normalizedChannel);
      return normalizedChannel;
    }

    // PRIORITY 2: Check HTTP referer (real source where the response came from)
    // This catches cases where link was shared on Facebook/Instagram/etc. (but only if no src parameter)
    const referer = document.referrer;
    console.log('Priority 2: Referrer check -', referer || 'NONE');

    if (referer) {
      try {
        const refererUrl = new URL(referer);
        const refererHost = refererUrl.hostname.toLowerCase();

        // Check for known social media and traffic sources
        if (this.isFromSource(refererHost, ['facebook.com', 'fb.com', 'm.facebook.com'])) {
          return 'facebook';
        }

        if (this.isFromSource(refererHost, ['instagram.com', 'm.instagram.com'])) {
          return 'instagram';
        }

        if (this.isFromSource(refererHost, ['linkedin.com', 'lnkd.in'])) {
          return 'linkedin';
        }

        if (this.isFromSource(refererHost, ['twitter.com', 't.co', 'x.com'])) {
          return 'twitter';
        }

        if (this.isFromSource(refererHost, ['youtube.com', 'youtu.be', 'm.youtube.com'])) {
          return 'youtube';
        }

        if (this.isFromSource(refererHost, ['tiktok.com'])) {
          return 'tiktok';
        }

        if (this.isFromSource(refererHost, ['pinterest.com', 'pin.it'])) {
          return 'pinterest';
        }

        if (this.isFromSource(refererHost, ['reddit.com'])) {
          return 'reddit';
        }

        if (this.isFromSource(refererHost, ['google.com', 'google.co.il'])) {
          return 'google';
        }

        if (this.isFromSource(refererHost, ['bing.com'])) {
          return 'bing';
        }

        if (this.isFromSource(refererHost, ['yahoo.com'])) {
          return 'yahoo';
        }

        if (this.isFromSource(refererHost, ['whatsapp.com', 'api.whatsapp.com', 'wa.me', 'chat.whatsapp.com'])) {
          console.log('WhatsApp detected via referrer:', { refererHost, referer });
          console.log('=== Final Channel (referrer) ===', 'whatsapp');
          return 'whatsapp';
        }

        if (this.isFromSource(refererHost, ['telegram.org', 't.me'])) {
          return 'telegram';
        }

        // If it's from another website, return 'referral' with the domain
        return `referral-${refererHost}`;

      } catch (error) {
        console.error('Error parsing referer URL:', error);
        // Continue to next check if referer parsing fails
      }
    }

    // PRIORITY 3: If no referer, check User Agent
    // This catches cases where link is opened in WhatsApp app (no referrer, but User Agent has WhatsApp)
    console.log('Priority 3: User Agent check');
    const uaChannel = this.detectFromUserAgent();
    console.log('User Agent channel detected:', uaChannel || 'NONE');
    if (uaChannel) {
      // Debug: Log WhatsApp detection via User Agent
      if (uaChannel === 'whatsapp') {
        console.log('WhatsApp detected via User Agent:', { uaChannel, referer: document.referrer || 'none' });
      }
      console.log('=== Final Channel (User Agent) ===', uaChannel);
      return uaChannel;
    }

    // PRIORITY 4: Check for utm_source parameter
    const utmSource = urlParams.get('utm_source');
    if (utmSource) {
      return this.normalizeSource(utmSource);
    }

    // PRIORITY 5: No referer means direct traffic
    console.log('Priority 5: Default to direct');
    console.log('=== Final Channel (default) ===', 'direct');
    return 'direct';
  }

  /**
   * Check if a hostname matches any of the given sources
   */
  private isFromSource(hostname: string, sources: string[]): boolean {
    return sources.some(source =>
      hostname === source || hostname.endsWith('.' + source)
    );
  }

  /**
   * Normalize a source string (from utm_source) to a standard channel name
   */
  private normalizeSource(source: string): string {
    const normalized = source.toLowerCase().trim();

    // Map common variations to standard names
    const sourceMap: Record<string, string> = {
      'fb': 'facebook',
      'ig': 'instagram',
      'li': 'linkedin',
      'in': 'linkedin',
      'tw': 'twitter',
      'yt': 'youtube',
      'wa': 'whatsapp',
      'tg': 'telegram',
      'goog': 'google'
    };

    return sourceMap[normalized] || normalized;
  }

  private detectFromUserAgent(): string | null {
    if (typeof navigator === 'undefined') {
      return null;
    }

    const ua = navigator.userAgent.toLowerCase();

    if (ua.includes('fban') || ua.includes('fbav') || ua.includes('facebook')) {
      return 'facebook';
    }
    if (ua.includes('instagram')) {
      return 'instagram';
    }
    if (ua.includes('whatsapp')) {
      return 'whatsapp';
    }
    if (ua.includes('linkedin')) {
      return 'linkedin';
    }
    if (ua.includes('twitter') || ua.includes('x/')) {
      return 'twitter';
    }
    if (ua.includes('tiktok')) {
      return 'tiktok';
    }
    if (ua.includes('pinterest')) {
      return 'pinterest';
    }
    if (ua.includes('telegram')) {
      return 'telegram';
    }
    if (ua.includes('reddit')) {
      return 'reddit';
    }
    if (ua.includes('youtube')) {
      return 'youtube';
    }
    if (ua.includes('google') || ua.includes('androidwebview')) {
      return 'google';
    }

    return null;
  }

  /**
   * Get additional tracking data (UTM parameters)
   * Returns an object with utm_medium, utm_campaign, etc.
   */
  getTrackingParams(): {
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  } {
    const urlParams = new URLSearchParams(window.location.search);

    return {
      utm_medium: urlParams.get('utm_medium') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || undefined,
      utm_content: urlParams.get('utm_content') || undefined,
      utm_term: urlParams.get('utm_term') || undefined,
    };
  }
}
