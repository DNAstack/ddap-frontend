import { Component } from '@angular/core';

import { EntityListBase } from '../../shared/entity-list.base';
import { GrantService } from '../grants.service';

@Component({
  selector: 'ddap-grant-list',
  templateUrl: './grant-list.component.html',
  styleUrls: ['./grant-list.component.scss'],
})
export class GrantListComponent extends EntityListBase<GrantService> {

  constructor(grantService: GrantService) {
    super(grantService);
  }

}
