import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ErrorHandlerService } from '../shared/error-handler/error-handler.service';
import { realmIdPlaceholder } from '../shared/realm/realm.constant';

import { Dataset } from './dataset-form/dataset.model';
import {ViewTokensModel} from "./dataset-views/view-tokens.model";

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

  getViewsAuthorization(views): Observable<Array<ViewTokensModel>> {
    return this.http.post<Array<ViewTokensModel>>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/views/tokens`, views)
      .pipe(
        this.errorHandler.notifyOnError()
      );
  }
}
