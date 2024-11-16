import { Routes } from '@angular/router';
import { AssetsComponent } from '../components/assets/assets.component';
import { CreateAssetsComponent } from '../components/create-assets/create-assets.component';
import { SearchComponent } from '../components/search/search.component';
import { MessagesComponent } from '../components/messages/messages.component';
import { AdminComponent } from '../components/admin/admin.component';
import { ViewSearchComponent } from './search/view-search/view-search.component';

export const ComponentRoutes: Routes = [
    {
        path:'assets',
        component: AssetsComponent,data: {
          title: '',
        },
      },
      {
        path:'create-asset',
        component: CreateAssetsComponent,data: {
          title: '',
        },
      },
      {
        path:'search',
        component: SearchComponent,data: {
          title: '',
        },
      },
      {
        path:'messages',
        component: MessagesComponent,
        data: {
          title: '',
        },
      },
      {
        path:'admin',
        component: AdminComponent,
        data: {
          title: '',
        },
      },
      {
        path:'view-search',
        component: ViewSearchComponent,
        data: {
          title: '',
        },
      },
];
