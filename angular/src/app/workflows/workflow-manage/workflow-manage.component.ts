import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { SimplifiedWesResourceViews, WesResourceViews } from '../workflow.model';
import { WorkflowService } from '../workflows.service';

@Component({
  selector: 'ddap-workflow-manage',
  templateUrl: './workflow-manage.component.html',
  styleUrls: ['./workflow-manage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkflowManageComponent implements OnInit {

  form: FormGroup;
  wesResourceViews: SimplifiedWesResourceViews[];

  constructor(private formBuilder: FormBuilder,
              private workflowService: WorkflowService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      wesView: ['', [Validators.required]],
    });

    this.workflowService.getAllWesViews()
      .subscribe((sanitizedWesResourceViews: SimplifiedWesResourceViews[]) => {
        this.wesResourceViews = sanitizedWesResourceViews;
      });
  }

}
