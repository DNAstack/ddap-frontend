import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PassportDetailComponent } from './passport-detail/passport-detail.component';
import { PassportListComponent } from './passport-list/passport-list.component';
import { PassportManageComponent } from './passport-manage/passport-manage.component';

const routes: Routes = [
  { path: 'passports', component: PassportListComponent },
  { path: 'passports/:passportName', component: PassportDetailComponent },
  { path: 'passports/manage/add', component: PassportManageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassportsRoutingModule { }
