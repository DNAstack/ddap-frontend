import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormValidationService } from '../../../shared/form-validation.service';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityModel } from '../../shared/entity.model';
import { TrustedSourcesFormComponent } from '../trusted-sources-form/trusted-sources-form.component';
import { TrustedSourcesService } from '../trusted-sources.service';

@Component({
  selector: 'ddap-trusted-source-manage',
  templateUrl: './trusted-sources-manage.component.html',
  styleUrls: ['./trusted-sources-manage.component.scss'],
})
export class TrustedSourcesManageComponent {

  @ViewChild(TrustedSourcesFormComponent)
  trustedSourcesForm: TrustedSourcesFormComponent;

  submitted = false;

  constructor(private trustedSourcesService: TrustedSourcesService,
              private router: Router,
              private route: ActivatedRoute,
              private formValidation: FormValidationService) {
  }

  save() {
    const trustedSourcesModel: EntityModel = this.trustedSourcesForm.getModel();
    const change = new ConfigModificationObject(trustedSourcesModel.dto, {});

    if (!this.trustedSourcesForm.form.valid) {
      this.formValidation.forceValidate(this.trustedSourcesForm.form);
      this.submitted = true;
      return;
    }

    this.trustedSourcesService.save(trustedSourcesModel.name, change)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
