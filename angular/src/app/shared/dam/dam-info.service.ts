import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { DamInfo, DamsInfo } from './dams-info';

@Injectable({
  providedIn: 'root',
})
export class DamInfoService {

  private readonly damInfoResponse$: Observable<DamsInfo>;

  constructor(private http: HttpClient) {
    // DAM URLs are the same in all realms so use master
    this.damInfoResponse$ = this.http.get<DamsInfo>(`${environment.ddapApiUrl}/master/dam`).shareReplay();
  }

  getDamsInfo(): Observable<DamsInfo> {
    return this.damInfoResponse$;
  }


  getDamUrls(): Observable<Map<string, string>> {
    return this.getDamsInfo()
      .pipe(
        map(damsInfo => DamInfoService.toMap(damsInfo))
      );
  }

  private static toMap(damsInfo: DamsInfo): Map<string, string> {
    type Entry<T> = [string, T];
    const damInfoEntries: Entry<DamInfo>[] = Object.entries(damsInfo);
    const idUrlEntries: Entry<string>[] =
      damInfoEntries.map((entry: Entry<DamInfo>) => [entry[0], entry[1].url] as Entry<string>);

    return new Map(idUrlEntries);
  }
}
