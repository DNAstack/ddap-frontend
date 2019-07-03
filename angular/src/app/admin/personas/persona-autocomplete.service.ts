import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import {
  filterBy,
  filterSource,
  flatten,
  includes,
  makeDistinct,
  pick
} from '../../shared/autocomplete/autocomplete.util';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';
import { ClaimDefinitionService } from '../claim-definitions/claim-definitions.service';
import { PassportIssuerService } from '../passport-issuers/passport-issuers.service';
import { TrustedSourcesService } from '../trusted-sources/trusted-sources.service';

@Injectable({
  providedIn: 'root',
})
export class PersonaAutocompleteService {

  constructor(private claimDefinitionService: ClaimDefinitionService,
              private passportIssuerService: PassportIssuerService,
              private trustedSourcesService: TrustedSourcesService,
              private http: HttpClient) {

  }

  buildClaimDefinitionAutocomplete(damId: string, formGroup: FormGroup): Observable<string[]> {
    const claimDefinitions$ = this.claimDefinitionService.getList(damId, pick('name')).pipe(
      map(makeDistinct)
    );

    return filterSource(claimDefinitions$, formGroup.get('claimName').valueChanges);
  }

  buildIssuerAutocomplete(damId: string, formGroup: FormGroup, issuerFieldName = 'iss'): Observable<string[]> {
    const passportIssuers$ = this.passportIssuerService.getList(damId, pick('dto.issuer')).pipe(
      map(makeDistinct)
    );

    return filterSource(passportIssuers$, formGroup.get(issuerFieldName).valueChanges);
  }

  buildTrustedSourcesAutocomplete(formGroup: FormGroup): Observable<string[]> {
    const trustedSources$ = this.trustedSourcesService.getList(pick('dto.sources')).pipe(
      map(flatten),
      map(makeDistinct)
    );

    return filterSource(trustedSources$, formGroup.get('source').valueChanges);
  }

  buildValuesAutocomplete(formGroup: FormGroup): Observable<string[]> {
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
        return this.getClaimDefinitionSuggestions(claimName || currentClaimName).pipe(
          map(filterBy(includes(value)))
        );
      })
    );
  }

  private getClaimDefinitionSuggestions(claimName): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.ddapApiUrl}/${realmIdPlaceholder}/autocomplete/claimValue?claimName=${claimName}`, {}
    );
  }
}
