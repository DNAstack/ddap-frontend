import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';

import { RealmService } from '../../../shared/realm.service';
import { RuleService } from '../rules.service';

@Component({
  selector: 'ddap-rule-manage',
  templateUrl: './rule-manage.component.html',
  styleUrls: ['./rule-manage.component.scss'],
})
export class RuleManageComponent {

  rule: any = {};

  constructor(private ruleService: RuleService, private router: Router, private realmService: RealmService) { }

  onSubmit(value: any) {
    this.ruleService.save(JSON.parse(value.body))
      .pipe(flatMap(_ => this.realmService.underRealm('/rules')))
      .subscribe(path => this.router.navigate([path]));
  }
}
