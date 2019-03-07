import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityDetailBase } from '../../shared/entity-detail.base';
import { DefinitionService } from '../definitions.service';

@Component({
  selector: 'ddap-definition-detail',
  templateUrl: './definition-detail.component.html',
  styleUrls: ['./definition-detail.component.scss'],
})
export class DefinitionDetailComponent extends EntityDetailBase<DefinitionService> {

  constructor(
    route: ActivatedRoute,
    definitionService: DefinitionService
  ) {
    super(route, definitionService, 'definitionName');
  }
}
