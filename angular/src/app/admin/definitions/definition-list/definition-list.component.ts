import { Component } from '@angular/core';

import { EntityListBase } from '../../shared/entity-list.base';
import { DefinitionService } from '../definitions.service';

@Component({
  selector: 'ddap-definition-list',
  templateUrl: './definition-list.component.html',
  styleUrls: ['./definition-list.component.scss'],
})
export class DefinitionListComponent extends EntityListBase<DefinitionService> {

  constructor(definitionService: DefinitionService) {
    super(definitionService);
  }

}
