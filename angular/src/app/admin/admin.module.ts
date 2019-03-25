import { NgModule } from '@angular/core';

import { AccessPoliciesModule } from './access-policies/access-policies.module';
import { ClaimDefinitionsModule } from './claim-definitions/claim-definitions.module';
import { ClientApplicationsModule } from './client-applications/client-applications.module';
import { IdentityConcentratorModule } from './identity-concetrator/identity-concentrator.module';
import { OptionsModule } from './options/options.module';
import { PassportIssuersModule } from './passport-issuers/passport-issuers.module';
import { PersonasModule } from './personas/personas.module';
import { ResourcesModule } from './resources/resources.module';
import { ServiceTemplatesModule } from './service-templates/service-templates.module';
import { TrustedSourcesModule } from './trusted-sources/trusted-sources.module';

@NgModule({
  imports: [
    TrustedSourcesModule,
    ClientApplicationsModule,
    ClaimDefinitionsModule,
    IdentityConcentratorModule,
    ServiceTemplatesModule,
    PassportIssuersModule,
    PersonasModule,
    ResourcesModule,
    AccessPoliciesModule,
    OptionsModule,
  ],
})
export class AdminModule { }
