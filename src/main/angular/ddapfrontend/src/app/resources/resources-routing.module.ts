import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResourceListComponent } from './resource-list/resource-list.component';

const routes: Routes = [
  { path: 'resources', component: ResourceListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
