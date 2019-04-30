import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { filterSource, flatten, makeDistinct, pick } from '../../shared/autocomplete/autocomplete.util';
import { ClaimDefinitionService } from '../claim-definitions/claim-definitions.service';
import { PassportIssuerService } from '../passport-issuers/passport-issuerss.service';
import { TrustedSourcesService } from '../trusted-sources/trusted-sources.service';

@Injectable({
  providedIn: 'root',
})
export class PersonaAutocompleteService {

  constructor(private claimDefinitionService: ClaimDefinitionService,
              private passportIssuerService: PassportIssuerService,
              private trustedSourcesService: TrustedSourcesService) {

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
}
