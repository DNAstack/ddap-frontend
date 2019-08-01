import { NgModule } from '@angular/core';

import { DamRepositorySharedModule } from '../shared/shared.module';

import { AccessPoliciesRoutingModule } from './access-policies-routing.module';
import { AccessPolicDetailComponent } from './access-policy-detail/access-policy-detail.component';
import { AccessPolicyListComponent } from './access-policy-list/access-policy-list.component';
import { AccessPolicyManageComponent } from './access-policy-manage/access-policy-manage.component';

@NgModule({
  declarations: [
    AccessPolicyListComponent,
    AccessPolicyManageComponent,
    AccessPolicDetailComponent,
  ],
  imports: [
    DamRepositorySharedModule,
    AccessPoliciesRoutingModule,
  ],
})
export class AccessPoliciesModule { }
