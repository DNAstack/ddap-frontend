import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { realmIdPlaceholder } from 'ddap-common-lib';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TargetAdaptersService {

  constructor(private http: HttpClient) {
  }

  getTargetAdapters(damId: string): Observable<Object> {
    return this.http.get(
      `${environment.ddapApiUrl}/${realmIdPlaceholder}/dam/${damId}/target-adapters`
    );
  }

}
