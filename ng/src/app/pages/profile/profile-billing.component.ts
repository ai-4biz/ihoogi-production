import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-profile-billing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-billing.component.html',
  styleUrl: './profile-billing.component.sass'
})
export class ProfileBillingComponent implements OnInit {
  constructor(public lang: LanguageService) {}

  ngOnInit() {
    // Component initialized
  }
}
