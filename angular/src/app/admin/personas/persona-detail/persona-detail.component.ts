import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityDetailBase } from '../../shared/entity-detail.base';
import { EntityFormDetailBase } from '../../shared/entity-form-detail.base';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { PersonaFormComponent } from '../persona-form/persona-form.component';
import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-detail',
  templateUrl: './persona-detail.component.html',
  styleUrls: ['./persona-detail.component.scss'],
  providers: [FormErrorScrollService],
})
export class PersonaDetailComponent extends EntityFormDetailBase<PersonaService> implements OnInit {

  @ViewChild(PersonaFormComponent)
  personaForm: PersonaFormComponent;
  @ViewChild('formErrorElement')
  formErrorElement: ElementRef;

  constructor(route: ActivatedRoute,
              personaService: PersonaService,
              protected router: Router,
              public formError: FormErrorScrollService) {
    super(route, router, personaService, 'personaName');
  }

  update() {
    if (!this.formError.validate(this.personaForm, this.formErrorElement)) {
      return;
    }

    const personaModel: EntityModel = this.personaForm.getModel();
    const change = new ConfigModificationObject(personaModel.dto, {});
    this.entityService.update(this.entity.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  delete() {
    this.entityService.remove(this.entity.name)
      .subscribe(this.navigateUp, this.showError);
  }

  protected showError = (error: HttpErrorResponse) => {
    if (error.status === 424) {
      const personaModel: EntityModel = this.personaForm.getModel();
      this.personaForm.accessForm.validateAccessFields(personaModel.name, error);
    } else {
      const message = (error.error instanceof Object) ? JSON.stringify(error.error) : error.error;
      return this.formError.displayErrorMessage(this.formErrorElement, message);
    }
  }

}
