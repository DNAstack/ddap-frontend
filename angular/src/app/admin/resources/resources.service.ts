import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from '../../shared/error-handler/error-handler.service';
import { HttpParamsService } from '../../shared/http-params.service';
import { dam } from '../../shared/proto/dam-service';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';
import { ConfigEntityService } from '../shared/config-entity.service';
import GetTokenResponse = dam.v1.GetTokenResponse;
import IGetTokenRequest = dam.v1.IGetTokenRequest;
import { ConfigModel } from '../shared/config.model';
import { EntityModel } from '../shared/entity.model';

@Injectable({
  providedIn: 'root',
})
export class ResourceService extends ConfigEntityService {

  constructor(http: HttpClient,
              private httpParamsService: HttpParamsService,
              protected errorHandler: ErrorHandlerService) {
    super(http, errorHandler, 'resources', 'resources');
  }

  getResource(resourceName: string): Observable<EntityModel> {
    return this.get()
      .pipe(
        map(resources => resources.get(resourceName))
      );
  }

  // // TODO: dataService dups
  // getResource(resourceId: string, realmId = null, params = {}): Observable<EntityModel> {
  //   return this.http.get<any>(
  //     `${environment.damApiUrl}/${realmId || realmIdPlaceholder}/resources/${resourceId}`,
  //     {params}
  //   ).pipe(
  //     this.errorHandler.notifyOnError(`Can't load resource ${resourceId}.`),
  //     pluck('resource'),
  //     map((resource) => new EntityModel(resourceId, resource))
  //   );
  // }

  getAccessRequestToken(resourceId: string, viewId: string, tokenRequest: IGetTokenRequest): Observable<GetTokenResponse> {
    return this.http.get<GetTokenResponse>(
      `${environment.damApiUrl}/${realmIdPlaceholder}/resources/${resourceId}/views/${viewId}/token`,
      {
        params: this.httpParamsService.getHttpParamsFrom(tokenRequest),
      }
    ).pipe(
      this.errorHandler.notifyOnError(`Can't get access token.`),
      map(GetTokenResponse.create)
    );
  }

}
