import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientManageComponent } from './client-manage/client-manage.component';

export const routes: Routes = [
  { path: '', component: ClientListComponent },
  { path: ':entityId', component: ClientDetailComponent },
  { path: 'manage/add', pathMatch: 'full', component: ClientManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule { }
