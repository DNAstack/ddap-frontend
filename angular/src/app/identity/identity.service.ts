import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

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

  getPersonas(params = {}): Observable<any> {
    return this.http.get<any>(`${environment.damApiUrl}/${realmIdPlaceholder}/testPersonas`, {params})
      .pipe(
        pluck('personas')
      );
  }

  getIdentityProviderLoginLinks(params?): Observable<LoginLink[]> {
    const realmId = this.activatedRoute.root.firstChild.snapshot.params.realmId;
    return this.getIdentityProviders(params).zip(this.getPersonas(params))
      .pipe(
        map(([idps, personas]) => this.convertToLoginLinks(idps, personas, realmId))
      );
  }

  private convertToLoginLinks(idps: object, personas: object, realm: string): LoginLink[] {
    const externalIdpLinks = Object.keys(idps)
      .map((idp) => {
        return {
          text: idp,
          href: `${environment.ddapApiUrl}/${realm}/identity/link?provider=${idp}`,
        };
      });
    const personaLinks = Object.keys(personas)
      .map((persona) => {
        return {
          text: `${persona} (persona)`,
          href: `${environment.ddapApiUrl}/${realm}/identity/link?provider=${persona}&type=persona`,
        };
      });
    return [...externalIdpLinks, ...personaLinks];
  }
}
