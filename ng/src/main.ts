import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// TEMP: Production diagnostics
if (typeof window !== 'undefined') {
  console.info('[BOOT] Angular app starting at', window.location.href);
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
