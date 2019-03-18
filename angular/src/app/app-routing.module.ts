import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ACCESS_POLICIES_ROUTES } from './admin/access-policies/access-policies.routes';
import { CLAIM_DEFINITIONS_ROUTES } from './admin/claim-definitions/claim-definitions.routes';
import { CLIENT_APPLICATIONS_ROUTES } from './admin/client-applications/client-applications.routes';
import { IDENTITY_PROVIDERS_ROUTES } from './admin/identity-concetrator/identity-providers/identity-providers.routes';
import { PASSPORT_ISSUERS_ROUTES } from './admin/passport-issuers/passport-issuers.routes';
import { PERSONAS_ROUTES } from './admin/personas/personas.routes';
import { RESOURCES_ROUTES } from './admin/resources/resources.routes';
import { SERVICE_TEMPLATES_ROUTES } from './admin/service-templates/service-templates.routes';
import { TRUSTED_SOURCES_ROUTES } from './admin/trusted-sources/trusted-sources.routes';
import { DATA_ROUTES } from './data/data.routes';
import { IDENTITY_ROUTES } from './identity/identity.routes';
import { DEFAULT_REALM } from './realm.constant';

const routes: Routes = [
  {path: '', redirectTo: `/${DEFAULT_REALM}/data`, pathMatch: 'full'},
  {path: ':realmId', redirectTo: `/:realmId/data`, pathMatch: 'full'},
  {path: ':realmId', children: DATA_ROUTES},
  {path: ':realmId', children: IDENTITY_ROUTES},
  {path: ':realmId', children: IDENTITY_PROVIDERS_ROUTES},
  {path: ':realmId', children: TRUSTED_SOURCES_ROUTES},
  {path: ':realmId', children: CLIENT_APPLICATIONS_ROUTES},
  {path: ':realmId', children: CLAIM_DEFINITIONS_ROUTES},
  {path: ':realmId', children: SERVICE_TEMPLATES_ROUTES},
  {path: ':realmId', children: PASSPORT_ISSUERS_ROUTES},
  {path: ':realmId', children: PERSONAS_ROUTES},
  {path: ':realmId', children: RESOURCES_ROUTES},
  {path: ':realmId', children: ACCESS_POLICIES_ROUTES},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
