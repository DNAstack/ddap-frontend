import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientListComponent } from './client-list/client-list.component';
import { ClientManageComponent } from './client-manage/client-manage.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';

const routes: Routes = [
  { path: 'clients', component: ClientListComponent },
  { path: 'clients/:clientName', component: ClientDetailComponent },
  { path: 'clients/manage/add', component: ClientManageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
