import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RealmService } from '../../realm.service';
import { ConfigEntityService } from '../shared/config-entity.service';

@Injectable({
  providedIn: 'root',
})
export class PassportService extends ConfigEntityService {

  constructor(http: HttpClient,
              realmService: RealmService) {
    super(http, realmService, 'trustedPassportIssuers');
  }

}
