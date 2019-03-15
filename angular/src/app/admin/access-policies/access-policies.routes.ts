import { Routes } from '@angular/router';

import { AccessPolicDetailComponent } from './access-policy-detail/access-policy-detail.component';
import { AccessPolicyListComponent } from './access-policy-list/access-policy-list.component';
import { AccessPolicyManageComponent } from './access-policy-manage/access-policy-manage.component';

export const ACCESS_POLICIES_ROUTES: Routes = [
  { path: 'access-policies', component: AccessPolicyListComponent },
  { path: 'access-policies/:ruleName', component: AccessPolicDetailComponent },
  { path: 'access-policies/manage/add', component: AccessPolicyManageComponent, pathMatch: 'full' },
];
