import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IcConfig = ic.v1.IcConfig;
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';
import { ic } from '../../../../shared/proto/ic-service';
import { realmIdPlaceholder } from '../../../../shared/realm/realm.constant';
import { Store } from '../../../../shared/store/store';

@Injectable({
  providedIn: 'root',
})
export class IcConfigStore extends Store<IcConfig> {

  constructor(private http: HttpClient) {
    super(IcConfig.create());
  }

  public init(): void {
    this.get()
      .subscribe((config) => {
        this.setState(config);
      });
  }

  private get(params = {}): Observable<IcConfig> {
    return this.http.get<any>(`${environment.idpApiUrl}/${realmIdPlaceholder}/config`,
      {params}
    ).pipe(
      map(IcConfig.create)
    );
  }

}
