import {RouterModule, Routes} from '@angular/router';

import { ClientApplicationDetailComponent } from './client-application-detail/client-application-detail.component';
import { ClientApplicationListComponent } from './client-application-list/client-application-list.component';
import { ClientApplicationManageComponent } from './client-application-manage/client-application-manage.component';
import {NgModule} from "@angular/core";

export const routes: Routes = [
  { path: '', component: ClientApplicationListComponent },
  { path: ':clientName', component: ClientApplicationDetailComponent },
  { path: 'manage/add', pathMatch: 'full', component: ClientApplicationManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientApplicationsRoutingModule { }
