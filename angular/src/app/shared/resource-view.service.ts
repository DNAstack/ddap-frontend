import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { realmIdPlaceholder } from './realm/realm.constant';
import { ResourceViewAccess } from './resource-view-access.model';

@Injectable({
  providedIn: 'root',
})
export class ResourceViewService {

  constructor(private http: HttpClient) {

  }

  getAccessRequestToken(resource: string, view: string, ttl: string = ''): Observable<ResourceViewAccess> {
    const viewUrl = `${environment.damApiUrl}/${realmIdPlaceholder}/resources/${resource}/views/${view}/token?ttl=${ttl}`;
    return this.http.get<any>(viewUrl)
      .pipe(
        map(({ account, token }) => {
          return {
            account,
            token,
          };
        })
      );
  }
}
