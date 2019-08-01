import TestPersona = dam.v1.TestPersona;
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { dam } from '../../../../shared/proto/dam-service';
import { ConfigModificationObject } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';
import { FormErrorScrollService } from '../../../shared/form-error-scroll.service';
import { DamConfigEntityComponentBase } from '../../shared/dam/dam-config-entity-component.base';
import { PersonaFormComponent } from '../persona-form/persona-form.component';
import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-manage',
  templateUrl: './persona-manage.component.html',
  styleUrls: ['./persona-manage.component.scss'],
  providers: [FormErrorScrollService],
})
export class PersonaManageComponent extends DamConfigEntityComponentBase implements OnInit {

  @ViewChild(PersonaFormComponent, { static: false })
  personaForm: PersonaFormComponent;
  @ViewChild('formErrorElement', { static: false })
  formErrorElement: ElementRef;

  persona: TestPersona;

  constructor(protected route: ActivatedRoute,
              private personaService: PersonaService,
              private router: Router,
              public formError: FormErrorScrollService) {
    super(route);
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
    this.personaService.save(this.damId, personaModel.name, change)
      .subscribe(
        this.navigateUp,
        (err) => {
          this.personaForm.accessForm.validateAccessFields(personaModel.name, err);
          this.showError(err);
        }
      );
  }

  private navigateUp = () => this.router.navigate(['../..'], { relativeTo: this.route });

  private showError = ({ error }: HttpErrorResponse) => {
    const message = (error instanceof Object) ? JSON.stringify(error) : error;
    return this.formError.displayErrorMessage(this.formErrorElement, message);
  }

}
