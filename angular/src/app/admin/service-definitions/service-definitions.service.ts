import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { DamInfoService } from '../../shared/dam/dam-info.service';
import { ErrorHandlerService } from '../../shared/error-handler/error-handler.service';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';
import { ConfigModel } from '../shared/config.model';
import { DamConfigEntityType } from '../shared/dam/dam-config-entity-type.enum';
import { DamConfigService } from '../shared/dam/dam-config.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceDefinitionService extends DamConfigService {

  constructor(http: HttpClient,
              protected errorHandler: ErrorHandlerService,
              protected damInfoService: DamInfoService) {
    super(DamConfigEntityType.resources, http, damInfoService);
  }

  getTargetAdapterVariables(damId: string, params: {} = {}): Observable<any> {
    return this.http.get<ConfigModel>(
      `${environment.ddapApiUrl}/${realmIdPlaceholder}/serviceTemplates/${damId}/variables`, {params}
      );
  }

}
