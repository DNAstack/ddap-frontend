import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClaimDetailComponent } from './claim-detail/claim-detail.component';
import { ClaimListComponent } from './claim-list/claim-list.component';
import { ClaimManageComponent } from './claim-manage/claim-manage.component';

const routes: Routes = [
  { path: 'claims', component: ClaimListComponent },
  { path: 'claims/:claimName', component: ClaimDetailComponent },
  { path: 'claims/manage/add', component: ClaimManageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimsRoutingModule { }
