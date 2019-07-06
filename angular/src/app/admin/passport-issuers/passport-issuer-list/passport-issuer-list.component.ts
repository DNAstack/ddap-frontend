import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DamEntityListBase } from '../../shared/dam-entity-list.base';
import { PassportIssuerService } from '../passport-issuers.service';

@Component({
  selector: 'ddap-passport-issuer-list',
  templateUrl: './passport-issuer-list.component.html',
  styleUrls: ['./passport-issuer-list.component.scss'],
})
export class PassportIssuerListComponent extends DamEntityListBase<PassportIssuerService> {

  constructor(protected passportService: PassportIssuerService, protected route: ActivatedRoute) {
    super(passportService, route);
  }

}
