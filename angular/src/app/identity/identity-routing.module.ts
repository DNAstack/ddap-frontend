import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdentityComponent } from './identity.component';

const routes: Routes = [
  // TODO https://dnastack.atlassian.net/browse/DISCO-2026
  {path: ':realm/myidentity', component: IdentityComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentityRoutingModule {
}
