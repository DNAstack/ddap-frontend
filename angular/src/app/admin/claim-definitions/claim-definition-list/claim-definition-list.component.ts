import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PersonasStore } from '../../personas/personas.store';
import { DamEntityListBase } from '../../shared/dam-entity-list.base';
import { DamConfigEntityListComponentBase } from '../../shared/dam/dam-config-entity-list-component.base';
import { DamConfigStore } from '../../shared/dam/dam-config.store';
import { ClaimDefinitionService } from '../claim-definitions.service';
import { ClaimDefinitionsStore } from '../claim-definitions.store';

@Component({
  selector: 'ddap-claim-definition-list',
  templateUrl: './claim-definition-list.component.html',
  styleUrls: ['./claim-definition-list.component.scss'],
})
export class ClaimDefinitionListComponent extends DamConfigEntityListComponentBase<ClaimDefinitionsStore> implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected damConfigStore: DamConfigStore,
              protected claimDefinitionsStore: ClaimDefinitionsStore) {
    super(route, damConfigStore, claimDefinitionsStore);
  }

}
