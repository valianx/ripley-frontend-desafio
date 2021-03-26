import { NgModule } from '@angular/core';
import { PagesRoutes } from './pages.routes';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { BrowserModule } from '@angular/platform-browser';
import { WithdrawalsComponent } from './withdrawals/withdrawals.component';
import { TransfersComponent } from './transfers/transfers.component';
import { CargaComponent } from './carga/carga.component';

@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    WithdrawalsComponent,
    TransfersComponent,
    CargaComponent,
  ],
  exports: [PagesComponent],
  imports: [PagesRoutes, FormsModule, DataTablesModule, BrowserModule],
})
export class PageModule {}
