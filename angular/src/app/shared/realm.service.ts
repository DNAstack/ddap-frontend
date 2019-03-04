import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RealmService {

  constructor(private router: Router) {
  }

  public getActiveRealm(): Observable<string> {
    const route = this.findLastDescendant();

    return route.paramMap.pipe(
      map(params => params.get('realm'))
    );
  }

  public underRealm(path: string): Observable<string> {
    return this.map(realm => '/' + realm + path);
  }

  public map<T>(f: (realm: string) => T): Observable<T> {
    return this.getActiveRealm().pipe(map(f));
  }

  public flatMap<T>(f: (realm: string) => Observable<T>): Observable<T> {
    return this.getActiveRealm().pipe(flatMap(f));
  }

  private findLastDescendant() {
    let route = this.router.routerState.root;
    while (route.firstChild != null) {
      route = route.firstChild;
    }
    return route;
  }
}
