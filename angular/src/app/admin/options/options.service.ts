import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat/Observable';

import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from '../../shared/error-handler/error-handler.service';
import { AbstractConfigOptionService } from '../shared/config-option.service';

@Injectable({
  providedIn: 'root',
})
export class OptionService extends AbstractConfigOptionService {

  constructor(http: HttpClient,
              errorHandler: ErrorHandlerService) {
    super(http, errorHandler);

  }

  get(damId: string, params = {}): Observable<any[]> {
    return this._get(environment.damApiUrls.get(damId), params);
  }

  update(damId: string, newOptions: object): Observable<any> {
    return this._update(environment.damApiUrls.get(damId), newOptions);
  }

}
