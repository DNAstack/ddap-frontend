import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

import { RealmService } from './shared/realm.service';

@Component({
  selector: 'ddap-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public loader: LoadingBarService, public realmService: RealmService) {

  }
}
