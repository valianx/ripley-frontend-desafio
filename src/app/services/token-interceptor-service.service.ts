import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorServiceService {
  constructor(private loginService: LoginService) {}

  intercept(req: any, next: any): any {
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.loginService.getToken()}`,
      },
    });
    return next.handle(tokenizeReq);
  }
}
