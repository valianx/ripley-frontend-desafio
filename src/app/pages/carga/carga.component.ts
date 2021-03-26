import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Carga } from 'src/app/models/Carga';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.scss'],
})
export class CargaComponent implements OnInit {
  data: Carga = {
    rut: '',
    amount: 0,
  };
  constructor(private dataService: DataService) {}

  ngOnInit(): void {}
  nuevaCarga(f: NgForm): void {
    this.data.rut = localStorage.getItem('rut') ?? '';
    this.data.amount = f.value.cantidad;
    console.log(this.data);
    this.dataService.nuevaCarga(this.data).subscribe({
      next: (data) => {

        localStorage.setItem('balance', data.monto);
        Swal.fire('Se han añadidos los fondos correctamente', '', 'success');
        window.location.reload();
      },
      error: (error) => {},
    });
  }
  
}


