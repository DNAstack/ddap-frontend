import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {

  constructor(private http: HttpClient) {

  }

  get(params?): Observable<any[]> {
    params = params || {};

    return this.http.get<any[]>(`${environment.idpApiUrl}/accounts/-`, {params})
      .pipe();
  }

}
