import { Routes } from '@angular/router';

import { PassportDetailComponent } from './passport-detail/passport-detail.component';
import { PassportListComponent } from './passport-list/passport-list.component';
import { PassportManageComponent } from './passport-manage/passport-manage.component';

export const PASSPORTS_ROUTES: Routes = [
  { path: 'passports', component: PassportListComponent },
  { path: 'passports/:passportName', component: PassportDetailComponent },
  { path: 'passports/manage/add', component: PassportManageComponent, pathMatch: 'full' },
];
