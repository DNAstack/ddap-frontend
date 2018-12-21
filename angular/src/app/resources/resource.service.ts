import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  getResources(params?): Observable<any[]> {
    params = params || {};
    params.persona = 'nci_researcher';

    return this.http.get<any[]>(environment.ddapApiUrl + '/resources', { params })
      .pipe(
        pluck('resources')
      );
  }

  addResource(resource: any): Observable<any> {
    const params = {
      persona: 'nci_researcher'
    };
    const resourceName = resource.item.name;

    return this.http.post(
      environment.ddapApiUrl + '/config/resources/' + resourceName,
      resource,
      { params , headers }
    );
  }
}
