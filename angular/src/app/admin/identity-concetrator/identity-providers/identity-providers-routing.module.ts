import {RouterModule, Routes} from '@angular/router';

import { IdentityProviderDetailComponent } from './identity-provider-detail/identity-provider-detail.component';
import { IdentityProviderListComponent } from './identity-provider-list/identity-provider-list.component';
import { IdentityProviderManageComponent } from './identity-provider-manage/identity-provider-manage.component';
import {NgModule} from "@angular/core";

export const routes: Routes = [
  { path: '', component: IdentityProviderListComponent },
  { path: ':identityProviderName', component: IdentityProviderDetailComponent },
  { path: 'manage/add', pathMatch: 'full', component: IdentityProviderManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentityProvidersRoutingModule { }
