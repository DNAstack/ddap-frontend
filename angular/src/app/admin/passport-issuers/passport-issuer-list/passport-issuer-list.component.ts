import { Component } from '@angular/core';

import { EntityListBase } from '../../shared/entity-list.base';
import { PassportIssuerService } from '../passport-issuers.service';

@Component({
  selector: 'ddap-passport-issuer-list',
  templateUrl: './passport-issuer-list.component.html',
  styleUrls: ['./passport-issuer-list.component.scss'],
})
export class PassportIssuerListComponent extends EntityListBase<PassportIssuerService> {

  constructor(passportService: PassportIssuerService) {
    super(passportService);
  }

}
