import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, pluck, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { EntityModel } from '../admin/shared/entity.model';
import { ErrorHandlerService } from '../shared/error-handler/error-handler.service';
import { realmIdPlaceholder } from '../shared/realm/realm.constant';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private cache: any = {};

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService) {

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

    return this.http.get<any>(`${environment.damApiUrl}/${realmIdPlaceholder}/resources`, {params})
      .pipe(
        this.errorHandler.handleError(),
        pluck('resources'),
        map(EntityModel.objectToMap),
        map(EntityModel.arrayFromMap),
        tap(putIntoCache)
      );
  }

  getResource(resourceId: string, params = {}): Observable<EntityModel> {
    return this.http.get<any>(`${environment.damApiUrl}/${realmIdPlaceholder}/resources/${resourceId}`, {params})
      .pipe(
        this.errorHandler.handleError(),
        pluck('resource'),
        map((resource) => new EntityModel(resourceId, resource))
      );
  }

}
