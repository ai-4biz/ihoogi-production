-- Migration: Create business_contact_settings table and row level security

CREATE TABLE IF NOT EXISTS business_contact_settings (
    business_id UUID PRIMARY KEY,
    return_email TEXT,
    return_phone TEXT,
    return_whatsapp TEXT,
    enabled_channels JSONB NOT NULL DEFAULT '[]'::JSONB,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE business_contact_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own_business_contact_settings"
    ON business_contact_settings
    FOR SELECT
    USING (business_id = auth.uid());

CREATE POLICY "insert_own_business_contact_settings"
    ON business_contact_settings
    FOR INSERT
    WITH CHECK (business_id = auth.uid());

CREATE POLICY "update_own_business_contact_settings"
    ON business_contact_settings
    FOR UPDATE
    USING (business_id = auth.uid())
    WITH CHECK (business_id = auth.uid());
