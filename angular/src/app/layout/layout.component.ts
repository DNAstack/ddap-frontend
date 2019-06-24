import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { Identity } from '../identity/identity.model';
import { IdentityStore } from '../identity/identity.store';
import { Profile } from '../identity/profile.model';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  isSandbox = false;
  profile: Profile = null;
  isIcAdmin = false;
  isDamAdmin = false;
  realm: string;
  loginPath: string;

  constructor(public loader: LoadingBarService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private identityStore: IdentityStore) {

  }

  ngOnInit() {
    this.identityStore.getIdentity().subscribe(({ account, accesses, sandbox }: Identity) => {
      this.isSandbox = sandbox;
      this.profile = account.profile;

      const getAccess = (target: string) => accesses.find((access) => access.target === target);
      this.isDamAdmin = getAccess('DAM').isAdmin;
      this.isIcAdmin = getAccess('IC').isAdmin;
    });

    this.activatedRoute.root.firstChild.params.subscribe((params) => {
      this.realm = params.realmId;
      this.loginPath = `/api/v1alpha/${this.realm}/identity/login`;
    });
  }

}
