import { Routes } from '@angular/router';

import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientManageComponent } from './client-manage/client-manage.component';

export const CLIENTS_ROUTES: Routes = [
  { path: 'clients', component: ClientListComponent },
  { path: 'clients/:clientName', component: ClientDetailComponent },
  { path: 'clients/manage/add', component: ClientManageComponent, pathMatch: 'full' },
];
