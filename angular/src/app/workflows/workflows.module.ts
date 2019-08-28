import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { WorkflowManageComponent } from './workflow-manage/workflow-manage.component';
import { WorkflowsRoutingModule } from './workflows-routing.module';

@NgModule({
  declarations: [
    WorkflowListComponent,
    WorkflowManageComponent,
  ],
  imports: [
    SharedModule,
    WorkflowsRoutingModule,
  ],
})
export class WorkflowsModule { }
