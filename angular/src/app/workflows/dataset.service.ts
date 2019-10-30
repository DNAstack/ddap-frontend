import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from 'ddap-common-lib';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { realmIdPlaceholder } from '../shared/realm/realm.constant';

import { Dataset } from './dataset-form/dataset.model';
import { ViewToken } from './dataset-form/view.token.model';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService) { }

  fetchDataset(url: string): Observable<Dataset> {
    return this.http.get<Dataset>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/dataset?dataset_url=${url}`)
      .pipe(
        this.errorHandler.notifyOnError(`Can't fetch dataset list.`)
      );
  }

  getViews(urls): Observable<any> {
    return this.http.post(`${environment.ddapApiUrl}/${realmIdPlaceholder}/views/lookup`, urls)
      .pipe(
        this.errorHandler.notifyOnError()
      );
  }

  getViewsAuthorization(views): Observable<Array<ViewToken>> {
    return this.http.post<Array<ViewToken>>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/views/tokens`, views)
      .pipe(
        this.errorHandler.notifyOnError()
      );
  }
}
