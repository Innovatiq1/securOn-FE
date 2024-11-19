import { Routes } from '@angular/router';
import { AssetsComponent } from '../components/assets/assets.component';
import { CreateAssetsComponent } from '../components/create-assets/create-assets.component';
import { SearchComponent } from '../components/search/search.component';
import { MessagesComponent } from '../components/messages/messages.component';
import { AdminComponent } from '../components/admin/admin.component';
import { ViewSearchComponent } from './search/view-search/view-search.component';
import { AdministrationComponent } from './administration/administration.component';
import { ListComponent } from './dashboard2/top-cards/list/list.component';
import { GraphViewsComponent } from './dashboard2/graph-views/graph-views.component';
import { CveViewComponent } from './dashboard2/cve-view/cve-view.component';

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
        component: AdministrationComponent,
        data: {
          title: '',
        },
      },
      {
        path:'view-search/:id',
        component: ViewSearchComponent,
        data: {
          title: '',
        },
      },
      {
        path:'vulnerabilties',
        component: ListComponent,
        data: {
          title: '',
        },
      },
      {
        path:'vulnerabilties-view',
        component: GraphViewsComponent,
        data: {
          title: '',
        },
      },
      {
        path:'vulnerabilty',
        component: CveViewComponent,
        data: {
          title: '',
        },
      },
];
