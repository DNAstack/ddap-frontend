import { Component } from '@angular/core';

import { EntityListBase } from '../../shared/entity-list.base';
import { PassportService } from '../passports.service';

@Component({
  selector: 'ddap-passport-list',
  templateUrl: './passport-list.component.html',
  styleUrls: ['./passport-list.component.scss'],
})
export class PassportListComponent extends EntityListBase<PassportService> {

  constructor(passportService: PassportService) {
    super(passportService);
  }

}
