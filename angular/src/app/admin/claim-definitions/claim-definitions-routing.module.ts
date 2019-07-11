import {RouterModule, Routes} from '@angular/router';

import { ClaimDefinitionDetailComponent } from './claim-definition-detail/claim-definition-detail.component';
import { ClaimDefinitionListComponent } from './claim-definition-list/claim-definition-list.component';
import { ClaimDefinitionManageComponent } from './claim-definition-manage/claim-definition-manage.component';
import {NgModule} from "@angular/core";

export const routes: Routes = [
  { path: '', component: ClaimDefinitionListComponent },
  { path: ':definitionName', component: ClaimDefinitionDetailComponent },
  { path: 'manage/add', pathMatch: 'full', component: ClaimDefinitionManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimDefinitionsRoutingModule { }
