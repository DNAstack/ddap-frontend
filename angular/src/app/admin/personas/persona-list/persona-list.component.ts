import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DamEntityListBase } from '../../shared/dam-entity-list.base';
import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.scss'],
})
export class PersonaListComponent extends DamEntityListBase<PersonaService> implements OnInit {

  constructor(protected personaService: PersonaService, protected route: ActivatedRoute) {
    super(personaService, route);
  }

}
