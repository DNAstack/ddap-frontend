import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessPolicDetailComponent } from './access-policy-detail/access-policy-detail.component';
import { AccessPolicyListComponent } from './access-policy-list/access-policy-list.component';
import { AccessPolicyManageComponent } from './access-policy-manage/access-policy-manage.component';

export const routes: Routes = [
  { path: '', component: AccessPolicyListComponent },
  { path: ':entityId', component: AccessPolicDetailComponent },
  { path: 'manage/add', pathMatch: 'full', component: AccessPolicyManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessPoliciesRoutingModule { }
