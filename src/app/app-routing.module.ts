import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [{ path: 'login', component: AuthComponent }];

export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });
