import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AccessPolicyService } from '../access-policies.service';

@Component({
  selector: 'ddap-access-policy-manage',
  templateUrl: './access-policy-manage.component.html',
  styleUrls: ['./access-policy-manage.component.scss'],
})
export class AccessPolicyManageComponent {

  constructor(private accessPolicyService: AccessPolicyService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  add(id, change) {
    this.accessPolicyService.save(id, change)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
