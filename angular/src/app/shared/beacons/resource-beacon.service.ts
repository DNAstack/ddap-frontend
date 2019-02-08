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

  queryResourceBeacons(query, resource): Observable<BeaconResponse> {
    if (!DnaChangeQueryParser.validate(query)) {
      return new EmptyObservable();
    }

    return this.queryBeacon(resource.name, DnaChangeQueryParser.parseParams(query));
  }

  private queryBeacon(resourceId, params?): Observable<BeaconResponse> {
    return this.http.get<BeaconResponse>(`${environment.ddapApiUrl}/resources/${resourceId}/search`, { params });
  }

}
