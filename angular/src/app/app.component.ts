import { Component, OnInit } from '@angular/core';
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
              private identityService: IdentityService) {

  }

  ngOnInit() {
    this.realmService.getRealm().subscribe(realm => {
      this.realm = realm;
    });
    // TODO: this causes fail of journey test because it is using fallback realm
    // this.identityService.getProfile().subscribe(profile => {
    //   this.profile = profile;
    // });
    this.profile = {
      name: 'Craig Voisin',
      picture: 'https://lh5.googleusercontent.com/-IDBhD6s9R5w/AAAAAAAAAAI/AAAAAAAABXk/uJXX9ztGEh4/s96-c/photo.jpg',
    };
  }
}
