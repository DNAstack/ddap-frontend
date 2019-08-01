import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrustedSourcesDetailComponent } from './trusted-sources-detail/trusted-sources-detail.component';
import { TrustedSourcesListComponent } from './trusted-sources-list/trusted-sources-list.component';
import { TrustedSourcesManageComponent } from './trusted-sources-manage/trusted-sources-manage.component';

export const routes: Routes = [
  { path: '', component: TrustedSourcesListComponent },
  { path: ':entityId', component: TrustedSourcesDetailComponent },
  { path: 'manage/add', pathMatch: 'full', component: TrustedSourcesManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrustedSourcesRoutingModule { }
