import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from 'ddap-common-lib';
import _get from 'lodash.get';
import { zip } from 'rxjs';
import { Observable } from 'rxjs';
import { flatMap, map, pluck } from 'rxjs/operators';

import { DamInfoService } from '../../../shared/dam/dam-info.service';
import { realmIdPlaceholder } from '../../../shared/realm/realm.constant';
import { flatten } from '../../../shared/util';

@Injectable({
  providedIn: 'root',
})
export class PassportTranslatorsService {

  constructor(protected http: HttpClient,
              protected errorHandler: ErrorHandlerService,
              private damInfoService: DamInfoService) {
  }

  get(damId: string): Observable<object> {
    return this.damInfoService.getDamUrls()
      .pipe(
        flatMap(damApiUrls => {
          const damApiUrl = damApiUrls.get(damId);
          return this.getPassportTranslators(damApiUrl);
        })
      );
  }

  allDams(): Observable<object> {
    return this.damInfoService.getDamUrls()
      .pipe(
        flatMap(damApiUrlsMap => {
          const damApiUrls = Array.from(damApiUrlsMap.values());
          const passportTranslators = damApiUrls.map(damApiUrl => {
            return this.getPassportTranslators(damApiUrl);
          });
          return zip(...passportTranslators).pipe(
            map(flatten)
          );
        })
      );
  }


  private getPassportTranslators(damApiUrl) {
    return this.http.get(`${damApiUrl}/${realmIdPlaceholder}/passportTranslators`)
      .pipe(
        pluck('passportTranslators'),
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
