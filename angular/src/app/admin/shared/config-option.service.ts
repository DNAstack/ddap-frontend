import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';

import { ErrorHandlerService } from '../../shared/error-handler/error-handler.service';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';

export abstract class AbstractConfigOptionService {

  protected constructor(protected http: HttpClient,
                        private errorHandler: ErrorHandlerService) {

  }

  protected _get(targetApi: string, params = {}): Observable<any[]> {
    return this.http.get<any>(`${targetApi}/${realmIdPlaceholder}/config`,
      {params}
    ).pipe(
      this.errorHandler.notifyOnError(`Can't load settings.`),
      pluck('options')
    );
  }

  protected _update(targetApi: string, newOptions: object): Observable<any> {
    return this.http.put(`${targetApi}/${realmIdPlaceholder}/config/options`,
      {item: newOptions}
    ).pipe(
      this.errorHandler.notifyOnError(`Can't update settings.`)
    );
  }

}
