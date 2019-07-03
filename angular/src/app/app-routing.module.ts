import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DAM_ADMIN_ROUTES } from './admin/admin.routes';
import { IDENTITY_CONCENTRATOR_ROUTES } from './admin/identity-concetrator/identity-concentrator.routes';
import { DATA_ROUTES } from './data/data.routes';
import { IDENTITY_ROUTES } from './identity/identity.routes';
import { LayoutComponent } from './layout/layout.component';
import { defaultRealm } from './shared/realm/realm.constant';

const routes: Routes = [
  // FIXME need to pull id from somewhere
  {path: '', redirectTo: `/${defaultRealm}/data/1`, pathMatch: 'full'},
  {path: ':realmId', redirectTo: `/:realmId/data/1`, pathMatch: 'full'},
  {
    path: ':realmId',
    component: LayoutComponent,
    children: [
      ...DATA_ROUTES,
      ...IDENTITY_ROUTES,
      ...IDENTITY_CONCENTRATOR_ROUTES,
      ...DAM_ADMIN_ROUTES,
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
