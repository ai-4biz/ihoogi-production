// supabase/functions/on-new-lead/index.ts
// Deno Edge Function – triggered by DB on lead INSERT via webhook
// Handles questionnaire automations, enriches outgoing messages with CTA buttons,
// and records the template/channel metadata back onto the lead

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type Json = Record<string, unknown>;

type LeadRecord = {
  id: string;
  email?: string | null;
  phone?: string | null;
  name?: string | null;
  channel?: string | null;
  distribution_token?: string | null;
  questionnaire_id?: string | null;
  client_name?: string | null;
  answer_json?: Record<string, any> | null;
  automations?: Json[] | null;
  created_at?: string;
};

type TriggerPayload = {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: LeadRecord;
};

interface AutomationTemplate {
  id: string;
  name: string;
  message_type: "personal" | "ai";
  subject?: string;
  body?: string | null;
  ai_message_length?: string | null;
  user_id: string;
  link_url?: string | null;
  image_url?: string | null;
  use_profile_logo?: boolean | null;
  use_profile_image?: boolean | null;
}

interface DistributionRecord {
  id: string;
  automation_template_ids: Array<{
    template_id: string;
    channels: Array<"email" | "whatsapp" | "sms">;
  }>;
  token?: string | null;
  link_text?: string | null;
}

interface BusinessContactSettingsRow {
  return_email?: string | null;
  return_phone?: string | null;
  return_whatsapp?: string | null;
  enabled_channels?: string[] | null;
}

interface ResolvedContactSettings {
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  enabledChannels: string[];
}

interface ContactCTAElements {
  htmlSection: string;
  textFooter: string;
  whatsappFooter: string;
}

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const INCOMING_SECRET = Deno.env.get("INCOMING_WEBHOOK_SECRET") ?? "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function assertSignature(req: Request) {
  if (!INCOMING_SECRET) return true; // Skip validation in dev
  const sig = req.headers.get("x-webhook-secret") || "";
  return sig === INCOMING_SECRET;
}

function parseChannel(channel?: string | null): { detected: string | null; entryMethod: string | null } {
  if (!channel) return { detected: null, entryMethod: null };
  const [detected, entryMethod] = channel.split(":");
  return {
    detected: detected || null,
    entryMethod: entryMethod || null,
  };
}

function resolveChannelLabel(channelInfo: { detected: string | null; entryMethod: string | null }) {
  if (!channelInfo.detected && !channelInfo.entryMethod) return null;
  const parts: string[] = [];
  if (channelInfo.detected) parts.push(channelInfo.detected);
  if (channelInfo.entryMethod) parts.push(channelInfo.entryMethod);
  return parts.join(" / ");
}

function resolveContactSettings(
  ownerProfile: any,
  row: BusinessContactSettingsRow | null,
): ResolvedContactSettings {
  const enabled = Array.isArray(row?.enabled_channels) && row!.enabled_channels!.length
    ? row!.enabled_channels!
    : ["email", "whatsapp", "sms"];

  return {
    email: row?.return_email ?? ownerProfile?.email ?? null,
    phone: row?.return_phone ?? ownerProfile?.phone ?? null,
    whatsapp: row?.return_whatsapp ?? ownerProfile?.whatsapp ?? ownerProfile?.phone ?? null,
    enabledChannels: enabled,
  };
}

function buildContactCTAElements(settings: ResolvedContactSettings): ContactCTAElements {
  const buttons: string[] = [];
  const plainLines: string[] = [];
  const whatsappLines: string[] = [];

  if (settings.email) {
    buttons.push(`
      <a href="mailto:${settings.email}" style="background-color:#199f3a;color:white;padding:10px 20px;text-decoration:none;display:inline-block;border-radius:6px;font-size:15px;margin:5px;">
        📧 שלח מייל
      </a>
    `);
    plainLines.push(`מייל: ${settings.email}`);
    whatsappLines.push(`📧 מייל: ${settings.email}`);
  }

  if (settings.phone) {
    buttons.push(`
      <a href="tel:${settings.phone}" style="background-color:#199f3a;color:white;padding:10px 20px;text-decoration:none;display:inline-block;border-radius:6px;font-size:15px;margin:5px;">
        📞 שיחת טלפון
      </a>
    `);
    plainLines.push(`טלפון: ${settings.phone}`);
    whatsappLines.push(`📞 טלפון: ${settings.phone}`);
  }

  if (settings.whatsapp) {
    buttons.push(`
      <a href="https://wa.me/${settings.whatsapp}" target="_blank" style="background-color:#25D366;color:white;padding:10px 20px;text-decoration:none;display:inline-block;border-radius:6px;font-size:15px;margin:5px;">
        💬 וואטסאפ
      </a>
    `);
    plainLines.push(`וואטסאפ: https://wa.me/${settings.whatsapp}`);
    whatsappLines.push(`💬 וואטסאפ: https://wa.me/${settings.whatsapp}`);
  }

  if (!buttons.length) {
    return {
      htmlSection: "",
      textFooter: "",
      whatsappFooter: "",
    };
  }

  return {
    htmlSection: `
      <div style="text-align:center;margin-top:24px;">
        <p style="font-size:14px;color:#555;margin-bottom:12px;">ליצירת קשר ישיר עם העסק:</p>
        ${buttons.join("")}
      </div>
    `,
    textFooter: `\n\n---\nליצירת קשר עם העסק:\n${plainLines.join("\n")}`,
    whatsappFooter: `\n\n————\n${whatsappLines.join("\n")}`,
  };
}

function appendContactFooter(body: string, footer: string) {
  if (!footer) return body;
  return `${body.trim()}${footer}`;
}

function extractContactInfo(answerJson: Record<string, any>, questions: any[]): { name: string; email: string | null; phone: string | null } {
  const contact = {
    name: "",
    email: null as string | null,
    phone: null as string | null,
  };

  if (questions.length >= 1) {
    const nameValue = answerJson?.[questions[0].id];
    const name = Array.isArray(nameValue) ? nameValue.join(", ") : nameValue;
    if (typeof name === "string") contact.name = name;
  }

  if (questions.length >= 2) {
    const emailValue = answerJson?.[questions[1].id];
    const email = Array.isArray(emailValue) ? emailValue[0] : emailValue;
    if (typeof email === "string") contact.email = email;
  }

  if (questions.length >= 3) {
    const phoneValue = answerJson?.[questions[2].id];
    const phone = Array.isArray(phoneValue) ? phoneValue[0] : phoneValue;
    if (typeof phone === "string") contact.phone = phone;
  }

  return contact;
}

