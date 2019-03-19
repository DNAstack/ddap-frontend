import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { realmIdPlaceholder } from '../shared/realm/realm.constant';

import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {

  constructor(private http: HttpClient) {
  }

  get(params = {}): Observable<any> {
    return this.http.get<any>(`${environment.idpApiUrl}/${realmIdPlaceholder}/accounts/-`, {params})
      .pipe(
        pluck('account')
      );
  }

  getProfile(params?): Observable<Profile> {
    return this.get(params)
      .pipe(
        pluck('profile', 'attributes')
      );
  }
}
