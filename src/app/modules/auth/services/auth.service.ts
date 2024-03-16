import { HttpClient } from '@angular/common/http';
import { Injectable, inject, Pipe } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service';

@Injectable({

  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.apiUrl;
  private _http = inject(HttpClient);
  private cookie = inject(CookieService);

  constructor() { }
  
  serCredencials(email: string, password: string): Observable <any>{
    const body = {
      email, password
    }
    return this._http.post(`${this.URL}/auth/login`,body)
      .pipe(
        tap((responseOk: any) => {
          const { tokenSession} = responseOk
          this.cookie.set('token_service',tokenSession,4,'/')
      })
    )
  }
}
