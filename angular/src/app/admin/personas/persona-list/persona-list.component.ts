import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DamConfigEntityListComponentBase } from '../../shared/dam/dam-config-entity-list-component.base';
import { DamConfigEntityType } from '../../shared/dam/dam-config-entity-type.enum';
import { DamConfigStore } from '../../shared/dam/dam-config.store';

@Component({
  selector: 'ddap-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.scss'],
})
export class PersonaListComponent extends DamConfigEntityListComponentBase implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected damConfigStore: DamConfigStore) {
    super(DamConfigEntityType.personas, route, damConfigStore);
  }

}
