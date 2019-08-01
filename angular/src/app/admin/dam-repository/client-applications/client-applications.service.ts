import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DamInfoService } from '../../../shared/dam/dam-info.service';
import { ErrorHandlerService } from '../../../shared/error-handler/error-handler.service';
import { DamConfigEntityType } from '../shared/dam/dam-config-entity-type.enum';
import { DamConfigService } from '../shared/dam/dam-config.service';

@Injectable({
  providedIn: 'root',
})
export class ClientApplicationService extends DamConfigService {

  constructor(protected http: HttpClient,
              protected damInfoService: DamInfoService,
              protected route: ActivatedRoute,
              protected errorHandler: ErrorHandlerService) {
    super(DamConfigEntityType.clients, http, damInfoService);
  }

}
