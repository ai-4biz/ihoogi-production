import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SubscriptionPlan {
  name: string;
  summary: string;
  price: number;
  activeCount: number;
  features: string[];
}

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.sass'
})
export class SubscriptionsComponent {
  readonly subscriptionPlans = signal<SubscriptionPlan[]>([
    {
      name: 'Starter',
      summary: 'Perfect for small teams getting started.',
      price: 59,
      activeCount: 128,
      features: ['Up to 3 seats', '1,000 monthly responses', 'Email support'],
    },
    {
      name: 'Growth',
      summary: 'Scaling teams with collaboration workflows.',
      price: 199,
      activeCount: 82,
      features: ['Up to 25 seats', '5,000 monthly responses', 'Slack support'],
    },
  ]);
}

