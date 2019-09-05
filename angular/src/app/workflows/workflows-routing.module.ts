import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkflowDetailComponent } from './workflow-detail/workflow-detail.component';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { WorkflowManageComponent } from './workflow-manage/workflow-manage.component';

export const routes: Routes = [
  { path: '', component: WorkflowListComponent },
  { path: 'manage/add', pathMatch: 'full', component: WorkflowManageComponent },
  { path: ':damId/views/:viewId/runs/:runId', component: WorkflowDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowsRoutingModule { }
