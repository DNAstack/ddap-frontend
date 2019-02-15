import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { first, mergeMap, pluck } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient) { }

  get(params?): Observable<any[]> {
    params = params || {};

    return this.http.get<any[]>(environment.damApiUrl + '/resources', { params })
      .pipe(
        pluck('resources')
      );
  }

  getResource(resourceName: string): Observable<any> {
    return this.get().pipe(
      mergeMap((dto: any) => dto),
      first((resource: any) => resource.name === resourceName)
    );
  }

  getAccessRequestToken(resource, view): Observable<any[]> {
    const params = {
    };

    return this.http.get<any[]>(`${environment.damApiUrl}/resources/${resource}/views/${view}`, { params })
      .pipe(
        pluck('token')
      );
  }

}