function replaceVariables(template: string, contact: { name: string; email: string | null; phone: string | null }, ownerProfile: any) {
  if (!template) return "";
  return template
    .replace(/\{\{firstName\}\}/g, contact.name.split(" ")[0] || contact.name)
    .replace(/\{\{fullName\}\}/g, contact.name || "")
    .replace(/\{\{businessName\}\}/g, ownerProfile.company || ownerProfile.email?.split("@")[0] || "Our Team")
    .replace(/\{\{email\}\}/g, contact.email || "")
    .replace(/\{\{phone\}\}/g, contact.phone || "");
}

function getPublicUrl(url?: string | null, urlType = "unknown") {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (!SUPABASE_URL) return url;

  const cleanPath = url.startsWith("/") ? url.slice(1) : url;
  return `${SUPABASE_URL}/storage/v1/object/public/${cleanPath}`;
}

function buildEmailHTML(
  messageBody: string,
  logoUrl: string | null,
  profileImageUrl: string | null,
  linkUrl: string | null,
  attachmentImageUrl: string | null,
  businessName: string,
  linkText: string = "לחץ כאן",
  contactSection: string = "",
) {
  const formattedBody = messageBody.replace(/\n/g, "<br>");
  const publicLogoUrl = getPublicUrl(logoUrl, "logo");
  const publicProfileImageUrl = getPublicUrl(profileImageUrl, "profile_image");
  const publicAttachmentImageUrl = getPublicUrl(attachmentImageUrl, "attachment_image");

  return `
<!DOCTYPE html>
<html dir="rtl">
<head>
  <meta charset="UTF-8">
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f5f5f5;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background-color:#ffffff;padding:0;">
      <div style="background-color:#199f3a;padding:30px 20px;text-align:center;">
        ${publicLogoUrl ? `<div style="margin-bottom:15px;"><img src="${publicLogoUrl}" alt="${businessName}" style="height:120px;"></div>` : ""}
        <p style="color:white;font-size:28px;margin:0;font-weight:bold;">${businessName}</p>
      </div>
      <div style="padding:30px 20px;text-align:right;">
        ${linkUrl ? `<div style="text-align:center;margin:20px 0;">
          <a href="${linkUrl}" style="background-color:#16a34a;color:white;padding:12px 30px;text-decoration:none;display:inline-block;font-size:16px;border-radius:6px;">${linkText}</a>
        </div>` : ""}
        <div style="margin:20px 0;line-height:1.6;">
          ${formattedBody}
        </div>
        ${publicAttachmentImageUrl ? `<div style="text-align:center;margin:20px 0;">
          <img src="${publicAttachmentImageUrl}" alt="${businessName}" style="max-width:100%;border-radius:12px;">
        </div>` : ""}
        ${publicProfileImageUrl ? `<div style="text-align:center;margin:20px 0;">
          <img src="${publicProfileImageUrl}" alt="Business profile" style="width:96px;height:96px;border-radius:50%;object-fit:cover;">
        </div>` : ""}
        ${contactSection}
        <p style="text-align:center;margin-top:30px;color:#666;">בברכה,<br>${businessName || "iHoogi"}</p>
      </div>
      <div style="background-color:#f5f5f5;padding:20px;text-align:center;font-size:12px;color:#999;">
        <p style="margin:5px 0;color:#666;">נשלח אוטומטית באמצעות iHoogi – מערכת שאלונים חכמה המחברת עסקים ללקוחותיהם, מבית <a href="https://www.ai-4-biz.com" style="color:#666;text-decoration:underline;">AI-4Biz</a>, בשם העסק שמולו פנית.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

async function sendAutomationEmail(to: string, subject: string, htmlBody: string, textBody: string, replyTo?: string | null) {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data, error } = await supabase.functions.invoke("send-automation-email", {
      body: { to, subject, html: htmlBody, text: textBody, replyTo: replyTo ?? undefined },
    });

    if (error) throw error;
    if (data?.error) throw new Error(data.error);
  } catch (error) {
    console.error("❌ [EMAIL] Error in sendAutomationEmail:", error);
  }
}

async function sendAutomationSMS(recipient: string, message: string) {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { error } = await supabase.functions.invoke("send-sms", { body: { recipient, message } });
    if (error) throw error;
  } catch (error) {
    console.error("❌ [SMS] Error in sendAutomationSMS:", error);
  }
}

async function sendAutomationWhatsApp(recipient: string, message: string, mediaUrl: string | null = null) {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const body: Record<string, any> = { recipient, message };
    if (mediaUrl) {
      const publicMediaUrl = getPublicUrl(mediaUrl, "whatsapp_media");
      if (publicMediaUrl) body.mediaUrl = publicMediaUrl;
    }
    const { error } = await supabase.functions.invoke("send-whatsapp", { body });
    if (error) throw error;
  } catch (error) {
    console.error("❌ [WHATSAPP] Error in sendAutomationWhatsApp:", error);
  }
}

async function handleAutomation(lead: LeadRecord) {
  console.log("🚀 [AUTOMATION] handleAutomation called for lead:", lead.id);

  if (!lead.questionnaire_id || !lead.answer_json) {
    console.log("❌ [AUTOMATION] Lead missing questionnaire_id or answer_json, skipping automation");
    return;
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: questionnaire, error: qError } = await supabase
      .from("questionnaires")
      .select("id, owner_id, title, link_label")
      .eq("id", lead.questionnaire_id)
      .maybeSingle();

    if (qError || !questionnaire) {
      console.log("❌ [AUTOMATION] Questionnaire not found:", qError);
      return;
    }

    let distribution: DistributionRecord | null = null;
    let distError: any = null;

    if (lead.distribution_token) {
      console.log("🔍 [AUTOMATION] Looking up distribution by token:", lead.distribution_token);
      const { data, error } = await supabase
        .from("distributions")
        .select("id, automation_template_ids, token, link_text")
        .eq("token", lead.distribution_token)
        .eq("is_active", true)
        .maybeSingle();
      distribution = data as DistributionRecord | null;
      distError = error;
    } else {
      console.log("🔍 [AUTOMATION] Looking up distribution by questionnaire_id:", lead.questionnaire_id);
      const { data, error } = await supabase
        .from("distributions")
        .select("id, automation_template_ids, token, link_text")
        .eq("questionnaire_id", lead.questionnaire_id)
        .eq("is_active", true)
        .maybeSingle();
      distribution = data as DistributionRecord | null;
      distError = error;
    }

    if (distError || !distribution || !distribution.automation_template_ids?.length) {
      console.log("❌ [AUTOMATION] No active distribution found");
      return;
    }

    const { data: questions, error: questionsError } = await supabase
      .from("questions")
      .select("*")
      .eq("questionnaire_id", lead.questionnaire_id)
      .order("order_index", { ascending: true });

    if (questionsError || !questions) {
      console.error("❌ [AUTOMATION] Questions not found:", questionsError);
      return;
    }

    const contact = extractContactInfo(lead.answer_json, questions);
    const contactName = contact.name || lead.name || lead.client_name || "לקוח יקר";

    const { data: ownerProfile, error: profileError } = await supabase
      .from("profiles")
      .select("company, email, phone, whatsapp, website, image_url, logo_url, occupation, suboccupation, social_networks")
      .eq("id", questionnaire.owner_id)
      .maybeSingle();

    if (profileError || !ownerProfile) {
      console.error("❌ [AUTOMATION] Error loading owner profile:", profileError);
      return;
    }

    const { data: businessContactSettings, error: contactSettingsError } = await supabase
      .from("business_contact_settings")
      .select("*")
      .eq("business_id", questionnaire.owner_id)
      .maybeSingle();

    if (contactSettingsError && contactSettingsError.code !== "PGRST116") {
      console.error("⚠️ [AUTOMATION] Error loading business contact settings:", contactSettingsError);
    }

    const resolvedContactSettings = resolveContactSettings(ownerProfile, businessContactSettings ?? null);
    const contactCTA = buildContactCTAElements(resolvedContactSettings);
    const replyToEmail = resolvedContactSettings.email || ownerProfile.email || null;

    const sentChannels = new Set<string>();
    const automationLogEntries: Json[] = [];

    const channelInfo = parseChannel(lead.channel);
    const channelLabel = resolveChannelLabel(channelInfo);

    for (const templateMapping of distribution.automation_template_ids) {
      const { template_id, channels } = templateMapping;
      const { data: template, error: tError } = await supabase
        .from("automation_templates")
        .select("*")
        .eq("id", template_id)
        .maybeSingle();

      if (tError || !template) {
        console.error("❌ [AUTOMATION] Template not found:", template_id, tError);
        continue;
      }

      const templateChannels = Array.isArray(channels) ? channels : [];
      const effectiveChannels = templateChannels.filter((channel: string) =>
        resolvedContactSettings.enabledChannels.includes(channel)
      );

      if (!effectiveChannels.length) {
        console.log("⚠️ [AUTOMATION] No channels allowed by business contact settings for template:", template_id);
        continue;
      }

      const automationLogEntry: Json = {
        template_id,
        template_name: template.name,
        template_type: template.message_type,
        channels: effectiveChannels,
        executed_at: new Date().toISOString(),
      };

      const baseSubject =
        template.subject ||
        template.email_subject ||
        `תודה על הפנייה – ${ownerProfile.company || "הצוות שלנו"}`;

      const linkLabel = questionnaire.link_label || distribution.link_text || "לחץ כאן";
      let linkUrl = template.link_url ? replaceVariables(template.link_url, { name: contactName, email: contact.email, phone: contact.phone }, ownerProfile) : null;
      if (linkUrl && !/^https?:\/\//i.test(linkUrl)) {
        linkUrl = `https://${linkUrl}`;
      }

      const messageBody = replaceVariables(template.body || "", { name: contactName, email: contact.email, phone: contact.phone }, ownerProfile);
      const subject = replaceVariables(baseSubject, { name: contactName, email: contact.email, phone: contact.phone }, ownerProfile);

      const htmlEmail = buildEmailHTML(
        messageBody,
        template.use_profile_logo ? ownerProfile.logo_url : null,
        template.use_profile_image ? ownerProfile.image_url : null,
        linkUrl,
        template.image_url || null,
        ownerProfile.company || "iHoogi",
        linkLabel,
        contactCTA.htmlSection,
      );

      const plainTextBody = appendContactFooter(messageBody, contactCTA.textFooter);
      const whatsappBody = appendContactFooter(messageBody, contactCTA.whatsappFooter);

      for (const channel of effectiveChannels) {
        if (sentChannels.has(channel)) {
          continue;
        }

        if (channel === "email" && contact.email) {
          await sendAutomationEmail(contact.email, subject, htmlEmail, plainTextBody, replyToEmail);
          sentChannels.add("email");
        } else if (channel === "whatsapp" && contact.phone) {
          await sendAutomationWhatsApp(contact.phone, whatsappBody, template.image_url || null);
          sentChannels.add("whatsapp");
        } else if (channel === "sms" && contact.phone) {
          await sendAutomationSMS(contact.phone, whatsappBody);
          sentChannels.add("sms");
        }
      }

      automationLogEntries.push(automationLogEntry);
    }

    if (automationLogEntries.length) {
      const existingLogs = Array.isArray(lead.automations) ? lead.automations : [];
      const updatePayload: Record<string, unknown> = {
        automations: [...existingLogs, ...automationLogEntries],
      };

      if (!lead.channel && channelLabel) {
        updatePayload.channel = channelLabel;
      }

      if (!lead.distribution_token && distribution?.token) {
        updatePayload.distribution_token = distribution.token;
      }

      await supabase.from("leads").update(updatePayload).eq("id", lead.id);
    }
  } catch (error) {
    console.error("❌ [AUTOMATION] Error executing automation:", error);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
    }

    if (!assertSignature(req)) {
      return new Response("Forbidden", { status: 403, headers: corsHeaders });
    }

    const payload = await req.json() as TriggerPayload;

    if (payload?.type !== "INSERT" || payload?.table !== "leads") {
      return new Response("Ignored", { status: 200, headers: corsHeaders });
    }

    await handleAutomation(payload.record);
    return new Response("OK", { status: 200, headers: corsHeaders });
  } catch (err) {
    console.error("❌ [WEBHOOK] Error:", err);
    return new Response("Internal Error", { status: 500, headers: corsHeaders });
  }
});
// supabase/functions/on-new-lead/index.ts
// Deno Edge Function – triggered by DB on lead INSERT via webhook
// Handles automation emails based on questionnaire automation_template_id

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type LeadRecord = {
  id: string;
  email?: string | null;
  phone?: string | null;
  name?: string | null;
  questionnaire_id?: string | null;
  client_name?: string | null;
  answer_json?: Record<string, any> | null;
  created_at?: string;
  [k: string]: unknown;
};

