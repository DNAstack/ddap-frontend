import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { combine } from '../../../shared/form';
import { FormErrorScrollService } from '../../../shared/form-error-scroll.service';
import { DamConfigEntityDetailComponentBase } from '../../shared/dam/dam-config-entity-detail-component.base';
import { DamConfigEntityType } from '../../shared/dam/dam-config-entity-type.enum';
import { DamConfigStore } from '../../shared/dam/dam-config.store';
import { PersonaResourceAccessComponent } from '../resource-form/persona-resource-access/persona-resource-access.component';
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { ResourceService } from '../resources.service';
import { ResourcesStore } from '../resources.store';

@Component({
  selector: 'ddap-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss'],
  providers: [FormErrorScrollService],
})
export class ResourceDetailComponent extends DamConfigEntityDetailComponentBase<ResourcesStore> implements OnInit {

  @ViewChild(ResourceFormComponent, { static: false })
  resourceForm: ResourceFormComponent;
  @ViewChild('formErrorElement', { static: false })
  formErrorElement: ElementRef;
  @ViewChild('accessForm', { static: false })
  accessForm: PersonaResourceAccessComponent;

  constructor(protected route: ActivatedRoute,
              protected damConfigStore: DamConfigStore,
              protected resourcesStore: ResourcesStore,
              private resourceService: ResourceService,
              private router: Router,
              public formError: FormErrorScrollService) {
    super(route, damConfigStore, resourcesStore);
  }

  delete() {
    this.resourceService.remove(this.damId, this.entity.name)
      .subscribe(this.navigateUp, this.showError);
  }

  update() {
    const aggregateForm = combine(this.resourceForm, this.accessForm.testForm);
    if (this.formError.validate(aggregateForm, this.formErrorElement)) {

      const resourceModel: EntityModel = this.resourceForm.getModel();
      const applyModel = this.accessForm.getApplyModel() || {};
      const change = new ConfigModificationObject(resourceModel.dto, applyModel);
      this.resourceService.update(this.damId, this.entity.name, change)
        .subscribe(this.navigateUp, this.showError);
    }
  }

  protected navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });

  protected showError = (error: HttpErrorResponse) => {
    const message = (error.error instanceof Object) ? JSON.stringify(error.error) : error.error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }

}
