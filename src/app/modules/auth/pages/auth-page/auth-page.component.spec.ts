import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageComponent } from './auth-page.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [AuthPageComponent]
    });
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deveria de retornar INVALIDO en el formulario', () => {
    //ARRANQUE
    const mockCredenciales = {
      email: 'x0xx0x0x0x0x0x0x0',
      password: '212121212121212121221'
    }
    const emailForm:any = component.formLogin.get('email')
    const passwordform:any = component.formLogin.get('password')
    //ACT
    emailForm.setValue(mockCredenciales.email);
    passwordform.setValue(mockCredenciales.password);

    //ESPERAMOS
    expect(component.formLogin.invalid).toEqual(true)
  })
  
});
