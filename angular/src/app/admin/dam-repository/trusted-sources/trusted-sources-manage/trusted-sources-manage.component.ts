import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { FormValidationService } from '../../../shared/form/form-validation.service';
import { DamConfigEntityFormComponentBase } from '../../shared/dam/dam-config-entity-form-component.base';
import { TrustedSourcesFormComponent } from '../trusted-sources-form/trusted-sources-form.component';
import { TrustedSourcesService } from '../trusted-sources.service';

@Component({
  selector: 'ddap-trusted-source-manage',
  templateUrl: './trusted-sources-manage.component.html',
  styleUrls: ['./trusted-sources-manage.component.scss'],
  providers: [FormValidationService],
})
export class TrustedSourcesManageComponent extends DamConfigEntityFormComponentBase {

  @ViewChild(TrustedSourcesFormComponent, { static: false })
  trustedSourcesForm: TrustedSourcesFormComponent;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              private trustedSourcesService: TrustedSourcesService) {
    super(route, router, validationService);
  }

  save() {
    if (!this.validate(this.trustedSourcesForm)) {
      return;
    }

    const trustedSources: EntityModel = this.trustedSourcesForm.getModel();
    const change = new ConfigModificationObject(trustedSources.dto, {});
    this.trustedSourcesService.save(this.damId, trustedSources.name, change)
      .subscribe(() => this.navigateUp('../..'), this.showError);
  }

}
