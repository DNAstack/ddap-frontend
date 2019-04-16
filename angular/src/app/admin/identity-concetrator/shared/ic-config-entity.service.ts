import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { ErrorHandlerService } from '../../../shared/error-handler/error-handler.service';
import { HTTP_HEADERS } from '../../../shared/HTTP_HEADERS';
import { realmIdPlaceholder } from '../../../shared/realm/realm.constant';
import { ConfigModificationObject } from '../../shared/configModificationObject';
import { EntityModel } from '../../shared/entity.model';
import { EntityService } from '../../shared/entity.service';

const headers = HTTP_HEADERS;

export abstract class IcConfigEntityService implements EntityService {
  protected http: HttpClient;
  protected errorHandler: ErrorHandlerService;

  protected constructor(protected injector: Injector,
                        protected typeNameInConfig: string,
                        protected typeNameInUrl: string,
                        protected label?: object) {

    this.http = this.injector.get(HttpClient);
    this.errorHandler = this.injector.get(ErrorHandlerService);
  }

  get(params = {}): Observable<Map<string, EntityModel>> {
    return this.http.get<any>(`${environment.idpApiUrl}/${realmIdPlaceholder}/config`,
      {params})
      .pipe(
        this.errorHandler.handleError(`Can't load ${this.label['other'] || this.typeNameInConfig}.`),
        pluck(this.typeNameInConfig),
        map(EntityModel.objectToMap)
      );
  }

  save(id: string, change: ConfigModificationObject): Observable<any> {
    return this.http.post(`${environment.idpApiUrl}/${realmIdPlaceholder}/config/${this.typeNameInUrl}/${id}`,
      change,
      {headers}).pipe(
      this.errorHandler.handleError(`Can't save ${this.label['=0'] || this.typeNameInConfig}.`)
    );
  }

  update(id: string, change: ConfigModificationObject): Observable<any> {
    return this.http.put(`${environment.idpApiUrl}/${realmIdPlaceholder}/config/${this.typeNameInUrl}/${id}`,
      change,
      {headers}
    ).pipe(
      this.errorHandler.handleError(`Can't update ${this.label['=0'] || this.typeNameInConfig}.`)
    );
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${environment.idpApiUrl}/${realmIdPlaceholder}/config/${this.typeNameInUrl}/${id}`,
      {headers}
    ).pipe(
      this.errorHandler.handleError(`Can't delete ${this.label['=0'] || this.typeNameInConfig}.`)
    );
  }
}
