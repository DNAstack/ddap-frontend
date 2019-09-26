import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ErrorHandlerService } from '../../../shared/error-handler/error-handler.service';
import { AbstractConfigOptionService } from '../../shared/config-option.service';

@Injectable({
  providedIn: 'root',
})
export class OptionService extends AbstractConfigOptionService {

  constructor(http: HttpClient,
              errorHandler: ErrorHandlerService) {
    super(http, errorHandler);

  }

  get(params: {} = {}): Observable<any[]> {
    return this._get(environment.idpApiUrl, params);
  }

  update(newOptions: object): Observable<any> {
    return this._update(environment.idpApiUrl, newOptions);
  }

}
