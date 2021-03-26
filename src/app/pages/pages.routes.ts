import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { CargaComponent } from './carga/carga.component';
import { HistorialComponent } from './historial/historial.component';
import { HomeComponent } from './home/home.component';

import { PagesComponent } from './pages.component';
import { TransfersComponent } from './transfers/transfers.component';
import { WithdrawalsComponent } from './withdrawals/withdrawals.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { titulo: 'Home' },
        canActivate: [AuthGuard],
      },
      {
        path: 'transfer',
        component: TransfersComponent,
        data: { titulo: 'Transfer' },
        canActivate: [AuthGuard],
      },
      {
        path: 'retiros',
        component: WithdrawalsComponent,
        data: { titulo: 'Retiros' },
        canActivate: [AuthGuard],
      },
      {
        path: 'historial',
        component: HistorialComponent,
        data: { titulo: 'Historial' },
        canActivate: [AuthGuard],
      },
      {
        path: 'carga',
        component: CargaComponent,
        data: { titulo: 'Carga' },
        canActivate: [AuthGuard],
      },
    ],
  },
];

export const PagesRoutes = RouterModule.forChild(pagesRoutes);
