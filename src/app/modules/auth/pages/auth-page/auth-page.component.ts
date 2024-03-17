import { Component, OnInit, inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit{
  errorSession: Boolean = false;
  formLogin: FormGroup = new FormGroup({});
  private _authService = inject(AuthService);
  private _router = inject(Router)

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      }
    )
  }
  sedLogin() {
    const {gmail,password} = this.formLogin.value;
    this._authService.serCredencials(gmail, password)
      .subscribe({
        next: responseOk => { 
          this._router.navigate(['/','tracks'])
        },
        error: err => {
          this.errorSession = true
        }
    })
  }
}
