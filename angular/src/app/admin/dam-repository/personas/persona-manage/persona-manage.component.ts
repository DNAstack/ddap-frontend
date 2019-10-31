import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from 'ddap-common-lib';

import { ConfigModificationModel } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { DamConfigEntityManageComponentBase } from '../../shared/dam/dam-config-entity-manage-component.base';
import { DamConfigStore } from '../../shared/dam/dam-config.store';
import { PersonaFormComponent } from '../persona-form/persona-form.component';
import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-manage',
  templateUrl: './persona-manage.component.html',
  styleUrls: ['./persona-manage.component.scss'],
  providers: [FormValidationService],
})
export class PersonaManageComponent extends DamConfigEntityManageComponentBase {

  @ViewChild(PersonaFormComponent, { static: false })
  personaForm: PersonaFormComponent;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              protected damConfigStore: DamConfigStore,
              private personaService: PersonaService) {
    super(route, router, validationService, damConfigStore);
  }

  save() {
    if (!this.validate(this.personaForm)) {
      return;
    }

    const personaModel: EntityModel = this.personaForm.getModel();
    const change = new ConfigModificationModel(personaModel.dto, {});
    this.personaService.save(this.damId, personaModel.name, change)
      .subscribe(
        () => this.navigateUp('../..'),
        (err) => {
          this.personaForm.accessForm.validateAccessFields(personaModel.name, err);
          this.showError(err);
        }
      );
  }

}
