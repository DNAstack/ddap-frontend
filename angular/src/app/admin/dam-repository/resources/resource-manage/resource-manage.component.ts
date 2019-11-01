import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineForms, FormValidationService } from 'ddap-common-lib';
import { ConfigModificationModel, EntityModel } from 'ddap-common-lib';

import { DamConfigEntityFormComponentBase } from '../../shared/dam/dam-config-entity-form-component.base';
import { ResourceAccessComponent } from '../resource-access/resource-access.component';
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { ResourceService } from '../resources.service';

@Component({
  selector: 'ddap-resource-manage',
  templateUrl: './resource-manage.component.html',
  styleUrls: ['./resource-manage.component.scss'],
  providers: [FormValidationService],
})
export class ResourceManageComponent extends DamConfigEntityFormComponentBase {

  @ViewChild(ResourceFormComponent, { static: false })
  resourceForm: ResourceFormComponent;
  @ViewChild('accessForm', { static: false })
  accessForm: ResourceAccessComponent;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              public resourceService: ResourceService) {
    super(route, router, validationService);
  }

  save(isDryRun = false) {
    const aggregateForm = combineForms(this.resourceForm, this.accessForm);
    if (!isDryRun && !this.validate(this.accessForm.form ? aggregateForm : this.resourceForm)) {
      return;
    }

    const resourceModel: EntityModel = this.resourceForm.getModel();
    const applyModel = this.accessForm.getApplyModel(isDryRun) || {};
    const change = new ConfigModificationModel(resourceModel.dto, applyModel);

    return this.resourceService.save(this.damId, resourceModel.name, change)
      .subscribe(() => {
        if (!isDryRun) {
          this.navigateUp('../..');
        }
      }, (error) => this.handleError(isDryRun, error));
  }

  handleError = (isDryRun: boolean, error: HttpErrorResponse) => {
    if (error.status === 424 && this.accessForm.isConfigModificationObject(error)) {
      this.accessForm.makeFieldsValid();
      this.accessForm.validatePersonaFields(error);
    } else if (!isDryRun) {
      this.showError(error);
    }
  }

  executeDryRun() {
    this.save(true);
  }

}
