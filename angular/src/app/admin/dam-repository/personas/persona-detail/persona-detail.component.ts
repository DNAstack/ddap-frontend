import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from 'ddap-common-lib';
import { ConfigModificationModel, EntityModel } from 'ddap-common-lib';

import { DamConfigEntityDetailComponentBase } from '../../shared/dam/dam-config-entity-detail-component.base';
import { DamConfigStore } from '../../shared/dam/dam-config.store';
import { PersonaFormComponent } from '../persona-form/persona-form.component';
import { PersonaService } from '../personas.service';
import { PersonasStore } from '../personas.store';

@Component({
  selector: 'ddap-persona-detail',
  templateUrl: './persona-detail.component.html',
  styleUrls: ['./persona-detail.component.scss'],
  providers: [FormValidationService],
})
export class PersonaDetailComponent extends DamConfigEntityDetailComponentBase<PersonasStore> {

  @ViewChild(PersonaFormComponent, { static: false })
  personaForm: PersonaFormComponent;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              protected damConfigStore: DamConfigStore,
              protected personasStore: PersonasStore,
              private personaService: PersonaService) {
    super(route, router, validationService, damConfigStore, personasStore);
  }

  update() {
    if (!this.validate(this.personaForm)) {
      return;
    }

    const personaModel: EntityModel = this.personaForm.getModel();
    const change = new ConfigModificationModel(personaModel.dto, {});
    this.personaService.update(this.damId, this.entity.name, change)
      .subscribe(() => this.navigateUp('..'), this.showErrorMessage);
  }

  delete() {
    this.personaService.remove(this.damId, this.entity.name)
      .subscribe(() => this.navigateUp('..'), this.showErrorMessage);
  }

  showErrorMessage = (error: HttpErrorResponse) => {
    if (error.status === 424) {
      const personaModel: EntityModel = this.personaForm.getModel();
      this.personaForm.accessForm.validateAccessFields(personaModel.name, error);
    } else {
      this.showError(error);
    }
  }

}
