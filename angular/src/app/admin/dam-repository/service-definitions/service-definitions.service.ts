import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService, realmIdPlaceholder } from 'ddap-common-lib';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DamInfoService } from '../../../shared/dam/dam-info.service';
import { DamConfigEntityType } from '../shared/dam/dam-config-entity-type.enum';
import { DamConfigService } from '../shared/dam/dam-config.service';
import { TargetAdapterVariables } from '../target-adapters/target-adapter-variables.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceDefinitionService extends DamConfigService {

  constructor(http: HttpClient,
              protected errorHandler: ErrorHandlerService,
              protected damInfoService: DamInfoService) {
    super(DamConfigEntityType.serviceTemplates, http, damInfoService);
  }

  getTargetAdapterVariables(damId: string, serviceTemplateId: string, params: {} = {}): Observable<TargetAdapterVariables> {
    return this.http.get<TargetAdapterVariables>(
      `${environment.ddapApiUrl}/${realmIdPlaceholder}/dam/${damId}/service-templates/${serviceTemplateId}/variables`,
      {params}
    );
  }

}
