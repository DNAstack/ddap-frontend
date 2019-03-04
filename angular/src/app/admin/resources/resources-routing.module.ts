import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceManageComponent } from './resource-manage/resource-manage.component';

const routes: Routes = [
  { path: ':realm/resources', component: ResourceListComponent },
  { path: ':realm/resources/:resourceName', component: ResourceDetailComponent },
  { path: ':realm/resources/manage/add', component: ResourceManageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcesRoutingModule { }
