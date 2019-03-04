import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientManageComponent } from './client-manage/client-manage.component';

const routes: Routes = [
  { path: ':realm/clients', component: ClientListComponent },
  { path: ':realm/clients/:clientName', component: ClientDetailComponent },
  { path: ':realm/clients/manage/add', component: ClientManageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule { }
