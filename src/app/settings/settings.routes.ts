import { Routes } from '@angular/router';
import { ScanTypeComponent } from './scan-type/scan-type.component';

export const SettingsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'scan-type',
        component: ScanTypeComponent,
        data: {
          title: 'Scan Type',
          urls: [
            { title: 'Settings', url: '/settings' },
            // { title: 'Scan Type' },
          ],
        },
      },
    ],
  },
]; 