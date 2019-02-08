import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { objectToArray } from '../../../shared/util';
import { GrantService } from '../grants.service';

@Component({
  selector: 'ddap-grant-list',
  templateUrl: './grant-list.component.html',
  styleUrls: ['./grant-list.component.scss'],
})
export class GrantListComponent implements OnInit {

  grants$: Observable<any[]>;

  constructor(private grantService: GrantService) {
  }

  ngOnInit() {
    this.grants$ = this.grantService.get()
      .pipe(
        map(objectToArray)
      );
  }

}
