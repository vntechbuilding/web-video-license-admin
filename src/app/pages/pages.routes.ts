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
        path: 'domain',
        loadComponent: () =>
          import('./domain/domain-index/domain-index.component').then(
            (m) => m.DomainIndexComponent
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
        path: 'news-category',
        loadComponent: () =>
          import(
            './news-category/news-category-index/news-category-index.component'
          ).then((c) => c.NewsCategoryIndexComponent),
      },
      {
        path: 'author',
        loadComponent: () =>
          import('./author/author-index/author-index.component').then(
            (m) => m.AuthorIndexComponent
          ),
      },
      {
        path: 'publisher',
        loadComponent: () =>
          import('./publisher/publisher-index/publisher-index.component').then(
            (m) => m.PublisherIndexComponent
          ),
      },
      {
        path: 'video',
        loadComponent: () =>
          import('./video/video-index/video-index.component').then(
            (m) => m.VideoIndexComponent
          ),
      },
      {
        path: 'news',
        loadComponent: () =>
          import('./news/news-index/news-index.component').then(
            (m) => m.NewsIndexComponent
          ),
      },
      {
        path: 'page',
        loadComponent: () =>
          import('./page/page-index/page-index.component').then(
            (m) => m.PageIndexComponent
          ),
      },
      {
        path: 'menu',
        loadComponent: () =>
          import('./menu/menu-index/menu-index.component').then(
            (m) => m.MenuIndexComponent
          ),
      },
      {
        path: 'template',
        loadComponent: () =>
          import('./template/template-index/template-index.component').then(
            (m) => m.TemplateIndexComponent
          ),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
];
