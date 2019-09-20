import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';

import { environment } from '../../../environments/environment';
import { DnaChangeQueryParser } from './dna-change-query.parser';
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

  query(queryValue: BeaconServiceQuery): Observable<BeaconResponse[]> {
    const {query, assembly, resource, damId, limitSearch} = queryValue;

    if (!DnaChangeQueryParser.validate(query)) {
      return Observable.of([]);
    }

    const params = DnaChangeQueryParser.parseParams(query);
    params.type = 'beacon';
    params.assemblyId = assembly;

    if (resource && damId && limitSearch) {
      return this.queryBeacon(damId, resource, params);
    }

    return this.queryAll(params);
  }

  private queryBeacon(damId: string, resourceId: string, params?): Observable<BeaconResponse[]> {
    return this.http.get<BeaconResponse[]>(
      `${environment.ddapApiUrl}/${realmIdPlaceholder}/resources/${damId}/${resourceId}/search`,
      {params}
    ).pipe(
      this.errorHandler.notifyOnError(`Can't query beacon for resource ${resourceId}.`)
    );
  }

  private queryAll(params = {}): Observable<BeaconResponse[]> {
    return this.http.get<BeaconResponse[]>(
      `${environment.ddapApiUrl}/${realmIdPlaceholder}/resources/search`,
      {params}
    ).pipe(
      this.errorHandler.notifyOnError(`Can't query beacons.`)
    );
  }
}

export interface BeaconServiceQuery {
  query: string;
  assembly: string;
  resource?: string;
  damId?: string;
  limitSearch?: boolean;
}
