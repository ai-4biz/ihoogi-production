import { promises as fs } from 'fs';
import * as path from 'path';

export interface ScenarioOutputs {
  emailHtml: string;
  emailText: string;
  whatsappBody: string;
  smsBody: string;
  channels: string[];
  contactBlockInjected: {
    emailHtml: boolean;
    emailText: boolean;
    whatsapp: boolean;
    sms: boolean;
  };
}

export async function writeScenarioOutputs(baseDir: string, scenarioId: string, outputs: ScenarioOutputs) {
  const scenarioDir = path.join(baseDir, scenarioId);
  await fs.mkdir(scenarioDir, { recursive: true });

  await Promise.all([
    fs.writeFile(path.join(scenarioDir, 'email.html'), outputs.emailHtml, 'utf8'),
    fs.writeFile(path.join(scenarioDir, 'email.txt'), outputs.emailText, 'utf8'),
    fs.writeFile(path.join(scenarioDir, 'whatsapp.txt'), outputs.whatsappBody, 'utf8'),
    fs.writeFile(path.join(scenarioDir, 'sms.txt'), outputs.smsBody, 'utf8'),
    fs.writeFile(
      path.join(scenarioDir, 'meta.json'),
      JSON.stringify(
        {
          channels: outputs.channels,
          contactBlockInjected: outputs.contactBlockInjected
        },
        null,
        2
      ),
      'utf8'
    )
  ]);
}

