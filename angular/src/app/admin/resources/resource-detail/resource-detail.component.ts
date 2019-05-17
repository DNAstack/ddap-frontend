import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { FormValidationService } from '../../../shared/form-validation.service';
import { dam } from '../../../shared/proto/dam-service';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityDetailBase } from '../../shared/entity-detail.base';
import { EntityModel } from '../../shared/entity.model';
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { ResourceService } from '../resources.service';
import IConfigRequest = dam.v1.IConfigRequest;
import ConfigRequest = dam.v1.ConfigRequest;

@Component({
  selector: 'ddap-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss'],
})
export class ResourceDetailComponent extends EntityDetailBase<ResourceService> implements OnInit {

  @ViewChild(ResourceFormComponent)
  resourceForm: ResourceFormComponent;

  constructor(route: ActivatedRoute,
              resourceService: ResourceService,
              private router: Router,
              private formValidation: FormValidationService) {
    super(route, resourceService, 'resourceName');
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.entityService.getResource(params['resourceName']))
    ).subscribe((resource) => {
      this.entity = resource;
    });
  }

  update() {
    if (!this.resourceForm.isValid()) {
      this.formValidation.forceValidateMultiple(this.resourceForm.allForms);
      return;
    }

    const resourceModel: EntityModel = this.resourceForm.getModel();
    const change = new ConfigModificationObject(resourceModel.dto, {});
    this.entityService.update(this.entity.name, change)
      .subscribe(this.navigateUp);
  }

  delete() {
    this.entityService.remove(this.entity.name)
      .subscribe(this.navigateUp);
  }

  private navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });

}
