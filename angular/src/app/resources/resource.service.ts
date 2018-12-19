import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  getResources(queryParams?): Observable<any[]> {
    queryParams = queryParams || {};
    queryParams.persona = 'nci_researcher';

    return this.http.get<any[]>(environment.apiBaseUrl + '/resources', { params: queryParams })
      .pipe(
        pluck('resources')
      );
  }
}
