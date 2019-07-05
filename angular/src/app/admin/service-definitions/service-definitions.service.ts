import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { DamInfoService } from '../../shared/dam/dam-info.service';
import { ErrorHandlerService } from '../../shared/error-handler/error-handler.service';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';
import { ConfigEntityService } from '../shared/config-entity.service';
import { ConfigModel } from '../shared/config.model';
import { EntityModel } from '../shared/entity.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceDefinitionService extends ConfigEntityService {

  constructor(protected http: HttpClient,
              protected errorHandler: ErrorHandlerService,
              protected damInfoService: DamInfoService) {
    super(http, errorHandler, damInfoService, 'serviceTemplates', 'serviceTemplates');
  }

  get(damId: string, params: {} = {}): Observable<Map<string, EntityModel>> {
    return super.get(damId, params)
      .pipe(
        this.errorHandler.notifyOnError(`Can't load service definitions.`)
      );
  }

  getTargetAdapterVariables(params: {} = {}): Observable<any> {
    return this.http.get<ConfigModel>(
      `${environment.ddapApiUrl}/${realmIdPlaceholder}/serviceTemplates/variables`, {params}
      );
  }

}
