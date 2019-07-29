import DamConfig = dam.v1.DamConfig;
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { flatMap, map } from 'rxjs/operators';

import { DamInfoService } from '../../../shared/dam/dam-info.service';
import { dam } from '../../../shared/proto/dam-service';
import { realmIdPlaceholder } from '../../../shared/realm/realm.constant';
import { Store } from '../../../shared/store/store';
import { ConfigModel } from '../config.model';

import { DamConfigs } from './dam-configs.model';

@Injectable({
  providedIn: 'root',
})
export class DamConfigStore extends Store<DamConfigs> {

  constructor(private http: HttpClient,
              private damInfoService: DamInfoService) {
    super({});
  }

  public init(damId: string): void {
    this.get(damId)
      .subscribe((config) => {
        this.setState({ ...this.state, [damId]: config });
      });
  }

  private get(damId: string, params = {}): Observable<DamConfig> {
    return this.damInfoService.getDamUrls()
      .pipe(
        flatMap(damApiUrls => {
          const damApiUrl = damApiUrls.get(damId);
          return this.http.get<ConfigModel>(`${damApiUrl}/${realmIdPlaceholder}/config`, { params })
            .pipe(
              map(DamConfig.create)
            );
        })
      );
  }

}
