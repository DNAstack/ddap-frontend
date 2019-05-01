import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import GetTokenResponse = dam.v1.GetTokenResponse;
import IGetTokenRequest = dam.v1.IGetTokenRequest;
import { HttpParamsService } from '../../shared/http-params.service';
import { dam } from '../../shared/proto/dam-service';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';
import { ConfigEntityService } from '../shared/config-entity.service';
import { EntityModel } from '../shared/entity.model';

@Injectable({
  providedIn: 'root',
})
export class ResourceService extends ConfigEntityService {

  constructor(http: HttpClient,
              private httpParamsService: HttpParamsService) {
    super(http, 'resources', 'resources');
  }

  getResource(resourceName: string): Observable<EntityModel> {
    return this.get().pipe(
      map(resources => resources.get(resourceName))
    );
  }

  getAccessRequestToken(resourceId: string, viewId: string, tokenRequest: IGetTokenRequest): Observable<GetTokenResponse> {
    return this.http.get<GetTokenResponse>(
      `${environment.damApiUrl}/${realmIdPlaceholder}/resources/${resourceId}/views/${viewId}/token`,
      {
        params: this.httpParamsService.getHttpParamsFrom(tokenRequest),
      }
    ).pipe(
      map(GetTokenResponse.create)
    );
  }

}
