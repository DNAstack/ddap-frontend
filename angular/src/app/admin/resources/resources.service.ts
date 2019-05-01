import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from '../../shared/error-handler/error-handler.service';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';
import { ConfigEntityService } from '../shared/config-entity.service';
import { EntityModel } from '../shared/entity.model';

@Injectable({
  providedIn: 'root',
})
export class ResourceService extends ConfigEntityService {

  constructor(protected http: HttpClient,
              protected errorHandler: ErrorHandlerService) {
    super(http, errorHandler, 'resources', 'resources');
  }

  get(params: {} = {}): Observable<Map<string, EntityModel>> {
    return super.get(params)
      .pipe(
        this.errorHandler.notifyOnError(`Can't load resources.`)
      );
  }

  getAccessRequestToken(resourceId, viewId): Observable<any[]> {
    const viewUrl = `${environment.damApiUrl}/${realmIdPlaceholder}/resources/${resourceId}/views/${viewId}`;
    return this.http.get<any[]>(viewUrl)
      .pipe(
        this.errorHandler.notifyOnError(`Can't get access token.`),
        pluck('token')
      );
  }

  getResource(resourceName: string): Observable<EntityModel> {
    return this.get().pipe(
      map(resources => resources.get(resourceName))
    );
  }
}
