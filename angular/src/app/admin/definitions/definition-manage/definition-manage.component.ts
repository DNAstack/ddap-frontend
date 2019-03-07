import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EntityManageBase } from '../../shared/entity-manage.base';
import { DefinitionService } from '../definitions.service';

@Component({
  selector: 'ddap-definition-manage',
  templateUrl: './definition-manage.component.html',
  styleUrls: ['./definition-manage.component.scss'],
})
export class DefinitionManageComponent extends EntityManageBase<DefinitionService> {

  constructor(definitionService: DefinitionService,
              router: Router,
              route: ActivatedRoute) {
    super(definitionService, router, route);
  }
}
