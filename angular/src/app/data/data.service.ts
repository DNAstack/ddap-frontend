import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { first, map, mergeMap, pluck, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private cache: any = {};

  constructor(private http: HttpClient) {

  }

  getName(resourceId: string): Observable<string> {
    const resourceName = this.cache[resourceId];
    if (!resourceName) {
      return this.getResource(resourceId).pipe(
        map((resourceDto: any) => resourceDto.ui.label)
      );
    }

    return of(resourceName);
  }

  get(params?): Observable<any[]> {
    params = params || {};

    const putIntoCache = (resourcesDto) => {
      resourcesDto.forEach((resource) => {
        this.cache[resource.name] = resource.ui.label;
      });
    };

    return this.http.get<any[]>(environment.damApiUrl + '/resources', {params})
      .pipe(
        pluck('resources'),
        tap(putIntoCache)
      );
  }

  getResource(resourceId: string): Observable<any> {
    return this.get().pipe(
      mergeMap((dto: any) => dto),
      first((resource: any) => resource.name === resourceId)
    );
  }

  getAccessRequestToken(resource, view): any {
    const params = {};

    return this.http.get<any>(`${environment.damApiUrl}/resources/${resource}/views/${view}`, {params})
      .pipe(
        map(({ account, token }) => ({ account, token }))
      );
  }

}
