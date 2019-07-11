import { Routes } from '@angular/router';

import { IdentityProviderDetailComponent } from './identity-provider-detail/identity-provider-detail.component';
import { IdentityProviderListComponent } from './identity-provider-list/identity-provider-list.component';
import { IdentityProviderManageComponent } from './identity-provider-manage/identity-provider-manage.component';

export const IDENTITY_PROVIDERS_ROUTES: Routes = [
  { path: 'identity-providers', component: IdentityProviderListComponent },
  { path: 'identity-providers/:identityProviderName', component: IdentityProviderDetailComponent },
  { path: 'identity-providers/manage/add', component: IdentityProviderManageComponent, pathMatch: 'full' },
];
