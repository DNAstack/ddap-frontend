import { NgModule } from '@angular/core';

import { ClientsModule } from './clients/clients.module';
import { DefinitionsModule } from './definitions/definitions.module';
import { PassportsModule } from './passports/passports.module';
import { PersonasModule } from './personas/personas.module';
import { ResourcesModule } from './resources/resources.module';
import { RulesModule } from './rules/rules.module';
import { ServiceTemplatesModule } from './service-templates/service-templates.module';
import { TrustedSourcesModule } from './trusted-sources/trusted-sources.module';

@NgModule({
  imports: [
    TrustedSourcesModule,
    ClientsModule,
    DefinitionsModule,
    ServiceTemplatesModule,
    PassportsModule,
    PersonasModule,
    ResourcesModule,
    RulesModule,
  ],
})
export class AdminModule { }
