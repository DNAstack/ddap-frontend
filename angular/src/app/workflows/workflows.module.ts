import { NgModule } from '@angular/core';
import { NgJsonEditorModule } from 'ang-jsoneditor';

import { SharedModule } from '../shared/shared.module';

import { WorkflowFormComponent } from './workflow-form/workflow-form.component';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { WorkflowManageComponent } from './workflow-manage/workflow-manage.component';
import { WorkflowsRoutingModule } from './workflows-routing.module';

@NgModule({
  declarations: [
    WorkflowListComponent,
    WorkflowFormComponent,
    WorkflowManageComponent,
  ],
  imports: [
    SharedModule,
    NgJsonEditorModule,
    WorkflowsRoutingModule,
  ],
})
export class WorkflowsModule { }
