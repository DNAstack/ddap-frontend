import { NgModule } from '@angular/core';

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
  ],
})
export class IdentityModule { }
