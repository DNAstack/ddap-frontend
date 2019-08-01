import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServiceDefinitionDetailComponent } from './service-definition-detail/service-definition-detail.component';
import { ServiceDefinitionListComponent } from './service-definition-list/service-definition-list.component';
import { ServiceDefinitionManageComponent } from './service-definition-manage/service-definition-manage.component';

export const routes: Routes = [
  { path: '', component: ServiceDefinitionListComponent },
  { path: ':entityId', component: ServiceDefinitionDetailComponent },
  { path: 'manage/add', pathMatch: 'full', component: ServiceDefinitionManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceDefinitionsRoutingModule { }
