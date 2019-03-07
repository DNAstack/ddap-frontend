import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EntityManageBase } from '../../shared/entity-manage.base';
import { PassportService } from '../passports.service';

@Component({
  selector: 'ddap-passport-manage',
  templateUrl: './passport-manage.component.html',
  styleUrls: ['./passport-manage.component.scss'],
})
export class PassportManageComponent extends EntityManageBase<PassportService> {

  constructor(passportService: PassportService,
              router: Router,
              route: ActivatedRoute) {
    super(passportService, router, route);
  }
}
