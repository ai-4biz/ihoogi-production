import { Injectable } from '@angular/core';
import { SupabaseService } from '../core/services/supabase.service';

export interface BusinessContactSettings {
  business_id: string;
  return_email: string | null;
  return_phone: string | null;
  return_whatsapp: string | null;
  enabled_channels: string[];
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BusinessContactSettingsService {
  private readonly tableName = 'business_contact_settings';

  constructor(private readonly supabase: SupabaseService) {}

  async getByBusinessId(businessId: string): Promise<BusinessContactSettings | null> {
    const { data, error } = await this.supabase.client
      .from(this.tableName)
      .select('*')
      .eq('business_id', businessId)
      .maybeSingle();

    if (error) {
      console.error('[BusinessContactSettingsService] getByBusinessId error', error);
      throw error;
    }

    return data as BusinessContactSettings | null;
  }

  async upsert(payload: Partial<BusinessContactSettings> & { business_id: string }): Promise<BusinessContactSettings | null> {
    const normalizedPayload = {
      ...payload,
      enabled_channels: payload.enabled_channels ?? []
    };

    const { data, error } = await this.supabase.client
      .from(this.tableName)
      .upsert(normalizedPayload, {
        onConflict: 'business_id',
        ignoreDuplicates: false
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('[BusinessContactSettingsService] upsert error', error);
      throw error;
    }

    return data as BusinessContactSettings | null;
  }
}
