import { Routes } from '@angular/router';

import { DefinitionDetailComponent } from './definition-detail/definition-detail.component';
import { DefinitionListComponent } from './definition-list/definition-list.component';
import { DefinitionManageComponent } from './definition-manage/definition-manage.component';

export const DEFINITIONS_ROUTES: Routes = [
  { path: 'definitions', component: DefinitionListComponent },
  { path: 'definitions/:definitionName', component: DefinitionDetailComponent },
  { path: 'definitions/manage/add', component: DefinitionManageComponent, pathMatch: 'full' },
];
