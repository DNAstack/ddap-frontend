import { Injectable, Injector } from '@angular/core';

import { ConfigEntityService } from '../shared/config-entity.service';

@Injectable({
  providedIn: 'root',
})
export class PersonaService extends ConfigEntityService {

  constructor(protected injector: Injector) {
    super(injector, 'testPersonas', 'testPersonas', {
      '=1': 'test persona',
      'other': 'test personas',
    });
  }

}
