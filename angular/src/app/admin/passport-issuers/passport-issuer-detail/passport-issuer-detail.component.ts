import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityDetailBase } from '../../shared/entity-detail.base';
import { PassportIssuerService } from '../passport-issuerss.service';

@Component({
  selector: 'ddap-passport-issuer-detail',
  templateUrl: './passport-issuer-detail.component.html',
  styleUrls: ['./passport-issuer-detail.component.scss'],
})
export class PassportIssuerDetailComponent extends EntityDetailBase<PassportIssuerService> {

  constructor(
    route: ActivatedRoute,
    passportService: PassportIssuerService
  ) {
    super(route, passportService, 'passportName');
  }
}
