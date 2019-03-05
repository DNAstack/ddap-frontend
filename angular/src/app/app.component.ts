import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { RealmService } from './realm.service';

@Component({
  selector: 'ddap-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  realm: string;

  constructor(public loader: LoadingBarService,
              private realmService: RealmService) {

  }

  ngOnInit() {
    this.realmService.getRealm().subscribe(realm => {
      this.realm = realm;
    });
  }
}