type TriggerPayload = {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: LeadRecord;
};

interface AutomationTemplate {
  id: string;
  name: string;
  message_type: 'personal' | 'ai';
  subject?: string;
  body: string;
  ai_message_length?: string;
  user_id: string;
  link_url?: string;
  image_url?: string;
  use_profile_logo?: boolean;
  use_profile_image?: boolean;
}

interface BusinessContactSettingsRow {
  return_email?: string | null;
  return_phone?: string | null;
  return_whatsapp?: string | null;
  enabled_channels?: string[] | null;
}

interface ResolvedContactSettings {
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  enabledChannels: string[];
}

interface ContactCTAElements {
  htmlSection: string;
  textFooter: string;
  whatsappFooter: string;
}

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const INCOMING_SECRET = Deno.env.get("INCOMING_WEBHOOK_SECRET") ?? "";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function assertSignature(req: Request) {
  if (!INCOMING_SECRET) return true; // Skip validation in dev
  const sig = req.headers.get("x-webhook-secret") || "";
  return sig === INCOMING_SECRET;
}

async function handleAutomation(lead: LeadRecord) {
  console.log("🚀 [AUTOMATION] handleAutomation called for lead:", lead.id);
  console.log("📊 [AUTOMATION] Lead data:", {
    questionnaire_id: lead.questionnaire_id,
    distribution_token: lead.distribution_token,
    has_answer_json: !!lead.answer_json,
    email: lead.email,
    name: lead.name
  });

  if (!lead.questionnaire_id || !lead.answer_json) {
    console.log("❌ [AUTOMATION] Lead missing questionnaire_id or answer_json, skipping automation");
    return;
  }

  try {
    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 1. Query questionnaire
    const { data: questionnaire, error: qError } = await supabase
      .from('questionnaires')
      .select('id, owner_id, title, link_label')
      .eq('id', lead.questionnaire_id)
      .single();

    if (qError || !questionnaire) {
      console.log("Questionnaire not found:", qError);
      return;
    }

    // 2. Look up distribution - first try by distribution_token if available, then by questionnaire_id
    let distribution: any = null;
    let distError: any = null;

    if (lead.distribution_token) {
      // Lead came from a distribution link - look up by token
      console.log("🔍 [AUTOMATION] Looking up distribution by token:", lead.distribution_token);
      const { data, error } = await supabase
        .from('distributions')
        .select('id, automation_template_ids')
        .eq('token', lead.distribution_token)
        .eq('is_active', true)
        .single();

      distribution = data;
      distError = error;
    } else {
      // Legacy: look up by questionnaire_id
      console.log("🔍 [AUTOMATION] Looking up distribution by questionnaire_id:", lead.questionnaire_id);
      const { data, error } = await supabase
        .from('distributions')
        .select('id, automation_template_ids')
        .eq('questionnaire_id', lead.questionnaire_id)
        .eq('is_active', true)
        .single();

      distribution = data;
      distError = error;
    }

    if (distError || !distribution || !distribution.automation_template_ids) {
      console.log("❌ [AUTOMATION] No active distribution found");
      console.log("Distribution error:", distError);
      console.log("Distribution data:", distribution);
      return;
    }

    console.log("🤖 [AUTOMATION] Starting automation for lead:", lead.id);
    console.log("📋 [AUTOMATION] Distribution found with templates:", distribution.automation_template_ids);
    console.log("🔗 [AUTOMATION] Link text from questionnaire:", questionnaire.link_label || 'לחץ כאן (default)');

    // 3. Load questions for this questionnaire
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('*')
      .eq('questionnaire_id', lead.questionnaire_id)
      .order('order_index', { ascending: true });

    if (questionsError || !questions) {
      console.error("❌ [AUTOMATION] Questions not found:", questionsError);
      return;
    }

    // 4. Extract contact information from answer_json
    const contact = extractContactInfo(lead.answer_json, questions);
    console.log("👤 [AUTOMATION] Contact extracted:", contact);

    // 5. Load owner profile with all necessary fields for AI
    const { data: ownerProfile, error: profileError } = await supabase
      .from('profiles')
      .select('company, email, phone, website, image_url, logo_url, occupation, suboccupation, social_networks')
      .eq('id', questionnaire.owner_id)
      .single();

    if (profileError) {
      console.error("❌ [AUTOMATION] Error loading owner profile:", profileError);
      return;
    }

    console.log("✅ [AUTOMATION] Owner profile loaded");

    const { data: businessContactSettings, error: contactSettingsError } = await supabase
      .from('business_contact_settings')
      .select('return_email, return_phone, return_whatsapp, enabled_channels')
      .eq('business_id', questionnaire.owner_id)
      .maybeSingle();

    if (contactSettingsError && contactSettingsError.code !== 'PGRST116') {
      console.error("⚠️ [AUTOMATION] Error loading business contact settings:", contactSettingsError);
    }

    const resolvedContactSettings = resolveContactSettings(ownerProfile, businessContactSettings);
    const contactCTA = buildContactCTAElements(resolvedContactSettings);
    const replyToEmail = resolvedContactSettings.email || ownerProfile.email || null;

    // Track which channels have been used to prevent duplicates
    const sentChannels = new Set<string>();

    // 6. Process each template with its channels
    console.log("🔄 [AUTOMATION] Processing", distribution.automation_template_ids.length, "template(s)");

    for (const templateMapping of distribution.automation_template_ids) {
      const { template_id, channels } = templateMapping;
      console.log("🎯 [AUTOMATION] Loading template:", template_id, "with channels:", channels);

      // Load the template
      const { data: template, error: tError } = await supabase
        .from('automation_templates')
        .select('*')
        .eq('id', template_id)
        .single();

      if (tError || !template) {
        console.error("❌ [AUTOMATION] Template not found:", template_id, tError);
        continue;
      }

      console.log("✅ [AUTOMATION] Template loaded:", {
        name: template.name,
        message_type: template.message_type,
        has_body: !!template.body,
        has_subject: !!template.subject,
        use_profile_logo: template.use_profile_logo,
        use_profile_image: template.use_profile_image,
        link_url: template.link_url,
        image_url: template.image_url
      });
      console.log("👤 [AUTOMATION] Owner profile data:", {
        logo_url: ownerProfile.logo_url,
        image_url: ownerProfile.image_url,
        use_profile_logo: template.use_profile_logo,
        use_profile_image: template.use_profile_image
      });
      console.log("🖼️ [AUTOMATION] Template media data:", {
        link_url: template.link_url,
        image_url: template.image_url
      });

      const templateChannels = Array.isArray(channels) ? channels : [];
      const effectiveChannels = templateChannels.filter((channel: string) =>
        resolvedContactSettings.enabledChannels.includes(channel)
      );

      if (!effectiveChannels.length) {
        console.log("⚠️ [AUTOMATION] No channels allowed by business contact settings for template:", template_id);
        continue;
      }

      // Only handle personal type templates for now
      console.log("🔍 [AUTOMATION] Checking template conditions - type:", template.message_type, "has_body:", !!template.body);

      if (template.message_type === 'personal' && template.body) {
        console.log("✅ [AUTOMATION] Template conditions met, preparing email...");
        const subject = replaceVariables(template.subject || 'Response from ' + (ownerProfile.company || 'our team'), contact, ownerProfile);
        const messageBody = replaceVariables(template.body, contact, ownerProfile);

        // Fix link URL - add https:// if missing
        let linkUrl = template.link_url ? replaceVariables(template.link_url, contact, ownerProfile) : null;
        if (linkUrl && !linkUrl.startsWith('http://') && !linkUrl.startsWith('https://')) {
          linkUrl = 'https://' + linkUrl;
        }

        // Log what we're passing to buildEmailHTML
        console.log("📧 [EMAIL BUILD] Building email with parameters:", {
          use_profile_logo: template.use_profile_logo,
          logo_url_raw: ownerProfile.logo_url,
          logo_url_to_use: template.use_profile_logo ? ownerProfile.logo_url : null,
          use_profile_image: template.use_profile_image,
          image_url_raw: ownerProfile.image_url,
          image_url_to_use: template.use_profile_image ? ownerProfile.image_url : null,
          link_url: linkUrl,
          attachment_image_url: template.image_url
        });

        const plainTextBody = appendContactFooter(messageBody, contactCTA.textFooter);
        const whatsappBody = appendContactFooter(messageBody, contactCTA.whatsappFooter);

        // Build HTML email with template elements
        const htmlEmail = buildEmailHTML(
          messageBody,
          template.use_profile_logo ? ownerProfile.logo_url : null,
          template.use_profile_image ? ownerProfile.image_url : null,
          linkUrl,
          template.image_url,
          ownerProfile.company || 'Our Team',
          questionnaire.link_label || 'לחץ כאן',
          contactCTA.htmlSection
        );

        // Send on each configured channel
        console.log("📤 [AUTOMATION] Sending on", effectiveChannels.length, "channel(s):", effectiveChannels);

        for (const channel of effectiveChannels) {
          console.log("📬 [AUTOMATION] Processing channel:", channel);

          // Skip if this channel was already used
          if (sentChannels.has(channel)) {
            console.log("⏭️ [AUTOMATION] Skipping", channel, "- already  sent in previous template");
            continue;
          }

          if (channel === 'email' && contact.email) {
            console.log("📧 [AUTOMATION] Sending email to:", contact.email);
            console.log("📧 [AUTOMATION] Email subject:", subject);
            await sendAutomationEmail(contact.email, subject, htmlEmail, plainTextBody, replyToEmail || undefined);
            sentChannels.add('email');
          } else if (channel === 'email' && !contact.email) {
            console.log("⚠️ [AUTOMATION] Email channel selected but no ccontact email");
          } else if (channel === 'whatsapp' && contact.phone) {
            console.log("📱 [WHATSAPP] Sending WhatsApp to:", contact.phone);
            await sendAutomationWhatsApp(contact.phone, whatsappBody, template.image_url || null);
            sentChannels.add('whatsapp');
          } else if (channel === 'whatsapp' && !contact.phone) {
            console.log("⚠️ [AUTOMATION] WhatsApp channel selected but nno contact phone");
          } else if (channel === 'sms' && contact.phone) {
            console.log("💬 [SMS] Sending SMS to:", contact.phone);
            await sendAutomationSMS(contact.phone, whatsappBody);
            sentChannels.add('sms');
          } else if (channel === 'sms' && !contact.phone) {
            console.log("⚠️ [AUTOMATION] SMS channel selected but no contact phoone");
          }
        }
      } else if (template.message_type === 'ai') {
        console.log("🤖 [AUTOMATION] Processing AI template:", template.name);

        // Generate AI response using the same parameters as the demo
        try {
          // Build social media links string
          let socialMediaLinks = '';
          if (ownerProfile?.social_networks) {
            const links = [];
            if (ownerProfile.social_networks.facebook) links.push(`Facebook: ${ownerProfile.social_networks.facebook}`);
            if (ownerProfile.social_networks.instagram) links.push(`Instagram: ${ownerProfile.social_networks.instagram}`);
            if (ownerProfile.social_networks.linkedin) links.push(`LinkedIn: ${ownerProfile.social_networks.linkedin}`);
            if (ownerProfile.social_networks.tiktok) links.push(`TikTok: ${ownerProfile.social_networks.tiktok}`);
            if (ownerProfile.social_networks.youtube) links.push(`YouTube: ${ownerProfile.social_networks.youtube}`);
            socialMediaLinks = links.join(', ');
          }

          // Build client answers from lead answer_json
          let clientAnswers = '';
          if (lead.answer_json && questions) {
            const answers = [];
            questions.forEach(q => {
              const answer = lead.answer_json[q.id];
              if (answer) {
                const answerText = Array.isArray(answer) ? answer.join(', ') : answer;
                answers.push(`${q.question_text || 'Question'}: ${answerText}`);
              }
            });
            clientAnswers = answers.join('\n');
          }

          const aiRequestBody = {
            mainCategory: ownerProfile?.occupation || 'General Business',
            subcategory: ownerProfile?.suboccupation || 'Professional Services',
            businessDescription: ownerProfile?.company || '',
            websiteUrl: ownerProfile?.website || '',
            socialMediaLinks: socialMediaLinks,
            clientAnswers: clientAnswers || 'New customer inquiry',
            emailLength: template.ai_message_length || 'medium'
          };

          console.log("🔮 [AI] Generating AI response with length:", template.ai_message_length);
          console.log("📝 [AI] Request body:", JSON.stringify(aiRequestBody, null, 2));
          console.log("🔍 [AI] Validation check - mainCategory:", !!aiRequestBody.mainCategory, "subcategory:", !!aiRequestBody.subcategory, "clientAnswers:", !!aiRequestBody.clientAnswers);

          const { data: aiData, error: aiError } = await supabase.functions.invoke('generate-ai-response', {
            body: aiRequestBody
          });

          console.log("📥 [AI] Response received:", { hasData: !!aiData, hasEmail: !!aiData?.email, error: aiError });
          if (aiData) {
            console.log("📧 [AI] AI data:", JSON.stringify(aiData, null, 2));
          }
          if (aiError) {
            console.error("❌ [AI] AI Error object:", JSON.stringify(aiError, null, 2));
          }

          if (aiError || !aiData?.email) {
            console.error("❌ [AI] Error generating AI response - using fallback");
            console.error("❌ [AI] aiError:", aiError);
            console.error("❌ [AI] aiData:", JSON.stringify(aiData, null, 2));
            // Continue with fallback message
            const fallbackMessage = `שלום ${contact.name.split(' ')[0]},\n\nתודה רבה על פנייתך. קיבלנו את המידע שלך ונחזור אליך בהקדם.\n\nבברכה,\n${ownerProfile.company || 'הצוות שלנו'}`;

            const subject = replaceVariables(template.subject || 'תודה על הפנייה', contact, ownerProfile);

            // Fix link URL
            let linkUrl = template.link_url ? replaceVariables(template.link_url, contact, ownerProfile) : null;
            if (linkUrl && !linkUrl.startsWith('http://') && !linkUrl.startsWith('https://')) {
              linkUrl = 'https://' + linkUrl;
            }

            const fallbackPlainText = appendContactFooter(fallbackMessage, contactCTA.textFooter);
            const fallbackWhatsapp = appendContactFooter(fallbackMessage, contactCTA.whatsappFooter);

            const htmlEmail = buildEmailHTML(
              fallbackMessage,
              template.use_profile_logo ? ownerProfile.logo_url : null,
              template.use_profile_image ? ownerProfile.image_url : null,
              linkUrl,
              template.image_url,
              ownerProfile.company || 'Our Team',
              distribution.link_text || 'לחץ כאן',
              contactCTA.htmlSection
            );

            console.log("📤 [AUTOMATION] Sending AI message (fallback) on", effectiveChannels.length, "channel(s)");
            for (const channel of effectiveChannels) {
              // Skip if this channel was already used
              if (sentChannels.has(channel)) {
                console.log("⏭️ [AUTOMATION] Skipping", channel, "- already  sentt in previous template");
                continue;
              }

              if (channel === 'email' && contact.email) {
                console.log("📧 [AUTOMATION] Sending AI email to:", contact.email);
                await sendAutomationEmail(contact.email, subject, htmlEmail, fallbackPlainText, replyToEmail || undefined);
                sentChannels.add('email');
              } else if (channel === 'whatsapp' && contact.phone) {
                console.log("📱 [WHATSAPP] Sending AI WhatsApp (fallback) to:", contact.phone);
                await sendAutomationWhatsApp(contact.phone, fallbackWhatsapp, template.image_url || null);
                sentChannels.add('whatsapp');
              } else if (channel === 'whatsapp' && !contact.phone) {
                console.log("⚠️ [AUTOMATION] WhatsApp channel selected but no coontact phone");
              } else if (channel === 'sms' && contact.phone) {
                console.log("💬 [SMS] Sending AI SMS (fallback) to:", contact.phone);
                await sendAutomationSMS(contact.phone, fallbackWhatsapp);
                sentChannels.add('sms');
              } else if (channel === 'sms' && !contact.phone) {
                console.log("⚠️ [AUTOMATION] SMS channel selected but no contactt phone");
              }
            }
          } else {
            // Use AI-generated response
            const aiMessage = aiData.email;
            console.log("✅ [AI] AI response generated successfully");
            console.log("📝 [AI] AI email content:", aiMessage.substring(0, 200));

            const subject = replaceVariables(template.subject || 'תודה על הפנייה', contact, ownerProfile);
            console.log("📧 [AI] Email subject:", subject);

            // Fix link URL
            let linkUrl = template.link_url ? replaceVariables(template.link_url, contact, ownerProfile) : null;
            if (linkUrl && !linkUrl.startsWith('http://') && !linkUrl.startsWith('https://')) {
              linkUrl = 'https://' + linkUrl;
            }

            const aiPlainText = appendContactFooter(aiMessage, contactCTA.textFooter);
            const aiWhatsappText = appendContactFooter(aiMessage, contactCTA.whatsappFooter);

            const htmlEmail = buildEmailHTML(
              aiMessage,
              template.use_profile_logo ? ownerProfile.logo_url : null,
              template.use_profile_image ? ownerProfile.image_url : null,
              linkUrl,
              template.image_url,
              ownerProfile.company || 'Our Team',
              distribution.link_text || 'לחץ כאן',
              contactCTA.htmlSection
            );

            console.log("📤 [AUTOMATION] Sending AI message on", effectiveChannels.length, "channel(s)");
            for (const channel of effectiveChannels) {
              // Skip if this channel was already used
              if (sentChannels.has(channel)) {
                console.log("⏭️ [AUTOMATION] Skipping", channel, "- already sentt in previous template");
                continue;
              }

              if (channel === 'email' && contact.email) {
                console.log("📧 [AUTOMATION] Sending AI email to:", contact.email);
                await sendAutomationEmail(contact.email, subject, htmlEmail, aiPlainText, replyToEmail || undefined);
                sentChannels.add('email');
              } else if (channel === 'whatsapp' && contact.phone) {
                console.log("📱 [WHATSAPP] Sending AI WhatsApp to:", contact.phone);
                await sendAutomationWhatsApp(contact.phone, aiWhatsappText, template.image_url || null);
                sentChannels.add('whatsapp');
              } else if (channel === 'whatsapp' && !contact.phone) {
                console.log("⚠️ [AUTOMATION] WhatsApp channel selected but no coontact phone");
              } else if (channel === 'sms' && contact.phone) {
                console.log("💬 [SMS] Sending AI SMS to:", contact.phone);
                await sendAutomationSMS(contact.phone, aiWhatsappText);
                sentChannels.add('sms');
              } else if (channel === 'sms' && !contact.phone) {
                console.log("⚠️ [AUTOMATION] SMS channel selected but no contactt phone");
              }
            }
          }
        } catch (aiError) {
          console.error("❌ [AI] Error in AI template processing:", aiError);
        }
      } else {
        console.log("⏭️  [AUTOMATION] Skipping template - conditions not met. Type:", template.message_type, "Has body:", !!template.body);
      }
    }

    console.log("✅ [AUTOMATION] Automation completed successfully");
    console.log("📊 [AUTOMATION] Channels used in this automation:", Array.from(sentChannels).join(', '));
  } catch (error) {
    console.error("❌ [AUTOMATION] Error executing automation:", error);
  }
}

