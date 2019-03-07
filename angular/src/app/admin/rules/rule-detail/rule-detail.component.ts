import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityDetailBase } from '../../shared/entity-detail.base';
import { RuleService } from '../rules.service';

@Component({
  selector: 'ddap-rule-detail',
  templateUrl: './rule-detail.component.html',
  styleUrls: ['./rule-detail.component.scss'],
})
export class RuleDetailComponent extends EntityDetailBase<RuleService> {

  constructor(
    route: ActivatedRoute,
    ruleService: RuleService
  ) {
    super(route, ruleService, 'ruleName');
  }

}
