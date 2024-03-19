import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./shared/page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AuthRoutes),
  },
  {
    path: '',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('./pages/pages.routes').then((m) => m.PagesRoutes),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },];
