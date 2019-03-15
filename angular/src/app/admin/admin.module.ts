import { NgModule } from '@angular/core';

import { ClaimDefinitionsModule } from './claim-definitions/claim-definitions.module';
import { ClientApplicationsModule } from './client-applications/client-applications.module';
import { PassportsModule } from './passports/passports.module';
import { PersonasModule } from './personas/personas.module';
import { ResourcesModule } from './resources/resources.module';
import { RulesModule } from './rules/rules.module';
import { ServiceTemplatesModule } from './service-templates/service-templates.module';
import { TrustedSourcesModule } from './trusted-sources/trusted-sources.module';

@NgModule({
  imports: [
    TrustedSourcesModule,
    ClientApplicationsModule,
    ClaimDefinitionsModule,
    ServiceTemplatesModule,
    PassportsModule,
    PersonasModule,
    ResourcesModule,
    RulesModule,
  ],
})
export class AdminModule { }
