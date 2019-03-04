import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClaimDetailComponent } from './claim-detail/claim-detail.component';
import { ClaimListComponent } from './claim-list/claim-list.component';
import { ClaimManageComponent } from './claim-manage/claim-manage.component';

const routes: Routes = [
  { path: ':realm/claims', component: ClaimListComponent },
  { path: ':realm/claims/:claimName', component: ClaimDetailComponent },
  { path: ':realm/claims/manage/add', component: ClaimManageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimsRoutingModule { }
