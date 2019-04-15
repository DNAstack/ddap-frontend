import { Injectable, Injector } from '@angular/core';

import { ConfigEntityService } from '../shared/config-entity.service';

@Injectable({
  providedIn: 'root',
})
export class ClientApplicationService extends ConfigEntityService {

  constructor(protected injector: Injector) {
    super(injector, 'clients', 'clients');
  }

}
