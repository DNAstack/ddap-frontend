import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { MaterialDesignFrameworkModule } from 'angular7-json-schema-form';

import { SharedModule } from '../shared/shared.module';

import { DatasetFormComponent } from './dataset-form/dataset-form.component';
import { DatasetResultsComponent } from './dataset-results/dataset-results.component';
import { WorkflowDetailComponent } from './workflow-detail/workflow-detail.component';
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
    WorkflowDetailComponent,
  ],
  imports: [
    SharedModule,
    NgJsonEditorModule,
    FlexLayoutModule,
    MaterialDesignFrameworkModule,
    WorkflowsRoutingModule,
  ],
})
export class WorkflowsModule { }
