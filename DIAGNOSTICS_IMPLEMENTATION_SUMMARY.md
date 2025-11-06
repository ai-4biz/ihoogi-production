# Production Diagnostics Implementation Summary

**Date:** 2025-11-05  
**Purpose:** Add temporary production-safe diagnostics to identify routing issues

---

## ✅ Files Changed

### 1. `ng/src/main.ts`
**Added:** Bootstrap logging
```typescript
// TEMP: Production diagnostics
if (typeof window !== 'undefined') {
  console.info('[BOOT] Angular app starting at', window.location.href);
}
```

**Lines added:** 5-8

---

### 2. `ng/src/app/app.config.ts`
**Added:** Router event logging (production only)
```typescript
import { APP_INITIALIZER } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../environments/environment';

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

// Added to providers:
{
  provide: APP_INITIALIZER,
  useFactory: routerDiagnosticsFactory,
  deps: [Router],
  multi: true
}
```

**Lines added:** 3-19 (imports), 33-38 (provider)

---

### 3. `ng/src/app/core/resolvers/token.resolver.ts` (NEW FILE)
**Created:** Token resolver for route parameter logging
```typescript
import { ResolveFn } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

// TEMP: Production diagnostics - token resolver
export const tokenResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const token = route.paramMap.get('token');
  const queryParams: Record<string, string | null> = {};
  route.queryParamMap.keys.forEach(key => {
    queryParams[key] = route.queryParamMap.get(key);
  });
  
  console.info('[RESOLVER] token =', token, 'query =', queryParams);
  return true;
};
```

**File created:** 17 lines

---

### 4. `ng/src/app/app.routes.ts`
**Modified:** Added resolver to `/q/:token` route
```typescript
import { tokenResolver } from './core/resolvers/token.resolver';

// Changed route:
{ path: 'q/:token', resolve: { _t: tokenResolver }, loadComponent: ... }
```

**Lines changed:** 1 (import), 1 (route definition)

---

### 5. `ng/src/app/pages/questionnaire-live/questionnaire-live.ts`
**Added:** Constructor and timing logs
```typescript
constructor(...) {
  // TEMP: Production diagnostics
  if (typeof window !== 'undefined') {
    console.info('[QLIVE] init at', window.location.href);
    console.time('[QLIVE] load');
  }
}

// In loadQuestionnaire method:
// Success path - after data loaded
if (typeof window !== 'undefined') {
  console.timeEnd('[QLIVE] load');
}

// Error paths - in catch and else blocks
if (typeof window !== 'undefined') {
  console.timeEnd('[QLIVE] load');
}
```

**Lines added:** 4 (constructor), 3 (success), 3 (error), 3 (no data)

---

### 6. `ng/src/app/pages/not-found/not-found.component.html`
**Added:** Angular 404 marker
```html
<!-- TEMP:ANGULAR_404_MARKER -->
<small style="opacity:.3; position: absolute; top: 0; left: 0; padding: 4px; font-size: 10px;">ANGULAR_404</small>
```

**Lines added:** 2

---

## ✅ Build Verification

**Build Status:** ✅ PASSED

**Build Command:**
```bash
npm run build -- --configuration=production
```

**Output:**
- No compilation errors
- All chunks generated successfully
- Only warning: `qrcode` module not ESM (pre-existing, non-blocking)

**Build Location:** `ng/dist/ng/browser/`

---

## 📊 Diagnostic Output Expected

When accessing `https://ihoogi.com/q/d_n4x0Oq8kuQGN?src=form`, you should see in Console:

1. **`[BOOT] Angular app starting at https://...`** - Confirms Angular booted
2. **`[ROUTER] /q/d_n4x0Oq8kuQGN?src=form`** - Confirms router matched route
3. **`[RESOLVER] token = d_n4x0Oq8kuQGN query = {src: 'form'}`** - Confirms route params extracted
4. **`[QLIVE] init at https://...`** - Confirms component constructor called
5. **`[QLIVE] load: XXXms`** - Shows load time (success/error/no data)

**If "Not Found" appears:**
- **With "ANGULAR_404" visible** → Angular Router matched wildcard route (`**`)
- **Without "ANGULAR_404"** → Netlify/server returned 404 before Angular loaded

---

## 🔍 What to Check in Production

1. **Console logs order:**
   - If `[BOOT]` appears → Angular loaded
   - If `[ROUTER]` appears → Router working
   - If `[RESOLVER]` appears → Route matched
   - If `[QLIVE]` appears → Component loaded

2. **Network tab:**
   - Check for 404s on chunk files → Lazy loading issue
   - Check for 422/403 on Supabase → RLS issue
   - Check for 404 on index.html → Netlify redirect issue

3. **404 Marker:**
   - If "ANGULAR_404" visible → Angular wildcard route matched
   - If not visible → Netlify/server 404

---

## ⚠️ Temporary Code Markers

All diagnostic code is marked with `// TEMP:` or `<!-- TEMP: -->` for easy removal later.

---

## 📝 Next Steps

1. **Deploy to production**
2. **Access the problematic URL**
3. **Check browser Console for diagnostic logs**
4. **Identify the failure point based on logs**
5. **Remove diagnostics after issue is resolved**

---

**Commit Message:** `chore(diag): add prod-safe diagnostics for routing & lazy-load`

