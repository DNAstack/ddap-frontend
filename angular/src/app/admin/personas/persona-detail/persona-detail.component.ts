import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityDetailBase } from '../../shared/entity-detail.base';
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
export class PersonaDetailComponent extends EntityDetailBase<PersonaService> implements OnInit {

  @ViewChild(PersonaFormComponent)
  personaForm: PersonaFormComponent;

  @ViewChild('formErrorElement')
  formErrorElement: ElementRef;

  constructor(route: ActivatedRoute,
              personaService: PersonaService,
              private router: Router,
              public formError: FormErrorScrollService) {
    super(route, personaService, 'personaName');
  }

  update() {
    if (!this.formError.validate(this.personaForm, this.formErrorElement)) {
      return;
    }

    const personaModel: EntityModel = this.personaForm.getModel();
    const change = new ConfigModificationObject(personaModel.dto, {});
    this.entityService.update(this.entity.name, change)
      .subscribe(this.navigateUp, (err) => this.personaForm.accessForm.validateAccessFields(personaModel.name, err));
  }

  delete() {
    this.entityService.remove(this.entity.name)
      .subscribe(this.navigateUp);
  }

  private navigateUp = () => this.router.navigate(['..'], { relativeTo: this.route });


}
