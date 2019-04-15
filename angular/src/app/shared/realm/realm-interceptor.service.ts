import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';

import { realmIdPlaceholder } from './realm.constant';
import { RealmState } from './realm.states';

@Injectable({
  providedIn: 'root',
})
export class RealmInterceptor implements HttpInterceptor {

  constructor(private store: Store) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes(realmIdPlaceholder)) {
      return next.handle(req);
    }

    const realmId = this.store.selectSnapshot<string>(({ realm }) => realm.name);
    const secureReq = req.clone({
      url: req.url.replace(realmIdPlaceholder, realmId),
    });

    return next.handle(secureReq);
  }
}
