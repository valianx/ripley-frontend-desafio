import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { User } from '../models/User';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}

  login = true;
  user: Login = {
    rut: '',
    password: '',
  };

  registroUser: User = {
    correo: '',
    nombre: '',
    password: '',
    rut: '',
    saldo: 0,
  };

  ngOnInit(): void {}
  loginValidation(f: NgForm): void {
    this.user.rut = f.value.rut;
    this.user.password = f.value.password;

    this.loginService.signin(this.user).subscribe({
      next: (data) => {
        localStorage.setItem('id', data.id);
        localStorage.setItem('token', data.token);
        localStorage.setItem('correo', data.email);
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('rut', data.rut);
        localStorage.setItem('balance', data.balance);
        this.router.navigate(['']);
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'rut o contraseña erronea',
          icon: 'error',
          // confirmButtonText: 'Cool',
        });
      },
    });
  }
  registro(f: NgForm): void {
    if (f.value.password !== f.value.pass) {
      Swal.fire({
        title: 'Error!',
        text: 'contraseñas no coinciden',
        icon: 'error',
      });
    } else {
      this.registroUser.correo = f.value.email;
      this.registroUser.nombre = f.value.nombre;
      this.registroUser.password = f.value.password;
      this.registroUser.rut = this.checkRut(f.value.rut);
      this.registroUser.saldo = f.value.saldo;
      console.log(this.registroUser);

      this.loginService.signup(this.registroUser).subscribe({
        next: (data) => {
          console.log(data);
          localStorage.setItem('id', data.body.id);
          localStorage.setItem('token', data.token);
          localStorage.setItem('correo', data.body.correo);
          localStorage.setItem('nombre', data.body.nombre);
          localStorage.setItem('rut', data.body.rut);
          localStorage.setItem('balance', data.body.saldo);
          this.router.navigate(['']);
        },
        error: (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'usuario ya esta registrado',
            icon: 'error',
          });
        },
      });
    }
  }

  checkRut = (rut: any): string => {
    // Despejar Puntos
    let valor = rut.replaceAll('.', '');
    // Despejar Guión
    valor = valor.replaceAll('-', '');

    // Aislar Cuerpo y Dígito Verificador
    const cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();

    // Formatear RUN
    rut = cuerpo + '-' + dv;

    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpo.length < 7) {
      // rut.setCustomValidity('RUT Incompleto');
      return rut;
    }

    // Calcular Dígito Verificador
    let suma = 0;
    let multiplo = 2;

    // Para cada dígito del Cuerpo
    for (let i = 1; i <= cuerpo.length; i++) {
      // Obtener su Producto con el Múltiplo Correspondiente
      const index = multiplo * valor.charAt(cuerpo.length - i);

      // Sumar al Contador General
      suma = suma + index;

      // Consolidar Múltiplo dentro del rango [2,7]
      if (multiplo < 7) {
        multiplo = multiplo + 1;
      } else {
        multiplo = 2;
      }
    }

    // Calcular Dígito Verificador en base al Módulo 11
    const dvEsperado = 11 - (suma % 11);

    // Casos Especiales (0 y K)
    dv = dv === 'K' ? 10 : dv;
    dv = dv === 0 ? 11 : dv;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado !== dv) {
      // rut.setCustomValidity('RUT Inválido');
      return rut;
    }

    // Si todo sale bien, eliminar errores (decretar que es válido)
    // rut.setCustomValidity('');

    return rut;
  };
}
