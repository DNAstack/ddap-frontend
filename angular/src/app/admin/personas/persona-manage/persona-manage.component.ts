import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { dam } from '../../../shared/proto/dam-service';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityModel } from '../../shared/entity.model';
import { PersonaFormComponent } from '../persona-form/persona-form.component';
import { PersonaService } from '../personas.service';
import TestPersona = dam.v1.TestPersona;

@Component({
  selector: 'ddap-persona-manage',
  templateUrl: './persona-manage.component.html',
  styleUrls: ['./persona-manage.component.scss'],
})
export class PersonaManageComponent implements OnInit {

  @ViewChild(PersonaFormComponent)
  personaForm: PersonaFormComponent;

  persona: TestPersona;
  submitted = false;

  constructor(private personaService: PersonaService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.persona = TestPersona.create({});
  }

  save() {
    this.submitted = false;

    if (!this.personaForm.form.valid) {
      this.submitted = true;
      return;
    }

    const personaModel: EntityModel = this.personaForm.getModel();
    const change = new ConfigModificationObject(personaModel.dto, {});
    this.personaService.save(personaModel.name, change)
      .subscribe(
        () => this.router.navigate(['../..'], {relativeTo: this.route}),
        (err) => this.personaForm.accessForm.validateAccessFields(personaModel.name, err)
      );
  }
}
