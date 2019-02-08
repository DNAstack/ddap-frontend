import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RuleService } from '../rules.service';

@Component({
  selector: 'ddap-rule-manage',
  templateUrl: './rule-manage.component.html',
  styleUrls: ['./rule-manage.component.scss'],
})
export class RuleManageComponent {

  rule: any = {};

  constructor(private ruleService: RuleService, private router: Router) { }

  onSubmit(value: any) {
    this.ruleService.save(JSON.parse(value.body))
      .subscribe(() => this.router.navigate(['/rules']));
  }
}
