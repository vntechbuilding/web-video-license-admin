import { Route } from '@angular/router';
import { PagesTemplateComponent } from './pages-template/pages-template.component';
import { adminAuthGuard } from '../shared/guard/admin-auth.guard';

export const PagesRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'prefix',
    component: PagesTemplateComponent,
    canActivate: [adminAuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'go-login-api',
        loadComponent: () =>
          import('./go-login/go-login-api/go-login-api.component').then(
            (c) => c.GoLoginApiComponent
          ),
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./admin/admin-index/admin-index.component').then(
            (m) => m.AdminIndexComponent
          ),
      },
      {
        path: 'user',
        loadComponent: () =>
          import('./user/user-index/user-index.component').then(
            (m) => m.UserIndexComponent
          ),
      },
      {
        path: 'go-login-profiles',
        loadComponent: () =>
          import(
            './go-login/go-login-profiles/go-login-profiles.component'
          ).then((c) => c.GoLoginProfilesComponent),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
];
