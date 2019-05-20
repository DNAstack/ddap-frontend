import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import _get from 'lodash.get';
import { Observable } from 'rxjs/Observable';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from '../../shared/error-handler/error-handler.service';
import { realmIdPlaceholder } from '../../shared/realm/realm.constant';

@Injectable({
  providedIn: 'root',
})
export class PassportTranslatorsService {

  constructor(protected http: HttpClient,
              protected errorHandler: ErrorHandlerService) {
  }

  get(): Observable<object> {
    return this.http.get(`${environment.damApiUrl}/${realmIdPlaceholder}/passportTranslators`)
      .pipe(
        pluck('passportTranslators'),
        // map(EntityModel.objectToMap),
        map((passportTranslatorsDto) => this.getTranslatorList(passportTranslatorsDto)),
        this.errorHandler.notifyOnError(`Can't load passport translators.`)
      );
  }

  private getTranslatorList(passportTranslatorsDto) {
    return Object.entries(passportTranslatorsDto)
      .map(([translatorId, translator]) => {
        return {
          id: translatorId,
          label: _get(translator, 'ui.label', translatorId),
        };
      });
  }
}
