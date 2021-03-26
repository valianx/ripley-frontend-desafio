import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Retiro } from 'src/app/models/Retiro';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-withdrawals',
  templateUrl: './withdrawals.component.html',
  styleUrls: ['./withdrawals.component.scss'],
})
export class WithdrawalsComponent implements OnInit {
  constructor(private dataService: DataService) {}
  retiro: Retiro = {
    amount: 0,
    rut: '',
  };
  ngOnInit(): void {}

  nuevoRetiro(f: NgForm): void {
    this.retiro.rut = localStorage.getItem('rut') ?? '';
    this.retiro.amount = f.value.cantidad;
    this.dataService.nuevoRetiro(this.retiro).subscribe({
      next: (data: any) => {
        localStorage.setItem('balance', data.monto);
        Swal.fire('Se ha efectuado el retiro correctamente', '', 'success');
        window.location.reload();
      },
      error: (error: any) => {},
    });
  }
}
