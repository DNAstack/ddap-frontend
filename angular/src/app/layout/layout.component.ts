import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { IdentityService } from '../identity/identity.service';
import { Profile } from '../identity/profile.model';
import { RealmService } from '../shared/realm/realm.service';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  profile: Profile = null;
  realm: string;

  constructor(public loader: LoadingBarService,
              private router: Router,
              private realmService: RealmService,
              private identityService: IdentityService) {

  }

  ngOnInit() {
    this.identityService.getProfile().subscribe(profile => {
      this.profile = profile;
    });

    this.realmService.getRealm().subscribe(realm => {
      this.realm = realm;
    });
  }

  goToRealm(realm) {
    this.router.navigate([realm]);
  }
}
