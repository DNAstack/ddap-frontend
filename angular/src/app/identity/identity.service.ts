import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { RealmService } from '../shared/realm.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {

  constructor(private http: HttpClient, private realmService: RealmService) {

  }

  get(params?): Observable<any[]> {
    params = params || {};

    return this.realmService.flatMap(
      realm => this.http.get<any[]>(`${environment.idpApiUrl}/${realm}/accounts/-`, {params})
    );
  }

}
