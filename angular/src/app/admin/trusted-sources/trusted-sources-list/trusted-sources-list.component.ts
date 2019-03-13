import { Component } from '@angular/core';

import { EntityListBase } from '../../shared/entity-list.base';
import { TrustedSourcesService } from '../trusted-sources.service';

@Component({
  selector: 'ddap-trusted-source-list',
  templateUrl: './trusted-sources-list.component.html',
  styleUrls: ['./trusted-sources-list.component.scss'],
})
export class TrustedSourcesListComponent extends EntityListBase<TrustedSourcesService> {

  constructor(private trustedSourcesService: TrustedSourcesService) {
    super(trustedSourcesService);
  }

}
