import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EntityListBase } from '../../shared/entity-list.base';
import { AccessPolicyService } from '../access-policies.service';

@Component({
  selector: 'ddap-access-policy-list',
  templateUrl: './access-policy-list.component.html',
  styleUrls: ['./access-policy-list.component.scss'],
})
export class AccessPolicyListComponent extends EntityListBase<AccessPolicyService> {

  rules$: Observable<any[]>;

  constructor(ruleService: AccessPolicyService) {
    super(ruleService);
  }

}
