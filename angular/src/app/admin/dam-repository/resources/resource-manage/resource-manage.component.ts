import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { combine } from '../../../shared/form/form';
import { FormValidationService } from '../../../shared/form/form-validation.service';
import { DamConfigEntityFormComponentBase } from '../../shared/dam/dam-config-entity-form-component.base';
import { PersonaResourceAccessComponent } from '../resource-form/persona-resource-access/persona-resource-access.component';
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
  accessForm: PersonaResourceAccessComponent;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              public resourceService: ResourceService) {
    super(route, router, validationService);
  }

  save() {
    const aggregateForm = combine(this.resourceForm, this.accessForm.testForm);
    if (!this.validate(this.accessForm.testForm.form ? aggregateForm : this.resourceForm)) {
      return;
    }

    const resourceModel: EntityModel = this.resourceForm.getModel();
    const applyModel = this.accessForm.getApplyModel() || {};
    const change = new ConfigModificationObject(resourceModel.dto, applyModel);

    return this.resourceService.save(this.damId, resourceModel.name, change)
      .subscribe(() => this.navigateUp('../..'), this.showError);
  }

}
