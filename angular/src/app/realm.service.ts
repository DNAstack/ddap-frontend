import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { distinct, filter, map } from 'rxjs/operators';

import { DEFAULT_REALM } from './realm.constant';


@Injectable({
  providedIn: 'root',
})
export class RealmService {

  private realm: BehaviorSubject<string> = new BehaviorSubject(DEFAULT_REALM);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      map((event: ActivationEnd) => {
        return event.snapshot.params.realmId;
      })
    ).subscribe((realmId) => {
        this.realm.next(realmId);
      }
    );
  }

  getRealm(): Observable<string> {
    return this.realm.asObservable().pipe(
      distinct()
    );
  }
}