function extractContactInfo(answerJson: Record<string, any>, questions: any[]): {
  name: string;
  email: string;
  phone?: string;
} {
  const contact: { name: string; email: string; phone?: string } = {
    name: '',
    email: ''
  };

  // Extract from first 3 questions (name, email, phone)
  if (questions.length >= 1) {
    const nameValue = answerJson[questions[0].id];
    contact.name = Array.isArray(nameValue) ? nameValue.join(', ') : (nameValue || '');
  }

  if (questions.length >= 2) {
    const emailValue = answerJson[questions[1].id];
    contact.email = Array.isArray(emailValue) ? emailValue[0] : (emailValue || '');
  }

  if (questions.length >= 3) {
    const phoneValue = answerJson[questions[2].id];
    contact.phone = Array.isArray(phoneValue) ? phoneValue[0] : (phoneValue || '');
  }

  return contact;
}

function replaceVariables(
  template: string,
  contact: { name: string; email: string; phone?: string },
  ownerProfile: any
): string {
  return template
    .replace(/\{\{firstName\}\}/g, contact.name.split(' ')[0] || contact.name)
    .replace(/\{\{fullName\}\}/g, contact.name)
    .replace(/\{\{businessName\}\}/g, ownerProfile.company || ownerProfile.email?.split('@')[0] || 'Our Team')
    .replace(/\{\{email\}\}/g, contact.email)
    .replace(/\{\{phone\}\}/g, contact.phone || '');
}

function getPublicUrl(url: string | null, urlType: string = 'unknown'): string | null {
  console.log(`🔗 [URL CONVERSION] Processing ${urlType}:`, { input: url });

  if (!url) {
    console.log(`🔗 [URL CONVERSION] ${urlType}: No URL provided, returning null`);
    return null;
  }

  // If already a full URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    console.log(`🔗 [URL CONVERSION] ${urlType}: Already a full URL, returning as-is`);
    return url;
  }

  // If it's a Supabase storage path, convert to public URL
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
  if (!SUPABASE_URL) {
    console.error(`❌ [URL CONVERSION] ${urlType}: SUPABASE_URL env var not set!`);
    return url;
  }

  // Remove leading slash if present
  const cleanPath = url.startsWith('/') ? url.substring(1) : url;
  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${cleanPath}`;

  console.log(`🔗 [URL CONVERSION] ${urlType}: Converted to public URL:`, {
    original: url,
    cleaned: cleanPath,
    result: publicUrl
  });

  return publicUrl;
}

function resolveContactSettings(
  ownerProfile: any,
  settings: BusinessContactSettingsRow | null
): ResolvedContactSettings {
  const email = (settings?.return_email || ownerProfile.email || '').trim() || null;
  const phone = (settings?.return_phone || ownerProfile.phone || '').trim() || null;
  const whatsapp = (settings?.return_whatsapp || phone || '').trim() || null;

  const availableChannels: string[] = [];
  if (email) availableChannels.push('email');
  if (phone) availableChannels.push('sms');
  if (whatsapp) availableChannels.push('whatsapp');

  let enabledChannels = Array.isArray(settings?.enabled_channels)
    ? settings!.enabled_channels!.map((channel) => `${channel}`.trim()).filter(Boolean)
    : [];

  if (enabledChannels.length) {
    enabledChannels = enabledChannels.filter((channel) => availableChannels.includes(channel));
  } else {
    enabledChannels = [...availableChannels];
  }

  if (!enabledChannels.length) {
    enabledChannels = availableChannels.length ? [...availableChannels] : ['email'];
  }

  return {
    email,
    phone,
    whatsapp,
    enabledChannels
  };
}

function buildContactCTAElements(settings: ResolvedContactSettings): ContactCTAElements {
  const htmlButtons: string[] = [];
  const textLines: string[] = [];

  if (settings.email) {
    const mailHref = `mailto:${settings.email}`;
    htmlButtons.push(`<a href="${mailHref}" style="background-color:#2563eb;color:white;padding:10px 18px;text-decoration:none;border-radius:999px;display:inline-block;font-size:14px;">📧 שלח מייל</a>`);
    textLines.push(`📧 שלח מייל: ${settings.email}`);
  }

  if (settings.phone) {
    const telHref = `tel:${sanitizePhoneForTel(settings.phone)}`;
    htmlButtons.push(`<a href="${telHref}" style="background-color:#16a34a;color:white;padding:10px 18px;text-decoration:none;border-radius:999px;display:inline-block;font-size:14px;">📞 חזור טלפונית</a>`);
    textLines.push(`📞 טלפון: ${settings.phone}`);
  }

  if (settings.whatsapp) {
    const whatsappHref = formatWhatsAppLink(settings.whatsapp);
    if (whatsappHref) {
      htmlButtons.push(`<a href="${whatsappHref}" style="background-color:#0ea5e9;color:white;padding:10px 18px;text-decoration:none;border-radius:999px;display:inline-block;font-size:14px;">💬 WhatsApp</a>`);
      textLines.push(`💬 וואטסאפ: ${settings.whatsapp}`);
    }
  }

  const textFooter = textLines.length ? `ליצירת קשר עם העסק:\n${textLines.join('\n')}` : '';
  const htmlSection = htmlButtons.length
    ? `<div style="text-align:center;margin:25px 0 10px;display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">${htmlButtons.join('')}</div>`
    : '';

  return {
    htmlSection,
    textFooter,
    whatsappFooter: textFooter
  };
}

function appendContactFooter(message: string, footer: string): string {
  if (!footer) return message;
  return `${message}\n\n${footer}`;
}

function sanitizePhoneForTel(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

function formatWhatsAppLink(phone: string): string | null {
  const digits = phone.replace(/[^+\d]/g, '');
  if (!digits) return null;
  const normalized = digits.startsWith('+')
    ? digits.substring(1)
    : digits.startsWith('0')
      ? `972${digits.substring(1)}`
      : digits;
  return normalized ? `https://wa.me/${normalized}` : null;
}

