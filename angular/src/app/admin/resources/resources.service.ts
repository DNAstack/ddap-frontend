import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';
import { ConfigEntityService } from '../shared/config-entity.service';
import { EntityModel } from '../shared/entity.model';

@Injectable({
  providedIn: 'root',
})
export class ResourceService extends ConfigEntityService {

  constructor(protected injector: Injector) {
    super(injector, 'resources', 'resources', {
      '=1': 'resource',
      'other': 'resources',
    });
  }

  getAccessRequestToken(resourceId, viewId): Observable<any[]> {
    const viewUrl = `${environment.damApiUrl}/${realmIdPlaceholder}/resources/${resourceId}/views/${viewId}`;
    return this.http.get<any[]>(viewUrl)
      .pipe(
        this.errorHandler.handleError(`Can't get access token.`),
        pluck('token')
      );
  }

  getResource(resourceName: string): Observable<EntityModel> {
    return this.get().pipe(
      map(resources => resources.get(resourceName))
    );
  }
}
