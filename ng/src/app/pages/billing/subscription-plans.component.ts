import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PublicPlan {
  name: string;
  description: string;
  price: number;
  bullets: string[];
}

@Component({
  selector: 'app-subscription-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-plans.component.html',
  styleUrl: './subscription-plans.component.sass'
})
export class SubscriptionPlansComponent {
  readonly publicPlans = signal<PublicPlan[]>([
    {
      name: 'Starter',
      description: 'Launch quickly with essentials.',
      price: 39,
      bullets: ['Single project', '1,500 responses', 'Community support'],
    },
    {
      name: 'Growth',
      description: 'Unlock collaboration and automations.',
      price: 129,
      bullets: ['Unlimited projects', '10,000 responses', 'Team workspaces'],
    },
    {
      name: 'Scale',
      description: 'Advanced controls and security.',
      price: 299,
      bullets: ['SSO & SCIM', 'Role-based access', 'Dedicated manager'],
    },
  ]);
}

