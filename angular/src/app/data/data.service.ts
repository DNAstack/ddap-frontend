import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { first, map, mergeMap, pluck, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { EntityModel } from '../admin/shared/entity.model';
import { realmIdPlaceholder } from '../shared/realm/realm.constant';

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
        map((entity: EntityModel) => entity.dto.ui.label)
      );
    }

    return of(resourceName);
  }

  get(params = {}): Observable<EntityModel[]> {
    const putIntoCache = (resourcesDto: EntityModel[]) => {
      resourcesDto.forEach((resource: EntityModel) => {
        this.cache[resource.name] = resource.dto.ui.label;
      });
    };

    return this.http.get<any>(`${environment.damApiUrl}/${realmIdPlaceholder}/resources`, {params}).pipe(
      pluck('resources'),
      map(EntityModel.objectToMap),
      map(EntityModel.arrayFromMap),
      tap(putIntoCache)
    );
  }

  getResource(resourceId: string): Observable<EntityModel> {
    return this.get().pipe(
      mergeMap((entities: EntityModel[]) => entities),
      first((resource: EntityModel) => resource.name === resourceId)
    );
  }

  getAccessRequestToken(resource, view): any {
    const viewUrl = `${environment.damApiUrl}/${realmIdPlaceholder}/resources/${resource}/views/${view}/token`;
    return this.http.get<any>(viewUrl).pipe(
      map(({account, token}) => ({account, token}))
    );
  }
}
