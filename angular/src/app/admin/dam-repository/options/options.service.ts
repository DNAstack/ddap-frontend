import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from 'ddap-common-lib';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { DamInfoService } from '../../../shared/dam/dam-info.service';
import { AbstractConfigOptionService } from '../../shared/config-option.service';

@Injectable({
  providedIn: 'root',
})
export class OptionService extends AbstractConfigOptionService {

  constructor(http: HttpClient,
              private damInfoService: DamInfoService,
              errorHandler: ErrorHandlerService) {
    super(http, errorHandler);
  }

  get(damId: string, params = {}): Observable<any[]> {
    return this.damInfoService.getDamUrls()
      .pipe(
        flatMap(damApiUrls => this._get(damApiUrls.get(damId), params))
      );
  }

  update(damId: string, newOptions: object): Observable<any> {
    return this.damInfoService.getDamUrls()
      .pipe(
        flatMap(damApiUrls => this._update(damApiUrls.get(damId), newOptions))
      );
  }

}
