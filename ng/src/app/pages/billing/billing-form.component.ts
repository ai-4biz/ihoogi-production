import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';

type PlanStatus = 'active' | 'trialing' | 'canceled';

interface CurrentPlan {
  name: string;
  description: string;
  status: PlanStatus;
  seats: number;
  renewsOn: string;
}

interface PaymentMethod {
  brand: string;
  last4: string;
  expMonth: string;
  expYear: string;
}

interface AddOn {
  name: string;
  description: string;
  price: number;
  enabled: boolean;
}

interface UsageStat {
  used: number;
  limit: number;
}

interface Payment {
  date: string;
  invoice: string;
  amount: number;
}

@Component({
  selector: 'app-billing-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './billing-form.component.html',
  styleUrl: './billing-form.component.sass'
})
export class BillingFormComponent {
  readonly currentPlan = signal<CurrentPlan>({
    name: 'Growth',
    description: 'Ideal for scaling teams that need real-time analytics.',
    status: 'active',
    seats: 12,
    renewsOn: '2025-01-01',
  });

  readonly paymentMethod = signal<PaymentMethod>({
    brand: 'Visa',
    last4: '4421',
    expMonth: '08',
    expYear: '2027',
  });

  readonly addOns = signal<AddOn[]>([
    {
      name: 'Advanced Reporting',
      description: 'Time-series dashboards and cohort analysis.',
      price: 29,
      enabled: true,
    },
    {
      name: 'Priority Support',
      description: 'Dedicated Slack channel with guaranteed response times.',
      price: 59,
      enabled: false,
    },
  ]);

  readonly usage = signal<Record<'responses' | 'seats', UsageStat>>({
    responses: { used: 4200, limit: 5000 },
    seats: { used: 12, limit: 15 },
  });

  readonly recentPayments = signal<Payment[]>([
    { date: '2024-10-01', invoice: 'INV-3025', amount: 199 },
    { date: '2024-09-01', invoice: 'INV-2961', amount: 199 },
    { date: '2024-08-01', invoice: 'INV-2874', amount: 199 },
  ]);

  constructor(public lang: LanguageService) {}

  handleSavePaymentMethod(payload: unknown) {
    console.log('TODO integrate payment method save', payload);
  }

  handleUpdatePlan() {
    console.log('TODO integrate plan update flow');
  }
}
