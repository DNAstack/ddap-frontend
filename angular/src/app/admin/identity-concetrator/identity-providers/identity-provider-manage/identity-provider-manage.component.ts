import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IdentityProviderService } from '../identity-providers.service';

@Component({
  selector: 'ddap-identity-provider-manage',
  templateUrl: './identity-provider-manage.component.html',
  styleUrls: ['./identity-provider-manage.component.scss'],
})
export class IdentityProviderManageComponent {

  constructor(private identityProviderService: IdentityProviderService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  save(id, change) {
    this.identityProviderService.save(id, change)
      .subscribe(() => this.router.navigate(['../..'], { relativeTo: this.route }));
  }
}
