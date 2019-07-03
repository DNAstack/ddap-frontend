import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DamEntityListBase } from '../../shared/dam-entity-list.base';
import { AccessPolicyService } from '../access-policies.service';

@Component({
  selector: 'ddap-access-policy-list',
  templateUrl: './access-policy-list.component.html',
  styleUrls: ['./access-policy-list.component.scss'],
})
export class AccessPolicyListComponent extends DamEntityListBase<AccessPolicyService> {

  rules$: Observable<any[]>;

  constructor(ruleService: AccessPolicyService, route: ActivatedRoute) {
    super(ruleService, route);
  }

}
