import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceManageComponent } from './resource-manage/resource-manage.component';
import { ResourceDetailComponent } from './resource-detail/resource-detail.component';

const routes: Routes = [
  { path: 'resources', component: ResourceListComponent },
  { path: 'resources/:resourceName', component: ResourceDetailComponent },
  { path: 'resources/manage/add', component: ResourceManageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
