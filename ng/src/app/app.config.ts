import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withInMemoryScrolling, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../environments/environment';

import { routes } from './app.routes';

// TEMP: Production diagnostics - router event logging
function routerDiagnosticsFactory(router: Router) {
  return () => {
    if (environment.production) {
      router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: any) => {
          console.info('[ROUTER]', event.urlAfterRedirects);
        });
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),
    // TEMP: Production diagnostics
    {
      provide: APP_INITIALIZER,
      useFactory: routerDiagnosticsFactory,
      deps: [Router],
      multi: true
    }
  ]
};
