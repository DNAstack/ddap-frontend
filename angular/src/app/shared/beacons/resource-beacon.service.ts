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

  queryResourceBeacons(query: any, resource): Observable<BeaconResponse[]> {
    const { value, assemblyId } = query;

    if (!DnaChangeQueryParser.validate(value)) {
      return new EmptyObservable();
    }

    const params = DnaChangeQueryParser.parseParams(value);
    params.type = 'beacon';
    params.assemblyId = assemblyId;

    return this.queryBeacon(resource.name, params);
  }

  private queryBeacon(resourceId, params?): Observable<BeaconResponse[]> {
    return this.http.get<BeaconResponse[]>(`${environment.ddapApiUrl}/resources/${resourceId}/search`, { params });
  }

}
