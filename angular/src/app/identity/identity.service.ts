import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { RealmService } from '../realm.service';

import { Identity } from './identity.model';
import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {

  constructor(private http: HttpClient,
              private realmService: RealmService) {
  }

  getIdentity(params = {}): Observable<Identity> {
    return this.realmService.switchMap<any>(
      realm => this.http.get<any>(`${environment.idpApiUrl}/${realm}/accounts/-`, {params})
        .pipe(
          pluck('account')
        )
    );
  }

  getProfile(params?): Observable<Profile> {
    return this.getIdentity(params)
      .pipe(
        pluck('profile')
      );
  }
}
