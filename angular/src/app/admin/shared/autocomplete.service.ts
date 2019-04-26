import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {

  constructor(protected http: HttpClient) {
  }

  public getClaimDefinitionSuggestions(claimName: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.ddapApiUrl}/${realmIdPlaceholder}/autocomplete/claimValue?claimName=${claimName}`, {}
      );
  }
}
