import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { distinct, filter, map, switchMap, take } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';


@Injectable({
  providedIn: 'root',
})
export class RealmService {

  public realmSnapshot: string;

  private realm: Subject<string> = new ReplaySubject(1);

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

  switchMap<T>(cb: (realm: string) => Observable<T>): Observable<T> {
    return this.getRealm()
      .pipe(
        take(1),
        switchMap(cb)
      );
  }
}
