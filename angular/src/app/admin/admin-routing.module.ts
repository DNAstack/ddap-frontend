import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dam',
    loadChildren: () => import('./dam-repository/dam-repository.module')
      .then(mod => mod.DamRepositoryModule),
  },
  {
    path: 'identity-concentrator',
    loadChildren: () => import('./identity-concentrator/identity-concentrator.module')
      .then(mod => mod.IdentityConcentratorModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