function buildEmailHTML(
  messageBody: string,
  logoUrl: string | null,
  profileImageUrl: string | null,
  linkUrl: string | null,
  attachmentImageUrl: string | null,
  businessName: string,
  linkText: string = 'לחץ כאן',
  ctaHtml: string | null = null
): string {
  // Convert line breaks to <br> tags
  const formattedBody = messageBody.replace(/\n/g, '<br>');

  // Convert all image URLs to public URLs
  const publicLogoUrl = getPublicUrl(logoUrl, 'logo');
  const publicProfileImageUrl = getPublicUrl(profileImageUrl, 'profile_image');
  const publicAttachmentImageUrl = getPublicUrl(attachmentImageUrl, 'attachment_image');

  console.log("🎨 [EMAIL] Building HTML with final URLs:", {
    logoUrl: publicLogoUrl,
    profileImageUrl: publicProfileImageUrl,
    linkUrl,
    attachmentImageUrl: publicAttachmentImageUrl
  });
  console.log("📝 [EMAIL] Message body length:", messageBody.length);
  console.log("📝 [EMAIL] Business name:", businessName);
  console.log("📝 [EMAIL] Link text:", linkText);

  // Safe email template - Progressive enhancement approach
  let html = `
<!DOCTYPE html>
<html dir="rtl">
<head>
  <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: white; padding: 0;">

      <!-- Green Header -->
      <div style="background-color: #199f3a; padding: 30px 20px; text-align: center;">
        ${publicLogoUrl ? `
        <div style="margin-bottom: 15px;">
          <img src="${publicLogoUrl}" alt="${businessName}" style="height: 120px;">
        </div>
        ` : ''}
        <p style="color: white; font-size: 28px; margin: 0; font-weight: bold;">${businessName}</p>
      </div>

      <!-- Content Area -->
      <div style="padding: 30px 20px; text-align: right;">

        ${linkUrl ? `
        <div style="text-align: center; margin: 20px 0;">
          <a href="${linkUrl}" style="background-color: #16a34a; color: white; padding: 12px 30px; text-decoration: none; display: inline-block; font-size: 16px;">${linkText}</a>
        </div>
        ` : ''}

        <div style="margin: 20px 0; line-height: 1.6;">
          ${formattedBody}
        </div>

        <p style="text-align: center; margin-top: 30px; color: #666;">בברכה,<br>${businessName || 'iHoogi'}</p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #999;">
        <p style="margin: 5px 0; color: #666;">נשלח באופן אוטומטי באמצעות iHoogi – מערכת שאלונים חכמה המחברת עסקים ללקוחותיהם, מבית <a href="https://www.ai-4biz.com" style="color: #666; text-decoration: underline;">AI-4Biz</a>, בשם העסק שמולו פנית.</p>
      </div>

    </div>
  </div>
</body>
</html>
  `.trim();

  if (ctaHtml) {
    html = html.replace('</body>', `${ctaHtml}</body>`);
  }

  return html;
}

function generateMessage(
  template: AutomationTemplate,
  contact: { name: string; email: string; phone?: string },
  ownerProfile: any,
  questionnaire: any,
  answerJson: Record<string, any>,
  questions: any[]
): { subject: string; message: string } {
  const businessName = ownerProfile.company || ownerProfile.email?.split('@')[0] || 'Our Team';
  const firstName = contact.name.split(' ')[0] || contact.name;

  // Always use template's email_subject and apply variable replacement
  const subject = replaceVariables(
    template.email_subject || 'Thank you for your response',
    contact,
    ownerProfile
  );

  let message = '';

  switch (template.template_type) {
    case 'standard':
      message = `Hello ${firstName},\n\nThank you for completing our questionnaire. Your submission has been received and we will get back to you soon.\n\nBest regards,\n${businessName}`