import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { dam } from '../../../shared/proto/dam-service';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { PersonaFormComponent } from '../persona-form/persona-form.component';
import { PersonaService } from '../personas.service';
import TestPersona = dam.v1.TestPersona;

@Component({
  selector: 'ddap-persona-manage',
  templateUrl: './persona-manage.component.html',
  styleUrls: ['./persona-manage.component.scss'],
  providers: [FormErrorScrollService],
})
export class PersonaManageComponent implements OnInit {

  @ViewChild(PersonaFormComponent)
  personaForm: PersonaFormComponent;

  @ViewChild('formErrorElement')
  formErrorElement: ElementRef;

  persona: TestPersona;

  constructor(private personaService: PersonaService,
              private router: Router,
              private route: ActivatedRoute,
              public formError: FormErrorScrollService) {

  }

  ngOnInit(): void {
    this.persona = TestPersona.create({});
  }

  save() {
    if (!this.formError.validate(this.personaForm, this.formErrorElement)) {
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
