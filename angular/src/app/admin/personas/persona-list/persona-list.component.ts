import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DamConfigEntityListComponentBase } from '../../shared/dam/dam-config-entity-list-component.base';
import { DamConfigStore } from '../../shared/dam/dam-config.store';
import { PersonasStore } from '../personas.store';

@Component({
  selector: 'ddap-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.scss'],
})
export class PersonaListComponent extends DamConfigEntityListComponentBase<PersonasStore> implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected damConfigStore: DamConfigStore,
              protected personasStore: PersonasStore) {
    super(route, damConfigStore, personasStore);
  }

}
