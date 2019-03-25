import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CLIENTS_ROUTES } from './clients/clients.routes';
import { IDENTITY_PROVIDERS_ROUTES } from './identity-providers/identity-providers.routes';
import { OPTIONS_ROUTES } from './options/options.routes';

export const IDENTITY_CONCENTRATOR_ROUTES: Routes = [
  { path: 'identity-concentrator',
    children: [
      ...IDENTITY_PROVIDERS_ROUTES,
      ...CLIENTS_ROUTES,
      ...OPTIONS_ROUTES,
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(IDENTITY_CONCENTRATOR_ROUTES)],
  exports: [RouterModule],
})
export class IdentityConcentratorRoutingModule {
}
