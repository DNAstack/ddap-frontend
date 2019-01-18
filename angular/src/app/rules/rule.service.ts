import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { pluck } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });

@Injectable({
  providedIn: 'root',
})
export class RuleService {

  constructor(private http: HttpClient) { }

  get(params?): Observable<any[]> {
    params = params || {};
    params.persona = 'nci_researcher';

    return this.http.get<any[]>(environment.ddapApiUrl + '/config', { params })
      .pipe(
        pluck('rules')
      );
  }

  save(ruleChange: any): Observable<any> {
    const params = {
      persona: 'nci_researcher',
    };
    const ruleName = ruleChange.item.name;

    return this.http.post(
      environment.ddapApiUrl + '/config/' + ruleName,
      ruleChange,
      { params, headers }
    );
  }

  update(rule: any): Observable<any> {
    const params = {
      persona: 'nci_researcher',
    };
    const ruleName = rule.name;
    const ruleChange = {
      item: rule,
    };

    return this.http.patch(
      environment.ddapApiUrl + '/config/' + ruleName,
      ruleChange,
      { params, headers }
    );
  }
}
