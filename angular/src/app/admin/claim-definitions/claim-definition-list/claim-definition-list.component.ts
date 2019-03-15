import { Component } from '@angular/core';

import { EntityListBase } from '../../shared/entity-list.base';
import { ClaimDefinitionService } from '../claim-definitions.service';

@Component({
  selector: 'ddap-claim-definition-list',
  templateUrl: './claim-definition-list.component.html',
  styleUrls: ['./claim-definition-list.component.scss'],
})
export class ClaimDefinitionListComponent extends EntityListBase<ClaimDefinitionService> {

  constructor(definitionService: ClaimDefinitionService) {
    super(definitionService);
  }

}
