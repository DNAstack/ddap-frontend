import TestPersona = dam.v1.TestPersona;
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { dam } from '../../../../shared/proto/dam-service';
import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { FormValidationService } from '../../../shared/form/form-validation.service';
import { DamConfigEntityFormComponentBase } from '../../shared/dam/dam-config-entity-form-component.base';
import { PersonaFormComponent } from '../persona-form/persona-form.component';
import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-manage',
  templateUrl: './persona-manage.component.html',
  styleUrls: ['./persona-manage.component.scss'],
  providers: [FormValidationService],
})
export class PersonaManageComponent extends DamConfigEntityFormComponentBase implements OnInit {

  @ViewChild(PersonaFormComponent, { static: false })
  personaForm: PersonaFormComponent;

  persona: TestPersona;

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              private personaService: PersonaService) {
    super(route, router, validationService);
  }

  ngOnInit(): void {
    this.persona = TestPersona.create({});
  }

  save() {
    if (!this.validate(this.personaForm)) {
      return;
    }

    const personaModel: EntityModel = this.personaForm.getModel();
    const change = new ConfigModificationObject(personaModel.dto, {});
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
