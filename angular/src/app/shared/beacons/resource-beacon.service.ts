import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

import { environment } from '../../../environments/environment';
import { DnaChangeQueryParser } from '../dna-change-query.parser';

import { BeaconResponse } from './beacon-response.model';

@Injectable({
  providedIn: 'root',
})
export class ResourceBeaconService {

  constructor(private http: HttpClient) {
  }

  queryResourceBeacons(queryValue: any, resource): Observable<BeaconResponse> {
    const {query, assembly} = queryValue;

    if (!DnaChangeQueryParser.validate(query)) {
      return new EmptyObservable();
    }

    const params = DnaChangeQueryParser.parseParams(query);
    params.type = 'beacon';
    params.assemblyId = assembly;

    return this.queryBeacon(resource, params);
  }

  private queryBeacon(resourceId, params?): Observable<BeaconResponse> {
    return this.http.get<BeaconResponse>(`${environment.ddapApiUrl}/resources/${resourceId}/search`, {params});
  }

}
