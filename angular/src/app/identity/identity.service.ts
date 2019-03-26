import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, pluck, take } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { realmIdPlaceholder } from '../shared/realm/realm.constant';

import { Identity } from './identity.model';
import { LoginLink } from './login-link.model';
import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute) {
  }

  getIdentity(params = {}): Observable<Identity> {
    return this.http.get<any>(`${environment.idpApiUrl}/${realmIdPlaceholder}/accounts/-`, {params})
      .pipe(
        pluck('account')
      );
  }

  getProfile(params?): Observable<Profile> {
    return this.getIdentity(params)
      .pipe(
        pluck('profile')
      );
  }

  getIdentityProviders(params = {}): Observable<any> {
    return this.http.get<any>(`${environment.idpApiUrl}/${realmIdPlaceholder}/identityProviders`, {params})
      .pipe(
        pluck('identityProviders')
      );
  }

  getIdentityProviderLoginLinks(params?): Observable<LoginLink[]> {
    const realmId = this.activatedRoute.root.firstChild.snapshot.params.realmId;
    return this.getIdentityProviders(params)
      .pipe(
        take(1),
        map(idps => this.convertIdpsToLoginLinks(idps, realmId)
        )
      );
  }

  private convertIdpsToLoginLinks(idps: object, realm: string): LoginLink[] {
    return Object.keys(idps)
      .map(key => {
        return {text: key, href: `${environment.ddapApiUrl}/${realm}/identity/link?provider=${key}`};
      });
  }
}
