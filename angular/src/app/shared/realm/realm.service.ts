import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { distinct, filter } from 'rxjs/operators';
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
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.params.realmId)
    ).subscribe((event: ActivationEnd) => this.realm.next(event.snapshot.params.realmId));
  }

  getRealm(): Observable<string> {
    return this.realm.asObservable().pipe(
      distinct()
    );
  }
}
