import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { objectToArray } from '../../../shared/util';
import { PassportService } from '../passports.service';

@Component({
  selector: 'ddap-passport-list',
  templateUrl: './passport-list.component.html',
  styleUrls: ['./passport-list.component.scss'],
})
export class PassportListComponent implements OnInit {

  passports$: Observable<any[]>;

  constructor(private passportService: PassportService) {
  }

  ngOnInit() {
    this.passports$ = this.passportService.get()
      .pipe(
        map(objectToArray)
      );
  }

}
