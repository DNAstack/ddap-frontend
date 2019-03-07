import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityDetailBase } from '../../shared/entity-detail.base';
import { PassportService } from '../passports.service';

@Component({
  selector: 'ddap-passport-detail',
  templateUrl: './passport-detail.component.html',
  styleUrls: ['./passport-detail.component.scss'],
})
export class PassportDetailComponent extends EntityDetailBase<PassportService> {

  constructor(
    route: ActivatedRoute,
    passportService: PassportService
  ) {
    super(route, passportService, 'passportName');
  }
}
