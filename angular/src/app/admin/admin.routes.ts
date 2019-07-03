import { Routes } from '@angular/router';

import { ACCESS_POLICIES_ROUTES } from './access-policies/access-policies.routes';
import { CLAIM_DEFINITIONS_ROUTES } from './claim-definitions/claim-definitions.routes';
import { CLIENT_APPLICATIONS_ROUTES } from './client-applications/client-applications.routes';
import { OPTIONS_ROUTES } from './options/options.routes';
import { PASSPORT_ISSUERS_ROUTES } from './passport-issuers/passport-issuers.routes';
import { PERSONAS_ROUTES } from './personas/personas.routes';
import { RESOURCES_ROUTES } from './resources/resources.routes';
import { SERVICE_TEMPLATES_ROUTES } from './service-definitions/service-definitions.routes';
import { TRUSTED_SOURCES_ROUTES } from './trusted-sources/trusted-sources.routes';

export const DAM_ADMIN_ROUTES: Routes = [
  {
    path: 'dam/:damId',
    children: [
      ...TRUSTED_SOURCES_ROUTES,
      ...CLIENT_APPLICATIONS_ROUTES,
      ...CLAIM_DEFINITIONS_ROUTES,
      ...SERVICE_TEMPLATES_ROUTES,
      ...PASSPORT_ISSUERS_ROUTES,
      ...PERSONAS_ROUTES,
      ...RESOURCES_ROUTES,
      ...ACCESS_POLICIES_ROUTES,
      ...OPTIONS_ROUTES,
    ],
  },
];
