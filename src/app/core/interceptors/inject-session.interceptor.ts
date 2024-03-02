import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {

  private _cookieService = inject(CookieService)

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    try { 
      const token = this._cookieService.get('token_service')
      let newRequest = request
       newRequest = request.clone(
        {
          setHeaders: {
            authorization:`Bearer ${token}`
          }
        }
       )
      return next.handle(newRequest)
    } catch {
      return next.handle(request);
    }
 
  }
}
