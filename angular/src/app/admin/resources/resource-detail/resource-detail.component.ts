import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { DamEntityFormDetailBase } from '../../shared/dam-entity-form-detail.base';
import { EntityModel } from '../../shared/entity.model';
import { combine } from '../../shared/form';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { PersonaResourceAccessComponent } from '../resource-form/persona-resource-access/persona-resource-access.component';
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { ResourceService } from '../resources.service';

@Component({
  selector: 'ddap-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss'],
  providers: [FormErrorScrollService],
})
export class ResourceDetailComponent extends DamEntityFormDetailBase<ResourceService> implements OnInit {

  @ViewChild(ResourceFormComponent)
  resourceForm: ResourceFormComponent;
  @ViewChild('formErrorElement')
  formErrorElement: ElementRef;
  @ViewChild('accessForm')
  accessForm: PersonaResourceAccessComponent;

  constructor(route: ActivatedRoute,
              resourceService: ResourceService,
              protected router: Router,
              public formError: FormErrorScrollService) {
    super(route, router, resourceService, 'resourceName');
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.entityService.getResource(this.routeDamId(), params['resourceName']))
    ).subscribe((resource) => {
      this.entity = resource;
    });
  }

  delete() {
    this.doDelete(this.entity.name);
  }

  update() {
    const aggregateForm = combine(this.resourceForm, this.accessForm.testForm);
    if (this.formError.validate(aggregateForm, this.formErrorElement)) {

      const resourceModel: EntityModel = this.resourceForm.getModel();
      const applyModel = this.accessForm.getApplyModel() || {};
      const change = new ConfigModificationObject(resourceModel.dto, applyModel);
      this.entityService.update(this.routeDamId(), this.entity.name, change)
        .subscribe(this.navigateUp, this.showError);
    }
  }

  protected showError = (error: HttpErrorResponse) => {
    const message = (error.error instanceof Object) ? JSON.stringify(error.error) : error.error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }
}
