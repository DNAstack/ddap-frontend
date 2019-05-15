import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import TestPersona = dam.v1.TestPersona;
import { FormValidationService } from '../../../shared/form-validation.service';
import { dam } from '../../../shared/proto/dam-service';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityModel } from '../../shared/entity.model';
import { PersonaFormComponent } from '../persona-form/persona-form.component';
import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-manage',
  templateUrl: './persona-manage.component.html',
  styleUrls: ['./persona-manage.component.scss'],
})
export class PersonaManageComponent implements OnInit {

  @ViewChild(PersonaFormComponent)
  personaForm: PersonaFormComponent;

  @ViewChild('formError')
  formError: ElementRef;

  persona: TestPersona;
  submitted = false;

  constructor(private personaService: PersonaService,
              private router: Router,
              private route: ActivatedRoute,
              private formValidation: FormValidationService) {

  }

  ngOnInit(): void {
    this.persona = TestPersona.create({});
  }

  save() {
    this.submitted = false;

    if (!this.personaForm.form.valid) {
      this.formValidation.forceValidate(this.personaForm.form);
      this.submitted = true;
      setTimeout(() => {
        this.formError.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 0);

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
