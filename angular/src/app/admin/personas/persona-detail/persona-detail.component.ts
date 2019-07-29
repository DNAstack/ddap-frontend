import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { DamConfigEntityDetailComponentBase } from '../../shared/dam/dam-config-entity-detail-component.base';
import { DamConfigStore } from '../../shared/dam/dam-config.store';
import { EntityModel } from '../../shared/entity.model';
import { FormErrorScrollService } from '../../shared/form-error-scroll.service';
import { PersonaFormComponent } from '../persona-form/persona-form.component';
import { PersonaService } from '../personas.service';
import { PersonasStore } from '../personas.store';

@Component({
  selector: 'ddap-persona-detail',
  templateUrl: './persona-detail.component.html',
  styleUrls: ['./persona-detail.component.scss'],
  providers: [FormErrorScrollService],
})
export class PersonaDetailComponent extends DamConfigEntityDetailComponentBase<PersonasStore> implements OnInit {

  @ViewChild(PersonaFormComponent, { static: false })
  personaForm: PersonaFormComponent;
  @ViewChild('formErrorElement', { static: false })
  formErrorElement: ElementRef;

  constructor(protected route: ActivatedRoute,
              protected damConfigStore: DamConfigStore,
              protected personasStore: PersonasStore,
              private personaService: PersonaService,
              private router: Router,
              public formError: FormErrorScrollService) {
    super(route, damConfigStore, personasStore);
  }

  update() {
    if (!this.formError.validate(this.personaForm, this.formErrorElement)) {
      return;
    }

    const personaModel: EntityModel = this.personaForm.getModel();
    const change = new ConfigModificationObject(personaModel.dto, {});
    this.personaService.update(this.damId, this.entity.name, change)
      .subscribe(this.navigateUp, this.showError);
  }

  delete() {
    this.personaService.remove(this.damId, this.entity.name)
      .subscribe(this.navigateUp, this.showError);
  }

  protected navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });

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
