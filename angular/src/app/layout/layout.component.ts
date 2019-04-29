import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import _get from 'lodash/get';

import { IdentityService } from '../identity/identity.service';
import { Profile } from '../identity/profile.model';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  profile: Profile = null;
  isAdmin = false;
  realm: string;
  loginPath: string;

  constructor(public loader: LoadingBarService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private identityService: IdentityService) {

  }

  ngOnInit() {
    this.identityService.getIdentity().subscribe((identity: any) => {
      this.profile = identity.profile;
      this.isAdmin = this.identityService.hasAdminAccount(identity.connectedAccounts);
    });

    this.activatedRoute.root.firstChild.params.subscribe((params) => {
      this.realm = params.realmId;
      this.loginPath = `/api/v1alpha/${this.realm}/identity/login`;
    });
  }

  goToIdentity() {
    if (confirm('Please sign in again to manage your account')) {
      const loginUrlSuffix = `login?scope=link+account_admin+ga4gh&redirectUri=/${this.realm}/identity`;
      window.location.href = `/api/v1alpha/${this.realm}/identity/${loginUrlSuffix}`;
    }
  }

  isIdentityPage() {
    const currentRoute = _get(this.activatedRoute, 'snapshot.firstChild.url[0].path');
    return currentRoute === 'identity';
  }

}
