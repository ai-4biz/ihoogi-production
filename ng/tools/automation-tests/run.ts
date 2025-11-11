import { AutomationService } from '../../src/app/core/services/automation.service';
import { LanguageService } from '../../src/app/core/services/language.service';
import { buildScenarioFixtures, ScenarioFixture } from './fixtures';
import { writeScenarioOutputs } from './writers';
import * as path from 'node:path';
import { promises as fs } from 'node:fs';

const OUTPUT_ROOT = path.resolve(process.cwd(), 'tools/automation-tests/out');
const contactHeaderHe = 'ליצירת קשר עם בעל העסק';

interface ScenarioResult {
  id: string;
  title: string;
  passed: boolean;
  issues: string[];
  outputDir: string;
}

function countOccurrences(haystack: string, needle: string): number {
  if (!needle) {
    return 0;
  }
  const regex = new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  return (haystack.match(regex) || []).length;
}

function detectContactBlock(content: string): boolean {
  return content.includes(contactHeaderHe) || content.includes('Contact the Business Owner');
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function htmlContainsText(html: string, plainText: string): boolean {
  const textOnly = html.replace(/<[^>]+>/g, ' ');
  return normalizeWhitespace(textOnly).includes(normalizeWhitespace(plainText));
}

function sanitizeDigits(value: string): string {
  return value.replace(/\D+/g, '');
}

async function ensureCleanOutputRoot() {
  await fs.rm(OUTPUT_ROOT, { recursive: true, force: true });
  await fs.mkdir(OUTPUT_ROOT, { recursive: true });
}

async function runScenario(
  automationService: AutomationService,
  scenario: ScenarioFixture
): Promise<ScenarioResult> {
  const issues: string[] = [];
  const scenarioId = scenario.definition.id;
  const outputDir = path.join(OUTPUT_ROOT, scenarioId);
  const serviceRef = automationService as any;

  const payload = serviceRef.buildFinalMessage(
    scenario.profile,
    {
      ...scenario.template,
      channels: scenario.definition.channels,
      contactChannels: scenario.definition.channels
    },
    {
      processedText: scenario.template.message_body,
      fallbackChannels: scenario.definition.channels
    }
  );

  const shouldInjectBlock = scenario.definition.channels.length > 0;
  const emailBlockDetected = detectContactBlock(payload.emailHtml) && detectContactBlock(payload.emailText);
  const whatsappBlockDetected = detectContactBlock(payload.whatsappBody);
  const smsBlockDetected = detectContactBlock(payload.smsBody);

  if (!htmlContainsText(payload.emailHtml, 'תודה רבה על מילוי הטופס')) {
    issues.push('Email HTML missing template content');
  }

  if (!payload.emailText.includes('תודה רבה על מילוי הטופס')) {
    issues.push('Email text missing template content');
  }

  if (shouldInjectBlock) {
    if (!emailBlockDetected) {
      issues.push('Contact block missing in email output');
    }
    if (scenario.definition.channels.includes('whatsapp') && !whatsappBlockDetected) {
      issues.push('Contact block missing in WhatsApp output');
    }
    if (scenario.definition.channels.includes('sms') && !smsBlockDetected) {
      issues.push('Contact block missing in SMS output');
    }
  } else {
    if (emailBlockDetected || whatsappBlockDetected || smsBlockDetected) {
      issues.push('Contact block present despite no channels selected');
    }
  }

  if (countOccurrences(payload.emailHtml, contactHeaderHe) > 1) {
    issues.push('Duplicate contact block detected in email HTML');
  }
  if (countOccurrences(payload.emailText, contactHeaderHe) > 1) {
    issues.push('Duplicate contact block detected in email text');
  }
  if (countOccurrences(payload.whatsappBody, contactHeaderHe) > 1) {
    issues.push('Duplicate contact block detected in WhatsApp body');
  }
  if (countOccurrences(payload.smsBody, contactHeaderHe) > 1) {
    issues.push('Duplicate contact block detected in SMS body');
  }

  if (
    scenario.definition.channels.includes('email') &&
    !payload.emailHtml.includes('mailto:')
  ) {
    issues.push('Email HTML missing mailto link');
  }

  if (
    scenario.definition.channels.includes('sms') &&
    !payload.emailHtml.includes('tel:')
  ) {
    issues.push('Email HTML missing tel link for SMS channel');
  }

  if (
    scenario.definition.channels.includes('whatsapp') &&
    !payload.emailHtml.includes('https://wa.me/')
  ) {
    issues.push('Email HTML missing WhatsApp link');
  }

  const phoneDigits = sanitizeDigits(scenario.profile.phone);
  const whatsappDigits = sanitizeDigits(scenario.profile.whatsapp || scenario.profile.phone);

  if (
    scenario.definition.channels.includes('whatsapp') &&
    !payload.whatsappBody.includes(whatsappDigits)
  ) {
    issues.push('WhatsApp body missing sanitized phone');
  }

  if (
    scenario.definition.channels.includes('sms') &&
    !payload.smsBody.includes(phoneDigits)
  ) {
    issues.push('SMS body missing sanitized phone');
  }

  if (scenario.definition.channels.length === 0) {
    if (payload.emailHtml.includes(contactHeaderHe) || payload.emailText.includes(contactHeaderHe)) {
      issues.push('Block rendered for empty channel selection');
    }
  }

  serviceRef.debugLog('template.content', payload.templateContent);
  serviceRef.debugLog('template.htmlContent', payload.templateHtmlContent);
  serviceRef.debugLog('template.contactChannels', payload.templateChannels);
  serviceRef.debugLog('profile', scenario.profile);
  serviceRef.debugLog('finalEmailHtml', payload.emailHtml);
  serviceRef.debugLog('finalEmailText', payload.emailText);
  serviceRef.debugLog('finalWhatsappBody', payload.whatsappBody);
  serviceRef.debugLog('finalSmsBody', payload.smsBody);

  await writeScenarioOutputs(OUTPUT_ROOT, scenarioId, {
    emailHtml: payload.emailHtml,
    emailText: payload.emailText,
    whatsappBody: payload.whatsappBody,
    smsBody: payload.smsBody,
    channels: scenario.definition.channels,
    contactBlockInjected: {
      emailHtml: emailBlockDetected,
      emailText: detectContactBlock(payload.emailText),
      whatsapp: whatsappBlockDetected,
      sms: smsBlockDetected
    }
  });

  return {
    id: scenarioId,
    title: scenario.definition.title,
    passed: issues.length === 0,
    issues,
    outputDir
  };
}

async function main() {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  if (typeof (globalThis as any).localStorage === 'undefined') {
    const storage = new Map<string, string>();
    (globalThis as any).localStorage = {
      getItem(key: string) {
        return storage.has(key) ? storage.get(key)! : null;
      },
      setItem(key: string, value: string) {
        storage.set(key, value);
      },
      removeItem(key: string) {
        storage.delete(key);
      },
      clear() {
        storage.clear();
      }
    };
  }

  if (typeof (globalThis as any).document === 'undefined') {
    (globalThis as any).document = {
      documentElement: {
        dir: 'rtl',
        setAttribute(attr: string, value: string) {
          if (attr === 'dir') {
            this.dir = value;
          }
        }
      }
    };
  }

  await ensureCleanOutputRoot();

  const languageService = new LanguageService();
  languageService.setLanguage('he');

  const automationService = new AutomationService({} as any, languageService);
  const fixtures = buildScenarioFixtures();

  const results: ScenarioResult[] = [];

  for (const scenario of fixtures) {
    const result = await runScenario(automationService, scenario);
    results.push(result);
  }

  let passCount = 0;
  for (const result of results) {
    if (result.passed) {
      passCount++;
      console.log(`✅ ${result.id} – ${result.title} (${result.outputDir})`);
    } else {
      console.log(`❌ ${result.id} – ${result.title} (${result.outputDir})`);
      result.issues.forEach(issue => console.log(`   • ${issue}`));
    }
  }

  console.log(`\nSummary: ${passCount}/${results.length} scenarios passed.`);

  if (passCount !== results.length) {
    process.exitCode = 1;
  }
}

main().catch(err => {
  console.error('Automation tests run failed:', err);
  process.exit(1);
});

