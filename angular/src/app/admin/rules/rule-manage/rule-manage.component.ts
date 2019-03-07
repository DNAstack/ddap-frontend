import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EntityManageBase } from '../../shared/entity-manage.base';
import { RuleService } from '../rules.service';

@Component({
  selector: 'ddap-rule-manage',
  templateUrl: './rule-manage.component.html',
  styleUrls: ['./rule-manage.component.scss'],
})
export class RuleManageComponent extends EntityManageBase<RuleService> {

  constructor(ruleService: RuleService,
              router: Router,
              route: ActivatedRoute) {
    super(ruleService, router, route);
  }
}
