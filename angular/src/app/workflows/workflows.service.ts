import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ErrorHandlerService } from '../shared/error-handler/error-handler.service';
import { realmIdPlaceholder } from '../shared/realm/realm.constant';

import { SimplifiedWesResourceViews, WesResourceViews, Workflow } from './workflow.model';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService) {
  }

  public getAllWorkflowRuns(): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/wes/runs`);
  }

  public getAllWesViews(): Observable<SimplifiedWesResourceViews[]> {
    return this.http.get<WesResourceViews[]>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/wes/views`)
      .pipe(
        map((wesResources: WesResourceViews[]) => {
          return wesResources.map(SimplifiedWesResourceViews.fromWesResourceViews);
        })
      );
  }

}
