import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ErrorHandlerService } from '../../shared/error-handler/error-handler.service';
import { ConfigEntityService } from '../shared/config-entity.service';
import { EntityModel } from '../shared/entity.model';

@Injectable({
  providedIn: 'root',
})
export class PersonaService extends ConfigEntityService {

  constructor(protected http: HttpClient,
              protected errorHandler: ErrorHandlerService) {
    super(http, errorHandler, 'testPersonas', 'testPersonas');
  }

  get(damId: string, params: {} = {}): Observable<Map<string, EntityModel>> {
    return super.get(damId, params)
      .pipe(
        this.errorHandler.notifyOnError(`Can't load personas.`)
      );
  }

}
