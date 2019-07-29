import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { DamConfigEntityComponentBase } from '../../shared/dam/dam-config-entity-component.base';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { PersonaResourceAccessComponent } from '../resource-form/persona-resource-access/persona-resource-access.component';
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { ResourceService } from '../resources.service';

@Component({
  selector: 'ddap-resource-manage',
  templateUrl: './resource-manage.component.html',
  styleUrls: ['./resource-manage.component.scss'],
  providers: [FormErrorScrollService],
})
export class ResourceManageComponent extends DamConfigEntityComponentBase {

  @ViewChild(ResourceFormComponent, { static: false })
  resourceForm: ResourceFormComponent;
  @ViewChild('formErrorElement', { static: false })
  formErrorElement: ElementRef;
  @ViewChild('accessForm', { static: false })
  accessForm: PersonaResourceAccessComponent;

  constructor(public resourceService: ResourceService,
              public formError: FormErrorScrollService,
              protected route: ActivatedRoute,
              private router: Router) {
    super(route);
  }

  save() {
    if (this.formError.validate(this.resourceForm, this.formErrorElement)) {
      const resourceModel: EntityModel = this.resourceForm.getModel();
      const applyModel = this.accessForm.getApplyModel() || {};
      const change = new ConfigModificationObject(resourceModel.dto, applyModel);

      return this.resourceService.save(this.damId, resourceModel.name, change)
        .subscribe(this.navigateUp, this.showError);
    }
  }

  private navigateUp = () => this.router.navigate(['../..'], { relativeTo: this.route });

  private showError = ({ error }: HttpErrorResponse) => {
    const message = (error instanceof Object) ? JSON.stringify(error) : error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }

}
