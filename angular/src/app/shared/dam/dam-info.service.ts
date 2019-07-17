import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { DamInfoStore } from './dam-info.store';
import { DamInfo, DamsInfo } from './dams-info';

@Injectable({
  providedIn: 'root',
})
export class DamInfoService {

  constructor(private damInfoStore: DamInfoStore) {

  }

  getDamsInfo(): Observable<DamsInfo> {
    return this.damInfoStore.info;
  }

  getDamInfos(): Observable<DamInfo[]> {
    return this.damInfoStore.info
      .pipe(
        map(damsInfo => DamInfoService.toDamInfos(damsInfo))
      );
  }

  getDamUrls(): Observable<Map<string, string>> {
    return this.damInfoStore.info
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

  private static toDamInfos(damsInfo: DamsInfo): DamInfo[] {
    type Entry<T> = [string, T];
    const damInfoEntries: Entry<DamInfo>[] = Object.entries(damsInfo);

    return damInfoEntries.map((entry: Entry<DamInfo>) => entry[1]);
  }

}
