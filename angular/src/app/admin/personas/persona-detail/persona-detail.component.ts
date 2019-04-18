import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import _get from 'lodash.get';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityDetailBase } from '../../shared/entity-detail.base';
import { EntityModel } from '../../shared/entity.model';
import { PersonaFormComponent } from '../form/persona-form.component';
import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-detail',
  templateUrl: './persona-detail.component.html',
  styleUrls: ['./persona-detail.component.scss'],
})
export class PersonaDetailComponent extends EntityDetailBase<PersonaService> implements OnInit {
  @ViewChild(PersonaFormComponent)
  personaForm: PersonaFormComponent;

  constructor(route: ActivatedRoute,
              personaService: PersonaService,
              private router: Router) {
    super(route, personaService, 'personaName');
  }

  update() {
    if (!this.personaForm.form.valid) {
      return;
    }

    const personaModel: EntityModel = this.personaForm.getEntityModel();
    const change = new ConfigModificationObject(personaModel.dto, {});
    this.entityService.update(this.entity.name, change)
      .subscribe(this.navigateUp, (err) => this.invalidateAccessFields(err));
  }

  delete() {
    this.entityService.remove(this.entity.name)
      .subscribe(this.navigateUp);
  }

  private navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });

  private invalidateAccessFields({error}) {
    const personaId = this.personaForm.form.get('id').value;
    const resourcesFormGroup = this.personaForm.form.get('resources');
    const fieldsToAdd: object = _get(error, `testPersonas[${personaId}].addResources`);
    const fieldsToRemove: object = _get(error, `testPersonas[${personaId}].removeResources`);

    const setError = ([resourceName, { access }]) => {
      access.forEach((accessRole) => {
        const accessRoleCheckbox = resourcesFormGroup.get(resourceName).get(accessRole);
        accessRoleCheckbox.setErrors({'Doesn\'t match role criteria': true});
      });
    };

    Object.entries(fieldsToAdd)
      .forEach(setError);

    Object.entries(fieldsToRemove)
      .forEach(setError);
  }
}
