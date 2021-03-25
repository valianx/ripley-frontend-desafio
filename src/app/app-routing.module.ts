import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HistorialComponent } from './components/historial/historial.component';
import { HomeComponent } from './components/home/home.component';
import { TransfersComponent } from './components/transfers/transfers.component';
import { WithdrawalsComponent } from './components/withdrawals/withdrawals.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'transfers', component: TransfersComponent },
  { path: 'withdrawals', component: WithdrawalsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
