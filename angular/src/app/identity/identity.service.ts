import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _get from 'lodash.get';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { realmIdPlaceholder } from '../shared/realm/realm.constant';

import { AccountLink } from './account-link.model';
import { Identity } from './identity.model';
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

  getPersonas(params = {}): Observable<any> {
    return this.http.get<any>(`${environment.damApiUrl}/${realmIdPlaceholder}/testPersonas`, {params})
      .pipe(
        pluck('personas')
      );
  }

  getAccountLinks(params?): Observable<AccountLink[]> {
    const realmId = this.activatedRoute.root.firstChild.snapshot.params.realmId;
    return this.getIdentityProviders(params).zip(this.getPersonas(params))
      .pipe(
        map(([idps, personas]) => {
          return [
            ...this.getAccountLinksFromProviders(idps, realmId),
            ...this.getAccountLinksFromPersonas(personas, realmId),
          ];
        })
      );
  }

  private getAccountLinksFromProviders(idps: object, realm: string): AccountLink[] {
    return Object.entries(idps)
      .map(([idpKey, idpValue]) => {
        return {
          provider: idpKey,
          label: _get(idpValue, 'ui.label', idpKey),
          linkUrl: `${environment.ddapApiUrl}/${realm}/identity/link?provider=${idpKey}`,
        };
      });
  }

  private getAccountLinksFromPersonas(personas: object, realm: string): AccountLink[] {
    return Object.entries(personas)
      .map(([personaKey, personaValue]) => {
        return {
          provider: '<persona>',
          profile: {
            username: personaKey,
          },
          label: _get(personaValue, 'ui.label', personaKey),
          linkUrl: `${environment.ddapApiUrl}/${realm}/identity/link?provider=${personaKey}&type=persona`,
        };
      });
  }

}
