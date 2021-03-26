import { Component, OnInit } from '@angular/core';
import { Transferencia } from 'src/app/models/transferencia';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  transferencias: Transferencia[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getTransferencias();
  }

  getTransferencias(): void {
    console.log('asdsaa');
    const id = localStorage.getItem('id') ?? '';
    this.dataService.getTransferencias(parseInt(id, 10)).subscribe({
      next: (data: Transferencia[]) => {
        this.transferencias = data;
        console.log(this.transferencias);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
