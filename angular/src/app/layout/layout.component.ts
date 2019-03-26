import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { IdentityService } from '../identity/identity.service';
import { Profile } from '../identity/profile.model';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  profile: Profile = null;
  public realm: string;

  constructor(public loader: LoadingBarService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private identityService: IdentityService) {

  }

  ngOnInit() {
    this.identityService.getProfile().subscribe(profile => {
      this.profile = profile;
    });

    this.activatedRoute.root.firstChild.params.subscribe((params) => {
      this.realm = params.realmId;
    });
  }

  goToRealm(realm) {
    this.router.navigate([realm]);
  }
}
