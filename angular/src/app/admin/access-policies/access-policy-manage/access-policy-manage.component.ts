import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DamConfigEntityComponentBase } from '../../shared/dam/dam-config-entity-component.base';
import { AccessPolicyService } from '../access-policies.service';

@Component({
  selector: 'ddap-access-policy-manage',
  templateUrl: './access-policy-manage.component.html',
  styleUrls: ['./access-policy-manage.component.scss'],
})
export class AccessPolicyManageComponent extends DamConfigEntityComponentBase {

  constructor(private accessPolicyService: AccessPolicyService,
              private router: Router,
              protected route: ActivatedRoute) {
    super(route);
  }

  save(entityId, change) {
    this.accessPolicyService.save(this.damId, entityId, change)
      .subscribe(this.navigateUp);
  }

  private navigateUp = () => this.router.navigate(['../..'], { relativeTo: this.route });

}
