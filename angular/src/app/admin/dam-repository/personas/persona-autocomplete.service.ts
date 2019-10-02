import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest'; // FIXME using internal, deprecated
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import {
  filterBy,
  filterSource,
  flatten,
  includes,
  makeDistinct,
  pick
} from '../../../shared/autocomplete/autocomplete.util';
import { realmIdPlaceholder } from '../../../shared/realm/realm.constant';
import { ClaimDefinitionsStore } from '../claim-definitions/claim-definitions.store';
import { PassportIssuersStore } from '../passport-issuers/passport-issuers.store';
import { TrustedSourcesStore } from '../trusted-sources/trusted-sources.store';

@Injectable({
  providedIn: 'root',
})
export class PersonaAutocompleteService {

  constructor(private claimDefinitionsStore: ClaimDefinitionsStore,
              private passportIssuersStore: PassportIssuersStore,
              private trustedSourcesStore: TrustedSourcesStore,
              private http: HttpClient) {

  }

  buildClaimDefinitionAutocomplete(damId: string, formGroup: FormGroup): Observable<string[]> {
    const claimDefinitions$ = this.claimDefinitionsStore.getAsList(damId, pick('name')).pipe(
      map(makeDistinct)
    );

    return filterSource(claimDefinitions$, formGroup.get('claimName').valueChanges);
  }

  buildIssuerAutocomplete(damId: string, formGroup: FormGroup, issuerFieldName = 'iss'): Observable<string[]> {
    const passportIssuers$ = this.passportIssuersStore.getAsList(damId, pick('dto.issuer')).pipe(
      map(makeDistinct)
    );

    return filterSource(passportIssuers$, formGroup.get(issuerFieldName).valueChanges);
  }

  buildTrustedSourcesAutocomplete(damId: string, formGroup: FormGroup): Observable<string[]> {
    const trustedSources$ = this.trustedSourcesStore.getAsList(damId, pick('dto.sources')).pipe(
      map(flatten),
      map(makeDistinct)
    );

    return filterSource(trustedSources$, formGroup.get('source').valueChanges);
  }

  buildValuesAutocomplete(damId: string, formGroup: FormGroup): Observable<string[]> {
    const claimName$ = formGroup.get('claimName').valueChanges.pipe(
      startWith('')
    );

    const value$ = formGroup.get('value').valueChanges.pipe(
      startWith('')
    );

    return combineLatest(claimName$, value$).pipe(
      debounceTime(300),
      switchMap(([claimName, value]) => {
        const currentClaimName = formGroup.get('claimName').value;
        return this.getClaimDefinitionSuggestions(damId, claimName || currentClaimName).pipe(
          map(filterBy(includes(value)))
        );
      })
    );
  }

  private getClaimDefinitionSuggestions(damId: string, claimName: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.ddapApiUrl}/${realmIdPlaceholder}/autocomplete/claimValue/${damId}?claimName=${claimName}`, {}
    );
  }
}
