import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { ErrorHandlerService } from '../shared/error-handler/error-handler.service';
import { realmIdPlaceholder } from '../shared/realm/realm.constant';

import { Workflow } from './workflow.model';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService) {
  }

  public get(): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/workflows`);
  }

}
