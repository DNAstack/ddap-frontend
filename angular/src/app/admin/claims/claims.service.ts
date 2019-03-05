import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RealmService } from '../../realm.service';
import { ConfigEntityService } from '../shared/config-entity.service';

@Injectable({
  providedIn: 'root',
})
export class ClaimService extends ConfigEntityService {

  constructor(protected http: HttpClient, protected realmService: RealmService) {
    super(http, realmService, 'trustedClaims');
  }

}
