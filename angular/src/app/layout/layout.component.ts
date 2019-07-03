import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Observable } from 'rxjs/Observable';
import { repeatWhen } from 'rxjs/operators';

import { Identity } from '../identity/identity.model';
import { IdentityService } from '../identity/identity.service';
import { IdentityStore } from '../identity/identity.store';
import { Profile } from '../identity/profile.model';

const refreshRepeatTimeoutInMs = 3600000;

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
              private identityService: IdentityService,
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

    // Workaround to get fresh cookies
    this.periodicallyRefreshTokens()
      .subscribe();
  }

  logout() {
    this.identityService.invalidateTokens()
      .subscribe(() => {
        window.location.href = `${this.loginPath}`;
      });
  }

  private periodicallyRefreshTokens(): Observable<any> {
    return this.identityService.refreshTokens()
      .pipe(
        repeatWhen(() => Observable.interval(refreshRepeatTimeoutInMs))
      );
  }

}
