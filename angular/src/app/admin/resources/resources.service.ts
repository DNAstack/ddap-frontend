import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(http: HttpClient) {
    super(http, 'resources', 'resources');
  }

  getAccessRequestToken(resourceId, viewId): Observable<any[]> {
    const viewUrl = `${environment.damApiUrl}/${realmIdPlaceholder}/resources/${resourceId}/views/${viewId}`;
    return this.http.get<any[]>(viewUrl)
      .pipe(
        pluck('token')
      );
  }

  getResource(resourceName: string): Observable<EntityModel> {
    return this.get().pipe(
      map(resources => resources.get(resourceName))
    );
  }
}
