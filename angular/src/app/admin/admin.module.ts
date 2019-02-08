import { NgModule } from '@angular/core';

import { ClaimsModule } from './claims/claims.module';
import { ClientsModule } from './clients/clients.module';
import { DefinitionsModule } from './definitions/definitions.module';
import { GrantsModule } from './grants/grants.module';
import { PassportsModule } from './passports/passports.module';
import { PersonasModule } from './personas/personas.module';
import { ResourcesModule } from './resources/resources.module';
import { RulesModule } from './rules/rules.module';

@NgModule({
  imports: [
    ClaimsModule,
    ClientsModule,
    DefinitionsModule,
    GrantsModule,
    PassportsModule,
    PersonasModule,
    ResourcesModule,
    RulesModule,
  ],
})
export class AdminModule { }
