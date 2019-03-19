import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { realmIdPlaceholder } from './realm.constant';
import { RealmService } from './realm.service';

@Injectable()
export class RealmInterceptor implements HttpInterceptor {

  constructor(private realmService: RealmService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const realmId = this.realmService.realmSnapshot;
    const secureReq = req.clone({
      url: req.url.replace(realmIdPlaceholder, realmId),
    });

    return next.handle(secureReq);
  }
}
