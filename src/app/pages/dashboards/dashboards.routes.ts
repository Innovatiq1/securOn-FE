import { Routes } from '@angular/router';

// dashboards
import { AppDashboard1Component } from './dashboard1/dashboard1.component';
import { AppDashboard2Component } from './dashboard2/dashboard2.component';
import { DashboardRootComponent } from './dashboard-root/dashboard-root.component';

export const DashboardsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard1',
        component: AppDashboard1Component,
        data: {
          title: '',
        },
      },
      {
        path: '',
        component: DashboardRootComponent,
        data: {
          title: '',
        },
      },
    ],
  },
];
