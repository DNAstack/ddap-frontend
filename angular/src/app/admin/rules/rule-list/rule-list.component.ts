import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { objectToArray } from '../../../shared/util';
import { RuleService } from '../rules.service';

@Component({
  selector: 'ddap-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss'],
})
export class RuleListComponent implements OnInit {

  rules$: Observable<any[]>;

  constructor(private ruleService: RuleService) {
  }

  ngOnInit() {
    this.rules$ = this.ruleService.get()
      .pipe(
        map(objectToArray)
      );
  }

}
