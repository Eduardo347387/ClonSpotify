import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as mockRaw from '../../../data/user.json'
describe('AuthService', () => {
  let service: AuthService;
  let mockUser: any = (mockRaw as any).default
  let httClientSpy: { post: jasmine.Spy }
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    httClientSpy = jasmine.createSpyObj('HttpClient', ['post'])
    service = new AuthService()
  }); 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
