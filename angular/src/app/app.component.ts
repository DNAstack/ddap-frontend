import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { IdentityService } from './identity/identity.service';
import { Profile } from './identity/profile.model';
import { RealmService } from './realm.service';

@Component({
  selector: 'ddap-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  realm: string;
  profile: Profile = null;

  constructor(public loader: LoadingBarService,
              private realmService: RealmService,
              private router: Router,
              private identityService: IdentityService) {

  }

  ngOnInit() {
    this.realmService.getRealm().subscribe(realm => {
      this.realm = realm;
    });

    this.identityService.getProfile().subscribe(profile => {
      this.profile = profile;
    });
  }

  goToRealm(realm) {
    this.router.navigate([realm]);
  }
}
