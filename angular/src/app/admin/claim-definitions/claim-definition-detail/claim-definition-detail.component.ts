import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityDetailBase } from '../../shared/entity-detail.base';
import { ClaimDefinitionService } from '../claim-definitions.service';

@Component({
  selector: 'ddap-claim-definition-detail',
  templateUrl: './claim-definition-detail.component.html',
  styleUrls: ['./claim-definition-detail.component.scss'],
})
export class ClaimDefinitionDetailComponent extends EntityDetailBase<ClaimDefinitionService> {

  constructor(
    route: ActivatedRoute,
    definitionService: ClaimDefinitionService
  ) {
    super(route, definitionService, 'definitionName');
  }
}
