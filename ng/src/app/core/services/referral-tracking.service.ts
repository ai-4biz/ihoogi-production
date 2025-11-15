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
    const urlParams = new URLSearchParams(window.location.search);

    // Debug: Log all detection info for channels without referrer
    const fullUrl = window.location.href;
    const srcParam = urlParams.get('src');
    const referer = document.referrer;
    
    const channelsWithoutReferrer = ['whatsapp', 'email', 'sms'];
    if (srcParam && channelsWithoutReferrer.includes(srcParam)) {
      const channelName = srcParam.toUpperCase();
      console.log(`🔍 [${channelName} DETECTION] Full URL:`, fullUrl);
      console.log(`🔍 [${channelName} DETECTION] ?src= parameter:`, srcParam);
      console.log(`🔍 [${channelName} DETECTION] Referrer:`, referer);
      console.log(`🔍 [${channelName} DETECTION] All URL params:`, Array.from(urlParams.entries()));
    }

    // PRIORITY 0 (SPECIAL): Check ?src= parameter FIRST for channels without referrer
    // WhatsApp, Email, and SMS don't send referrer like Facebook does, so we prioritize their ?src= parameters
    // This is the same logic that worked for Facebook showing history - these channels need it too
    // Social networks (Facebook, Instagram, LinkedIn) have referrer, so they're handled in PRIORITY 1 below
    // Using channelsWithoutReferrer declared above (line 20)
    if (srcParam && channelsWithoutReferrer.includes(srcParam)) {
      console.log(`🔍 [${srcParam.toUpperCase()} DETECTION] PRIORITY 0 (Channel-specific): Found ?src=${srcParam}, returning ${srcParam} immediately`);
      // PHASE 2: Log result before return (non-destructive)
      console.log("%c[DIAG] detectChannel() result (PRIORITY 0):", "color: #2196F3", srcParam);
      return srcParam;
    }

    // PRIORITY 1: Check HTTP referer FIRST (real source where the response came from)
    // This catches cases where link was shared on Facebook/Instagram/etc. even if ?src=form is present
    // NOTE: For WhatsApp, if ?src=whatsapp is present, we already returned above

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

    // PRIORITY 2: Check for 'src' parameter (e.g., ?src=facebook, ?src=form)
    // Only used if no external referrer was detected
    if (srcParam) {
      const normalized = this.normalizeSource(srcParam);
      if (fullUrl.includes('whatsapp') || srcParam === 'whatsapp' || referer.includes('whatsapp')) {
        console.log('🔍 [WHATSAPP DETECTION] PRIORITY 2: srcParam =', srcParam, 'normalized =', normalized);
      }
      return normalized;
    }

    // PRIORITY 3: Check for utm_source parameter
    const utmSource = urlParams.get('utm_source');
    if (utmSource) {
      return this.normalizeSource(utmSource);
    }

    // PRIORITY 4: If no referer, check User Agent
    const uaChannel = this.detectFromUserAgent();
    if (uaChannel) {
      return uaChannel;
    }

    // PRIORITY 5: No referer means direct traffic
    const finalChannel = 'direct';
    // PHASE 2: Log final result (before return, non-destructive)
    console.log("%c[DIAG] detectChannel() final result:", "color: #2196F3", finalChannel);
    return finalChannel;

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
