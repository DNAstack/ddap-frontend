import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ErrorHandlerService } from '../shared/error-handler/error-handler.service';
import { HttpParamsService } from '../shared/http-params.service';
import { realmIdPlaceholder } from '../shared/realm/realm.constant';

import { DatasetList } from './dataset-search/DatasetList';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService,
              private httpParamsService: HttpParamsService) { }

  fetchDataset(url: string): Observable<DatasetList> {
    return this.http.get<DatasetList>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/dataset?dataset_url=${url}`)
      .pipe(
        this.errorHandler.notifyOnError(`Can't fetch dataset list.`)
      );
  }

  getViews(urls): Observable<any> {
    // TODO: Handle no views error
    return this.http.post(`${environment.ddapApiUrl}/${realmIdPlaceholder}/dataset/views`, urls)
      .pipe(
        this.errorHandler.notifyOnError(`temporary`)
      );
  }

  getAccessTokens(view, ttl) {
    // TODO: Handle no access errors
    // TODO: Update the url to use env variable instead of hardcoding
    return this.http.get(
      `http://localhost:8085${view}/token`,
      {
        params: this.httpParamsService.getHttpParamsFrom(ttl),
      });
  }
}
