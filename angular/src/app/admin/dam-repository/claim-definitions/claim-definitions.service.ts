import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DamInfoService } from '../../../shared/dam/dam-info.service';
import { ErrorHandlerService } from '../../../shared/error-handler/error-handler.service';
import { ic } from '../../../shared/proto/ic-service';
import { realmIdPlaceholder } from '../../../shared/realm/realm.constant';
import { DamConfigEntityType } from '../shared/dam/dam-config-entity-type.enum';
import { DamConfigService } from '../shared/dam/dam-config.service';


import AccountClaim = ic.v1.AccountClaim;
import IAccountClaim = ic.v1.IAccountClaim;

@Injectable({
  providedIn: 'root',
})
export class ClaimDefinitionService extends DamConfigService {

  constructor(protected http: HttpClient,
              protected damInfoService: DamInfoService,
              protected route: ActivatedRoute,
              protected errorHandler: ErrorHandlerService) {
    super(DamConfigEntityType.claimDefinitions, http, damInfoService);
  }

  public isExpiring({ exp }: IAccountClaim | AccountClaim): boolean {
    const timestamp = dayjs.unix(exp);
    const hoursTillExpiration = timestamp.diff(dayjs(), 'hour');
    return hoursTillExpiration < environment.claimExpirationWarningThresholdInHours;
  }

  public getClaimDefinitionSuggestions(damId: string, claimName: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${environment.ddapApiUrl}/${realmIdPlaceholder}/autocomplete/claimValue/${damId}?claimName=${claimName}`, {}
    );
  }

}
