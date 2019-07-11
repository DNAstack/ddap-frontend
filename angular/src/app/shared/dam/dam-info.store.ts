import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { environment } from '../../../environments/environment';

import { DamsInfo } from './dams-info';

@Injectable({
  providedIn: 'root',
})
export class DamInfoStore {

  private _info: ReplaySubject<DamsInfo> = new ReplaySubject(1);
  // tslint:disable-next-line:member-ordering
  public readonly info: Observable<DamsInfo> = this._info.asObservable();

  constructor(private http: HttpClient) {
  }

  getDamsInfo(): Observable<DamsInfo> {
    this.getDamInfoResponse()
      .subscribe((damsInfo: DamsInfo) => this._info.next(damsInfo));
    return this.info;
  }

  private getDamInfoResponse(): Observable<DamsInfo> {
    // DAM URLs are the same in all realms so use master
    return this.http.get<DamsInfo>(`${environment.ddapApiUrl}/master/dam`);
  }


}
