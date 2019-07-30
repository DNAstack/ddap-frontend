import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { ErrorHandlerService } from '../../../shared/error-handler/error-handler.service';
import { realmIdPlaceholder } from '../../../shared/realm/realm.constant';
import { ConfigModificationObject } from '../configModificationObject';
import { EntityModel } from '../entity.model';

import { IcConfigEntityType } from './ic-config-entity-type.enum';

export abstract class IcConfigService {

  protected constructor(protected entityType: IcConfigEntityType,
                        protected http: HttpClient,
                        protected errorHandler: ErrorHandlerService) {
  }

  get(params = {}): Observable<Map<string, EntityModel>> {
    return this.http.get<any>(`${environment.idpApiUrl}/${realmIdPlaceholder}/config`,
      {params}
    ).pipe(
      pluck(this.entityType),
      map(EntityModel.objectToMap)
    );
  }

  save(id: string, change: ConfigModificationObject): Observable<any> {
    return this.http.post(`${environment.idpApiUrl}/${realmIdPlaceholder}/config/${this.entityType}/${id}`,
      change
    ).pipe(
      this.errorHandler.notifyOnError(`Can't save ${id}.`)
    );
  }

  update(id: string, change: ConfigModificationObject): Observable<any> {
    return this.http.put(`${environment.idpApiUrl}/${realmIdPlaceholder}/config/${this.entityType}/${id}`,
      change
    ).pipe(
      this.errorHandler.notifyOnError(`Can't update ${id}.`)
    );
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${environment.idpApiUrl}/${realmIdPlaceholder}/config/${this.entityType}/${id}`)
      .pipe(
        this.errorHandler.notifyOnError(`Can't delete ${id}.`)
      );
  }
}
