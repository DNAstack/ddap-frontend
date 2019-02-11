import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { EntityService } from '../shared/entity.service';

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

@Injectable({
  providedIn: 'root',
})
export class ResourceService implements EntityService {

  constructor(private http: HttpClient) { }

  getAccessRequestToken(resource, view): Observable<any[]> {
    return this.getResource(resource)
      .pipe(
        pluck('views', view, 'token')
      );
  }

  get(): Observable<any[]> {
    return this.http.get<any[]>(environment.damApiUrl + '/config')
      .pipe(
        pluck('resources')
      );
  }

  getResource(resourceName: string): Observable<any> {
    return this.get().pipe(
      pluck(resourceName)
    );
  }

  save(resourceChange: any): Observable<any> {
    const params = {
    };
    const resourceName = resourceChange.item.name;

    return this.http.post(
      environment.damApiUrl + '/config/resources/' + resourceName,
      resourceChange,
      { params, headers }
    );
  }

  update(resource: any, test?: any): Observable<any> {
    const params = {
    };
    const resourceName = resource.name;
    const resourceChange: any = {
      item: resource,
    };

    if (test) {
      resourceChange.apply = test;
    }

    return this.http.put(
      environment.damApiUrl + '/config/resources/' + resourceName,
      resourceChange,
      { params, headers }
    );
  }

  remove(id: string): Observable<any> {
    // TODO:
    return undefined;
  }
}
