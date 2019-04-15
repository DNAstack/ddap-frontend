import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngxs/store';

import { ChangeRealm } from './realm.actions';

@Injectable({
  providedIn: 'root',
})
export class RealmResolver implements Resolve<any> {

  constructor(private store: Store) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    this.store.dispatch(new ChangeRealm(route.params.realmId));
  }
}
