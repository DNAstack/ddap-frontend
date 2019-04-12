import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';

import { environment } from '../../../environments/environment';
import { DnaChangeQueryParser } from '../dna-change-query.parser';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { realmIdPlaceholder } from '../realm/realm.constant';

import { BeaconResponse } from './beacon-response.model';

@Injectable({
  providedIn: 'root',
})
export class ResourceBeaconService {

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService) {
  }

  query(queryValue: any, resource): Observable<BeaconResponse[]> {
    const {query, assembly} = queryValue;

    if (!DnaChangeQueryParser.validate(query)) {
      return Observable.of([]);
    }

    const params = DnaChangeQueryParser.parseParams(query);
    params.type = 'beacon';
    params.assemblyId = assembly;

    if (resource) {
      return this.queryBeacon(resource, params);
    }

    return this.queryAll(params);
  }

  private queryBeacon(resourceId, params?): Observable<BeaconResponse[]> {
    return this.http.get<BeaconResponse[]>(
      `${environment.ddapApiUrl}/${realmIdPlaceholder}/resources/${resourceId}/search`,
      {params}
    ).pipe(
      this.errorHandler.handleError()
    );
  }

  private queryAll(params = {}): Observable<BeaconResponse[]> {
    return this.http.get<BeaconResponse[]>(
      `${environment.ddapApiUrl}/${realmIdPlaceholder}/resources/search`,
      {params}
    ).pipe(
      this.errorHandler.handleError()
    );
  }
}
