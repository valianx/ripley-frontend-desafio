import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:3000/api';
  constructor(private http: HttpClient, private router: Router) {}

  signup(user: User): Observable<any> {
    return this.http.post<any>(this.url + '/users', user);
  }

  signin(user: Login): Observable<any> {
    return this.http.post<any>(this.url + '/login', user);
  }
  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
