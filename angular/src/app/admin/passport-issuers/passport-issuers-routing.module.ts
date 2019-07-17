import {RouterModule, Routes} from '@angular/router';

import { PassportIssuerDetailComponent } from './passport-issuer-detail/passport-issuer-detail.component';
import { PassportIssuerListComponent } from './passport-issuer-list/passport-issuer-list.component';
import { PassportIssuerManageComponent } from './passport-issuer-manage/passport-issuer-manage.component';
import {NgModule} from "@angular/core";

export const routes: Routes = [
  { path: '', component: PassportIssuerListComponent },
  { path: ':passportName', component: PassportIssuerDetailComponent },
  { path: 'manage/add', pathMatch: 'full', component: PassportIssuerManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassportIssuersRoutingModule { }
