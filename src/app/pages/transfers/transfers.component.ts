import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss'],
})
export class TransfersComponent implements OnInit {
  transferencia = {
    amount: 0,
    destinoRut: '',
    origenRut: '',
    createdAt: '',
  };
  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  newTransfer(f: NgForm): void {
    this.transferencia.amount = f.value.amount;
    this.transferencia.destinoRut = f.value.rut;
    this.transferencia.origenRut = localStorage.getItem('rut') ?? '';

    this.dataService.nuevaTransferencia(this.transferencia).subscribe({
      next: (data) => {
        console.log(data);
        const balance = this.transferencia.amount - data.amount;
        localStorage.setItem('balance', balance.toString());
        Swal.fire('Se ha efectuado la transferencia correctamente', '', 'success');
        // window.location.reload();
      },
      error: (data) => {
        console.log(data.message);
      },
    });
    console.log(this.transferencia);
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
