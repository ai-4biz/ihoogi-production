import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-profile-billing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-billing.component.html',
  styleUrl: './profile-billing.component.sass'
})
export class ProfileBillingComponent implements OnInit {
  showBetaMessage = signal(true);

  constructor(public lang: LanguageService, private router: Router) {}

  ngOnInit() {
    // Component initialized
  }

  closeBetaMessage() {
    // זמנית - מחזיר ל-dashboard עד הודעה אחרת
    this.router.navigate(['/dashboard']);
  }
}
