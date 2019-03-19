import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';

import { environment } from '../../../environments/environment';
import { DnaChangeQueryParser } from '../dna-change-query.parser';
import { RealmService } from '../realm/realm.service';

import { BeaconResponse } from './beacon-response.model';

@Injectable({
  providedIn: 'root',
})
export class ResourceBeaconService {

  constructor(private http: HttpClient,
              private realmService: RealmService) {
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
    return this.realmService.switchMap( (realm) => {
      return this.http.get<BeaconResponse[]>(
        `${environment.ddapApiUrl}/${realm}/resources/${resourceId}/search`,
        {params}
      );
    });
  }

  private queryAll(params = {}): Observable<BeaconResponse[]> {
    return this.realmService.switchMap((realm) => {
      return this.http.get<BeaconResponse[]>(
        `${environment.ddapApiUrl}/${realm}/resources/search`,
        {params}
      );
    });
  }
}
