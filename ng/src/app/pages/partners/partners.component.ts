import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.sass']
})
export class PartnersComponent {
  constructor(public lang: LanguageService, private router: Router) {}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
