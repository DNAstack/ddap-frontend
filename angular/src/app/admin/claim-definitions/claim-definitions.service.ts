import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';


import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from '../../shared/error-handler/error-handler.service';
import { ic } from '../../shared/proto/ic-service';
import { ConfigEntityService } from '../shared/config-entity.service';
import { EntityModel } from '../shared/entity.model';


import AccountClaim = ic.v1.AccountClaim;
import IAccountClaim = ic.v1.IAccountClaim;

@Injectable({
  providedIn: 'root',
})
export class ClaimDefinitionService extends ConfigEntityService {

  constructor(protected http: HttpClient,
              protected errorHandler: ErrorHandlerService) {
    super(http, errorHandler, 'claimDefinitions', 'claimDefinitions');
  }

  get(damId: string, params: {} = {}): Observable<Map<string, EntityModel>> {
    return super.get(damId, params)
      .pipe(
        this.errorHandler.notifyOnError(`Can't load claim definitions.`)
      );
  }

  isExpiring({ expires }: IAccountClaim | AccountClaim): boolean {
    const timestamp = moment.unix(expires);
    const duration = moment.duration(timestamp.diff(moment()));
    const hoursTillExpiration = duration.asHours();
    return hoursTillExpiration < environment.claimExpirationWarningThresholdInHours;
  }

}
