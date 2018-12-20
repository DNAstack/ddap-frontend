import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceManageComponent } from './resource-manage/resource-manage.component';

const routes: Routes = [
  { path: 'resources', component: ResourceListComponent },
  { path: 'resources/add', component: ResourceManageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
