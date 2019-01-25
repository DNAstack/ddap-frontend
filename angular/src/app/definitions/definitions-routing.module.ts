import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefinitionDetailComponent } from './definition-detail/definition-detail.component';
import { DefinitionListComponent } from './definition-list/definition-list.component';
import { DefinitionManageComponent } from './definition-manage/definition-manage.component';

const routes: Routes = [
  { path: 'definitions', component: DefinitionListComponent },
  { path: 'definitions/:definitionName', component: DefinitionDetailComponent },
  { path: 'definitions/manage/add', component: DefinitionManageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefinitionsRoutingModule { }
