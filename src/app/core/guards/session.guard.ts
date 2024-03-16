import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const sessionGuard: CanActivateFn = (route, state) => {
  const _cookieService = inject(CookieService)
  
  const _router = inject(Router)
  try {
    const token = _cookieService.check('token_service')
    if (!token) {
      _router.navigate(['/auth', 'login'])
    } 
    return token;
  } catch (e) {
    return false;
  }
  
};  






