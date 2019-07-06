import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DamEntityListBase } from '../../shared/dam-entity-list.base';
import { ClaimDefinitionService } from '../claim-definitions.service';

@Component({
  selector: 'ddap-claim-definition-list',
  templateUrl: './claim-definition-list.component.html',
  styleUrls: ['./claim-definition-list.component.scss'],
})
export class ClaimDefinitionListComponent extends DamEntityListBase<ClaimDefinitionService> {

  constructor(protected definitionService: ClaimDefinitionService, protected route: ActivatedRoute) {
    super(definitionService, route);
  }

}
