import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { flatMap, map } from 'rxjs/operators';

import { DamInfoService } from '../../shared/dam/dam-info.service';
import { ErrorHandlerService } from '../../shared/error-handler/error-handler.service';
import { HttpParamsService } from '../../shared/http-params.service';
import { dam } from '../../shared/proto/dam-service';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';
import { ConfigEntityService } from '../shared/config-entity.service';
import { EntityModel } from '../shared/entity.model';
import GetTokenResponse = dam.v1.GetTokenResponse;
import IGetTokenRequest = dam.v1.IGetTokenRequest;

@Injectable({
  providedIn: 'root',
})
export class ResourceService extends ConfigEntityService {

  constructor(http: HttpClient,
              private httpParamsService: HttpParamsService,
              protected errorHandler: ErrorHandlerService,
              protected damInfoService: DamInfoService) {
    super(http, errorHandler, damInfoService, 'resources', 'resources');
  }

  getResource(damId: string, resourceName: string): Observable<EntityModel> {
    return this.get(damId)
      .pipe(
        map(resources => resources.get(resourceName))
      );
  }

  getAccessRequestToken(damId: string, resourceId: string, viewId: string, tokenRequest: IGetTokenRequest): Observable<GetTokenResponse> {
    return this.damInfoService.getDamUrls()
      .pipe(
        flatMap(damApiUrls => {
          const damApiUrl = damApiUrls.get(damId);
          return this.http.get<GetTokenResponse>(
            `${damApiUrl}/${realmIdPlaceholder}/resources/${resourceId}/views/${viewId}/token`,
            {
              params: this.httpParamsService.getHttpParamsFrom(tokenRequest),
            }
          ).pipe(
            this.errorHandler.notifyOnError(`Can't get access token.`),
            map(GetTokenResponse.create)
          );
        })
      );
  }

}
