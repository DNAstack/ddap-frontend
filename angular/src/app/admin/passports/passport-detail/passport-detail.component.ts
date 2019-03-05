import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap, pluck } from 'rxjs/operators';

import { PassportService } from '../passports.service';

@Component({
  selector: 'ddap-passport-detail',
  templateUrl: './passport-detail.component.html',
  styleUrls: ['./passport-detail.component.scss'],
})
export class PassportDetailComponent implements OnInit {

  passport: any;

  constructor(
    private route: ActivatedRoute,
    public passportService: PassportService
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      flatMap(params => this.getPassport(params['passportName']))
    ).subscribe(passport => this.passport = passport);
  }

  private getPassport(passportName) {
    return this.passportService.get()
      .pipe(
        pluck(passportName)
      );
  }
}
