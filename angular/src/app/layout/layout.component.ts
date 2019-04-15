import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Select } from '@ngxs/store';
import _get from 'lodash/get';
import { Observable } from 'rxjs/index';

import { IdentityService } from '../identity/identity.service';
import { Profile } from '../identity/profile.model';
import { RealmState } from '../shared/realm/realm.states';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  @Select(RealmState) realm$: Observable<string>;

  profile: Profile = null;

  constructor(public loader: LoadingBarService,
              private activatedRoute: ActivatedRoute,
              private identityService: IdentityService) {

  }

  ngOnInit() {
    this.identityService.getProfile().subscribe(profile => {
      this.profile = profile;
    });
  }

  goToIdentity() {
    if (confirm('Please sign in again to manage your account')) {
      this.realm$.subscribe(({ name }) => {
        const loginUrlSuffix = `login?scope=link+account_admin+ga4gh&redirectUri=/${name}/identity`;
        window.location.href = `/api/v1alpha/${name}/identity/${loginUrlSuffix}`;
      });
    }
  }

  isIdentityPage() {
    const currentRoute = _get(this.activatedRoute, 'snapshot.firstChild.url[0].path');
    return currentRoute === 'identity';
  }
}
