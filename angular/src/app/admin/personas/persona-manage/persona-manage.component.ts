import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityModel } from '../../shared/entity.model';
import { PersonaFormComponent } from '../form/persona-form.component';
import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-manage',
  templateUrl: './persona-manage.component.html',
  styleUrls: ['./persona-manage.component.scss'],
})
export class PersonaManageComponent {

  @ViewChild(PersonaFormComponent)
  personaForm: PersonaFormComponent;

  constructor(private personaService: PersonaService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  save() {
    if (!this.personaForm.form.valid) {
      return;
    }

    const personaModel: EntityModel = this.personaForm.getEntityModel();
    const change = new ConfigModificationObject(personaModel.dto, {});
    this.personaService.save(personaModel.name, change)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
