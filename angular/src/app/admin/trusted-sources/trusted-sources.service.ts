import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ErrorHandlerService } from '../../shared/error-handler/error-handler.service';
import { ConfigEntityService } from '../shared/config-entity.service';
import { EntityModel } from '../shared/entity.model';

@Injectable({
  providedIn: 'root',
})
export class TrustedSourcesService extends ConfigEntityService {

  constructor(protected http: HttpClient,
              protected errorHandler: ErrorHandlerService) {
    super(http, errorHandler, 'trustedSources', 'trustedSources');
  }

  get(params: {} = {}): Observable<Map<string, EntityModel>> {
    return super.get(params)
      .pipe(
        this.errorHandler.notifyOnError(`Can't load trusted source.`)
      );
  }

  getList(innerMapFn?): Observable<any[]> {
    return super.getList(innerMapFn)
      .pipe(
        this.errorHandler.notifyOnError(`Can't load trusted sources.`)
      );
  }

}
