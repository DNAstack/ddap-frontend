import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from 'ddap-common-lib';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';
import { realmIdPlaceholder } from '../../../../shared/realm/realm.constant';
import { ConfigModificationModel } from '../../../shared/configModificationObject';
import { EntityModel } from '../../../shared/entity.model';

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

  save(id: string, change: ConfigModificationModel): Observable<any> {
    return this.http.post(`${environment.idpApiUrl}/${realmIdPlaceholder}/config/${this.entityType}/${id}`,
      change
    ).pipe(
      this.errorHandler.notifyOnError(`Can't save ${id}.`)
    );
  }

  update(id: string, change: ConfigModificationModel): Observable<any> {
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
