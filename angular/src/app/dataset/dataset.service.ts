import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { realmIdPlaceholder } from '../shared/realm/realm.constant';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {

  constructor(private http: HttpClient) { }

  fetchDataset(url: string): Observable<[]> {
    return this.http.get<any>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/dataset?dataset_url=${url}`);
  }
}
