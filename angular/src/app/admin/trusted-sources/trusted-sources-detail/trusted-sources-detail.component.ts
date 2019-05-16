import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormValidationService } from '../../../shared/form-validation.service';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityDetailBase } from '../../shared/entity-detail.base';
import { EntityModel } from '../../shared/entity.model';
import { TrustedSourcesFormComponent } from '../trusted-sources-form/trusted-sources-form.component';
import { TrustedSourcesService } from '../trusted-sources.service';

@Component({
  selector: 'ddap-trusted-source-detail',
  templateUrl: './trusted-sources-detail.component.html',
  styleUrls: ['./trusted-sources-detail.component.scss'],
})
export class TrustedSourcesDetailComponent extends EntityDetailBase<TrustedSourcesService> {

  @ViewChild(TrustedSourcesFormComponent)
  trustedSourcesForm: TrustedSourcesFormComponent;

  submitted = false;

  constructor(
    route: ActivatedRoute,
    trustedSourcesService: TrustedSourcesService,
    private router: Router,
    private formValidation: FormValidationService
  ) {
    super(route, trustedSourcesService, 'trustedSourceName');
  }

  update() {
    if (!this.trustedSourcesForm.form.valid) {
      this.formValidation.forceValidate(this.trustedSourcesForm.form);
      this.submitted = true;
      return;
    }

    const trustedSourcesModel: EntityModel = this.trustedSourcesForm.getModel();
    const change = new ConfigModificationObject(trustedSourcesModel.dto, {});
    this.entityService.update(this.entity.name, change)
      .subscribe(this.navigateUp);
  }

  delete() {
    this.entityService.remove(this.entity.name)
      .subscribe(this.navigateUp);
  }

  private navigateUp = () => this.router.navigate(['..'], {relativeTo: this.route});
}
