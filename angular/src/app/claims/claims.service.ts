import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

@Injectable({
  providedIn: 'root',
})
export class ClaimService implements EntityService {

  constructor(private http: HttpClient) { }

  get(params?): Observable<any[]> {
    params = params || {};
    params.persona = 'nci_researcher';

    return this.http.get<any[]>(environment.ddapApiUrl + '/config', { params })
      .pipe(
        pluck('trustedClaims')
      );
  }

  save(claimChange: any): Observable<any> {
    const params = {
      persona: 'nci_researcher',
    };
    const claimtName = claimChange.item.name;

    return this.http.post(
      environment.ddapApiUrl + '/config/' + claimtName,
      claimChange,
      { params, headers }
    );
  }

  update(claim: any): Observable<any> {
    const params = {
      persona: 'nci_researcher',
    };
    const claimtName = claim.name;
    const claimChange = {
      item: claim,
    };

    return this.http.patch(
      environment.ddapApiUrl + '/config/' + claimtName,
      claimChange,
      { params, headers }
    );
  }
}
