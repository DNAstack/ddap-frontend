import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CLAIMS_ROUTES } from './admin/claims/claims.routes';
import { CLIENTS_ROUTES } from './admin/clients/clients.routes';
import { DEFINITIONS_ROUTES } from './admin/definitions/definitions.routes';
import { GRANTS_ROUTES } from './admin/grants/grants.routes';
import { PASSPORTS_ROUTES } from './admin/passports/passports.routes';
import { PERSONAS_ROUTES } from './admin/personas/personas.routes';
import { RESOURCES_ROUTES } from './admin/resources/resources.routes';
import { RULES_ROUTES } from './admin/rules/rules.routes';
import { DATA_ROUTES } from './data/data.routes';
import { IDENTITY_ROUTES } from './identity/identity.routes';
import { DEFAULT_REALM } from './realm.constant';

const routes: Routes = [
  {path: '', redirectTo: `/${DEFAULT_REALM}/data`, pathMatch: 'full'},
  {path: ':realmId', children: DATA_ROUTES},
  {path: ':realmId', children: IDENTITY_ROUTES},
  {path: ':realmId', children: CLAIMS_ROUTES},
  {path: ':realmId', children: CLIENTS_ROUTES},
  {path: ':realmId', children: DEFINITIONS_ROUTES},
  {path: ':realmId', children: GRANTS_ROUTES},
  {path: ':realmId', children: PASSPORTS_ROUTES},
  {path: ':realmId', children: PERSONAS_ROUTES},
  {path: ':realmId', children: RESOURCES_ROUTES},
  {path: ':realmId', children: RULES_ROUTES},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
