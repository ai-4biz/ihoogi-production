-- Create a database function to submit responses that bypasses RLS
-- This is a GUARANTEED fix for the mobile RLS issue
-- Run this in the Supabase SQL Editor

-- First, ensure the columns exist
ALTER TABLE public.responses ADD COLUMN IF NOT EXISTS response_data JSONB;
ALTER TABLE public.responses ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.responses ADD COLUMN IF NOT EXISTS distribution_token TEXT;
ALTER TABLE public.responses ADD COLUMN IF NOT EXISTS channel TEXT;
ALTER TABLE public.responses ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE public.responses ADD COLUMN IF NOT EXISTS utm_medium TEXT;
ALTER TABLE public.responses ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE public.responses ADD COLUMN IF NOT EXISTS utm_content TEXT;
ALTER TABLE public.responses ADD COLUMN IF NOT EXISTS utm_term TEXT;

-- Drop legacy versions of the function to avoid overload conflicts
DROP FUNCTION IF EXISTS public.submit_questionnaire_response(UUID, JSONB, TIMESTAMPTZ);
DROP FUNCTION IF EXISTS public.submit_questionnaire_response(UUID, JSONB, TIMESTAMPTZ, TEXT, TEXT);

-- Create the function with SECURITY DEFINER to bypass RLS
CREATE OR REPLACE FUNCTION public.submit_questionnaire_response(
  p_questionnaire_id UUID,
  p_response_data JSONB,
  p_submitted_at TIMESTAMPTZ DEFAULT NOW(),
  p_distribution_token TEXT DEFAULT NULL,
  p_channel TEXT DEFAULT NULL,
  p_utm_source TEXT DEFAULT NULL,
  p_utm_medium TEXT DEFAULT NULL,
  p_utm_campaign TEXT DEFAULT NULL,
  p_utm_content TEXT DEFAULT NULL,
  p_utm_term TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER -- This makes the function run with the privileges of the function owner, bypassing RLS
SET search_path = public
AS $$
DECLARE
  v_response_id UUID;
BEGIN
  -- Insert the response
  INSERT INTO public.responses (
    questionnaire_id,
    response_data,
    submitted_at,
    status,
    created_at,
    distribution_token,
    channel,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term
  )
  VALUES (
    p_questionnaire_id,
    p_response_data,
    p_submitted_at,
    'submitted',
    NOW(),
    p_distribution_token,
    p_channel,
    p_utm_source,
    p_utm_medium,
    p_utm_campaign,
    p_utm_content,
    p_utm_term
  )
  RETURNING id INTO v_response_id;

  RETURN v_response_id;
END;
$$;

-- Grant execute permission to anonymous users
GRANT EXECUTE ON FUNCTION public.submit_questionnaire_response(UUID, JSONB, TIMESTAMPTZ, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.submit_questionnaire_response(UUID, JSONB, TIMESTAMPTZ, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO authenticated;

-- Also create a function for inserting leads
DROP FUNCTION IF EXISTS public.submit_lead(UUID, TEXT, JSONB, TEXT, TEXT, TEXT, TEXT, TEXT);
DROP FUNCTION IF EXISTS public.submit_lead(UUID, TEXT, JSONB, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT);

CREATE OR REPLACE FUNCTION public.submit_lead(
  p_questionnaire_id UUID,
  p_client_name TEXT,
  p_answer_json JSONB,
  p_email TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL,
  p_name TEXT DEFAULT NULL,
  p_distribution_token TEXT DEFAULT NULL,
  p_channel TEXT DEFAULT NULL,
  p_utm_source TEXT DEFAULT NULL,
  p_utm_medium TEXT DEFAULT NULL,
  p_utm_campaign TEXT DEFAULT NULL,
  p_utm_content TEXT DEFAULT NULL,
  p_utm_term TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_lead_id UUID;
BEGIN
  -- Insert the lead
  INSERT INTO public.leads (
    questionnaire_id,
    client_name,
    answer_json,
    email,
    phone,
    name,
    distribution_token,
    channel,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    utm_term,
    status,
    created_at,
    updated_at
  )
  VALUES (
    p_questionnaire_id,
    p_client_name,
    p_answer_json,
    p_email,
    p_phone,
    p_name,
    p_distribution_token,
    p_channel,
    p_utm_source,
    p_utm_medium,
    p_utm_campaign,
    p_utm_content,
    p_utm_term,
    'new',
    NOW(),
    NOW()
  )
  RETURNING id INTO v_lead_id;

  RETURN v_lead_id;
END;
$$;

-- Grant execute permission to anonymous users
GRANT EXECUTE ON FUNCTION public.submit_lead(UUID, TEXT, JSONB, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.submit_lead(UUID, TEXT, JSONB, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO authenticated;

-- Add missing columns to leads table if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'email') THEN
        ALTER TABLE public.leads ADD COLUMN email TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'phone') THEN
        ALTER TABLE public.leads ADD COLUMN phone TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'name') THEN
        ALTER TABLE public.leads ADD COLUMN name TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'distribution_token') THEN
        ALTER TABLE public.leads ADD COLUMN distribution_token TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'channel') THEN
        ALTER TABLE public.leads ADD COLUMN channel TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'utm_source') THEN
        ALTER TABLE public.leads ADD COLUMN utm_source TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'utm_medium') THEN
        ALTER TABLE public.leads ADD COLUMN utm_medium TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'utm_campaign') THEN
        ALTER TABLE public.leads ADD COLUMN utm_campaign TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'utm_content') THEN
        ALTER TABLE public.leads ADD COLUMN utm_content TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'leads' AND column_name = 'utm_term') THEN
        ALTER TABLE public.leads ADD COLUMN utm_term TEXT;
    END IF;
END $$;
