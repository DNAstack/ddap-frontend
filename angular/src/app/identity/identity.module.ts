import { NgModule } from '@angular/core';
import { DdapVisaPassportModule } from 'ddap-common-lib';

import { SharedModule } from '../shared/shared.module';

import { IdentityRoutingModule } from './identity-routing.module';
import { IdentityComponent } from './identity.component';

@NgModule({
  declarations: [
    IdentityComponent,
  ],
  imports: [
    SharedModule,
    IdentityRoutingModule,
    DdapVisaPassportModule,
  ],
})
export class IdentityModule { }
