import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from 'ddap-common-lib';

import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { DamConfigEntityFormComponentBase } from '../../shared/dam/dam-config-entity-form-component.base';
import { ClaimDefinitionFormComponent } from '../claim-definition-form/claim-definition-form.component';
import { ClaimDefinitionService } from '../claim-definitions.service';

@Component({
  selector: 'ddap-claim-definition-manage',
  templateUrl: './claim-definition-manage.component.html',
  styleUrls: ['./claim-definition-manage.component.scss'],
  providers: [FormValidationService],
})
export class ClaimDefinitionManageComponent extends DamConfigEntityFormComponentBase {

  @ViewChild(ClaimDefinitionFormComponent, { static: false })
  claimDefinitionForm: ClaimDefinitionFormComponent;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              private claimDefinitionService: ClaimDefinitionService) {
    super(route, router, validationService);
  }

  save() {
    if (!this.validate(this.claimDefinitionForm)) {
      return;
    }

    const claimDefinition: EntityModel = this.claimDefinitionForm.getModel();
    const change = new ConfigModificationObject(claimDefinition.dto, {});
    this.claimDefinitionService.save(this.damId, claimDefinition.name, change)
      .subscribe(() => this.navigateUp('../..'), this.showError);
  }

}
