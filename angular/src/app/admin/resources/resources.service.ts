import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { flatMap, map, pluck } from 'rxjs/operators';

import { DamInfoService } from '../../shared/dam/dam-info.service';
import { ErrorHandlerService } from '../../shared/error-handler/error-handler.service';
import { HttpParamsService } from '../../shared/http-params.service';
import { dam } from '../../shared/proto/dam-service';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';
import { ConfigEntityService } from '../shared/config-entity.service';
import { DamConfigEntityType } from '../shared/dam/dam-config-entity-type.enum';
import GetTokenResponse = dam.v1.GetTokenResponse;
import IGetTokenRequest = dam.v1.IGetTokenRequest;
import { DamConfigService } from '../shared/dam/dam-config.service';
import { EntityModel } from '../shared/entity.model';

@Injectable({
  providedIn: 'root',
})
export class ResourceService extends DamConfigService {

  constructor(http: HttpClient,
              private httpParamsService: HttpParamsService,
              protected errorHandler: ErrorHandlerService,
              protected damInfoService: DamInfoService) {
    super(DamConfigEntityType.resources, http, damInfoService);
  }

  getResource(damId: string, resourceName: string): Observable<EntityModel> {
    return this.get(damId)
      .pipe(
        pluck(damId, DamConfigEntityType.resources),
        map(EntityModel.objectToMap),
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
