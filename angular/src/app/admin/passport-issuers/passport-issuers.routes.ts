import { Routes } from '@angular/router';

import { PassportIssuerDetailComponent } from './passport-issuer-detail/passport-issuer-detail.component';
import { PassportIssuerListComponent } from './passport-issuer-list/passport-issuer-list.component';
import { PassportIssuerManageComponent } from './passport-issuer-manage/passport-issuer-manage.component';

export const PASSPORT_ISSUERS_ROUTES: Routes = [
  { path: 'passport-issuers', component: PassportIssuerListComponent },
  { path: 'passport-issuers/:passportName', component: PassportIssuerDetailComponent },
  { path: 'passport-issuers/manage/add', component: PassportIssuerManageComponent, pathMatch: 'full' },
];
