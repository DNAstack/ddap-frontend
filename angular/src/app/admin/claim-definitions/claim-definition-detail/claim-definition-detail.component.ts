import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityDetailBase } from '../../shared/entity-detail.base';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { ClaimDefinitionFormComponent } from '../claim-definition-form/claim-definition-form.component';
import { ClaimDefinitionService } from '../claim-definitions.service';

@Component({
  selector: 'ddap-claim-definition-detail',
  templateUrl: './claim-definition-detail.component.html',
  styleUrls: ['./claim-definition-detail.component.scss'],
  providers: [FormErrorScrollService],
})
export class ClaimDefinitionDetailComponent extends EntityDetailBase<ClaimDefinitionService> {

  @ViewChild(ClaimDefinitionFormComponent)
  claimDefinitionForm: ClaimDefinitionFormComponent;
  @ViewChild('formErrorElement')
  formErrorElement: ElementRef;

  constructor(route: ActivatedRoute,
              definitionService: ClaimDefinitionService,
              private router: Router,
              public formError: FormErrorScrollService) {
    super(route, definitionService, 'definitionName');
  }

  update() {
    if (!this.formError.validate(this.claimDefinitionForm, this.formErrorElement)) {
      return;
    }

    const claimDefinition: EntityModel = this.claimDefinitionForm.getModel();
    const change = new ConfigModificationObject(claimDefinition.dto, {});
    this.entityService.update(this.entity.name, change)
      .subscribe(this.navigateUp);
  }

  delete() {
    this.entityService.remove(this.entity.name)
      .subscribe(this.navigateUp);
  }

  private navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });
}
