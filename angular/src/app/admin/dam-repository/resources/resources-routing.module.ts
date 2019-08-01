import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ResourceManageComponent } from './resource-manage/resource-manage.component';

export const routes: Routes = [
  { path: '', component: ResourceListComponent },
  { path: ':entityId', component: ResourceDetailComponent },
  { path: 'manage/add', component: ResourceManageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcesRoutingModule { }
