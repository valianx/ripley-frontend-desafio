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
    const id = localStorage.getItem('id') ?? '';
    this.dataService.getTransferencias(parseInt(id)).subscribe({
      next: (data: Transferencia) => {
        console.log(data);
      },
      error: (error: any) => {},
    });
  }
}
