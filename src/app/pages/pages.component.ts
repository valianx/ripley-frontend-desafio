import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ruta = '';
  isLogin = false;
  nombre: string | null = '';
  email: string | null = '';
  balance: string | null = '0';
  rut: string | null = '';
  id: string | null = '';

  ngOnInit(): void {
    this.nombre = localStorage.getItem('nombre');
    this.email = localStorage.getItem('correo');
    this.balance = localStorage.getItem('balance');
    this.rut = localStorage.getItem('rut');
    this.id = localStorage.getItem('id');
  }

  logOut(): void {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('correo');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rut');

    this.loginService.logout();
  }
}
