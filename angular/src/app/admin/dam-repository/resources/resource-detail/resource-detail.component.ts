import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { combine } from '../../../shared/form/form';
import { FormValidationService } from '../../../shared/form/form-validation.service';
import { DamConfigEntityDetailComponentBase } from '../../shared/dam/dam-config-entity-detail-component.base';
import { DamConfigStore } from '../../shared/dam/dam-config.store';
import { ResourceAccessComponent } from '../resource-access/resource-access.component';
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { ResourceService } from '../resources.service';
import { ResourcesStore } from '../resources.store';

@Component({
  selector: 'ddap-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss'],
  providers: [FormValidationService],
})
export class ResourceDetailComponent extends DamConfigEntityDetailComponentBase<ResourcesStore> implements OnInit {

  @ViewChild(ResourceFormComponent, { static: false })
  resourceForm: ResourceFormComponent;
  @ViewChild('accessForm', { static: false })
  accessForm: ResourceAccessComponent;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              protected damConfigStore: DamConfigStore,
              protected resourcesStore: ResourcesStore,
              private resourceService: ResourceService) {
    super(route, router, validationService, damConfigStore, resourcesStore);
  }

  update(isDryRun = false) {
    const aggregateForm = combine(this.resourceForm, this.accessForm);
    if (!isDryRun && !this.validate(this.accessForm.form ? aggregateForm : this.resourceForm)) {
      return;
    }

    const resourceModel: EntityModel = this.resourceForm.getModel();
    const applyModel = this.accessForm.getApplyModel(isDryRun) || {};
    const change = new ConfigModificationObject(resourceModel.dto, applyModel);
    this.resourceService.update(this.damId, this.entity.name, change)
      .subscribe(() => {
        if (!isDryRun) {
          this.navigateUp('..');
        }
      }, (error) => this.handleError(isDryRun, error));
  }

  delete() {
    this.resourceService.remove(this.damId, this.entity.name)
      .subscribe(() => this.navigateUp('..'), this.showError);
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
    this.update(true);
  }

}
