import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { ErrorHandlerService } from '../../../shared/error-handler/error-handler.service';
import { AbstractConfigOptionService } from '../../shared/config-option.service';

@Injectable({
  providedIn: 'root',
})
export class OptionService extends AbstractConfigOptionService {

  constructor(http: HttpClient,
              errorHandler: ErrorHandlerService) {
    super(http, environment.idpApiUrl, errorHandler);

  }

}
