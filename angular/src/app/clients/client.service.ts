import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  get(params?): Observable<any[]> {
    params = params || {};
    params.persona = 'nci_researcher';

    return this.http.get<any[]>(environment.ddapApiUrl + '/config', { params })
      .pipe(
        pluck('clients')
      );
  }

  save(resourceChange: any): Observable<any> {
    const params = {
      persona: 'nci_researcher'
    };
    const resourceName = resourceChange.item.name;

    return this.http.post(
      environment.ddapApiUrl + '/config/' + resourceName,
      resourceChange,
      { params, headers }
    );
  }

  update(resource: any): Observable<any> {
    const params = {
      persona: 'nci_researcher'
    };
    const resourceName = resource.name;
    const resourceChange = {
      item: resource
    };

    return this.http.patch(
      environment.ddapApiUrl + '/config/' + resourceName,
      resourceChange,
      { params, headers }
    );
  }
}
