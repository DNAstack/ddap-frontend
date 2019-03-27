import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { realmIdPlaceholder } from './realm/realm.constant';

@Injectable({
  providedIn: 'root',
})
export class ResourceViewService {

  constructor(private http: HttpClient) {

  }

  getAccessRequestToken(resource, view): any {
    const viewUrl = `${environment.damApiUrl}/${realmIdPlaceholder}/resources/${resource}/views/${view}/token`;
    return this.http.get<any>(viewUrl)
      .pipe(
        map(({account, token}) => ({account, token}))
      );
  }
}
