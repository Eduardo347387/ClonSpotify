import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss']
})
export class HeaderUserComponent implements OnInit{
  private _authService = inject(AuthService);
  private _cookieService = inject(CookieService)

  private gmail?: string
  private password?: string
  name?: string;
  avatar?: string;

  ngOnInit(): void {
    this.gmail = this._cookieService.get("gmail")
    this.password = this._cookieService.get("password")
    this.loadUser()   
  }

  loadUser() {
    if (this.gmail && this.password) {
      this._authService.serCredencials(this.gmail,this.password).subscribe({
        next: response => {
          this.name = response.data.name;
          this.avatar = response.data.avatar
        }
      })
    }
  }
}
