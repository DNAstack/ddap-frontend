import { NgModule } from '@angular/core';
import { NgJsonEditorModule } from 'ang-jsoneditor';

import { SharedModule } from '../shared/shared.module';

import { DatasetFormComponent } from './dataset-form/dataset-form.component';
import { DatasetResultsComponent } from './dataset-results/dataset-results.component';
import { DatasetViewAccessComponent } from './dataset-view-access/dataset-view-access.component';
import { DatasetViewsComponent } from './dataset-views/dataset-views.component';
import { WorkflowFormComponent } from './workflow-form/workflow-form.component';
import { WorkflowListComponent } from './workflow-list/workflow-list.component';
import { WorkflowManageComponent } from './workflow-manage/workflow-manage.component';
import { WorkflowsRoutingModule } from './workflows-routing.module';

@NgModule({
  declarations: [
    WorkflowListComponent,
    WorkflowManageComponent,
    WorkflowFormComponent,
    DatasetFormComponent,
    DatasetResultsComponent,
    DatasetViewsComponent,
    DatasetViewAccessComponent,
  ],
  imports: [
    SharedModule,
    NgJsonEditorModule,
    WorkflowsRoutingModule,
  ],
})
export class WorkflowsModule { }
