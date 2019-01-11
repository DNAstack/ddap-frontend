import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck, first, mergeMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  getAccessRequestToken(resource, view): Observable<any[]> {
    const params = {
      persona: 'nci_researcher'
    };

    return this.http.get<any[]>(`${environment.ddapApiUrl}/resources/${resource}/views/${view}`, { params })
      .pipe(
        pluck('token')
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

  addResource(resourceChange: any): Observable<any> {
    const params = {
      persona: 'nci_researcher'
    };
    const resourceName = resourceChange.item.name;

    return this.http.post(
      environment.ddapApiUrl + '/config/resources/' + resourceName,
      resourceChange,
      { params, headers }
    );
  }

  modifyResource(resource: any): Observable<any> {
    const params = {
      persona: 'nci_researcher'
    };
    const resourceName = resource.name;
    const resourceChange = {
      item: resource
    };

    return this.http.patch(
      environment.ddapApiUrl + '/config/resources/' + resourceName,
      resourceChange,
      { params, headers }
    );
  }
}
