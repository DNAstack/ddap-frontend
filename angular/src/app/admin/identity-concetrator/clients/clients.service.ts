import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ErrorHandlerService } from '../../../shared/error-handler/error-handler.service';
import { EntityModel } from '../../shared/entity.model';
import { IcConfigEntityService } from '../shared/ic-config-entity.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends IcConfigEntityService {

  constructor(protected http: HttpClient,
              protected errorHandler: ErrorHandlerService) {
    super(http, errorHandler, 'clients', 'clients');
  }

  get(damId: string, params: {} = {}): Observable<Map<string, EntityModel>> {
    return super.get(params)
      .pipe(
        this.errorHandler.notifyOnError(`Can't load clients.`)
      );
  }

}
