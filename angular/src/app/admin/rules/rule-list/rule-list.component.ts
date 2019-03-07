import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EntityListBase } from '../../shared/entity-list.base';
import { RuleService } from '../rules.service';

@Component({
  selector: 'ddap-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss'],
})
export class RuleListComponent extends EntityListBase<RuleService> {

  rules$: Observable<any[]>;

  constructor(ruleService: RuleService) {
    super(ruleService);
  }

}
