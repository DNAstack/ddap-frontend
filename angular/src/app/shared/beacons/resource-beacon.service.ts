import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { DnaChangeQueryParser } from '../dna-change-query.parser';

import { BeaconResponse } from './beacon-response.model';

@Injectable({
  providedIn: 'root',
})
export class ResourceBeaconService {

  constructor(private http: HttpClient) {
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

  private queryBeacon(resourceId, params?): any {
    return this.http.get<any>(`${environment.ddapApiUrl}/resources/${resourceId}/search`, {params})
      .pipe(
        map((responseDto) => [responseDto])
      );
  }

  private queryAll(params?): Observable<BeaconResponse[]> {
    return this.http.get<BeaconResponse[]>(`${environment.ddapApiUrl}/resources/search`, {params});
  }
}
