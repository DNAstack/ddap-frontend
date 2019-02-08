import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConfigEntityService } from '../shared/config-entity.service';

@Injectable({
  providedIn: 'root',
})
export class ClaimService extends ConfigEntityService {

  constructor(http: HttpClient) {
    super(http, 'trustedClaims');
  }

}
