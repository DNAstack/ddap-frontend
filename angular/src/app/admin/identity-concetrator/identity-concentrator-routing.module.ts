import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    children: [
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then(mod => mod.ClientsModule),
      },
      {
        path: 'identity-providers',
        loadChildren: () => import('./identity-providers/identity-providers.module').then(mod => mod.IdentityProvidersModule),
      },
      {
        path: 'options',
        loadChildren: () => import('./options/options.module').then(mod => mod.OptionsModule),
      },
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentityConcentratorRoutingModule { }
