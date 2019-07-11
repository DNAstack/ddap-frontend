import { NgModule } from '@angular/core';

import { IdentityConcentratorSharedModule } from '../shared/shared.module';

import { IdentityProviderDetailComponent } from './identity-provider-detail/identity-provider-detail.component';
import { IdentityProviderFormComponent } from './identity-provider-form/identity-provider-form.component';
import { IdentityProviderListComponent } from './identity-provider-list/identity-provider-list.component';
import { IdentityProviderManageComponent } from './identity-provider-manage/identity-provider-manage.component';
import {IdentityProvidersRoutingModule} from "./identity-providers-routing.module";

@NgModule({
  declarations: [
    IdentityProviderFormComponent,
    IdentityProviderListComponent,
    IdentityProviderManageComponent,
    IdentityProviderDetailComponent,
  ],
  imports: [
    IdentityConcentratorSharedModule,
    IdentityProvidersRoutingModule,
  ],
})
export class IdentityProvidersModule { }
