import { NgModule } from '@angular/core';

import { ClientsModule } from './clients/clients.module';
import { IdentityProvidersModule } from './identity-providers/identity-providers.module';
import { OptionsModule } from './options/options.module';

@NgModule({
  declarations: [

  ],
  imports: [
    ClientsModule,
    IdentityProvidersModule,
    OptionsModule,
  ],
})
export class IdentityConcentratorModule {

}
