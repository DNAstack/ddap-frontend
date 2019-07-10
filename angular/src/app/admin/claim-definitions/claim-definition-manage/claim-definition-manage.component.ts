import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { ClaimDefinitionFormComponent } from '../claim-definition-form/claim-definition-form.component';
import { ClaimDefinitionService } from '../claim-definitions.service';

@Component({
  selector: 'ddap-claim-definition-manage',
  templateUrl: './claim-definition-manage.component.html',
  styleUrls: ['./claim-definition-manage.component.scss'],
  providers: [FormErrorScrollService],
})
export class ClaimDefinitionManageComponent {

  @ViewChild(ClaimDefinitionFormComponent, { static: false })
  claimDefinitionForm: ClaimDefinitionFormComponent;
  @ViewChild('formErrorElement', { static: false })
  formErrorElement: ElementRef;

  constructor(private definitionService: ClaimDefinitionService,
              private router: Router,
              private route: ActivatedRoute,
              public formError: FormErrorScrollService) {
  }

  save() {
    if (!this.formError.validate(this.claimDefinitionForm, this.formErrorElement)) {
      return;
    }

    const personaModel: EntityModel = this.claimDefinitionForm.getModel();
    const change = new ConfigModificationObject(personaModel.dto, {});
    this.definitionService.save(this.routeDamId(), personaModel.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  private navigateUp = () => this.router.navigate(['../..'], { relativeTo: this.route });
  private showError = ({ error }: HttpErrorResponse) => {
    const message = (error instanceof Object) ? JSON.stringify(error) : error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }

  private routeDamId() {
    return this.route
      .snapshot
      .paramMap
      .get('damId');
  }

}
