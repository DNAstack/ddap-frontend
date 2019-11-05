import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { defaultRealm } from 'ddap-common-lib';

import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: `/${defaultRealm}/data` },
  { path: ':realmId', pathMatch: 'full', redirectTo: `/:realmId/data` },
  {
    path: ':realmId',
    component: LayoutComponent,
    children: [
      {
        path: 'data',
        loadChildren: () => import('./data/data.module')
          .then(mod => mod.DataModule),
      },
      {
        path: 'identity',
        loadChildren: () => import('./identity/identity.module')
          .then(mod => mod.IdentityModule),
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module')
          .then(mod => mod.AdminModule),
      },
      {
        path: 'workflows',
        loadChildren: () => import('./workflows/workflows.module')
          .then(mod => mod.WorkflowsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
