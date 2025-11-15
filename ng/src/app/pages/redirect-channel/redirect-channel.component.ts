import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirect-channel',
  standalone: true,
  templateUrl: './redirect-channel.component.html',
  styleUrls: ['./redirect-channel.component.sass']
})
export class RedirectChannelComponent implements OnInit {
  private readonly allowedChannels = [
    'whatsapp',
    'email',
    'sms',
    'telegram',
    'website',
    'qr',
    'direct',
    'signature',
    'linktree'
    // can be extended later if needed
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const channel = this.route.snapshot.paramMap.get('channel') || '';
    const token = this.route.snapshot.paramMap.get('token') || '';

    // Diagnostic log
    console.log('[REDIRECT] Original URL:', window.location.href);
    console.log('[REDIRECT] Channel:', channel);
    console.log('[REDIRECT] Token:', token);

    // Basic validation
    if (!token) {
      console.warn('[REDIRECT] Missing token in /r/:channel/:token');
      this.router.navigate(['/']); // or to 404
      return;
    }

    // If channel is not allowed, fall back to "form" or "direct"
    const normalizedChannel = this.allowedChannels.includes(channel)
      ? channel
      : 'form';

    // Build the final URL for questionnaire route
    const targetUrl = `/q/${token}?src=${encodeURIComponent(normalizedChannel)}`;

    console.log('[REDIRECT] Redirecting to:', targetUrl, 'from channel:', channel);

    this.router.navigateByUrl(targetUrl);
  }
}


