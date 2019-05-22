import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityDetailBase } from '../../shared/entity-detail.base';
import { EntityModel } from '../../shared/entity.model';
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
export class ResourceDetailComponent extends EntityDetailBase<ResourceService> implements OnInit {

  @ViewChild(ResourceFormComponent)
  resourceForm: ResourceFormComponent;
  @ViewChild('formErrorElement')
  formErrorElement: ElementRef;
  @ViewChild('accessForm')
  accessForm: PersonaResourceAccessComponent;

  constructor(route: ActivatedRoute,
              resourceService: ResourceService,
              private router: Router,
              public formError: FormErrorScrollService) {
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
    if (!this.formError.validate(this.resourceForm, this.formErrorElement)) {
      return;
    }

    const resourceModel: EntityModel = this.resourceForm.getModel();
    this.accessForm.dryRun(resourceModel);
    if (this.accessForm.error) {
      return;
    }
    const applyModel = this.accessForm.getApplyModel() || {};
    const change = new ConfigModificationObject(resourceModel.dto, applyModel);

    this.entityService.update(this.entity.name, change)
      .subscribe(this.navigateUp);
  }

  delete() {
    this.entityService.remove(this.entity.name)
      .subscribe(this.navigateUp);
  }

  private navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });

}
