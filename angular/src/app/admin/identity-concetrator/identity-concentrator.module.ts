import { NgModule } from '@angular/core';

import { ClientsModule } from './clients/clients.module';
import { IdentityProvidersModule } from './identity-providers/identity-providers.module';

@NgModule({
  imports: [
    ClientsModule,
    IdentityProvidersModule,
  ],
})
export class IdentityConcentratorModule { }
