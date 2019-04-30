import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { concat } from 'rxjs/internal/observable/concat';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { debounceTime, distinct, map, startWith, switchMap, tap } from 'rxjs/operators';

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
import { PassportIssuerService } from '../passport-issuers/passport-issuerss.service';
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

  buildClaimDefinitionAutocomplete(formGroup: FormGroup): Observable<string[]> {
    const claimDefinitions$ = this.claimDefinitionService.getList(pick('name')).pipe(
      map(makeDistinct)
    );

    return filterSource(claimDefinitions$, formGroup.get('claimName').valueChanges);
  }

  buildIssuerAutocomplete(formGroup: FormGroup): Observable<string[]> {
    const passportIssuers$ = this.passportIssuerService.getList(pick('dto.issuer')).pipe(
      map(makeDistinct)
    );

    return filterSource(passportIssuers$, formGroup.get('iss').valueChanges);
  }

  buildTrustedSourcesAutocomplete(formGroup: FormGroup): Observable<string[]> {
    const trustedSources$ = this.trustedSourcesService.getList(pick('dto.sources')).pipe(
      map(flatten),
      map(makeDistinct)
    );

    return filterSource(trustedSources$, formGroup.get('source').valueChanges);
  }

  buildValuesAutocomplete(formGroup: FormGroup): Observable<string[]> {
    const value$ = formGroup.get('value').valueChanges.pipe(
      startWith(formGroup.get('value').value)
    );
    const claimName$ = formGroup.get('claimName').valueChanges.pipe(
      startWith(formGroup.get('claimName').value)
    );

    return combineLatest(value$, claimName$).pipe(
      switchMap(([value, claimName]) => {
        return this.getClaimDefinitionSuggestions(claimName).pipe(
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
