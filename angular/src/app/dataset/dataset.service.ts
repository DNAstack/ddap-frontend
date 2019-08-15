import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ErrorHandlerService } from '../shared/error-handler/error-handler.service';
import { realmIdPlaceholder } from '../shared/realm/realm.constant';

import { DatasetList } from './dataset-search/DatasetList';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService) { }

  fetchDataset(url: string): Observable<DatasetList> {
    return this.http.get<DatasetList>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/dataset?dataset_url=${url}`)
      .pipe(
        this.errorHandler.notifyOnError(`Can't fetch dataset list.`)
      );
  }
}
