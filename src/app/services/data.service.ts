import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Carga } from '../models/Carga';
import { Retiro } from '../models/Retiro';
import { Transferencia } from '../models/transferencia';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'http://localhost:3000/api/';
  constructor(private http: HttpClient, private router: Router) {}
  getTransferencias(id: number | null): Observable<any> {
    return this.http.get<any>(this.url + '/users/' + id);
  }
  nuevaTransferencia(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/nuevaTransferencia', data);
  }
  nuevoRetiro(data: Retiro): Observable<any> {
    return this.http.post<any>(this.url + '/nuevoRetiro', data);
  }
  nuevaCarga(data: Carga): Observable<any> {
    return this.http.post<any>(this.url + '/nuevaCarga', data);
  }
}
