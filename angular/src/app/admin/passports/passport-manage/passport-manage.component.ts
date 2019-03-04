import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { RealmService } from '../../../shared/realm.service';
import { PassportService } from '../passports.service';

@Component({
  selector: 'ddap-passport-manage',
  templateUrl: './passport-manage.component.html',
  styleUrls: ['./passport-manage.component.scss'],
})
export class PassportManageComponent {

  passport: any = {};

  constructor(private passportService: PassportService, private router: Router, private realmService: RealmService) { }

  onSubmit(value: any) {
    this.passportService.save(JSON.parse(value.body))
      .pipe(flatMap(_ => this.realmService.underRealm('/rules')))
      .subscribe(path => this.router.navigate([path]));
  }
}
