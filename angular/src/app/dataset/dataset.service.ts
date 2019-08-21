import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { ErrorHandlerService } from '../shared/error-handler/error-handler.service';
import { HttpParamsService } from '../shared/http-params.service';
import { realmIdPlaceholder } from '../shared/realm/realm.constant';

import { Dataset } from './dataset-import/Dataset';
import { ViewTokens } from './dataset-views/ViewTokens';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService,
              private httpParamsService: HttpParamsService) { }

  fetchDataset(url: string): Observable<Dataset> {
    return this.http.get<Dataset>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/dataset?dataset_url=${url}`)
      .pipe(
        this.errorHandler.notifyOnError(`Can't fetch dataset list.`)
      );
  }

  getViews(urls): Observable<any> {
    return this.http.post(`${environment.ddapApiUrl}/${realmIdPlaceholder}/views/lookup`, urls)
      .pipe(
        this.errorHandler.notifyOnError(`URLs can't be empty`)
      );
  }

  getAccessTokens(view, ttl) {
    // TODO: Handle no access errors
    return this.http.get(
      `${view}/token`,
      {
        params: this.httpParamsService.getHttpParamsFrom(ttl),
      });
  }

  getViewsAuthorization(views): Observable<Array<ViewTokens>> {
    return this.http.post<Array<ViewTokens>>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/views/tokens`, views);
  }
}
