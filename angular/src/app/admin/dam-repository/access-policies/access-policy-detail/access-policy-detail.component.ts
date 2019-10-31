import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationService } from 'ddap-common-lib';

import { DamConfigEntityDetailComponentBase } from '../../shared/dam/dam-config-entity-detail-component.base';
import { DamConfigStore } from '../../shared/dam/dam-config.store';
import { AccessPolicyService } from '../access-policies.service';
import { AccessPoliciesStore } from '../access-policies.store';

@Component({
  selector: 'ddap-access-policy-detail',
  templateUrl: './access-policy-detail.component.html',
  styleUrls: ['./access-policy-detail.component.scss'],
})
export class AccessPolicDetailComponent extends DamConfigEntityDetailComponentBase<AccessPoliciesStore> implements OnInit {

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected validationService: FormValidationService,
              protected damConfigStore: DamConfigStore,
              protected accessPoliciesStore: AccessPoliciesStore,
              public accessPolicyService: AccessPolicyService) {
    super(route, router, validationService, damConfigStore, accessPoliciesStore);
  }

}
