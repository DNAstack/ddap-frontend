import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EntityManageBase } from '../../shared/entity-manage.base';
import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-manage',
  templateUrl: './persona-manage.component.html',
  styleUrls: ['./persona-manage.component.scss'],
})
export class PersonaManageComponent extends EntityManageBase<PersonaService> {
  constructor(personaService: PersonaService,
              router: Router,
              route: ActivatedRoute) {
    super(personaService, router, route);
  }
}
