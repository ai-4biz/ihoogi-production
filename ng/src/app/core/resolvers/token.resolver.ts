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

