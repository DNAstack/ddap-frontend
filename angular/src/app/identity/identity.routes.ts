import { Routes } from '@angular/router';

import { IdentityComponent } from './identity.component';

export const IDENTITY_ROUTES: Routes = [
  // TODO https://dnastack.atlassian.net/browse/DISCO-2026
  {path: 'myidentity', component: IdentityComponent},
];
