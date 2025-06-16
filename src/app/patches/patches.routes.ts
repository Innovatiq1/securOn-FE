import { Routes } from '@angular/router';
import { ManualPatchComponent } from './manual-patch/manual-patch.component';
import { AutomaticPatchComponent } from './automatic-patch/automatic-patch.component';
import { ApprovalComponent } from './approval/approval.component';

export const PatchesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'manual',
        component: ManualPatchComponent,
        data: {
          title: 'Manual Patch',
          urls: [
            { title: 'Patches', url: '/patches' },
            // { title: 'Manual Patch' },
          ],
        },
      },
      {
        path: 'auto',
        component: AutomaticPatchComponent,
        data: {
          title: 'Auto Patch',
          urls: [
            { title: 'Patches', url: '/patches' },
            // { title: 'Auto Patch' },
          ],
        },
      },
      {
        path: 'approval',
        component: ApprovalComponent,
        data: {
          title: 'Approval',
          urls: [
            { title: 'Patches', url: '/patches' },
            // { title: 'Approval' },
          ],
        },
      },
    ],
  },
]; 