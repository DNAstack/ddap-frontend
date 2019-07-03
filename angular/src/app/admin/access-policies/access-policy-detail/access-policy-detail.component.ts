import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DamEntityDetailBase } from '../../shared/dam-entity-detail.base';
import { AccessPolicyService } from '../access-policies.service';

@Component({
  selector: 'ddap-access-policy-detail',
  templateUrl: './access-policy-detail.component.html',
  styleUrls: ['./access-policy-detail.component.scss'],
})
export class AccessPolicDetailComponent extends DamEntityDetailBase<AccessPolicyService> {

  constructor(
    route: ActivatedRoute,
    ruleService: AccessPolicyService
  ) {
    super(route, ruleService, 'ruleName');
  }

}
