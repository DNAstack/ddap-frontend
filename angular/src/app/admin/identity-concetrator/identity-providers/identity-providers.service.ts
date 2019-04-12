import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ErrorHandlerService } from '../../../shared/error-handler/error-handler.service';
import { IcConfigEntityService } from '../shared/ic-config-entity.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityProviderService extends IcConfigEntityService {

  constructor(http: HttpClient,
              errorHandler: ErrorHandlerService) {
    super(http, 'identityProviders', 'identityProviders', errorHandler);
  }

}
