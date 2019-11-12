import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

import { environment } from '../../../environments/environment';
import { JsonEditorDefaults } from '../../admin/dam-repository/shared/jsonEditorDefaults';
import { WorkflowService } from '../workflows.service';

@Component({
  selector: 'ddap-workflow-detail',
  templateUrl: './workflow-detail.component.html',
  styleUrls: ['./workflow-detail.component.scss'],
})
export class WorkflowDetailComponent implements OnInit {
  runDetails;
  editorOptions: JsonEditorOptions | any;

  @ViewChild(JsonEditorComponent, { static: false })
  editor: JsonEditorComponent;

  constructor(private workflowService: WorkflowService,
              private activatedRoute: ActivatedRoute) {
    this.editorOptions = new JsonEditorDefaults();
  }

  ngOnInit() {
    const {damId, viewId, runId} = this.activatedRoute.snapshot.params;
    this.workflowService.workflowRunDetail(damId, viewId, runId).subscribe(runDetails => {
      this.runDetails = this.transformResponse(runDetails);
    });
  }

  private transformResponse(runDetailsResponse) {
    const realmId = this.activatedRoute.root.firstChild.snapshot.params.realmId;

    Object.keys(runDetailsResponse).forEach(key => {
      if (typeof runDetailsResponse[key] === 'object') {
        return this.transformResponse(runDetailsResponse[key]);
      } else if (typeof runDetailsResponse[key] === 'string') {
        runDetailsResponse[key] = runDetailsResponse[key]
          .replace('gs://', `${environment.ddapApiUrl}/${realmId}/access/`);
      }
    });
    return runDetailsResponse;
  }

}
