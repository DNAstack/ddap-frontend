import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityDetailBase } from '../../shared/entity-detail.base';
import { PersonaService } from '../personas.service';

@Component({
  selector: 'ddap-persona-detail',
  templateUrl: './persona-detail.component.html',
  styleUrls: ['./persona-detail.component.scss'],
})
export class PersonaDetailComponent extends EntityDetailBase<PersonaService> implements OnInit {
  constructor(route: ActivatedRoute, personaService: PersonaService) {
    super(route, personaService, 'personaName');
  }
}
