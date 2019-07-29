import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PersonaService } from '../../personas/personas.service';
import { PersonasStore } from '../../personas/personas.store';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { DamEntityDetailBase } from '../../shared/dam-entity-detail.base';
import { DamConfigEntityDetailComponentBase } from '../../shared/dam/dam-config-entity-detail-component.base';
import { DamConfigStore } from '../../shared/dam/dam-config.store';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { ClaimDefinitionFormComponent } from '../claim-definition-form/claim-definition-form.component';
import { ClaimDefinitionService } from '../claim-definitions.service';
import { ClaimDefinitionsStore } from '../claim-definitions.store';

@Component({
  selector: 'ddap-claim-definition-detail',
  templateUrl: './claim-definition-detail.component.html',
  styleUrls: ['./claim-definition-detail.component.scss'],
  providers: [FormErrorScrollService],
})
export class ClaimDefinitionDetailComponent extends DamConfigEntityDetailComponentBase<ClaimDefinitionsStore> implements OnInit {

  @ViewChild(ClaimDefinitionFormComponent, { static: false })
  claimDefinitionForm: ClaimDefinitionFormComponent;
  @ViewChild('formErrorElement', { static: false })
  formErrorElement: ElementRef;

  constructor(protected route: ActivatedRoute,
              protected damConfigStore: DamConfigStore,
              protected claimDefinitionsStore: ClaimDefinitionsStore,
              private claimDefinitionService: ClaimDefinitionService,
              private router: Router,
              public formError: FormErrorScrollService) {
    super(route, damConfigStore, claimDefinitionsStore);
  }

  update() {
    if (!this.formError.validate(this.claimDefinitionForm, this.formErrorElement)) {
      return;
    }

    const claimDefinition: EntityModel = this.claimDefinitionForm.getModel();
    const change = new ConfigModificationObject(claimDefinition.dto, {});
    this.claimDefinitionService.update(this.damId, this.entity.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  delete() {
    this.claimDefinitionService.remove(this.damId, this.entity.name)
      .subscribe(this.navigateUp, this.showError);
  }

  private navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });

  private showError = ({ error }: HttpErrorResponse) => {
    const message = (error instanceof Object) ? JSON.stringify(error) : error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }

}
