import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  get(params?): Observable<any[]> {
    params = params || {};
    params.persona = 'nci_researcher';

    return this.http.get<any[]>(environment.ddapApiUrl + '/config', { params })
      .pipe(
        pluck('clients')
      );
  }

  save(clientChange: any): Observable<any> {
    const params = {
      persona: 'nci_researcher'
    };
    const clientName = clientChange.item.name;

    return this.http.post(
      environment.ddapApiUrl + '/config/' + clientName,
      clientChange,
      { params, headers }
    );
  }

  update(client: any): Observable<any> {
    const params = {
      persona: 'nci_researcher'
    };
    const clientName = client.name;
    const clientChange = {
      item: client
    };

    return this.http.patch(
      environment.ddapApiUrl + '/config/' + clientName,
      clientChange,
      { params, headers }
    );
  }
}
