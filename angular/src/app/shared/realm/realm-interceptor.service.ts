import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _get from 'lodash.get';
import { Observable } from 'rxjs/Observable';

import { realmIdPlaceholder } from './realm.constant';

@Injectable()
export class RealmInterceptor implements HttpInterceptor {

  constructor(private activatedRoute: ActivatedRoute) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const realmId = _get(this.activatedRoute, 'root.firstChild.snapshot.params.realmId');

    const secureReq = req.clone({
      url: req.url.replace(realmIdPlaceholder, realmId),
    });

    return next.handle(secureReq);
  }
}
