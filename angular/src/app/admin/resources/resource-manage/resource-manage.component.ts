import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { JsonEditorDefaults } from '../../shared/jsonEditorDefaults';
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { ResourceService } from '../resources.service';

@Component({
  selector: 'ddap-resource-manage',
  templateUrl: './resource-manage.component.html',
  styleUrls: ['./resource-manage.component.scss'],
  providers: [FormErrorScrollService],
})
export class ResourceManageComponent {

  @ViewChild(ResourceFormComponent)
  resourceForm: ResourceFormComponent;
  @ViewChild('formErrorElement')
  formErrorElement: ElementRef;

  test: any;
  testEditorOptions = new JsonEditorDefaults();

  constructor(public resourceService: ResourceService,
              private router: Router,
              private route: ActivatedRoute,
              public formError: FormErrorScrollService) {
    this.testEditorOptions.mode = 'code';
  }

  updateTestDto(event: any) {
    this.test = event;
  }

  save() {
    if (!this.formError.validate(this.resourceForm, this.formErrorElement)) {
      return;
    }

    const resourceModel: EntityModel = this.resourceForm.getModel();
    const applyModel = this.test || {};
    const change = new ConfigModificationObject(resourceModel.dto, applyModel);

    this.resourceService.save(resourceModel.name, change)
      .subscribe(this.navigateUp);
  }

  private navigateUp = () => this.router.navigate(['../..'], { relativeTo: this.route });
}
