import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DamConfigEntityListComponentBase } from '../../shared/dam/dam-config-entity-list-component.base';
import { DamConfigStore } from '../../shared/dam/dam-config.store';
import { AccessPoliciesStore } from '../access-policies.store';

@Component({
  selector: 'ddap-access-policy-list',
  templateUrl: './access-policy-list.component.html',
  styleUrls: ['./access-policy-list.component.scss'],
})
export class AccessPolicyListComponent extends DamConfigEntityListComponentBase<AccessPoliciesStore> implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected damConfigStore: DamConfigStore,
              protected accessPoliciesStore: AccessPoliciesStore) {
    super(route, damConfigStore, accessPoliciesStore);
  }

}
