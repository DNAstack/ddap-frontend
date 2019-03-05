import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';

import { environment } from '../../../environments/environment';
import { RealmService } from '../../realm.service';
import { DnaChangeQueryParser } from '../dna-change-query.parser';

import { BeaconResponse } from './beacon-response.model';

@Injectable({
  providedIn: 'root',
})
export class ResourceBeaconService {

  realm;

  constructor(private http: HttpClient,
              private realmService: RealmService) {

    this.realmService.getRealm().subscribe(realm => {
      this.realm = realm;
    });
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
    return this.http.get<BeaconResponse[]>(
      `${environment.ddapApiUrl}/${this.realm}/resources/${resourceId}/search`,
      {params}
      );
  }

  private queryAll(params?): Observable<BeaconResponse[]> {
    return this.http.get<BeaconResponse[]>(
      `${environment.ddapApiUrl}/${this.realm}/resources/search`,
      {params}
      );
  }
}
