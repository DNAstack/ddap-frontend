import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IcConfigEntityService } from '../shared/ic-config-entity.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends IcConfigEntityService {

  constructor(http: HttpClient) {
    super(http, 'clients', 'clients');
  }

}
