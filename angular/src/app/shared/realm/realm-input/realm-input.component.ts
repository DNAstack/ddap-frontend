import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';

import { ChangeRealm } from '../realm.actions';
import { RealmState } from '../realm.states';

@Component({
  selector: 'ddap-realm-input',
  templateUrl: './realm-input.component.html',
  styleUrls: ['./realm-input.component.scss'],
})
export class RealmInputComponent {

  @Select(RealmState) realm$: Observable<string>;

  constructor(private store: Store,
              private router: Router) {

  }

  changeRealm(realm) {
    this.store.dispatch(new ChangeRealm(realm))
      .subscribe(() => this.router.navigate([realm]));
  }

}
