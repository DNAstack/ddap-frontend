import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

import { environment } from '../../environments/environment';

import { DnaChangeQueryParser } from './DnaChangeQueryParser';

@Injectable()
export class ResourceBeaconService {

  constructor(private http: HttpClient) {
  }

  queryResourceBeacons(query, resource): Observable<any> {
    if (!DnaChangeQueryParser.validate(query)) {
      return new EmptyObservable();
    }

    const params = DnaChangeQueryParser.parseParams(query);
    params.type = 'beacon';

    return this.queryBeacon(resource.name, params);
  }

  private queryBeacon(resourceId, params?): Observable<any> {
    return this.http.get<any>(`${environment.ddapApiUrl}/resources/${resourceId}/search`, { params });
  }

}
