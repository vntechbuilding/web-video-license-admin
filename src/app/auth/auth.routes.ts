import { Route } from '@angular/router';
import { AuthTemplateComponent } from './auth-template/auth-template.component';

export const AuthRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    component: AuthTemplateComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
    ],
  },
];
