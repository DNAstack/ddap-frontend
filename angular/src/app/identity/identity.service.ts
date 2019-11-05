import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService, realmIdPlaceholder } from 'ddap-common-lib';
import _get from 'lodash.get';
import { Observable } from 'rxjs';
import { flatMap, map, pluck } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { DamInfoService } from '../shared/dam/dam-info.service';

import { AccountLink } from './account-link.model';
import { Account } from './account.model';
import { Identity } from './identity.model';
import { UserAccess } from './user-access.model';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService,
              private activatedRoute: ActivatedRoute,
              private damInfoService: DamInfoService) {
  }

  getIcUserAccess(params = {}): Observable<UserAccess> {
    return this.http.get<UserAccess>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/identity/access`, {params});
  }

  getIdentity(params = {}): Observable<Identity> {
    return this.http.get<any>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/identity`, {params})
      .pipe(
        this.errorHandler.notifyOnError(`Can't load account's information.`)
      );
  }

  getIdentityProviders(params = {}): Observable<any> {
    return this.http.get<any>(`${environment.idpApiUrl}/${realmIdPlaceholder}/identityProviders`, {params})
      .pipe(
        this.errorHandler.notifyOnError(`Can't load identity providers' information.`),
        pluck('identityProviders')
      );
  }

  getPersonas(damId: string, params = {}): Observable<any> {
    return this.damInfoService.getDamUrls()
      .pipe(
        flatMap(damApiUrls => {
          const damApiUrl = damApiUrls.get(damId);
          return this.http.get<any>(`${damApiUrl}/${realmIdPlaceholder}/testPersonas`, {params})
            .pipe(
              this.errorHandler.notifyOnError(`Can't load personas' information.`),
              pluck('personas')
            );
        })
      );
  }

  getAccountLinks(params?): Observable<AccountLink[]> {
    const realmId = this.activatedRoute.root.firstChild.snapshot.params.realmId;
    return this.getIdentityProviders(params)
      .pipe(
        map((idps) => {
          return [
            ...this.getAccountLinksFromProviders(idps, realmId),
          ];
        })
      );
  }

  unlinkConnectedAccount(account: Account) {
    const subjectName = account.properties.subject;
    return this.http.delete<any>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/identity/link/${subjectName}`)
      .subscribe(() => window.location.reload());
  }

  refreshTokens(params?) {
    return this.http.get<any>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/identity/refresh`, {params});
  }

  invalidateTokens(params?) {
    return this.http.get<any>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/identity/logout`, {params});
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
}
