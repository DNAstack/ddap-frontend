import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormValidationService } from '../../../shared/form-validation.service';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityModel } from '../../shared/entity.model';
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { ResourceService } from '../resources.service';

@Component({
  selector: 'ddap-resource-manage',
  templateUrl: './resource-manage.component.html',
  styleUrls: ['./resource-manage.component.scss'],
})
export class ResourceManageComponent implements OnInit {

  @ViewChild(ResourceFormComponent)
  resourceForm: ResourceFormComponent;

  constructor(public resourceService: ResourceService,
              private router: Router,
              private route: ActivatedRoute,
              private formValidation: FormValidationService) {

  }

  ngOnInit() {
  }

  save() {
    if (!this.resourceForm.isValid()) {
      this.formValidation.forceValidateMultiple(this.resourceForm.allForms);
      return;
    }

    const resourceModel: EntityModel = this.resourceForm.getModel();
    const change = new ConfigModificationObject(resourceModel.dto, {});

    this.resourceService.save(resourceModel.name, change)
      .subscribe(this.navigateUp);
  }

  private navigateUp = () => this.router.navigate(['../..'], { relativeTo: this.route });
}
