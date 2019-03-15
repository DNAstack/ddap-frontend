import { NgModule } from '@angular/core';

import { AdminSharedModule } from '../shared/shared.module';

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
    AdminSharedModule,
  ],
})
export class AccessPoliciesModule { }
