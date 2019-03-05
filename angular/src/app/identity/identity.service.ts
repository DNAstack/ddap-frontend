import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { RealmService } from '../realm.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {

  private realm: string;

  constructor(private http: HttpClient,
              private realmService: RealmService) {

    this.realmService.getRealm().subscribe(realm => {
      this.realm = realm;
    });
  }

  get(params?): Observable<any[]> {
    params = params || {};

    return this.http.get<any[]>(`${environment.idpApiUrl}/${this.realm}/accounts/-`, {params});
  }

}
