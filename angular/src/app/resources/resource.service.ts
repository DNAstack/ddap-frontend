import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { first, mergeMap, pluck } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { EntityService } from '../shared/EntityService';

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

@Injectable({
  providedIn: 'root',
})
export class ResourceService implements EntityService {

  constructor(private http: HttpClient) { }

  getAccessRequestToken(resource, view): Observable<any[]> {
    const params = {
      persona: 'nci_researcher',
    };

    return this.http.get<any[]>(`${environment.ddapApiUrl}/resources/${resource}/views/${view}`, { params })
      .pipe(
        pluck('token')
      );
  }

  get(): Observable<any[]> {
    return this.http.get<any[]>(environment.ddapApiUrl + '/resources')
      .pipe(
        pluck('resources')
      );
  }

  getResources(params?): Observable<any[]> {
    params = params || {};
    params.persona = 'nci_researcher';

    return this.http.get<any[]>(environment.ddapApiUrl + '/resources', { params })
      .pipe(
        pluck('resources')
      );
  }

  getResource(resourceName: string, params?): Observable<any> {
    params = params || {};
    params.persona = 'nci_researcher';

    return this.getResources(params).pipe(
      mergeMap(resources => resources),
      first(resource => resource.name === resourceName)
    );
  }

  save(resourceChange: any): Observable<any> {
    const params = {
      persona: 'nci_researcher',
    };
    const resourceName = resourceChange.item.name;

    return this.http.post(
      environment.ddapApiUrl + '/config/resources/' + resourceName,
      resourceChange,
      { params, headers }
    );
  }

  update(resource: any, test?: any): Observable<any> {
    const params = {
      persona: 'nci_researcher',
    };
    const resourceName = resource.name;
    const resourceChange: any = {
      item: resource,
    };

    if (test) {
      resourceChange.apply = test;
    }

    return this.http.patch(
      environment.ddapApiUrl + '/config/resources/' + resourceName,
      resourceChange,
      { params, headers }
    );
  }
}
