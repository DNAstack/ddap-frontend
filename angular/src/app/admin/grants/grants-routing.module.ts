import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GrantDetailComponent } from './grant-detail/grant-detail.component';
import { GrantListComponent } from './grant-list/grant-list.component';
import { GrantManageComponent } from './grant-manage/grant-manage.component';

const routes: Routes = [
  { path: 'grants', component: GrantListComponent },
  { path: 'grants/:grantName', component: GrantDetailComponent },
  { path: 'grants/manage/add', component: GrantManageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrantsRoutingModule { }
