import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ACCESS_POLICIES_ROUTES } from './admin/access-policies/access-policies.routes';
import { CLAIM_DEFINITIONS_ROUTES } from './admin/claim-definitions/claim-definitions.routes';
import { CLIENT_APPLICATIONS_ROUTES } from './admin/client-applications/client-applications.routes';
import { IDENTITY_CONCENTRATOR_ROUTES } from './admin/identity-concetrator/identity-concentrator.routes';
import { PASSPORT_ISSUERS_ROUTES } from './admin/passport-issuers/passport-issuers.routes';
import { PERSONAS_ROUTES } from './admin/personas/personas.routes';
import { RESOURCES_ROUTES } from './admin/resources/resources.routes';
import { SERVICE_TEMPLATES_ROUTES } from './admin/service-templates/service-templates.routes';
import { TRUSTED_SOURCES_ROUTES } from './admin/trusted-sources/trusted-sources.routes';
import { DATA_ROUTES } from './data/data.routes';
import { IDENTITY_ROUTES } from './identity/identity.routes';
import { LayoutComponent } from './layout/layout.component';
import { defaultRealm } from './shared/realm/realm.constant';

const routes: Routes = [
  {path: '', redirectTo: `/${defaultRealm}/data`, pathMatch: 'full'},
  {path: ':realmId', redirectTo: `/:realmId/data`, pathMatch: 'full'},
  {
    path: ':realmId',
    component: LayoutComponent,
    children: [
      ...DATA_ROUTES,
      ...IDENTITY_ROUTES,
      ...IDENTITY_CONCENTRATOR_ROUTES,
      ...TRUSTED_SOURCES_ROUTES,
      ...CLIENT_APPLICATIONS_ROUTES,
      ...CLAIM_DEFINITIONS_ROUTES,
      ...SERVICE_TEMPLATES_ROUTES,
      ...PASSPORT_ISSUERS_ROUTES,
      ...PERSONAS_ROUTES,
      ...RESOURCES_ROUTES,
      ...ACCESS_POLICIES_ROUTES,
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
