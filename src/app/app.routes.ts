import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './pages/authentication/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboards',
        pathMatch: 'full',
      },
      {
        path: 'cve',
        loadChildren: () =>
          import('./components/component.routes').then((m) => m.ComponentRoutes),
        canActivate: [AuthGuard],
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.routes').then((m) => m.SettingsRoutes),
        canActivate: [AuthGuard],
      },
      {
        path: 'patches',
        loadChildren: () =>
          import('./patches/patches.routes').then((m) => m.PatchesRoutes),
        canActivate: [AuthGuard],
      },
      {
        path: 'starter',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./pages/dashboards/dashboards.routes').then(
            (m) => m.DashboardsRoutes
          ),
        canActivate: [AuthGuard],
      },
      // {
      //   path: 'ui-components',
      //   loadChildren: () =>
      //     import('./pages/ui-components/ui-components.routes').then(
      //       (m) => m.UiComponentsRoutes
      //     ),
      // },
      // {
      //   path: 'forms',
      //   loadChildren: () =>
      //     import('./pages/forms/forms.routes').then((m) => m.FormsRoutes),
      // },
      // {
      //   path: 'charts',
      //   loadChildren: () =>
      //     import('./pages/charts/charts.routes').then((m) => m.ChartsRoutes),
      // },
      // {
      //   path: 'apps',
      //   loadChildren: () =>
      //     import('./pages/apps/apps.routes').then((m) => m.AppsRoutes),
      // },
      // {
      //   path: 'widgets',
      //   loadChildren: () =>
      //     import('./pages/widgets/widgets.routes').then((m) => m.WidgetsRoutes),
      // },
      // {
      //   path: 'tables',
      //   loadChildren: () =>
      //     import('./pages/tables/tables.routes').then((m) => m.TablesRoutes),
      // },
      // {
      //   path: 'datatable',
      //   loadChildren: () =>
      //     import('./pages/datatable/datatable.routes').then(
      //       (m) => m.DatatablesRoutes
      //     ),
      // },
      // {
      //   path: 'theme-pages',
      //   loadChildren: () =>
      //     import('./pages/theme-pages/theme-pages.routes').then(
      //       (m) => m.ThemePagesRoutes
      //     ),
      // },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
      {
        path: 'landingpage',
        loadChildren: () =>
          import('./pages/theme-pages/landingpage/landingpage.routes').then(
            (m) => m.LandingPageRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
