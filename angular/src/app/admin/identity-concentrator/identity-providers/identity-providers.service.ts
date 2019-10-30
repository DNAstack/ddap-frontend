import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'ddap-common-lib';

import { IcConfigEntityType } from '../shared/ic/ic-config-entity-type.enum';
import { IcConfigService } from '../shared/ic/ic-config.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityProviderService extends IcConfigService {

  constructor(protected http: HttpClient,
              protected route: ActivatedRoute,
              protected errorHandler: ErrorHandlerService) {
    super(IcConfigEntityType.identityProviders, http, errorHandler);
  }

}
