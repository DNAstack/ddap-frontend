import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ErrorHandlerService } from '../shared/error-handler/error-handler.service';
import { realmIdPlaceholder } from '../shared/realm/realm.constant';

import { SimplifiedWesResourceViews, WesResourceViews, WorkflowRunsResponse } from './workflow.model';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService) {
  }

  public getWorkflowRuns(damId: string, view: String): Observable<WorkflowRunsResponse> {
    return this.http.get<WorkflowRunsResponse>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/wes/${damId}/views/${view}/runs`);
  }

  public getAllWesViews(): Observable<SimplifiedWesResourceViews[]> {
    return this.http.get<WesResourceViews[]>(`${environment.ddapApiUrl}/${realmIdPlaceholder}/wes/views`)
      .pipe(
        map((wesResources: WesResourceViews[]) => {
          return wesResources.map(SimplifiedWesResourceViews.fromWesResourceViews);
        })
      );
  }

  public runWorkflow(damId: string, view: String, wdl: String, inputs: String, tokens: string): Observable<any> {
    return this.http.post(`${environment.ddapApiUrl}/${realmIdPlaceholder}/wes/${damId}/views/${view}/runs`,
      {
        wdl,
        inputsJson: inputs,
        tokensJson: tokens,
      }
    );
  }

  public workflowRunDetail(damId: string, viewId: string, runId: string): Observable<any> {
    return this.http.get(`${environment.ddapApiUrl}/${realmIdPlaceholder}/wes/${damId}/views/${viewId}/runs/${runId}`)
      .pipe(
        this.errorHandler.notifyOnError()
      );
  }

  public getJsonSchemaFromWdl(wdl: string): Observable<any> {
    return this.http.post(`${environment.ddapApiUrl}/${realmIdPlaceholder}/wes/describe`,
      wdl
    ).pipe(
      this.errorHandler.notifyOnError()
    );
  }

}
