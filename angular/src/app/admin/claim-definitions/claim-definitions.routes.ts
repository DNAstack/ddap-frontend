import { Routes } from '@angular/router';

import { ClaimDefinitionDetailComponent } from './claim-definition-detail/claim-definition-detail.component';
import { ClaimDefinitionListComponent } from './claim-definition-list/claim-definition-list.component';
import { ClaimDefinitionManageComponent } from './claim-definition-manage/claim-definition-manage.component';

export const CLAIM_DEFINITIONS_ROUTES: Routes = [
  { path: 'claim-definitions', component: ClaimDefinitionListComponent },
  { path: 'claim-definitions/:definitionName', component: ClaimDefinitionDetailComponent },
  { path: 'claim-definitions/manage/add', component: ClaimDefinitionManageComponent, pathMatch: 'full' },
];
