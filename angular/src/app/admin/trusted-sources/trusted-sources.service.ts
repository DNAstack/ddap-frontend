import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorHandlerService } from '../../shared/error-handler/error-handler.service';
import { ConfigEntityService } from '../shared/config-entity.service';

@Injectable({
  providedIn: 'root',
})
export class TrustedSourcesService extends ConfigEntityService {

  constructor(protected http: HttpClient, protected errorHandler: ErrorHandlerService) {
    super(http, 'trustedSources', 'trustedSources', errorHandler);
  }

}
