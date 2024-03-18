import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-play-list-header',
  templateUrl: './play-list-header.component.html',
  styleUrls: ['./play-list-header.component.scss']
})
export class PlayListHeaderComponent implements OnInit{
  private _cookiSevice = inject(CookieService)
  private _authService = inject(AuthService)
  private gmail?: string
  private password?:string
  name?: string
  avatar?:string
  ngOnInit(): void {
    this.gmail = this._cookiSevice.get("gmail")
    this.password = this._cookiSevice.get("password")
    this.loadUser()
  }

  loadUser() {
    if (this.gmail && this.password) {
      this._authService.serCredencials(this.gmail, this.password)
      .subscribe({
        next: reponse => {
          this.name = reponse.data.name;
          this.avatar = reponse.data.avatar; 
      }
    })
    }
    
  }
}
